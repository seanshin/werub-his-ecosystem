# 검사 결과 검증 — 입력자와 검증자

**Result verification — the person who entered it cannot verify it**

> **EN** — Laboratory results are auto-verified against reference ranges and delta checks, then confirmed by a second person. Two things are blocked by design: a result whose reference range or unit is missing cannot be auto-finalised, and **the person who entered a result cannot be the one who verifies it**. The reason is that a check performed by the same pair of eyes is not a check. Sits on judgment rules ③ (a guard is only a guard if it fails when a defect is re-injected) and ④ (if something is blocked, the block must be recorded on the server).

## 1. 무엇을 하나

검사 결과가 나오면 **자동 검증**(참고치 · 델타 체크)이 먼저 돌고, 그다음 사람이 **2차 검증**을 합니다. 확정된 결과만 HIS 로 나갑니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 입력 | 장비 결과 파일 또는 수기 입력 |
| 판정 | 참고치 · 델타 체크로 자동 판정. **참고치가 없거나 단위가 맞지 않으면 자동 확정을 막습니다** |
| 확인 | 2차 검증. 🔴 **입력자와 검증자가 같으면 검증을 막습니다** |
| 기록 | 1차 · 2차 검증자가 각각 남습니다 |
| 예외 | 자동 확정이 막힌 건은 사람이 보고 처리합니다 — 조용히 통과하지 않습니다 |

## 3. 🔴 왜 그렇게 만들었나

- **같은 눈이 두 번 보는 것은 확인이 아닙니다.** 입력자와 검증자를 나누지 않으면 2차 검증이라는 절차 자체가 형식이 됩니다.
- **비교 기준이 없는 값은 판정할 수 없습니다.** 참고치나 단위가 없는데 자동으로 확정하면, 시스템이 **모르는 것을 아는 척하는 것**이 됩니다(판정 규칙 ①).
- 🔵 근거: LIS 구성서 §4 가 이 두 규칙을 명시합니다. 코어 HIS 의 판정 규칙 ③·④ 와 같은 축입니다.

## 4. 🔴 무엇을 막나

- 참고치 · 단위가 없는 결과의 **자동 확정**
- **입력자 = 검증자**인 검증
- 확정되지 않은 결과가 차트로 나가는 것 — HIS 로 회신돼도 **바로 차트에 들어가지 않고 확인 대기**가 됩니다

## 5. 어디서 보나

[LIS 구성서 §4](../../systems/lis.md#4-핵심-기능) · [LIS 화면](../../screens/lis.md) · [임상병리 안내](../../clinicians/laboratory.md) · [연결 상태 표](../../RELEASES/2026.09/compatibility.md)(LIS → HIS 결과 회신은 실제 호출로 확인된 연결에 있습니다 — [따라가 본 결과](../../build-guide/follow-along-2026-09.md))
