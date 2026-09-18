# 오더 서명 봉인 — 나중에 부정되지 않게

**Order signature sealing — so it cannot be denied later**

> **EN** — Order and prescription signature logs are chained by hash and anchored with an external time source, so that "this was ordered, then, in this form" can be shown later without trusting the hospital's own clock or database alone. Tampering shows up as a broken chain. This path was verified by real calls between fresh installs, including a deliberately corrupted entry being detected. Sits on judgment rules ② (what is produced and what every consumer uses are different things) and ③.

## 1. 무엇을 하나

오더 · 처방의 서명 로그를 **해시로 이어 붙이고**, 외부 시점 증거(TSA)로 **봉인**합니다. 나중에 「그때 그렇게 냈다」를 증명할 수 있고, 중간에 고치면 사슬이 끊어져 드러납니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 입력 | 의사가 오더 · 처방에 서명합니다 |
| 기록 | 서명 로그가 **앞 기록의 해시를 물고** 이어집니다 |
| 봉인 | 감사 이벤트를 [sign](../../systems/sign.md) 의 스트림에 앵커로 남깁니다(외부 시점 증거) |
| 검증 | 사슬을 다시 계산해 **변조를 탐지**합니다 |
| 예외 | 시각을 신뢰할 수 없으면 🔴 **추정 시각을 원장에 박지 않습니다** |

## 3. 🔴 왜 그렇게 만들었나

- **자기 데이터베이스만으로는 자기를 증명할 수 없습니다.** 병원이 스스로 보관한 기록은, 그 병원이 고칠 수 있는 기록이기도 합니다. 그래서 **외부 시점 증거**를 함께 남깁니다.
- **고친 사실이 드러나야 합니다.** 해시 사슬은 지우거나 고치면 다음 고리가 맞지 않아 **조용한 수정이 불가능**해집니다.
- 🔵 근거: 개요서 5장(신뢰의 사슬) · sign 구성서 §4 · HIS 구성서 §4.

## 4. 🔴 무엇을 막나

- 기록의 **조용한 수정**
- 시각을 모르는데 **추정으로 채우는 것**
- 「보냈다」와 「봉인됐다」를 같은 말로 쓰는 것

## 5. 어디서 보나 · 확인된 범위

[sign 구성서](../../systems/sign.md) · [신뢰의 사슬 도식](../../diagrams/trust-chain.md) · [의사 안내](../../clinicians/physician.md)

🔵 **실제 호출로 확인됨** — 새 설치본끼리 오더 서명 로그 봉인과 **변조 탐지**를 확인했습니다(확인일은 [연결 상태 표](../../RELEASES/2026.09/compatibility.md)).
