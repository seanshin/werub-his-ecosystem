# cerno 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [cerno 시스템 구성서](../systems/cerno.md)
> 계층 AI · 버전 `0.1.0` · 구현 상태 `파일럿` — 섀도우 · 비임상 · 화면 3 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Clinician-personalized clinical AI. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

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

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 10**(HIS → sign 직원 신원 · 서명 · sign → HIS 서명 완료 통지 · HIS → sign 오더 서명 로그 봉인 · HIS → LIS 검사 오더 전달 · LIS → HIS 환자 조회 · HIS → ERP 직원 SSO · HIS ⇄ edu 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록 — 새 설치본끼리 실제 호출로 확인 2026-09-14 · 나머지는 코드 대조 2026-09-11).
- 설치 요구사항 · 주요 설정 · 한계는 [cerno 시스템 구성서](../systems/cerno.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
