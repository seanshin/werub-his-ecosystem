# HIS → PACS

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 영상 오더 생성 시 PACS 워크리스트 자동 등록 + 실패분 재등록 | HTTPS REST JSON(POST /api/v1/worklist) | PACS 서비스 계정 로그인(POST /api/v1/auth/login) → Bea | `구현·미검증` | — |
| 영상 조회 프록시 — 스터디·시리즈·판독 목록·워크리스트·대시보드·템플릿·AI 모델 목록 | HTTPS REST JSON(HIS api/v1/pacs/* → PACS /api/ | PACS_SSO_ENABLED=true(기본)면 사용자의 HIS 메인 access  | `구현·미검증` | — |
| 판독 작성·수정·서명 프록시(POST /reports · PATCH /reports/{id} · POST /reports/{id}/sign) | HTTPS REST JSON | A20 과 같음(HIS 메인 JWT 전달 → PACS SSO 사용자 매핑) | `구현·미검증` | — |
| WADO 영상 바이트 중계(판독 워크스테이션 · 화면이 PACS 를 직접 부르지 않게) | HTTPS GET WADO-URI | A20 과 같음 | `판정 불가` | — |
| 환자 인구정보·병합 HL7 ADT(IHE PIX Feed ITI-8 · Query ITI-9) | HL7 v2 ADT/QBP over MLLP | 없음(MLLP) · PACS 선택 허용 목록 | `미구현` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `HIS: OPENPACS_API_URL`
- `HIS: OPENPACS_USER`
- `HIS: OPENPACS_PASS`
- `HIS: PACS_SSO_ENABLED`
- `PACS: HOSPITALRUN_AUTH_SECRET`
- `PACS: HIS_JWKS_URL`
- `PACS: HIS_JWT_ISSUER`
- `PACS: HIS_JWT_AUDIENCE`
- `PACS: HIS_SSO_ENABLED`
- `PACS: HL7_PORT`
- `PACS: HL7_ALLOWED_PEERS`
- `PACS: HL7_ALLOWED_FACILITIES`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

