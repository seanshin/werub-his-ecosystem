#!/usr/bin/env node
/**
 * 공개 검사기 — 이 저장소에 실리면 안 되는 것을 찾는다.
 *
 *   node tools/check-public.mjs              # 저장소 전체 검사
 *   node tools/check-public.mjs --self-test  # 검사기 자신이 잡아야 할 것을 잡는지 확인(대조군 포함)
 *
 * 검사 세 갈래:
 *   1. 비밀값·인프라 정보 — 패턴(IP·키·비밀번호 대입·자격 포함 URL·ssh·로컬 경로·이메일·호스트:포트)
 *   2. 기관 식별 정보 — 거부 목록(기관명·주소 조각·전화·도메인·기관 코드·실명).
 *      거부 목록 자체가 식별 정보라 저장소에 넣지 않는다: tools/.denylist.local (gitignore) 또는 DENYLIST_FILE.
 *      🔴 거부 목록이 없으면 "통과"가 아니라 "미실행"이다(종료 코드 3). 모르는 것을 통과로 말하지 않는다.
 *   3. 이미지 — 글자 검사로 볼 수 없다. assets/CAPTURE-LEDGER.md 에 "확인" 기록이 없는 이미지는 미확인으로 보고한다.
 *
 * 출력은 값을 가린다(검사 로그가 다시 유출 경로가 되지 않게).
 * 종료 코드: 0 통과 · 1 발견 · 2 검사기 오류 · 3 기관 식별 정보 검사 미실행
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SELF = path.relative(ROOT, fileURLToPath(import.meta.url));

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'dist', 'build', '.cache']);
const SKIP_FILES = new Set(['tools/.denylist.local']);
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.pdf', '.svgz']);
const LEDGER = 'assets/CAPTURE-LEDGER.md';

const ALLOWED_DOMAINS = [/(^|\.)example\.(org|com|net)$/i, /(^|\.)shields\.io$/i, /(^|\.)github\.com$/i];
const ALLOWED_IPS = new Set(['127.0.0.1', '0.0.0.0']);

/** 패턴 — 각 항목은 {id, label, re, keep(match)→boolean(실제로 문제인가)} */
const PATTERNS = [
  { id: 'private-key', label: '개인키', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { id: 'token', label: '토큰·액세스 키', re: /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}|xox[abprs]-[A-Za-z0-9-]{10,})\b/g },
  {
    id: 'secret-assign', label: '비밀값 대입',
    // 🔴 앞에 \b 를 두지 않는다 — `DB_PASSWORD` 는 밑줄이 단어 문자라 경계가 없고, 한글은 JS \b 가 보지 못한다(자기 검증이 잡음)
    re: /(?:\w*?(?:password|passwd|pwd|secret|api[_-]?key|access[_-]?key|auth[_-]?token|token)|비밀번호)\s*[:=]\s*['"]?([^\s'"<>{}()`,;]{4,})/gi,
    keep: (m) => !/^(?:\*+|x+|\.{3}|changeme|example|placeholder|your[-_a-z]*|<.*>)$/i.test(m[1]),
  },
  { id: 'cred-url', label: '자격 포함 URL', re: /\b[a-z][a-z0-9+.-]*:\/\/[^\s:\/@]+:[^\s@\/]+@[^\s\/]+/gi },
  { id: 'ssh', label: 'SSH 접속 정보', re: /\bssh\s+(?:-[a-zA-Z]\s*\S+\s+)*[\w.-]+@[\w.-]+/g },
  {
    id: 'ipv4', label: 'IP 주소', re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    keep: (m) => !ALLOWED_IPS.has(m[0]) && m[0].split('.').every((o) => Number(o) <= 255),
  },
  { id: 'local-path', label: '로컬·서버 경로', re: /(?:\/Users\/[^\/\s]+\/|\/home\/[^\/\s]+\/|[A-Z]:\\Users\\[^\\\s]+\\)/g },
  {
    id: 'email', label: '이메일', re: /\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
    keep: (m) => !ALLOWED_DOMAINS.some((d) => d.test(m[1])),
  },
  {
    id: 'host-port', label: '호스트:포트', re: /\b((?:[a-z0-9-]+\.)+[a-z]{2,}):(\d{2,5})\b/gi,
    keep: (m) => !ALLOWED_DOMAINS.some((d) => d.test(m[1])),
  },
];

const mask = (s) => (s.length <= 2 ? '**' : `${s.slice(0, 2)}${'*'.repeat(Math.min(8, s.length - 2))}`);

function walk(dir, base = dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(path.join(dir, ent.name), base, out);
    } else if (ent.isFile()) {
      out.push(path.relative(base, path.join(dir, ent.name)).split(path.sep).join('/'));
    }
  }
  return out;
}

function loadDenylist(root) {
  const file = process.env.DENYLIST_FILE || path.join(root, 'tools/.denylist.local');
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
}

/** 저장소(root)를 검사해 {findings, imagesUnverified, denylistState} 를 돌려준다 */
export function scan(root, { denylist, selfPath = SELF } = {}) {
  const findings = [];
  const files = walk(root);
  const ledger = fs.existsSync(path.join(root, LEDGER)) ? fs.readFileSync(path.join(root, LEDGER), 'utf8') : '';
  const imagesUnverified = [];

  for (const rel of files) {
    if (SKIP_FILES.has(rel) || rel === selfPath) continue;
    const ext = path.extname(rel).toLowerCase();
    if (IMAGE_EXT.has(ext)) {
      const line = ledger.split('\n').find((l) => l.includes(rel));
      if (!line || !/확인|verified/i.test(line)) imagesUnverified.push(rel);
      continue;
    }
    const buf = fs.readFileSync(path.join(root, rel));
    if (buf.includes(0)) continue; // 이진 파일
    const lines = buf.toString('utf8').split('\n');
    lines.forEach((text, i) => {
      for (const p of PATTERNS) {
        p.re.lastIndex = 0;
        let m;
        while ((m = p.re.exec(text))) {
          if (p.keep && !p.keep(m)) continue;
          findings.push({ file: rel, line: i + 1, kind: p.id, label: p.label, sample: mask(m[0]) });
        }
      }
      if (denylist) {
        const lower = text.toLowerCase();
        for (const term of denylist) {
          if (lower.includes(term.toLowerCase())) {
            findings.push({ file: rel, line: i + 1, kind: 'denylist', label: '기관 식별 정보', sample: mask(term) });
          }
        }
      }
    });
  }
  return { findings, imagesUnverified, denylistState: denylist ? `검사함(${denylist.length}항목)` : '미실행' };
}

function report({ findings, imagesUnverified, denylistState }) {
  for (const f of findings) console.log(`✗ ${f.file}:${f.line}  [${f.label}]  ${f.sample}`);
  for (const img of imagesUnverified) console.log(`? ${img}  [이미지 미확인 — ${LEDGER} 에 확인 기록 없음]`);
  console.log('');
  console.log(`비밀값·인프라 정보: ${findings.filter((f) => f.kind !== 'denylist').length}건`);
  console.log(`기관 식별 정보: ${denylistState === '미실행' ? '🔴 미실행 — 거부 목록 없음(tools/.denylist.local 또는 DENYLIST_FILE)' : `${findings.filter((f) => f.kind === 'denylist').length}건 · ${denylistState}`}`);
  console.log(`이미지 미확인: ${imagesUnverified.length}건`);
}

/** 🔴 검사기가 잡아야 할 것을 실제로 잡는지 — 주입이 됐는지도 확인한다 */
function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'check-public-'));
  const w = (rel, s) => { fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true }); fs.writeFileSync(path.join(tmp, rel), s); };
  // 대조군 A: 걸려야 하는 것 — 종류마다 하나씩(값은 전부 가짜)
  const canaries = {
    'private-key': '-----BEGIN RSA PRIVATE KEY-----',
    token: 'token ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',
    'secret-assign': 'DB_PASSWORD=hunter2secret',
    'cred-url': 'postgres://user:pa55word@db.internal/app',
    ssh: 'ssh -p 2222 admin@server.internal',
    ipv4: 'server at 203.0.113.77',
    'local-path': 'see /home/someone/project/file',
    email: 'contact someone@realmail.co',
    'host-port': 'open api.internal-host.co:8443',
    denylist: '가상기관검사용명칭 에서 시연',
  };
  for (const [k, v] of Object.entries(canaries)) w(`canary/${k}.md`, `line one\n${v}\n`);
  w('canary/secret-assign-ko.md', '관리자 비밀번호: Zx9rQ2pLm\n'); // 한글 키 — \b 로는 못 잡는다
  // 대조군 B: 걸리면 안 되는 것 — 자리표시·예시 도메인·허용 IP
  w('clean/ok.md', [
    '설치 후 https://example.org 에 접속합니다.',
    'password: <your-password>',
    'API_KEY=changeme',
    'localhost 는 127.0.0.1 입니다.',
    '문의는 noreply@example.org',
    '[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)',
  ].join('\n'));
  // 이미지: 대장에 없는 것 1 · 확인된 것 1
  w('assets/shot-a.png', Buffer.from([0x89, 0x50, 0x4e, 0x47, 0]));
  w('assets/shot-b.png', Buffer.from([0x89, 0x50, 0x4e, 0x47, 0]));
  w(LEDGER, '| assets/shot-b.png | 데모 병원명 | 확인 |\n');

  // 주입 성공 확인 — 쓴 파일이 실제로 있는가
  const written = walk(tmp);
  const injected = Object.keys(canaries).every((k) => written.includes(`canary/${k}.md`));

  const res = scan(tmp, { denylist: ['가상기관검사용명칭'], selfPath: '__none__' });
  const byFile = (f) => res.findings.filter((x) => x.file === f);
  const results = [];
  results.push(['주입 성공(카나리아 파일 전부 존재)', injected]);
  for (const k of Object.keys(canaries)) {
    const hit = byFile(`canary/${k}.md`).some((x) => x.kind === k);
    results.push([`잡아야 함: ${k}`, hit]);
  }
  results.push(['잡아야 함: secret-assign(한글 키)', byFile('canary/secret-assign-ko.md').some((x) => x.kind === 'secret-assign')]);
  results.push(['대조군: 자리표시·예시 도메인은 걸리지 않음', byFile('clean/ok.md').length === 0]);
  results.push(['이미지: 대장에 없는 것은 미확인', res.imagesUnverified.includes('assets/shot-a.png')]);
  results.push(['이미지: 확인 기록이 있는 것은 통과', !res.imagesUnverified.includes('assets/shot-b.png')]);
  const noDeny = scan(tmp, { denylist: null, selfPath: '__none__' });
  results.push(['거부 목록이 없으면 "미실행"(통과로 말하지 않음)', noDeny.denylistState === '미실행']);
  results.push(['출력은 값을 가림', res.findings.every((f) => !f.sample.includes('hunter2secret'))]);

  fs.rmSync(tmp, { recursive: true, force: true });
  let ok = true;
  for (const [name, pass] of results) { console.log(`${pass ? '✓' : '✗'} ${name}`); ok &&= pass; }
  console.log(ok ? '\n자기 검증 통과' : '\n🔴 자기 검증 실패 — 이 검사기의 "통과"를 믿지 말 것');
  return ok;
}

const args = process.argv.slice(2);
try {
  if (args.includes('--self-test')) process.exit(selfTest() ? 0 : 2);
  const res = scan(ROOT, { denylist: loadDenylist(ROOT) });
  report(res);
  if (res.findings.length || res.imagesUnverified.length) process.exit(1);
  if (res.denylistState === '미실행') process.exit(3);
  console.log('\n통과');
} catch (e) {
  console.error('검사기 오류:', e?.message ?? e);
  process.exit(2);
}
