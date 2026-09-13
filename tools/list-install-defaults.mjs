#!/usr/bin/env node
/**
 * 바꿔야 할 코드 기본값 목록 — 형제 저장소 11개의 기준 커밋에서 **특정 설치본의 주소**와
 * **기관 식별 문자열**(병원명 · 기관 정보)이 코드에 박힌 파일을 찾아 경로만 적는다.
 *
 *   node tools/list-install-defaults.mjs          # 찾아서 build-guide/replace-list.md 를 새로 쓴다
 *   node tools/list-install-defaults.mjs --check  # 다시 찾아 지금 파일과 비교만 한다(아무것도 쓰지 않는다)
 *
 * 규약
 *   - 🔴 찾는 문구는 거부 목록(tools/.denylist.local · 커밋 금지)에서 읽고, **출력에는 문구를 절대 싣지 않는다.**
 *     경로 · 분류 · 건수만 싣는다. 경로 자체에 문구가 들어 있으면 그 경로를 가린다.
 *   - 분류: 도메인 모양 항목 → `주소` · 그 밖 → `식별`(병원명 · 기관 정보 · 연락처 등)
 *     식별 문자열이 한 줄에서 이메일 주소 안에만 있으면 세지 않는다(작성자 머리말 — 설치본이 바꿀 값이 아니다)
 *   - 🔴 형제 저장소는 읽기만 한다(tools/lib/repos.mjs). 작업 트리가 아니라 기준 커밋의 내용을 읽는다.
 *   - 제외: 문서(*.md · docs/) · 잠금 파일 · 바이너리. 테스트 · 시드는 포함한다(설치본에 들어가므로).
 *
 * 종료 코드: 0 성공·일치 · 1 --check 불일치 · 2 도구 오류 · 3 미실행(로컬 설정 · 저장소 · 거부 목록 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadRepos, git, baseCommit, loadPins } from './lib/repos.mjs';
import { loadDenylist } from './lib/public-rules.mjs';

const OUT_REL = 'build-guide/replace-list.md';
const OUT = path.join(ROOT, OUT_REL);
const CHECK = process.argv.includes('--check');

const SYSTEMS = [
  ['his', 'HIS (+공개 홈페이지 · 환자 앱)', null],
  ['sign', 'sign', null], ['lis', 'LIS', null], ['erp', 'ERP', null], ['pacs', 'PACS', null],
  ['ai-server', 'AI Server', null], ['twin', 'twin', null], ['cerno', 'cerno', null], ['edu', 'edu', null],
  ['clinic', 'Clinic (병원 서비스 웹 · 병원 서비스 API 범위)', ['packages/hospital-web', 'src/app/api/clinic']],
  ['jitsi', 'Jitsi', null],
];
const EXCLUDE = [':!*.md', ':!docs/**', ':!**/docs/**', ':!**/package-lock.json', ':!**/pnpm-lock.yaml', ':!**/yarn.lock', ':!**/poetry.lock'];
const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const isDomain = (t) => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(t);

function fail(code, msg) { console.error(msg); process.exit(code); }

const repos = loadRepos();
if (!repos) fail(3, `미실행 — tools/.local.json 이 없다. ${OUT_REL} 를 갱신하지 않았다.`);
const terms = loadDenylist(ROOT);
if (!terms || !terms.length) fail(3, `미실행 — 거부 목록이 없다. ${OUT_REL} 를 갱신하지 않았다.`);
const pins = loadPins();

const rows = [];
const summary = [];
for (const [key, name, scope] of SYSTEMS) {
  const dir = repos[key];
  if (!dir || !fs.existsSync(dir)) fail(3, `미실행 — 저장소를 찾지 못함: ${key}`);
  let commit;
  try { commit = baseCommit(key, dir, pins).hash; } catch (e) { fail(2, e.message); }
  const files = new Map(); // path -> {addr, ident}
  for (const t of terms) {
    let out = '';
    try { out = git(dir, ['grep', '-n', '-I', '-i', '-F', '-e', t, commit, '--', ...(scope ?? ['.']), ...EXCLUDE]); }
    catch { out = ''; } // 찾은 것이 없으면 git grep 은 1 로 끝난다
    const hit = new Set();
    for (const line of out.split('\n').filter(Boolean)) {
      const rest = line.slice(commit.length + 1);
      const m = rest.match(/^(.*?):(\d+):(.*)$/);
      if (!m) continue;
      // 식별 문자열이 이메일 주소 안에만 있으면(작성자 머리말 등) 세지 않는다 — 설치본이 바꿀 값이 아니다
      if (!isDomain(t) && !m[3].replace(EMAIL, ' ').toLowerCase().includes(t.toLowerCase())) continue;
      hit.add(m[1]);
    }
    for (const p of hit) {
      const rec = files.get(p) ?? { addr: false, ident: false };
      if (isDomain(t)) rec.addr = true; else rec.ident = true;
      files.set(p, rec);
    }
  }
  const lower = terms.map((t) => t.toLowerCase());
  const list = [...files.entries()].map(([p, r]) => {
    const masked = lower.some((t) => p.toLowerCase().includes(t));
    return { path: masked ? '<가림 — 경로에 식별 문자열>' : p, ...r };
  }).sort((a, b) => a.path.localeCompare(b.path));
  const addr = list.filter((r) => r.addr).length;
  const ident = list.filter((r) => r.ident).length;
  summary.push({ key, name, commit: commit.slice(0, 12), total: list.length, addr, ident });
  rows.push({ key, name, list });
}

const total = summary.reduce((a, s) => a + s.total, 0);
let md = `# 바꿔야 할 코드 기본값 — 파일 목록
**Files carrying install-specific defaults**

> **EN** — Generated list of code files (per pinned base commit) that still carry **another installation's address** or **institution-identifying strings** (hospital name, institution details). Paths and categories only — the strings themselves are never printed. Regenerate with \`node tools/list-install-defaults.mjs\`.

> 🤖 **자동 생성 — 손으로 고치지 않습니다.** \`node tools/list-install-defaults.mjs\` 로 다시 만들고, \`--check\` 로 대조합니다. · [가이드 목차](README.md) · 쓰는 곳: [S1 코드에 고정된 병원명 · 설치본 주소 교체](S1-core-his.md#-코드에-고정된-병원명)

- **무엇을 셌나**: 각 저장소의 [기준 커밋](../data/base-commits.json)에서, 공개하지 않는 거부 목록의 문구가 들어 있는 **코드 파일**. 문서(\`*.md\` · \`docs/\`) · 잠금 파일 · 바이너리는 뺐고, **테스트 · 시드는 넣었습니다**(설치본에 함께 들어가기 때문입니다).
- **분류**: \`주소\` = 특정 설치본의 도메인 · \`식별\` = 병원명 · 기관 정보 · 연락처 같은 기관 식별 문자열. 한 파일이 둘 다일 수 있습니다.
- 🔴 **문구는 싣지 않습니다.** 무엇으로 바꿀지는 파일을 열어 보면 드러나고, 바꿀 값은 기관의 값입니다. 경로에 문구가 든 파일은 경로를 가렸습니다. 이메일 주소 안에만 들어 있는 경우(작성자 머리말)는 세지 않았습니다.
- 이 목록은 **"여기를 봐야 한다"** 이지 **"여기만 보면 된다"** 가 아닙니다 — 거부 목록에 없는 형태(다른 표기 · 이미지 속 글자 · DB 에 이미 들어간 값)는 잡히지 않습니다. 바꾼 뒤에는 격리 상태에서 밖으로 나가는 요청이 없는지 봅니다([S0](S0-prepare.md)).

## 한눈에

| 시스템 | 기준 커밋 | 파일 | 주소 | 식별 |
|---|---|---:|---:|---:|
${summary.map((s) => `| [${s.name}](#${s.key}) | \`${s.commit}\` | ${s.total} | ${s.addr} | ${s.ident} |`).join('\n')}
| **합계** | | **${total}** | ${summary.reduce((a, s) => a + s.addr, 0)} | ${summary.reduce((a, s) => a + s.ident, 0)} |
`;
for (const r of rows) {
  md += `\n## ${r.key}\n\n**${r.name}** — ${r.list.length}개\n\n`;
  if (!r.list.length) { md += '없음\n'; continue; }
  md += '| 파일 | 주소 | 식별 |\n|---|:-:|:-:|\n';
  md += r.list.map((f) => `| \`${f.path}\` | ${f.addr ? '●' : ''} | ${f.ident ? '●' : ''} |`).join('\n') + '\n';
}

if (CHECK) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== md) fail(1, `불일치 — ${OUT_REL} 가 기준 커밋에서 다시 만든 결과와 다르다. node tools/list-install-defaults.mjs 로 다시 만든다.`);
  console.log(`일치 — ${OUT_REL}(파일 ${total})`);
} else {
  fs.writeFileSync(OUT, md);
  console.log(`기록 — ${OUT_REL}(파일 ${total})`);
  for (const s of summary) console.log(`  ${s.key.padEnd(10)} ${String(s.total).padStart(4)}  주소 ${s.addr} · 식별 ${s.ident}`);
}
