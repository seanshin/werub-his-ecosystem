#!/usr/bin/env node
/**
 * 릴리즈 기록 계수기 — 시스템 13개(저장소 11개)가 **자기 작업을 어떤 형식으로 남겼는지**와
 * 그 기록이 몇 건인지를 읽기 전용으로 세어 data/release-records.json 에 남긴다.
 *
 *   node tools/count-releases.mjs          # 세어서 스냅샷 기록 + 요약 표 출력
 *   node tools/count-releases.mjs --check  # 다시 세어 기존 스냅샷과 비교(아무것도 쓰지 않는다). 다르면 exit 1
 *
 * 규약
 *   - 🔴 형제 저장소는 읽기만 한다(tools/lib/repos.mjs 의 읽기 허용 목록).
 *   - 작업 트리가 아니라 **기준 커밋(data/base-commits.json)의 내용**을 센다. 같은 기준 커밋이면 언제 세도 같은 값이다.
 *   - 🔴 추정하지 않는다. 세지 못하면 count=null + reason.
 *   - 출력에는 로컬 경로·호스트를 싣지 않는다. 시스템 키·저장소 기준 상대 경로·숫자만.
 *   - 이 수치는 "릴리즈 기록이 몇 건 남았나"이지 "릴리즈를 몇 번 했나"가 아니다. 형식이 시스템마다 달라
 *     시스템 사이의 크고 작음을 비교하는 데 쓰지 않는다(규약 comparability).
 *
 * 종료 코드: 0 성공·일치 · 1 --check 불일치 · 2 도구 오류 · 3 미실행(로컬 설정·저장소 없음)
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, loadRepos, git, baseCommit, loadPins, PINS_REL } from './lib/repos.mjs';

const OUT_REL = 'data/release-records.json';
const OUT = path.join(ROOT, OUT_REL);
const RULES_VERSION = 1;

const CONVENTIONS = {
  countUnit: 'count 는 "릴리즈 기록이 몇 건 남았나"이지 "릴리즈를 몇 번 했나"가 아니다. 한 문서에 여러 판이 묶인 경우(예: v11.4-v11.8)도 한 건으로 센다.',
  comparability: '기록 형식이 시스템마다 다르므로(파일 · 변경이력 절 · 보고서 · 태그) **시스템 사이의 크고 작음 비교에 쓰지 않는다.** 각 시스템이 무엇을 한 건으로 보는지가 다르다.',
  versions: 'first · last 는 파일 이름 또는 절 제목에서 뽑은 버전을 숫자로 정렬한 양 끝이다. 버전이 없는 형식(보고서 · 태그 없음)은 null.',
  state: `기준 커밋은 ${PINS_REL} 에 고정된 해시(pinned=true) 또는 계측 시점의 HEAD.`,
  nullValue: '셀 수 없으면 count=null 과 reason 을 적는다.',
};

/** 시스템별 세는 법 — where 는 저장소 기준 상대 경로 규칙(공개해도 되는 문자열) */
const RULES = {
  his:         { name: 'HIS (+공개 홈페이지 · 환자 앱)', form: '릴리즈 문서 파일', where: 'docs/04-report/RELEASE-v*.md', files: /^docs\/04-report\/RELEASE-v(.+)\.md$/ },
  sign:        { name: 'sign',      form: '변경이력 절',       where: 'CHANGELOG.md `## [x.y.z]`', changelog: 'CHANGELOG.md', heading: /^## \[(\d[^\]]*)\]/ },
  lis:         { name: 'LIS',       form: '변경이력 절',       where: 'CHANGELOG.md `## [x.y.z]`', changelog: 'CHANGELOG.md', heading: /^## \[(\d[^\]]*)\]/ },
  erp:         { name: 'ERP',       form: '세션 · 마일스톤 보고서', where: 'docs/04-report/*.report.md', files: /^docs\/04-report\/.+\.report\.md$/ },
  pacs:        { name: 'PACS',      form: '릴리즈 문서 파일',   where: 'docs/releases/v*.md', files: /^docs\/releases\/v(.+)\.md$/ },
  'ai-server': { name: 'AI Server', form: '릴리즈 문서 파일',   where: 'docs/RELEASE_v*.md', files: /^docs\/RELEASE_v(.+)\.md$/ },
  twin:        { name: 'twin',      form: '보고서 + 핸드오프',  where: 'docs/04-report/*.md', files: /^docs\/04-report\/.+\.md$/ },
  cerno:       { name: 'cerno',     form: '변경이력 절',       where: 'CHANGELOG.md `## vx.y.z`', changelog: 'CHANGELOG.md', heading: /^## v(\S+)/ },
  edu:         { name: 'edu',       form: '변경이력 절',       where: 'CHANGELOG.md `## vx.y.z`', changelog: 'CHANGELOG.md', heading: /^## v(\S+)/ },
  clinic:      { name: 'Clinic (병원 서비스만)', form: '릴리즈 문서 파일', where: 'docs/04-report/release-hospital*.md', files: /^docs\/04-report\/release-hospital.*\.md$/ },
  jitsi:       { name: 'Jitsi',     form: '태그',             where: 'git tag', tags: true },
};

const args = new Set(process.argv.slice(2));
const CHECK = args.has('--check');

let REPOS = null;
function sanitize(msg) {
  let s = String(msg);
  if (REPOS) for (const [k, dir] of Object.entries(REPOS)) s = s.split(dir).join(`<${k}>`);
  return s.split(ROOT).join('.').split(os.homedir()).join('~');
}
const fail = (code, msg) => { console.error(sanitize(msg)); process.exit(code); };

const norm = (v) => String(v).trim().replace(/^v/i, '');
function cmpVer(a, b) {
  const pa = norm(a).split(/[.\-]/), pb = norm(b).split(/[.\-]/);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = Number(pa[i] ?? 0), y = Number(pb[i] ?? 0);
    if (Number.isNaN(x) || Number.isNaN(y)) { const d = String(pa[i] ?? '').localeCompare(String(pb[i] ?? '')); if (d) return d; continue; }
    if (x - y) return x - y;
  }
  return 0;
}

function countOne(key, rule, dir) {
  const { hash, pinned } = baseCommit(key, dir);
  const out = { name: rule.name, repoKey: key, form: rule.form, where: rule.where, commit: hash, pinned, count: null, first: null, last: null };
  try {
    let versions = [];
    if (rule.files) {
      const names = git(dir, ['ls-tree', '-r', '--name-only', hash]).split('\n');
      const hit = names.filter((n) => rule.files.test(n));
      out.count = hit.length;
      versions = hit.map((n) => (n.match(rule.files) ?? [])[1]).filter(Boolean);
    } else if (rule.changelog) {
      const text = git(dir, ['show', `${hash}:${rule.changelog}`]);
      const hit = text.split('\n').map((l) => l.match(rule.heading)).filter(Boolean);
      out.count = hit.length;
      versions = hit.map((m) => m[1]);
    } else if (rule.tags) {
      const tags = git(dir, ['tag', '--merged', hash]).split('\n').map((t) => t.trim()).filter(Boolean);
      out.count = tags.length;
      versions = tags;
    }
    versions = versions.filter((v) => /^\d/.test(norm(v))).sort(cmpVer);
    if (versions.length) { out.first = versions[0]; out.last = versions[versions.length - 1]; }
  } catch (e) {
    out.count = null;
    out.reason = sanitize(e.message);
  }
  return out;
}

function main() {
  REPOS = loadRepos();
  if (!REPOS) fail(3, `미실행 — tools/.local.json 이 없다(형제 저장소 경로 미설정). ${OUT_REL} 를 갱신하지 않았다.`);
  loadPins();
  const systems = {};
  for (const [key, rule] of Object.entries(RULES)) {
    const dir = REPOS[key];
    if (!dir || !fs.existsSync(dir)) fail(3, `미실행 — 저장소를 찾지 못함: ${key}`);
    systems[key] = countOne(key, rule, dir);
  }
  const snapshot = { measuredAt: new Date().toISOString().slice(0, 10), tool: { name: 'tools/count-releases.mjs', rulesVersion: RULES_VERSION }, conventions: CONVENTIONS, systems };

  if (CHECK) {
    if (!fs.existsSync(OUT)) fail(1, `${OUT_REL} 가 없다 — 먼저 node tools/count-releases.mjs 를 돌린다.`);
    const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    const a = JSON.stringify({ ...prev, measuredAt: null }), b = JSON.stringify({ ...snapshot, measuredAt: null });
    if (a !== b) {
      const diffs = Object.keys(RULES).filter((k) => JSON.stringify(prev.systems?.[k]) !== JSON.stringify(systems[k]));
      fail(1, `${OUT_REL} 와 다시 센 값이 다르다${diffs.length ? ` — ${diffs.join(' · ')}` : ''}. 기준 커밋이 옮겨졌으면 다시 세어 기록한다.`);
    }
    console.log(`릴리즈 기록 계수 일치 — 시스템 ${Object.keys(systems).length}`);
    return;
  }

  fs.writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  const w = (s, n) => String(s).padEnd(n);
  console.log(`${w('시스템', 22)}${w('형식', 22)}기록  범위`);
  for (const s of Object.values(systems)) {
    const range = s.first && s.last ? `${s.first} ~ ${s.last}` : '—';
    console.log(`${w(s.name, 22)}${w(s.form, 22)}${String(s.count ?? '—').padStart(4)}  ${range}`);
  }
  console.log(`\n→ ${OUT_REL}`);
}

try { main(); } catch (e) { fail(2, e.stack ?? e.message); }
