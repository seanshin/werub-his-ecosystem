# twin 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [twin 시스템 구성서](../systems/twin.md)
> 계층 AI · 버전 `1.20.88` · 구현 상태 `통합` · 화면 15 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

> **EN** — The digital twin — risk-score cards, SBAR drafts and simulation. It opens from the chart over SMART on FHIR and raises risk cards through CDS Hooks; what it produces is a **draft for a clinician to read**, not a decision. Two screens are captured: the twin-derived badges on chart metrics, and the operations console showing non-PHI aggregates. Three further slots are **not filled yet**; captures are taken on **synthetic hospital data**, with identifying information masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

디지털 트윈 — 위험 점수 카드 · SBAR 초안 · 시뮬레이션. 차트에서 SMART on FHIR 로 열리고, CDS Hooks 로 위험 카드를 띄웁니다.

## 화면

![twin 환자 차트 — 트윈 파생 배지가 붙은 지표](../assets/screens/twin-patient-chart.png)

차트에서 열리는 환자 화면입니다. 위에 **NEWS2 · 위험 점수 · eGFR** 이 배지로 서고, 탭으로 문제목록 · 활력 · 검사 · 위험평가 · 투약 · 영상 · 경과·추세 · **트윈시각화** · 의사결정지원 · 인계 · 감사로 나뉩니다.

**어느 카드가 twin 이 만든 것인지 배지로 구분합니다** — 임상 인사이트와 추천 액션에 **`◇ 트윈 파생`** 이 붙고, 그 아래 한 줄이 성격을 못 박습니다.

> **규칙기반 파생 · 임상 판단 보조**

추천 액션도 지시가 아니라 검토 제안으로 적힙니다(예: 지질 관리 — ASCVD 중등도 · 스타틴-LDL 관리 **검토**). 오른쪽 위 `의무기록 차트` 로 HIS 로 돌아갑니다.

![twin 운영 콘솔 — 비PHI 집계](../assets/screens/twin-ops-console.png)

같은 시스템의 **운영 콘솔**은 성격이 다릅니다. 머리에 **`운영 모드 · 비PHI 집계`** 라고 적혀 있고, **환자가 이름 없이 식별자로만** 나옵니다. 고위험 환자 알림과 **기기 점검·위험 알림**(인공호흡기 · CT · MRI · 제세동기 · 수술테이블 …)이 함께 서고, 건마다 `확인` · `해결` 로 닫습니다.

> 환자 차트(개인건강정보)와 운영 콘솔(집계)을 **화면 단위로 나눠 둔 것**이 이 시스템의 설계입니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 twin-1 | 환자 위험 점수 카드 | `twin-risk-card.png` | ⬜ |
| 📷 twin-2 | SBAR 초안과 "차트 저장" | `twin-sbar.png` | ⬜ |
| 📷 twin-3 | 차트에서 연 twin(SMART on FHIR) | `twin-smart-launch.png` | ⬜ |

## 알아 둘 것

**의료진이 "차트 저장"을 눌러야 HIS 에 저장됩니다.** AI 설명 초안에는 `machine-generated` 표시가 붙습니다. twin 은 안전 등급 분류 예비 단계입니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — 어떤 연결이 `검증됨` 이고 언제 확인했는지는 그 표의 **상태 칸 · 확인일 칸**에 있습니다(합계도 그 표 한 곳에만 둡니다). 나머지 `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.
- 설치 요구사항 · 주요 설정 · 한계는 [twin 시스템 구성서](../systems/twin.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
