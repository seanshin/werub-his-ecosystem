# sign → ERP

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — 계약 서명이 끝나면 sign 이 ERP 로 완료를 알리고, ERP 계약 상태가 체결로 바뀝니다. 위조된 통지는 거부됩니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 서명 완료 통지(트랙 A 계약 미러·발효) | HTTP POST 웹훅 → ERP /api/v1/integrations/sign/w | HMAC-SHA256(rawBody) X-Sign-Signature (소비자별 시크 | `검증됨` | 2026-09-15 |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `sign env: ERP_WEBHOOK_SECRET`
- `erp: sign_webhook_secret`
- `erp: inbound_webhook_max_skew`

## 여는 순서

1. ERP 와 sign 에 같은 웹훅 비밀값을 넣습니다.
2. 🔴 sign 은 **https 콜백만** 받습니다. ERP 가 http 로만 떠 있으면 앞단에 TLS 를 두고 그 인증서를 sign 이 신뢰하게 해야 합니다.
3. 서명 없는 통지 · 위조 서명 통지가 거부되는지 확인합니다.

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **1개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

