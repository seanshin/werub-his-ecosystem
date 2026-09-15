# Jitsi 화면

> 🟡 **초안 — 캡처 없음** · [화면 소개 목차](README.md) · [Jitsi 시스템 구성서](../systems/jitsi.md)
> 계층 협업·교육 · 버전 `1.0.0` · 구현 상태 **`중단`** · 화면 — · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Self-hosted telehealth video. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

원격진료 화상(자체 호스팅)입니다.

## 캡처 자리

없습니다 — 아래 「알아 둘 것」을 보세요.

## 알아 둘 것

🔴 **현재 설치본이 동작하지 않습니다.** 관련 연결 7개가 모두 `중단` 입니다(HIS ⇄ Jitsi 3 · AI Server ⇄ Jitsi 2 · 환자 앱 ⇄ Jitsi 1 · Clinic ⇄ Jitsi 1). **구축 기관이 새로 구성해야** 하며, 캡처는 새로 구성한 뒤에 넣습니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 20**(HIS → sign 직원 신원 · 서명 · sign → HIS 서명 완료 통지 · HIS → sign 오더 서명 로그 봉인 · HIS → LIS 검사 오더 전달 · LIS → HIS 환자 조회 · LIS → HIS 검사 결과 전달 · HIS → LIS 오더 취소 전파 · HIS → ERP 직원 SSO · HIS ⇄ edu 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록 · edu ⇄ sign 이수증 서명 · 완료 통지 · ERP ⇄ sign 외주 계약 서명 · 완료 통지 · PACS → sign 판독 서명 · LIS → PACS 병리 워크리스트 · LIS → ERP 검사 청구 · LIS → PACS 병리 뷰어 링크 — 새 설치본끼리 실제 호출로 확인 2026-09-14 · 나머지는 코드 대조 2026-09-11).
- 설치 요구사항 · 주요 설정 · 한계는 [Jitsi 시스템 구성서](../systems/jitsi.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
