# HIS(환자 포털) → PACS

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 환자 영상·판독 결과 내보내기(암호화 패키지 요청 → 상태 폴링 → 1회 수령) | HTTPS REST JSON + 1회용 게이트웨이 다운로드 | HS256 서비스 토큰(scope=patient-export · mrn · 10분) | `구현·미검증` | — |
| 환자 본인 영상·판독 목록·판독완료 알림·썸네일·판독 PDF 조회 | HTTPS REST JSON / 바이너리 | PACS 서비스 계정 Bearer(환자 토큰은 넘기지 않음) | `구현·미검증` | — |
| 환자 외부 영상(DICOM) 업로드 멀티파트 중계 | HTTPS POST multipart | PACS 서비스 계정 Bearer | `미구현` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `HIS: pacs.exportEnabled`
- `HIS: pacs.exportSecret`
- `HIS: pacs.exportBaseUrl`
- `PACS: PATIENT_EXPORT_ENABLED(기본 false)`
- `PACS: PATIENT_EXPORT_SECRET(없으면 HOSPITALRUN_AUTH_SECRET)`
- `HIS: OPENPACS_API_URL`
- `HIS: OPENPACS_USER`
- `HIS: OPENPACS_PASS`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

