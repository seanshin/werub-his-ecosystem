# 검사코드 카탈로그 반입 — 코드가 맞지 않으면 아무것도 흐르지 않는다

**Importing the test-code catalogue — nothing flows until the codes line up**

> **EN** — The HIS is the source of truth for test codes; the laboratory imports that catalogue and maps it to its own codes. This sounds like setup trivia and is in fact the first thing that stops an installation: in the follow-along, only **3 of the 15** seeded HIS test codes existed in the laboratory's default mapping. Import supports full and incremental modes, and a changed key makes the import fail loudly rather than silently importing nothing. Sits on judgment rule ② — the source of truth and what every consumer uses are different things.

## 1. 무엇을 하나

HIS 의 검사 코드 카탈로그를 LIS 가 **반입**하고, 자기 코드와 **매핑**합니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 반입 | 전량 또는 증분으로 받아옵니다 |
| 매핑 | HIS 코드 ↔ LIS 코드를 잇습니다 |
| 확인 | 매핑이 얼마나 덮는지(커버리지)를 봅니다 |
| 예외 | 🔴 연동 키가 바뀌면 **실패로 알립니다** — 조용히 0건을 반입하지 않습니다 |

## 3. 🔴 왜 그렇게 만들었나

- **정본이 있어도 소비처가 쓰지 않으면 소용이 없습니다**(판정 규칙 ②). 코드가 HIS 에 있다는 것과 LIS 가 그 코드를 안다는 것은 다른 일입니다.
- **조용한 실패가 가장 위험합니다.** 키가 틀렸을 때 0건을 반입하고 성공으로 끝내면, 며칠 뒤 「검사가 안 붙는다」로 나타납니다. 그래서 **실패를 실패로** 알립니다.

## 4. 🔴 무엇을 막나

- 매핑 없는 검사가 조용히 흐르는 것
- 키 오류를 성공으로 처리하는 것

## 5. 어디서 보나 · 🔴 개시 전에 반드시

[LIS 구성서 §4](../../systems/lis.md#4-핵심-기능) · [S3](../../build-guide/S3-clinical-departments.md) · [임상병리 안내](../../clinicians/laboratory.md)

🔵 **실제 호출로 확인됨**(전량 · 증분 · 키 변경 시 실패 알림).
🔴 **따라가기에서 실제로 걸린 곳** — HIS 기본 시드의 검사 코드 **15개 가운데 LIS 기본 매핑에 있던 것은 3개**였습니다. **개시 전에 카탈로그 반입과 코드 매핑을 먼저 끝내십시오.**
