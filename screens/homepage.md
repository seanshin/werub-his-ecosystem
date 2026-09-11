# 공개 홈페이지 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [공개 홈페이지 시스템 구성서](../systems/homepage.md)
> 계층 환자 접점 · 버전 `v4.18.0` · 구현 상태 `운영` · 화면 50 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Public website. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

병원의 공개 웹사이트입니다. 병원 · 진료 · 검진 안내를 보여 주고, **AI 예약 도우미**가 증상에서 진료과 후보를 제안합니다. 환자 포털 로그인도 여기서 들어갑니다. 내용(공지 · 배너 · 미디어 · SEO)은 HIS 의 `홈페이지 관리` 에서 관리합니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 homepage-1 | 예약 — AI 예약 도우미 대화와 진료과 후보 | `homepage-booking-ai.png` | ⬜ |
| 📷 homepage-2 | 건강검진 — 검진 프로그램 목록과 수용 현황 | `homepage-checkup-programs.png` | ⬜ |
| 📷 homepage-3 | 진료과 · 의료진 안내 | `homepage-departments.png` | ⬜ |
| 📷 homepage-4 | 환자 포털 로그인과 본인 정보 조회 | `homepage-portal-login.png` | ⬜ |

## 알아 둘 것

공개 사이트이므로 **기관 식별 정보가 화면 전체에 나옵니다.** 캡처는 데모 병원 이름을 정한 뒤, 가상 내용으로 찍습니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [공개 홈페이지 시스템 구성서](../systems/homepage.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
