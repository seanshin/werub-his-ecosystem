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


// 공개판 저장소 표기 — 🔴 공개된 곳만 링크한다(아직 없는 저장소로 거는 링크는 404 다 · 2026-10-27 README 에서 실제로 그랬다)
function repoRef(p) {
  return p.status === '공개' ? `[${p.repo}](https://github.com/${p.repo})` : `\`${p.repo}\` · 준비 중`;
}

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
  const pub = read('data/public-sources.json').repos;
  let local;
  try { local = read('tools/.local.json'); } catch { return null; } // 미실행

  const rows = [];
  for (const [sys, label, stage] of SYSTEMS) {
    const rk = repoKey(sys);
    const link = inputs.systems[sys]?.sourceLink ?? '';
    const p = pub[rk] ?? { status: '준비 중' };
    if (link !== `https://github.com/${p.repo}`) throw new Error(`주소 불일치 — ${sys}: 릴리즈 입력값 ${link} ↔ public-sources ${p.repo}`);
    const commit = base.commits[rk] ?? '';
    let found = [];
    let checkedIn = null;
    if (p.status === '공개') {
      // 공개판은 하위 모듈(source/<key>)의 그 커밋에서 확인한다 — 공개된 것과 같은 것을 본다
      const sub = path.join(ROOT, 'source', rk);
      if (fs.existsSync(path.join(sub, '.git'))) { found = entries(sub, p.commit); checkedIn = '공개판'; }
    } else {
      const rel = local.repos[rk];
      const dir = rel ? path.resolve(ROOT, rel) : null;
      if (dir && commit) { found = entries(dir, commit); checkedIn = '기준 커밋'; }
    }
    rows.push({ sys, label, stage, link, commit, pub: p, entry: found, checkedIn });
  }
  const seen = new Set();
  const repoRows = rows.filter((r) => { const k = r.link; if (seen.has(k)) return false; seen.add(k); return true; });
  const opened = repoRows.filter((r) => r.pub.status === '공개');
  const STAGE = { S1: 'S1-core-his', S2: 'S2-patient-access', S3: 'S3-clinical-departments', S4: 'S4-trust', S5: 'S5-management', S6: 'S6-ai' };

  const L = [];
  L.push('# 소스 받기');
  L.push('');
  L.push('**Getting the source**');
  L.push('');
  L.push(`> **EN** — Development happens in private repositories; what is published is a **public edition** of each system (\`seanshin/werub-…\`, MIT): the final state of the development repository with internal working records and operational details removed, starting from a single commit. They are opened one at a time — ${opened.length} of ${repoRows.length} so far. An opened edition carries the original release tag, is linked as a submodule under \`source/\`, and, where marked, is the same point in time as the base commit every number in these materials was read from. A repository still marked "in preparation" will not open yet.`);
  L.push('');
  L.push(`> 🟢 **개발은 비공개 저장소에서 하고, 공개는 시스템마다 「공개판 저장소」로 합니다.** 공개판은 개발 저장소의 최종 상태에서 **내부 작업 기록(다른 시스템과 주고받은 결함 보고 · 회신 · 키 교체 런북 등)과 운영 정보(운영 도메인 · 서버 주소 · 계정)를 뺀 것**이고, 커밋 하나에서 시작하며 **MIT** 입니다. 정리가 끝난 시스템부터 **하나씩** 엽니다 — 지금 **${opened.length}/${repoRows.length}곳** 공개.\n>\n> 「준비 중」인 주소는 아직 열리지 않습니다.`);
  L.push('');
  L.push('이 자료의 모든 수치 · 화면 · 연결 상태는 개발 저장소의 **기준 커밋**에서 읽은 것입니다. 공개판의 **기준 판**은 원본 태그를 그대로 쓰고, 같은 원본을 다시 내보내면 `-public.N` 을 붙입니다(공개된 이력은 다시 쓰지 않고 그 위에 커밋을 더합니다). 그 커밋과 같은 시점이면 표에 「기준 커밋과 같음」으로 적었습니다.');
  L.push('');
  L.push('## 1. 어느 저장소에 무엇이 있나');
  L.push('');
  L.push('| 시스템 | 공개판 저장소 | 상태 | 기준 판 | 구축 단계 |');
  L.push('|---|---|---|---|---|');
  for (const r of rows) {
    const st = r.pub.status === '공개' ? `🟢 공개(${r.pub.openedAt})` : '준비 중';
    const ver = r.pub.status === '공개'
      ? `\`${r.pub.tag}\` · \`${r.pub.commit.slice(0, 12)}\`${r.pub.fromBase ? ' — 기준 커밋과 같음' : r.pub.note ? ` — ${r.pub.note}` : ''}`
      : '—';
    L.push(`| ${r.label} | ${repoRef(r.pub)} | ${st} | ${ver} | [${r.stage}](build-guide/${STAGE[r.stage]}.md) |`);
  }
  L.push('');
  const repoCount = new Set(SYSTEMS.map((s) => repoKey(s[0]))).size;
  L.push(`**HIS · 공개 홈페이지 · 환자 앱은 한 저장소**입니다(모노레포). 나머지는 시스템마다 저장소가 하나입니다 — 저장소 **${repoCount}개**로 시스템 **${SYSTEMS.length}개**가 됩니다.`);
  L.push('');
  L.push('## 2. 받는 법');
  L.push('');
  L.push('공개된 시스템은 이 저장소의 `source/` 폴더에 **하위 모듈**로 연결되어 있습니다. 둘 중 편한 쪽으로 받습니다.');
  L.push('');
  L.push('```sh');
  L.push('# ① 소개 자료와 공개된 소스를 한 번에');
  L.push('git clone --recurse-submodules https://github.com/seanshin/werub-his-ecosystem.git');
  L.push('');
  L.push('# ② 시스템 하나만 (예: cerno)');
  L.push('git clone https://github.com/seanshin/werub-cerno.git cerno');
  L.push('cd cerno');
  L.push('git checkout <위 표의 기준 판 태그>   # 🔴 이 자료와 같은 것을 보려면 이 판');
  L.push('```');
  L.push('');
  L.push('- **기준 판을 쓰는 이유** — 이 자료의 수치(데이터 모델 수 · 화면 수 · 연결 상태 · 체크리스트 항목 수)는 전부 그 시점에서 기계로 읽은 것입니다. 이후 판을 받으면 **자료와 숫자가 달라집니다**(틀린 것이 아니라 시점이 다른 것입니다).');
  L.push('- **공개판에서 빠진 것** — 내부 작업 기록 문서와 운영 정보입니다. 코드는 그대로이고, 운영 도메인 · 서버 주소 · 계정 같은 값은 예시 값(`example.org` 등)으로 바뀌어 있습니다. 소스 주석이 빠진 문서를 가리키는 곳이 남아 있을 수 있습니다.\n- 🔴 **비밀값은 들어 있지 않습니다** — 비밀번호 · 비밀 · 토큰 · 키는 `CHANGE_ME` 로 비웠습니다. **받은 뒤 직접 정해야 하는 값**은 공개판마다 루트의 `PUBLIC-EDITION.md` 에 목록으로 있습니다.');
  L.push('- **라이선스** — 공개판은 **MIT** 입니다(저장소마다 `LICENSE`). [통합 릴리즈 매니페스트](RELEASES/2026.09/manifest.md)의 「저장소 라이선스 표기」 칸은 개발 저장소의 기준 커밋 표기를 기록한 것입니다.');
  L.push('- **최신으로 세우고 싶다면** 그렇게 해도 됩니다. 다만 이 자료의 「막힌 곳」과 「우회」는 기준 커밋에서 겪은 것이므로, 최신에서는 이미 고쳐졌거나 다른 자리에서 막힐 수 있습니다.');
  L.push('');
  L.push('## 3. 받은 뒤 처음 여는 파일');
  L.push('');
  L.push('그 판에 **실제로 있는 파일만** 적었습니다 — 공개된 곳은 공개판에서, 준비 중인 곳은 개발 저장소의 기준 커밋에서 확인했습니다(준비 중인 곳은 공개판에서 빠질 수 있습니다).');
  L.push('');
  L.push('| 저장소 | 처음 여는 파일 |');
  L.push('|---|---|');
  for (const r of repoRows) {
    const e = r.checkedIn === null ? '— (확인하지 못했습니다)' : r.entry.length ? r.entry.map((f) => `\`${f}\``).join(' · ') : '— (설치 진입점을 찾지 못했습니다)';
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
  L.push('> 이 문서는 `node tools/build-sources.mjs` 가 만듭니다 — 주소는 릴리즈 입력값에서(공개판 상태 `data/public-sources.json` 과 어긋나면 실패), 처음 여는 파일은 **그 판에 있는지 확인해** 싣습니다. 손으로 고치지 마십시오.');
  L.push('');
  return L.join('\n');
}


// source/README.md — 공개판이 들어갈 자리(예측 위치 포함)를 한 장으로. 상태는 data/public-sources.json 하나에서 온다.
const LABEL = { his: 'HIS · 공개 홈페이지 · 환자 앱', sign: 'sign', lis: 'LIS', erp: 'ERP', pacs: 'PACS', 'ai-server': 'AI Server', twin: 'twin', cerno: 'cerno', edu: 'edu', clinic: 'Clinic', jitsi: 'Jitsi' };
function buildSourceIndex() {
  const pub = read('data/public-sources.json').repos;
  const keys = Object.keys(LABEL);
  for (const k of Object.keys(pub)) if (!keys.includes(k)) throw new Error(`source 색인에 없는 저장소 키: ${k}`);
  const opened = keys.filter((k) => pub[k]?.status === '공개');
  // 공개된 자리는 하위 모듈이 실제로 등록돼 있어야 한다(.gitmodules)
  const gm = fs.existsSync(path.join(ROOT, '.gitmodules')) ? fs.readFileSync(path.join(ROOT, '.gitmodules'), 'utf8') : '';
  for (const k of opened) {
    const want = `path = source/${k}`;
    if (!gm.includes(want) || !gm.includes(`url = https://github.com/${pub[k].repo}.git`)) throw new Error(`공개(${k})인데 하위 모듈이 없거나 주소가 다르다 — .gitmodules`);
  }
  for (const m of gm.matchAll(/path = source\/([\w-]+)/g)) if (pub[m[1]]?.status !== '공개') throw new Error(`하위 모듈 source/${m[1]} 이 있는데 상태가 「공개」가 아니다`);
  const L = [];
  L.push('# source — 공개판 소스');
  L.push('');
  L.push('**source — public editions of each system**');
  L.push('');
  L.push(`> **EN** — Each system's public edition is linked here as a git submodule, one folder per repository. The table also lists the folders reserved for editions not yet opened, with the address each will have — ${opened.length} of ${keys.length} are open now. Clone with \`--recurse-submodules\` (or run \`git submodule update --init\`) to fetch the opened ones. How to pick a version and what was removed from an edition: [Getting the source](../SOURCES.md).`);
  L.push('');
  L.push(`이 폴더에는 시스템별 **공개판 저장소**가 하위 모듈로 들어옵니다. 저장소 하나에 폴더 하나이고, 아직 열지 않은 시스템도 **들어갈 자리와 주소를 미리** 적어 두었습니다 — 지금 **${opened.length}/${keys.length}곳** 공개.`);
  L.push('');
  L.push('| 폴더 | 시스템 | 공개판 저장소 | 상태 | 기준 판 |');
  L.push('|---|---|---|---|---|');
  for (const k of keys) {
    const p = pub[k];
    const open = p.status === '공개';
    const folder = open ? `[\`source/${k}\`](${k})` : `\`source/${k}\``;
    const st = open ? `🟢 공개(${p.openedAt})` : '준비 중';
    const ver = open ? `\`${p.tag}\` · \`${p.commit.slice(0, 12)}\`` : '—';
    L.push(`| ${folder} | ${LABEL[k]} | ${repoRef(p)} | ${st} | ${ver} |`);
  }
  L.push('');
  L.push('```sh');
  L.push('git clone --recurse-submodules https://github.com/seanshin/werub-his-ecosystem.git');
  L.push('# 이미 받았다면');
  L.push('git submodule update --init');
  L.push('```');
  L.push('');
  L.push('- 「준비 중」인 폴더는 아직 없습니다. 공개되는 순간 이 표의 이름 그대로 생깁니다.');
  L.push('- 공개판에서 무엇이 빠졌고 어느 판을 받아야 이 자료와 같은지는 [소스 받기](../SOURCES.md)에 있습니다.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('> 이 문서는 `node tools/build-sources.mjs` 가 `data/public-sources.json` 과 `.gitmodules` 를 대조해 만듭니다. 손으로 고치지 마십시오.');
  L.push('');
  return L.join('\n');
}

// README 「시스템 13」 표 — 상태 파일에서 만든다(소스 칸을 손으로 쓰지 않는다)
const README = path.join(ROOT, 'README.md');
const RM_START = '<!-- 시스템 표: 생성물 시작 — tools/build-sources.mjs 가 data/public-sources.json 에서 만든다. 손으로 고치지 않는다 -->';
const RM_END = '<!-- 시스템 표: 생성물 끝 -->';
const SYS_ROWS = [
  ['코어', 'HIS', 'his', '외래 · 입원 · 수술 · 응급 · 검사 · 약제 · 검진 · 원무를 묶는 병원 업무의 중심 · 생태계의 신원 허브', 'his'],
  ['환자 접점', '공개 홈페이지', 'his', '병원 소개 · 예약 · 안내 — 환자가 처음 만나는 바깥 창구', 'homepage'],
  ['환자 접점', '환자 앱', 'his', '예약 · 결과 열람 · 동의 · 문진을 환자 손안에서', 'patient-app'],
  ['임상 부서', 'LIS', 'lis', '진단검사 · 미생물 · 병리 · 수혈 · 유전체 검사정보시스템', 'lis'],
  ['임상 부서', 'PACS', 'pacs', '영상 저장 · 뷰어 · 판독 워크플로', 'pacs'],
  ['신뢰', 'sign', 'sign', '자체 PKI · 타임스탬프 · 장기 검증 전자서명', 'sign'],
  ['경영', 'ERP', 'erp', '재무회계 · 원가 · 인사급여 · 자재 · 보험청구', 'erp'],
  ['AI', 'AI Server', 'ai-server', '기관 안 GPU 한 장으로 도는 AI — 분류 · 요약 · DUR · RAG · 음성 인식 보조', 'ai-server'],
  ['AI', 'twin', 'twin', '환자 · 병원 운영의 위험을 미리 보여 주는 디지털 트윈', 'twin'],
  ['AI', 'cerno', 'cerno', '근거가 있을 때만 답하는 의료진별 임상 질의 도우미', 'cerno'],
  ['협업 · 교육', 'Clinic', 'clinic', '인수인계 · 근무표 · 알림 · 결재 그룹웨어', 'clinic'],
  ['협업 · 교육', 'edu', 'edu', '직원 이러닝 · 법정교육 · 전자 이수증', 'edu'],
  ['협업 · 교육', 'Jitsi', 'jitsi', '원격진료 화상(자체 호스팅)', 'jitsi'],
];
function buildReadmeSystems() {
  const pub = read('data/public-sources.json').repos;
  const L = [RM_START, '', '| 계층 | 시스템 | 하는 일 | 소개서 | 소스 |', '|---|---|---|---|---|'];
  for (const [layer, label, rk, what, intro] of SYS_ROWS) {
    const p = pub[rk];
    const src = p.status === '공개' ? `[${p.repo.replace('seanshin/', '')}](https://github.com/${p.repo}) \`${p.tag}\`` : '준비 중';
    L.push(`| ${layer} | **${label}** | ${what} | [소개서](projects/${intro}.md) | ${src} |`);
  }
  const opened = Object.values(pub).filter((p) => p.status === '공개').length;
  L.push('', `소스는 시스템마다 **공개판 저장소**(MIT)로 하나씩 엽니다 — 지금 **${opened}/${Object.keys(pub).length}곳**. HIS · 공개 홈페이지 · 환자 앱은 한 저장소입니다. 받는 법과 기준 판은 [소스 받기](SOURCES.md), 공개판에서 무엇을 뺐는지는 각 저장소의 \`PUBLIC-EDITION.md\` 에 있습니다.`, '', RM_END);
  return L.join('\n');
}
function withReadmeSystems(cur) {
  const a = cur.indexOf(RM_START), b = cur.indexOf(RM_END);
  if (a < 0 || b < 0) throw new Error('README 에 시스템 표 표시가 없다');
  return cur.slice(0, a) + buildReadmeSystems() + cur.slice(b + RM_END.length);
}
// 🔴 저장소 전체 — 아직 없는 공개판 저장소로 거는 링크 · 맨 주소가 있으면 실패
function deadRepoLinks() {
  const pub = read('data/public-sources.json').repos;
  const closed = Object.values(pub).filter((p) => p.status !== '공개').map((p) => p.repo);
  const bad = [];
  // 🔴 한글 파일 이름은 기본 출력에서 따옴표로 감싸져 열리지 않는다 — quotePath=false · -z
  const files = execFileSync('git', ['-c', 'core.quotePath=false', 'ls-files', '-z', '*.md', '**/*.md'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter((f) => f && !f.startsWith('source/'));
  for (const f of new Set(files)) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const r of closed) {
      const re = new RegExp(`https?://github\\.com/${r.replace('/', '\\/')}(?![\\w-])`, 'g');
      for (const m of t.matchAll(re)) bad.push(`${f}:${t.slice(0, m.index).split('\n').length} → ${r}`);
    }
  }
  return bad;
}

const IDX = path.join(ROOT, 'source', 'README.md');
const made = build();
if (made === null) { console.log('미실행 — tools/.local.json 이 없어 저장소를 확인할 수 없습니다'); process.exit(3); }
let madeIdx;
try { madeIdx = buildSourceIndex(); } catch (e) { console.log(`실패 — ${e.message}`); process.exit(1); } // 🔴 상태 ↔ 하위 모듈 대조를 무엇보다 먼저(쓰기 전에)
const curRm = fs.readFileSync(README, 'utf8');
let madeRm;
try { madeRm = withReadmeSystems(curRm); } catch (e) { console.log(`실패 — ${e.message}`); process.exit(1); }
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== made) { console.log('불일치 — SOURCES.md 가 다시 만든 결과와 다르다. node tools/build-sources.mjs 로 다시 만든다.'); process.exit(1); }
  const curIdx = fs.existsSync(IDX) ? fs.readFileSync(IDX, 'utf8') : '';
  if (curIdx !== madeIdx) { console.log('불일치 — source/README.md 가 다시 만든 결과와 다르다. node tools/build-sources.mjs 로 다시 만든다.'); process.exit(1); }
  if (curRm !== madeRm) { console.log('불일치 — README 시스템 표가 다시 만든 결과와 다르다. node tools/build-sources.mjs 로 다시 만든다.'); process.exit(1); }
  const dead = deadRepoLinks();
  if (dead.length) { console.log(`실패 — 아직 없는 공개판 저장소로 거는 주소 ${dead.length}곳(링크하지 말고 「준비 중」으로):`); dead.slice(0, 20).forEach((d) => console.log(`  ${d}`)); process.exit(1); }
  console.log('일치 — SOURCES.md · source/README.md · README 시스템 표 · 없는 저장소 링크 0');
  process.exit(0);
}
fs.writeFileSync(OUT, made);
fs.mkdirSync(path.dirname(IDX), { recursive: true });
fs.writeFileSync(IDX, madeIdx);
fs.writeFileSync(README, madeRm);
{ const dead = deadRepoLinks(); if (dead.length) { console.log(`⚠ 아직 없는 공개판 저장소로 거는 주소 ${dead.length}곳:`); dead.slice(0, 20).forEach((d) => console.log(`  ${d}`)); } }
console.log(`SOURCES.md 생성 — 시스템 ${SYSTEMS.length} · 저장소 ${new Set(SYSTEMS.map((s) => repoKey(s[0]))).size}`);
