# LIS → PACS

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 병리 슬라이드 스캔 워크리스트 등록·취소(ORM^O01 NW/CA → PACS worklist → MWL) | HL7 v2.3 ORM^O01 over MLLP(TCP) | 없음(MLLP) · PACS 선택 게이트 HL7_ALLOWED_PEERS(소스 IP | `검증됨` | 2026-09-15 |
| 병리 WSI 뷰어 링크 해소 · QIDO 로 영상 도착 확인 · 열람 확인 기록 | HTTPS REST(PACS 로그인) + DICOMweb QIDO-RS + 뷰어 런 | PACS 로컬 서비스 계정 로그인 → PACS JWT | `검증됨` | 2026-09-15 |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `LIS: PACS_MLLP_HOST`
- `LIS: PACS_MLLP_PORT`
- `PACS: HL7_BIND`
- `PACS: HL7_PORT`
- `PACS: HL7_ALLOWED_PEERS`
- `PACS: HL7_ALLOWED_FACILITIES`
- `LIS: PACS_BASE`
- `LIS: PACS_USER`
- `LIS: PACS_PASS`

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **2개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

