# twin 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [twin 시스템 구성서](../systems/twin.md)
> 계층 AI · 버전 `1.20.88` · 구현 상태 `통합` · 화면 15 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Digital twin. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

디지털 트윈 — 위험 점수 카드 · SBAR 초안 · 시뮬레이션. 차트에서 SMART on FHIR 로 열리고, CDS Hooks 로 위험 카드를 띄웁니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 twin-1 | 환자 위험 점수 카드 | `twin-risk-card.png` | ⬜ |
| 📷 twin-2 | SBAR 초안과 "차트 저장" | `twin-sbar.png` | ⬜ |
| 📷 twin-3 | 차트에서 연 twin(SMART on FHIR) | `twin-smart-launch.png` | ⬜ |

## 알아 둘 것

**의료진이 "차트 저장"을 눌러야 HIS 에 저장됩니다.** AI 설명 초안에는 `machine-generated` 표시가 붙습니다. twin 은 안전 등급 분류 예비 단계입니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [twin 시스템 구성서](../systems/twin.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
