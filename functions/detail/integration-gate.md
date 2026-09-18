# 연동 개통 게이트 — 스위치 하나로 열지 않는다

**Opening an integration is a gate, not a switch**

> **EN** — Turning on a link between systems is not a configuration toggle. The product models it as a set of gates that must each be satisfied and recorded — a policy approval, a protocol approval by the owning department (two people), and credentials issued by security — and only then does the configuration turn on. During rehearsal the gates may be filled with development seed records; the screen shows that with a badge and requires replacement before go-live. Sits on judgment rules ④ and ⑥.

## 1. 무엇을 하나

시스템 사이의 연결을 **결재와 게이트로** 엽니다. 게이트를 다 채워야 설정이 켜집니다.

## 2. 어떻게 도나

예 — 검사 반사(Reflex) 양방향 오더는 게이트 셋을 채워야 열립니다.

| 게이트 | 누가 | 무엇 |
|---|---|---|
| A-1 | 진료부 · 원무 | 수용 · 청구 정책 결재 |
| A-2 | 진단검사의학과 | 프로토콜 승인권자 지정 + **실 프로토콜 정식 승인(4-eyes)** |
| A-3 | 보안팀 | 상대 시스템에 쓰기 권한 자격증명 발급 |

🔴 **리허설에서는 게이트가 「개발 시드」 근거로 채워져 있을 수 있습니다.** 화면이 그것을 **배지로 드러내고** 「실운영 전 실제 결재로 교체 필요」라고 적으며, 교체 절차(개통 중지 → 게이트별 회수 → 실결재 기록 → 재개통)를 함께 둡니다.

## 3. 🔴 왜 그렇게 만들었나

- **연결을 켜는 것은 기술 결정이 아니라 조직 결정입니다.** 누가 책임지고 받아들이기로 했는지가 없으면, 나중에 사고가 났을 때 되짚을 자리가 없습니다.
- **「켰다」는 사실만으로는 부족합니다.** 무엇을 근거로 켰는지가 남아야 합니다(판정 규칙 ④ — 막는다면 그 기록이 서버에 남아야 한다).
- **시드로 채운 것과 실제 결재를 구분하지 않으면** 리허설 상태 그대로 개시하게 됩니다. 그래서 화면이 배지로 드러냅니다.
- 🔵 근거: [연동 계약 지도 §2](../../integration/README.md) · HIS 연동 개통 게이트 화면.

## 4. 🔴 무엇을 막나

- 설정 한 줄로 연결이 열리는 것
- 한 사람이 프로토콜을 승인하는 것(4-eyes)
- **개발 시드 근거로 개시하는 것**

## 5. 어디서 보나

[연동 계약 지도](../../integration/README.md) · [HIS 화면 — 연동 개통 게이트](../../screens/his.md) · [구축 가이드](../../build-guide/)
