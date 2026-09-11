#!/usr/bin/env node
/**
 * HIS 메뉴 구성 추출기 — HIS 웹 화면의 메뉴 정의(`NAV_SECTIONS`)를 도메인별 표로 **기계적으로** 뽑는다.
 * 시스템 구성서 `systems/his.md` §4(핵심 기능)의 근거 표 `systems/his-domains.md` 를 만든다.
 *
 *   node tools/extract-his-nav.mjs             # systems/his-domains.md 를 다시 만든다
 *   node tools/extract-his-nav.mjs --check     # 다시 뽑아 기존 파일과 비교만 한다(쓰지 않음 · 다르면 종료 코드 1)
 *   node tools/extract-his-nav.mjs --dry-run   # 뽑아서 건수만 보고한다(쓰지 않음)
 *   node tools/extract-his-nav.mjs --self-test # 리터럴 판독·가림이 실제로 되는지 가짜 값으로 확인한다
 *
 * 원칙
 *   - 항목을 손으로 쓰지 않는다. 메뉴 정의 배열을 TypeScript 컴파일러(AST)로 읽고, 값이 코드에 적힌 그대로 정해지는 것만 옮긴다.
 *     같은 파일의 상수 · 공용 패키지에서 가져온 상수를 가리키는 식별자와 그 펼침(`...X`)은 그 상수의 리터럴 값으로 푼다.
 *     그 밖의 것(함수 호출 · 풀 수 없는 식별자)은 추측하지 않고 "(코드에서 산출)"로 적는다.
 *   - 읽는 내용은 작업 트리가 아니라 **기준 커밋**의 파일이다(`git show`) — data/base-commits.json 에 고정된 HIS 커밋, 없으면 HEAD.
 *   - TypeScript 는 HIS 저장소에 이미 설치된 것을 경로로 불러 쓴다(아무것도 설치하지 않는다).
 *
 * 🔴 읽기 전용 — HIS 저장소에 쓰지 않는다(git 은 lib/repos.mjs 의 읽기 명령만). 실행 전후 지문을 비교한다.
 * 🔴 가림 — 이 파일과 결과물은 공개된다. 거부 목록 용어 → ‹기관 정보› · 인프라 패턴 → ‹비공개›.
 *    화면에는 건수만 찍는다. 거부 목록이 없으면 "미실행"(종료 코드 3) · 아무것도 쓰지 않는다.
 *
 * 종료 코드: 0 성공(또는 --check 일치) · 1 --check 불일치 · 2 오류 · 3 미실행(거부 목록·로컬 설정 없음)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, loadRepos, git, repoState, fingerprint, sameFingerprint, baseCommit, concurrentNote } from './lib/repos.mjs';
import { PATTERNS, loadDenylist as loadDenylistAt } from './lib/public-rules.mjs';

const OUT = path.join(ROOT, 'systems/his-domains.md');
const OUT_REL = 'systems/his-domains.md';
const SRC = {
  sidebar: 'apps/web/src/components/layout/Sidebar.tsx',
  constants: 'packages/shared/src/constants.ts',
  aiBrand: 'packages/shared/src/ai-brand.ts',
  screenAccess: 'packages/shared/src/screen-access.ts',
};
const SHARED_MODULE = '@hospital-run/shared';
const SHARED_FILES = ['constants', 'aiBrand', 'screenAccess']; // 메뉴 정의가 가져다 쓰는 공용 상수가 있는 파일
const ITEM_KEYS = new Set(['href', 'label', 'group', 'roles', 'icon']); // icon 은 옮기지 않는다(그림 컴포넌트)
const COMPUTED = '(코드에서 산출)';
const TOKEN_DENY = '‹기관 정보›';
const TOKEN_INFRA = '‹비공개›';
const DATE_ROW = /^\| 추출일 \|.*\|$/m; // --check 는 이 줄을 비교하지 않는다
const GENERATED_NOTE = '<!-- 생성물 — 직접 수정 금지. `node tools/extract-his-nav.mjs` 로 다시 만듭니다. -->';

// ─── 가림 ────────────────────────────────────────────────────────────────────

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function makeRedactor(denylist) {
  const denyRes = [...denylist].sort((a, b) => b.length - a.length).map((t) => new RegExp(escapeRe(t), 'gi'));
  const counts = { infra: 0, deny: 0 };
  function redact(text) {
    if (typeof text !== 'string' || !text) return text;
    let out = text;
    for (const p of PATTERNS) {
      out = out.replace(p.re, (...args) => {
        const m = args.slice(0, -2);
        m.index = args[args.length - 2];
        if (p.keep && !p.keep(m)) return m[0];
        counts.infra++;
        return TOKEN_INFRA;
      });
    }
    for (const re of denyRes) out = out.replace(re, () => { counts.deny++; return TOKEN_DENY; });
    return out;
  }
  return { redact, counts };
}

// ─── AST — 리터럴과, 리터럴로 풀리는 상수 참조만 읽는다 ─────────────────────────

let ts;
const COMP = Symbol('computed');
const isComp = (v) => v === COMP;

function unwrap(n) {
  while (n && (ts.isAsExpression(n) || ts.isSatisfiesExpression?.(n) || ts.isParenthesizedExpression(n) || ts.isTypeAssertionExpression?.(n))) n = n.expression;
  return n;
}

/** 값 — env(이름 → 값)로 식별자를 푼다. 풀리지 않으면 COMP */
function lit(node, env) {
  const n = unwrap(node);
  if (!n) return COMP;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (n.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(n)) return env.has(n.text) ? env.get(n.text) : COMP;
  if (ts.isTemplateExpression(n)) {
    let s = n.head.text;
    for (const span of n.templateSpans) {
      const v = lit(span.expression, env);
      if (typeof v !== 'string' && typeof v !== 'number') return COMP;
      s += String(v) + span.literal.text;
    }
    return s;
  }
  if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = lit(n.left, env); const b = lit(n.right, env);
    return typeof a === 'string' && typeof b === 'string' ? a + b : COMP;
  }
  if (ts.isArrayLiteralExpression(n)) {
    const out = [];
    for (const e of n.elements) {
      if (ts.isSpreadElement(e)) {
        const v = lit(e.expression, env);
        if (!Array.isArray(v)) return COMP;
        out.push(...v);
      } else {
        const v = lit(e, env);
        if (isComp(v)) return COMP;
        out.push(v);
      }
    }
    return out;
  }
  if (ts.isObjectLiteralExpression(n)) return objLit(n, env);
  return COMP;
}

/** 객체 — 필드마다 따로 푼다(한 필드가 계산식이어도 나머지는 읽는다). 풀 수 없는 키가 있으면 표시한다 */
function objLit(n, env) {
  const o = {};
  for (const p of n.properties) {
    if (ts.isPropertyAssignment(p)) {
      let k = null;
      if (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) || ts.isNumericLiteral(p.name)) k = p.name.text;
      else if (ts.isComputedPropertyName(p.name)) { const v = lit(p.name.expression, env); if (typeof v === 'string') k = v; }
      if (k === null) { o.__computedKeys = true; continue; }
      o[k] = lit(p.initializer, env);
    } else if (ts.isShorthandPropertyAssignment(p)) {
      o[p.name.text] = env.has(p.name.text) ? env.get(p.name.text) : COMP;
    } else {
      o.__computedKeys = true; // 스프레드·메서드 — 어떤 필드가 생기는지 AST 로는 모른다
    }
  }
  return o;
}

/** 파일 최상위의 const 선언을 차례로 풀어 env 에 넣는다(앞에서 정한 상수만 뒤에서 쓸 수 있다 — 코드와 같은 순서) */
function topLevelConsts(sf, env) {
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue;
    if (!(st.declarationList.flags & ts.NodeFlags.Const)) continue;
    for (const d of st.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.initializer) env.set(d.name.text, lit(d.initializer, env));
    }
  }
  return env;
}

/** 공용 패키지에서 가져온 이름 — 공용 env 에 있으면 그 값, 없으면 COMP. 다른 모듈에서 가져온 이름은 COMP */
function importedNames(sf, sharedEnv) {
  const env = new Map();
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || !st.importClause) continue;
    const from = ts.isStringLiteral(st.moduleSpecifier) ? st.moduleSpecifier.text : '';
    const nb = st.importClause.namedBindings;
    const names = [];
    if (st.importClause.name) names.push([st.importClause.name.text, null]);
    if (nb && ts.isNamedImports(nb)) for (const el of nb.elements) names.push([el.name.text, (el.propertyName ?? el.name).text]);
    for (const [local, orig] of names) env.set(local, from === SHARED_MODULE && orig && sharedEnv.has(orig) ? sharedEnv.get(orig) : COMP);
  }
  return env;
}

function findInit(sf, name) {
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue;
    for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name) && d.name.text === name && d.initializer) return d.initializer;
  }
  throw new Error(`상수 ${name} 을(를) 찾지 못했습니다`);
}

// ─── 추출 ────────────────────────────────────────────────────────────────────

function extract(src) {
  const warnings = [];
  const mk = (name, text) => ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, name.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const sharedEnv = new Map();
  for (const k of SHARED_FILES) topLevelConsts(mk(`${k}.ts`, src[k]), sharedEnv);
  const sf = mk('Sidebar.tsx', src.sidebar);
  const env = topLevelConsts(sf, importedNames(sf, sharedEnv));

  const hisVersion = sharedEnv.has('HIS_VERSION') ? sharedEnv.get('HIS_VERSION') : COMP;
  const roleLabel = sharedEnv.get('USER_ROLE_LABEL');
  const roleLabels = roleLabel && !isComp(roleLabel) && typeof roleLabel === 'object' ? roleLabel : {};
  if (!Object.keys(roleLabels).length) warnings.push('USER_ROLE_LABEL 을 리터럴로 읽지 못해 역할을 코드 이름으로 적습니다');

  // 메뉴 묶음(섹션)
  const navNode = unwrap(findInit(sf, 'NAV_SECTIONS'));
  if (!ts.isArrayLiteralExpression(navNode)) throw new Error('NAV_SECTIONS 가 배열 리터럴이 아닙니다 — 추출 불가');
  const sections = [];
  navNode.elements.forEach((e, i) => {
    const u = unwrap(e);
    if (!ts.isObjectLiteralExpression(u)) { warnings.push(`NAV_SECTIONS[${i}] 가 객체 리터럴이 아닙니다 — 한 묶음을 "${COMPUTED}"로 남깁니다`); sections.push({ title: COMP, items: [], computedRow: true }); return; }
    let title = COMP; let itemsNode = null;
    for (const p of u.properties) {
      if (!ts.isPropertyAssignment(p) || !ts.isIdentifier(p.name)) { warnings.push(`NAV_SECTIONS[${i}] 에 읽지 못한 속성이 있습니다`); continue; }
      if (p.name.text === 'title') title = lit(p.initializer, env);
      else if (p.name.text === 'items') itemsNode = unwrap(p.initializer);
    }
    const items = [];
    if (!itemsNode || !ts.isArrayLiteralExpression(itemsNode)) {
      warnings.push(`NAV_SECTIONS[${i}].items 가 배열 리터럴이 아닙니다 — 항목을 "${COMPUTED}"로 남깁니다`);
      items.push({ computedRow: true });
    } else {
      itemsNode.elements.forEach((el, j) => {
        const v = unwrap(el);
        if (!ts.isObjectLiteralExpression(v)) { warnings.push(`NAV_SECTIONS[${i}].items[${j}] 가 객체 리터럴이 아닙니다`); items.push({ computedRow: true }); return; }
        const o = objLit(v, env);
        if (o.__computedKeys) warnings.push(`NAV_SECTIONS[${i}].items[${j}] 에 리터럴이 아닌 속성이 있습니다(스프레드 등)`);
        for (const k of Object.keys(o)) if (!k.startsWith('__') && !ITEM_KEYS.has(k)) warnings.push(`NAV_SECTIONS[${i}].items[${j}] 에 표에 싣지 않는 속성 ${k} 가 있습니다`);
        items.push(o);
      });
    }
    sections.push({ title, items });
  });

  // 도메인(대분류)과 섹션 → 도메인 매핑
  let domains = lit(findInit(sf, 'MENU_DOMAINS'), env);
  if (!Array.isArray(domains)) { warnings.push('MENU_DOMAINS 를 리터럴로 읽지 못했습니다'); domains = []; }
  let meta = lit(findInit(sf, 'SECTION_META'), env);
  if (isComp(meta) || typeof meta !== 'object' || meta === null) { warnings.push('SECTION_META 를 리터럴로 읽지 못했습니다'); meta = {}; }
  if (meta.__computedKeys) warnings.push('SECTION_META 에 풀지 못한 키가 있습니다 — 해당 섹션은 도메인 미지정으로 둡니다');
  // 코드의 폴백 규칙(매핑이 없는 섹션은 'personal')이 그대로 있을 때만 같은 규칙을 적용한다
  const fb = /const domainOf = \(title: string\) => SECTION_META\[title\]\?\.domain \?\? '([a-z]+)';/.exec(src.sidebar);
  const fallbackDomain = fb ? fb[1] : null;
  if (!fallbackDomain) warnings.push('섹션 → 도메인 폴백 규칙을 찾지 못해, 매핑이 없는 섹션은 "도메인 미지정"으로 둡니다');

  return { hisVersion, roleLabels, sections, domains, meta, fallbackDomain, warnings };
}

// ─── 표 그리기 ────────────────────────────────────────────────────────────────

const cell = (v, fmt = (x) => x) => (isComp(v) ? COMPUTED : v === undefined || v === null || v === '' ? '—' : fmt(v));
const md = (s) => String(s).replace(/\r?\n+/g, ' ').replace(/\|/g, '\\|').trim();
const code = (s) => `\`${s}\``;
const table = (head, rows) => [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(md).join(' | ')} |`)].join('\n');

function render(x, meta, R) {
  const { roleLabels, sections, domains, fallbackDomain } = x;
  const roleText = (roles) => cell(roles, (rs) => (Array.isArray(rs) ? [...new Set(rs)].map((r) => roleLabels[r] ?? r).join(' · ') : COMPUTED));
  const domainKeyOf = (s) => {
    if (isComp(s.title)) return null;
    const m = x.meta[s.title];
    if (m && typeof m === 'object' && typeof m.domain === 'string') return m.domain;
    return fallbackDomain;
  };

  const allItems = sections.flatMap((s) => s.items);
  const hrefs = allItems.map((i) => i.href).filter((h) => typeof h === 'string');
  const distinct = new Set(hrefs).size;
  const compCells = allItems.reduce((n, i) => n + (i.computedRow ? 4 : ['href', 'label', 'roles'].filter((k) => isComp(i[k])).length + (isComp(i.group) ? 1 : 0)), 0)
    + sections.filter((s) => isComp(s.title)).length;
  const unmapped = sections.filter((s) => !isComp(s.title) && !(x.meta[s.title] && typeof x.meta[s.title] === 'object'));
  const stats = { domains: domains.length, sections: sections.length, items: allItems.length, distinct, compCells, unmapped: unmapped.length };

  const L = [];
  L.push(GENERATED_NOTE, '', '# HIS 메뉴 구성 — 도메인별', '');
  L.push('> 자동 생성 — 손으로 고치지 않습니다. HIS 코드의 메뉴 정의가 바뀌면 추출기를 다시 돌립니다.', '');
  L.push('HIS 웹 화면 왼쪽 메뉴의 **코드 기본 구성**입니다. [HIS 시스템 구성서](his.md) §4 의 근거 표입니다.', '');
  L.push(table(['기준', '값'], [
    ['원본', `HIS 저장소 ${code(SRC.sidebar)} 의 ${code('NAV_SECTIONS')} · ${code('MENU_DOMAINS')} · ${code('SECTION_META')} (역할 이름은 ${code(SRC.constants)} 의 ${code('USER_ROLE_LABEL')})`],
    ['HIS 버전', cell(x.hisVersion)],
    ['기준 커밋', `${code(meta.head)} (${meta.headDate})`],
    ['추출일', meta.date],
    ['규모', `도메인 ${stats.domains} · 메뉴 묶음 ${stats.sections} · 메뉴 항목 ${stats.items}(서로 다른 화면 경로 ${stats.distinct})`],
    ['센 방법', '메뉴 항목 = `NAV_SECTIONS` 각 묶음의 `items` 원소 수. 같은 화면 경로가 두 묶음에 걸려 있으면 항목은 둘로, 화면 경로는 하나로 셉니다. 관리자가 화면에서 추가한 메뉴는 코드에 없으므로 세지 않습니다'],
    ['리터럴로 읽지 못한 칸', `${stats.compCells}`],
  ]), '');
  L.push('## 읽는 법', '');
  L.push('- 메뉴에 있다는 것은 **화면이 있다**는 뜻입니다. 실운영에서 검증됐다는 뜻은 아닙니다. 다른 시스템과의 연결 상태는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다.');
  L.push('- **사용 역할**은 코드의 기본값입니다. 기관 관리자가 메뉴 관리 화면에서 메뉴를 숨기거나, 역할 · 이름 · 순서를 바꾸거나, 메뉴를 추가할 수 있습니다. 이 표는 그런 기관 설정을 싣지 않습니다.');
  L.push('- 메뉴 표시와 기능 권한은 따로 정해집니다. 메뉴에서 숨겨도 기능 권한은 서버의 역할 규칙이 판정합니다.');
  L.push('- **소분류**는 관리 메뉴를 보기 좋게 나눈 표시 분류입니다. 권한이나 순서를 뜻하지 않습니다.');
  L.push('- 메뉴 이름은 코드에 적힌 한국어 원문 그대로입니다. 화면에는 언어 팩에 따라 번역돼 보일 수 있습니다.');
  L.push(`- \`${COMPUTED}\` — 값이 코드에서 계산돼 이 추출기가 리터럴로 읽지 못한 칸입니다. 추측해 채우지 않습니다.`);
  if (stats.unmapped) L.push(`- 도메인 매핑이 없는 메뉴 묶음 ${stats.unmapped}개는 ${fallbackDomain ? `코드 규칙대로 ${code(fallbackDomain)} 도메인에 넣었습니다` : '"도메인 미지정"에 모았습니다'}.`);
  L.push('');

  // 역할 이름표
  const usedRoles = new Set(allItems.flatMap((i) => (Array.isArray(i.roles) ? i.roles : [])));
  const roleRows = [...new Set([...Object.keys(roleLabels), ...usedRoles])].map((r) => [code(r), cell(roleLabels[r]), usedRoles.has(r) ? '예' : '아니오']);
  L.push('## 역할 이름', '');
  L.push(table(['역할 코드', '화면 이름', '기본 메뉴에 쓰임'], roleRows.map((r) => r.map(R))), '');

  // 도메인 → 섹션
  L.push('## 도메인 한눈에', '');
  const domOrder = domains.map((d) => (d && typeof d === 'object' ? d : { key: COMP, title: COMP, desc: COMP }));
  const bucket = new Map(domOrder.map((d) => [d.key, []]));
  const orphan = [];
  for (const s of sections) {
    const k = domainKeyOf(s);
    if (k !== null && bucket.has(k)) bucket.get(k).push(s); else orphan.push(s);
  }
  const summaryRows = domOrder.map((d) => {
    const ss = bucket.get(d.key) ?? [];
    return [`${cell(d.title)} (${code(cell(d.key))})`, cell(d.desc), ss.map((s) => `${cell(s.title)} ${s.items.length}`).join(' · ') || '—', String(ss.reduce((n, s) => n + s.items.length, 0))];
  });
  if (orphan.length) summaryRows.push(['도메인 미지정', '—', orphan.map((s) => `${cell(s.title)} ${s.items.length}`).join(' · '), String(orphan.reduce((n, s) => n + s.items.length, 0))]);
  L.push(table(['도메인', '설명(코드 원문)', '메뉴 묶음 · 항목 수', '항목 합계'], summaryRows.map((r) => r.map(R))), '');

  const sectionBlock = (s) => {
    const desc = !isComp(s.title) && x.meta[s.title] && typeof x.meta[s.title] === 'object' ? x.meta[s.title].desc : undefined;
    L.push(`### ${R(cell(s.title))} (${s.items.length})`, '');
    if (desc) L.push(R(cell(desc)), '');
    if (!s.items.length) { L.push('_코드 기본 메뉴 항목이 없습니다._', ''); return; }
    const hasGroup = s.items.some((i) => i.group !== undefined);
    const head = hasGroup ? ['소분류', '메뉴', '화면 경로', '사용 역할(기본값)'] : ['메뉴', '화면 경로', '사용 역할(기본값)'];
    const rows = s.items.map((i) => {
      if (i.computedRow) return head.map(() => COMPUTED);
      const base = [cell(i.label), cell(i.href, code), roleText(i.roles)];
      return (hasGroup ? [cell(i.group), ...base] : base).map(R);
    });
    L.push(table(head, rows), '');
  };
  for (const d of domOrder) {
    const ss = bucket.get(d.key) ?? [];
    L.push(`## ${R(cell(d.title))} — ${code(cell(d.key))}`, '');
    if (!isComp(d.desc)) L.push(`> ${R(cell(d.desc))}`, '');
    if (!ss.length) { L.push('_이 도메인에 속한 메뉴 묶음이 없습니다._', ''); continue; }
    ss.forEach(sectionBlock);
  }
  if (orphan.length) { L.push('## 도메인 미지정', ''); orphan.forEach(sectionBlock); }
  L.push('## 다시 만들기', '');
  L.push('```bash');
  L.push('node tools/extract-his-nav.mjs          # 이 파일을 다시 만듭니다');
  L.push('node tools/extract-his-nav.mjs --check  # 표가 코드와 같은지 확인만(쓰지 않음)');
  L.push('```', '');
  return { text: L.join('\n'), stats };
}

// ─── 자기 검증 ────────────────────────────────────────────────────────────────

function selfTest() {
  const results = [];
  const J = (...p) => p.join('');
  const fakeTerm = '가짜기관자기검증';
  const { redact, counts } = makeRedactor([fakeTerm]);
  const must = {
    denylist: `${fakeTerm} 메뉴`,
    ipv4: `서버 ${['203', '0', '113', '77'].join('.')}`,
    'local-path': `원본 ${J('/Us', 'ers/someone/project/file')}`,
    email: `문의 ${J('someone', '@', 'realmail.co')}`,
    'host-port': `접속 ${J('api.internal-host.co', ':8443')}`,
  };
  for (const [k, v] of Object.entries(must)) results.push([`가려야 함: ${k}`, redact(v) !== v]);
  for (const v of ['`/admin/opening`', '관리자 · 의사 · 간호사', 'https://example.org 에 접속']) results.push([`남겨야 함: ${v}`, redact(v) === v]);
  results.push(['건수를 셈', counts.deny >= 1 && counts.infra >= Object.keys(must).length - 1]);
  const repos = loadRepos();
  if (repos?.his && fs.existsSync(repos.his)) {
    ts = createRequire(path.join(repos.his, 'package.json'))('typescript');
    const text = [
      "import { SHARED_X, OTHER } from '@hospital-run/shared';",
      "import { Icon } from './icons';",
      "const A = ['R1', 'R2'];",
      "const B = [...A, 'R3'];",
      'const NAV_SECTIONS = [',
      "  { title: `T-${SHARED_X}`, items: [",
      "    { href: '/a', label: 'L', roles: B, icon: Icon },",
      "    { href: '/b', label: foo(), roles: [...OTHER], group: 'G' },",
      '    bar,',
      '  ]},',
      '];',
    ].join('\n');
    const env0 = new Map([['SHARED_X', 'x']]);
    const sf = ts.createSourceFile('t.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const env = topLevelConsts(sf, importedNames(sf, env0));
    // 배열 값으로 한 번에 풀면 객체가 아닌 원소(bar) 때문에 통째로 산출 표기 — 그래서 extract() 는 원소별로 따로 읽는다
    const [sec0] = unwrap(findInit(sf, 'NAV_SECTIONS')).elements;
    const [titleProp, itemsProp] = sec0.properties;
    results.push(['풀 수 없는 원소가 섞인 배열은 통째로 산출 표기', isComp(lit(itemsProp.initializer, env))]);
    const item0 = objLit(itemsProp.initializer.elements[0], env);
    const item1 = objLit(itemsProp.initializer.elements[1], env);
    const title = lit(titleProp.initializer, env);
    results.push(['공용 상수가 든 템플릿은 풂', title === 'T-x']);
    results.push(['같은 파일 상수와 펼침은 풂', Array.isArray(item0.roles) && item0.roles.join() === 'R1,R2,R3']);
    results.push(['공용 env 에 없는 공용 이름은 산출 표기', isComp(item1.roles)]);
    results.push(['다른 모듈에서 가져온 이름은 산출 표기', isComp(item0.icon)]);
    results.push(['함수 호출은 산출 표기', isComp(item1.label) && item1.group === 'G']);
  } else {
    console.log('? 리터럴 판독 검증 미실행 — HIS 저장소(typescript)를 찾지 못함');
  }
  let ok = true;
  for (const [name, pass] of results) { console.log(`${pass ? '✓' : '✗'} ${name}`); ok &&= pass; }
  console.log(ok ? '\n자기 검증 통과' : '\n🔴 자기 검증 실패 — 이 추출기를 믿지 말 것');
  return ok;
}

// ─── 실행 ────────────────────────────────────────────────────────────────────

const today = () => new Date().toISOString().slice(0, 10);

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--self-test')) return selfTest() ? 0 : 2;
  const CHECK = args.has('--check');
  const DRY = args.has('--dry-run');

  const denylist = loadDenylistAt(ROOT);
  if (!denylist) { console.log('미실행 — 거부 목록이 없습니다(tools/.denylist.local 또는 DENYLIST_FILE). 가리지 못하는 상태로는 만들지 않습니다.'); return 3; }
  const repos = loadRepos();
  if (!repos?.his || !fs.existsSync(repos.his)) { console.log('미실행 — 로컬 설정(tools/.local.json)에 HIS 저장소 경로가 없습니다.'); return 3; }
  const his = repos.his;
  const before = fingerprint({ his });

  let out; let x; let meta; let counts;
  try {
    ts = createRequire(path.join(his, 'package.json'))('typescript');
    const st = repoState(his, baseCommit('his', his).hash);
    if (!st.head) throw new Error('HIS 기준 커밋을 읽지 못했습니다');
    const src = Object.fromEntries(Object.entries(SRC).map(([k, rel]) => [k, git(his, ['show', `${st.head}:${rel}`])]));
    x = extract(src);
    meta = { head: st.head, headDate: st.headDate, date: today() };
    const r = makeRedactor(denylist);
    const rendered = render(x, meta, r.redact);
    const final = r.redact(rendered.text); // 안전망
    out = { text: final.endsWith('\n') ? final : `${final}\n`, stats: rendered.stats };
    counts = r.counts;
  } catch (e) {
    console.error('추출기 오류:', e?.message ?? e);
    return 2;
  } finally {
    const changed = sameFingerprint(before, fingerprint({ his }));
    if (changed.length) console.log(concurrentNote(changed));
  }

  const s = out.stats;
  console.log(`HIS ${cell(x.hisVersion)} · 기준 커밋 ${meta.head.slice(0, 12)} (${meta.headDate})`);
  console.log(`도메인 ${s.domains} · 메뉴 묶음 ${s.sections} · 메뉴 항목 ${s.items}(화면 경로 ${s.distinct}) · 리터럴로 읽지 못한 칸 ${s.compCells} · 도메인 매핑 없는 묶음 ${s.unmapped}`);
  console.log(`가림: 기관 정보 ${counts.deny} · 인프라 정보 ${counts.infra}`);
  for (const w of x.warnings) console.log(`경고: ${w}`);

  const norm = (t) => t.replace(DATE_ROW, '| 추출일 | - |');
  if (CHECK) {
    if (!fs.existsSync(OUT) || norm(fs.readFileSync(OUT, 'utf8')) !== norm(out.text)) { console.log(`\n불일치 — 다시 만들어야 합니다: ${OUT_REL}`); return 1; }
    console.log('\n일치 — 표가 코드와 같습니다(추출일 줄은 비교하지 않음)');
    return 0;
  }
  if (DRY) { console.log('\n--dry-run — 파일을 쓰지 않았습니다'); return 0; }
  if (fs.existsSync(OUT) && norm(fs.readFileSync(OUT, 'utf8')) === norm(out.text)) { console.log('\n변경 없음'); return 0; }
  fs.writeFileSync(OUT, out.text);
  console.log(`\n썼음 ${OUT_REL}`);
  return 0;
}

process.exitCode = main();
