# HIS → Jitsi

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 원격진료 화상 입장(의료진) — HIS 가 Jitsi JWT 를 직접 서명(의사=모더레이터) → 웹이 `NEXT_PUBLIC_JITSI_URL/<room>?jwt | HTTPS(브라우저) · Jitsi Meet/XMPP(Prosody JWT 인증) | HS256 JWT(JITSI_JWT_SECRET · iss=aud=JITSI_JWT | `중단` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `JITSI_JWT_SECRET`
- `JITSI_JWT_APP_ID`
- `JITSI_JWT_DOMAIN`
- `NEXT_PUBLIC_JITSI_URL`
- `JWT_APP_ID`
- `JWT_APP_SECRET`
- `JWT_ACCEPTED_ISSUERS`
- `JWT_ACCEPTED_AUDIENCES`
- `ENABLE_AUTH`
- `AUTH_TYPE`
- `JWT_ALLOW_EMPTY`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

