/**
 * 공개 규칙 — "이 저장소에 실리면 안 되는 것"의 정본. 검사기와 생성기가 같이 쓴다.
 *
 *   - tools/check-public.mjs      : 찾아서 보고한다(값은 가린다)
 *   - tools/extract-checklist.mjs : 생성 시점에 같은 규칙으로 가림 처리한다
 *
 * 🔴 규칙을 고칠 때는 이 파일만 고친다(두 도구가 따로 들고 있으면 한쪽만 고쳐져 어긋난다).
 *    고친 뒤 `node tools/check-public.mjs --self-test` 와 `node tools/extract-checklist.mjs --self-test` 를 둘 다 통과시킨다.
 */
import fs from 'node:fs';
import path from 'node:path';

export const ALLOWED_DOMAINS = [/(^|\.)example\.(org|com|net)$/i, /(^|\.)shields\.io$/i, /(^|\.)github\.com$/i];
export const ALLOWED_IPS = new Set(['127.0.0.1', '0.0.0.0']);

/** 패턴 — 각 항목은 {id, label, re, keep(match)→boolean(실제로 문제인가)} */
export const PATTERNS = [
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
  {
    // 로컬·서버 절대 경로 — 경로 전체. 앱 화면 경로(/admin/…)·URL 경로는 걸리지 않는다(앞 글자가 / . 단어 문자면 제외).
    id: 'local-path', label: '로컬·서버 경로',
    re: /(?<![\w/.~)-])(?:~|\/(?:Users|home|root|var|opt|srv|etc|mnt))\/[^\s'"`()<>|,]+|[A-Z]:\\Users\\[^\s'"`]+/g,
  },
  {
    id: 'email', label: '이메일', re: /\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
    keep: (m) => !ALLOWED_DOMAINS.some((d) => d.test(m[1])),
  },
  {
    id: 'host-port', label: '호스트:포트', re: /\b((?:[a-z0-9-]+\.)+[a-z]{2,}):(\d{2,5})\b/gi,
    keep: (m) => !ALLOWED_DOMAINS.some((d) => d.test(m[1])),
  },
];

/** 기관 식별 정보 거부 목록 — 없으면 null(호출 쪽이 "미실행"으로 보고한다. 통과로 말하지 않는다) */
export function loadDenylist(root) {
  const file = process.env.DENYLIST_FILE || path.join(root, 'tools/.denylist.local');
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
}
