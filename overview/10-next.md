# 10. 다음 읽을 것

> 🟡 초안 — 시스템 담당 확인 전 · **새 설치본 따라가기 1차 완료**(2026-09-13~16) · 기준: [RELEASES/2026.09 매니페스트](../RELEASES/2026.09/manifest.md)
> [개요서 목차](README.md) · ← [9. 제공 조건](09-terms.md)

> **EN** — Where to go after the overview, by role — hospital director and CIO, IT and infrastructure, clinical informatics, AI governance and legal, integration developers and partners, health authorities and international cooperation agencies. Each row pairs the question that role arrives with, the overview chapters to read first, and the documents to continue into. The chapter also carries a map of every document in this repository with its draft status, points to the glossary for unfamiliar terms, and says what to do on finding something wrong.

---

이 개요서는 전 역할이 함께 읽는 첫 문서입니다. 여기서부터는 역할마다 들고 온 질문에 따라 갈 곳이 갈립니다. 역할과 질문은 [README 「누가 읽나」](../README.md#누가-읽나)의 표를 따릅니다.

## 역할별로

| 역할 | 들고 오는 질문 | 개요서에서 먼저 볼 장 | 다음 문서 |
|---|---|---|---|
| **병원장 · CIO** | 왜 이 구조인가? 무엇을 얻고 무엇을 감수하나? 구축 규모와 비용은? | [2](02-principles.md) · [3](03-layers-and-systems.md) · [8](08-status-and-preparation.md) · [9](09-terms.md) | [F 발표 덱](../deck/) · [구축 가이드 개요](../build-guide/README.md) · [사람 결정 체크리스트](../checklist/decisions.md) · [통합 릴리즈 매니페스트](../RELEASES/2026.09/manifest.md) |
| **전산 · 인프라팀** | 무엇을 어디에 설치하나? 서버 · GPU · DB 요구사항은? | [3](03-layers-and-systems.md) · [6](06-ai.md) · [7](07-build-path.md) · [8](08-status-and-preparation.md) | [구축 가이드 S0 준비](../build-guide/S0-prepare.md) · [S1 코어 HIS](../build-guide/S1-core-his.md) · [시스템 구성서](../systems/)의 「설치 요구사항 · 주요 설정」 · [배포 구성 도식](../diagrams/deployment.md) · [THIRD_PARTY.md](../THIRD_PARTY.md) |
| **의료정보 · 임상 리더** | 진료 흐름이 시스템 사이를 어떻게 지나가나? 병원 규정은 어디서 설정하나? | [2](02-principles.md) · [4](04-patient-journey.md) · [5](05-identity-trust-standards.md) | [환자 여정 스윔레인](../diagrams/patient-journey.md) · [HIS 구성서](../systems/his.md) · [HIS 도메인 목록](../systems/his-domains.md) · [개원 · 운영 단계 체크리스트](../checklist/opening.md) · [데모 시나리오](../scenarios/) · **[화면으로 보는 생태계](../screens/)** |
| **AI · 거버넌스 위원회 · 법무** | AI 가 어디서 무엇을 하나? 어디까지 켜도 되나? 누가 승인하고 무엇이 남나? | [6](06-ai.md) · [9](09-terms.md) · [2 취지 1 · 5 · 7](02-principles.md) | [구축 가이드 S6 AI 계층](../build-guide/S6-ai.md) · [AI 호출 지도](../diagrams/ai-map.md) · **[AI 감독 화면](../screens/his.md)** · [AI Server 구성서](../systems/ai-server.md) · [THIRD_PARTY §3 모델 가중치](../THIRD_PARTY.md#3-ai-모델-가중치) · [의료 면책 고지](../DISCLAIMER.md) |
| **연동 개발자 · 파트너** | 시스템끼리 무슨 프로토콜 · 인증으로 붙나? 무엇이 검증됐나? | [4](04-patient-journey.md) · [5](05-identity-trust-standards.md) · [8](08-status-and-preparation.md) | [연결 상태](../RELEASES/2026.09/compatibility.md) · [연결 지도](../diagrams/connections.md) · [표준 층](../diagrams/standards.md) · [신원 허브](../diagrams/identity-hub.md) · [연동 계약 지도](../integration/) |
| **보건 당국 · 국제 협력 기관** | 자원이 적은 지역에 세울 수 있나? 무엇을 현지에서 준비해야 하나? | [1](01-one-sentence.md) · [3](03-layers-and-systems.md) · [8](08-status-and-preparation.md) · [9](09-terms.md) | [README 「개발도상국에서도 세울 수 있는 수준으로」](../README.md#개발도상국에서도-세울-수-있는-수준으로) · [구축 가이드 「시작 전에 알아야 할 것」](../build-guide/README.md#시작-전에-알아야-할-것--요구사항-요약) · [THIRD_PARTY §4 코드 마스터](../THIRD_PARTY.md#4-코드-마스터기준-데이터) |

- "구축 규모와 비용"은 아직 계측이 없어 수치로 답하지 못합니다. 지금 말할 수 있는 것은 [3장 「서버는 얼마나 필요한가」](03-layers-and-systems.md#서버는-얼마나-필요한가--지금-말할-수-있는-것)와 [8장](08-status-and-preparation.md)의 준비 목록입니다.
- "무엇이 검증됐나"의 답은 지금 **`검증됨` 27** — 목록은 [따라가 본 결과](../build-guide/follow-along-2026-09.md#실제로-호출해-검증됨-을-붙인-연결) 한 곳에 있습니다 → [8장](08-status-and-preparation.md#연결-상태-합계).

## 자료 전체 지도

| 자료 | 무엇 | 상태 |
|---|---|---|
| **A 이 개요서** | 취지 · 구조 · 구축 경로 한 벌 | 🟡 초안 |
| [B 구축 가이드](../build-guide/) | S0 준비 ~ S8 리얼 전환 플레이북 · [따라가 본 결과](../build-guide/follow-along-2026-09.md) | 🟡 초안 · 한 번 따라가 봄(2026-09-13~16) |
| [C 시스템 구성서](../systems/) | 시스템 13개를 같은 틀로 | 🟡 초안 |
| [D 연동 계약 지도](../integration/) | 인증 3방식 · 개통 게이트 · **구축 시 연결 순서** · 매트릭스(자동 생성) | 🟡 초안 |
| E 데모 시나리오([`scenarios/`](../scenarios/)) | 가상 병원으로 환자 여정 · 응급 · 검진 · 입원 → 퇴원 | 🟡 초안 4편 |
| [F 발표 덱](../deck/) | A · E 시각 요약 — 내용 32장(화면 11장 · 따라가기 결과 1장 포함) | 🟡 초안 |
| [화면으로 보는 생태계](../screens/) | 시스템 13장 + 「사람을 넣고 빼는 일」 — **화면 293장**과 설명 | 🟡 초안 |
| [설계 기준은 어떻게 생겼나](../DESIGN-HISTORY.md) | 코어 HIS 릴리즈 108개가 남긴 것 · 판정 규칙 9축 | 🟡 초안 |
| [형제 시스템은 어떻게 자랐나](../DESIGN-HISTORY-SYSTEMS.md) | 나머지 12개 시스템의 릴리즈 기록 666건 · 되풀이된 장면 다섯 | 🟡 초안 |
| [G 구축 체크리스트](../checklist/) | 개원 단계 · Go-Live · 사람 결정 — HIS 레지스트리에서 자동 생성 | ✅ 1차 생성 |
| [H 용어집](../glossary.md) | FHIR · SMART · MWL · TSA · PAdES · DUR · KCD 등 | 🟡 초안 |
| [도식](../diagrams/) | 도식 8종 + 연결 지도(자동 생성) | 🟡 초안 |
| [통합 릴리즈](../RELEASES/2026.09/) | 버전 조합 매니페스트 · 연결 상태 · 시스템별 릴리즈 요약 13 | 🟡 초안 |
| [계측 스냅샷](../data/) | 규모 · 버전 · 기준 커밋 | ✅ 1차 계측 |

제작 계획과 진행은 [ROADMAP](../ROADMAP.md)에 있습니다.

## 모르는 말이 나오면

[용어집](../glossary.md)에 상호운용 표준 · 영상 · 코드 체계 · 신뢰 · 보안 · 신원 · AI · 임상 · 경영 용어와, 이 자료의 표기(`구현·미검증` · `대응 설계` 등)를 모아 두었습니다.

## 틀린 곳을 찾으면

이 자료는 아직 제작 중입니다. 외부 기여(이슈 · 풀 리퀘스트)를 어떻게 받을지는 정하는 중이며, 정해지면 [README 「참여」](../README.md#참여)에 안내합니다.

---

← [9. 제공 조건](09-terms.md) · [개요서 목차](README.md)
