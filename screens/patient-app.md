# 환자 앱 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [환자 앱 시스템 구성서](../systems/patient-app.md)
> 계층 환자 접점 · 버전 `v4.18.0` · 구현 상태 `개발` — 스토어 미배포 · 화면 32 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Patient app. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

환자가 예약 · 결과 열람 · 동의 · 문진 · 보호자 위임을 하는 앱입니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 patient-app-1 | 결과 · 영상 · 판독 열람 | `patient-app-results.png` | ⬜ |
| 📷 patient-app-2 | 결과 상세와 회차별 비교 | `patient-app-result-compare.png` | ⬜ |
| 📷 patient-app-3 | 문진표 작성 | `patient-app-questionnaire.png` | ⬜ |
| 📷 patient-app-4 | 입원 여정 타임라인 | `patient-app-journey.png` | ⬜ |

## 알아 둘 것

🔴 **스토어에 배포되지 않았고, 앱에서 신규 가입이 되지 않습니다.** 배포 결정 전에는 HIS 의 웹 환자 포털을 씁니다. 알림 푸시도 동작하지 않습니다([환자 앱 구성서 §10](../systems/patient-app.md#10-한계와-대체-수단)).

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [환자 앱 시스템 구성서](../systems/patient-app.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
