#!/usr/bin/env node
/**
 * 발행 전 검사 한 번에 — 푸시 전에 이것 하나를 돌린다.
 *
 *   node tools/verify-all.mjs
 *
 * 하나라도 실패하거나 "미실행"(로컬 설정·거부 목록 없음)이면 실패로 끝난다. 미실행을 통과로 말하지 않는다.
 * 종료 코드: 0 전부 통과 · 1 하나 이상 실패
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLS = path.dirname(fileURLToPath(import.meta.url));
const CHECKS = [
  ['공개 검사기 자기 검증', 'check-public.mjs', ['--self-test']],
  ['공개 검사(비밀값·인프라·기관 식별·이미지)', 'check-public.mjs', []],
  ['체크리스트 추출기 자기 검증', 'extract-checklist.mjs', ['--self-test']],
  ['HIS 메뉴 추출기 자기 검증', 'extract-his-nav.mjs', ['--self-test']],
  ['계측 스냅샷 = 기준 커밋', 'measure-scale.mjs', ['--check']],
  ['체크리스트 = 레지스트리', 'extract-checklist.mjs', ['--check']],
  ['HIS 메뉴 목록 = 코드', 'extract-his-nav.mjs', ['--check']],
  ['매니페스트 = 저장소·스냅샷·입력 · 요약 머리 대조', 'build-manifest.mjs', ['--check']],
  ['연결 지도 = 연결 상태 표', 'build-diagrams.mjs', ['--check']],
  ['화면 캡처 목록 = 메뉴 구성표 · 실제 파일', 'build-screen-index.mjs', ['--check']],
  ['연동 매트릭스 = 연결 상태 표', 'build-integration-map.mjs', ['--check']],
  ['구성서 = 매니페스트 · 연결 상태 표', 'check-consistency.mjs', []],
];
const MEANING = { 0: '통과', 1: '실패', 2: '도구 오류', 3: '미실행' };

let failed = 0;
for (const [label, file, args] of CHECKS) {
  const r = spawnSync(process.execPath, [path.join(TOOLS, file), ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const ok = r.status === 0;
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} ${label} — ${MEANING[r.status] ?? `종료 코드 ${r.status}`}`);
  if (!ok) {
    const tail = `${r.stdout}\n${r.stderr}`.trim().split('\n').slice(-6).map((l) => `    ${l}`).join('\n');
    console.log(tail);
  }
}
console.log(failed ? `\n🔴 ${failed}개 실패 — 푸시하지 않는다` : `\n전부 통과(${CHECKS.length}개)`);
process.exit(failed ? 1 : 0);
