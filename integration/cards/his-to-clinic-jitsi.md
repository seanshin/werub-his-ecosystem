# HIS → Clinic · Jitsi

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| HIS 내부 IdP 단기 토큰(audience 'clinic'·'jitsi' · 경로 B redemption code 백채널 교환 · introspect) | REST `/api/v1/sso/internal/{grant,redeem,intro | 독립 서명키 HS 계열(AUTH_SSO_SIGNING_KEY · 없으면 AUTH_S | `설계만` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `AUTH_SSO_SIGNING_KEY`
- `SSO_INTROSPECT_KEY`
- `AUTH_SECRET`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

