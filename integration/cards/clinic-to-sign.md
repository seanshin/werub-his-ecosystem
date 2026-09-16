# Clinic → sign

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 신뢰의 사슬 — 그룹웨어 전자결재(W.Sign) 문서 인증: 결재 이벤트를 sign 감사 스트림에 앵커·검증 | HTTP POST {baseUrl}/audit-events(anchor) · GET | x-api-key (워크스페이스별 등록 키 · 없으면 전역 WSIGN_DOCAUTH | `구현·미검증` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `clinic: WSIGN_DOCAUTH_URL`
- `clinic: WSIGN_DOCAUTH_KEY`
- `clinic: WSIGN_DOCAUTH_DEFAULT_URL`
- `clinic: WSIGN_DOCAUTH_PROVIDER`
- `clinic: WSIGN_DOCAUTH_CHAIN`
- `clinic: 워크스페이스 docauth 설정(apiKey 암호화 저장)`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

