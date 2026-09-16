# HIS → Clinic

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 직원 일괄 등록(HIS 재직자 → Clinic 멤버·계정 생성) · 회신 clinicUserId 를 Staff 에 영속 | REST(JSON) POST `/api/clinic/his/staff/sync` | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 스코 | `구현·미검증` | — |
| 조직도·보고라인 동기화 v2(사번 기준 멱등 upsert · mappings[] 회신 영속) — 결재선 추천 근거 | REST(JSON) POST `/api/clinic/his/organization/ | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 스코 | `구현·미검증` | — |
| Clinic 직원 목록 조회 → 이메일·clinicUserId 로 HIS Staff 매핑(sync-staff) | REST(JSON) GET `/api/clinic/his/staff` | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 스코 | `구현·미검증` | — |
| 업무 연동 API 군 — 알림(일반·긴급)·채널 메시지·인수인계·채널 목록·캘린더 동기화·수술 일정·근태·연차 조회/신청·위키 검색/조회/생성·Clinic 웹훅  | REST(JSON) `/api/clinic/his/{notify,notify/urg | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 라우 | `구현·미검증` | — |
| 전자결재(W.Sign) 요청·상태 조회·결재선 추천 — ERP 결재 릴레이의 HIS→Clinic 구간(ERP→HIS 구간은 레인 B) | REST(JSON) `/api/clinic/his/wsign/request` · ` | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 스코 | `구현·미검증` | — |
| HIS → Clinic 열람 SSO 티켓(재로그인 없이 Clinic 결재 문서 열람) | REST POST `/api/clinic/his/sso-ticket` → 브라우저  | Clinic 발급 API 키(Bearer) + X-Hospital-Code · 스코 | `미구현` | — |
| HIS 이벤트 → Clinic W.Channel 채널 카드(his_webhooks format=SLACK · 직원·청구·재고 등 카탈로그 이벤트) | HTTPS POST 웹훅(Slack 호환 카드) → Clinic `/api/hook | X-HIS-Signature = sha256 HMAC(rawBody) · 시크릿은  | `구현·미검증` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `CLINIC_API_URL`
- `CLINIC_API_KEY`
- `CLINIC_HOSPITAL_CODE`
- `his_webhooks(DB 행)`
- `incoming_webhooks.signing_secret(Clinic DB)`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

