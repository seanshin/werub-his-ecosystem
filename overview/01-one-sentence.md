# 1. 한 문장 — AI 시대의 병원을 위한 13개 시스템의 생태계

> 🟡 초안 — 시스템 담당 확인 전 · **새 설치본 따라가기 1차 완료**(2026-09-13~16) · 기준: [RELEASES/draft 매니페스트](../RELEASES/draft/manifest.md)
> [개요서 목차](README.md) · 다음 → [2. 취지 8가지](02-principles.md)

> **EN** — The one-sentence version: **thirteen systems that together run one hospital, wired so that AI assists and people decide, published openly so an institution can stand it up with modest resources.** This chapter unpacks that sentence phrase by phrase, then says why it was built — licence fees, dedicated hardware and vendor lock-in still leave institutions running on paper and spreadsheets. It also draws the line between what this repository holds (the materials: this overview, the build guide, system briefs, checklists, diagrams, glossary, and measured scale snapshots) and what it does not (source code, which is linked per system; AI model weights; national code masters; and anything identifying a real institution).

---

## 한 문장

**병원 하나를 돌리는 데 필요한 13개 시스템을, AI 는 보조하고 판단은 사람이 하는 구조로 엮어, 적은 자원으로도 세울 수 있게 오픈 형태로 내놓는 생태계입니다.**

## 한 문장을 풀어 쓰면

| 말 | 뜻 |
|---|---|
| **병원 하나를 돌리는 데 필요한** | 진료 기록만이 아닙니다. 접수 · 처방 · 검사 · 영상 · 약제 · 수납 · 청구 · 회계 · 인사 · 교육까지 병원의 일이 정보시스템 위에서 이어져야 합니다 |
| **13개 시스템** | 코어 HIS 를 가운데 두고 환자 접점 · 임상 부서 · 신뢰 · 경영 · AI · 협업·교육의 7계층으로 나뉩니다 → [3장](03-layers-and-systems.md) |
| **AI 는 보조, 판단은 사람** | AI 연산은 기관 안의 AI Server 한 곳이 맡습니다. AI 는 초안과 제안을 만들고, 사람이 승인해야 정본(진료기록)이 됩니다 → [6장](06-ai.md) |
| **적은 자원으로도** | 무료로 받을 수 있는 공개 구성요소로 짜고, AI 는 소비자용 GPU 한 장(RTX 5080 · 16GB)을 기준으로 개발했습니다. 13개를 한꺼번에 세울 필요 없이 필요한 것부터 붙입니다 |
| **오픈 형태로** | 이 저장소는 [MIT](../LICENSE)입니다. 생태계 소프트웨어도 MIT 로 제공하는 것이 목표이지만, 각 소스 저장소의 라이선스 표기는 아직 정리 중입니다 → [9장](09-terms.md) |
| **생태계** | 시스템마다 독립적으로 동작하고, 표준 프로토콜(FHIR · DICOM · HL7 v2)과 정해진 연결로 서로 맞물립니다. 이미 쓰는 시스템(예: 기존 PACS)을 그대로 연결하는 선택도 있습니다 |

## 왜 만들었나

병원 정보시스템을 갖추는 일은 여전히 크고 비싼 사업입니다. 라이선스 비용, 전용 하드웨어, 특정 업체에 묶이는 구조 때문에 정보시스템 없이 종이와 엑셀로 버티는 의료기관이 세계 곳곳에 있습니다.

이 생태계는 그 문턱을 낮추려고 만들었습니다. 큰 병원만이 아니라 중소 병원, 의원급 기관, 공공 보건기관, 그리고 의료 인프라가 부족한 개발도상국의 의료기관도 **자기 손으로 세우고 운영할 수 있는 것**이 목표입니다([README](../README.md#이-프로젝트가-바라는-것)).

그 목표를 위해 설계에서 줄인 것은 다음과 같습니다.

| 설계 선택 | 줄이는 것 |
|---|---|
| 공개 구성요소(PostgreSQL · Redis · Node.js · Python · Orthanc · Ollama)로 짭니다 | 상용 데이터베이스 · 미들웨어 구매. 다만 구성요소마다 라이선스 조건이 다릅니다 → [9장](09-terms.md) |
| 필요한 시스템부터 붙입니다 | 처음부터 13개를 다 세우는 부담 |
| AI 는 기관 안의 GPU 한 장에서 돌립니다 | 클라우드 AI 사용료, 외부 서비스 의존 |
| 병원 규정 값은 코드가 아니라 설정 화면에서 바꿉니다 | 규정이 바뀔 때마다 개발자를 부르는 일 |

## 이 저장소에 있는 것과 없는 것

| 있는 것 | 없는 것 |
|---|---|
| 취지 · 구조 · 구축을 설명하는 자료(이 개요서 · [구축 가이드](../build-guide/) · [시스템 구성서](../systems/) · [구축 체크리스트](../checklist/) · [도식](../diagrams/) · [용어집](../glossary.md)) | **소스 코드** — 각 시스템 저장소로 가는 링크를 둡니다(링크는 정리 중) |
| 이 자료가 설명하는 버전 조합([통합 릴리즈 초안](../RELEASES/draft/manifest.md))과 연결 상태([연결 상태](../RELEASES/draft/compatibility.md)) | **AI 모델 가중치** — 기관이 모델마다 약관을 읽고 직접 받습니다 |
| 규모 계측 스냅샷([data/](../data/)) — 값 · 센 방법 · 계측일 | **코드 마스터**(약품 · 진단 · 수가 · 검사 코드) — 기관이 각 나라 배포 기관에서 직접 받습니다 |
| 제3자 구성요소 목록([THIRD_PARTY.md](../THIRD_PARTY.md))과 [의료 면책 고지](../DISCLAIMER.md) | 특정 기관을 알아볼 수 있는 정보 |

## 이 개요서가 답하는 세 가지

| 질문 | 장 |
|---|---|
| **취지** — 왜 이렇게 설계했는가 | [2. 취지 8가지](02-principles.md) |
| **구조** — 무엇으로 이루어졌고 어떻게 이어지는가 | [3. 계층 구조와 시스템 13](03-layers-and-systems.md) · [4. 환자 한 명의 여정](04-patient-journey.md) · [5. 신원 · 신뢰 · 표준](05-identity-trust-standards.md) · [6. AI 는 한 곳에서, 판단은 사람이](06-ai.md) |
| **구축** — 어떤 순서로 세우고, 무엇을 준비하고, 어떤 조건으로 받는가 | [7. 구축은 이렇게 진행된다](07-build-path.md) · [8. 지금 구현 상태와 구축 기관이 준비할 것](08-status-and-preparation.md) · [9. 제공 조건](09-terms.md) |

## 이 자료를 읽을 때의 기준

- **모든 설명은 한 버전 조합에서의 사실입니다.** 기준은 [통합 릴리즈 초안 매니페스트](../RELEASES/draft/manifest.md)(계측일 2026-09-11 · 기준 커밋은 [`data/base-commits.json`](../data/base-commits.json)에 고정)입니다. 다른 버전에서는 사실이 다를 수 있습니다.
- **데모는 가상 병원 데이터로 보여 줍니다.** 자료에 나오는 병원 · 환자 · 직원 · 진료 기록은 모두 시연용으로 만든 것입니다.
- **수치에는 값 · 센 방법 · 계측일을 함께 적습니다.** 계측하지 않은 것(권장 사양 · 처리량 · 응답 시간)은 "충분하다"고 쓰지 않고 "아직 계측이 없다"고 적습니다. 따라가기에서 잰 메모리 · 디스크는 **기준 장비가 아닌 개발 PC 의 참고값**으로만 싣습니다.
- **사실 확인은 생태계 자료 측 조사 기준입니다.** 새 설치본으로 구축 절차를 따라가 보는 일은 **1차를 마쳤고**(2026-09-13~16 · 개발 PC 한 대 · GPU 없음 · 격리 네트워크 → [따라가 본 결과](../build-guide/follow-along-2026-09.md)), 각 시스템 담당의 확인은 아직 남아 있습니다([ROADMAP](../ROADMAP.md) P1 · P4).

---

다음 → [2. 취지 8가지](02-principles.md)
