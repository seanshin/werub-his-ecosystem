#!/usr/bin/env node
/**
 * 프로젝트 요약 생성기 — README 의 「프로젝트 소개서 — 13개를 하나씩」 요약과 발표 덱 부록 13장을
 * 각 소개서(`projects/*.md`) 1절에서 뽑아 다시 만든다.
 *
 *   node tools/build-project-digest.mjs           # 두 곳을 다시 쓴다
 *   node tools/build-project-digest.mjs --check   # 다시 만든 결과와 지금 파일이 다르면 종료 코드 1
 *   node tools/build-project-digest.mjs --self-test
 *
 * 왜 생성기인가 — 2026-09-29 에 README 요약과 덱 부록을 손으로 옮긴 뒤 소개서를 네 번 고쳤고,
 * 요약은 1차 소개서 그대로 남았다(예: 환자 앱 「지금 쓸 수 있나 = 아니오」가 요약에 없었다).
 * 요약은 소개서에서 기계로 뽑고, 어긋나면 검사가 실패하게 한다.
 *
 * 뽑는 것(소개서마다): 제목(H1) · 1절의 EN 요약 · 1절 굵은 한 문장 · 「### 한눈에 — 도입 판단」 표의 행.
 * 링크는 옮겨 가는 자리에 맞게 고쳐 쓴다(README 는 저장소 뿌리, 덱은 `deck/`).
 *
 * 종료 코드: 0 같음/씀 · 1 다름(--check) · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORDER = ['his', 'homepage', 'patient-app', 'lis', 'pacs', 'sign', 'erp', 'ai-server', 'twin', 'cerno', 'edu', 'clinic', 'jitsi'];
const README = 'README.md';
const DECK = 'deck/slides.md';
const R_START = '<!-- 프로젝트 요약: 생성물 시작 — tools/build-project-digest.mjs 가 소개서 1절에서 만든다. 손으로 고치지 않는다 -->';
const R_END = '<!-- 프로젝트 요약: 생성물 끝 -->';
const D_START = '<!-- 덱 부록: 생성물 시작 — tools/build-project-digest.mjs 가 소개서 1절에서 만든다. 손으로 고치지 않는다 -->';
const D_END = '<!-- 덱 부록: 생성물 끝 -->';

/** 소개서 한 편에서 요약 재료를 뽑는다 */
export function extract(name, md) {
  const title = md.split('\n', 1)[0].replace(/^#\s*/, '').trim();
  const one = md.indexOf('\n## 1.');
  const two = md.indexOf('\n## 2.');
  if (one < 0 || two < one) throw new Error(`${name}: 1절을 찾지 못함`);
  const sec = md.slice(one, two);
  const en = (sec.match(/^> \*\*EN\*\* — (.+)$/m) || [])[1];
  const ko = (sec.match(/^\*\*(.+?)\*\*\s*$/m) || [])[1];
  const at = sec.indexOf('### 한눈에 — 도입 판단');
  if (!en || !ko || at < 0) throw new Error(`${name}: 1절의 EN · 한 문장 · 한눈에 표 중 빠진 것이 있음`);
  const rows = sec.slice(at).split('\n').filter((l) => l.startsWith('| **'));
  if (rows.length < 6) throw new Error(`${name}: 한눈에 표의 행이 6개보다 적음`);
  return { name, title, en, ko, rows: rows.slice(0, 6) };
}

/**
 * 소개서(`projects/x.md`) 안의 상대 링크를 다른 자리로 옮겨 쓴다.
 * to = 'root' (README) · 'deck' (deck/slides.md)
 */
export function relink(text, name, to) {
  // 「§8」 같은 절 번호는 소개서 안에서만 통한다 — 옮겨 가면 「소개서 §8」 로
  text = text.replace(/(?<!소개서 )§(\d+)/g, '소개서 §$1');
  return text.replace(/\]\(([^)\s]+)\)/g, (m, t) => {
    if (/^(https?:|mailto:)/.test(t)) return m;
    let out;
    if (t.startsWith('#')) out = `projects/${name}.md${t}`;
    else if (t.startsWith('../')) out = t.slice(3);
    else out = `projects/${t}`;
    if (to === 'deck') out = `../${out}`;
    return `](${out})`;
  });
}

export function readmeBlock(items) {
  const parts = items.map((it) => [
    `### ${it.title} · [소개서](projects/${it.name}.md)`,
    '',
    `> **EN** — ${relink(it.en, it.name, 'root')}`,
    '',
    `**${relink(it.ko, it.name, 'root')}**`,
    '',
    '| | |',
    '|---|---|',
    ...it.rows.map((r) => relink(r, it.name, 'root')),
    '',
  ].join('\n'));
  return [R_START, '', ...parts, R_END].join('\n');
}

export function deckBlock(items) {
  const parts = items.map((it) => [
    `## ${it.title}`,
    '',
    `**${relink(it.ko, it.name, 'deck')}**`,
    '',
    '| | |',
    '|---|---|',
    ...it.rows.map((r) => relink(r, it.name, 'deck')),
    '',
    `근거: [${it.title.split(' — ')[0]} 소개서](../projects/${it.name}.md)`,
    '',
    '---',
    '',
  ].join('\n'));
  return [D_START, '', ...parts, D_END].join('\n');
}

function splice(src, start, end, block, file) {
  const a = src.indexOf(start);
  const b = src.indexOf(end);
  if (a < 0 || b < a) throw new Error(`${file}: 생성물 표시(시작 · 끝)를 찾지 못함`);
  return src.slice(0, a) + block + src.slice(b + end.length);
}

try {
  if (process.argv.includes('--self-test')) {
    const fails = [];
    const md = ['# X — 무엇', '', '## 1. 한 문장', '', '> **EN** — one.', '', '**X 는 [Y](y.md) 입니다.**', '', '### 한눈에 — 도입 판단', '', '| | |', '|---|---|',
      '| **지금 쓸 수 있나** | 예 — [S1](../build-guide/S1.md) · [8절](#8-알아-둘-것) |', '| **세워야 하는 것** | a |', '| **먼저 있어야 할 것** | b |', '| **받을 코드** | c |', '| **실제로 확인된 것** | d |', '| **아직 모르는 것** | e |', '', '## 2. 둘', ''].join('\n');
    const it = extract('x', md);
    if (it.rows.length !== 6 || it.ko !== 'X 는 [Y](y.md) 입니다.') fails.push('재료를 뽑지 못합니다');
    const r = readmeBlock([it]);
    if (!relink('(§8)', 'x', 'root').includes('소개서 §8')) fails.push('절 번호를 「소개서 §N」 으로 바꾸지 못합니다');
    if (!r.includes('](build-guide/S1.md)') || !r.includes('](projects/x.md#8-알아-둘-것)') || !r.includes('](projects/y.md)')) fails.push('README 로 옮길 때 링크를 잘못 고칩니다');
    const d = deckBlock([it]);
    if (!d.includes('](../build-guide/S1.md)') || !d.includes('](../projects/x.md#8-알아-둘-것)')) fails.push('덱으로 옮길 때 링크를 잘못 고칩니다');
    let threw = false;
    try { extract('y', md.replace('### 한눈에 — 도입 판단', '### 요약')); } catch { threw = true; }
    if (!threw) fails.push('한눈에 표가 없는 소개서를 통과시킵니다');
    console.log('자기 검증 — 사례 5');
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 재료 뽑기 · README 링크 · 덱 링크 · 빠진 표 거부');
    process.exit(0);
  }

  const items = ORDER.map((n) => extract(n, fs.readFileSync(path.join(ROOT, 'projects', `${n}.md`), 'utf8')));
  const rPath = path.join(ROOT, README);
  const dPath = path.join(ROOT, DECK);
  const rOld = fs.readFileSync(rPath, 'utf8');
  const dOld = fs.readFileSync(dPath, 'utf8');
  const rNew = splice(rOld, R_START, R_END, readmeBlock(items), README);
  const dNew = splice(dOld, D_START, D_END, deckBlock(items), DECK);
  if (process.argv.includes('--check')) {
    const diff = [rNew !== rOld && README, dNew !== dOld && DECK].filter(Boolean);
    if (diff.length) {
      console.log(`✗ 프로젝트 요약이 소개서와 다릅니다: ${diff.join(' · ')} → node tools/build-project-digest.mjs`);
      process.exit(1);
    }
    console.log(`프로젝트 요약 — 소개서 ${items.length}편과 README · 덱 부록이 같습니다`);
    process.exit(0);
  }
  fs.writeFileSync(rPath, rNew);
  fs.writeFileSync(dPath, dNew);
  console.log(`프로젝트 요약 — 소개서 ${items.length}편에서 README · 덱 부록을 다시 만들었습니다`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
