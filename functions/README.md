# 업무별 기능 지도

**What this ecosystem does — by the work, not by the system**

> **EN** — The system briefs describe features **system by system**; this page turns that sideways and lists them **by the work a hospital actually does** — outpatient care, ward nursing, surgery, emergency, laboratory, imaging, pharmacy, billing, infection control and quality, management, education, research, and system operations. Each row names the systems that carry that work, its main features, its current status (linked, never restated), and where to look: the screens, the system brief section, and the connection table. Nothing new is asserted here — it re-threads what the briefs already say.

> 🟡 **초안** — 시스템 담당의 확인 전입니다. 🔴 **상태는 여기서 말하지 않고 링크합니다** — 정본은 [연결 상태 표](../RELEASES/2026.09/compatibility.md)입니다.
> 기능의 자세한 내용은 각 [시스템 구성서](../systems/) §4 에 있습니다. 이 문서는 **그것을 업무로 다시 꿴 것**입니다.

## 왜 이 문서가 있나

기능은 지금까지 **시스템별로만** 적혀 있었습니다. 그래서 「우리 검사실이 쓸 기능은?」 · 「응급에서 무엇이 돌아가나?」를 알려면 구성서 13장을 다 열어야 했습니다. 이 문서는 **업무에서 시작해 시스템으로 가는 길**입니다.

진료하는 사람이 자기 일부터 보려면 → **[진료하는 사람을 위한 안내](../clinicians/)**

---

## 1. 환자를 보는 일

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **외래 진료** | HIS(진료 45항목) · AI Server · cerno · twin | 접수 · 진료 · 오더 · 처방 · 기록(음성·대화 **초안**) · 근거 질의 · 위험 점수 카드 | [HIS §4](../systems/his.md#4-핵심-기능) · [화면](../screens/his.md) · [의사 안내](../clinicians/physician.md) |
| **입원 · 병동 간호** | HIS · Clinic | 입퇴원 · 활력 · 조기경고 · **투약 시행(바코드 대조 · 2인 확인)** · 인수인계 · 병동 동선 | [투약](detail/medication-administration.md) · [HIS §4](../systems/his.md#4-핵심-기능) · [Clinic §4](../systems/clinic.md#4-핵심-기능) · [간호 안내](../clinicians/nursing.md) |
| **수술 · 마취 · 중환자** | HIS(수술/중환자 6묶음) | 수술 일정 · 기록 · 중환자 관리 · **세 단계 체크리스트 · 좌우 판정 · 계수 대조** | [수술 안전](detail/surgery-safety.md) · [HIS 메뉴](../systems/his-domains.md) · [화면](../screens/his.md) |
| **응급** | HIS | 응급 접수 · 분류(triage) 보조 · 응급 처분 결정 | [응급 시나리오](../scenarios/02-emergency.md) |
| **환자 접점** | 공개 홈페이지 · 환자 앱 · HIS 포털 | 예약 · 결과 열람 · 동의 · 문진 · 검진 프로그램 안내 | [홈페이지 §4](../systems/homepage.md#4-핵심-기능) · [환자 앱 §4](../systems/patient-app.md#4-핵심-기능) |

## 2. 검사하고 찍는 일

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **진단검사** | LIS · HIS | 처방 수신 → 접수·라벨 → **검체(품질 등급 · 거부 사유)** → 결과 → **자동 검증·델타 체크** → 2차 검증 → **위험치 폐루프** → 회신 → 청구 캡처 | [검체](detail/specimen-lifecycle.md) · [LIS §4](../systems/lis.md#4-핵심-기능) · [화면](../screens/lis.md) · [임상병리 안내](../clinicians/laboratory.md) |
| **미생물 · 감염** | LIS | 배양 · 감수성(전문가 규칙) · 다제내성균 판정 · 법정감염병 **신고 기록** · 누적 감수성 통계 | [LIS §4](../systems/lis.md#4-핵심-기능) |
| **병리** | LIS · PACS | 그로싱 · 블록 · 슬라이드 · **2단계 사인아웃** · 슬라이드 영상 조회 | [LIS §4](../systems/lis.md#4-핵심-기능) · [연결 표](../RELEASES/2026.09/compatibility.md) |
| **수혈** | LIS | 혈액형·항체 · 교차시험 **독립 판정** · 출고 전 동의 확인 · 시행 2인 확인 · 부작용 조사 | [LIS §4](../systems/lis.md#4-핵심-기능) |
| **유전체 · NGS** | LIS | 동의 → 시퀀싱 → ACMG 큐레이션 → **이차 소견 동의 게이트** → 보고서 서명 | [LIS §4](../systems/lis.md#4-핵심-기능) |
| **영상** | PACS · HIS · AI Server | 촬영 목록(MWL) · 저장 · **판독 워크플로** · 웹 뷰어 · 판독 보조 **초안** · 조영제 동의 | [PACS §4](../systems/pacs.md#4-핵심-기능) · [화면](../screens/pacs.md) · [영상 안내](../clinicians/radiology.md) |

## 3. 약과 물류

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **약제** | HIS · AI Server · ERP | 처방 검토 · **상호작용·DUR(차단/경고 구분)** · 조제 · 복약 설명 **초안** · 마약류 수불 해시 원장 · 보험코드 매핑 | [약제 안내](../clinicians/pharmacy.md) · [AI Server §4](../systems/ai-server.md#4-핵심-기능) |
| **구매 · 자재** | ERP | 구매 · 재고 · 자산 | [ERP §4](../systems/erp.md#4-핵심-기능) |

## 4. 돈과 운영

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **원무 · 수납 · 청구** | HIS · ERP | 수납 · 진료비 계산서 · 청구 라인 · 미청구 · 보험청구 · 검진권 정산 | [ERP §4](../systems/erp.md#4-핵심-기능) · [연결 표](../RELEASES/2026.09/compatibility.md) |
| **경영 · 회계 · 인사** | ERP · Clinic | 재무회계 · 원가 · 경영분석 · 인사·급여 · 결재 · 근태 | [ERP §4](../systems/erp.md#4-핵심-기능) |
| **직원 셀프서비스** | HIS ⇄ ERP | 급여명세 · 연차 · 증명서 · 당직 | [연결 표](../RELEASES/2026.09/compatibility.md) |

## 5. 질 · 안전 · 신뢰

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **환자안전 · 질 지표** | HIS | 안전 사건 · 질 지표 · 감염관리 · **안전 게이트(끔 · 경고 · 차단)**. 🔴 표본이 없으면 **비율을 내지 않습니다** | [안전 게이트](detail/safety-gates.md) · [감염관리](detail/infection-control.md) · [개요서 2장](../overview/02-principles.md#화면이-모른다고-말하는-아홉-가지-방식) |
| **전자서명 · 위변조 증거** | sign | 자체 PKI · 타임스탬프 · PAdES-LTA · 감사 이벤트 **봉인** · 검증 주소 | [sign §4](../systems/sign.md#4-핵심-기능) |
| **감사 · 기록 보존** | 전 시스템 | 해시체인 · 변경 차단 · 보존 기간 정책 · 비상 열람 기록 | [비상 열람](detail/emergency-access.md) · 🔴 [보유·파기](detail/retention.md)(세기만 합니다) · [개요서 5장](../overview/05-identity-trust-standards.md) |
| **의무기록 완결도** | HIS | 퇴원요약 · 미서명 진료·간호기록 · 🔴 **상병 미입력** 을 기한과 함께 세고 책임자에게 독촉 | [미비기록](detail/incomplete-records.md) · [화면](../screens/his.md) |
| **신원 · 권한** | HIS(신원 허브) | 토큰 발급 · 형제 시스템 검증(공개키 5 · 공유 비밀 2 · API 키 1) · 역할 · 단계 상승 | [신원 허브 도식](../diagrams/identity-hub.md) |

## 6. AI

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **진료 보조** | AI Server · HIS | 분류 보조 · 기록 초안 · 설명 초안 · 요약 · 번역 | [개요서 6장](../overview/06-ai.md) |
| **근거 질의(RAG)** | AI Server · cerno | 근거 검색 · **근거가 없으면 생성하지 않음** · 안전 신호 | [cerno §4](../systems/cerno.md#4-핵심-기능) |
| **위험 예측 · 시뮬레이션** | twin | 위험 점수 카드 · What-if · SBAR · 차트 반영(의료진 승인) | [twin §4](../systems/twin.md#4-핵심-기능) |
| **음성 인식** | AI Server · HIS | 실시간 전사 · 앰비언트 스크라이브 | [AI Server §4](../systems/ai-server.md#4-핵심-기능) |

🔴 **AI 는 모두 보조이고 초안까지입니다.** 사람이 승인해야 기록이 됩니다 → [진료하는 사람을 위한 안내 §2](../clinicians/README.md#2-ai-가-하는-일과-하지-않는-일)

## 7. 사람과 조직

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **교육 · 법정교육** | edu · sign | 과정 · 이수 · **전자 이수증 봉인** · 미이수 독촉 | [edu §4](../systems/edu.md#4-핵심-기능) |
| **협업 · 결재** | Clinic | 인수인계 · 알림 · 채널 · 전자결재(W.Sign) · 근무표 | [Clinic §4](../systems/clinic.md#4-핵심-기능) |
| **원격 상담** | Jitsi | 화상 진료 · 녹화 — 🔴 현재 설치본 `중단` | [Jitsi 구성서](../systems/jitsi.md) |

## 8. 세우고 지키는 일

| 업무 | 맡는 시스템 | 대표 기능 | 어디서 보나 |
|---|---|---|---|
| **개원 · 개시 준비** | HIS · LIS | 개원 체크리스트 · Go-Live 게이트 · **개시 전환 센터** · 연동 개통 게이트(조직 결재) | [체크리스트](../checklist/) · [구축 가이드](../build-guide/) |
| **시스템 관리** | HIS(87항목) | 직원 · 권한 · 설정 · 외부 연동 · 코드 마스터 반입 | [HIS 메뉴](../systems/his-domains.md) |
| **운영 감시** | 전 시스템 | 연계 감시 · 실패 대기열 · 재적재 · 지표 | [구성서 §4 · §10](../systems/) |

---

## 9. 무엇이 먼저이고, 못 쓰면 어떻게 하나

기능을 켜려면 **먼저 있어야 하는 것**이 있고, 못 쓸 때 **대신할 것**이 있습니다.

→ **[전제와 파급](dependencies.md)** — 🔴 한계에는 반드시 대체 수단을 붙였습니다.

## 10. 기능 하나를 자세히 보려면

주요 기능은 **한 편씩 따로** 적었습니다 — 무엇을 하나 · 어떻게 도나 · 🔴 **왜 그렇게 만들었나** · 🔴 **무엇을 막나** · 어디서 보나.

→ **[주요 기능 — 자세히](detail/)** (환자안전에 닿는 것부터 · 🔴 아직 다 쓰지 않았습니다)

## 11. 왜 이런 구성인가

시스템마다 **무엇을 골랐고 그래서 무엇을 포기했는지**를 짝지어 적었습니다 — 지금의 한계가 사고가 아니라 **값을 치른 결과**라는 것이 거기서 보입니다.

→ **[형제 시스템은 어떻게 자랐나 §5](../DESIGN-HISTORY-SYSTEMS.md#5-시스템마다-무엇을-정하고-무엇을-포기했나)** · 코어 HIS 는 [판정 규칙 아홉](../DESIGN-HISTORY.md#거기서-나온-판정-규칙-아홉-가지)

## 12. 낱말로 찾기

찾는 낱말이 있으면 → **[찾아보기](find.md)**. 낱말의 **뜻**은 [용어집](../glossary.md)에 있고, 찾아보기는 **그 기능이 어디 적혀 있는지**를 가리킵니다.

## 13. 이 지도를 읽을 때

- 🔴 **여기 있다고 「동작한다」는 뜻이 아닙니다.** 상태는 [연결 상태 표](../RELEASES/2026.09/compatibility.md)와 각 구성서 §7 이 정본이고, 실제로 불러 확인한 것은 [따라가 본 결과](../build-guide/follow-along-2026-09.md)에 있습니다.
- **기관마다 켜 둔 것이 다릅니다.** 특히 AI 는 기관 결정으로 하나씩 켭니다([S6](../build-guide/S6-ai.md)).
- **안 되는 것**은 각 구성서 §10(한계와 대체 수단)과 [진료하는 사람을 위한 안내 §6](../clinicians/README.md#6-아직-안-되는-것과-그때-하는-일)에 모았습니다.
