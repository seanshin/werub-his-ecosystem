# AI 초안 승인 — 승인해야 기록이 된다

**AI drafts — nothing becomes a record until a person approves it**

> **EN** — Every AI output in this ecosystem is a draft. It becomes part of the medical record only when a person approves it, and the ledger keeps generation, approval, modification and rejection separately — so "approved as-is" and "edited then approved" are distinguishable afterwards. AI-initiated lookups that name a patient are audited. When the AI server is unavailable the screen says "fallback" or "cannot compute" rather than leaving the field blank. Sits on judgment rules ① (do not pretend to know) and ⑥ (outbound and human decisions are layered and cannot be substituted downward).

## 1. 무엇을 하나

AI 가 만든 것은 **초안**입니다. 사람이 승인해야 진료기록이 되고, **생성 → 승인 · 수정 · 거부**가 원장에 남습니다.

## 2. 어떻게 도나

| 단계 | 무엇이 일어나나 |
|---|---|
| 생성 | AI Server 가 초안을 만듭니다(HIS 에는 모델이 없습니다) |
| 표시 | 화면이 AI 산출물임을 공용 표기로 알리고 면책 문구를 함께 보여 줍니다 |
| 승인 | 사람이 **승인 · 수정 · 거부**를 고릅니다 |
| 기록 | 셋이 **구분돼** 남습니다 — 그대로 승인했는지 고쳐 승인했는지 알 수 있습니다 |
| 감사 | 환자를 지목한 AI 조회는 감사 기록에 남습니다 |
| 예외 | AI 가 멈추면 「폴백」 또는 「산출 불가」로 적습니다 — **빈칸으로 두지 않습니다** |

## 3. 🔴 왜 그렇게 만들었나

- **승인 없이 기록이 되면 책임의 자리가 사라집니다.** 누가 판단했는지가 남지 않으면, 나중에 그 기록을 근거로 한 판단도 근거를 잃습니다.
- **「그대로 승인」과 「고쳐 승인」은 다른 사건입니다.** 구분해 남기지 않으면 AI 가 실제로 얼마나 맞았는지 사후에 알 수 없습니다.
- **빈칸은 거짓말이 됩니다.** AI 가 멈춘 것과 결과가 없는 것은 다른데, 둘 다 빈칸이면 읽는 사람이 구분하지 못합니다(판정 규칙 ①).
- 🔵 근거: HIS 구성서 §9 「AI 산출물은 초안이며, 사람이 승인해야 기록이 됩니다」 · 개요서 6장.

## 4. 🔴 무엇을 막나

- 승인 없는 기록화
- 승인 이력이 남지 않는 것
- **의료 · 개인건강정보가 외부 AI 제공자로 나가는 것**(코드가 막고, 목적지 허용 목록이 비어 있으면 나가지 않습니다)
- AI 가 멈췄을 때 **조용히 비우는 것**

## 5. 어디서 보나

[개요서 6장](../../overview/06-ai.md) · [HIS 구성서 §9](../../systems/his.md) · [AI Server 구성서](../../systems/ai-server.md) · [진료하는 사람을 위한 안내 §2](../../clinicians/README.md#2-ai-가-하는-일과-하지-않는-일) · [S6](../../build-guide/S6-ai.md)

🔴 **기관이 정하는 것** — AI 기능 전체 스위치는 코드 기본값이 켜짐입니다. 생태계 원칙은 **설치 직후 끄고 하나씩 켜는 것**입니다.
