# LIS 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [LIS 시스템 구성서](../systems/lis.md)
> 계층 임상 부서 · 버전 `1.56.18` · 구현 상태 `파일럿` · 화면 41 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Laboratory information system. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

진단검사 · 미생물 · 병리 · 수혈 · 유전체 검사정보시스템입니다. HIS 의 검사 오더를 FHIR R4 로 가져가고, 결과를 확정해 되돌려 보냅니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 lis-1 | 결과 검증 — 자동 검증 · 델타 체크 · 2차 검증 | `lis-result-verify.png` | ⬜ |
| 📷 lis-2 | 위험치 통보와 복창 기록 | `lis-critical-value.png` | ⬜ |
| 📷 lis-3 | 검체 접수와 진행 상태 | `lis-specimen.png` | ⬜ |
| 📷 lis-4 | 병리 — 슬라이드와 스캔 워크리스트 | `lis-pathology.png` | ⬜ |
| 📷 lis-5 | 수혈 — 출고 전 동의 확인 | `lis-transfusion.png` | ⬜ |

## 알아 둘 것

🔴 **검사 분석기 → LIS 결과 자동 수집(ASTM E1394)이 `미구현`입니다.** 결과 파일 입력 · 수기 입력 또는 인터페이스 중계 장치를 씁니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [LIS 시스템 구성서](../systems/lis.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
