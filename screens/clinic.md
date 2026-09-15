# Clinic 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [Clinic 시스템 구성서](../systems/clinic.md)
> 계층 협업·교육 · 버전 `1.4.0` · 구현 상태 `통합` — 병원 서비스만 · 화면 16(병원 서비스) · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Hospital groupware. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

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

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 18**(HIS → sign 직원 신원 · 서명 · sign → HIS 서명 완료 통지 · HIS → sign 오더 서명 로그 봉인 · HIS → LIS 검사 오더 전달 · LIS → HIS 환자 조회 · LIS → HIS 검사 결과 전달 · HIS → LIS 오더 취소 전파 · HIS → ERP 직원 SSO · HIS ⇄ edu 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록 · edu ⇄ sign 이수증 서명 · 완료 통지 · ERP ⇄ sign 외주 계약 서명 · 완료 통지 · PACS → sign 판독 서명 · LIS → PACS 병리 워크리스트 — 새 설치본끼리 실제 호출로 확인 2026-09-14 · 나머지는 코드 대조 2026-09-11).
- 설치 요구사항 · 주요 설정 · 한계는 [Clinic 시스템 구성서](../systems/clinic.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
