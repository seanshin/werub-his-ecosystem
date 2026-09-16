# twin → AI Server

> 연동 계약 카드 — [카드 목록](README.md) · [연동 지도](../README.md) · 상태의 정본은 [연결 상태 표](../../RELEASES/draft/compatibility.md)입니다.

**무엇을 주고받나** — `확인 필요`: 이 쌍을 한 문단으로 설명하는 글이 아직 없습니다.

## 연결

| 목적 | 프로토콜 | 인증 | 상태 | 확인일 |
|---|---|---|---|---|
| 위험 예측 보조(재입원·합병증·약물이상반응) · 약물상호작용·DUR · 서술형 요약/질의(LLM) · 개인 RAG · 의료법 질의 · 영상(판독 보조·비교·사전점 | HTTPS REST(JSON · multipart · NDJSON 스트림) + Op | X-Medical-Key(ai_medical_key) + Bearer(ai_api_ | `구현·미검증` | — |

## 양쪽에 넣는 설정 — **키 이름만**

값은 기관이 새로 만듭니다. 이 자료는 값을 담지 않습니다.

- `AI_BASE_URL`
- `AI_MEDICAL_KEY`
- `AI_API_KEY`
- `AI_CHAT_MODEL`
- `AI_CHAT_MODEL_DIGEST`
- `AI_CHAT_TEMPERATURE`
- `AI_CHAT_SEED`
- `AI_CHAT_MAX_TOKENS`
- `LLM_MODEL_CHECK_HOURS`

## 따라가기에서 확인한 것

이 방향은 **아직 실제로 불러 보지 않았습니다.** 상태는 양쪽 코드를 대조한 판정입니다.

