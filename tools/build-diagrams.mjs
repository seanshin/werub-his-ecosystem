#!/usr/bin/env node
/**
 * 연결 지도 생성기 — 도식의 노드·엣지가 연결 표와 기계적으로 같게 한다.
 *
 *   node tools/build-diagrams.mjs            # RELEASES/draft/compatibility.md 를 읽어 diagrams/connections.md 를 만든다
 *   node tools/build-diagrams.mjs --check    # 다시 만들어 기존 파일과 비교만 한다(쓰지 않음 · 다르면 종료 코드 1)
 *
 * 무엇을 어떻게 만드나
 *   - 입력: compatibility.md 의 "## 시스템 쌍별" 아래 `### A ⇄ B` 절과 그 표(방향 · 목적 · 프로토콜 · 상태).
 *   - 출력: mermaid `flowchart LR` 한 장. **쌍 하나 = 엣지 하나**, 엣지 라벨 = 상태별 개수, 선 모양 = 그 쌍의 가장 나쁜 상태.
 *     노드 = 쌍의 양 끝. 표에 없는 노드·엣지는 만들지 않는다.
 *   - 같은 파일 아래에 쌍별 표(방향별 개수 · 상태별 개수)를 함께 적는다.
 *
 * 규약 — 모르는 것을 지어내지 않는다
 *   - 절 머리의 요약 줄(`구현·미검증` 12 · `미구현` 1)과 표에서 센 개수가 다르면 만들지 않는다(종료 2).
 *   - "## 합계" 표와 전체 합이 다르면 만들지 않는다(종료 2).
 *   - 알 수 없는 상태 값 · 쌍의 양 끝에 맞출 수 없는 방향이 나오면 만들지 않는다(종료 2).
 *   - 생성 시각을 넣지 않는다(같은 입력 → 같은 출력. --check 가 입력 변화만 잡게).
 *
 * 종료 코드: 0 성공(또는 --check 일치) · 1 --check 불일치 · 2 입력 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_REL = 'RELEASES/draft/compatibility.md';
const OUT_REL = 'diagrams/connections.md';
const SRC = path.join(ROOT, SRC_REL);
const OUT = path.join(ROOT, OUT_REL);

const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(2); };

// ── 상태 — 나쁜 정도(클수록 나쁨)와 선 모양 ─────────────────────────────────────────
// 표기 순서는 compatibility.md 의 합계 표 순서를 따른다(검증됨 = 새 설치본 실호출 확인 · 굵은 실선).
const STATUS = [
  { key: '검증됨', rank: 0, line: '실선(굵게)', style: 'stroke:#2e7d32,stroke-width:3px' },
  { key: '구현·미검증', rank: 1, line: '실선', style: 'stroke:#4a6fa5,stroke-width:2px' },
  { key: '설계만', rank: 3, line: '파선(회색)', style: 'stroke:#7f8c8d,stroke-width:2px,stroke-dasharray:6 4' },
  { key: '미구현', rank: 4, line: '파선(주황)', style: 'stroke:#d68910,stroke-width:2px,stroke-dasharray:6 4' },
  { key: '중단', rank: 5, line: '파선(빨강)', style: 'stroke:#c0392b,stroke-width:2px,stroke-dasharray:6 4' },
  { key: '판정 불가', rank: 2, line: '점선(보라)', style: 'stroke:#8e6bb8,stroke-width:2px,stroke-dasharray:2 4' },
];
const STATUS_BY = new Map(STATUS.map((s) => [s.key, s]));

// ── 노드 — 시스템 13 의 계층(README 「시스템 13」 표). 표에 없는 이름은 생태계 밖(장비·외부 시스템)으로 둔다 ──────
const SYSTEMS = new Map([
  ['HIS', { id: 'HIS', layer: 'core' }],
  ['공개 홈페이지', { id: 'HOME', layer: 'patient' }],
  ['환자 앱', { id: 'APP', layer: 'patient' }],
  ['LIS', { id: 'LIS', layer: 'clinical' }],
  ['PACS', { id: 'PACS', layer: 'clinical' }],
  ['sign', { id: 'SIGN', layer: 'trust' }],
  ['ERP', { id: 'ERP', layer: 'mgmt' }],
  ['AI Server', { id: 'AIS', layer: 'ai' }],
  ['cerno', { id: 'CERNO', layer: 'ai' }],
  ['twin', { id: 'TWIN', layer: 'ai' }],
  ['Clinic', { id: 'CLINIC', layer: 'collab' }],
  ['edu', { id: 'EDU', layer: 'collab' }],
  ['Jitsi', { id: 'JITSI', layer: 'collab' }],
]);
const CLASS_DEFS = [
  ['core', 'fill:#fdebd0,stroke:#b9770e,stroke-width:2px,color:#000'],
  ['patient', 'fill:#e8f6f3,stroke:#16a085,color:#000'],
  ['clinical', 'fill:#eaf2f8,stroke:#2e86c1,color:#000'],
  ['trust', 'fill:#f4ecf7,stroke:#8e44ad,color:#000'],
  ['mgmt', 'fill:#fef9e7,stroke:#b7950b,color:#000'],
  ['ai', 'fill:#fdedec,stroke:#c0392b,color:#000'],
  ['collab', 'fill:#eafaf1,stroke:#229954,color:#000'],
  ['composite', 'fill:#f2f3f4,stroke:#566573,stroke-dasharray:4 3,color:#000'],
  ['external', 'fill:#ffffff,stroke:#566573,stroke-dasharray:4 3,color:#000'],
];

// ── 표 파서 ──────────────────────────────────────────────────────────────────────
/** `| a | b \| c |` → ['a', 'b | c'] (역슬래시로 가린 | 는 칸 구분이 아니다) */
function cells(line) {
  const out = [];
  let cur = '';
  const body = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '\\' && body[i + 1] === '|') { cur += '|'; i++; continue; }
    if (body[i] === '|') { out.push(cur.trim()); cur = ''; continue; }
    cur += body[i];
  }
  out.push(cur.trim());
  return out;
}
const isSep = (line) => /^\|\s*:?-{3,}/.test(line.trim());
const unTick = (s) => s.replace(/`/g, '').trim();

function parse(md) {
  const lines = md.split(/\r?\n/);
  const meta = {};
  const judged = md.match(/\|\s*판정 방법\s*\|[^\n]*?\((\d{4}-\d{2}-\d{2})\)/);
  meta.judgedAt = judged ? judged[1] : null;
  const omitted = md.match(/\|\s*싣지 않은 연결\s*\|\s*\*\*(\d+)개\*\*/);
  meta.omitted = omitted ? Number(omitted[1]) : null;

  // 합계 표
  const totalIdx = lines.findIndex((l) => /^##\s+합계\s*$/.test(l));
  if (totalIdx < 0) fail(`${SRC_REL}: "## 합계" 절이 없습니다`);
  let t = totalIdx + 1;
  while (t < lines.length && !lines[t].trim().startsWith('|')) t++;
  const totalHead = cells(lines[t]);
  const totalVals = cells(lines[t + 2] ?? '');
  if (!isSep(lines[t + 1] ?? '') || totalHead.length !== totalVals.length) fail(`${SRC_REL}: 합계 표 모양이 예상과 다릅니다`);
  meta.totals = Object.fromEntries(totalHead.map((h, i) => [h, Number(totalVals[i])]));

  // 시스템 쌍별
  const pairsIdx = lines.findIndex((l) => /^##\s+시스템 쌍별\s*$/.test(l));
  if (pairsIdx < 0) fail(`${SRC_REL}: "## 시스템 쌍별" 절이 없습니다`);
  const pairs = [];
  let cur = null;
  let head = null;
  for (let i = pairsIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s/.test(line)) break; // 다음 큰 절
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) {
      const ends = h[1].split(/\s*⇄\s*/);
      if (ends.length !== 2 || !ends[0] || !ends[1]) fail(`${SRC_REL}:${i + 1}: 쌍 제목을 읽을 수 없습니다 — "${h[1]}"`);
      cur = { title: h[1], a: ends[0], b: ends[1], summary: null, rows: [], line: i + 1 };
      pairs.push(cur);
      head = null;
      continue;
    }
    if (!cur) continue;
    if (cur.summary === null && /^`[^`]+`\s*\d+/.test(line.trim())) {
      cur.summary = {};
      for (const m of line.matchAll(/`([^`]+)`\s*(\d+)/g)) cur.summary[m[1]] = Number(m[2]);
      continue;
    }
    if (!line.trim().startsWith('|')) continue;
    if (isSep(line)) continue;
    const c = cells(line);
    if (!head) { head = c; continue; }
    const col = (name) => {
      const k = head.indexOf(name);
      if (k < 0) fail(`${SRC_REL}:${i + 1}: 표 머리에 "${name}" 칸이 없습니다`);
      return c[k] ?? '';
    };
    cur.rows.push({ dir: col('방향'), status: unTick(col('상태')), line: i + 1 });
  }
  if (!pairs.length) fail(`${SRC_REL}: 시스템 쌍 절을 하나도 찾지 못했습니다`);
  return { meta, pairs };
}

// ── 판정 ────────────────────────────────────────────────────────────────────────
/** 방향 칸(예: "HIS(환자 포털) → PACS")을 쌍의 양 끝에 맞춘다 → 'ab' | 'ba' */
function orient(pair, dir, line) {
  const [l, r] = dir.split('→').map((s) => (s ?? '').trim());
  if (!l || !r) fail(`${SRC_REL}:${line}: 방향 칸을 읽을 수 없습니다 — "${dir}"`);
  const ends = [pair.a, pair.b].sort((x, y) => y.length - x.length); // 긴 이름 먼저("외부 PACS" 가 "PACS" 보다 먼저)
  const from = ends.find((e) => l.startsWith(e));
  const to = ends.find((e) => e !== from && r.startsWith(e));
  if (!from || !to) fail(`${SRC_REL}:${line}: 방향 "${dir}" 을 쌍 "${pair.title}" 의 양 끝에 맞출 수 없습니다`);
  return from === pair.a ? 'ab' : 'ba';
}

function judge({ meta, pairs }) {
  const grand = Object.fromEntries(STATUS.map((s) => [s.key, 0]));
  for (const p of pairs) {
    p.counts = {};
    p.dirs = { ab: 0, ba: 0 };
    for (const r of p.rows) {
      if (!STATUS_BY.has(r.status)) fail(`${SRC_REL}:${r.line}: 알 수 없는 상태 "${r.status}"`);
      p.counts[r.status] = (p.counts[r.status] ?? 0) + 1;
      grand[r.status] += 1;
      p.dirs[orient(p, r.dir, r.line)] += 1;
    }
    if (!p.rows.length) fail(`${SRC_REL}:${p.line}: 쌍 "${p.title}" 에 연결 행이 없습니다`);
    // 요약 줄과 대조
    const a = JSON.stringify(Object.entries(p.summary ?? {}).sort());
    const b = JSON.stringify(Object.entries(p.counts).sort());
    if (a !== b) fail(`${SRC_REL}:${p.line}: 쌍 "${p.title}" 요약 줄(${a})과 표에서 센 값(${b})이 다릅니다`);
    p.worst = p.rows.map((r) => STATUS_BY.get(r.status)).sort((x, y) => y.rank - x.rank)[0];
  }
  // 합계 표와 대조
  const total = pairs.reduce((n, p) => n + p.rows.length, 0);
  if (meta.totals['실은 연결'] !== total) fail(`${SRC_REL}: 합계 표의 실은 연결(${meta.totals['실은 연결']})과 표에서 센 값(${total})이 다릅니다`);
  for (const s of STATUS) {
    if (s.key in meta.totals && meta.totals[s.key] !== grand[s.key]) {
      fail(`${SRC_REL}: 합계 표의 ${s.key}(${meta.totals[s.key]})와 표에서 센 값(${grand[s.key]})이 다릅니다`);
    }
    if (!(s.key in meta.totals) && grand[s.key] > 0) fail(`${SRC_REL}: 합계 표에 "${s.key}" 칸이 없는데 표에는 ${grand[s.key]}건 있습니다`);
  }
  return { total, grand };
}

// ── 노드 ────────────────────────────────────────────────────────────────────────
function nodeTable(pairs) {
  const nodes = new Map();
  let ext = 0;
  let joint = 0;
  const add = (name) => {
    if (nodes.has(name)) return nodes.get(name);
    let n;
    if (SYSTEMS.has(name)) {
      n = { name, ...SYSTEMS.get(name), label: name };
    } else if (name.includes(' · ') && name.split(' · ').every((x) => SYSTEMS.has(x))) {
      n = { name, id: `J${++joint}`, layer: 'composite', label: `${name}<br/>(두 시스템 공동 대상)` };
    } else {
      n = { name, id: `X${++ext}`, layer: 'external', label: `${name}<br/>(생태계 밖)` };
    }
    nodes.set(name, n);
    return n;
  };
  for (const p of pairs) { add(p.a); add(p.b); }
  return nodes;
}

// ── 출력 ────────────────────────────────────────────────────────────────────────
const countLabel = (counts) => STATUS.filter((s) => counts[s.key]).map((s) => `${s.key} ${counts[s.key]}`).join(' · ');
const q = (s) => `"${s.replace(/"/g, '#quot;')}"`;

function render({ meta, pairs }, { total, grand }) {
  const nodes = nodeTable(pairs);
  const systemNodes = [...nodes.values()].filter((n) => SYSTEMS.has(n.name)).length;
  const otherNodes = nodes.size - systemNodes;
  const out = [];
  out.push(`<!-- 생성물 — 직접 수정 금지. \`node tools/build-diagrams.mjs\` 로 ${SRC_REL} 에서 다시 만듭니다. -->`);
  out.push('');
  out.push('# 연결 지도 (초안 · 생성물)', '',
    '> **EN** — Generated from the connection status table: a map of which system talks to which, drawn so the line style carries the status (verified by real calls / wired in code only / not implemented / undecidable from code). Do not edit by hand.');
  out.push('');
  out.push('> 시스템 사이 연결이 **코드상 어디까지 준비돼 있는지**를 한 장으로 봅니다. 쌍 하나를 선 하나로 그리고, 선 위에 상태별 연결 수를 적습니다.');
  out.push(`> 근거: [\`${SRC_REL}\`](../${SRC_REL}) — 판정일 ${meta.judgedAt ?? '(원문 참조)'} · 양쪽 코드를 대조한 판정이며, 실제 호출로 확인한 연결은 아직 없습니다.`);
  out.push('');
  out.push('| 기준 | 값 |');
  out.push('|---|---|');
  out.push(`| 선(시스템 쌍) | ${pairs.length}개 |`);
  out.push(`| 노드 | ${nodes.size}개 — 생태계 시스템 ${systemNodes} · 그 밖 ${otherNodes}(검사 장비 · 외부 시스템 · 공동 대상) |`);
  out.push(`| 연결 | ${total}개 — ${countLabel(grand)} |`);
  if (meta.omitted !== null) out.push(`| 싣지 않은 연결 | ${meta.omitted}개 — 연결 표에 아직 없어 이 도식에도 없습니다 |`);
  out.push('| 만든 방법 | 연결 표의 절(`### A ⇄ B`)마다 선 하나. 절 머리의 요약 줄 · 합계 표와 개수가 다르면 생성기가 멈춥니다 |');
  out.push('');
  out.push('## 선 읽는 법');
  out.push('');
  out.push('선의 모양은 그 쌍에 있는 연결 가운데 **가장 나쁜 상태**를 따릅니다. 한 쌍에 `구현·미검증` 12개와 `미구현` 1개가 있으면 주황 파선입니다. 개수는 선 위의 글자로 봅니다.');
  out.push('');
  out.push('| 가장 나쁜 상태 | 선 | 이 도식의 쌍 수 |');
  out.push('|---|---|---:|');
  for (const s of [...STATUS].sort((x, y) => y.rank - x.rank)) {
    out.push(`| \`${s.key}\` | ${s.line} | ${pairs.filter((p) => p.worst.key === s.key).length} |`);
  }
  out.push('');
  out.push('상태의 뜻은 [`compatibility.md` 의 "상태를 읽는 법"](../RELEASES/draft/compatibility.md#상태를-읽는-법)과 같습니다. 노드 색은 [계층 생태계 지도](layers.md)의 7계층을 따르고, 테두리가 파선인 노드는 생태계 시스템이 아닌 상대(검사 장비 · 외부 시스템)이거나 두 시스템을 함께 대상으로 하는 연결입니다.');
  out.push('');
  out.push('## 도식');
  out.push('');
  out.push('```mermaid');
  out.push('flowchart LR');
  for (const n of nodes.values()) out.push(`  ${n.id}[${q(n.label)}]`);
  pairs.forEach((p) => {
    out.push(`  ${nodes.get(p.a).id} ---|${q(countLabel(p.counts))}| ${nodes.get(p.b).id}`);
  });
  for (const [cls, style] of CLASS_DEFS) out.push(`  classDef ${cls} ${style}`);
  const byClass = new Map();
  for (const n of nodes.values()) byClass.set(n.layer, [...(byClass.get(n.layer) ?? []), n.id]);
  for (const [cls] of CLASS_DEFS) if (byClass.has(cls)) out.push(`  class ${byClass.get(cls).join(',')} ${cls}`);
  for (const s of STATUS) {
    const idx = pairs.map((p, i) => (p.worst.key === s.key ? i : -1)).filter((i) => i >= 0);
    if (idx.length) out.push(`  linkStyle ${idx.join(',')} ${s.style}`);
  }
  out.push('```');
  out.push('');
  out.push('## 쌍별 표');
  out.push('');
  out.push('연결 표와 같은 순서입니다. 연결 하나하나의 목적 · 프로토콜은 [`compatibility.md`](../RELEASES/draft/compatibility.md)에서 봅니다.');
  out.push('');
  out.push('| # | 쌍 | 연결 수 | 방향별 | 상태별 | 가장 나쁜 상태 |');
  out.push('|---:|---|---:|---|---|---|');
  pairs.forEach((p, i) => {
    const dirs = [p.dirs.ab ? `${p.a} → ${p.b} ${p.dirs.ab}` : null, p.dirs.ba ? `${p.b} → ${p.a} ${p.dirs.ba}` : null].filter(Boolean).join(' · ');
    out.push(`| ${i + 1} | ${p.a} ⇄ ${p.b} | ${p.rows.length} | ${dirs} | ${countLabel(p.counts)} | \`${p.worst.key}\` |`);
  });
  out.push('');
  return out.join('\n');
}

// ── 실행 ────────────────────────────────────────────────────────────────────────
if (!fs.existsSync(SRC)) fail(`${SRC_REL} 이 없습니다`);
const parsed = parse(fs.readFileSync(SRC, 'utf8'));
const sums = judge(parsed);
const text = render(parsed, sums);
const nodeCount = nodeTable(parsed.pairs).size;

if (process.argv.includes('--check')) {
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (old === text) {
    console.log(`일치 — ${OUT_REL} (노드 ${nodeCount} · 선 ${parsed.pairs.length} · 연결 ${sums.total})`);
    process.exit(0);
  }
  if (old === null) {
    console.log(`불일치 — ${OUT_REL} 이 없습니다. \`node tools/build-diagrams.mjs\` 로 만드세요`);
  } else {
    const a = old.split('\n');
    const b = text.split('\n');
    const k = a.findIndex((l, i) => l !== b[i]);
    const at = k < 0 ? Math.min(a.length, b.length) + 1 : k + 1;
    console.log(`불일치 — ${OUT_REL} ${at}행부터 다릅니다(직접 고쳤거나 연결 표가 바뀜). \`node tools/build-diagrams.mjs\` 로 다시 만드세요`);
  }
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, text);
console.log(`만듦 — ${OUT_REL} (노드 ${nodeCount} · 선 ${parsed.pairs.length} · 연결 ${sums.total})`);
