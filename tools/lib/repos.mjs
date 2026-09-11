/**
 * 형제 저장소 접근 — 계측·추출·매니페스트 도구가 같이 쓴다.
 *
 * 🔴 읽기 전용 약속
 *   - 경로는 tools/.local.json(gitignore)에서만 읽는다. 저장소 안에 로컬 경로를 적지 않는다.
 *   - git 은 읽기 명령만, 항상 `--no-optional-locks` 로 부른다
 *     (평범한 `git status` 는 형제 저장소의 .git/index 를 갱신한다 — 읽기 전용 위반).
 *   - 출력물에는 로컬 경로를 쓰지 않는다. 시스템 키(his·sign·…)만 쓴다.
 *
 * 기준 커밋
 *   - 도구는 작업 트리가 아니라 **기준 커밋의 내용**을 읽는다. 다른 작업이 형제 저장소를 편집 중이어도 값이 흔들리지 않는다.
 *   - 기준 커밋 = data/base-commits.json 에 고정된 해시(있으면) · 없으면 그 시점의 HEAD.
 *     고정을 옮기는 것은 명시적인 일이다(`node tools/measure-scale.mjs --repin`).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const LOCAL = path.join(ROOT, 'tools/.local.json');
export const PINS_REL = 'data/base-commits.json';
const PINS = path.join(ROOT, PINS_REL);

/** git 서브커맨드 허용 목록 — 쓰기 명령이 섞여 들어오지 않게 */
const GIT_READ = new Set(['rev-parse', 'log', 'status', 'describe', 'tag', 'ls-files', 'ls-tree', 'show', 'cat-file', 'for-each-ref']);

/** {key: 절대경로} — 설정 파일이 없으면 null(호출 쪽이 "미실행"으로 보고한다) */
export function loadRepos() {
  if (!fs.existsSync(LOCAL)) return null;
  const { repos } = JSON.parse(fs.readFileSync(LOCAL, 'utf8'));
  return Object.fromEntries(Object.entries(repos).map(([k, v]) => [k, path.resolve(ROOT, v)]));
}

export function git(repoDir, args) {
  if (!GIT_READ.has(args[0])) throw new Error(`읽기 전용 위반: git ${args[0]}`);
  return execFileSync('git', ['--no-optional-locks', '-C', repoDir, ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024,
  }).trim();
}

const tryGit = (dir, args) => { try { return git(dir, args); } catch { return null; } };

// ── 기준 커밋 ────────────────────────────────────────────────────────────────

/** 고정된 기준 커밋 {repoKey: hash} — 파일이 없으면 {} */
export function loadPins() {
  if (!fs.existsSync(PINS)) return {};
  return JSON.parse(fs.readFileSync(PINS, 'utf8')).commits ?? {};
}

/** 저장소 키의 기준 커밋(전체 해시) — 고정값이 있으면 그것, 없으면 HEAD. 고정값이 저장소에 없으면 오류 */
export function baseCommit(key, dir, pins = loadPins()) {
  const want = pins[key] ?? 'HEAD';
  const hash = tryGit(dir, ['rev-parse', '--verify', `${want}^{commit}`]);
  if (!hash) throw new Error(`기준 커밋을 저장소에서 찾지 못함: ${key} ${want}`);
  return { hash, pinned: Boolean(pins[key]) };
}

/** 기준 커밋 정보 — 커밋 자체의 속성만 싣는다(작업 트리 상태처럼 흔들리는 값은 싣지 않는다) */
export function repoState(dir, commit = 'HEAD') {
  return {
    head: tryGit(dir, ['rev-parse', `${commit}^{commit}`]),
    headDate: tryGit(dir, ['log', '-1', '--format=%cs', commit]),
    lastTag: tryGit(dir, ['describe', '--tags', '--abbrev=0', commit]),
  };
}

/** 참고용 — 지금 작업 트리(스냅샷에는 싣지 않는다) */
export function workingTree(dir) {
  const porcelain = tryGit(dir, ['status', '--porcelain']);
  return {
    head: tryGit(dir, ['rev-parse', 'HEAD']),
    branch: tryGit(dir, ['rev-parse', '--abbrev-ref', 'HEAD']),
    uncommitted: porcelain === null ? null : porcelain.split('\n').filter(Boolean).length,
  };
}

/**
 * 기준 커밋의 내용을 임시 폴더에 푼다(`git archive <커밋> | tar -x`) — 형제 저장소에는 아무것도 쓰지 않는다.
 * 돌려준 폴더는 호출 쪽이 removeExport() 로 지운다.
 */
export function exportCommit(dir, commit) {
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'werub-export-'));
  const r = spawnSync('sh', ['-c', 'git --no-optional-locks -C "$1" archive --format=tar "$2" | tar -x -C "$3"', 'sh', dir, commit, dest], {
    stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8',
  });
  if (r.status !== 0) { removeExport(dest); throw new Error(`git archive 실패(${commit.slice(0, 12)})`); }
  return dest;
}

export function removeExport(dest) {
  if (dest && dest.startsWith(os.tmpdir())) fs.rmSync(dest, { recursive: true, force: true });
}

// ── 실행 전후 지문 ────────────────────────────────────────────────────────────

/** 🔴 실행 전후 비교용 — 형제 저장소가 이 도구 때문에 바뀌지 않았음을 증명한다 */
export function fingerprint(repos) {
  return Object.fromEntries(Object.entries(repos).map(([k, dir]) => {
    const idx = path.join(dir, '.git/index');
    return [k, { status: tryGit(dir, ['status', '--porcelain']), indexMtime: fs.existsSync(idx) ? fs.statSync(idx).mtimeMs : null }];
  }));
}

export function sameFingerprint(a, b) {
  return Object.keys(a).filter((k) => a[k].status !== b[k]?.status || a[k].indexMtime !== b[k]?.indexMtime);
}

/**
 * 지문이 바뀌었을 때의 판정 문구. 도구는 기준 커밋만 읽으므로(값은 영향 없음) 실패로 끝내지 않는다.
 * 다만 "이 도구가 쓰지 않았다"는 증명은 그 실행에서는 성립하지 않는다 — 조용한 때 다시 돌려 확인한다.
 */
export function concurrentNote(changed) {
  return `⚠️ 실행 중 형제 저장소 작업 트리·인덱스가 바뀌었다: ${changed.join(', ')} — 동시 작업으로 보인다. `
    + '값은 기준 커밋만 읽었으므로 영향이 없지만, 이번 실행으로는 "이 도구가 쓰지 않았다"를 증명할 수 없다(조용할 때 다시 확인).';
}
