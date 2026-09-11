#!/usr/bin/env node
/**
 * 생태계 규모 계측기 — 13개 시스템(저장소 11개)의 규모·버전을 읽기 전용으로 세어
 * data/scale-snapshot.json 에 남긴다.
 *
 *   node tools/measure-scale.mjs          # 계측 → 스냅샷 기록 + 요약 표 출력
 *   node tools/measure-scale.mjs --check  # 다시 세어 기존 스냅샷과 비교(아무것도 쓰지 않는다). 다르면 exit 1
 *   node tools/measure-scale.mjs --repin  # 기준 커밋 고정(data/base-commits.json)을 지금 HEAD 로 옮기고 계측
 *
 * 규약
 *   - 🔴 형제 저장소는 읽기만 한다. git 은 tools/lib/repos.mjs 의 읽기 허용 목록으로만 부른다.
 *   - 작업 트리가 아니라 **기준 커밋의 내용**을 센다(`git archive` 로 임시 폴더에 풀어서). 다른 작업이 형제 저장소를
 *     편집 중이어도 값이 흔들리지 않는다. 실행 전후 fingerprint 가 다르면 동시 작업으로 보고 경고만 한다.
 *   - 🔴 자르거나 추정하지 않는다. 세지 못하면 null + 사유.
 *   - 수치마다 규칙 문자열(포함·제외)을 함께 싣는다. 문장과 코드가 어긋나면 코드가 정본이다.
 *   - 버전은 정본 위치 하나를 읽고, 다른 표기와 태그를 함께 적어 어긋남을 표시한다. 조용히 고르지 않는다.
 *   - HIS(·공개 홈페이지·환자 앱)는 HIS 저장소의 정본 계측기(scripts/system-scale.mjs --json)를 부른다.
 *     --freeze 는 절대 부르지 않는다.
 *   - 출력에는 로컬 경로·호스트·미커밋 파일 이름을 싣지 않는다. 시스템 키·저장소 기준 상대 경로·커밋·태그·숫자만.
 *
 * 종료 코드: 0 성공·일치 · 1 --check 불일치 · 2 도구 오류 · 3 미실행(로컬 설정·저장소 없음)
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, loadRepos, git, repoState, fingerprint, sameFingerprint, baseCommit, exportCommit, removeExport, loadPins, concurrentNote, PINS_REL } from './lib/repos.mjs';
import { PATTERNS } from './lib/public-rules.mjs';

/** 로컬·서버 경로 규칙 — 공개 검사기와 같은 정본(tools/lib/public-rules.mjs)을 쓴다. 호출마다 새로 만든다(g 플래그 상태 공유 방지) */
const LOCAL_PATH = PATTERNS.find((p) => p.id === 'local-path');
if (!LOCAL_PATH) throw new Error('public-rules.mjs 에 local-path 규칙이 없다');
const localPathRe = () => new RegExp(LOCAL_PATH.re.source, LOCAL_PATH.re.flags);

const OUT_REL = 'data/scale-snapshot.json';
const OUT = path.join(ROOT, OUT_REL);
const RULES_VERSION = 1;

/** 파일 집합에서 늘 빼는 경로 조각 — 의존성·빌드 산출물·가상환경·외부 원본(벤더링) */
const SKIP_SEGMENTS = ['node_modules', '.venv', 'venv', 'dist', 'dist.bak', '.next', 'build', 'out', '__pycache__', 'coverage', '.turbo', '.expo', '.ohif-src'];
const SKIP = new Set(SKIP_SEGMENTS);

const CONVENTIONS = {
  fileSet: '기준 커밋에 들어 있는 파일(`git archive <기준 커밋>` 으로 임시 폴더에 푼 것 — 작업 트리의 미커밋 변경은 세지 않는다). '
    + `경로에 ${SKIP_SEGMENTS.join('·')} 조각이 있으면 제외(의존성·빌드 산출물·외부 원본 소스).`,
  nullValue: '셀 수 없으면 value=null 과 reason 을 적는다. 추정하거나 자르지 않는다.',
  handlers: '엔드포인트 수는 "핸들러(데코레이터·함수) 수"이지 "고유 경로 수"가 아니다. 테스트 수는 선언 수이지 실행·통과 수가 아니다.',
  version: 'version.value 는 정본 위치 한 곳의 선언값. otherDeclarations 는 다른 선언·태그. '
    + '앞의 v 를 뗀 값이 하나라도 다르면 mismatch=true 이고 다른 곳을 mismatchWith 에 적는다. '
    + 'tagForValue 는 정본 값과 같은 이름의 태그(v1.2.3 또는 1.2.3)가 있으면 그 이름, 없으면 null.',
  state: `계측은 기준 커밋(state.head)의 내용만 읽는다. 기준 커밋은 ${PINS_REL} 에 고정된 해시(state.pinned=true) 또는 계측 시점의 HEAD. 같은 기준 커밋이면 언제 재도 같은 값이다.`,
};

// ─────────────────────────────────────────────────────────────── 유틸

const args = new Set(process.argv.slice(2));
const CHECK = args.has('--check');

let REPOS = null; // {key: 절대경로}

/** 오류 문구에서 로컬 경로를 지운다(출력이 다시 유출 경로가 되지 않게) */
function sanitize(msg) {
  let s = String(msg);
  if (REPOS) for (const [k, dir] of Object.entries(REPOS)) s = s.split(dir).join(`<${k}>`);
  s = s.split(ROOT).join('.').split(os.homedir()).join('~');
  return s.replace(localPathRe(), '<local>');
}

const fail = (code, msg) => { console.error(sanitize(msg)); process.exit(code); };

/** 버전 비교용 정규화 — 앞의 v 를 뗀다 */
const norm = (v) => (v == null ? null : String(v).trim().replace(/^v/i, ''));

/** 숫자 버전 정렬 비교 */
function cmpVer(a, b) {
  const pa = norm(a).split('.').map(Number), pb = norm(b).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 저장소 하나를 읽는 문맥 — 파일 목록은 한 번만 만든다 */
function walkFiles(root, rel = '', out = []) {
  for (const ent of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
    const r = rel ? `${rel}/${ent.name}` : ent.name;
    if (SKIP.has(ent.name)) continue;
    if (ent.isDirectory()) walkFiles(root, r, out);
    else if (ent.isFile()) out.push(r);
  }
  return out;
}

/** 저장소 하나를 읽는 문맥 — dir 은 기준 커밋을 푼 임시 폴더. 파일 목록은 한 번만 만든다 */
function repoCtx(key, dir) {
  let files = null;
  const ctx = {
    key,
    root: dir,
    files() {
      if (files) return files;
      files = walkFiles(dir).sort();
      return files;
    },
    glob(re) { return ctx.files().filter((f) => re.test(f)); },
    exists(rel) { try { return fs.statSync(path.join(dir, rel)).isFile(); } catch { return false; } },
    read(rel) { return fs.readFileSync(path.join(dir, rel), 'utf8'); },
  };
  return ctx;
}

/** 정규식 매칭 수 합계. 대상 파일이 0개면 null(경로가 바뀌었을 수 있다 — 0 이라고 말하지 않는다) */
function countIn(ctx, fileRe, lineRe) {
  const files = ctx.glob(fileRe);
  if (files.length === 0) return { value: null, reason: `대상 파일 0개(${fileRe.source}) — 경로가 바뀌었을 수 있다` };
  let n = 0;
  for (const f of files) n += (ctx.read(f).match(lineRe) || []).length;
  return { value: n, files: files.length };
}

function countFiles(ctx, fileRe) {
  const files = ctx.glob(fileRe);
  if (files.length === 0) return { value: null, reason: `대상 파일 0개(${fileRe.source}) — 경로가 바뀌었을 수 있다` };
  return { value: files.length, list: files };
}

// ─────────────────────────────────────────────────────── 공통 계수 규칙

const PAGE_FILE = 'page.(tsx|jsx|ts|js)';
const pageRe = (appDir) => new RegExp(`^${escRe(appDir)}/(?:.+/)?page\\.(?:tsx|jsx|ts|js)$`);

/** Next.js App Router 화면 수 */
const pages = (appDir, extra = {}) => ({
  key: 'pages',
  rule: `포함: ${appDir}/**/${PAGE_FILE} 전부(라우트 그룹 \`(…)\`·동적 경로 포함). 제외: layout·template·loading·error·not-found·route.ts(API 라우트).`
    + (extra.ruleNote ? ` ${extra.ruleNote}` : ''),
  measure(ctx) {
    const r = countFiles(ctx, pageRe(appDir));
    if (r.value == null || !extra.detail) return { value: r.value, reason: r.reason };
    return { value: r.value, detail: extra.detail(r.list) };
  },
});

/** Prisma 모델 수 */
const prismaModels = (schema) => ({
  key: 'dataModels',
  rule: `포함: ${schema} 의 행 시작 \`model <Name> {\` 선언. 제외: enum·type·view·주석 처리된 model·다른 .prisma 파일.`,
  measure(ctx) {
    if (!ctx.exists(schema)) return { value: null, reason: `파일 없음: ${schema}` };
    return { value: (ctx.read(schema).match(/^model\s+\w+\s*\{/gm) || []).length };
  },
});

/** NestJS HTTP 핸들러 수 */
const NEST_HTTP = /^\s*@(?:Get|Post|Put|Patch|Delete|All|Head|Options)\(/gm;
const nestEndpoints = (srcDir) => ({
  key: 'apiEndpoints',
  rule: `포함: ${srcDir}/**/*.ts 안의 행 시작 HTTP 메서드 데코레이터(@Get·@Post·@Put·@Patch·@Delete·@All·@Head·@Options) 수 = 핸들러 수. `
    + '제외: *.spec.ts·*.test.ts·@Sse·주석/문자열 안의 데코레이터(행 시작 앵커로 배제).',
  measure(ctx) {
    const r = countIn(ctx, new RegExp(`^${escRe(srcDir)}/(?!.*\\.(?:spec|test)\\.ts$).+\\.ts$`), NEST_HTTP);
    return { value: r.value, reason: r.reason };
  },
});

/** FastAPI 핸들러 수 — 범위 안에서 APIRouter()/FastAPI() 를 담은 변수 이름을 모아, 그 이름의 데코레이터만 센다 */
function fastapiScan(ctx, scopeRe) {
  const files = ctx.glob(scopeRe);
  if (files.length === 0) return null;
  const src = Object.fromEntries(files.map((f) => [f, ctx.read(f)]));
  const names = new Set();
  for (const s of Object.values(src)) {
    for (const m of s.matchAll(/^\s*(\w+)\s*(?::\s*[\w.]+\s*)?=\s*(?:fastapi\.)?(?:APIRouter|FastAPI)\(/gm)) names.add(m[1]);
  }
  if (names.size === 0) return { http: 0, ws: 0, names: 0 };
  const alt = [...names].map(escRe).join('|');
  const http = new RegExp(`^\\s*@(?:${alt})\\.(?:get|post|put|patch|delete|head|options|trace|api_route)\\(`, 'gm');
  const ws = new RegExp(`^\\s*@(?:${alt})\\.websocket\\(`, 'gm');
  let h = 0, w = 0;
  for (const s of Object.values(src)) { h += (s.match(http) || []).length; w += (s.match(ws) || []).length; }
  return { http: h, ws: w, names: names.size };
}
const FASTAPI_RULE = (scope) => `포함: ${scope} 의 .py 파일에서 \`X = APIRouter(…)\`·\`X = FastAPI(…)\` 로 만든 변수 X 의 `
  + '행 시작 HTTP 데코레이터(@X.get·post·put·patch·delete·head·options·trace·api_route) 수 = 핸들러 수. '
  + '변수 이름은 파일을 가리지 않고 범위 전체에서 모은다(다른 파일에서 가져온 라우터 포함).';
const fastapiEndpoints = (scope, scopeRe, { wsSeparate = false } = {}) => ({
  key: 'apiEndpoints',
  rule: FASTAPI_RULE(scope) + (wsSeparate ? ' 제외: @X.websocket(아래 apiWebsockets 로 따로 센다).' : ' 제외: @X.websocket.'),
  measure(ctx) {
    const r = fastapiScan(ctx, scopeRe);
    if (!r) return { value: null, reason: `대상 파일 0개(${scope})` };
    return { value: r.http, detail: `라우터 변수 이름 ${r.names}종` };
  },
});

/** pytest 테스트 함수 수 */
const PY_TEST = /^\s*(?:async\s+)?def\s+test_\w*\s*\(/gm;
const pytestCases = (testDir) => ({
  key: 'testCases',
  rule: `포함: ${testDir}/**/test_*.py 의 행 시작 \`def test_…(\`·\`async def test_…(\` 선언 수. `
    + '제외: 다른 위치의 파일·conftest.py·parametrize 로 늘어나는 실행 건수(선언 1개 = 1).',
  measure(ctx) {
    const r = countIn(ctx, new RegExp(`^${escRe(testDir)}/(?:.+/)?test_[^/]*\\.py$`), PY_TEST);
    return { value: r.value, reason: r.reason, detail: r.files != null ? `파일 ${r.files}` : undefined };
  },
});

/** JS 테스트 선언 수(it/test 에 제목 문자열이 붙은 것) */
const JS_CASE = /^\s*(?:it|test)\(\s*['"`]/gm;
const jsCases = (key, fileGlob, fileRe) => ({
  key,
  rule: `포함: ${fileGlob} 의 행 시작 \`it('…'\`·\`test('…'\` 선언(첫 인자가 제목 문자열) 수. `
    + '제외: describe·훅(beforeEach 등)·.skip/.only/.each 등 수식 호출·실행 중 조건부 skip.',
  measure(ctx) {
    const r = countIn(ctx, fileRe, JS_CASE);
    return { value: r.value, reason: r.reason, detail: r.files != null ? `파일 ${r.files}` : undefined };
  },
});

// ─────────────────────────────────────────────────────── 버전 선언 읽기

const V = {
  json: (file, key = 'version') => ({
    where: `${file} ${key}`,
    read(ctx) {
      if (!ctx.exists(file)) return { value: null, reason: `파일 없음: ${file}` };
      const v = key.split('.').reduce((o, k) => (o == null ? o : o[k]), JSON.parse(ctx.read(file)));
      return v == null ? { value: null, reason: `${file} 에 ${key} 없음` } : { value: String(v) };
    },
  }),
  re: (file, symbol, re) => ({
    where: `${file} ${symbol}`,
    read(ctx) {
      if (!ctx.exists(file)) return { value: null, reason: `파일 없음: ${file}` };
      const m = ctx.read(file).match(re);
      return m ? { value: m[1] } : { value: null, reason: `${file} 에서 ${symbol} 을 찾지 못함` };
    },
  }),
  /** pyproject.toml 의 [section] 안 version */
  toml: (file, section) => ({
    where: `${file} [${section}] version`,
    read(ctx) {
      if (!ctx.exists(file)) return { value: null, reason: `파일 없음: ${file}` };
      const body = ctx.read(file).split(/^\[/m).find((b) => b.startsWith(`${section}]`));
      const m = body?.match(/^version\s*=\s*["']([^"']+)["']/m);
      return m ? { value: m[1] } : { value: null, reason: `${file} [${section}] 에 version 없음` };
    },
  }),
  /** 코드 선언이 없을 때 — 릴리즈 기록 파일명 중 가장 높은 번호 */
  releaseFiles: (dir) => ({
    where: `${dir}/v*.md 파일명(가장 높은 번호)`,
    read(ctx) {
      const re = new RegExp(`^${escRe(dir)}/v(\\d+(?:\\.\\d+)*)\\.md$`);
      const all = ctx.files().filter((f) => f.startsWith(`${dir}/`) && f.endsWith('.md'));
      const vs = all.map((f) => f.match(re)?.[1]).filter(Boolean);
      if (vs.length === 0) return { value: null, reason: `릴리즈 기록 파일 없음: ${dir}` };
      vs.sort(cmpVer);
      return {
        value: `v${vs.at(-1)}`,
        note: `코드에 버전 선언이 없어 ${dir} 의 릴리즈 기록 파일명 중 가장 높은 번호를 읽는다`
          + `(단일 버전 파일명 ${vs.length}개 · 그 밖의 .md ${all.length - vs.length}개는 비교에서 뺀다)`,
      };
    },
  }),
  /** CHANGELOG 의 첫 버전 제목(## [x.y.z] · ## vx.y.z) */
  changelog: (file = 'CHANGELOG.md') => V.re(file, '첫 버전 제목', /^##\s+\[?v?(\d+(?:\.\d+)+)\]?/m),
};

function readVersion(ctx, spec, state) {
  const c = spec.canonical.read(ctx);
  const others = spec.others.map((o) => {
    const r = o.read(ctx);
    return r.value == null ? { value: null, where: o.where, reason: r.reason } : { value: r.value, where: o.where };
  });
  others.push({
    value: state.lastTag,
    where: `git describe --tags --abbrev=0 (HEAD 에서 가장 가까운 태그${spec.tagsApply === false ? ' · 저장소 전체의 태그' : ''})`,
  });
  let tagForValue = null;
  if (c.value != null && spec.tagsApply !== false) {
    for (const t of [`v${norm(c.value)}`, norm(c.value)]) {
      if (git(REPOS[ctx.key], ['tag', '-l', t]) === t) { tagForValue = t; break; }
    }
  }
  const differing = c.value == null ? [] : others.filter((o) => o.value != null && norm(o.value) !== norm(c.value)).map((o) => o.where);
  const out = {
    value: c.value,
    source: spec.canonical.where,
    otherDeclarations: others,
    mismatch: c.value == null ? null : differing.length > 0,
    mismatchWith: differing,
    tagForValue,
  };
  if (c.reason) out.reason = c.reason;
  const note = [c.note, spec.note].filter(Boolean).join(' · ');
  if (note) out.note = note;
  return out;
}

// ─────────────────────────────────────────────────────── HIS 정본 계측기

let HIS_CACHE = null;
function hisScale(ctx) {
  if (HIS_CACHE) return HIS_CACHE;
  const script = 'scripts/system-scale.mjs';
  if (!ctx.exists(script)) return (HIS_CACHE = { error: `파일 없음: ${script}` });
  const run = (flag) => execFileSync(process.execPath, [script, flag], {
    cwd: ctx.root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 16 * 1024 * 1024, // 기준 커밋 사본에서 돈다
  });
  try {
    const values = JSON.parse(run('--json')).values; // 🔴 --json 만 · --freeze 금지
    const rules = {};
    const text = run('--rules');
    for (const block of text.split(/^## /m).slice(1)) {
      const m = block.match(/^.*\(`(\w+)`\)\s*\n([^\n>][^\n]*)/);
      if (m) rules[m[1]] = m[2].trim();
    }
    return (HIS_CACHE = { values, rules });
  } catch (e) {
    return (HIS_CACHE = { error: `HIS 정본 계측기 실행 실패: ${sanitize(e.message).split('\n')[0]}` });
  }
}
/** HIS 정본 계측기의 값 하나를 그대로 옮긴다 */
const hisMetric = (key, hisKey) => ({
  key,
  rule: null, // 실행 시 HIS 계측기의 규칙 문장으로 채운다
  hisKey,
  measure(ctx) {
    const r = hisScale(ctx);
    const rule = `HIS 저장소 정본 계측기 \`scripts/system-scale.mjs --json\` 의 \`${hisKey}\` 값을 그대로 옮긴다. 그 계측기의 규칙: `
      + (r.rules?.[hisKey] ?? '(규칙 문장을 읽지 못함 — 그 스크립트의 --rules 참조)');
    if (r.error) return { value: null, reason: r.error, rule };
    const v = r.values?.[hisKey];
    return typeof v === 'number' ? { value: v, rule } : { value: null, reason: `HIS 계측기 출력에 ${hisKey} 없음`, rule };
  },
});

// ─────────────────────────────────────────────────────── 시스템별 정의

const HIS_VERSION = V.re('packages/shared/src/constants.ts', 'HIS_VERSION', /HIS_VERSION\s*=\s*['"]([^'"]+)['"]/);
const HIS_SHARED_NOTE = 'HIS 저장소 안에서 HIS 와 함께 릴리즈된다 — 버전 정본은 HIS 와 같다';

/** AI Server — 메인 앱(app.py)과 app.py 가 등록하는 Blueprint 의 Flask 라우트 */
const aiServerRoutes = {
  key: 'apiEndpoints',
  rule: '포함: app.py 의 Flask 앱 변수(`X = Flask(…)`)와, app.py 가 `register_blueprint(Y)` 로 등록하는 Blueprint Y(정의 파일은 app.py 의 `from … import Y` 로 찾는다)의 '
    + '행 시작 라우트 데코레이터(@X/@Y.route·get·post·put·patch·delete) 수 = 핸들러 수(methods 가 여럿이어도 1). '
    + '조건부 등록(설정에 따라 꺼질 수 있는 것)도 포함. 제외: 등록되지 않은 Blueprint·별도 프로세스 Flask 앱(app.py 밖의 `Flask(`)·tests/.',
  measure(ctx) {
    const MAIN = 'app.py';
    if (!ctx.exists(MAIN)) return { value: null, reason: `파일 없음: ${MAIN}` };
    const main = ctx.read(MAIN);
    const deco = (names) => new RegExp(`^\\s*@(?:${names.map(escRe).join('|')})\\.(?:route|get|post|put|patch|delete)\\(`, 'gm');
    const registered = [...new Set([...main.matchAll(/register_blueprint\(\s*(\w+)/g)].map((m) => m[1]))];
    const imports = [...main.matchAll(/^\s*from\s+([\w.]+)\s+import\s+(\([^)]*\)|[^\n]*)/gm)].map((m) => ({ mod: m[1], names: m[2] }));
    const byFile = new Map([[MAIN, [...main.matchAll(/^\s*(\w+)\s*=\s*Flask\(/gm)].map((m) => m[1])]]);
    const unresolved = [];
    for (const bp of registered) {
      if (new RegExp(`^\\s*${escRe(bp)}\\s*=\\s*Blueprint\\(`, 'm').test(main)) { byFile.get(MAIN).push(bp); continue; }
      const imp = imports.find((i) => new RegExp(`\\b${escRe(bp)}\\b`).test(i.names));
      const base = imp?.mod.replace(/\./g, '/');
      const file = !base ? null : ctx.exists(`${base}.py`) ? `${base}.py` : ctx.exists(`${base}/__init__.py`) ? `${base}/__init__.py` : null;
      if (!file || !new RegExp(`^\\s*${escRe(bp)}\\s*=\\s*Blueprint\\(`, 'm').test(ctx.read(file))) { unresolved.push(bp); continue; }
      if (!byFile.has(file)) byFile.set(file, []);
      byFile.get(file).push(bp);
    }
    if (unresolved.length) return { value: null, reason: `등록된 Blueprint ${unresolved.length}개의 정의를 찾지 못함 — 규칙을 다시 봐야 한다` };
    let n = 0;
    for (const [file, names] of byFile) if (names.length) n += (ctx.read(file).match(deco(names)) || []).length;
    // 제외한 것도 숫자로 밝힌다(파일 이름은 싣지 않는다)
    const pyFiles = ctx.glob(/\.py$/).filter((f) => !f.startsWith('tests/'));
    let unregBp = 0, unregRoutes = 0, sideApps = 0, sideRoutes = 0;
    for (const f of pyFiles) {
      const s = ctx.read(f);
      const bps = [...s.matchAll(/^\s*(\w+)\s*=\s*Blueprint\(/gm)].map((m) => m[1]).filter((b) => !(byFile.get(f) || []).includes(b));
      if (bps.length) { unregBp += bps.length; unregRoutes += (s.match(deco(bps)) || []).length; }
      if (f !== MAIN) {
        const apps = [...s.matchAll(/^\s*(\w+)\s*=\s*Flask\(/gm)].map((m) => m[1]);
        if (apps.length) { sideApps++; sideRoutes += (s.match(deco(apps)) || []).length; }
      }
    }
    return {
      value: n,
      detail: `등록 Blueprint ${registered.length}개(정의 파일 ${byFile.size - 1}개) + app.py · 제외: 미등록 Blueprint ${unregBp}개(라우트 ${unregRoutes}) · 별도 프로세스 앱 ${sideApps}개(라우트 ${sideRoutes})`,
    };
  },
};

/** sign — OpenAPI 문서의 오퍼레이션 수 */
const signOpenapi = {
  key: 'apiOperations',
  rule: '포함: docs/openapi.json 의 paths 아래 HTTP 메서드(get·post·put·patch·delete·head·options·trace) 항목 수. 제외: parameters 등 메서드가 아닌 키.',
  measure(ctx) {
    const f = 'docs/openapi.json';
    if (!ctx.exists(f)) return { value: null, reason: `파일 없음: ${f}` };
    const doc = JSON.parse(ctx.read(f));
    const M = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']);
    let n = 0;
    for (const p of Object.values(doc.paths || {})) for (const k of Object.keys(p)) if (M.has(k)) n++;
    return { value: n, detail: `경로 ${Object.keys(doc.paths || {}).length}` };
  },
};

/** Jitsi — 기본 compose 의 서비스(컨테이너) 수 */
function composeServices(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let inServices = false;
  for (const l of lines) {
    if (/^services:\s*(#.*)?$/.test(l)) { inServices = true; continue; }
    if (inServices && /^\S/.test(l) && !l.startsWith('#')) break;
    const m = inServices && l.match(/^ {2}([A-Za-z0-9._-]+):\s*(#.*)?$/);
    if (m) out.push(m[1]);
  }
  return out;
}
const jitsiContainers = {
  key: 'containers',
  rule: '포함: docker-compose.yml 의 최상위 services: 아래 서비스 수(서비스 1개 = 컨테이너 1개로 본다 · 복제 수 설정 없음 전제). '
    + '제외: 선택 오버레이 compose 파일(docker-compose.*.yml)에만 있는 서비스 — detail 에 따로 적는다.',
  measure(ctx) {
    const base = 'docker-compose.yml';
    if (!ctx.exists(base)) return { value: null, reason: `파일 없음: ${base}` };
    const svc = composeServices(ctx.read(base));
    if (ctx.read(base).match(/^\s+(?:replicas|scale):/m)) return { value: null, reason: 'replicas/scale 설정이 있어 서비스 수 = 컨테이너 수가 아니다 — 규칙을 다시 봐야 한다' };
    const overlays = ctx.glob(/^docker-compose\.[^/]+\.ya?ml$/);
    const extra = new Set();
    for (const f of overlays) for (const s of composeServices(ctx.read(f))) if (!svc.includes(s)) extra.add(s);
    return { value: svc.length, detail: `오버레이 ${overlays.length}개 파일에만 있는 서비스 ${extra.size}` };
  },
};

/** Clinic — 병원 서비스의 HIS 연동 API 라우트 */
const CLINIC_HIS = 'src/app/api/clinic/his';
const clinicHisRoutes = {
  key: 'hisApiRoutes',
  rule: `포함: ${CLINIC_HIS}/**/route.ts 파일 수(Next.js 라우트 핸들러 파일 1개 = 경로 1개). `
    + '제외: 모노레포의 다른 서비스 API. 병원 서비스용이지만 HIS 연동이 아닌 /api/clinic/* 라우트는 detail 에 따로 적는다.',
  measure(ctx) {
    const r = countFiles(ctx, new RegExp(`^${escRe(CLINIC_HIS)}/(?:.+/)?route\\.ts$`));
    if (r.value == null) return { value: null, reason: r.reason };
    const HANDLER = /^export\s+(?:async\s+function\s+|function\s+|const\s+)(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/gm;
    let h = 0;
    for (const f of r.list) h += (ctx.read(f).match(HANDLER) || []).length;
    const other = ctx.glob(/^src\/app\/api\/clinic\/(?:.+\/)?route\.ts$/).filter((f) => !f.startsWith(`${CLINIC_HIS}/`)).length;
    return { value: r.value, detail: `내보낸 HTTP 메서드 핸들러 ${h} · HIS 연동 밖 /api/clinic 라우트 파일 ${other}(본 수치 미포함)` };
  },
};

const SYSTEMS = [
  {
    key: 'his', name: 'HIS', repo: 'his',
    version: { canonical: HIS_VERSION, others: [V.json('package.json'), V.json('apps/api/package.json'), V.json('apps/web/package.json')] },
    counts: [hisMetric('dataModels', 'prismaModels'), hisMetric('apiEndpoints', 'apiEndpoints'), hisMetric('apiEndpointsSse', 'apiEndpointsSse'), hisMetric('pages', 'webPagesTotal')],
  },
  {
    key: 'homepage', name: '공개 홈페이지', repo: 'his',
    version: { canonical: HIS_VERSION, others: [V.json('apps/homepage/package.json')], note: HIS_SHARED_NOTE },
    counts: [hisMetric('pages', 'homepageAppPages')],
  },
  {
    key: 'patient-app', name: '환자 앱', repo: 'his',
    version: { canonical: HIS_VERSION, others: [V.json('apps/mobile/package.json'), V.json('apps/mobile/app.json', 'expo.version')], note: HIS_SHARED_NOTE },
    counts: [hisMetric('screens', 'mobileScreens')],
  },
  {
    key: 'sign', name: 'sign', repo: 'sign',
    version: { canonical: V.json('package.json'), others: [V.json('web/package.json'), V.json('docs/openapi.json', 'info.version'), V.changelog()] },
    counts: [prismaModels('prisma/schema.prisma'), signOpenapi, nestEndpoints('src'), pages('web/src/app')],
  },
  {
    key: 'lis', name: 'LIS', repo: 'lis',
    version: {
      canonical: V.json('package.json'),
      others: [V.json('apps/api/package.json'), V.json('apps/web/package.json'),
        V.re('apps/web/src/lib/version.ts', 'APP_VERSION', /APP_VERSION\s*=\s*['"]([^'"]+)['"]/), V.changelog()],
    },
    counts: [prismaModels('apps/api/prisma/schema.prisma'), nestEndpoints('apps/api/src'), pages('apps/web/src/app'),
      jsCases('e2eCases', 'apps/api/test/**/*.e2e-spec.ts', /^apps\/api\/test\/(?:.+\/)?[^/]+\.e2e-spec\.ts$/)],
  },
  {
    key: 'erp', name: 'ERP', repo: 'erp',
    version: { canonical: V.toml('services/core/pyproject.toml', 'project'), others: [V.json('apps/web/package.json')] },
    counts: [
      {
        key: 'dataModels',
        rule: '포함: services/core/src/**/*.py 의 행 시작 `__tablename__ =` 선언 수(SQLAlchemy 모델 1개 = 1). 제외: `Table(…)` 로만 정의한 연결 테이블·alembic 마이그레이션·tests.',
        measure: (ctx) => { const r = countIn(ctx, /^services\/core\/src\/.+\.py$/, /^\s*__tablename__\s*=/gm); return { value: r.value, reason: r.reason }; },
      },
      fastapiEndpoints('services/core/src/**', /^services\/core\/src\/.+\.py$/),
      pages('apps/web/src/app', {
        ruleNote: '(로그인·첫 화면 등 `(app)` 그룹 밖 화면 포함 — detail 에 나눠 적는다.)',
        detail: (list) => { const a = list.filter((f) => f.startsWith('apps/web/src/app/(app)/')).length; return `(app) 그룹 ${a} · 그 밖 ${list.length - a}`; },
      }),
      pytestCases('services/core/tests'),
    ],
  },
  {
    key: 'pacs', name: 'PACS', repo: 'pacs',
    version: {
      canonical: V.releaseFiles('docs/releases'),
      // API 문서에 보이는 FastAPI 버전 — 릴리즈 번호와 따로 움직인다(09-11 요약 작성 중 발견). 설명 문자열에 괄호가 있어 `FastAPI(` 뒤 첫 `version=` 줄을 읽는다
      others: [V.json('admin/package.json'), V.re('backend/app/main.py', 'FastAPI(version=…)', /FastAPI\([\s\S]*?\n\s*version\s*=\s*['"]([^'"]+)['"]/)],
    },
    counts: [
      fastapiEndpoints('backend/app/**', /^backend\/app\/.+\.py$/, { wsSeparate: true }),
      {
        key: 'apiWebsockets',
        rule: `${FASTAPI_RULE('backend/app/**')} 중 @X.websocket 데코레이터 수만. apiEndpoints 에 더해지지 않는다.`,
        measure: (ctx) => { const r = fastapiScan(ctx, /^backend\/app\/.+\.py$/); return r ? { value: r.ws } : { value: null, reason: '대상 파일 0개(backend/app/**)' }; },
      },
      pages('admin/src/app'),
      pytestCases('backend/tests'),
      jsCases('e2eCases', 'e2e/tests/**/*.spec.{ts,js}', /^e2e\/tests\/(?:.+\/)?[^/]+\.spec\.(?:ts|js)$/),
    ],
  },
  {
    key: 'ai-server', name: 'AI Server', repo: 'ai-server',
    version: { canonical: V.re('app.py', 'VERSION', /^VERSION\s*=\s*['"]([^'"]+)['"]/m), others: [] },
    counts: [aiServerRoutes, pytestCases('tests')],
  },
  {
    key: 'twin', name: 'twin', repo: 'twin',
    version: {
      canonical: V.re('services/twin/twin/__init__.py', '__version__', /__version__\s*=\s*['"]([^'"]+)['"]/),
      others: [V.json('services/twin-web/package.json')],
    },
    counts: [fastapiEndpoints('services/twin/twin/**', /^services\/twin\/twin\/.+\.py$/), pages('services/twin-web/app'), pytestCases('services/twin/tests')],
  },
  {
    key: 'cerno', name: 'cerno', repo: 'cerno',
    version: {
      canonical: V.re('services/cerno-api/cerno/api/main.py', 'FastAPI(version=…)', /FastAPI\([^)]*?\bversion\s*=\s*['"]([^'"]+)['"]/s),
      others: [V.json('services/cerno-web/package.json'), V.changelog()],
    },
    counts: [fastapiEndpoints('services/cerno-api/**', /^services\/cerno-api\/.+\.py$/), pages('services/cerno-web/app'), pytestCases('tests')],
  },
  {
    key: 'edu', name: 'edu', repo: 'edu',
    version: { canonical: V.json('package.json'), others: [V.json('apps/api/package.json'), V.json('apps/web/package.json'), V.changelog()] },
    counts: [prismaModels('apps/api/prisma/schema.prisma'), nestEndpoints('apps/api/src'), pages('apps/web/app')],
  },
  {
    key: 'clinic', name: 'Clinic', repo: 'clinic',
    version: {
      canonical: V.json('packages/hospital-web/package.json'),
      others: [V.json('package.json')],
      tagsApply: false,
      note: '모노레포 안의 병원 서비스 패키지만 대상 — 저장소 태그는 모노레포 전체의 것이라 tagForValue 를 찾지 않는다',
    },
    counts: [pages('packages/hospital-web/src/app'), clinicHisRoutes],
  },
  {
    key: 'jitsi', name: 'Jitsi', repo: 'jitsi',
    version: { canonical: V.json('api/package.json'), others: [V.re('api/src/index.ts', "version: '…'", /\bversion:\s*['"]([^'"]+)['"]/)] },
    counts: [jitsiContainers],
  },
];

// ─────────────────────────────────────────────────────────────── 실행

function measure() {
  const out = {};
  const pins = loadPins();
  const byRepo = new Map();
  for (const sys of SYSTEMS) byRepo.set(sys.repo, [...(byRepo.get(sys.repo) ?? []), sys]);
  for (const [repo, list] of byRepo) {
    const { hash, pinned } = baseCommit(repo, REPOS[repo], pins);
    const state = { ...repoState(REPOS[repo], hash), pinned };
    const dir = exportCommit(REPOS[repo], hash);
    try {
      HIS_CACHE = null;
      for (const sys of list) out[sys.key] = measureSystem(sys, repoCtx(repo, dir), state);
    } finally { removeExport(dir); }
  }
  return Object.fromEntries(SYSTEMS.map((s) => [s.key, out[s.key]]));
}

function measureSystem(sys, ctx, state) {
  let version;
  try { version = readVersion(ctx, sys.version, state); } catch (e) {
    version = { value: null, source: sys.version.canonical.where, reason: `읽기 실패: ${sanitize(e.message).split('\n')[0]}` };
  }
  const counts = {};
  for (const m of sys.counts) {
    let r;
    try { r = m.measure(ctx); } catch (e) { r = { value: null, reason: `계측 실패: ${sanitize(e.message).split('\n')[0]}` }; }
    const entry = { value: r.value ?? null, rule: r.rule ?? m.rule };
    if (r.detail !== undefined && r.value != null) entry.detail = r.detail;
    if (r.value == null) entry.reason = r.reason ?? '사유 미상';
    counts[m.key] = entry;
  }
  return { name: sys.name, repoKey: sys.repo, state, version, counts };
}

function buildSnapshot(systems) {
  return {
    measuredAt: new Date().toLocaleDateString('sv-SE'), // 로컬 날짜 YYYY-MM-DD
    tool: { name: 'tools/measure-scale.mjs', rulesVersion: RULES_VERSION },
    conventions: CONVENTIONS,
    systems,
  };
}

/** 🔴 쓰기 전 자기 검사 — 로컬 경로가 새어 나가면 쓰지 않는다 */
function leakCheck(json) {
  const needles = [ROOT, os.homedir(), ...Object.values(REPOS)];
  const hit = needles.some((n) => n && json.includes(n)) || localPathRe().test(json);
  if (hit) fail(2, '도구 오류: 스냅샷에 로컬 경로가 섞였다 — 쓰지 않는다');
}

/** 두 값의 차이를 경로 목록으로 */
function diff(a, b, p = '', out = []) {
  if (a === b) return out;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) {
    out.push(`${p || '(전체)'}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
    return out;
  }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diff(a[k], b[k], p ? `${p}.${k}` : k, out);
  return out;
}

function fmt(n) { return n == null ? '—' : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function printSummary(snap) {
  console.log(`# 생태계 규모 계측 (${snap.measuredAt})\n`);
  console.log('| 시스템 | 버전(정본) | 어긋남 | 기준 커밋 날짜 | 기준 | 수치 |');
  console.log('|---|---|---|---|---:|---|');
  for (const [k, s] of Object.entries(snap.systems)) {
    const c = Object.entries(s.counts).map(([ck, cv]) => `${ck} ${fmt(cv.value)}`).join(' · ');
    const mm = s.version.mismatch == null ? '?' : s.version.mismatch ? `예(${s.version.mismatchWith.length}곳)` : '아니오';
    console.log(`| ${k} | ${s.version.value ?? '—'} | ${mm} | ${s.state.headDate ?? '—'} | ${s.state.pinned ? '고정' : 'HEAD'} | ${c} |`);
  }
  const nulls = Object.entries(snap.systems).flatMap(([k, s]) => Object.entries(s.counts).filter(([, v]) => v.value == null).map(([ck, v]) => `${k}.${ck}: ${v.reason}`));
  if (nulls.length) { console.log('\n셀 수 없음(null):'); for (const n of nulls) console.log(`  - ${n}`); }
}

function main() {
  REPOS = loadRepos();
  if (!REPOS) fail(3, '미실행 — tools/.local.json 이 없다(형제 저장소 경로 설정). 통과가 아니다.');
  const need = [...new Set(SYSTEMS.map((s) => s.repo))];
  const missing = need.filter((k) => !REPOS[k] || !fs.existsSync(path.join(REPOS[k], '.git')));
  if (missing.length) fail(3, `미실행 — 로컬 설정에 없거나 git 저장소가 아닌 키: ${missing.join(', ')}. 통과가 아니다.`);
  for (const k of Object.keys(REPOS)) if (!need.includes(k)) delete REPOS[k];

  // --repin: 기준 커밋 고정을 지금의 HEAD 로 옮긴다(명시적으로만 — 초안이 흔들리지 않게)
  if (args.has('--repin')) {
    if (CHECK) fail(2, '--repin 과 --check 는 함께 쓰지 않는다');
    const commits = Object.fromEntries(need.map((k) => [k, git(REPOS[k], ['rev-parse', 'HEAD'])]));
    fs.writeFileSync(path.join(ROOT, PINS_REL), `${JSON.stringify({
      note: '통합 릴리즈 초안의 기준 커밋 — 도구는 이 커밋의 내용만 읽는다. 옮길 때는 `node tools/measure-scale.mjs --repin`.',
      pinnedAt: new Date().toLocaleDateString('sv-SE'),
      commits,
    }, null, 2)}\n`);
    console.log(`기준 커밋 고정 → ${PINS_REL} (${need.length}개 저장소)\n`);
  }

  const before = fingerprint(REPOS);
  const systems = measure();
  const after = fingerprint(REPOS);
  const changed = sameFingerprint(before, after);
  if (changed.length) console.log(`${concurrentNote(changed)}\n`);
  else console.log(`형제 저장소 fingerprint(git status · .git/index 시각) 실행 전후 동일: ${Object.keys(before).length}/${Object.keys(before).length}\n`);

  const snap = buildSnapshot(systems);
  const json = JSON.stringify(snap, null, 2) + '\n';
  leakCheck(json);

  if (CHECK) {
    if (!fs.existsSync(OUT)) fail(1, `불일치 — 비교할 스냅샷이 없다: ${OUT_REL}`);
    let prev;
    try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { fail(1, `불일치 — ${OUT_REL} 을 읽지 못했다`); }
    const { measuredAt: _a, ...cur } = snap;
    const { measuredAt: _b, ...old } = prev;
    const d = diff(old, JSON.parse(JSON.stringify(cur)));
    if (d.length) {
      console.error(`불일치 — ${OUT_REL}(${prev.measuredAt}) 과 지금 계측이 ${d.length}곳 다르다:`);
      for (const x of d) console.error(`  ${sanitize(x)}`);
      console.error('\n실제 변화면 `node tools/measure-scale.mjs` 로 스냅샷을 다시 만든다.');
      process.exit(1);
    }
    console.log(`일치 — ${OUT_REL}(${prev.measuredAt}) 과 지금 계측이 같다(계측일 제외 전 항목).`);
    process.exit(0);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, json);
  printSummary(snap);
  console.log(`\n→ ${OUT_REL}`);
}

try { main(); } catch (e) { fail(2, `도구 오류: ${e.message}`); }
