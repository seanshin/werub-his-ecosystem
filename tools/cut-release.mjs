#!/usr/bin/env node
/**
 * 통합 릴리즈 자르기 — `RELEASES/draft/` 에 번호를 붙여 첫 릴리즈로 굳힌다(H17 이 정해진 뒤).
 *
 *   node tools/cut-release.mjs --number 2026.09              # 무엇이 바뀌는지만 본다(기본)
 *   node tools/cut-release.mjs --number 2026.09 --apply      # 실제로 바꾼다
 *   node tools/cut-release.mjs --self-test
 *
 * 🔴 **기본이 미리보기다.** `--apply` 를 붙여야 쓴다 — 이 작업은 저장소 전체의 링크를 건드린다
 *    (2026-09-18 실측: `RELEASES/draft` 를 가리키는 파일 **132개** · 도구 **8개**).
 *
 * 하는 일(순서대로)
 *   ① `RELEASES/draft/inputs.json` 의 `releaseId` 를 번호로 채운다 — 번호의 정본은 여기 하나다
 *   ② 노트 머리의 「번호: **미정**(…)」 을 번호로 바꾼다
 *   ③ `RELEASES/draft/` → `RELEASES/<번호>/` (git mv — 이력을 잇는다)
 *   ④ 저장소 전체에서 경로 문자열 `RELEASES/draft` 를 `RELEASES/<번호>` 로 바꾼다
 *   ⑤ 다시 만들 것과 검사 순서를 **알려 준다**(자동으로 돌리지 않는다 — 사람이 결과를 보고 넘어간다)
 *
 * 🔴 이 도구는 **번호를 짓지 않는다.** H17 에서 정한 값을 받아 적을 뿐이다.
 * 종료 코드: 0 정상 · 1 못 하는 상태(선행 조건 불충족) · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OLD = 'RELEASES/draft';
const SKIP_DIRS = new Set(['.git', 'node_modules', 'assets']);
const EXT = new Set(['.md', '.mjs', '.json']);

/** 번호로 쓸 수 있는 글자만 — 경로가 되고 링크가 되므로 좁게 잡는다 */
const okNumber = (n) => /^[0-9A-Za-z][0-9A-Za-z._-]{0,19}$/.test(n) && n !== 'draft';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir === '.' ? '' : dir), { withFileTypes: true })) {
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(rel, out); }
    else if (EXT.has(path.extname(e.name))) out.push(rel);
  }
  return out;
}

/** 경로 문자열만 바꾼다 — 「draft」 라는 낱말이 본문에 있어도 건드리지 않는다 */
export function rewrite(text, number) {
  return text.split(OLD).join(`RELEASES/${number}`);
}

/** 노트·매니페스트 머리의 「번호: **미정**(…)」 */
export function stampNumber(text, number) {
  return text.replace(/번호:\s*\*\*미정\*\*(\([^)]*\))?/g, `번호: **${number}**`);
}

function preflight(number) {
  const bad = [];
  if (!okNumber(number)) bad.push(`번호로 쓸 수 없는 값입니다: ${JSON.stringify(number)} (영숫자로 시작 · 20자 이내 · . _ - 만)`);
  if (!fs.existsSync(path.join(ROOT, OLD))) bad.push(`${OLD} 가 없습니다 — 이미 잘랐습니까?`);
  if (fs.existsSync(path.join(ROOT, 'RELEASES', number))) bad.push(`RELEASES/${number} 가 이미 있습니다`);
  try {
    const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' }).trim();
    if (dirty) bad.push('작업 트리에 커밋하지 않은 변경이 있습니다 — 이 작업은 파일을 많이 건드리므로 먼저 정리하십시오');
  } catch { bad.push('git 을 부르지 못했습니다'); }
  return bad;
}

function plan(number) {
  const hits = [];
  for (const rel of walk('.')) {
    if (rel.startsWith(`${OLD}/`)) continue; // 폴더 안쪽은 ③ 에서 통째로 옮겨진다
    const t = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const n = t.split(OLD).length - 1;
    if (n) hits.push({ rel, n });
  }
  return hits;
}

const args = process.argv.slice(2);
const argOf = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };

try {
  if (args.includes('--self-test')) {
    const fails = [];
    const t = '[표](../RELEASES/draft/compatibility.md) · draft 초안이라는 낱말 · `RELEASES/draft/inputs.json`';
    const r = rewrite(t, '2026.09');
    if (r.includes('RELEASES/draft')) fails.push('경로를 바꾸지 못했습니다');
    if (!r.includes('draft 초안이라는 낱말')) fails.push('본문의 「draft」 낱말까지 바꿨습니다');
    if (stampNumber('> 번호: **미정**(체계가 정해지면 …) · 기준', 'v1') !== '> 번호: **v1** · 기준') fails.push('번호 표기를 바꾸지 못했습니다');
    for (const bad of ['draft', '', 'a'.repeat(21), '../x', 'v 1']) if (okNumber(bad)) fails.push(`번호로 받아서는 안 되는 값을 받았습니다: ${bad}`);
    for (const good of ['2026.09', 'v0.1', '1.0.0']) if (!okNumber(good)) fails.push(`번호로 받아야 할 값을 막았습니다: ${good}`);
    const hits = plan('2026.09');
    console.log(`자기 검증 — 경로를 가리키는 파일 ${hits.length}개 · 총 ${hits.reduce((s, h) => s + h.n, 0)}곳`);
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 경로만 치환 · 낱말 보존 · 번호 표기 · 번호 형식 검사');
    process.exit(0);
  }

  const number = argOf('--number');
  if (!number) {
    console.log('번호가 필요합니다 — H17 에서 정한 값을 주십시오.\n  node tools/cut-release.mjs --number <번호> [--apply]');
    process.exit(1);
  }
  const bad = preflight(number);
  const hits = plan(number);
  const total = hits.reduce((s, h) => s + h.n, 0);

  if (!args.includes('--apply')) {
    console.log(`미리보기 — 번호 ${number}\n`);
    console.log(`  ① inputs.json releaseId ← "${number}"`);
    console.log('  ② 노트 · 매니페스트 머리의 「번호: **미정**」 → 번호');
    console.log(`  ③ ${OLD}/ → RELEASES/${number}/ (git mv · 파일 ${fs.readdirSync(path.join(ROOT, OLD)).length}개 + systems/)`);
    console.log(`  ④ 경로 치환 — 파일 ${hits.length}개 · ${total}곳`);
    console.log('  ⑤ 다시 만들 것: build-manifest · build-diagrams · build-integration-map · build-connection-cards · build-sources → verify-all\n');
    if (bad.length) { console.log('🔴 지금은 할 수 없습니다'); bad.forEach((b) => console.log(`  - ${b}`)); process.exit(1); }
    console.log('할 수 있습니다 — 실제로 바꾸려면 `--apply` 를 붙이십시오.');
    process.exit(0);
  }

  if (bad.length) { console.log('🔴 선행 조건이 맞지 않습니다'); bad.forEach((b) => console.log(`  - ${b}`)); process.exit(1); }

  // ① 번호의 정본
  const ip = path.join(ROOT, OLD, 'inputs.json');
  const inputs = JSON.parse(fs.readFileSync(ip, 'utf8'));
  inputs.releaseId = number;
  inputs.releaseIdNote = `번호 ${number} — 폴더 이름과 이 값이 같아야 한다`;
  fs.writeFileSync(ip, `${JSON.stringify(inputs, null, 2)}\n`);

  // ② 머리의 번호 표기
  for (const f of ['RELEASE.md', 'manifest.md']) {
    const p = path.join(ROOT, OLD, f);
    if (fs.existsSync(p)) fs.writeFileSync(p, stampNumber(fs.readFileSync(p, 'utf8'), number));
  }

  // ③ 폴더 이동(이력을 잇는다)
  execFileSync('git', ['mv', OLD, `RELEASES/${number}`], { cwd: ROOT });

  // ④ 경로 치환
  for (const h of hits) {
    const p = path.join(ROOT, h.rel);
    fs.writeFileSync(p, rewrite(fs.readFileSync(p, 'utf8'), number));
  }

  console.log(`잘랐습니다 — RELEASES/${number} · 경로 치환 파일 ${hits.length}개 · ${total}곳`);
  console.log('\n이어서 돌리십시오(순서대로):');
  console.log('  node tools/build-manifest.mjs && node tools/build-diagrams.mjs && node tools/build-integration-map.mjs \\');
  console.log('    && node tools/build-connection-cards.mjs && node tools/build-sources.mjs && node tools/verify-all.mjs');
  console.log('\n🔴 검사가 전부 통과한 뒤에 커밋하십시오. ROADMAP P5 와 README 의 「초안」 표기도 함께 봅니다.');
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
