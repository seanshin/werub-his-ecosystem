#!/usr/bin/env node
/**
 * 문서에 흩어진 "수치 주장"이 원본과 같은지 대조한다.
 *
 *   node tools/check-claims.mjs            # 대조(불일치면 종료 코드 1)
 *   node tools/check-claims.mjs --self-test
 *
 * 왜 필요한가 — 같은 사실(검증된 연결 수 등)이 수십 개 문서에 손으로 적혀 있어서,
 * 연결 하나를 확인할 때마다 한 곳만 고치고 나머지가 옛 값으로 남는 일이 실제로 있었다
 * (2026-09-16 검수에서 `검증됨` 1 · 88 · "27개 모두" 가 남아 있는 것을 사람이 찾아냈다).
 *
 * 대조하는 주장
 *   1. `검증됨` N            — 연결 상태 표의 `검증됨` 행 수
 *   2. `구현·미검증` N       — 같은 표의 `구현·미검증` 행 수
 *   3. N / 113 · 연결 113개  — 표에 실린 연결 수
 *   4. 결함 재주입 N         — 「따라가 본 결과」 확인 표에서 결함 칸이 비지 않은 행 수
 *
 * 세는 규칙: 본문 · 표 · 인용구 안의 숫자만 본다. 코드 블록과 생성물은 건너뛴다.
 * 종료 코드: 0 일치 · 1 불일치 · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TABLE = 'RELEASES/draft/compatibility.md';
const FOLLOW = 'build-guide/follow-along-2026-09.md';
const SKIP_DIRS = ['checklist', 'assets', 'data', 'tools', '.git', 'node_modules'];
const SKIP_FILES = [TABLE, 'RELEASES/draft/manifest.md', 'diagrams/connections.md', 'integration/matrix.md'];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/**
 * 코드 블록 무력화 — 명령 예시 안의 숫자는 주장이 아니다.
 * 🔴 줄을 **지우지 않고 비운다**. 지우면 뒤 줄의 번호가 밀려 사람이 엉뚱한 줄을 찾게 된다(실제로 겪었다).
 */
const stripCode = (md) => md.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));

function truth() {
  // 연결 상태 표 — 본 표(방향 · 목적 · 프로토콜 · 상태 · 확인일)의 데이터 행만 센다.
  // 범례 · 요약 표에도 같은 상태 낱말이 적혀 있어서, 상태가 **네 번째 칸**인 행만 고른다.
  // 칸 나누기 — 표 안에서 `\|` 로 이스케이프한 파이프는 칸 구분이 아니다(프로토콜 칸에 실제로 있다).
  const cells = (l) => l.replace(/\\\|/g, '§').split('|').map((x) => x.trim().replace(/§/g, '|'));
  const STATUSES = ['검증됨', '구현·미검증', '설계만', '미구현', '중단', '판정 불가'];
  // 상태 칸은 **끝에서 두 번째**(마지막은 확인일). 범례 표(칸 2개)와는 이것으로 갈린다.
  const statusOf = (l) => {
    const c = cells(l);
    if (c.length < 6) return null;
    const raw = c[c.length - 3] ?? '';
    if (!raw.startsWith('`')) return null; // 요약 표의 머리글("… | 검증됨 | …")은 백틱이 없다
    const s = raw.replace(/^`|`.*$/g, '');
    return STATUSES.includes(s) ? s : null;
  };
  const rows = read(TABLE).split('\n').filter((l) => l.startsWith('| ') && statusOf(l));
  const count = (s) => rows.filter((l) => statusOf(l) === s).length;

  // 따라가 본 결과 — 확인 표는 빈 줄에서 끝난다. 구분선과 머리글 행은 뺀다.
  const f = read(FOLLOW);
  const head = f.indexOf('| 연결 | 무엇을 확인했나');
  const sec = f.slice(head, f.indexOf('\n\n', head));
  const vrows = sec.split('\n')
    .filter((l) => l.startsWith('| ') && !/^\|\s*:?-+/.test(l) && !l.startsWith('| 연결 | 무엇을 확인했나'));
  const fault = vrows.filter((l) => {
    const cell = (l.split('|')[3] ?? '').trim();
    return cell && cell !== '—';
  }).length;
  // 쌍별 집계 — 개요서의 「A ⇄ B | `검증됨` n · …」 줄을 표와 대조하기 위한 것
  const NAMES = ['HIS', 'LIS', 'PACS', 'ERP', 'sign', 'edu', 'AI Server', 'Clinic', 'twin', 'cerno', 'Jitsi', '환자 앱', '공개 홈페이지'];
  const norm = (x) => NAMES.find((n) => x.trim().startsWith(n)) ?? x.trim();
  const pairs = new Map();
  for (const l of rows) {
    const c = cells(l);
    const sides = c[1].split(/→|⇄/).map(norm);
    if (sides.length < 2) continue;
    const key = [sides[0], sides[1]].sort().join(' ⇄ ');
    const m = pairs.get(key) ?? {};
    m[statusOf(l)] = (m[statusOf(l)] ?? 0) + 1;
    pairs.set(key, m);
  }

  // 발표 덱 내용 슬라이드 수 — `## ` 가 내용 슬라이드, `# ` 는 장 표지다
  const deckSlides = read('deck/slides.md').split('\n').filter((l) => l.startsWith('## ')).length;

  return { verified: count('검증됨'), impl: count('구현·미검증'), total: rows.length, fault, checked: vrows.length, pairs, deckSlides };
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) { if (!SKIP_DIRS.includes(e.name)) walk(rel, out); }
    else if (e.name.endsWith('.md') && !SKIP_FILES.includes(rel)) out.push(rel);
  }
  return out;
}

function check(T) {
  const problems = [];
  for (const rel of walk('.')) {
    const md = stripCode(read(rel));
    md.split('\n').forEach((line, i) => {
      const at = `${rel}:${i + 1}`;
      for (const [re, expect, what] of [
        // 🔴 **전체를 가리키는 표현만** 본다. "HIS ⇄ LIS `검증됨` 5" 처럼 쌍·시스템 단위 수치와
        //    "`검증됨`(2026-09-15)" 같은 확인일은 여기서 세지 않는다(그쪽은 check-consistency 가 표와 대조한다).
        [/(\d+)\s*\/\s*113\b/g, T.verified, '「N / 113」의 N'],
        [/`검증됨`\s*\**\s*(?:은|이)\s*\**\s*(\d+)\s*\**\s*(?:입니다|이다|개)/g, T.verified, '「`검증됨` 은 N」'],
        [/이\s*초안에는\s*\**\s*(\d+)\s*개?\**/g, T.verified, '「이 초안에는 N개」'],
        [/(?:실제로\s*)?(?:호출해|호출로)\s*확인한\s*(?:것은|연결은|연결이|연결)\s*\**\s*(\d+)\s*\**\s*개/g, T.verified, '실제 호출로 확인한 연결 수'],
        [/연결\s*(\d+)개(?:를)?\s*(?:중|가운데|실)/g, T.total, '실은 연결 수'],
        [/코드만\s*맞물린\s*것\s*\**\s*(\d+)\s*\**\s*개?/g, T.impl, '코드만 맞물린 연결 수'],
        [/나머지\s*`구현·미검증`\s*\**\s*(\d+)\s*\**\s*개/g, T.impl, '나머지 `구현·미검증` 수'],
      ]) {
        for (const m of line.matchAll(re)) {
          const n = Number(m[1]);
          if (n !== expect) problems.push(`${at} — ${what}: 문서 ${n} · 원본 ${expect}`);
        }
      }
      // 쌍별 수치 — 「HIS ⇄ ERP | `검증됨` 6 · `구현·미검증` 8 · `미구현` 1 |」
      const pm = line.match(/^\|\s*([A-Za-z가-힣 ]+?)\s*⇄\s*([A-Za-z가-힣 ]+?)\s*\|([^|]*)\|/);
      if (pm) {
        const key = [pm[1].trim(), pm[2].trim()].sort().join(' ⇄ ');
        const actual = T.pairs.get(key);
        const claim = {};
        for (const c of pm[3].matchAll(/`([^`]+)`\s*(\d+)/g)) claim[c[1]] = Number(c[2]);
        if (actual && Object.keys(claim).length) {
          const same = Object.keys(claim).length === Object.keys(actual).length
            && Object.entries(claim).every(([k, v]) => actual[k] === v);
          if (!same) {
            const fmt = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(' · ');
            problems.push(`${at} — ${key} 쌍 수치: 문서(${fmt(claim)}) · 연결 표(${fmt(actual)})`);
          }
        }
      }
      // 덱 내용 슬라이드 수
      for (const m of line.matchAll(/(?:내용\s*슬라이드|덱)\s*\**\s*(\d+)\s*\**\s*장/g)) {
        if (Number(m[1]) !== T.deckSlides) problems.push(`${at} — 덱 내용 슬라이드 수: 문서 ${m[1]} · 실제 ${T.deckSlides}`);
      }
      // "27개 모두 … 결함" 류 과장 — 확인 수와 결함 재주입 수가 다르면 "모두" 를 쓸 수 없다
      if (T.fault !== T.verified && new RegExp(`${T.verified}개\\s*\\*{0,2}모두\\*{0,2}[^\\n]{0,40}(결함|변조|틀린 키|위조)`).test(line)) {
        problems.push(`${at} — 확인 ${T.verified}개 중 결함 재주입은 ${T.fault}개인데 "모두" 라고 적었습니다`);
      }
    });
  }
  return problems;
}

if (process.argv.includes('--self-test')) {
  const T = truth();
  const fails = [];
  if (!(T.verified > 0 && T.total > T.verified)) fails.push('원본 집계가 이상합니다');
  if (T.checked !== T.verified) fails.push(`확인 표 행 ${T.checked} ≠ 연결 표의 검증됨 ${T.verified}`);
  if (T.fault > T.verified) fails.push('결함 재주입 수가 확인 수보다 큽니다');
  const probe = stripCode('본문 ```\n`검증됨` 999\n``` 과 `검증됨` 999 입니다');
  if (!probe.includes('999')) fails.push('코드 블록 제거가 본문까지 지웠습니다');
  const real = check(T);
  console.log(`자기 검증 — 원본: 검증됨 ${T.verified} · 구현·미검증 ${T.impl} · 실은 연결 ${T.total} · 결함 재주입 ${T.fault} · 쌍 ${T.pairs.size} · 덱 ${T.deckSlides}장`);
  if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
  console.log(`  ✓ 규칙 3개 통과 · 현재 문서에서 찾은 불일치 ${real.length}건`);
  process.exit(0);
}

try {
  const T = truth();
  const problems = check(T);
  if (problems.length) {
    console.log(`✗ 수치 주장 불일치 ${problems.length}건 (원본: 검증됨 ${T.verified} · 구현·미검증 ${T.impl} · 연결 ${T.total} · 결함 재주입 ${T.fault})`);
    problems.forEach((p) => console.log(`  ${p}`));
    process.exit(1);
  }
  console.log(`일치 — 검증됨 ${T.verified} · 구현·미검증 ${T.impl} · 연결 ${T.total} · 결함 재주입 ${T.fault}`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
