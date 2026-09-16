# PACS → sign

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — 판독의가 확정한 판독보고서에 **전자서명**을 하고, 조영제 · 영상 동의서를 환자가 **서명 포털에서** 서명합니다. 서명 결과는 PACS 가 상태 조회로 확인합니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 판독보고서 STAFF 전자서명(판독의 본인 서명) — 판독 서명 구간 | PACS 화면이 HIS staff-token(aud=sign) 발급 → PACS 백 | 서비스 호출 x-api-key(sign 소비자 pacs ↔ PACS SIGN_SER | `검증됨` | 2026-09-15 |
| 영상·조영제 동의서 환자 서명(포털 링크·알림) | HTTP POST /v1/certificates/enroll(환자·대리인) · /v | x-api-key (소비자 pacs) | `검증됨` | 2026-09-15 |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `pacs: SIGN_SERVICE_ENABLED (기본 false)`
- `pacs: SIGN_SERVICE_URL`
- `pacs: SIGN_SERVICE_API_KEY`
- `sign env: PACS_API_KEY`
- `sign env: HIS_SSO_JWKS_URL`
- `pacs: SIGN_SERVICE_ENABLED`
- `pacs: SIGN_PORTAL_BASE_URL`

## 여는 순서

1. sign 에 PACS 소비자를 등록하고 키를 받아 PACS 설정에 넣습니다.
2. PACS 의 **서명 포털 주소를 기관 주소로 바꿉니다**(기본값이 특정 설치본 주소입니다).
3. 판독 하나를 확정한 뒤 서명하고, 확정 전에는 서명이 막히는지 확인합니다.
4. 🔴 새 설치본의 sign 은 본인확인이 **데모 공급자**로 동작합니다(포털이 데모라고 표시). 실제 환자 서명 전에 본인확인 연동을 끝냅니다.

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **2개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

