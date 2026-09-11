# edu 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [edu 시스템 구성서](../systems/edu.md)
> 계층 협업·교육 · 버전 `2.7.0` · 구현 상태 `확인 필요` — 운영 여부 재확인 전 · 화면 41 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Staff e-learning. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

직원 이러닝 · 법정교육 · 전자 이수증. 이수증은 [sign](sign.md) 이 봉인합니다. 직원 입사 · 변경 · 퇴직은 HIS 의 직원 이벤트 웹훅으로 받습니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 edu-1 | 교육 과정과 수강 | `edu-courses.png` | ⬜ |
| 📷 edu-2 | 법정교육 이수 현황 | `edu-mandatory.png` | ⬜ |
| 📷 edu-3 | 전자 이수증(sign 봉인) | `edu-certificate.png` | ⬜ |

## 알아 둘 것

**로그인이 HIS SSO 뿐**이라 HIS 없이 따로 쓸 수 없습니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [edu 시스템 구성서](../systems/edu.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
