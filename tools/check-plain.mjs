#!/usr/bin/env node
/**
 * 쉬운 글 검사 — 프로젝트 소개서(`projects/*.md`)가 「이해하기 쉬운 문서」의 기계 조건을 지키는가.
 *
 *   node tools/check-plain.mjs              # 걸린 것이 있으면 종료 코드 1
 *   node tools/check-plain.mjs --self-test
 *
 * 왜 두나 — 2026-09-29 사용자 지시로 이 자료의 최우선 목적이 「등록된 프로젝트를 이해하기 쉬운 문서로」가 됐다.
 * 그 전의 문서들은 사실은 정확했지만 첫 화면이 작업 기록(기준 커밋 · 따라가기 · 상태어)으로 시작했고,
 * 경고 표시가 본문 곳곳에 흩어져 있었다. 소개서는 그 버릇이 다시 들어오지 않게 기계로 막는다.
 *
 * 검사(소개서마다)
 *   ① 틀 — `## Introduction (English)` · `## 1.` ~ `## 10.` · `## 이 문서의 근거` 가 이 순서로 있다
 *   ② 절마다 영문 요약 — `## ` 제목 바로 뒤(빈 줄 허용)에 `> **EN** — …`
 *   ③ 첫 화면 — 첫 30줄에 작업 어휘(기준 커밋 · 매니페스트 · 따라가기 · 백틱 상태어 · 확인 필요(따라가기)) 0
 *   ④ 경고 — 🔴 는 「8. 알아 둘 것」 절 안에만, 편당 3개 이하
 *   ⑤ 약어 — 한국어 본문(영문 소개 · EN 요약 · 코드 · 링크 주소 제외)의 대문자 약어가 모두 `projects/terms.md` 에 있다
 *   ⑥ 문장 — 한국어 본문(표 제외)의 한 문장이 150자를 넘지 않고, 괄호 안에 괄호를 넣지 않는다(기획 §4 「한 문장에 한 가지」 · 2026-09-29 추가)
 *
 * 종료 코드: 0 통과 · 1 걸림 · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'projects');
const NOT_INTRO = new Set(['README.md', 'terms.md', 'changes-since-2026.09.md']);

const WORK_WORDS = [/기준 커밋/, /매니페스트/, /따라가기/, /`검증됨`/, /`구현·미검증`/, /`미구현`/, /livePartial/, /확인 필요\(따라가기\)/];
const SECTION_ORDER = ['Introduction (English)', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '이 문서의 근거'];

/** terms.md 표의 첫 칸에서 굵게 쓴 말을 모은다 */
export function knownTerms(termsMd) {
  const set = new Set();
  for (const line of termsMd.split('\n')) {
    if (!line.startsWith('| **')) continue;
    const cell = line.split('|')[1];
    for (const m of cell.matchAll(/\*\*([^*]+)\*\*/g)) {
      for (const part of m[1].split(/\s*[·(),]\s*|\s+~\s+/)) if (part.trim()) set.add(part.trim());
    }
    // 「S0 ~ S8」 은 S0 … S8 을 모두 뜻한다
    if (/S0 ~ S8/.test(cell)) for (let i = 0; i <= 8; i++) set.add(`S${i}`);
  }
  return set;
}

/** 한국어 본문에서 대문자 약어를 뽑는다(영문 소개 · EN 요약 · 코드 · 링크 주소 · 영문만인 제목 줄 제외) */
export function acronyms(md) {
  const found = new Set();
  const intro = md.indexOf('## Introduction (English)');
  const one = md.indexOf('\n## 1.');
  let body = intro >= 0 && one > intro ? md.slice(0, intro) + md.slice(one) : md;
  body = body.replace(/```[\s\S]*?```/g, '');
  for (let line of body.split('\n')) {
    if (line.startsWith('> **EN**')) continue;
    if (!/[가-힣]/.test(line)) continue; // 영문만인 줄(부제 등)은 영문 독자용
    line = line.replace(/`[^`]*`/g, '').replace(/\]\([^)]*\)/g, ']').replace(/!\[[^\]]*\]/g, '');
    for (const m of line.matchAll(/(?<![A-Za-z0-9_])([A-Z][A-Z0-9]{1,}(?:[-_][A-Z0-9]+)?)(?![A-Za-z0-9])/g)) found.add(m[1]);
  }
  return found;
}

/** 한국어 본문(표 · 코드 · EN 요약 · 영문 소개 제외)의 문장들 — [줄 번호, 문장] */
export function proseSentences(md) {
  const out = [];
  const intro = md.indexOf('## Introduction (English)');
  const one = md.indexOf('\n## 1.');
  const lines = md.split('\n');
  let inCode = false;
  lines.forEach((raw, i) => {
    const pos = lines.slice(0, i).join('\n').length;
    if (raw.startsWith('```')) { inCode = !inCode; return; }
    if (inCode || (intro >= 0 && pos >= intro && pos < one)) return;
    if (raw.startsWith('> **EN**') || raw.startsWith('|') || !/[가-힣]/.test(raw)) return;
    const l = raw.replace(/\]\([^)]*\)/g, ']').replace(/`[^`]*`/g, 'X');
    for (const x of l.split(/(?<=니다)\.\s*|(?<=[다요])\.\s+/)) {
      const t = x.replace(/^[\s>*-]+/, '').trim();
      if (/[가-힣]/.test(t)) out.push([i + 1, t]);
    }
  });
  return out;
}

export function checkOne(name, md, terms) {
  const p = [];
  const heads = [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  let at = 0;
  for (const want of SECTION_ORDER) {
    const i = heads.findIndex((h, k) => k >= at && h.startsWith(want));
    if (i < 0) { p.push(`${name} — 틀: 「## ${want}」 절이 없거나 순서가 다릅니다`); continue; }
    at = i + 1;
  }
  const lines = md.split('\n');
  lines.forEach((l, i) => {
    if (!l.startsWith('## ') || l.startsWith('## Introduction')) return; // 영문 소개 절은 그 자체가 영어 본문
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (!(lines[j] || '').startsWith('> **EN**')) p.push(`${name}:${i + 1} — 「${l.slice(3, 40)}」 절 머리에 영문 요약이 없습니다`);
  });
  lines.slice(0, 30).forEach((l, i) => {
    for (const w of WORK_WORDS) if (w.test(l)) p.push(`${name}:${i + 1} — 첫 화면에 작업 어휘 ${w}`);
  });
  let inEight = false; let reds = 0;
  lines.forEach((l, i) => {
    if (l.startsWith('## ')) inEight = l.startsWith('## 8.');
    const n = (l.match(/🔴/g) || []).length;
    if (!n) return;
    reds += n;
    if (!inEight) p.push(`${name}:${i + 1} — 🔴 는 「8. 알아 둘 것」 절에만 둡니다`);
  });
  if (reds > 3) p.push(`${name} — 🔴 ${reds}개(편당 3개 이하)`);
  for (const [ln, t] of proseSentences(md)) {
    if (t.length > 150) p.push(`${name}:${ln} — 문장이 ${t.length}자(150자 이하로 나눕니다): 「${t.slice(0, 40)}…」`);
    if (/\([^()]*\([^()]*\)/.test(t)) p.push(`${name}:${ln} — 괄호 안에 괄호가 있습니다`);
  }
  const missing = [...acronyms(md)].filter((a) => !terms.has(a));
  if (missing.length) p.push(`${name} — 용어 풀이에 없는 약어: ${missing.join(' · ')} → projects/terms.md 에 더하거나 풀어 씁니다`);
  return p;
}

try {
  if (process.argv.includes('--self-test')) {
    const fails = [];
    const terms = knownTerms('| **HIS** | x | y |\n| **FHIR** · **R4** | x | y |\n| **S0 ~ S8** | x | y |');
    if (!terms.has('R4') || !terms.has('S3')) fails.push('용어 표를 읽지 못합니다');
    const ok = ['# 제목', '', '> 소개서', '', '## Introduction (English)', '', 'HIS text.', '',
      ...['1.', '2.', '3.', '4.', '5.', '6.', '7.'].flatMap((n) => [`## ${n} 절`, '', '> **EN** — s', '', 'HIS 는 FHIR R4 를 씁니다.', '']),
      '## 8. 알아 둘 것', '', '> **EN** — s', '', '- 🔴 없음', '',
      ...['9.', '10.'].flatMap((n) => [`## ${n} 절`, '', '> **EN** — s', '', '본문', '']),
      '## 이 문서의 근거', '', '> **EN** — s', '', '기준 커밋 abc'].join('\n');
    const okFixed = ok;
    if (checkOne('ok', okFixed, terms).length) fails.push(`멀쩡한 소개서를 걸었습니다: ${checkOne('ok', okFixed, terms).join(' / ')}`);
    const cases = [
      ['첫 화면 작업 어휘', okFixed.replace('> 소개서', '> 기준 커밋 abc · 따라가기')],
      ['8절 밖 🔴', okFixed.replace('HIS 는 FHIR R4 를 씁니다.', '🔴 HIS 는 FHIR R4 를 씁니다.')],
      ['🔴 4개', okFixed.replace('- 🔴 없음', '- 🔴 a\n- 🔴 b\n- 🔴 c\n- 🔴 d')],
      ['풀이 없는 약어', okFixed.replace('HIS 는 FHIR R4 를 씁니다.', 'HIS 는 XYZQ 를 씁니다.')],
      ['EN 요약 빠짐', okFixed.replace('## 5. 절\n\n> **EN** — s', '## 5. 절\n\n본문만')],
      ['절 빠짐', okFixed.replace('## 9. 절', '## 구. 절')],
      ['긴 문장', okFixed.replace('HIS 는 FHIR R4 를 씁니다.', 'HIS 는 ' + '가'.repeat(160) + ' 씁니다.')],
      ['괄호 속 괄호', okFixed.replace('HIS 는 FHIR R4 를 씁니다.', 'HIS 는 FHIR(표준(R4)) 를 씁니다.')],
    ];
    for (const [label, md] of cases) if (!checkOne('x', md, terms).length) fails.push(`「${label}」 을 잡지 못합니다`);
    // 코드 · 링크 주소 · EN 줄의 대문자는 약어로 세지 않는다
    if (acronyms('본문 `ENV_KEY` [링크](../THIRD_PARTY.md)\n> **EN** — ZZZ text').size) fails.push('코드 · 링크 · EN 줄의 대문자를 약어로 셉니다');
    console.log(`자기 검증 — 검사 6종 · 사례 ${cases.length + 2}`);
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 틀 · 영문 요약 · 첫 화면 · 경고 · 약어 · 문장 — 멀쩡한 것은 통과, 심은 것은 잡음');
    process.exit(0);
  }

  const terms = knownTerms(fs.readFileSync(path.join(DIR, 'terms.md'), 'utf8'));
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !NOT_INTRO.has(f)).sort();
  const problems = files.flatMap((f) => checkOne(`projects/${f}`, fs.readFileSync(path.join(DIR, f), 'utf8'), terms));
  if (problems.length) {
    console.log(`✗ 쉬운 글 검사 — 소개서 ${files.length}편에서 ${problems.length}건`);
    problems.forEach((p) => console.log(`  ${p}`));
    process.exit(1);
  }
  console.log(`쉬운 글 검사 — 소개서 ${files.length}편 · 용어 ${terms.size}개 — 0건`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
