# 화면으로 보는 생태계

시스템 13개가 실제로 어떤 화면으로 되어 있는지 봅니다. 각 장은 **화면 캡처와 그 화면이 하는 일**을 함께 싣습니다.

> 🟡 **초안 — 캡처 넣는 중** · 기준: [통합 릴리즈 초안 매니페스트](../RELEASES/draft/manifest.md)(계측일 2026-09-11)
> **EN** — A screen-by-screen tour of the ecosystem: what each screen does, with screenshots. All captures are taken on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication (see the [capture rules](../assets/screens/README.md)). 293 captures so far (HIS: 264 of 266 menu screens + 2 off-menu; 2 withheld because infrastructure addresses or partner details fill the screen). ⚠️ The HIS screens come from a rehearsal install running **v4.19.0**, one release after the **v4.18.0** base commit these materials describe.

## 장

| 계층 | 시스템 | 화면 소개 | 캡처할 화면 |
|---|---|---|---|
| 코어 | **HIS** | [his.md](his.md) **266장**(메뉴 264 / 266 + 메뉴 밖 2 — 투약 스케줄 탭 · 시스템 설정) | **266**(코드 기본 메뉴 · [목록](../assets/screens/INDEX.md)) |
| 흐름 | **사람을 넣고 빼는 일** | [by-onboarding.md](by-onboarding.md) | 로그인 · 인증서 · 채용 · 의료진 등록 · 퇴직 |
| 환자 접점 | 공개 홈페이지 | [homepage.md](homepage.md) **1장** | 50(화면 수 계측값) |
| 환자 접점 | 환자 앱 | [patient-app.md](patient-app.md) **1장** | 32 |
| 임상 부서 | LIS | [lis.md](lis.md) **5장** | 41 |
| 임상 부서 | PACS | [pacs.md](pacs.md) **6장** | 47(관리 화면 · 웹 뷰어 제외) |
| 신뢰 | sign | [sign.md](sign.md) **1장** | 38 |
| 경영 | ERP | [erp.md](erp.md) **5장** | 113 |
| AI | AI Server | [ai-server.md](ai-server.md) | 관리 화면(계측값 없음) |
| AI | twin | [twin.md](twin.md) **2장** | 15 |
| AI | cerno | [cerno.md](cerno.md) | 3 |
| 협업·교육 | Clinic | [clinic.md](clinic.md) | 16(병원 서비스) |
| 협업·교육 | edu | [edu.md](edu.md) **1장** | 41 |
| 협업·교육 | Jitsi | [jitsi.md](jitsi.md) | — (`중단` — 현재 설치본이 동작하지 않습니다) |

화면 수는 [계측 스냅샷](../data/scale-snapshot.json)(계측일 2026-09-11 · 기준 커밋 내용을 읽어 셈)에서 옮겼습니다. HIS 는 메뉴 구성표의 **메뉴 항목 수**(266)이고, 계측 스냅샷의 웹 화면 수(450)와 세는 대상이 다릅니다 — 메뉴에 걸리지 않은 화면이 있기 때문입니다.

> ⚠️ **캡처한 설치본과 이 자료의 기준 판본이 한 판 다릅니다.** 이 자료가 설명하는 HIS 기준은 **v4.18.0**(기준 커밋 · [매니페스트](../RELEASES/draft/manifest.md))인데, HIS 화면을 찍은 리허설 설치본의 로그인 화면은 **v4.19.0** 을 표기합니다(2026-09-13 확인). 화면의 문구 · 배지는 v4.19.0 의 것이고, 기준 커밋과 달라진 곳이 있을 수 있습니다. 형제 시스템도 설치본 판본이 저장소 표기와 다른 예가 있습니다([ERP](erp.md) — 화면 `v1.9.0` · 저장소 `1.287.3`).

## 읽는 법

- **화면이 "모른다"고 말하는 아홉 가지 방식**을 [개요서 취지 3](../overview/02-principles.md#화면이-모른다고-말하는-아홉-가지-방식)에 표로 모았습니다. 표본이 없어서 · 재지 않아서 · 권한이 없어서 · 계측이 없어서 · 관측 범위 밖이라서 · 조회에 한계가 있어서 · 아직 연결되지 않아서 · 값을 알 수 없어서 — 같은 "0" 이라도 화면이 다르게 말합니다.
- **화면이 있다는 것과 실운영에서 검증됐다는 것은 다릅니다.** 이 장들은 "무엇이 있는가"를 보여 줍니다. 시스템 사이 연결이 실제로 동작하는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 따로 봅니다(**`검증됨` 12** — HIS → sign 직원 서명 · HIS → LIS 검사 오더 · LIS → HIS 환자 조회 · 검사 결과 · 오더 취소 · HIS → ERP 직원 SSO · HIS ⇄ edu 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록 · 2026-09-14~15).
- **메뉴 이름 · 기본 사용 역할은 코드 기본값**입니다. 기관 관리자가 메뉴 관리 화면에서 숨기거나 바꾸거나 더할 수 있습니다.
- **AI 가 나오는 화면**은 AI 표기(`AI(WeRU.B)`)와 면책 문구가 함께 보입니다. AI 는 초안과 제안을 만들 뿐이고, **사람이 승인해야 정본(진료기록)이 됩니다.**
- 화면에 보이는 데이터는 모두 **가상 병원 데이터**입니다. 실존 기관 · 환자 · 직원과 관계가 없습니다.

## 캡처가 들어오는 순서

1. **시나리오에 걸린 화면 52개** — 네 편의 [데모 시나리오](../scenarios/)가 "화면 캡처 자리"로 지목한 화면입니다(**44개 채움** — ✅ 36 · 🟡 8 · 응급 편은 9/9 · 2026-09-13). 남은 8개는 모두 AI 를 켠 설치본 · 환자 앱 빌드 · 데모 병원명 확정 · 화상 시스템 재구성을 기다립니다. 이야기가 이미 붙어 있어 먼저 넣습니다.
2. **도메인 대표 화면** — 각 장의 도메인마다 대표 화면 몇 개.
3. **나머지 전체** — [목록](../assets/screens/INDEX.md)의 ⬜ 을 채웁니다.

캡처를 넣는 규칙(가릴 것 · 파일 이름 · 대장 등록)은 [캡처 안내](../assets/screens/README.md)에 있습니다. **이미지는 글자 검사기가 볼 수 없으므로, 사람이 확인해 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 `확인` 을 표시한 것만 공개합니다.**
