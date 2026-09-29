#!/usr/bin/env node
/**
 * 푸시 전 이력 검사 — **올리지 않은 커밋 전부**에 거부 목록 문구와 내부 문구가 들어 있지 않은지 본다.
 *
 *   node tools/check-history.mjs            # origin/main..HEAD
 *   node tools/check-history.mjs --self-test
 *
 * 왜 도구로 두나 — 푸시는 최종 상태만이 아니라 **중간 커밋까지** 공개한다. 나중에 지운 문구가
 * 중간 커밋에 남아 있으면 그대로 나간다(2026-09-11 첫 공개 푸시에서 실제로 7건이 있었다).
 * 🔴 그동안 이 검사를 **손으로 친 명령**으로 했는데, 2026-09-18 에 조건 없이 「0건」을 찍는 줄을 붙여
 *    **걸린 것을 보지 못한 채 푸시했다.** 사람이 매번 정확히 치기를 기대하지 않는다 — 도구가 판정한다.
 *
 * 거부 목록은 `tools/.denylist.local`(로컬 전용 · 커밋하지 않는다). 없으면 **미실행**이지 통과가 아니다.
 * 종료 코드: 0 깨끗함 · 1 걸린 것 있음 · 2 도구 오류 · 3 미실행(거부 목록 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DENY = path.join(ROOT, 'tools', '.denylist.local');

/** 공개 저장소에 있어서는 안 되는 내부 표현 — 문구가 아니라 **모양**으로 찾는다 */
export const INTERNAL = [
  { name: '내부 항목 ID(후보)', re: /(?<![A-Za-z])C\d{1,2}(?![\d개-])/ },
  { name: '내부 항목 ID(리허설)', re: /(?<![A-Za-z])(?:F\d{2}|P[WXSV]\d|PA\d|R\d{2}|U\d|E1[0-9]|X\d|G\d{2})(?![\d개])/ },
  { name: '내부 경로(기획서)', re: /planning\/(?:ecosystem-open-materials|notify|p5-)/ },
  { name: '개인 이메일', re: /[\w.+-]+@(?!users\.noreply\.github\.com)[\w-]+\.[\w.]+/ },
];

/** 한 줄에서 규칙에 걸린 표기를 뽑아, 기준 파일에 이미 있던 것(old)과 새로 들어온 것(fresh)으로 가른다 */
export function newTokens(line, base, rule) {
  const g = new RegExp(rule.re.source, rule.re.flags.includes('g') ? rule.re.flags : rule.re.flags + 'g');
  const inBase = new Set([...base.matchAll(g)].map((m) => m[0]));
  const found = [...new Set([...line.matchAll(g)].map((m) => m[0]))];
  return { fresh: found.filter((t) => !inBase.has(t)), old: found.filter((t) => inBase.has(t)) };
}

const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });

try {
  if (process.argv.includes('--self-test')) {
    const fails = [];
    const hit = (s) => INTERNAL.filter((r) => r.re.test(s)).map((r) => r.name);
    if (!hit('후보 C12 를 판정했다').length) fails.push('후보 번호를 잡지 못합니다');
    if (!hit('발견 PW1 · PX1').length) fails.push('리허설 항목 ID 를 잡지 못합니다');
    if (!hit('planning/notify/his.md 참고').length) fails.push('내부 경로를 잡지 못합니다');
    if (hit('연결 113개 · 검증됨 27개').length) fails.push('멀쩡한 수치를 내부 ID 로 봅니다');
    if (hit('RTX 5080(16GB) · C 언어').length) fails.push('흔한 표기를 내부 ID 로 봅니다');
    if (hit('8508132+seanshin@users.noreply.github.com').length) fails.push('커밋 작성자 주소를 개인 이메일로 봅니다');
    // 이미 공개된 표기 ↔ 새로 들어온 표기(2026-09-29 — ICD-10 `E11` 이 링크만 바뀐 줄에서 걸렸던 모양)
    {
      const R = INTERNAL.find((r) => r.name === '내부 항목 ID(리허설)');
      const baseDoc = '예: `5A11` 제2형 당뇨병 · ICD-10 E11 매핑 → [5장](05-a.md)';
      const same = newTokens('예: `5A11` 제2형 당뇨병 · ICD-10 E11 매핑 → [6장](06-a.md)', baseDoc, R);
      if (same.fresh.length || !same.old.includes('E11')) fails.push('기준에 있던 표기를 새 누출로 봅니다');
      const fresh = newTokens('예: E11 매핑 · 발견 PW1', baseDoc, R);
      if (!fresh.fresh.includes('PW1')) fails.push('기준에 없던 내부 ID 를 이미 공개된 것으로 봅니다');
      if (newTokens('발견 PW1', '', R).fresh.length !== 1) fails.push('새 파일의 내부 ID 를 놓칩니다');
    }
    console.log(`자기 검증 — 규칙 ${INTERNAL.length}개`);
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 내부 ID · 내부 경로 · 개인 이메일 · 오탐 없음');
    process.exit(0);
  }

  const range = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'origin/main..HEAD';
  const commits = git(['log', '--oneline', range]).trim();
  if (!commits) { console.log(`올리지 않은 커밋이 없습니다 (${range})`); process.exit(0); }
  const n = commits.split('\n').length;

  const problems = [];
  // ① 거부 목록 — 올리지 않은 커밋 **전부**에서(중간 커밋 포함)
  if (!fs.existsSync(DENY)) {
    console.log('🔴 미실행 — 거부 목록이 없습니다(통과가 아닙니다)');
    process.exit(3);
  }
  const deny = fs.readFileSync(DENY, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
  for (const t of deny) {
    const found = git(['log', range, `-S${t}`, '--oneline']).trim();
    if (found) problems.push(`거부 목록 「${t.slice(0, 12)}…」 → ${found.split('\n')[0]}`);
  }
  // ② 내부 표현 — 더해진 줄에서만(지우는 커밋은 문제가 아니다)
  // 🔴 이 파일 자신은 뺀다 — **자기 검증이 「진짜처럼 보이는 예시」를 들고 있어야** 잡는지 증명할 수 있다.
  //    빼지 않으면 도구가 자기 예시를 잡아 영원히 푸시를 막는다(2026-09-18 에 실제로 그랬다).
  // 🔵 2026-09-29 — 잡힌 표기가 **기준 쪽 같은 파일에 이미 같은 모양으로 있으면** 새 누출이 아니다.
  //    그날 개요서 장 번호를 옮기면서 링크만 바뀐 줄이 「더해진 줄」이 되었고, 그 줄의 ICD-10 코드 `E11`(당뇨병)이
  //    ERP 리허설 항목 ID 모양에 걸렸다. 규칙을 느슨하게 하면 진짜 ID 를 놓치므로, 규칙은 두고 **새로 들어온 것만** 실패로 센다.
  //    이미 공개된 표기는 숨기지 않고 따로 보여 준다(이미 나간 내부 ID 라면 그것대로 사람이 봐야 한다).
  const base = range.includes('..') ? range.split('..')[0] : 'origin/main';
  const baseCache = new Map();
  const baseText = (file) => {
    if (!file) return '';
    if (!baseCache.has(file)) {
      let t = '';
      try { t = git(['show', `${base}:${file}`]); } catch { t = ''; }
      baseCache.set(file, t);
    }
    return baseCache.get(file);
  };
  const diff = git(['diff', '-M', range, '--unified=0', '--', '.', ':(exclude)tools/check-history.mjs']).split('\n');
  const preExisting = [];
  let oldFile = null;
  for (const l of diff) {
    if (l.startsWith('diff --git ')) { oldFile = null; continue; }
    if (l.startsWith('--- ')) { oldFile = l === '--- /dev/null' ? null : l.slice(6); continue; }
    if (!l.startsWith('+') || l.startsWith('+++')) continue;
    for (const rule of INTERNAL) {
      const tokens = newTokens(l.slice(1), baseText(oldFile), rule);
      if (tokens.fresh.length) problems.push(`${rule.name} 「${tokens.fresh.join(' · ')}」 → ${l.slice(1, 90).trim()}`);
      if (tokens.old.length) preExisting.push(`${rule.name} 「${tokens.old.join(' · ')}」 (${oldFile})`);
    }
  }
  if (preExisting.length) {
    console.log(`ℹ︎ 이미 기준(${base})의 같은 파일에 있던 표기 ${preExisting.length}건 — 새 누출이 아니라 실패로 세지 않습니다:`);
    [...new Set(preExisting)].forEach((p) => console.log(`  ${p}`));
  }

  if (problems.length) {
    console.log(`✗ 올리지 않은 커밋 ${n}개에서 ${problems.length}건 — 🔴 푸시하지 않습니다`);
    problems.forEach((p) => console.log(`  ${p}`));
    process.exit(1);
  }
  console.log(`이력 검사 — 커밋 ${n}개 · 거부 목록 ${deny.length}항목 · 내부 표현 ${INTERNAL.length}규칙 — 0건`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
