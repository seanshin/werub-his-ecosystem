# 동의서 전자서명 — 서명이 끝나야 상태가 바뀐다

**Consent signatures — the state changes only when the signature completes**

> **EN** — A consent form is issued from the chart, signed through the signature service, and the chart state changes only when a **completion notice that verifies** comes back. A notice with a wrong or missing signature does not change anything. The signature itself is sealed with a certificate serial, a timestamp and an integrity proof, so the document can be checked later. Sits on judgment rules ② and ③.

## 1. 무엇을 하나

HIS 화면에서 동의서를 발행하고, [sign](../../systems/sign.md) 에서 서명을 받고, **완료 통지가 검증되면** 차트의 동의 상태가 바뀝니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 발행 | 차트에서 동의서를 만듭니다. 🔴 **문서를 PDF 로 만들지 못하면 서명 요청 자체가 실패**합니다(렌더 서비스가 떠 있어야 합니다) |
| 서명 | 서명 채널로 서명을 받습니다. 본인 확인 수준은 문서 종류에 따라 다릅니다 |
| 통지 | sign 이 HIS 로 완료를 알립니다(서명된 통지) |
| 기록 | 상태가 `완료`로 바뀌고 **참가자 · 인증서 일련번호 · 키 보관 방식 · 검증 주소**가 함께 남습니다 |
| 예외 | 🔴 **서명이 틀리거나 없는 통지는 반영되지 않습니다** |

## 3. 🔴 왜 그렇게 만들었나

- **동의는 「받았다」가 아니라 「증명할 수 있다」여야 합니다.** 나중에 다투게 되는 자리라, 누가·언제·무엇에 서명했고 그 문서가 바뀌지 않았음을 보일 수 있어야 합니다.
- **통지를 그대로 믿으면 안 됩니다.** 완료를 알리는 요청은 누구나 흉내 낼 수 있으므로, **서명을 검증한 통지만** 상태를 바꿉니다(판정 규칙 ③).
- 🔵 근거: HIS 구성서 §4 · sign 구성서 §4 · 개요서 5장.

## 4. 🔴 무엇을 막나

- 위조된 완료 통지로 동의 상태가 바뀌는 것
- PDF 를 만들지 못한 채 서명 요청이 나가는 것
- 서명 사실만 남고 **무엇에 서명했는지**가 남지 않는 것

## 5. 어디서 보나 · 확인된 범위

[sign 구성서](../../systems/sign.md) · [HIS 화면](../../screens/his.md) · [의사 안내](../../clinicians/physician.md) · [간호 안내](../../clinicians/nursing.md)

🔵 **실제 호출로 확인됨** — 새 설치본끼리 서명 요청 · 완료 통지 반영을 확인했고, **위조한 통지가 반영되지 않는 것**까지 확인했습니다([따라가 본 결과](../../build-guide/follow-along-2026-09.md)).
🔴 **화면 경로 하나는 확인하지 못했습니다** — HIS 화면에서 만든 동의서의 **직원 서명**은 끝까지 가지 못했습니다. 두 프로젝트의 협의가 필요합니다.
