# 주요 기능 — 자세히

**Key features in detail**

> **EN** — One page per feature, written to a fixed five-part frame: what it does, how it actually runs (input → decision → record → exception), **why it was built that way**, **what it deliberately blocks**, and where to look. Written first for the features that touch patient safety. Where a design rationale could not be found in the code or release records, the page says so instead of inventing one. Status is linked, never restated.

> 🟡 **초안** · 🔴 **아직 다 쓰지 않았습니다** — 환자안전에 닿는 것부터 씁니다. 빈 틀을 미리 만들어 두지 않습니다.
> 업무로 찾으려면 → [업무별 기능 지도](../README.md) · 진료하는 사람은 → [진료하는 사람을 위한 안내](../../clinicians/)

## 이 글들의 틀

| 절 | 무엇 |
|---|---|
| 1. 무엇을 하나 | 한 문단 |
| 2. 어떻게 도나 | 입력 → 판정 → 기록 → 예외 |
| 3. 🔴 **왜 그렇게 만들었나** | 설계 이유. **기록에서 찾지 못하면 그렇게 적습니다** |
| 4. 🔴 **무엇을 막나** | 가드 — 이 생태계의 성격이 여기서 드러납니다 |
| 5. 어디서 보나 | 화면 · 구성서 · 연결 표 · 체크리스트 |

「왜」의 정본은 코어 HIS 의 [판정 규칙 아홉](../../DESIGN-HISTORY.md#거기서-나온-판정-규칙-아홉-가지)입니다. 각 글은 그중 어느 규칙에 서 있는지 밝힙니다.

## 지금 쓴 것

| 기능 | 어느 규칙 위에 | 상태 |
|---|---|---|
| [검사 결과 검증 — 입력자와 검증자](result-verification.md) | ③ 가드 · ④ 게이트 | [연결 표](../../RELEASES/2026.09/compatibility.md) |
| [위험치 폐루프 — 통보에서 복창까지](critical-value.md) | ④ 게이트 · ⑦ 수치 | 같음 |
| [수혈 안전 — 독립 판정과 동의 게이트](transfusion-safety.md) | ③ 가드 · ④ 게이트 | 같음 |
| [오더 서명 봉인 — 나중에 부정되지 않게](order-signature.md) | ② 정본 · ③ 가드 | 같음 |
| [AI 초안 승인 — 승인해야 기록이 된다](ai-draft-approval.md) | ① 정직성 · ⑥ 사람 결정 | 같음 |
| [분모 없는 비율을 내지 않는다](no-ratio-without-denominator.md) | ① 정직성 · ⑦ 수치 | 같음 |
| [동의서 전자서명 — 서명이 끝나야 상태가 바뀐다](consent-signature.md) | ② 정본 · ③ 가드 | 같음 |
| [연동 개통 게이트 — 스위치 하나로 열지 않는다](integration-gate.md) | ④ 게이트 · ⑥ 사람 결정 | 같음 |
| [개시 전환 — 사람이 마음대로 완료로 찍지 못한다](golive-center.md) | ④ 게이트 · ⑨ 실측 | 같음 |
| [유전체 이차 소견 — 건수조차 보여 주지 않는다](secondary-findings-gate.md) | ① 정직성 | 같음 |
| [검사코드 카탈로그 반입 — 코드가 맞지 않으면 흐르지 않는다](lab-code-catalog.md) | ② 정본 | 같음 |

## 아직 쓰지 않은 것

DUR 차단·경고 · 병리 2단계 사인아웃 · 비상 열람 · 마약류 수불 원장 · 영상 판독 서명 · 환자 영상 내보내기 — 🔴 **빈 틀을 만들지 않고, 쓸 때 만듭니다.**

🔴 **일부러 미루는 것도 있습니다** — 기능을 자세히 쓰다 보면 시스템 담당의 확인을 기다리는 사항과 같은 자리를 지나갑니다. 그런 편은 **회신 뒤에** 쓰는 편이 정확합니다.
