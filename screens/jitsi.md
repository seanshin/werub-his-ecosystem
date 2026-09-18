# Jitsi 화면

> 🟡 **초안 — 캡처 없음** · [화면 소개 목차](README.md) · [Jitsi 시스템 구성서](../systems/jitsi.md)
> 계층 협업·교육 · 버전 `1.0.0` · 구현 상태 **`중단`** · 화면 — · 기준: [통합 릴리즈 `2026.09`](../RELEASES/2026.09/manifest.md)(계측일 2026-09-11)

> **EN** — Self-hosted telehealth video. Its status is `중단` (discontinued) — the current installation does not run, so there are **no captures**, and an institution that needs video consultation has to build it anew. Any future captures would be taken on **synthetic hospital data**, with institution-identifying information, secrets and infrastructure details masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

원격진료 화상(자체 호스팅)입니다.

## 캡처 자리

없습니다 — 아래 「알아 둘 것」을 보세요.

## 알아 둘 것

🔴 **현재 설치본이 동작하지 않습니다.** 관련 연결 7개가 모두 `중단` 입니다(HIS ⇄ Jitsi 3 · AI Server ⇄ Jitsi 2 · 환자 앱 ⇄ Jitsi 1 · Clinic ⇄ Jitsi 1). **구축 기관이 새로 구성해야** 하며, 캡처는 새로 구성한 뒤에 넣습니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/2026.09/compatibility.md)에서 봅니다 — 어떤 연결이 `검증됨` 이고 언제 확인했는지는 그 표의 **상태 칸 · 확인일 칸**에 있습니다(합계도 그 표 한 곳에만 둡니다). 나머지 `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.
- 설치 요구사항 · 주요 설정 · 한계는 [Jitsi 시스템 구성서](../systems/jitsi.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
