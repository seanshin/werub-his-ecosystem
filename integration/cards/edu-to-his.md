# edu → HIS

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — 사내교육 시스템이 HIS 의 **직원 명부를 가져오고**, 이수 기록을 HIS 의 자격 · 교육 원장에 씁니다. 직원 신원은 HIS 공개키로 검증합니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| edu 자체 로그인 화면의 ID/PW 를 HIS `/api/v1/auth/login` 으로 중계 → HIS access 토큰으로 staff-token?aud=ed | 서버간 REST(JSON) | 사용자 ID/PW(HIS 로 전달) → HIS JWT(Bearer) → RS256  | `구현·미검증` | — |
| staff-token 검증용 공개 JWKS 조회(테넌트별 캐시 1시간 · kid 미스 시 재조회) | HTTPS GET JWKS | 없음(공개 키) | `검증됨` | 2026-09-14 |
| 직원 디렉터리 조회(교육 대상자 자동 지정 · 야간 폴링 안전망) | REST GET `/api/v1/hr/staff?status=ACTIVE` | his.eduKey 설정 시 X-Edu-Key, 아니면 edu 가 HIS AUTH_ | `검증됨` | 2026-09-14 |
| 교육 이수기록 기록(법정·보수교육 → HIS 자격·교육 원장) · 카탈로그 이수 | REST POST `/api/v1/staff-qualification/educati | D-17 과 같음(X-Edu-Key 또는 자체 서명 ADMIN 토큰) | `검증됨` | 2026-09-14 |
| edu → HIS 직원 인앱 알림 인입 | REST POST `/api/v1/integration/edu/notificatio | X-Integration-Key(edu.integrationKey) | `미구현` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `his.baseUrl / HIS_BASE_URL`
- `HIS_STAFF_TOKEN_URL`
- `HIS_TOKEN_AUDIENCE`
- `HIS_JWKS_URL`
- `his.baseUrl(테넌트 설정에서 유도)`
- `HIS_EDU_KEY(his.eduKey)`
- `HIS_JWT_SECRET(his.jwtSecret)`
- `HIS_SERVICE_SUB(his.serviceSub)`
- `HIS_SERVICE_JWT`
- `edu.integrationKey(HIS)`
- `HIS_SERVICE_SUB`

## 여는 순서

1. edu 에 HIS 공개키 주소를 넣고 설정 화면의 연결 점검으로 확인합니다.
2. 직원 명부를 한 번 동기화해 인원 수가 HIS 재직자와 같은지 봅니다.
3. 이수 하나를 처리해 HIS 교육 기록에 남는지 확인합니다.
4. 🔸 연결 점검이 통과로 보여도 실제 경로가 되는지는 위 두 가지로 확인합니다.

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **3개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

