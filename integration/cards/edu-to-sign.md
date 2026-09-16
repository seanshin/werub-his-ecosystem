# edu → sign

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 법정교육 이수증 봉인(시스템 발급 서명)·폐기·철회 | HTTP POST /v1/certificates/enroll · /v1/sign-r | x-api-key (sign 동적 소비자 — env 시드 목록에 edu 없음, 콘솔 | `검증됨` | 2026-09-15 |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `edu: SIGN_INTERNAL_URL (sign.internalUrl)`
- `edu: SIGN_PUBLIC_URL (sign.publicUrl)`
- `edu: SIGN_API_KEY (sign.apiKey)`
- `edu: SIGN_REGISTRAR_SERIAL (sign.registrarSerial)`
- `sign: 콘솔 등록 소비자 키`

## 따라가기에서 확인한 것

새 설치본끼리 실제로 불러 확인한 연결 **1개**(확인일은 위 표) — 자세한 것은 [따라가 본 결과](../../build-guide/follow-along-2026-09.md).

