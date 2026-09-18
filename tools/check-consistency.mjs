#!/usr/bin/env node
/**
 * 문서 간 일치 검사 — 여러 문서가 같은 사실을 같게 말하는지 기계로 대조한다(기획서 §8 · §9-4 · §9-9).
 *
 *   node tools/check-consistency.mjs
 *
 * 대조하는 것
 *   1. 시스템 구성서(systems/<키>.md) 머리의 버전 · 기준 커밋 · 구현 상태 = 매니페스트
 *   2. 시스템 구성서 §7 연동 표의 (방향 · 상태) 묶음 = 연결 상태 표(RELEASES/2026.09/compatibility.md)에서 그 시스템이 걸린 행
 *      — 목적 문구는 장마다 요약해 쓸 수 있으므로 비교하지 않는다. 행이 빠지거나 상태가 바뀐 것을 잡는다.
 *
 * 종료 코드: 0 일치 · 1 불일치 · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const STATUS = ['구현·미검증', '설계만', '미구현', '중단', '판정 불가', '검증됨'];
const NAME = { his: 'HIS', homepage: '공개 홈페이지', 'patient-app': '환자 앱', sign: 'sign', lis: 'LIS', pacs: 'PACS', erp: 'ERP',
  'ai-server': 'AI Server', twin: 'twin', cerno: 'cerno', edu: 'edu', clinic: 'Clinic', jitsi: 'Jitsi' };

/** 시스템 이름 정규화 — 연결 상태 표의 부기(괄호)와 HIS 하위 표면(포털·웹)을 묶는다 */
function norm(s) {
  const t = String(s).replace(/\*\*/g, '').replace(/\(.*?\)/g, '').trim();
  if (/^HIS/.test(t)) return 'HIS';
  if (/^Jitsi/.test(t)) return 'Jitsi';
  return t;
}
const members = (n) => n.split(/\s*·\s*/); // "Clinic · Jitsi" 같은 공동 대상

/** 표에서 (보낸 쪽, 받는 쪽, 상태) 행을 뽑는다 — 첫 칸에 →, 어느 칸이든 `상태` */
function rows(md) {
  const out = [];
  for (const line of md.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
    const dir = cells[0]?.match(/^(.+?)\s*→\s*(.+)$/);
    const st = cells.map((c) => c.match(/^`([^`]+)`$/)?.[1]).find((x) => STATUS.includes(x));
    if (dir && st) out.push({ from: norm(dir[1]), to: norm(dir[2]), status: st });
  }
  return out;
}
const key = (r) => `${r.from} → ${r.to} · ${r.status}`;
function tally(list) { const m = new Map(); for (const r of list) m.set(key(r), (m.get(key(r)) ?? 0) + 1); return m; }

const problems = [];
let checked = 0;
try {
  const manifest = JSON.parse(read('RELEASES/2026.09/manifest.json'));
  const compat = rows(read('RELEASES/2026.09/compatibility.md'));
  if (!compat.length) throw new Error('연결 상태 표에서 행을 읽지 못했다');

  for (const [k, name] of Object.entries(NAME)) {
    const rel = `systems/${k}.md`;
    if (!fs.existsSync(path.join(ROOT, rel))) { problems.push(`${rel}: 파일 없음`); continue; }
    const md = read(rel);
    const m = manifest.systems[k];
    // 1. 머리
    const head = md.split('\n').slice(0, 8).join('\n');
    for (const [label, v] of [['버전', m.version.value], ['기준 커밋', m.baseCommit.hash.slice(0, 12)], ['구현 상태', m.status.value]]) {
      if (!head.includes(v)) problems.push(`${rel}: 머리에 ${label} "${v}" 가 없다(매니페스트와 다름)`);
    }
    // 2. §7 — 이 시스템이 걸린 연결 상태 표 행과 (방향 · 상태) 묶음 비교
    const sec = md.split(/^## 7\./m)[1]?.split(/^## 8\./m)[0];
    if (!sec) { problems.push(`${rel}: §7 연동 절을 찾지 못함`); continue; }
    const involves = (r) => [r.from, r.to].some((n) => n === name || members(n).includes(name));
    const want = tally(compat.filter(involves));
    const got = tally(rows(sec).filter(involves));
    for (const kk of new Set([...want.keys(), ...got.keys()])) {
      const a = want.get(kk) ?? 0, b = got.get(kk) ?? 0;
      if (a !== b) problems.push(`${rel} §7: ${kk} — 연결 상태 표 ${a}행 · 이 장 ${b}행`);
    }
    checked++;
  }
} catch (e) {
  console.error('도구 오류:', e.message);
  process.exit(2);
}

for (const p of problems) console.log(`✗ ${p}`);
console.log(`\n구성서 ${checked}/13 대조 · 불일치 ${problems.length}건`);
process.exit(problems.length ? 1 : 0);
