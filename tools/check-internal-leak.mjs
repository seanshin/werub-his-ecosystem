#!/usr/bin/env node
/**
 * 내부 문구 누출 검사 — **회신 전 공개 금지**인 내용(연동 불일치 후보 · 보안/환자안전 발견)의
 * 서술이 공개 문서에 섞여 들어가지 않았는지 본다.
 *
 *   node tools/check-internal-leak.mjs
 *   node tools/check-internal-leak.mjs --self-test
 *
 * 왜 따로 두나 — 누출은 **두 가지 모양**으로 온다.
 *   ① 연결 기록의 **원문 필드**가 그대로 실리는 것 → 대체 문구(`public-text.json`)와
 *      연결 카드 · 연결 표 생성기의 자기 검증이 막는다(2026-09-18 에 실제로 한 건 잡혔다).
 *   ② 내부 문서의 **서술이 옮겨 적히는 것** → 이 검사가 본다.
 *
 * 방법 — 내부 기획서의 부록 D(후보) · 부록 G(보안) 표에서 각 항목의 서술을 읽어 **글자 n-그램**을 만들고
 * 공개 문서 전체에서 찾는다(양쪽에서 공백·기호를 털고 맞춘다).
 *   🔴 **왜 어절이 아니라 글자인가** — 처음에는 「두 어절」 로 만들었는데, 한국어 서술은 어절이 짧아
 *      **44개 중 6개에서만 지문이 만들어졌다.** 덮는 척이었다. 글자 n-그램으로 바꾸니 44/44 가 덮인다.
 * 판정된 겹침은 `planning/p1/leak-allow.json` 에 **항목 ID · 공개 파일 · 이유**로 남긴다(문구는 적지 않는다).
 * 🔴🔴 **이 검사는 「같은 말」을 찾는다. 「같은 뜻」은 찾지 못한다.**
 *    2026-09-18 에 내부 보안 항목(부록 G)의 **내용을 다른 말로 바꿔 쓴 문장**이 공개 문서에 들어갔는데
 *    이 검사는 통과시켰다(글자가 겹치지 않아서). 푸시 전에 사람이 발견해 되돌렸다.
 *    👉 **새 문서를 쓸 때는 이 검사를 믿지 말고 부록 D·G 를 열어 놓고 쓴다.** 검사기는 마지막 그물이지 첫 그물이 아니다.
 * 🔴 걸린 것이 곧 누출이라는 뜻은 아니다 — **사람이 보고 판정한다.** 같은 기능을 양쪽이 같은 말로
 *    설명했을 수도 있다. 이 검사는 "보라"고 말할 뿐이다.
 *
 * 종료 코드: 0 일치 없음 · 1 일치 있음(사람이 본다) · 2 도구 오류 · 3 미실행(내부 문서 없음 — 통과가 아니다)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLAN = path.resolve(ROOT, '..', 'planning', 'ecosystem-open-materials.plan.md');
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const N = 12;   // n-그램 길이 — 짧으면 흔한 말이 걸리고, 길면 조금만 고쳐 써도 놓친다
const STEP = 3; // 훑는 간격
const ALLOW = path.resolve(ROOT, '..', 'planning', 'p1', 'leak-allow.json');

/** 부록 D · G 표에서 항목의 ID 와 서술을 뽑는다 */
export function items(md) {
  const out = [];
  let on = false;
  for (const l of md.split('\n')) {
    if (/^## 부록 [DG]/.test(l)) { on = true; continue; }
    if (/^## /.test(l)) { on = false; continue; }
    if (!on || !l.startsWith('| ') || l.includes('---')) continue;
    const c = l.split('|').map((x) => x.trim()).filter(Boolean);
    if (c.length < 3) continue;
    const id = c[0].replace(/\*/g, '');
    if (/^(ID|#|항목|번호|연결)$/.test(id)) continue; // 표 머리
    // 🔴 표마다 칸 구성이 다르다 — 부록 G 는 서술이 **마지막 칸**이고 부록 D 는 **가운데 칸**이다.
    //    마지막 칸을 그냥 쓰면 부록 D 에서는 근거(「—」 · 항목 ID)를 읽어 지문이 하나도 안 만들어진다
    //    (2026-09-18 에 실제로 44개 중 39개가 그랬고, 「겹침 0건」 이 덮는 척이 됐다).
    //    그래서 **ID 를 뺀 칸 가운데 가장 긴 것**을 서술로 본다.
    const text = c.slice(1).sort((a, b) => b.length - a.length)[0] ?? '';
    out.push({ id, text });
  }
  return out;
}

/** 공백·기호를 털어 맞대기 좋은 모양으로 */
export const norm = (s) => String(s ?? '').toLowerCase().replace(/[^0-9a-z가-힣]/g, '');

/** 글자 n-그램 지문 */
export function prints(text) {
  const s = norm(text);
  const out = [];
  for (let i = 0; i + N <= s.length; i += STEP) out.push(s.slice(i, i + N));
  return out;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p, out); }
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

try {
  if (process.argv.includes('--self-test')) {
    const fails = [];
    const sample = '## 부록 G — x\n| ID | 시스템 | 한 줄 |\n|---|---|---|\n| 예시 | HIS | 어떤경로가무언가 아무런검사없이그냥 통과해버린다 |\n## 다음\n';
    const it = items(sample);
    if (it.length !== 1 || it[0].id !== '예시') fails.push('부록 표를 읽지 못합니다');
    const ps = prints(it[0].text);
    if (!ps.length) fails.push('지문을 만들지 못합니다');
    if (ps.some((p) => p.length !== N)) fails.push('n-그램 길이가 다릅니다');
    if (!norm(it[0].text).includes(ps[0])) fails.push('지문이 원문과 맞지 않습니다');
    if (prints('짧다').length) fails.push('너무 짧은 서술로도 지문을 만듭니다');
    // 🔴 한국어 서술에서 지문이 만들어지는가 — 어절 방식일 때 44개 중 38개가 0개였다
    if (prints('어떤값을 설정하지 않으면 코드 기본값으로 동작한다').length < 3) fails.push('한국어 서술에서 지문이 거의 만들어지지 않습니다');
    // 부록 D 모양 — 서술이 **가운데** 칸이고 마지막 칸은 근거(「—」)다
    {
      const d = '## 부록 D — x\n| # | 연결 | 후보 한 줄 | 판정 | 근거 |\n|---|---|---|---|---|\n| 예시 | 가 → 나 | 어떤식별자가서로 달라서요청이거부된다 | 코드상 사실 | — |\n## 다음\n';
      const it2 = items(d);
      // 🔴 예시 ID 는 **실제 번호처럼 보이지 않는 것**을 쓴다 — 도구 소스도 공개되므로
      //    후보 번호와 같은 **모양**을 예시로 두면 진짜 번호로 읽히고, 이력 검사에도 걸린다
      //    (2026-09-18 에 두 번 고쳤다). 그래서 예시 ID 는 한국어 낱말을 쓴다.
      if (it2.length !== 1) fails.push('부록 D 표를 읽지 못합니다');
      else if (!prints(it2[0].text).length) fails.push('부록 D 에서 서술이 아닌 칸을 읽습니다(지문 0개)');
    }
    console.log(`자기 검증 — 표 읽기 · 지문 ${ps.length}개(n-그램 ${N}자)`);
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 부록 표 읽기 · 지문 생성 · 길이 하한');
    process.exit(0);
  }

  if (!fs.existsSync(PLAN)) {
    console.log('미실행 — 내부 기획서를 찾지 못했습니다(통과가 아닙니다)');
    process.exit(3);
  }
  const list = items(fs.readFileSync(PLAN, 'utf8'));
  const pub = walk(ROOT).map((f) => ({ f: path.relative(ROOT, f), n: norm(fs.readFileSync(f, 'utf8')) }));
  const allow = fs.existsSync(ALLOW) ? JSON.parse(fs.readFileSync(ALLOW, 'utf8')).allow ?? [] : [];
  const ok = (id, f) => allow.some((a) => a.id === id && a.file === f);
  const hits = [];
  let covered = 0;
  for (const it of list) {
    const ps = prints(it.text);
    if (ps.length) covered++;
    for (const p of ps) {
      const where = pub.find((x) => x.n.includes(p));
      if (where) { if (!ok(it.id, where.f)) hits.push(`[${it.id}] → ${where.f}`); break; }
    }
  }
  if (hits.length) {
    console.log(`✗ 내부 서술과 겹치는 곳 ${hits.length}건 — 🔴 사람이 보고 판정합니다(겹친다고 곧 누출은 아닙니다)`);
    console.log('   판정 뒤 누출이 아니면 planning/p1/leak-allow.json 에 이유와 함께 적습니다(문구는 적지 않습니다).');
    hits.forEach((h) => console.log(`  ${h}`));
    process.exit(1);
  }
  console.log(`내부 항목 ${list.length}개(지문 만든 것 ${covered}) · 공개 문서 ${pub.length}개 — 겹침 없음 · 판정 예외 ${allow.length}건`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
