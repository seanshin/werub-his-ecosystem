# AI Server 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [AI Server 시스템 구성서](../systems/ai-server.md)
> 계층 AI · 버전 `2.125.41` · 구현 상태 `통합` — 의료 기능 기준 · 화면 관리 화면(계측값 없음) · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — On-premise GPU AI server. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

기관 안 GPU 한 장에서 도는 통합 AI 서버입니다 — 의료 분류 · 요약 · DUR · RAG · 음성 인식 보조. 모든 시스템의 AI 호출이 여기로 모입니다. 호출하는 쪽은 모델 이름이 아니라 **역할 이름**을 부르고, 역할 → 모델 라우팅 표가 모델을 고릅니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 ai-server-1 | 관리 대시보드 — 적재된 모델과 VRAM 사용 | `ai-server-dashboard.png` | ⬜ |
| 📷 ai-server-2 | 역할 → 모델 라우팅 표 | `ai-server-routing.png` | ⬜ |
| 📷 ai-server-3 | 시간대 운영 프로파일 | `ai-server-profiles.png` | ⬜ |
| 📷 ai-server-4 | 품질 계측 — 충실도 · 검색 품질 | `ai-server-quality.png` | ⬜ |

## 알아 둘 것

🔴 관리 화면에는 **호스트 · 포트 · 모델 파일 경로 · 토큰**이 보일 수 있습니다. 캡처 전에 가립니다. GPU 모델명(RTX 5080)은 이미 공개한 사실이라 그대로 두어도 됩니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 16**(HIS → sign 직원 신원 · 서명 · sign → HIS 서명 완료 통지 · HIS → sign 오더 서명 로그 봉인 · HIS → LIS 검사 오더 전달 · LIS → HIS 환자 조회 · LIS → HIS 검사 결과 전달 · HIS → LIS 오더 취소 전파 · HIS → ERP 직원 SSO · HIS ⇄ edu 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록 · edu ⇄ sign 이수증 서명 · 완료 통지 · ERP ⇄ sign 외주 계약 서명 · 완료 통지 — 새 설치본끼리 실제 호출로 확인 2026-09-14 · 나머지는 코드 대조 2026-09-11).
- 설치 요구사항 · 주요 설정 · 한계는 [AI Server 시스템 구성서](../systems/ai-server.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
