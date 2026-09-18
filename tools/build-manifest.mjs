#!/usr/bin/env node
/**
 * 통합 릴리즈 매니페스트 생성기 — "이 자료가 설명하는 것은 정확히 어느 버전 조합인가"를 한 장으로 고정한다.
 *
 *   node tools/build-manifest.mjs            # RELEASES/2026.09/manifest.json · manifest.md 를 만든다
 *   node tools/build-manifest.mjs --check    # 다시 만들어 기존 파일과 비교만 한다(쓰지 않음 · 다르면 종료 코드 1)
 *
 * 무엇을 어디서 읽나
 *   - 버전 · 기준 커밋 · 다른 표기  ← data/scale-snapshot.json (계측기 생성물). 🔴 먼저 `measure-scale --check` 로
 *     스냅샷이 지금 저장소와 같은지 확인한다. 낡았으면 만들지 않는다.
 *   - 릴리즈일 · 라이선스 표기      ← 형제 저장소의 **기준 커밋**(스냅샷의 state.head = data/base-commits.json 고정값)을 읽기 전용으로 읽는다
 *   - 구현 상태 · 소스 링크         ← RELEASES/2026.09/inputs.json (사람이 적는 값 — 코드에서 뽑을 수 없는 판단)
 *
 * 규약
 *   - 조용히 한쪽을 고르지 않는다. 버전 표기가 다르면 어긋남으로 적고 등급을 매긴다.
 *       주요 = 태그·릴리즈 기록이 정본과 다름 · 표면 = 화면·API 에 보이는 버전 상수가 다름 · 참고 = 하위 패키지 선언만 다름
 *   - 모르는 값은 null + 사유. 추정하지 않는다.
 *   - 라이선스는 종류와 위치(파일 이름)만 적는다. 저작권자 문구는 옮기지 않는다.
 *
 * 종료 코드: 0 성공(또는 --check 일치) · 1 --check 불일치 · 2 오류(형제 저장소 변경·스냅샷 낡음 포함) · 3 미실행(로컬 설정 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, loadRepos, git, fingerprint, sameFingerprint, concurrentNote } from './lib/repos.mjs';

const SNAPSHOT = path.join(ROOT, 'data/scale-snapshot.json');
const DRAFT = path.join(ROOT, 'RELEASES/2026.09');
const INPUTS = path.join(DRAFT, 'inputs.json');
const OUT_JSON = path.join(DRAFT, 'manifest.json');
const OUT_MD = path.join(DRAFT, 'manifest.md');
const STATUS_WORDS = new Set(['개발', '통합', '파일럿', '운영', '중단', '확인 필요']);
const LICENSE_TARGET = 'MIT'; // 결정 D2 — 생태계 소프트웨어는 MIT 로 제공한다. 각 저장소 표기 정리는 사람이 한다(D3)

const fail = (code, msg) => { console.error(msg); process.exit(code); };
const tryGit = (dir, args) => { try { return git(dir, args); } catch { return null; } };
const norm = (v) => String(v ?? '').trim().replace(/^v/i, '');

// ── 어긋남 등급 ────────────────────────────────────────────────────────────────
function classify(where) {
  if (/저장소 전체의 태그/.test(where)) return { kind: '모노레포 태그', grade: '비교 안 함' };
  if (/^git describe/.test(where)) return { kind: '태그', grade: '주요' };
  if (/CHANGELOG|release|릴리즈/i.test(where)) return { kind: '릴리즈 기록', grade: '주요' };
  if (/package\.json version$/.test(where) || /pyproject/.test(where)) return { kind: '하위 패키지 선언', grade: '참고' };
  return { kind: '화면·API 표기', grade: '표면' }; // version.ts · index.ts · openapi · app.json 등
}
const GRADE_ORDER = ['주요', '표면', '참고'];

function mismatches(version) {
  const out = [];
  for (const d of version.otherDeclarations ?? []) {
    const c = classify(d.where);
    if (c.grade === '비교 안 함') { out.push({ ...c, value: d.value, where: d.where, differs: null }); continue; }
    const differs = norm(d.value) !== norm(version.value);
    if (differs) out.push({ ...c, value: d.value, where: d.where, differs });
  }
  const graded = out.filter((m) => m.differs);
  const grade = GRADE_ORDER.find((g) => graded.some((m) => m.grade === g)) ?? '없음';
  return { grade, items: out };
}

// ── 릴리즈일 ─────────────────────────────────────────────────────────────────
function releaseDate(dir, version, base, scope = null) {
  // scope: 모노레포처럼 저장소 일부만 이 시스템일 때, 그 경로를 건드린 커밋만 센다(inputs.json pathScope)
  const withAfter = (r, commit) => {
    const after = tryGit(dir, ['log', '--format=%H', `${commit}..${base}`, ...(scope ? ['--', scope] : [])]);
    return { ...r, commitsAfter: after === null ? null : after.split('\n').filter(Boolean).length, ...(scope ? { commitsAfterScope: scope } : {}) };
  };
  if (version.tagForValue) {
    const line = tryGit(dir, ['log', '-1', '--format=%H %cs', version.tagForValue]);
    if (line) {
      const [c, d] = line.split(' ');
      return withAfter({ value: d, method: `정본 버전의 태그 ${version.tagForValue} 가 가리키는 커밋의 날짜` }, c);
    }
  }
  const src = version.source.split(' ')[0];
  if (src.includes('*')) { // PACS — 릴리즈 기록 파일명이 정본
    const file = src.replace('v*.md', `${version.value}.md`);
    const line = tryGit(dir, ['log', '--diff-filter=A', '--format=%H %cs', base, '--', file])?.split('\n').filter(Boolean).pop();
    if (!line) return { value: null, method: null, commitsAfter: null, reason: '릴리즈 기록 파일의 첫 커밋을 찾지 못함' };
    const [c, d] = line.split(' ');
    return withAfter({ value: d, method: `릴리즈 기록 ${file} 이 처음 커밋된 날짜` }, c);
  }
  const line = tryGit(dir, ['log', '-1', '--format=%H %cs', `-S${version.value}`, base, '--', src]);
  if (!line) return { value: null, method: null, commitsAfter: null, reason: '정본 위치에서 버전 문자열이 들어간 커밋을 찾지 못함' };
  const [c, d] = line.split(' ');
  return withAfter({ value: d, method: `정본 위치(${src})에 이 버전 문자열이 들어간 가장 최근 커밋의 날짜 — 태그 없음` }, c);
}

// ── 라이선스 표기 ────────────────────────────────────────────────────────────
function licenseKind(text) {
  if (/MIT License|Permission is hereby granted, free of charge/i.test(text)) return 'MIT';
  if (/proprietary|독점|all rights reserved/i.test(text)) return '독점';
  return null;
}
function licenseDeclarations(dir, base, pkgDir = '') {
  const tracked = new Set((tryGit(dir, ['ls-tree', '-r', '--name-only', base]) ?? '').split('\n'));
  const show = (f) => tryGit(dir, ['show', `${base}:${f}`]);
  const found = [];
  for (const f of ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'COPYING']) {
    if (!tracked.has(f)) continue;
    found.push({ where: f, kind: licenseKind(show(f)?.split('\n').slice(0, 40).join('\n') ?? '') ?? '기타(확인 필요)' });
  }
  for (const f of [...new Set(['package.json', pkgDir && `${pkgDir}/package.json`].filter(Boolean))]) {
    if (!tracked.has(f)) continue;
    try {
      const lic = JSON.parse(show(f)).license;
      if (lic) found.push({ where: `${f} license`, kind: lic === 'UNLICENSED' ? 'UNLICENSED(비공개 선언)' : lic });
    } catch { /* JSON 이 아니면 건너뛴다 */ }
  }
  if (tracked.has('README.md')) {
    const lines = (show('README.md') ?? '').split('\n').filter((l) => /licen[cs]e|라이선스|all rights reserved|proprietary/i.test(l));
    const k = lines.map(licenseKind).find(Boolean);
    if (k) found.push({ where: 'README.md', kind: k });
  }
  const isMit = found.length > 0 && found.every((d) => d.kind === 'MIT');
  return {
    declared: found.length ? found : [{ where: null, kind: '표기 없음' }],
    target: LICENSE_TARGET,
    status: isMit ? '목표와 같음' : '정리 전 — 저장소 표기가 목표(MIT)와 다름',
  };
}

// ── 조립 ─────────────────────────────────────────────────────────────────────
function build(repos) {
  const snap = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'));
  const inputs = JSON.parse(fs.readFileSync(INPUTS, 'utf8'));
  const systems = {};
  const licenseCache = new Map();
  for (const [key, s] of Object.entries(snap.systems)) {
    const dir = repos[s.repoKey];
    if (!dir) fail(2, `도구 오류: 로컬 설정에 저장소 키 "${s.repoKey}" 가 없다`);
    const inp = inputs.systems[key];
    if (!inp) fail(2, `입력 누락: inputs.json 에 "${key}" 가 없다`);
    if (!STATUS_WORDS.has(inp.status)) fail(2, `입력 오류: "${key}" 상태 "${inp.status}" 는 정해진 어휘가 아니다`);
    const pkgDir = s.version.source.startsWith('packages/') ? s.version.source.split('/').slice(0, 2).join('/') : '';
    const base = s.state.head;
    const lkey = `${s.repoKey}:${pkgDir}`;
    if (!licenseCache.has(lkey)) licenseCache.set(lkey, licenseDeclarations(dir, base, pkgDir));
    systems[key] = {
      name: s.name,
      repoKey: s.repoKey,
      version: {
        value: s.version.value,
        source: s.version.source,
        note: s.version.note ?? null,
        tag: s.version.tagForValue ?? null,
        mismatches: mismatches(s.version),
      },
      baseCommit: { hash: base, date: s.state.headDate, pinned: s.state.pinned ?? false },
      releaseDate: releaseDate(dir, s.version, base, inp.pathScope ?? null),
      license: licenseCache.get(lkey),
      status: { value: inp.status, note: inp.statusNote ?? null, basis: inputs.statusBasis },
      source: inp.sourceLink ? { link: inp.sourceLink } : { link: null, note: '소스 링크 정리 중' },
      scaleSnapshotKey: `data/scale-snapshot.json#systems.${key}`,
    };
  }
  return {
    releaseId: inputs.releaseId,
    releaseIdNote: inputs.releaseIdNote,
    draft: true,
    measuredAt: snap.measuredAt,
    generator: 'tools/build-manifest.mjs',
    conventions: {
      mismatchGrades: '주요 = 태그·릴리즈 기록이 정본과 다름 · 표면 = 화면·API 에 보이는 버전 상수가 다름 · 참고 = 하위 패키지 선언만 다름 · 없음',
      license: `목표 = ${LICENSE_TARGET}(생태계 결정). declared 는 각 저장소 기준 커밋의 표기(종류·위치만 — 저작권자 문구는 옮기지 않음)`,
      status: '구현 상태는 사람이 적는 입력(RELEASES/2026.09/inputs.json)이다. 연결별 상태는 compatibility.md(예정)',
    },
    systems,
  };
}

function renderMd(m) {
  const rows = Object.entries(m.systems).map(([k, s]) => {
    const mm = s.version.mismatches;
    const major = mm.items.filter((i) => i.differs && i.grade === '주요').map((i) => `${i.kind} ${i.value}`).join(' · ');
    const lic = s.license.declared.map((d) => d.kind).join(' · ');
    return `| ${s.name} | \`${s.version.value}\` | ${mm.grade}${major ? ` (${major})` : ''} | \`${s.baseCommit.hash.slice(0, 12)}\` · ${s.baseCommit.date} | ${s.releaseDate.value ?? '—'}${s.releaseDate.commitsAfter ? ` (+${s.releaseDate.commitsAfter}커밋)` : ''} | ${lic} | ${s.status.value}${s.status.note ? ` — ${s.status.note}` : ''} | ${s.source.link ?? '정리 중'} |`;
  });
  return [
    '<!-- 생성물 — 직접 수정 금지. `node tools/build-manifest.mjs` 로 다시 만듭니다. -->',
    '',
    m.releaseId ? `# 통합 릴리즈 매니페스트 \`${m.releaseId}\`` : '# 통합 릴리즈 매니페스트 (초안)',
    '',
    '> **EN** — One pinned combination of the thirteen systems: the version each repository declares at its **base commit**, where that version is read from, how far it is implemented, the licence each repository states for itself, and the source address. Everything else in these materials is written against this combination.',
    '',
    // 번호의 정본은 `inputs.json` 의 releaseId 하나다 — 비어 있으면 「미정」, 채워지면 그 값을 적는다.
    // 🔴 이 분기가 없으면 릴리즈를 자른 뒤 다시 만들 때마다 번호가 「미정」 으로 되돌아간다(cut-release 참조).
    `> 번호: ${m.releaseId ? `**${m.releaseId}**` : `**미정**(${m.releaseIdNote})`} · 계측일 ${m.measuredAt} · 기계 판독용 원본은 [manifest.json](manifest.json)입니다.`,
    '',
    '이 자료의 모든 설명은 아래 버전 조합을 기준으로 합니다.',
    '',
    '| 시스템 | 버전(정본) | 버전 표기 어긋남 | 기준 커밋 | 릴리즈일 | 저장소 라이선스 표기 | 구현 상태 | 소스 |',
    '|---|---|---|---|---|---|---|---|',
    ...rows,
    '',
    '## 읽는 법',
    '',
    `- **버전 표기 어긋남** — ${m.conventions.mismatchGrades}. 어긋난 곳의 전체 목록은 manifest.json 의 \`version.mismatches\` 에 있습니다.`,
    '- **기준 커밋** — 이 자료가 읽은 커밋입니다(`data/base-commits.json` 에 고정). 저장소에 새 커밋이 생겨도 기준 커밋을 옮기기 전까지 이 표는 바뀌지 않습니다.',
    '- **릴리즈일** — 정본 버전에 태그가 있으면 태그 날짜, 없으면 정본 위치에 그 버전이 들어간 커밋 날짜입니다. `(+N커밋)` 은 그 릴리즈 뒤로 기준 커밋까지 버전 번호 없이 더 들어간 커밋 수입니다. 방법은 manifest.json 의 `releaseDate.method` 에 적혀 있습니다.',
    `- **저장소 라이선스 표기** — 각 소스 저장소가 기준 커밋에서 스스로 적은 표기입니다. 생태계 소프트웨어는 ${LICENSE_TARGET} 로 제공하는 것이 목표이며, 저장소 표기는 정리 중입니다. 표기와 목표가 다르면 그대로 적습니다.`,
    `- **구현 상태** — \`개발\` · \`통합\` · \`파일럿\` · \`운영\` 과 단계 밖의 \`중단\` · \`확인 필요\`. 근거: ${m.systems.his.status.basis}.`,
    '- **소스** — 각 시스템의 소스 저장소 주소입니다. **각 프로젝트의 정리가 끝나는 대로 하나씩 공개**되며, 그 전에는 링크가 열리지 않습니다(접근 권한이 아직 없다는 뜻이고, 이 자료가 가리키는 대상은 그 주소입니다).',
    '',
  ].join('\n');
}

// ── 시스템별 요약 대조 ─────────────────────────────────────────────────────────
/**
 * 🔴 요약(systems/<키>.md)은 사람·에이전트가 쓴다. 머리의 버전·기준 커밋이 매니페스트와 같은지 기계로 대조한다.
 * 없는 요약은 "미작성", 값이 다르면 "불일치"(--check 실패).
 */
function checkSummaries(m) {
  const res = [];
  for (const [key, s] of Object.entries(m.systems)) {
    const file = path.join(DRAFT, 'systems', `${key}.md`);
    if (!fs.existsSync(file)) { res.push({ key, state: '미작성' }); continue; }
    const head = fs.readFileSync(file, 'utf8').split('\n').slice(0, 12).join('\n');
    const miss = [];
    if (!head.includes(s.version.value)) miss.push(`버전 ${s.version.value}`);
    if (!head.includes(s.baseCommit.hash.slice(0, 12))) miss.push(`기준 커밋 ${s.baseCommit.hash.slice(0, 12)}`);
    res.push({ key, state: miss.length ? '불일치' : '일치', miss });
  }
  return res;
}

// ── 실행 ─────────────────────────────────────────────────────────────────────
const args = new Set(process.argv.slice(2));
const repos = loadRepos();
if (!repos) fail(3, '미실행 — tools/.local.json 이 없다(통과가 아니다)');

const fresh = spawnSync(process.execPath, [path.join(ROOT, 'tools/measure-scale.mjs'), '--check'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
if (fresh.status !== 0) fail(2, `스냅샷이 지금 저장소와 다르다 — 먼저 \`node tools/measure-scale.mjs\` 로 다시 계측한다(종료 코드 ${fresh.status})`);

const before = fingerprint(repos);
const manifest = build(repos);
const changed = sameFingerprint(before, fingerprint(repos));
if (changed.length) console.log(concurrentNote(changed)); // 기준 커밋만 읽으므로 값에는 영향 없음

const json = `${JSON.stringify(manifest, null, 2)}\n`;
const md = renderMd(manifest);
const summaries = checkSummaries(manifest);
const bad = summaries.filter((r) => r.state === '불일치');
const reportSummaries = () => {
  const count = (st) => summaries.filter((r) => r.state === st).length;
  console.log(`요약 대조: 일치 ${count('일치')} · 불일치 ${count('불일치')} · 미작성 ${count('미작성')}`);
  for (const r of bad) console.log(`  ✗ systems/${r.key}.md — 머리에 없음: ${r.miss.join(' · ')}`);
};
if (args.has('--check')) {
  const same = fs.existsSync(OUT_JSON) && fs.readFileSync(OUT_JSON, 'utf8') === json && fs.existsSync(OUT_MD) && fs.readFileSync(OUT_MD, 'utf8') === md;
  console.log(same ? '일치 — 매니페스트가 저장소·스냅샷·입력과 같다' : '불일치 — `node tools/build-manifest.mjs` 로 다시 만든다');
  reportSummaries();
  process.exit(same && !bad.length ? 0 : 1);
}
fs.writeFileSync(OUT_JSON, json);
fs.writeFileSync(OUT_MD, md);
for (const [k, s] of Object.entries(manifest.systems)) {
  console.log(`${k.padEnd(12)} ${String(s.version.value).padEnd(10)} 어긋남 ${s.version.mismatches.grade.padEnd(3)} 릴리즈일 ${s.releaseDate.value ?? '—'}  라이선스 ${s.license.declared.map((d) => d.kind).join('·')}  상태 ${s.status.value}`);
}
console.log(`\n형제 저장소 실행 전후 동일: ${Object.keys(repos).length}/${Object.keys(repos).length} · 썼다: RELEASES/2026.09/manifest.json · manifest.md`);
reportSummaries();
