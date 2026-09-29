#!/usr/bin/env node
/**
 * 소개서 신선도 — 각 소개서가 읽은 저장소 커밋 뒤로 저장소가 얼마나 움직였는지 알린다.
 *
 *   node tools/check-intro-freshness.mjs            # 표로 알린다(실패하지 않는다)
 *   node tools/check-intro-freshness.mjs --strict   # 움직인 소개서가 있으면 종료 코드 1
 *
 * 왜 두나 — 소개서는 각 저장소의 **현재 개발본**을 읽고 쓴다. 저장소는 매일 움직인다
 * (2026-09-29 하루에도 HIS 12 · AI Server 9 커밋). 소개서 근거 표의 「읽은 커밋」 과
 * 저장소 HEAD 를 비교해, 다시 읽어야 할 소개서를 알려 준다.
 *
 * 형제 저장소는 `tools/.local.json` 의 경로에서 **읽기만** 한다(tools/lib/repos.mjs 의 읽기 전용 git).
 * 설정 파일이 없으면 「미실행」(종료 코드 3) — 통과가 아니다.
 *
 * 종료 코드: 0 알림(또는 모두 최신) · 1 움직임 있음(--strict) · 2 도구 오류 · 3 미실행
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadRepos, git } from './lib/repos.mjs';

// 소개서 → 저장소 키(tools/.local.json 의 repos 키). 공개 홈페이지 · 환자 앱은 HIS 저장소 안의 앱이다
const REPO_OF = {
  his: 'his', homepage: 'his', 'patient-app': 'his', lis: 'lis', pacs: 'pacs', sign: 'sign', erp: 'erp',
  'ai-server': 'ai-server', twin: 'twin', cerno: 'cerno', edu: 'edu', clinic: 'clinic', jitsi: 'jitsi',
};
// HIS 저장소 안의 앱은 그 앱 폴더를 건드린 커밋만 센다
const PATH_OF = { homepage: 'apps/homepage', 'patient-app': 'apps/mobile' };

export function readCommit(md) {
  const m = md.match(/^\| 읽은 커밋 \| `([0-9a-f]{7,40})`/m);
  return m ? m[1] : null;
}

try {
  if (process.argv.includes('--self-test')) {
    const ok = readCommit('| 항목 | 값 |\n|---|---|\n| 읽은 커밋 | `a39f60fc9d7c` — 설명 |') === 'a39f60fc9d7c';
    const none = readCommit('| 읽은 것 | 커밋 `a39f60fc9d7c` |') === null;
    console.log('자기 검증 — 사례 2');
    if (!ok || !none) { console.log('  ✗ 「읽은 커밋」 행을 잘못 읽습니다'); process.exit(1); }
    console.log('  ✓ 「읽은 커밋」 행 읽기');
    process.exit(0);
  }
  const repos = loadRepos();
  if (!repos) { console.log('🔴 미실행 — tools/.local.json 이 없습니다(통과가 아닙니다)'); process.exit(3); }
  const rows = [];
  for (const [name, key] of Object.entries(REPO_OF)) {
    const md = fs.readFileSync(path.join(ROOT, 'projects', `${name}.md`), 'utf8');
    const read = readCommit(md);
    if (!read) throw new Error(`${name}: 근거 표에 「읽은 커밋」 행이 없음`);
    const dir = repos[key];
    const args = ['log', '--format=%h', `${read}..HEAD`];
    if (PATH_OF[name]) args.push('--', PATH_OF[name]);
    const ahead = git(dir, args).split('\n').filter(Boolean).length;
    const head = git(dir, ['rev-parse', '--short=12', 'HEAD']);
    rows.push({ name, read, head, ahead });
  }
  const moved = rows.filter((r) => r.ahead > 0);
  console.log('소개서 신선도 — 읽은 커밋 뒤로 저장소가 움직인 수(HIS 안의 앱은 그 앱 폴더만)');
  for (const r of rows) console.log(`  ${r.ahead ? '🔄' : '✓ '} ${r.name.padEnd(12)} 읽은 ${r.read} · HEAD ${r.head} · ${r.ahead}커밋`);
  console.log(moved.length ? `→ 다시 읽을 소개서 ${moved.length}편: ${moved.map((r) => r.name).join(' · ')}` : '→ 모두 최신');
  process.exit(moved.length && process.argv.includes('--strict') ? 1 : 0);
} catch (e) {
  console.error(`도구 오류: ${e.message}`);
  process.exit(2);
}
