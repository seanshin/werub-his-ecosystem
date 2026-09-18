# 위험치 폐루프 — 통보에서 복창까지

**Critical values — the loop closes only when the read-back is recorded**

> **EN** — When a laboratory result crosses a critical threshold, notification alone does not close the case: the loop is escalation and a recorded **read-back** from the person who received it. Until that is recorded the item stays open. The reason is that a notification that nobody confirmed is indistinguishable from one that never arrived. Sits on judgment rules ④ (a block must leave a server-side record) and ⑦ (numbers carry their denominator; a count of zero is not safety).

## 1. 무엇을 하나

위험치(critical value)가 나오면 **통보 → 상향 → 복창 기록**까지 닫아야 완료됩니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 판정 | 결과가 위험치 기준을 넘으면 표시됩니다 |
| 통보 | 담당에게 알립니다 |
| 상향 | 받지 않으면 위로 올립니다 |
| 기록 | 🔴 **복창(read-back)을 기록해야 닫힙니다** |
| 예외 | 닫히지 않은 건은 열린 채로 남습니다 — 목록에서 사라지지 않습니다 |

## 3. 🔴 왜 그렇게 만들었나

- **받았는지 모르는 통보는 하지 않은 것과 구분되지 않습니다.** 보낸 기록만 남기면 「보냈다」는 사실만 증명되고 환자에게 닿았는지는 증명되지 않습니다.
- 그래서 **복창이 기록될 때까지 닫지 않습니다.** 이것이 판정 규칙 ④(막는다면 그 기록이 서버에 남아야 한다)의 모양입니다.
- 🔵 근거: LIS 구성서 §4 「위험치 폐루프(통보 · 상향 · 복창 기록)」.

## 4. 🔴 무엇을 막나

- **복창 없이 닫는 것**
- 통보 건수만으로 「처리됐다」고 읽히는 것 — 열린 건은 계속 보입니다

## 5. 어디서 보나

[LIS 구성서 §4](../../systems/lis.md#4-핵심-기능) · [LIS 화면](../../screens/lis.md) · [임상병리 안내](../../clinicians/laboratory.md)
