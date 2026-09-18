# cerno 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [cerno 시스템 구성서](../systems/cerno.md)
> 계층 AI · 버전 `0.1.0` · 구현 상태 `파일럿` — 섀도우 · 비임상 · 화면 3 · 기준: [통합 릴리즈 초안](../RELEASES/2026.09/manifest.md)(계측일 2026-09-11)

> **EN** — Clinician-personalised clinical AI, retrieval-grounded so that it **does not generate without a source** — a draft answer arrives together with the documents it was built from. It runs **shadow and non-clinical only** and is not used for clinical judgement. Two capture slots (a grounded answer with its sources, and the per-clinician document corpus) are **not filled yet**. Captures are taken on **synthetic hospital data**, with institution-identifying information, secrets and infrastructure details masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

의료진별 개인화 임상 AI 입니다. **근거가 없으면 생성하지 않는 RAG** 로, 찾은 근거 문서와 함께 답변 초안을 냅니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 cerno-1 | 근거 질의와 출처가 붙은 답변 초안 | `cerno-rag-answer.png` | ⬜ |
| 📷 cerno-2 | 의료진별 근거 문서 모음 | `cerno-corpus.png` | ⬜ |

## 알아 둘 것

🔴 **비임상 한정 · 섀도우 운영**입니다. 임상 판단에 쓰지 않습니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/2026.09/compatibility.md)에서 봅니다 — 어떤 연결이 `검증됨` 이고 언제 확인했는지는 그 표의 **상태 칸 · 확인일 칸**에 있습니다(합계도 그 표 한 곳에만 둡니다). 나머지 `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.
- 설치 요구사항 · 주요 설정 · 한계는 [cerno 시스템 구성서](../systems/cerno.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
