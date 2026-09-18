# A 취지 · 구조 개요서
**A — Intent and structure: the overview**

> **EN** — The first document to read: it explains **why** the ecosystem is designed this way, **what** it is made of, and **in what order** to build it — in one pass. Written so a hospital director or CIO can read it end to end, with each chapter handing off to the role-specific documents. Every statement is a fact about one version combination (measured 2026-09-11); base commits are pinned in `data/base-commits.json`.


> 🟡 **초안 — 시스템 담당 확인 전 · 새 설치본 따라가기 1차 완료**(2026-09-13~16)
> **기준: [RELEASES/2026.09 매니페스트](../RELEASES/2026.09/manifest.md)** — 이 개요서의 모든 설명은 그 버전 조합(계측일 2026-09-11 · 기준 커밋은 [`data/base-commits.json`](../data/base-commits.json)에 고정)에서의 사실입니다.

AI 기반 HIS 를 세우려는 의료기관이 **취지(왜) · 구조(무엇으로) · 구축(어떤 순서로)** 을 한 벌로 이해하도록 쓴 첫 문서입니다. 병원장 · CIO 가 처음부터 끝까지 읽을 수 있게 썼고, 각 장 끝에서 역할별 상세 문서로 이어집니다.

---

## 목차

| 장 | 제목 | 이 장이 답하는 것 |
|---|---|---|
| 1 | [한 문장 — AI 시대의 병원을 위한 13개 시스템의 생태계](01-one-sentence.md) | 이것은 무엇이고, 왜 만들었나. 이 저장소에 있는 것과 없는 것 |
| 2 | [취지 8가지](02-principles.md) | 설계 원칙마다 제품에서 보이는 곳, 기관이 얻는 것과 감수하는 것 |
| 3 | [계층 구조와 시스템 13](03-layers-and-systems.md) | 7계층 · 13개 시스템의 정의 · 버전 · 구현 상태 · 규모 · 서버 규모 |
| 4 | [환자 한 명의 여정](04-patient-journey.md) | 예약부터 원격 상담까지, 시스템 경계마다의 연결 상태 |
| 5 | [신원 · 신뢰 · 표준](05-identity-trust-standards.md) | 직원 신원은 HIS 에서, 서명은 sign 에서, 연결은 표준으로 |
| 6 | [AI 는 한 곳에서, 판단은 사람이](06-ai.md) | GPU 한 장 · `local_only` · 초안과 승인 · 끄고 시작해 결정으로 켜기 · 모델 약관 |
| 7 | [구축은 이렇게 진행된다](07-build-path.md) | S0~S8 한 장 · 단계별 사람 결정 · 체크리스트 셋 |
| 8 | [지금 구현 상태와 구축 기관이 준비할 것](08-status-and-preparation.md) | `검증됨` 27 · 연결 상태 합계 · 시스템별 상태 · 준비 목록 |
| 9 | [제공 조건 — MIT · 의료 면책 · MIT 가 덮지 않는 것](09-terms.md) | 라이선스 세 겹 · 면책 · 제3자 서버 · 모델 · 코드 마스터 |
| 10 | [다음 읽을 것](10-next.md) | 역할별로 이어 읽을 문서 |

## 바쁜 분을 위한 읽는 순서

| 시간이 있다면 | 읽을 장 |
|---|---|
| 한 장만 | [1](01-one-sentence.md) |
| 결정을 앞두고 | [1](01-one-sentence.md) → [2](02-principles.md) → [8](08-status-and-preparation.md) → [9](09-terms.md) |
| 구축을 앞두고 | [3](03-layers-and-systems.md) → [6](06-ai.md) → [7](07-build-path.md) → [8](08-status-and-preparation.md) → [구축 가이드](../build-guide/) |

## 이 개요서의 기준

| 기준 | 값 |
|---|---|
| 버전 조합 | [통합 릴리즈 초안 매니페스트](../RELEASES/2026.09/manifest.md) · 번호 미정 · 계측일 2026-09-11 |
| 연결 상태 | [연결 상태](../RELEASES/2026.09/compatibility.md) · 코드 대조 2026-09-11 · **그중 27개는 새 설치본끼리 실제 호출 확인**(`검증됨` · HIS ⇄ sign · HIS ⇄ LIS · HIS ⇄ ERP · HIS ⇄ edu · edu ⇄ sign · ERP ⇄ sign · PACS → sign · LIS → PACS · LIS → ERP · 2026-09-14~15 → [따라가 본 결과](../build-guide/follow-along-2026-09.md)) |
| 규모 수치 | [계측 스냅샷](../data/scale-snapshot.json) · 계측일 2026-09-11 · 값 · 센 방법(`rule`) · 기준 커밋 |
| 체크리스트 수치 | [구축 체크리스트](../checklist/) · HIS v4.18.0 레지스트리 · 기준 커밋에서 추출(추출일은 생성물에 있음) |
| 사실 확인 | 생태계 자료 측 조사 기준 · 시스템 담당 확인 전 |
| 구축 절차 | [구축 가이드](../build-guide/) 초안 · **새 설치본으로 한 번 따라가 봄**(2026-09-13~16 · 개발 PC · GPU 없음) · 남은 확인 필요 22곳 |

## 이 개요서의 표기 약속

- **수치**는 값 · 센 방법 · 계측일을 함께 적습니다. 공개 자료에 없는 수치는 새로 만들지 않고, 계측이 없는 것은 "아직 계측이 없다"고 적습니다.
- **연결 상태**는 [연결 상태](../RELEASES/2026.09/compatibility.md)의 값만 옮깁니다 — `검증됨`(확인일 필수) · `구현·미검증` · `설계만` · `미구현` · `중단`, 그리고 코드만으로 정할 수 없는 `판정 불가`.
- **구현 상태**는 매니페스트의 값만 옮깁니다 — `개발` · `통합` · `파일럿` · `운영`, 단계 밖의 `중단` · `확인 필요`.
- **AI** 는 "보조한다 · 초안을 만든다"로 씁니다. 진단 · 판단은 사람이 합니다.
- **규제**는 `대응 설계` · `자체 점검 완료` · `외부 인증·승인`(증빙 번호가 있을 때만) 세 단계로만 씁니다.
- **인증 방식**은 README 수준(방식의 계열과 키 관리 책임)까지만 적습니다. 세부는 연동 계약 지도와 시스템 구성서에서 다룹니다.
- 특정 기관을 알아볼 수 있는 정보는 싣지 않습니다. 데모는 가상 병원 데이터입니다.

---

[README](../README.md) · [ROADMAP](../ROADMAP.md) · [용어집](../glossary.md) · [의료 면책 고지](../DISCLAIMER.md)
