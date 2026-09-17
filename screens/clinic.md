# Clinic 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [Clinic 시스템 구성서](../systems/clinic.md)
> 계층 협업·교육 · 버전 `1.4.0` · 구현 상태 `통합` — 병원 서비스만 · 화면 16(병원 서비스) · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

> **EN** — Hospital groupware — handover, rosters, notifications and electronic approval. It attaches using an API key issued by the HIS and receives staff records in bulk from it; only the **hospital service** inside the monorepo is in scope for this ecosystem. Four capture slots (handover, roster, approval, notifications) are **not filled yet** — this system was not installed during the first build walkthrough. Captures are taken on **synthetic hospital data**, with institution-identifying information, secrets and infrastructure details masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

병원 그룹웨어 — 인수인계 · 근무표 · 알림 · 전자결재. HIS 가 발급한 API 키로 붙고, 직원 일괄 등록을 HIS 에서 받습니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 clinic-1 | 인수인계 | `clinic-handover.png` | ⬜ |
| 📷 clinic-2 | 근무표 | `clinic-schedule.png` | ⬜ |
| 📷 clinic-3 | 전자결재 | `clinic-approval.png` | ⬜ |
| 📷 clinic-4 | 알림 | `clinic-notifications.png` | ⬜ |

## 알아 둘 것

모노레포 안의 **병원 서비스만** 생태계 범위입니다. 함께 설치할 구성요소의 정확한 범위는 소스 링크를 정리할 때 확정합니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — 어떤 연결이 `검증됨` 이고 언제 확인했는지는 그 표의 **상태 칸 · 확인일 칸**에 있습니다(합계도 그 표 한 곳에만 둡니다). 나머지 `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.
- 설치 요구사항 · 주요 설정 · 한계는 [Clinic 시스템 구성서](../systems/clinic.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
