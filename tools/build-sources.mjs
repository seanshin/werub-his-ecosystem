#!/usr/bin/env node
/**
 * 소스 받기 안내 `SOURCES.md` 생성 — 저장소 주소 · 기준 커밋 · 설치 진입점을 한 장에 모은다.
 *
 *   node tools/build-sources.mjs            # 다시 만든다
 *   node tools/build-sources.mjs --check    # 다시 만들어 현재 파일과 비교(다르면 실패)
 *
 * 왜 생성기인가 — 주소는 `RELEASES/2026.09/inputs.json`, 커밋은 `data/base-commits.json`,
 * 진입점 파일은 **그 커밋에 실제로 있는지** 형제 저장소에서 확인한다. 손으로 적으면 셋이 어긋난다.
 *
 * 🔴 이 도구는 형제 저장소의 **파일이 있는지만** 본다(`git cat-file -e`). 내용을 읽지 않고,
 *    로컬 경로는 결과물에 쓰지 않는다(경로는 `tools/.local.json` · gitignore).
 * 종료 코드: 0 같음 · 1 다름 · 2 도구 오류 · 3 미실행(로컬 설정 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'SOURCES.md');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

// 시스템 13 → 저장소 12(HIS 저장소 하나가 세 시스템을 담는다)
const SYSTEMS = [
  ['his', 'HIS', 'S1'], ['homepage', '공개 홈페이지', 'S2'], ['patient-app', '환자 앱', 'S2'],
  ['sign', 'sign', 'S4'], ['lis', 'LIS', 'S3'], ['erp', 'ERP', 'S5'], ['pacs', 'PACS', 'S3'],
  ['ai-server', 'AI Server', 'S6'], ['twin', 'twin', 'S5'], ['cerno', 'cerno', 'S5'],
  ['edu', 'edu', 'S5'], ['clinic', 'Clinic', 'S5'], ['jitsi', 'Jitsi', 'S5'],
];
// 저장소 키 → 시스템 키(HIS 저장소는 셋을 담는다)
const REPO_OF = { his: 'his', homepage: 'his', 'patient-app': 'his' };
const repoKey = (sys) => REPO_OF[sys] ?? sys;

// 설치를 시작할 때 처음 보는 파일 후보 — 있는 것만 싣는다
const ENTRY_CANDIDATES = [
  'infra/docker/docker-compose.prod.yml', 'infra/docker-compose.prod.yml', 'infra/docker-compose.yml',
  'docker-compose.prod.yml', 'docker-compose.yml',
  'infra/scripts/deploy.sh', 'infra/deploy.sh', 'install.sh',
  'ecosystem.config.cjs', 'backend/Dockerfile', 'services/core/Dockerfile',
  'gunicorn.conf.py', 'requirements.txt', 'README.md',
];

function entries(dir, commit) {
  const found = [];
  for (const f of ENTRY_CANDIDATES) {
    try { execFileSync('git', ['-C', dir, 'cat-file', '-e', `${commit}:${f}`], { stdio: 'ignore' }); found.push(f); }
    catch { /* 없으면 싣지 않는다 */ }
  }
  return found;
}

function build() {
  const inputs = read('RELEASES/2026.09/inputs.json');
  const base = read('data/base-commits.json');
  let local;
  try { local = read('tools/.local.json'); } catch { return null; } // 미실행

  const rows = [];
  for (const [sys, label, stage] of SYSTEMS) {
    const rk = repoKey(sys);
    const link = inputs.systems[sys]?.sourceLink ?? '';
    const commit = base.commits[rk] ?? '';
    const rel = local.repos[rk];
    const dir = rel ? path.resolve(ROOT, rel) : null;
    const found = dir && commit ? entries(dir, commit) : [];
    rows.push({ sys, label, stage, link, commit, entry: found });
  }
  const seen = new Set();
  const repoRows = rows.filter((r) => { const k = r.link; if (seen.has(k)) return false; seen.add(k); return true; });

  const L = [];
  L.push('# 소스 받기');
  L.push('');
  L.push('**Getting the source**');
  L.push('');
  L.push('> **EN** — Each system lives in its own repository. This page maps the thirteen systems to their repositories, pins the **base commit** every number in these materials was read from, and names the file to open first. **All of them are to be made public**, one at a time as each project finishes its clean-up; until a given one is, its link will not open. An open repository does not mean an MIT licence \u2014 each repository states its own, and they currently differ (\u00a72).');
  L.push('');
  L.push('> 🟢 **위 저장소는 모두 공개할 예정입니다.** 각 프로젝트의 정리가 끝나는 대로 **하나씩** 열립니다. 아직 열리지 않은 주소는 눌러도 열리지 않습니다 — 접근 권한이 없다는 뜻이고, **이 안내는 열리는 순간 그대로 동작합니다**(주소도 커밋도 바뀌지 않습니다).\n>\n> 🔴 **열린 저장소라고 라이선스가 MIT 라는 뜻은 아닙니다** — 저장소마다 표기가 다릅니다(§2).');
  L.push('');
  L.push('이 자료의 모든 수치 · 화면 · 연결 상태는 아래 **기준 커밋**에서 읽은 것입니다. 같은 것을 보려면 그 커밋을 받으십시오 — 최신 커밋은 이 자료보다 앞서 있을 수 있습니다.');
  L.push('');
  L.push('## 1. 어느 저장소에 무엇이 있나');
  L.push('');
  L.push('| 시스템 | 저장소 | 기준 커밋 | 구축 단계 |');
  L.push('|---|---|---|---|');
  for (const r of rows) {
    const short = r.commit ? `\`${r.commit.slice(0, 12)}\`` : '—';
    L.push(`| ${r.label} | [${r.link.replace('https://github.com/', '')}](${r.link}) | ${short} | [${r.stage}](build-guide/${{ S1: 'S1-core-his', S2: 'S2-patient-access', S3: 'S3-clinical-departments', S4: 'S4-trust', S5: 'S5-management', S6: 'S6-ai' }[r.stage]}.md) |`);
  }
  L.push('');
  const repoCount = new Set(SYSTEMS.map((s) => repoKey(s[0]))).size;
  L.push(`**HIS · 공개 홈페이지 · 환자 앱은 한 저장소**입니다(모노레포). 나머지는 시스템마다 저장소가 하나입니다 — 저장소 **${repoCount}개**로 시스템 **${SYSTEMS.length}개**가 됩니다.`);
  L.push('');
  L.push('## 2. 받는 법');
  L.push('');
  L.push('```sh');
  L.push('# 예: HIS');
  L.push('git clone <위 표의 주소>.git his');
  L.push('cd his');
  L.push('git checkout <위 표의 기준 커밋>      # 🔴 이 자료와 같은 것을 보려면 이 커밋');
  L.push('git rev-parse HEAD                    # 표의 커밋과 같은지 확인');
  L.push('```');
  L.push('');
  L.push('- **기준 커밋을 쓰는 이유** — 이 자료의 수치(데이터 모델 수 · 화면 수 · 연결 상태 · 체크리스트 항목 수)는 전부 그 커밋에서 기계로 읽은 것입니다. 최신 커밋을 받으면 **자료와 숫자가 달라집니다**(틀린 것이 아니라 시점이 다른 것입니다).');
  L.push('- **최신으로 세우고 싶다면** 그렇게 해도 됩니다. 다만 이 자료의 「막힌 곳」과 「우회」는 기준 커밋에서 겪은 것이므로, 최신에서는 이미 고쳐졌거나 다른 자리에서 막힐 수 있습니다.');
  L.push('- 저장소마다 **라이선스 표기가 다릅니다**(일부는 독점 · 일부는 표기 없음). 받기 전에 [통합 릴리즈 매니페스트](RELEASES/2026.09/manifest.md)의 「저장소 라이선스 표기」 칸을 보십시오. **이 소개 저장소의 MIT 는 이 자료에만 적용됩니다.**');
  L.push('');
  L.push('## 3. 받은 뒤 처음 여는 파일');
  L.push('');
  L.push('기준 커밋에 **실제로 있는 파일만** 적었습니다(2026-09-17 확인).');
  L.push('');
  L.push('| 저장소 | 처음 여는 파일 |');
  L.push('|---|---|');
  for (const r of repoRows) {
    const e = r.entry.length ? r.entry.map((f) => `\`${f}\``).join(' · ') : '— (설치 진입점을 찾지 못했습니다)';
    L.push(`| ${r.link.replace('https://github.com/', '')} | ${e} |`);
  }
  L.push('');
  L.push('- 🔴 **저장소의 설치 파일이 그대로 도는 것은 아닙니다.** 새 설치본으로 따라가 본 결과, 여러 시스템에서 이미지 빌드 · 스키마 반영 · 기동이 원본 파일로는 막혔습니다 — 무엇이 어떻게 막혔고 어떻게 우회했는지는 [따라가 본 결과](build-guide/follow-along-2026-09.md)와 각 단계 장에 있습니다. **그 장을 먼저 읽고 시작하십시오.**');
  L.push('- 위 표는 "여기서 시작한다"는 뜻이지 "이것만 있으면 된다"는 뜻이 아닙니다.');
  L.push('');
  L.push('## 4. 저장소에 없는 것');
  L.push('');
  L.push('| 없는 것 | 어떻게 구하나 |');
  L.push('|---|---|');
  L.push('| **AI 모델 가중치** | 기관이 약관을 확인하고 직접 받습니다 → [S6](build-guide/S6-ai.md) · [THIRD_PARTY](THIRD_PARTY.md) |');
  L.push('| **코드 마스터**(의약품 · 수가 · 표준 코드) | 발행처에서 받습니다. 저장소에는 반입 경로만 있습니다 → [S0](build-guide/S0-prepare.md) |');
  L.push('| **실환자 데이터** | 필요하지 않습니다. 데모는 가상 병원 데이터입니다 |');
  L.push('| **컨테이너 이미지**(미리 만들어 둔 것) | 배포 여부가 아직 정해지지 않았습니다 — 지금은 각 저장소에서 직접 빌드합니다 |');
  L.push('');
  L.push('## 5. 받은 뒤 어디로');
  L.push('');
  L.push('1. [S0 준비](build-guide/S0-prepare.md) — 장비 · 디스크 · 막아야 할 나가는 연결');
  L.push('2. [따라가 본 결과](build-guide/follow-along-2026-09.md) — 막힌 곳과 우회를 먼저 읽습니다');
  L.push('3. [S1](build-guide/S1-core-his.md) 부터 순서대로');
  L.push('4. 연동을 붙일 때는 [연결 카드](integration/cards/)에서 방향 쌍마다 한 장씩');
  L.push('');
  L.push('---');
  L.push('');
  L.push('> 이 문서는 `node tools/build-sources.mjs` 가 만듭니다 — 주소는 릴리즈 입력값에서, 커밋은 기준 커밋 파일에서, 처음 여는 파일은 **그 커밋에 있는지 확인해** 싣습니다. 손으로 고치지 마십시오.');
  L.push('');
  return L.join('\n');
}

const made = build();
if (made === null) { console.log('미실행 — tools/.local.json 이 없어 저장소를 확인할 수 없습니다'); process.exit(3); }
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== made) { console.log('불일치 — SOURCES.md 가 다시 만든 결과와 다르다. node tools/build-sources.mjs 로 다시 만든다.'); process.exit(1); }
  console.log('일치 — SOURCES.md');
  process.exit(0);
}
fs.writeFileSync(OUT, made);
console.log(`SOURCES.md 생성 — 시스템 ${SYSTEMS.length} · 저장소 ${new Set(SYSTEMS.map((s) => repoKey(s[0]))).size}`);
