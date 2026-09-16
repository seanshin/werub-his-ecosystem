# HIS → LIS

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — 의사가 낸 검사 오더를 LIS 가 **주기적으로 가져갑니다**(HIS 가 밀어 주지 않습니다). 취소도 같은 방식으로 전해집니다. 표준은 FHIR R4 이고, LIS 는 SMART 기계 간 인증으로 HIS 에 붙습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 검사 오더 전달 — LIS가 HIS FHIR ServiceRequest(active)를 5분 주기 증분 폴링 | FHIR R4 REST 검색(searchset) · 폴링 | SMART Backend Services client_credentials(clie | `검증됨` | 2026-09-14 |
| 검사 오더 취소 전파 — LIS가 status=revoked 를 같은 워터마크로 폴링해 LIS 오더·병리 케이스 취소 | FHIR R4 REST 검색 · 폴링 | A01과 같음(SMART client_credentials · ServiceRequ | `검증됨` | 2026-09-15 |
| 검사 처방 HL7 OML^O21 수신(LIS inbound) — 대체 경로 | HL7 v2 메시지를 HTTP 본문으로(POST) | LIS JWT(ADM 역할) — 기계 간 키 아님 | `미구현` | — |
| Reflex 승인·반려 웹훅(HIS→LIS push · 폴링 대안) | HTTPS POST JSON | 공유 토큰 헤더 x-reflex-webhook-token(상수시간 비교 · 미설정  | `미구현` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `LIS: HIS_FHIR_BASE`
- `LIS: HIS_FHIR_TOKEN_URL`
- `LIS: HIS_CLIENT_ID`
- `LIS: HIS_CLIENT_SECRET`
- `LIS: HIS_FHIR_SCOPES`
- `LIS: HIS_ORDER_POLL`
- `LIS: HIS_HTTP_TIMEOUT_MS`
- `HIS: SmartClient 등록(DB smartClient.scopes)`
- `LIS: HIS_REFLEX_WEBHOOK_TOKEN`

## 여는 순서

1. HIS 의 SMART 클라이언트 화면에서 **LIS 를 클라이언트로 등록**하고, 필요한 범위(오더 읽기 · 환자 읽기 · 결과 쓰기)만 허가합니다.
2. 받은 값(주소 · 토큰 주소 · 클라이언트 ID · 비밀)을 LIS 환경 설정에 넣고 폴링을 켭니다.
3. 🔴 **검사 코드 매핑을 먼저 맞춥니다.** 기본 시드끼리는 대부분 매핑이 없어 오더가 대기열에 쌓입니다 — 카탈로그 반입(LIS → HIS)과 매핑 보정이 선행입니다.
4. 오더 하나를 내고 다음 주기에 LIS 에 접수되는지 확인합니다.

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **2개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

