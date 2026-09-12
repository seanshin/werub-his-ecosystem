#!/usr/bin/env node
/**
 * 연동 계약 지도 매트릭스 생성 — 연결 상태 표에서 만든다(D 산출물).
 *
 *   node tools/build-integration-map.mjs          # 다시 만들기
 *   node tools/build-integration-map.mjs --check  # 연결 상태 표와 같은지 확인만
 *
 * 입력  RELEASES/draft/compatibility.md
 * 출력  integration/matrix.md
 *
 * 종료 코드: 0 일치 · 1 불일치(--check) · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'RELEASES/draft/compatibility.md';
const OUT = 'integration/matrix.md';
const check = process.argv.includes('--check');

const STATUS = ['검증됨', '구현·미검증', '설계만', '미구현', '중단', '판정 불가'];
const SYSTEMS = ['HIS', '공개 홈페이지', '환자 앱', 'LIS', 'PACS', 'sign', 'ERP', 'AI Server', 'twin', 'cerno', 'Clinic', 'edu', 'Jitsi', '촬영 장비', '검사 장비', '외부 PACS', '대외 기관'];

/** 프로토콜 문자열 → 묶음 */
function family(proto) {
  const p = proto.toLowerCase();
  if (p.includes('fhir')) return 'FHIR R4';
  if (p.includes('hl7')) return 'HL7 v2';
  if (p.includes('dicom') || p.includes('dimse') || p.includes('c-find') || p.includes('c-store') || p.includes('mwl') || p.includes('mpps')) return 'DICOM';
  if (p.includes('smart') || p.includes('oauth') || p.includes('sso') || p.includes('jwt') || p.includes('토큰')) return '인증·SSO';
  if (p.includes('웹훅') || p.includes('webhook')) return '웹훅';
  if (p.includes('astm')) return 'ASTM';
  if (p.includes('http')) return 'HTTPS REST';
  return '그 밖';
}
const norm = (s) => String(s).replace(/\*\*/g, '').replace(/\(.*?\)/g, '').trim();

try {
  const md = fs.readFileSync(path.join(ROOT, SRC), 'utf8');
  const pairs = [];
  let cur = null;
  for (const line of md.split('\n')) {
    const h = line.match(/^### (.+?)\s*$/);
    if (h) { cur = { title: h[1].trim(), rows: [] }; pairs.push(cur); continue; }
    if (!cur || !line.startsWith('|')) continue;
    const c = line.split(/(?<!\\)\|/).slice(1, -1).map((x) => x.trim());
    if (c.length < 4 || c[0] === '방향' || /^-+$/.test(c[0])) continue;
    const dir = c[0].match(/^(.+?)\s*→\s*(.+)$/);
    const st = c.map((x) => x.match(/^`([^`]+)`$/)?.[1]).find((x) => STATUS.includes(x));
    if (!dir || !st) continue;
    cur.rows.push({ from: norm(dir[1]), to: norm(dir[2]), purpose: c[1], proto: c[2], status: st });
  }
  const all = pairs.flatMap((p) => p.rows);
  if (!all.length) throw new Error('연결 상태 표에서 행을 읽지 못했다');

  // 시스템별 등장 수
  const touch = new Map();
  for (const r of all) for (const s of [r.from, r.to]) touch.set(s, (touch.get(s) ?? 0) + 1);

  // 프로토콜 묶음별
  const fam = new Map();
  for (const r of all) {
    const f = family(r.proto);
    if (!fam.has(f)) fam.set(f, []);
    fam.get(f).push(r);
  }
  const famOrder = ['FHIR R4', 'DICOM', 'HL7 v2', 'ASTM', 'HTTPS REST', '웹훅', '인증·SSO', '그 밖'];

  const count = (rows, st) => rows.filter((r) => r.status === st).length;
  const L = [];
  L.push('<!-- 생성물 — 직접 수정 금지. `node tools/build-integration-map.mjs` 로 다시 만듭니다. -->');
  L.push('');
  L.push('# 연동 매트릭스');
  L.push('');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. [연결 상태 표](../RELEASES/draft/compatibility.md)가 바뀌면 다시 만듭니다.');
  L.push('');
  L.push('연결을 **시스템 쌍** · **프로토콜** 두 축으로 다시 셉니다. 각 연결의 방향 · 목적 · 프로토콜 · 상태는 연결 상태 표에 있고, 여기서는 **어디에 무엇이 몰려 있는지**를 봅니다.');
  L.push('');
  L.push(`| 기준 | 값 |`);
  L.push('|---|---|');
  L.push(`| 원본 | [연결 상태 표](../RELEASES/draft/compatibility.md)(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음) |`);
  L.push(`| 실은 연결 | ${all.length} |`);
  L.push(`| 시스템 쌍 | ${pairs.length} |`);
  L.push('');

  L.push('## 시스템 쌍별');
  L.push('');
  L.push('| 쌍 | 연결 | 구현·미검증 | 설계만 | 미구현 | 중단 | 판정 불가 |');
  L.push('|---|---:|---:|---:|---:|---:|---:|');
  const sorted = [...pairs].sort((a, b) => b.rows.length - a.rows.length);
  for (const p of sorted) {
    if (!p.rows.length) continue;
    const c = (st) => count(p.rows, st) || '·';
    L.push(`| ${p.title} | ${p.rows.length} | ${c('구현·미검증')} | ${c('설계만')} | ${c('미구현')} | ${c('중단')} | ${c('판정 불가')} |`);
  }
  L.push(`| **합계** | **${all.length}** | ${count(all, '구현·미검증')} | ${count(all, '설계만')} | ${count(all, '미구현')} | ${count(all, '중단')} | ${count(all, '판정 불가')} |`);
  L.push('');
  L.push('> `검증됨` 열은 **0 이라 싣지 않았습니다.** 실제로 호출해 확인한 연결이 아직 없습니다.');
  L.push('');

  L.push('## 시스템별 — 몇 개의 연결에 걸려 있나');
  L.push('');
  L.push('| 시스템 | 걸린 연결 | 보내는 쪽 | 받는 쪽 |');
  L.push('|---|---:|---:|---:|');
  for (const [sys, n] of [...touch.entries()].sort((a, b) => b[1] - a[1])) {
    const out = all.filter((r) => r.from === sys).length;
    const inn = all.filter((r) => r.to === sys).length;
    L.push(`| ${sys} | ${n} | ${out} | ${inn} |`);
  }
  L.push('');
  L.push('> 한 연결이 두 시스템에 각각 한 번씩 걸립니다(합계가 연결 수의 두 배).');
  L.push('');

  L.push('## 프로토콜별');
  L.push('');
  L.push('| 묶음 | 연결 | 구현·미검증 | 미구현 | 중단 | 판정 불가 | 설계만 |');
  L.push('|---|---:|---:|---:|---:|---:|---:|');
  for (const f of famOrder) {
    const rows = fam.get(f);
    if (!rows?.length) continue;
    const c = (st) => count(rows, st) || '·';
    L.push(`| ${f} | ${rows.length} | ${c('구현·미검증')} | ${c('미구현')} | ${c('중단')} | ${c('판정 불가')} | ${c('설계만')} |`);
  }
  L.push('');
  L.push('- 묶음은 연결 상태 표의 **프로토콜 칸 문자열**에서 기계적으로 나눈 것입니다(`FHIR` · `HL7` · `DICOM`/`DIMSE`/`MWL`/`MPPS` · `ASTM` · `SMART`/`OAuth`/`SSO`/토큰 · 웹훅 · 그 밖의 HTTP). **표준 프로파일을 쓴다는 인증이 아닙니다.**');
  L.push('- `HTTPS REST` 가 많은 것은 **표준 프로파일보다 전용 API 로 붙은 연결이 많다**는 뜻입니다 → [취지 6](../overview/02-principles.md#6-도메인마다-독립-시스템-표준으로-연결)');
  L.push('');

  L.push('## 미구현 · 중단 · 판정 불가 — 대체 수단이 필요한 연결');
  L.push('');
  L.push('| 방향 | 목적 | 상태 |');
  L.push('|---|---|---|');
  for (const r of all.filter((x) => ['미구현', '중단', '판정 불가', '설계만'].includes(x.status))) {
    const purpose = r.purpose.length > 78 ? r.purpose.slice(0, 78) + '…' : r.purpose;
    L.push(`| ${r.from} → ${r.to} | ${purpose} | \`${r.status}\` |`);
  }
  L.push('');
  L.push('## 다시 만들기');
  L.push('');
  L.push('```sh');
  L.push('node tools/build-integration-map.mjs          # 다시 만들기');
  L.push('node tools/build-integration-map.mjs --check  # 연결 상태 표와 같은지 확인만');
  L.push('```');
  const out = L.join('\n') + '\n';

  const abs = path.join(ROOT, OUT);
  if (check) {
    const cur2 = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
    if (cur2 !== out) { console.error(`✗ ${OUT} 이 연결 상태 표와 다르다 — build-integration-map 을 다시 돌린다`); process.exit(1); }
    console.log(`✓ 연동 매트릭스 = 연결 상태 표 (연결 ${all.length} · 쌍 ${pairs.length})`);
  } else {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, out);
    console.log(`${OUT} — 연결 ${all.length} · 시스템 쌍 ${pairs.length} · 프로토콜 묶음 ${fam.size}`);
  }
} catch (e) {
  console.error('도구 오류:', e.message);
  process.exit(2);
}
