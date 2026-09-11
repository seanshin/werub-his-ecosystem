#!/usr/bin/env node
/**
 * 구축 체크리스트 추출기 (산출물 G) — HIS 의 레지스트리 세 개에서 표를 **기계적으로** 뽑는다.
 *
 *   node tools/extract-checklist.mjs            # checklist/ 의 4개 파일을 다시 만든다
 *   node tools/extract-checklist.mjs --check    # 다시 뽑아 기존 파일과 비교만 한다(쓰지 않음 · 다르면 종료 코드 1)
 *   node tools/extract-checklist.mjs --dry-run  # 뽑아서 건수만 보고한다(쓰지 않음)
 *   node tools/extract-checklist.mjs --self-test  # 가림·리터럴 판독이 실제로 되는지 가짜 값으로 확인한다
 *
 * 원칙
 *   - 항목을 손으로 쓰지 않는다. 레지스트리 배열 리터럴을 TypeScript 컴파일러(AST)로 읽고, 리터럴 필드만 옮긴다.
 *     리터럴이 아닌 필드(계산식·변수 참조)는 추측하지 않고 "(코드에서 산출)"로 적는다.
 *   - 읽는 내용은 작업 트리가 아니라 **기준 커밋**의 파일이다(`git show`) — data/base-commits.json 에 고정된 HIS 커밋, 없으면 HEAD.
 *     머리말의 커밋과 내용이 1:1 로 맞고, 계측 스냅샷·매니페스트와 같은 커밋을 본다.
 *   - TypeScript 는 HIS 저장소에 이미 설치된 것을 경로로 불러 쓴다(아무것도 설치하지 않는다).
 *
 * 🔴 읽기 전용 — HIS 저장소에 쓰지 않는다. 실행 전후 지문(fingerprint)을 비교해 바뀌었으면 실패한다.
 * 🔴 가림(redaction) — 이 파일은 공개된다. 민감 용어를 여기 적지 않는다.
 *    - 거부 목록(DENYLIST_FILE 또는 tools/.denylist.local)의 용어 → ‹기관 정보›
 *    - 인프라 패턴(IP·호스트:포트·로컬/서버 경로·이메일·비밀값 대입 등) → ‹비공개›
 *    - 화면에는 **건수만** 찍는다(용어는 찍지 않는다). 거부 목록이 없으면 "미실행"(종료 코드 3) · 아무것도 쓰지 않는다.
 *
 * 종료 코드: 0 성공(또는 --check 일치) · 1 --check 불일치 · 2 오류(형제 저장소 변경 포함) · 3 미실행(거부 목록·로컬 설정 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, loadRepos, git, repoState, fingerprint, sameFingerprint, baseCommit, concurrentNote } from './lib/repos.mjs';
import { PATTERNS, loadDenylist as loadDenylistAt } from './lib/public-rules.mjs';

const loadDenylist = () => loadDenylistAt(ROOT);

const OUT_DIR = path.join(ROOT, 'checklist');
const SRC = {
  opening: 'apps/api/src/modules/opening/opening.registry.ts',
  openingService: 'apps/api/src/modules/opening/opening.service.ts',
  goLive: 'apps/api/src/modules/go-live/go-live.registry.ts',
  goLiveService: 'apps/api/src/modules/go-live/go-live.service.ts',
  decision: 'apps/api/src/modules/decision-registry/decision.registry.ts',
  decisionService: 'apps/api/src/modules/decision-registry/decision.service.ts',
  constants: 'packages/shared/src/constants.ts',
};
const COMPUTED = '(코드에서 산출)';
const TOKEN_DENY = '‹기관 정보›';
const TOKEN_INFRA = '‹비공개›';
const DATE_ROW = /^\| 추출일 \|.*\|$/m; // --check 는 이 줄을 비교하지 않는다(날짜만 다른 것은 차이가 아니다)

// ─────────────────────────────────────────────────────────────────────────────
// 가림(redaction)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 인프라 패턴 — 공개 검사기와 **같은 규칙**(tools/lib/public-rules.mjs 정본)으로 가린다.
 * 생성 뒤 검사기로 한 번 더 확인한다.
 */
const INFRA = PATTERNS;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function makeRedactor(denylist) {
  // 긴 용어부터 — 짧은 용어가 긴 용어의 일부를 먼저 먹지 않게
  const denyRes = [...denylist].sort((a, b) => b.length - a.length).map((t) => new RegExp(escapeRe(t), 'gi'));
  const counts = { infra: 0, deny: 0 };
  const hitIds = new Set();
  function redact(text, id) {
    if (typeof text !== 'string' || !text) return text;
    let out = text;
    for (const p of INFRA) {
      out = out.replace(p.re, (...args) => {
        const m = args.slice(0, -2); // match, groups...
        m.index = args[args.length - 2];
        if (p.keep && !p.keep(m)) return m[0];
        counts.infra++; if (id) hitIds.add(id);
        return TOKEN_INFRA;
      });
    }
    for (const re of denyRes) {
      out = out.replace(re, () => { counts.deny++; if (id) hitIds.add(id); return TOKEN_DENY; });
    }
    return out;
  }
  return { redact, counts, hitIds };
}

// ─────────────────────────────────────────────────────────────────────────────
// AST — 리터럴만 읽는다
// ─────────────────────────────────────────────────────────────────────────────

let ts; // HIS 저장소의 typescript
const COMP = Symbol('computed');

function unwrap(n) {
  while (n && (ts.isAsExpression(n) || ts.isSatisfiesExpression?.(n) || ts.isParenthesizedExpression(n) || ts.isTypeAssertionExpression?.(n))) n = n.expression;
  return n;
}

function propName(p) {
  if (!p.name) return null;
  if (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) || ts.isNumericLiteral(p.name)) return p.name.text;
  return null;
}

/** 리터럴 값 — 리터럴이 아니면 COMP(추측하지 않는다) */
function lit(node) {
  const n = unwrap(node);
  if (!n) return COMP;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (n.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(n) && n.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(n.operand)) return -Number(n.operand.text);
  // 문자열 리터럴끼리의 + 는 값이 정해져 있다(상수 접기) — 한쪽이라도 리터럴이 아니면 COMP
  if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = lit(n.left); const b = lit(n.right);
    return typeof a === 'string' && typeof b === 'string' ? a + b : COMP;
  }
  if (ts.isArrayLiteralExpression(n)) {
    const out = n.elements.map((e) => (ts.isSpreadElement(e) ? COMP : lit(e)));
    return out.includes(COMP) ? COMP : out;
  }
  if (ts.isObjectLiteralExpression(n)) return objLit(n);
  return COMP;
}

/** 객체 리터럴 — 필드마다 리터럴 여부를 따로 본다(한 필드가 계산식이어도 나머지는 읽는다) */
function objLit(n) {
  const o = {};
  for (const p of n.properties) {
    if (ts.isPropertyAssignment(p)) {
      const k = propName(p);
      if (k === null) { o.__computedKeys = true; continue; }
      o[k] = lit(p.initializer);
    } else {
      o.__computedKeys = true; // 스프레드·단축 속성·메서드 — 어떤 필드가 생기는지 AST 로는 모른다
    }
  }
  return o;
}

function findConst(sf, name) {
  let found = null;
  const visit = (node) => {
    if (found) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer) found = node.initializer;
    else ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!found) throw new Error(`상수 ${name} 을(를) 찾지 못했습니다`);
  return unwrap(found);
}

/** 레지스트리 배열 → 항목 목록. 원소가 객체 리터럴이 아니면 그 자리를 COMP 행으로 남긴다(조용히 빼지 않는다) */
function registryArray(sf, name) {
  const arr = findConst(sf, name);
  if (!ts.isArrayLiteralExpression(arr)) throw new Error(`${name} 이(가) 배열 리터럴이 아닙니다 — 추출 불가`);
  const items = []; const warnings = [];
  arr.elements.forEach((e, i) => {
    const u = unwrap(e);
    if (ts.isObjectLiteralExpression(u)) {
      const o = objLit(u);
      if (o.__computedKeys) warnings.push(`${name}[${i}] 에 리터럴이 아닌 속성이 있습니다(스프레드 등)`);
      items.push(o);
    } else {
      warnings.push(`${name}[${i}] 가 객체 리터럴이 아닙니다 — 한 행을 "${COMPUTED}"로 남깁니다`);
      items.push({ __computedRow: true });
    }
  });
  return { items, warnings };
}

const constLit = (sf, name) => lit(findConst(sf, name));

// ─────────────────────────────────────────────────────────────────────────────
// 표 그리기
// ─────────────────────────────────────────────────────────────────────────────

const isComp = (v) => v === COMP;
/** 셀 — COMP 는 "(코드에서 산출)", 없는 값은 "—" */
function cell(v, fmt = (x) => x) {
  if (isComp(v)) return COMPUTED;
  if (v === undefined || v === null || v === '') return '—';
  return fmt(v);
}
const md = (s) => String(s).replace(/\r?\n+/g, ' ').replace(/\|/g, '\\|').trim();
const code = (s) => `\`${s}\``;
const table = (head, rows) => [
  `| ${head.join(' | ')} |`,
  `|${head.map(() => '---').join('|')}|`,
  ...rows.map((r) => `| ${r.map(md).join(' | ')} |`),
].join('\n');

const GENERATED_NOTE = '<!-- 생성물 — 직접 수정 금지. `node tools/extract-checklist.mjs` 로 다시 만듭니다. -->';

function metaTable(meta, extra = []) {
  return table(['기준', '값'], [
    ['원본', `HIS 저장소 ${code(meta.file)}`],
    ['HIS 버전', meta.hisVersion],
    ['기준 커밋', `${code(meta.head)} (${meta.headDate})`],
    ['추출일', meta.date],
    ...extra,
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. 개원·운영 단계
// ─────────────────────────────────────────────────────────────────────────────

function buildOpening(src, ctx, R) {
  const sf = ts.createSourceFile('opening.registry.ts', src.opening, ts.ScriptTarget.Latest, true);
  const { items, warnings } = registryArray(sf, 'OPENING_REGISTRY');
  const PHASE_ORDER = constLit(sf, 'PHASE_ORDER');
  const PHASE_LABEL = constLit(sf, 'PHASE_LABEL');
  const PHASE_NOTE = constLit(sf, 'PHASE_NOTE');
  const PHASE_STAGE = constLit(sf, 'PHASE_STAGE');
  const DUE_LABEL = constLit(sf, 'DUE_LABEL');
  const CYCLE_LABEL = constLit(sf, 'CYCLE_LABEL');
  const COUNTRY_META = constLit(sf, 'COUNTRY_META');
  const COUNTRY_ORDER = constLit(sf, 'COUNTRY_ORDER');
  const CAVEAT = constLit(sf, 'REGISTRY_CAVEAT');

  // 파생 규칙이 서비스에 그대로 있는가 — 없으면 "확인 방식" 칸을 추측하지 않는다
  const svcOk = /OPENING_DERIVED_TASK/.test(src.openingService) && /source: 'GO_LIVE'/.test(src.openingService)
    && /source: 'DECISION'/.test(src.openingService) && /source: 'COMMITTEE'/.test(src.openingService);
  if (!svcOk) warnings.push('opening.service.ts 에서 파생 규칙 표식을 찾지 못해 "확인 방식"을 산출 표기로 둡니다');

  const STAGE_LABEL = { BEFORE: '개원 전', AT: '개원', AFTER: '개원 후' };

  function how(it) {
    if (!svcOk) return [COMPUTED, COMPUTED];
    if (isComp(it.goLiveKey) || isComp(it.decisionKey) || isComp(it.committeeCode)) return [COMPUTED, COMPUTED];
    if (it.goLiveKey) {
      const exists = ctx.goLiveKeys.has(it.goLiveKey);
      return ['파생 · Go-Live', `Go-Live 항목 ${code(it.goLiveKey)} 의 상태를 그대로 따릅니다${exists ? '' : ' (🔴 Go-Live 레지스트리에 없는 키)'}`];
    }
    if (it.decisionKey) {
      const exists = ctx.decisionKeys.has(it.decisionKey);
      return ['파생 · 결정 등록부', `결정 ${code(it.decisionKey)} 이 기록됐는지를 따릅니다(이행 상태를 함께 표시)${exists ? '' : ' (🔴 결정 등록부에 없는 키)'}`];
    }
    if (it.committeeCode) return ['파생 · 위원회', `위원회 ${code(it.committeeCode)} 의 명부로 판정합니다(정족수 충족 · 실제 임명 1명 이상)`];
    return ['사람 기록', '기록 + 증빙(선택)'];
  }

  const byPhase = new Map();
  for (const it of items) {
    const ph = isComp(it.phase) || it.__computedRow ? COMPUTED : it.phase;
    if (!byPhase.has(ph)) byPhase.set(ph, []);
    byPhase.get(ph).push(it);
  }
  const phases = Array.isArray(PHASE_ORDER) ? [...PHASE_ORDER] : [];
  for (const ph of byPhase.keys()) if (!phases.includes(ph)) phases.push(ph); // 순서 목록에 없는 단계도 빠뜨리지 않는다

  const countries = Array.isArray(COUNTRY_ORDER) ? COUNTRY_ORDER : ['KR', 'AE'];
  const byCountry = Object.fromEntries(countries.map((c) => [c, items.filter((i) => Array.isArray(i.countries) && i.countries.includes(c)).length]));
  const derivedN = items.filter((i) => i.goLiveKey || i.decisionKey || i.committeeCode).length;
  const stats = { total: items.length, byCountry, derived: derivedN, manual: items.length - derivedN };

  const L = [];
  L.push(GENERATED_NOTE, '', '# 개원·운영 단계 체크리스트', '');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. 원본 레지스트리가 바뀌면 추출기를 다시 돌립니다.', '');
  L.push('HIS 의 **개원·운영 단계** 화면(`/admin/opening`)이 쓰는 기본 항목입니다. 개원 전 단계 · 개원 · 개원 후 단계로 나뉘고, 항목마다 필요한 **국가**(KR 대한민국 · AE UAE)가 적혀 있습니다.', '');
  L.push(metaTable({ ...ctx.meta, file: SRC.opening }, [
    ['항목 수', `${stats.total} (${countries.map((c) => `${c} ${byCountry[c]}`).join(' · ')} — 두 나라 공통 항목은 양쪽에 셉니다)`],
    ['확인 방식', `파생 ${stats.derived} · 사람 기록 ${stats.manual}`],
  ]), '');
  L.push('## 읽는 법', '');
  L.push(`- ${R(isComp(CAVEAT) ? COMPUTED : CAVEAT, 'opening:caveat')}`);
  L.push('- **확인 방식** — `파생` 항목은 스스로 상태를 갖지 않고 다른 정본(Go-Live 관제 · 결정 등록부 · 위원회 대장)의 상태를 그대로 보여 줍니다. 이런 항목에는 사람이 따로 완료를 적을 수 없습니다. `사람 기록` 항목은 담당자가 "완료" 또는 "해당 없음(사유 필수)"을 기록하고, 증빙(문서 번호·일자·파일)을 붙일 수 있습니다.');
  L.push('- 기록이 없는 항목은 "미완료"가 아니라 "기록 없음"입니다 — 이미 했지만 적지 않았을 수 있습니다.');
  L.push('- 항목 이름·담당·비고는 원본 레지스트리의 문구를 그대로 옮깁니다(원문 문체).');
  L.push('- **선행** 항목은 순서를 보여 줄 뿐, 막지 않습니다.');
  L.push('- 나라별 참고:');
  for (const c of countries) {
    const m = COUNTRY_META?.[c];
    L.push(`  - ${code(c)} ${R(cell(m?.label), `opening:country:${c}`)} — ${R(cell(m?.note), `opening:country:${c}`)}`);
  }
  L.push('');

  for (const ph of phases) {
    const list = byPhase.get(ph) ?? [];
    const stage = PHASE_STAGE?.[ph];
    const title = ph === COMPUTED ? COMPUTED : `${STAGE_LABEL[stage] ?? cell(stage)} · ${cell(PHASE_LABEL?.[ph])}`;
    L.push(`## ${R(title, `opening:phase:${ph}`)} (${list.length})`, '');
    if (PHASE_NOTE?.[ph]) L.push(`${R(cell(PHASE_NOTE[ph]), `opening:phase:${ph}`)}`, '');
    if (!list.length) { L.push('_기본 항목이 없습니다 — 기관이 정합니다._', ''); continue; }
    const rows = list.map((it) => {
      if (it.__computedRow) return [COMPUTED, COMPUTED, COMPUTED, COMPUTED, COMPUTED, COMPUTED, COMPUTED, COMPUTED];
      const id = it.key && !isComp(it.key) ? it.key : 'opening:?';
      const [h, ev] = how(it);
      const due = cell(it.dueBy, (d) => DUE_LABEL?.[d] ?? d) + (it.cycle ? ` · ${cell(it.cycle, (c) => CYCLE_LABEL?.[c] ?? c)}` : '');
      const notes = [];
      if (it.authority) notes.push(`제출처: ${cell(it.authority)}`);
      if (it.dependsOn) notes.push(`선행: ${cell(it.dependsOn, (d) => d.map(code).join(', '))}`);
      if (it.note) notes.push(cell(it.note));
      return [
        code(cell(it.key)), cell(it.title), cell(it.countries, (c) => c.join('·')), cell(it.owner),
        h, ev, due, notes.length ? notes.join(' / ') : '—',
      ].map((v) => R(v, id));
    });
    L.push(table(['키', '항목', '국가', '담당(역할)', '확인 방식', '증빙·근거', '기한', '비고'], rows), '');
  }
  return { text: L.join('\n'), stats, warnings, keys: items.map((i) => i.key) };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Go-Live 관제
// ─────────────────────────────────────────────────────────────────────────────

const GL_TYPE = {
  CONFIG_GATE: '설정 게이트', APPROVAL: '승인', EXTERNAL: '외부', MANUAL: '수동',
  HARDWARE: '하드웨어', SERVICE_FLAG: '서비스 설정', DB_PROBE: '시스템 실측',
};
/** 서비스가 전용 판정기를 두는 sourceKey — 설명은 판정기가 무엇을 읽는지(값이 아니라 대상) */
const GL_PROBE = {
  phase0: '가명화 컷오버의 승인·실행 기록',
  hospitalInfo: '기관 기본정보 입력 여부',
  ginIndex: 'DB 에 기대 인덱스가 실제로 있는지 조회',
  dbBackup: '최근 암호화 백업 파일의 생성 시각',
  encryptionKey: '암호화 키가 설정돼 있고 개발용 값이 아닌지',
  hisMode: '빌드의 운영 모드 상한',
  institutionGrade: '요양기관 종별 설정 값이 DB 에 있는지',
};

function goLiveHow(it, area, svc) {
  const sk = it.sourceKey;
  if (isComp(sk)) return ['자동', '실검증', COMPUTED];
  if (!svc.manualRule) return [COMPUTED, COMPUTED, COMPUTED];
  if (!sk) return ['수동 확정', '자가신고', '담당자가 화면에서 표시'];
  let m;
  if ((m = /^flag:(.+)=(.+)$/.exec(sk))) {
    if (!svc.flagRule) return [COMPUTED, COMPUTED, COMPUTED];
    return m[2] === 'DECIDE'
      ? ['운영 결정', '자가신고', `현재 설정값 ${code(m[1])} 을 보여 주고, 켤지는 사람이 정함`]
      : ['자동', '실검증', `설정값 ${code(m[1])} = ${code(m[2])} 인지`];
  }
  if (GL_PROBE[sk]) {
    return svc.probes.has(sk) ? ['자동', '실검증', `시스템 실측 — ${GL_PROBE[sk]}`] : [COMPUTED, COMPUTED, COMPUTED];
  }
  if (area === 'B') {
    if ((m = /^track:(.+)$/.exec(sk))) return ['자동', '실검증', `연동 게이트 ${code(m[1])} 의 실제 결재 기록(개발 시드 결재는 세지 않음)`];
    if ((m = /^channel:(.+)$/.exec(sk))) return ['자동', '실검증', `대외 전송 채널 구현 여부(${m[1].split(',').map(code).join('·')}) — 사람이 완료로 적어도 미구현이면 미완`];
    if ((m = /^config:(.+)=(.+)$/.exec(sk))) return ['자동', '실검증', `설정값 ${code(m[1])} = ${code(m[2])} 인지`];
    return ['자동', '실검증', COMPUTED];
  }
  const tm = it.targetMode;
  return ['자동', '실검증', `설정 게이트 ${code(sk)} 이(가) 목표 모드${tm && !isComp(tm) ? ` ${code(tm)}` : ''} 이상인지`];
}

function buildGoLive(src, ctx, R) {
  const sf = ts.createSourceFile('go-live.registry.ts', src.goLive, ts.ScriptTarget.Latest, true);
  const { items, warnings } = registryArray(sf, 'GO_LIVE_REGISTRY');
  const AREA_LABEL = constLit(sf, 'AREA_LABEL');
  const s = src.goLiveService;
  const svc = {
    manualRule: /if \(!sk\)[^\n]*SELF_REPORTED/.test(s),
    flagRule: /target === 'DECIDE'/.test(s) && /f\.auto \? 'VERIFIED' : 'SELF_REPORTED'/.test(s),
    probes: new Set(Object.keys(GL_PROBE).filter((k) => new RegExp(`sk === '${k}'[^\\n]*VERIFIED`).test(s))),
  };
  if (!svc.manualRule || !svc.flagRule) warnings.push('go-live.service.ts 에서 판정 규칙 표식을 찾지 못해 일부 "확인 방식"을 산출 표기로 둡니다');

  const areas = AREA_LABEL && !isComp(AREA_LABEL) ? Object.keys(AREA_LABEL).filter((k) => k !== '__computedKeys') : [];
  for (const it of items) if (it.area && !isComp(it.area) && !areas.includes(it.area)) areas.push(it.area);

  const rowsMeta = items.map((it) => ({ it, h: it.__computedRow ? [COMPUTED, COMPUTED, COMPUTED] : goLiveHow(it, it.area, svc) }));
  const stats = {
    total: items.length,
    verified: rowsMeta.filter((r) => r.h[1] === '실검증').length,
    self: rowsMeta.filter((r) => r.h[1] === '자가신고').length,
    computed: rowsMeta.filter((r) => r.h[1] === COMPUTED).length,
    blocking: items.filter((i) => i.isBlocking !== false && !isComp(i.isBlocking)).length,
    byArea: Object.fromEntries(areas.map((a) => [a, items.filter((i) => i.area === a).length])),
  };

  const L = [];
  L.push(GENERATED_NOTE, '', '# Go-Live(운영 전환) 체크리스트', '');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. 원본 레지스트리가 바뀌면 추출기를 다시 돌립니다.', '');
  L.push('HIS 의 **Go-Live 관제** 화면(`/admin/go-live`)이 추적하는 개시 준비 항목입니다. 기술·보안·연동·법정 준비를 영역별로 나누고, 항목마다 **시스템이 직접 확인하는지(실검증)**, **사람이 표시하는지(자가신고)**를 구분합니다.', '');
  L.push(metaTable({ ...ctx.meta, file: SRC.goLive }, [
    ['항목 수', `${stats.total} (${areas.map((a) => `${a} ${stats.byArea[a]}`).join(' · ')})`],
    ['판정', `실검증 ${stats.verified} · 자가신고 ${stats.self}${stats.computed ? ` · 산출 ${stats.computed}` : ''}`],
    ['개시 차단 항목', `${stats.blocking} (나머지는 개시를 막지 않는 추적 항목)`],
  ]), '');
  L.push('## 읽는 법', '');
  L.push('- **실검증** — 시스템이 설정 값·DB·결재 기록·코드의 구현 여부를 직접 읽어 판정합니다. 사람이 "됐다"고 적어도 바뀌지 않습니다.');
  L.push('- **자가신고** — 담당자가 화면에서 상태를 표시합니다. 근거는 화면 밖에 있으므로, 준비율에서 실검증과 따로 셉니다.');
  L.push('- **자가신고(운영 결정)** — 설정의 현재 값은 시스템이 보여 주지만, 켤지 말지는 사람이 정합니다.');
  L.push('- **개시 차단** — `예` 인 항목이 준비되지 않으면 개시 준비가 끝나지 않은 것으로 봅니다.');
  L.push('- 항목 이름·담당은 원본 레지스트리의 문구를 그대로 옮깁니다. 각 항목의 운영자용 비고(설치본의 현재 상태·경위)는 설치본마다 달라 여기에 싣지 않습니다 — 화면에서 확인합니다.', '');

  for (const a of areas) {
    const list = rowsMeta.filter((r) => r.it.area === a);
    L.push(`## ${code(a)} ${R(cell(AREA_LABEL?.[a]), `golive:area:${a}`)} (${list.length})`, '');
    const rows = list.map(({ it, h }) => {
      const id = it.key && !isComp(it.key) ? it.key : 'golive:?';
      return [
        code(cell(it.key)), cell(it.title), cell(it.type, (t) => GL_TYPE[t] ?? t), cell(it.owner),
        h[0] === '운영 결정' ? `${h[1]}(운영 결정)` : h[1], h[2], cell(it.drillDown, code), isComp(it.isBlocking) ? COMPUTED : (it.isBlocking === false ? '아니오' : '예'),
        it.decisionKey ? cell(it.decisionKey, code) : '—',
      ].map((v) => R(v, id));
    });
    L.push(table(['키', '항목', '유형', '담당(역할)', '판정', '무엇으로 판정하나', '확인 화면', '개시 차단', '관련 결정'], rows), '');
  }
  const orphan = items.filter((i) => i.area === undefined || isComp(i.area) || i.__computedRow);
  if (orphan.length) {
    L.push(`## 영역을 읽지 못한 항목 (${orphan.length})`, '', `_영역 값이 리터럴이 아니어서 ${COMPUTED}_`, '');
  }
  return { text: L.join('\n'), stats, warnings, keys: items.map((i) => i.key) };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 결정 등록부
// ─────────────────────────────────────────────────────────────────────────────

const APPROVAL = {
  AUTHORIZED_ROLE: '권한자 기록', COMMITTEE: '위원회 의결', CODE_CHANGE: '코드 변경', PER_EVENT_DIALOG: '건별 승인',
};
const GOLIVE_REL = { REQUIRED_BEFORE: '개시 전 필수', CAN_FOLLOW: '개시 뒤 가능', NOT_RELATED: '개시와 무관' };
const DUE = { BEFORE_GO_LIVE: '개시 전', WITHIN_30D: '개시 후 30일 이내', NONE: '기한 없음' };

function buildDecisions(src, ctx, R) {
  const sf = ts.createSourceFile('decision.registry.ts', src.decision, ts.ScriptTarget.Latest, true);
  const { items, warnings } = registryArray(sf, 'DECISION_REGISTRY');
  const LAYER_META = constLit(sf, 'LAYER_META');
  const LAYER_RANK = constLit(sf, 'LAYER_RANK');
  const TRACKS = constLit(sf, 'DECISION_TRACKS');
  const s = src.decisionService;

  // 이행 상태 어휘 — 서비스의 enactmentStatusOf 에서 그대로 읽는다(지어내지 않는다)
  const states = [];
  for (const m of s.matchAll(/state: '([A-Z_]+)', label: '([^']+)'/g)) if (!states.some((x) => x[0] === m[1])) states.push([m[1], m[2]]);
  // 적용 경로별 "반영이 남는 이유" — 같은 함수의 삼항식에서 읽는다
  const pathWhy = {};
  for (const m of s.matchAll(/approvalPath === '([A-Z_]+)' \? '([^']+)'/g)) pathWhy[m[1]] = m[2];
  const noBinding = /: '(집행 바인딩이 없다[^']*)'/.exec(s)?.[1];
  if (!states.length) warnings.push('decision.service.ts 에서 이행 상태 어휘를 찾지 못했습니다');

  function apply(it) {
    if (isComp(it.enactKind) || isComp(it.approvalPath)) return COMPUTED;
    if (it.enactKind) return `기록하면 시스템이 반영(${code(it.enactKind)}${it.configKey && !isComp(it.configKey) ? ` → ${code(it.configKey)}` : ''})`;
    if (pathWhy[it.approvalPath]) return `기록 뒤 — ${pathWhy[it.approvalPath]}`;
    if (it.approvalPath === 'AUTHORIZED_ROLE' && noBinding) return `기록 뒤 — ${noBinding}`;
    return COMPUTED;
  }

  const layers = LAYER_RANK && !isComp(LAYER_RANK)
    ? Object.entries(LAYER_RANK).filter(([k]) => k !== '__computedKeys').sort((a, b) => b[1] - a[1]).map(([k]) => k)
    : [];
  for (const it of items) if (it.layer && !isComp(it.layer) && !layers.includes(it.layer)) layers.push(it.layer);

  const stats = {
    total: items.length,
    byLayer: Object.fromEntries(layers.map((l) => [l, items.filter((i) => i.layer === l).length])),
    requiredBefore: items.filter((i) => i.goLive === 'REQUIRED_BEFORE').length,
    enact: items.filter((i) => i.enactKind && !isComp(i.enactKind)).length,
  };

  const L = [];
  L.push(GENERATED_NOTE, '', '# 사람 결정 체크리스트 (결정 등록부)', '');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. 원본 레지스트리가 바뀌면 추출기를 다시 돌립니다.', '');
  L.push('HIS 의 **결정 등록부** 화면(`/admin/decisions`)에 올라 있는, 구축 기관의 **사람이 정해야 하는 것**입니다. 등록부는 결정을 대신하지 않습니다 — 무엇을, 누가 정하는지와 고를 수 있는 선택지를 적어 둡니다.', '');
  L.push(metaTable({ ...ctx.meta, file: SRC.decision }, [
    ['결정 수', `${stats.total} (${layers.map((l) => `${cell(LAYER_META?.[l]?.label, (x) => x.split(' — ')[0])} ${stats.byLayer[l]}`).join(' · ')})`],
    ['개시 전 필수', String(stats.requiredBefore)],
    ['기록하면 시스템이 반영', `${stats.enact} (나머지는 기록 뒤 사람·위원회·배포가 이행)`],
  ]), '');
  L.push('## 읽는 법', '');
  L.push('- **결정 층** — 세 층을 섞지 않습니다. 하위 층이 상위 층을 대신하지 못합니다.');
  for (const l of layers) {
    const m = LAYER_META?.[l];
    L.push(`  - **${R(cell(m?.label), `decision:layer:${l}`)}**: ${R(cell(m?.scope), `decision:layer:${l}`)}`);
  }
  L.push('- **기록과 적용은 다릅니다.** "정했다"와 "그렇게 됐다"는 따로 표시됩니다. 설치본의 화면은 결정마다 다음 상태 중 하나를 보여 줍니다:');
  L.push(`  ${states.length ? states.map(([k, v]) => `${R(v, 'decision:states')}(${code(k)})`).join(' · ') : COMPUTED}`);
  L.push('- 이 표의 **적용 방식**은 결정을 기록한 뒤 무엇이 남는지입니다. 결정의 현재 상태는 설치본마다 다르므로 여기에 싣지 않습니다.');
  L.push('- **개시 관계** — `개시 전 필수` 인 결정은 운영 개시 전에 정해야 합니다.');
  L.push('- 결정 사항·선택지·결정권자는 원본 레지스트리의 문구를 그대로 옮깁니다. 결정마다 붙은 배경 설명(현황·실측·검토할 법령)은 설치본의 화면에서 봅니다.', '');

  for (const l of layers) {
    const list = items.filter((i) => i.layer === l);
    L.push(`## ${R(cell(LAYER_META?.[l]?.label), `decision:layer:${l}`)} (${list.length})`, '');
    const rows = list.map((it) => {
      const id = it.key && !isComp(it.key) ? it.key : 'decision:?';
      const opts = isComp(it.options) || !Array.isArray(it.options)
        ? COMPUTED
        : it.options.map((o, i) => `${i + 1}) ${cell(o?.label)}`).join(' ');
      return [
        code(cell(it.key)), cell(it.title), cell(it.track, (t) => (TRACKS?.[t] && !isComp(TRACKS[t]) ? TRACKS[t] : t)),
        opts, cell(it.authority), cell(it.approvalPath, (p) => APPROVAL[p] ?? p), apply(it),
        cell(it.goLive, (g) => GOLIVE_REL[g] ?? g), cell(it.dueBy, (d) => DUE[d] ?? d),
        it.dependsOn ? cell(it.dependsOn, (d) => d.map(code).join(', ')) : '—',
      ].map((v) => R(v, id));
    });
    L.push(table(['키', '결정 사항', '축', '선택지', '결정권자(역할)', '결정 경로', '적용 방식', '개시 관계', '기한', '선행 결정'], rows), '');
  }
  const noLayer = items.filter((i) => !i.layer || isComp(i.layer));
  if (noLayer.length) L.push(`## 층을 읽지 못한 결정 (${noLayer.length})`, '', `_층 값이 리터럴이 아니어서 ${COMPUTED}_`, '');
  return { text: L.join('\n'), stats, warnings, keys: items.map((i) => i.key) };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. README
// ─────────────────────────────────────────────────────────────────────────────

function buildReadme(ctx, op, gl, dc, redactions) {
  const L = [];
  L.push(GENERATED_NOTE, '', '# G 구축 체크리스트', '',
    '**G — Build checklists**', '',
    '> **EN** — Three checklists extracted verbatim from the HIS registries: opening stages, go-live control, and human decisions. **Auto-generated — do not edit by hand.** "Real verification" items are decided by the system reading settings, the database, approval records or code, and a person marking them done does not change them; "self-declared" items are marked by a responsible person with evidence kept outside the screen. An item with no record reads **"no record," not "incomplete."** These lists are not exhaustive: items vary by institution class, region and exemptions.', '');
  L.push('> 자동 생성 — 손으로 고치지 않습니다.', '');
  L.push('AI 기반 HIS 를 세우는 의료기관이 **개원 준비 · 운영 전환 · 사람 결정**을 빠짐없이 챙길 수 있도록, HIS 안에 이미 있는 관리 화면의 항목을 표로 옮긴 것입니다. 이 표는 새로 지어낸 절차가 아니라 **HIS 의 레지스트리(코드)에서 기계적으로 뽑은 것**입니다. 그래서 코드가 바뀌면 추출기를 다시 돌려 표를 갱신합니다.', '');
  L.push(table(['파일', '무엇인가', 'HIS 화면', '항목 수'], [
    ['[opening.md](opening.md)', '개원 전 · 개원 · 개원 후 단계 항목(국가 축 KR·AE)', '`/admin/opening`', `${op.stats.total}`],
    ['[go-live.md](go-live.md)', '운영 전환 준비 항목(실검증 · 자가신고 구분)', '`/admin/go-live`', `${gl.stats.total}`],
    ['[decisions.md](decisions.md)', '사람이 정해야 하는 결정(결정 층 · 선택지 · 적용 방식)', '`/admin/decisions`', `${dc.stats.total}`],
  ]), '');
  L.push('## 기준', '');
  L.push(table(['기준', '값'], [
    ['HIS 버전', ctx.meta.hisVersion],
    ['기준 커밋', `${code(ctx.meta.head)} (${ctx.meta.headDate})`],
    ['추출일', ctx.meta.date],
    ['개원·운영 단계', `${op.stats.total} (${Object.entries(op.stats.byCountry).map(([c, n]) => `${c} ${n}`).join(' · ')} · 파생 ${op.stats.derived} · 사람 기록 ${op.stats.manual})`],
    ['Go-Live', `${gl.stats.total} (실검증 ${gl.stats.verified} · 자가신고 ${gl.stats.self}${gl.stats.computed ? ` · 산출 ${gl.stats.computed}` : ''} · 개시 차단 ${gl.stats.blocking})`],
    ['결정 등록부', `${dc.stats.total} (개시 전 필수 ${dc.stats.requiredBefore})`],
    ['가림', `기관 정보 ${redactions.deny}곳 · 인프라 정보 ${redactions.infra}곳 — ${TOKEN_DENY} · ${TOKEN_INFRA} 로 표시`],
  ]), '');
  L.push('## 이렇게 만듭니다', '');
  L.push('```sh');
  L.push('node tools/extract-checklist.mjs          # 다시 만들기');
  L.push('node tools/extract-checklist.mjs --check  # 표가 코드와 같은지 확인만(쓰지 않음)');
  L.push('```', '');
  L.push('- 레지스트리의 배열 리터럴을 TypeScript 구문 트리로 읽고, **리터럴 값만** 옮깁니다. 계산식으로 정해지는 값은 추측하지 않고 `(코드에서 산출)`로 적습니다.');
  L.push('- 기준 커밋의 파일을 읽습니다. 작업 중인(커밋하지 않은) 변경은 반영하지 않습니다.');
  L.push('- 추출기는 HIS 저장소를 읽기만 합니다. 실행 전후로 저장소 상태를 비교해, 바뀌었으면 실패합니다.');
  L.push(`- 기관을 알아볼 수 있는 정보는 생성할 때 가립니다(${TOKEN_DENY}). 서버 주소·경로 같은 인프라 정보도 가립니다(${TOKEN_INFRA}).`);
  L.push('- 판정 방식(실검증·자가신고·파생)은 HIS 서비스 코드의 판정 규칙을 확인한 뒤에만 적습니다. 규칙을 찾지 못하면 그 칸을 `(코드에서 산출)`로 둡니다.');
  L.push('- 항목 이름·담당·선택지·비고는 원본 문구 그대로입니다. 확인 방식·판정·적용 방식 칸의 설명 문구와 영문 값의 한국어 이름은 추출기가 붙입니다.', '');
  L.push('## 이 표가 말하지 않는 것', '');
  L.push('- **전수 목록이 아닙니다.** 기관의 종별·지역·특례에 따라 항목이 늘거나 빠집니다. 설치본의 화면에서 기관 항목을 더할 수 있습니다.');
  L.push('- **법령 근거와 처리 기한은 적지 않습니다.** 구축 기관이 확인해 채웁니다.');
  L.push('- **현재 상태를 말하지 않습니다.** 어느 항목이 끝났는지는 설치본마다 다르며, 각 화면에서 확인합니다.');
  L.push('');
  return L.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// 실행
// ─────────────────────────────────────────────────────────────────────────────

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 🔴 가림이 실제로 되는지 — 가짜 값을 넣어 확인한다(대조군 포함).
 *    가짜 값은 실행할 때 조각을 이어 만든다(이 파일 자체가 공개 검사기에 걸리지 않게).
 */
function selfTest() {
  const J = (...p) => p.join('');
  const fakeTerm = J('가상기관', '추출검사용');
  const { redact, counts, hitIds } = makeRedactor([fakeTerm]);
  const must = {
    denylist: `${fakeTerm} 에서 시연`,
    ipv4: `서버 ${['203', '0', '113', '77'].join('.')}`,
    'server-path': `백업 경로 ${J('/ho', 'me/someone/backups/app')}`,
    'local-path': `원본 ${J('/Us', 'ers/someone/project/file')}`,
    email: `문의 ${J('someone', '@', 'realmail.co')}`,
    'host-port': `접속 ${J('api.internal-host.co', ':8443')}`,
    'secret-assign': J('DB_PASS', 'WORD=', 'hunter2secret'),
    'cred-url': J('postgres://user', ':pa55word@', 'db.internal/app'),
  };
  const keep = [
    '화면 `/admin/opening` 에서 확인',
    '관리 화면(/admin/go-live)이 정본',
    'https://example.org 에 접속',
    'localhost 는 127.0.0.1',
    'docs/05-reference/operating-modes.md',
  ];
  const results = [];
  for (const [k, v] of Object.entries(must)) {
    const out = redact(v, `t:${k}`);
    results.push([`가려야 함: ${k}`, out !== v && (out.includes(TOKEN_INFRA) || out.includes(TOKEN_DENY))]);
  }
  results.push(['가린 뒤 원래 값이 남지 않음', !Object.values(must).some((v) => redact(v).includes('hunter2secret') || redact(v).includes(fakeTerm))]);
  for (const v of keep) results.push([`남겨야 함: ${v}`, redact(v, 't:keep') === v]);
  results.push(['건수를 셈', counts.deny >= 1 && counts.infra >= Object.keys(must).length - 1]);
  results.push(['가린 항목 id 를 기록', hitIds.has('t:denylist') && !hitIds.has('t:keep')]);
  // 리터럴 판독 — 계산식은 추측하지 않고 "(코드에서 산출)"로 남는가(HIS 의 typescript 가 있을 때만)
  const repos = loadRepos();
  if (repos?.his && fs.existsSync(repos.his)) {
    ts = createRequire(path.join(repos.his, 'package.json'))('typescript');
    const sf = ts.createSourceFile('t.ts', "const X = [{ a: 'x', b: foo(), c: 'p' + 'q' + 'r', d: `t${y}`, e: ['k', z], ...w }, bar];", ts.ScriptTarget.Latest, true);
    const { items, warnings } = registryArray(sf, 'X');
    const o = items[0];
    results.push(['리터럴은 그대로 읽음', o.a === 'x' && o.c === 'pqr']);
    results.push(['계산식은 산출 표기(함수 호출·템플릿 치환·배열 속 변수)', cell(o.b) === COMPUTED && cell(o.d) === COMPUTED && cell(o.e) === COMPUTED]);
    results.push(['객체가 아닌 원소·스프레드는 경고하고 행을 남김', items.length === 2 && items[1].__computedRow === true && warnings.length === 2]);
  } else {
    console.log('? 리터럴 판독 검증 미실행 — HIS 저장소(typescript)를 찾지 못함');
  }
  let ok = true;
  for (const [name, pass] of results) { console.log(`${pass ? '✓' : '✗'} ${name}`); ok &&= pass; }
  console.log(ok ? '\n자기 검증 통과' : '\n🔴 자기 검증 실패 — 이 추출기의 가림을 믿지 말 것');
  return ok;
}

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--self-test')) return selfTest() ? 0 : 2;
  const CHECK = args.has('--check');
  const DRY = args.has('--dry-run');

  const denylist = loadDenylist();
  if (!denylist) {
    console.log('미실행 — 거부 목록이 없습니다(tools/.denylist.local 또는 DENYLIST_FILE). 가리지 못하는 상태로는 만들지 않습니다.');
    return 3;
  }
  const repos = loadRepos();
  if (!repos?.his || !fs.existsSync(repos.his)) {
    console.log('미실행 — 로컬 설정(tools/.local.json)에 HIS 저장소 경로가 없습니다.');
    return 3;
  }
  const his = repos.his;
  const before = fingerprint({ his });

  let result;
  try {
    const require = createRequire(path.join(his, 'package.json'));
    ts = require('typescript');

    const st = repoState(his, baseCommit('his', his).hash); // 고정된 기준 커밋(data/base-commits.json) · 없으면 HEAD
    if (!st.head) throw new Error('HIS 기준 커밋을 읽지 못했습니다');
    const show = (rel) => git(his, ['show', `${st.head}:${rel}`]);
    const src = Object.fromEntries(Object.entries(SRC).map(([k, rel]) => [k, show(rel)]));
    const dirty = git(his, ['status', '--porcelain', '--', ...Object.values(SRC)]);

    const csf = ts.createSourceFile('constants.ts', src.constants, ts.ScriptTarget.Latest, true);
    const hisVersion = constLit(csf, 'HIS_VERSION');

    // 교차 확인용 키 집합(개원 항목이 가리키는 Go-Live·결정 키가 실제로 있는가)
    const gsf = ts.createSourceFile('g.ts', src.goLive, ts.ScriptTarget.Latest, true);
    const dsf = ts.createSourceFile('d.ts', src.decision, ts.ScriptTarget.Latest, true);
    const ctx = {
      meta: { hisVersion: isComp(hisVersion) ? COMPUTED : hisVersion, head: st.head, headDate: st.headDate, date: today() },
      goLiveKeys: new Set(registryArray(gsf, 'GO_LIVE_REGISTRY').items.map((i) => i.key)),
      decisionKeys: new Set(registryArray(dsf, 'DECISION_REGISTRY').items.map((i) => i.key)),
    };

    const files = {}; const perFile = {}; const warnings = []; const hitIds = new Set();
    const run = (name, fn) => {
      const r = makeRedactor(denylist);
      const out = fn(r.redact);
      const final = r.redact(out.text, `${name}:(본문)`); // 안전망 — 셀 단위에서 이미 가렸으면 0
      files[name] = final.endsWith('\n') ? final : `${final}\n`;
      perFile[name] = { ...r.counts };
      r.hitIds.forEach((id) => hitIds.add(id));
      warnings.push(...out.warnings);
      return out;
    };
    const op = run('opening.md', (R) => buildOpening(src, ctx, R));
    const gl = run('go-live.md', (R) => buildGoLive(src, ctx, R));
    const dc = run('decisions.md', (R) => buildDecisions(src, ctx, R));
    const total = Object.values(perFile).reduce((a, c) => ({ infra: a.infra + c.infra, deny: a.deny + c.deny }), { infra: 0, deny: 0 });
    run('README.md', (R) => ({ text: buildReadme(ctx, op, gl, dc, total), warnings: [] }));

    result = { files, perFile, warnings, hitIds, ctx, dirty, op, gl, dc };
  } catch (e) {
    console.error('추출기 오류:', e?.message ?? e);
    return 2;
  } finally {
    const changed = sameFingerprint(before, fingerprint({ his }));
    if (changed.length) console.log(concurrentNote(changed)); // 기준 커밋만 읽으므로 값에는 영향 없음
  }

  const { files, perFile, warnings, hitIds, ctx, dirty, op, gl, dc } = result;
  console.log(`HIS ${ctx.meta.hisVersion} · 기준 커밋 ${ctx.meta.head.slice(0, 12)} (${ctx.meta.headDate})`);
  if (dirty) console.log('주의: 추출 대상 파일에 커밋하지 않은 변경이 있습니다 — 기준 커밋의 내용으로 뽑았습니다.');
  console.log(`항목: 개원·운영 ${op.stats.total} · Go-Live ${gl.stats.total} · 결정 ${dc.stats.total}`);
  for (const [f, c] of Object.entries(perFile)) console.log(`가림 ${f}: 기관 정보 ${c.deny} · 인프라 정보 ${c.infra}`);
  const ids = [...hitIds].sort();
  console.log(`가림이 들어간 항목: ${ids.length ? ids.join(', ') : '없음'}`);
  for (const w of warnings) console.log(`경고: ${w}`);

  const norm = (s) => s.replace(DATE_ROW, '| 추출일 | - |');
  if (CHECK) {
    const diff = Object.entries(files).filter(([f, text]) => {
      const p = path.join(OUT_DIR, f);
      return !fs.existsSync(p) || norm(fs.readFileSync(p, 'utf8')) !== norm(text);
    }).map(([f]) => f);
    if (diff.length) { console.log(`\n불일치 — 다시 만들어야 합니다: ${diff.join(', ')}`); return 1; }
    console.log('\n일치 — 표가 코드와 같습니다(추출일 줄은 비교하지 않음)');
    return 0;
  }
  if (DRY) { console.log('\n--dry-run — 파일을 쓰지 않았습니다'); return 0; }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [f, text] of Object.entries(files)) {
    const p = path.join(OUT_DIR, f);
    // 내용이 같고 날짜만 다르면 쓰지 않는다(날짜만 바뀌는 커밋을 만들지 않게)
    if (fs.existsSync(p) && norm(fs.readFileSync(p, 'utf8')) === norm(text)) continue;
    fs.writeFileSync(p, text);
    console.log(`썼음 checklist/${f}`);
  }
  return 0;
}

process.exitCode = main();
