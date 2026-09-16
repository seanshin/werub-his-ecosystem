# HIS → twin

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 트윈 보기 — HMAC 서명 런치 URL(5분) 발급(구방식) | 브라우저 이동 URL(서명 토큰 쿼리) · twin-web 미들웨어가 검증 | HMAC-SHA256(TWIN_LAUNCH_SECRET 공유 비밀) · 환자 AI  | `구현·미검증` | — |
| SMART on FHIR EHR launch — 의료진+환자 바인딩 launch 토큰 → twin-web authorize(PKCE) → token → id_to | SMART App Launch(EHR launch · authorization_co | confidential client(client_secret) · id_token  | `구현·미검증` | — |
| CDS Hooks patient-view — 차트 열람 시 트윈 위험 카드(ASCVD/UKPDS/eGFR·알림·Patient-360 링크) | CDS Hooks 형식 POST /cds-services/twin-patient-v | Bearer = HMAC(TWIN_LAUNCH_SECRET, 'cds-hooks') | `구현·미검증` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `TWIN_LAUNCH_SECRET`
- `TWIN_BASE_URL`
- `TWIN_SMART_CLIENT_ID`
- `TWIN_SMART_CLIENT_SECRET`
- `TWIN_SMART_SCOPE`
- `TWIN_SMART_ISS_ALLOW`
- `TWIN_PUBLIC_BASE`
- `SmartClient.scopes·redirectUris(HIS DB · 관리 > SMART 클라이언트)`
- `TWIN_API_INTERNAL(twin-web)`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

