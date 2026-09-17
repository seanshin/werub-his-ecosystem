#!/usr/bin/env node
/**
 * 한 / 영 혼용 규약 검사 — 소개자료는 한국어로 쓰되, 문서마다 **영문 요약 한 덩이**를 함께 싣는다.
 *
 *   node tools/check-bilingual.mjs            # 빠진 문서를 센다(있으면 종료 코드 1)
 *   node tools/check-bilingual.mjs --list     # 빠진 문서 목록만
 *   node tools/check-bilingual.mjs --self-test
 *
 * 규약(2026-09-17 사용자 결정)
 *   · 제목(H1) 다음에 `> **EN** — …` 인용 블록을 둔다. 번역이 아니라 **요약**이다 —
 *     한국어 본문을 한 줄씩 옮기지 않고, 그 문서가 무엇을 말하는지를 영어로 압축한다.
 *   · 생성물은 **생성기가** 넣는다(손으로 고치면 다음 생성 때 지워진다).
 *   · 예외는 아래 EXEMPT 에 이유와 함께 적는다.
 *
 * 종료 코드: 0 전부 있음 · 1 빠진 것 있음 · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = ['.git', 'node_modules', 'tools'];

// 예외 — 읽는 사람을 위한 글이 아니거나, 그 자체가 목록인 것
const EXEMPT = new Map([
  ['systems/TEMPLATE.md', '빈 틀 — 채워진 문서에서 검사한다'],
  ['RELEASES/SYSTEM-SUMMARY-TEMPLATE.md', '빈 틀'],
  ['data/README.md', '기계가 읽는 스냅샷 설명'],
]);

const hasEN = (md) => /^>\s*\*\*EN\*\*/m.test(md);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir === '.' ? '' : dir), { withFileTypes: true })) {
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) { if (!SKIP_DIRS.includes(e.name)) walk(rel, out); }
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

function scan() {
  const missing = [];
  let ok = 0;
  for (const rel of walk('.')) {
    if (EXEMPT.has(rel)) continue;
    const md = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    if (hasEN(md)) ok++; else missing.push(rel);
  }
  return { ok, missing };
}

if (process.argv.includes('--self-test')) {
  const fails = [];
  if (!hasEN('# 제목\n\n> **EN** — summary\n')) fails.push('있는 것을 없다고 본다');
  if (hasEN('# 제목\n\n본문에 EN 이라는 글자만 있음\n')) fails.push('없는 것을 있다고 본다');
  if (!hasEN('# 제목\n\n>  **EN** — 공백이 두 칸\n')) fails.push('인용 뒤 공백을 못 읽는다');
  const { ok, missing } = scan();
  console.log(`자기 검증 — 있음 ${ok} · 빠짐 ${missing.length} · 예외 ${EXEMPT.size}`);
  if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
  console.log('  ✓ 규칙 3개 통과');
  process.exit(0);
}

try {
  const { ok, missing } = scan();
  if (process.argv.includes('--list')) { missing.forEach((m) => console.log(m)); process.exit(missing.length ? 1 : 0); }
  if (missing.length) {
    console.log(`✗ 영문 요약이 빠진 문서 ${missing.length}개 (있는 문서 ${ok}개 · 예외 ${EXEMPT.size}개)`);
    for (const m of missing.slice(0, 40)) console.log(`  ${m}`);
    if (missing.length > 40) console.log(`  … 그 밖 ${missing.length - 40}개`);
    process.exit(1);
  }
  console.log(`한 / 영 혼용 — 문서 ${ok}개 전부 영문 요약 있음 (예외 ${EXEMPT.size}개)`);
  process.exit(0);
} catch (e) { console.error(`도구 오류: ${e.message}`); process.exit(2); }
