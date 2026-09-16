# Clinic → edu

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| Clinic 로그인 사용자 → edu 자동 로그인 딥링크 | 브라우저 리다이렉트(토큰 쿼리) → edu `/sso` → `POST /api/v1 | HS256 JWT(EDU_SSO_SECRET · sub=이메일 · role 기본값  | `구현·미검증` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `EDU_URL`
- `EDU_SSO_LANDING`
- `EDU_SSO_SECRET`
- `EDU_SSO_DEFAULT_ROLE`
- `HIS_JWT_SECRET(edu: his.jwtSecret)`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

