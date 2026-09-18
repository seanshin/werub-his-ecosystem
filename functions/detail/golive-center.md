# 개시 전환 — 사람이 마음대로 완료로 찍지 못한다

**Go-live — items the system can judge cannot be ticked by a person**

> **EN** — Go-live readiness is not a paper checklist. Where the system can determine an item itself, a person is **not** allowed to mark it complete; where an item requires evidence, it cannot be completed without the attachment. The whole transition — checklist, keys, execution — happens on one screen so that a half-finished state is visible rather than remembered. Sits on judgment rules ④ and ⑨.

## 1. 무엇을 하나

개시(Go-Live) 준비를 체크리스트 · 개시 키 · 전환 실행으로 나누어 **한 화면**에서 합니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 판정 | 항목마다 **시스템이 판정할 수 있는 것**과 **사람이 기록할 것**이 갈립니다 |
| 제약 | 🔴 시스템이 판정할 수 있는 항목은 **사람이 완료로 찍지 못합니다** |
| 근거 | 🔴 근거가 필요한 항목은 **첨부 문서 없이 완료할 수 없습니다** |
| 전환 | 게이트를 다 채운 뒤 전환을 실행합니다 |
| 기록 | 무엇이 언제 어떤 근거로 완료됐는지 남습니다 |

## 3. 🔴 왜 그렇게 만들었나

- **체크리스트는 채우라고 있는 것이 아니라 막으라고 있는 것입니다.** 사람이 아무 항목이나 완료로 찍을 수 있으면, 그 목록은 개시를 막지 못하고 개시했다는 기록만 남깁니다.
- **근거 없는 완료는 완료가 아닙니다.** 첨부를 요구하는 것은 형식이 아니라, 나중에 「그때 무엇을 보고 그렇게 판단했나」를 되짚기 위한 것입니다.
- 🔵 근거: LIS 구성서 §4 「시스템이 판정할 수 있는 항목은 사람이 완료로 찍지 못하고, 근거가 필요한 항목은 첨부 문서 없이 완료할 수 없습니다」.

## 4. 🔴 무엇을 막나

- 시스템이 판정할 수 있는 항목을 **사람이 임의로 완료 처리**하는 것
- 근거 없이 완료로 넘어가는 것
- 준비가 덜 된 채 전환하는 것

## 5. 어디서 보나

[체크리스트](../../checklist/) (개원 · Go-Live · 결정) · [S8 리얼 전환](../../build-guide/S8-go-real.md) · [LIS 구성서 §4](../../systems/lis.md#4-핵심-기능)

🔴 **따라가기에서 리얼 전환 자체는 실행하지 않았습니다** — 전환이 **어떻게 판정되는지**는 코드로 확인했고, 「실제로 전환하면 무엇이 일어나는가」는 남아 있습니다.
