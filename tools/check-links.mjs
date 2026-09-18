#!/usr/bin/env node
/**
 * 문서 링크 검사 — 저장소 안을 가리키는 링크가 **실제로 있는 파일과 제목**을 가리키는지 본다.
 *
 *   node tools/check-links.mjs              # 깨진 링크를 센다(있으면 종료 코드 1)
 *   node tools/check-links.mjs --self-test
 *
 * 왜 필요한가 — 문서 154개에 저장소 안 링크가 **2,800개**가 넘는다(2026-09-18 실측). 제목에서 수치를 빼거나
 * 절을 옮기면 앵커가 조용히 깨지는데, 어느 검사도 이것을 보지 않고 있었다(실제로 2건이 깨져 있었다).
 *
 * 보는 것 / 보지 않는 것
 *   · 본다: 상대 경로 링크의 **대상 파일** · `#앵커` 가 가리키는 **제목**(이미지 포함)
 *   · 보지 않는다: `http(s)` · `mailto` — 네트워크를 쓰지 않는다(발행 전 검사는 밖으로 나가지 않는다)
 *
 * 앵커 규칙(GitHub 근사): 소문자화 → 기호 제거 → 공백을 하이픈으로.
 *   🔴 **연속 하이픈을 합치지 않는다.** 「관제 — 구현」 은 `관제--구현` 이 된다(합치면 멀쩡한 링크를 깨졌다고 한다).
 *   같은 제목이 여러 번 나오면 뒤엣것에 `-1` · `-2` 가 붙는다.
 *   🔴 **「②」 같은 기호를 GitHub 이 지우는지 남기는지는 여기서 단정할 수 없다.** 그래서 제목마다 **두 가지**를
 *      만들어 두고 **하나라도 맞으면 통과**시킨다 — 엄격(기호 제거) · 관대(ASCII 문장부호만 제거).
 *      모르는 것을 아는 척해 멀쩡한 링크를 깨졌다고 말하지 않기 위한 것이다.
 *
 * 종료 코드: 0 전부 정상 · 1 깨진 링크 있음 · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['.git', 'node_modules']);

/** 엄격 — 영숫자 · 한글 · 공백 · 하이픈 · 밑줄만 남긴다 */
export const slug = (h) => h.trim().toLowerCase()
  .replace(/[^0-9a-z가-힣ㄱ-ㅎㅏ-ㅣ \-_]/g, '')
  .replace(/ /g, '-');

/** 관대 — ASCII 문장부호만 지우고 그 밖의 기호(② · — 등)는 남긴다 */
export const slugLoose = (h) => h.trim().toLowerCase()
  .replace(/[!-/:-@[-`{-~]/g, '')
  .replace(/ /g, '-');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir === '.' ? '' : dir), { withFileTypes: true })) {
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(rel, out); }
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

/** 한 문서의 앵커 집합 — 같은 제목이 겹치면 GitHub 처럼 -1 · -2 를 붙인다 */
export function anchorsOf(md) {
  const seen = new Map();
  const set = new Set();
  for (const m of md.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
    const base = slug(m[1]);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    for (const v of new Set([base, slugLoose(m[1])])) set.add(n ? `${v}-${n}` : v);
  }
  return set;
}

function scan() {
  const files = walk('.');
  const anchors = new Map();
  for (const rel of files) anchors.set(path.resolve(ROOT, rel), anchorsOf(fs.readFileSync(path.join(ROOT, rel), 'utf8')));

  const bad = [];
  let links = 0;
  for (const rel of files) {
    // 코드 블록 안의 예시 경로는 링크가 아니다
    const md = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/```[\s\S]*?```/g, '');
    for (const m of md.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = m[1];
      if (/^(https?:|mailto:|tel:)/.test(target)) continue;
      links++;
      const [p0, ...rest] = target.split('#');
      const anchor = rest.join('#');
      const abs = p0 ? path.resolve(ROOT, path.dirname(rel), decodeURIComponent(p0)) : path.resolve(ROOT, rel);
      if (!fs.existsSync(abs)) { bad.push(`${rel} → ${target}  (그런 파일이 없습니다)`); continue; }
      if (!anchor) continue;
      const set = anchors.get(abs);
      if (!set) continue; // .md 가 아닌 대상(이미지 등)에는 앵커를 보지 않는다
      if (!set.has(decodeURIComponent(anchor).toLowerCase())) bad.push(`${rel} → ${target}  (그런 제목이 없습니다)`);
    }
  }
  return { files: files.length, links, bad };
}

try {
  if (process.argv.includes('--self-test')) {
    const fails = [];
    // 🔴 합치지 않는다 — 이 한 줄을 틀리면 멀쩡한 링크 87개를 깨졌다고 한다(2026-09-18 실제로 겪음)
    if (slug('대외 발신 관제 — 구현 · 설정 · 승인') !== '대외-발신-관제--구현--설정--승인') fails.push('연속 하이픈을 합치거나 기호를 잘못 다룹니다');
    if (slug('② 설치') !== '-설치') fails.push('엄격 규칙의 앞머리 기호 처리가 다릅니다');
    if (slugLoose('② 설치') !== '②-설치') fails.push('관대 규칙이 기호를 지웠습니다');
    { const two = anchorsOf('## ② 설치\n');
      if (!two.has('-설치') || !two.has('②-설치')) fails.push('두 규칙을 모두 두지 않습니다'); }
    if (slug('`검증됨` 27개') !== '검증됨-27개') fails.push('백틱·숫자 처리가 다릅니다');
    const a = anchorsOf('# 같은 제목\n## 같은 제목\n### 다른 것\n');
    if (!a.has('같은-제목') || !a.has('같은-제목-1')) fails.push('겹치는 제목에 번호를 붙이지 않습니다');
    const r = scan();
    console.log(`자기 검증 — 문서 ${r.files}개 · 저장소 안 링크 ${r.links}개`);
    if (fails.length) { fails.forEach((f) => console.log(`  ✗ ${f}`)); process.exit(1); }
    console.log('  ✓ 앵커 규칙(합치지 않음 · 기호 제거 · 한글) · 겹치는 제목 · 훑기');
    process.exit(0);
  }

  const r = scan();
  if (r.bad.length) {
    console.log(`✗ 깨진 링크 ${r.bad.length}개 (문서 ${r.files} · 링크 ${r.links})`);
    r.bad.forEach((b) => console.log(`  ${b}`));
    process.exit(1);
  }
  console.log(`링크 ${r.links}개 — 대상 파일 · 제목 모두 있음(문서 ${r.files}개)`);
  process.exit(0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
