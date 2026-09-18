# 수혈 안전 — 독립 판정과 동의 게이트

**Transfusion safety — an independent ABO check and a consent gate**

> **EN** — Crossmatching is auto-judged, but an ABO mismatch is stopped by a **separate, independent check** rather than by the same logic that produced the result. Release additionally requires the consent state to be confirmed, and administration requires two people. Where the consent check could not be completed end to end in the follow-along, the system does **not** let release pass automatically — it waits. Sits on judgment rules ③ and ④.

## 1. 무엇을 하나

혈액형·항체 검사 → 입고·유효기간 → **교차시험 자동 판정** → 출고(동의 상태 확인) → 시행(2인 확인) → 부작용 조사.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 판정 | 교차시험을 자동 판정합니다 |
| 🔴 독립 판정 | **ABO 부적합은 별도의 독립 판정이 막습니다** — 결과를 낸 것과 같은 논리가 스스로를 검사하지 않습니다 |
| 출고 | 🔴 **동의 상태를 확인**합니다. 확인되지 않으면 **대기**로 두고 자동 통과시키지 않습니다 |
| 시행 | **2인 확인**이 필요합니다 |
| 기록 | 시행자와 확인자가 각각 남고, 부작용 조사가 이어집니다 |

## 3. 🔴 왜 그렇게 만들었나

- **자기가 낸 결과를 자기가 검사하면 같은 실수를 두 번 합니다.** 그래서 ABO 부적합은 **독립 판정**이 따로 막습니다(판정 규칙 ③ — 가드는 결함을 재주입해 실패해야 가드다).
- **동의는 사후에 확인할 수 없는 것**입니다. 출고 뒤에 동의가 없었음을 알게 되면 되돌릴 수 없습니다 — 그래서 **게이트**로 둡니다.
- 🔵 근거: LIS 구성서 §4 「교차시험 자동 판정 → ABO 부적합을 막는 독립 판정 → 출고(동의 상태 확인) → 시행(2인 확인)」.

## 4. 🔴 무엇을 막나

- ABO 부적합 출고
- **동의가 확인되지 않은 출고의 자동 통과**
- 1인 시행

## 5. 어디서 보나 · 확인된 범위

[LIS 구성서 §4](../../systems/lis.md#4-핵심-기능) · [임상병리 안내](../../clinicians/laboratory.md)

🔴 **확인하지 못한 것** — LIS 화면이 HIS 의 수혈 동의 상태를 **자동으로 확인**하는 구간은 따라가기에서 끝까지 가지 못했습니다. 개시 전까지 **사람이 동의를 확인하는 절차를 유지**합니다(확인되지 않으면 자동 통과되지 않으므로, 절차를 유지하면 안전 쪽으로 닫힙니다). → [따라가 본 결과](../../build-guide/follow-along-2026-09.md)
