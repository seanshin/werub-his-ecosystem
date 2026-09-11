#!/usr/bin/env node
/**
 * 화면 캡처 목록 생성 — HIS 메뉴 구성표(생성물)에서 캡처해야 할 화면 목록을 만든다.
 *
 *   node tools/build-screen-index.mjs          # 다시 만들기
 *   node tools/build-screen-index.mjs --check  # 목록이 메뉴 구성표·실제 파일과 같은지 확인만
 *
 * 입력  systems/his-domains.md (extract-his-nav.mjs 의 생성물) · assets/screens/ 의 실제 파일
 * 출력  assets/screens/INDEX.md
 *
 * 파일 이름 규칙: his-<도메인키>-<화면경로에서 만든 슬러그>.png
 *   예) `/clinic-queue` · 도메인 care  →  his-care-clinic-queue.png
 *
 * 종료 코드: 0 일치 · 1 불일치(--check) · 2 도구 오류
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'systems/his-domains.md';
const OUT = 'assets/screens/INDEX.md';
const DIR = 'assets/screens';
const check = process.argv.includes('--check');

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/** 화면 경로 → 파일 이름 조각 */
export function slug(route) {
  return String(route).replace(/^\//, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'root';
}

/** 메뉴 구성표에서 도메인 · 묶음 · 화면을 읽는다 */
function parse(md) {
  const domains = [];
  let dom = null, group = null;
  for (const line of md.split('\n')) {
    let m = line.match(/^## (.+?) — `([a-z]+)`\s*$/);
    if (m) { dom = { title: m[1], key: m[2], groups: [] }; domains.push(dom); group = null; continue; }
    if (/^## /.test(line)) { dom = null; group = null; continue; }
    m = line.match(/^### (.+?) \((\d+)\)\s*$/);
    if (m && dom) { group = { title: m[1], declared: Number(m[2]), items: [] }; dom.groups.push(group); continue; }
    if (!group) continue;
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 3 || cells.includes('메뉴') || cells.every((c) => /^-+$/.test(c))) continue;
    // 경로 칸(백틱으로 감싼 `/...`)을 찾고, 그 바로 앞 칸을 메뉴 이름으로, 소분류가 있으면 함께 적는다
    const i = cells.findIndex((c) => /^`\/.+`$/.test(c));
    if (i < 1) continue;
    group.items.push({
      name: cells[i - 1],
      route: cells[i].slice(1, -1),
      roles: cells[i + 1] ?? '',
      sub: i >= 2 ? cells[i - 2] : '',
    });
  }
  return domains;
}

/** 기준 표(버전 · 기준 커밋 · 추출일)를 그대로 옮긴다 */
function basis(md) {
  const pick = (label) => md.match(new RegExp(`^\\| ${label} \\| (.+?) \\|$`, 'm'))?.[1] ?? '(읽지 못함)';
  return { version: pick('HIS 버전'), commit: pick('기준 커밋'), extracted: pick('추출일') };
}

try {
  const md = read(SRC);
  const domains = parse(md);
  const b = basis(md);
  if (!domains.length) throw new Error(`${SRC} 에서 도메인을 읽지 못했다`);

  const have = new Set(
    fs.existsSync(path.join(ROOT, DIR))
      ? fs.readdirSync(path.join(ROOT, DIR)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      : []
  );

  // 같은 화면 경로가 두 묶음에 걸리면 파일은 하나만 둔다
  const seen = new Map();
  let items = 0;
  for (const d of domains) for (const g of d.groups) for (const it of g.items) {
    items += 1;
    const file = `his-${d.key}-${slug(it.route)}.png`;
    if (!seen.has(file)) seen.set(file, { ...it, domain: d, group: g, file });
  }
  const routes = seen.size;
  const captured = [...seen.values()].filter((x) => have.has(x.file)).length;

  const L = [];
  L.push('<!-- 생성물 — 직접 수정 금지. `node tools/build-screen-index.mjs` 로 다시 만듭니다. -->');
  L.push('');
  L.push('# 화면 캡처 목록 — HIS');
  L.push('');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. [HIS 메뉴 구성표](../../systems/his-domains.md)가 바뀌면 다시 만듭니다.');
  L.push('');
  L.push('HIS 웹 화면의 **코드 기본 메뉴**를 캡처 목록으로 편 것입니다. 캡처 규칙은 [캡처 안내](README.md), 사람 확인은 [캡처 대장](../CAPTURE-LEDGER.md)에 있습니다.');
  L.push('');
  L.push('| 기준 | 값 |');
  L.push('|---|---|');
  L.push(`| 근거 | [HIS 메뉴 구성 — 도메인별](../../systems/his-domains.md) |`);
  L.push(`| HIS 버전 | ${b.version} |`);
  L.push(`| 기준 커밋 | ${b.commit} |`);
  L.push(`| 메뉴 항목 | ${items} |`);
  L.push(`| 캡처할 화면(경로 기준) | **${routes}** |`);
  L.push(`| 지금 들어온 캡처 | **${captured}** / ${routes} |`);
  L.push('');
  L.push('- **메뉴에 있다는 것은 화면이 있다는 뜻**이고, 실운영에서 검증됐다는 뜻이 아닙니다.');
  L.push('- 같은 화면 경로가 두 묶음에 걸려 있으면 **파일은 하나만** 둡니다(목록에는 첫 묶음에 적습니다).');
  L.push('- 캡처는 **가상 병원 데이터**로 찍습니다. 기관 식별 정보 · 비밀값 · 서버 정보가 화면에 있으면 가리고 찍습니다.');
  L.push('');

  for (const d of domains) {
    const dTotal = d.groups.reduce((n, g) => n + g.items.length, 0);
    L.push(`## ${d.title} — \`${d.key}\` (${dTotal})`);
    L.push('');
    for (const g of d.groups) {
      L.push(`### ${g.title} (${g.items.length})`);
      L.push('');
      const hasSub = g.items.some((x) => x.sub);
      L.push(hasSub ? '| 소분류 | 메뉴 | 화면 경로 | 파일 | 상태 |' : '| 메뉴 | 화면 경로 | 파일 | 상태 |');
      L.push(hasSub ? '|---|---|---|---|---|' : '|---|---|---|---|');
      for (const it of g.items) {
        const file = `his-${d.key}-${slug(it.route)}.png`;
        const first = seen.get(file);
        const dup = first && (first.name !== it.name || first.group !== g);
        const state = have.has(file) ? '✅' : '⬜';
        const row = `${it.name} | \`${it.route}\` | \`${file}\`${dup ? ' (같은 경로)' : ''} | ${state}`;
        L.push(hasSub ? `| ${it.sub} | ${row} |` : `| ${row} |`);
      }
      L.push('');
    }
  }
  L.push('## 다시 만들기');
  L.push('');
  L.push('```sh');
  L.push('node tools/build-screen-index.mjs          # 다시 만들기');
  L.push('node tools/build-screen-index.mjs --check  # 메뉴 구성표 · 실제 파일과 같은지 확인만');
  L.push('```');
  const out = L.join('\n') + '\n';

  const abs = path.join(ROOT, OUT);
  if (check) {
    const cur = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
    if (cur !== out) { console.error(`✗ ${OUT} 이 메뉴 구성표 · 실제 파일과 다르다 — build-screen-index 를 다시 돌린다`); process.exit(1); }
    console.log(`✓ 화면 캡처 목록 = 메뉴 구성표 · 캡처 ${captured}/${routes}`);
  } else {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, out);
    console.log(`${OUT} — 화면 ${routes}개(메뉴 항목 ${items}) · 캡처 ${captured}`);
  }
} catch (e) {
  console.error('도구 오류:', e.message);
  process.exit(2);
}
