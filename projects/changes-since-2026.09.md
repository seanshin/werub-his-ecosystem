# 통합 릴리즈 `2026.09` 이후 달라진 점 — 한곳에 모음

**What changed after integrated release `2026.09` — in one place**

> **EN** — These materials have two layers with two reference points. The **project introductions** read each project's current development line (2026-09-29). The **reference documents** — system briefs, build guide, connection table, overview, deck — are pinned to integrated release `2026.09` (HIS v4.18.0, 2026-09-11) and were not rewritten. Where a reference document says something that is no longer true of the current code, it now carries a one-line note pointing here. This page lists every such difference: which projects moved, and which sentences in the reference layer are affected. Eight of the thirteen projects have not moved at all.

이 자료는 **두 층**으로 되어 있고, 기준 시점이 서로 다릅니다.

| 층 | 무엇 | 기준 시점 |
|---|---|---|
| **소개서** | [프로젝트 소개서](README.md) 13편 | 각 저장소의 **현재 개발본**(2026-09-29 에 읽음) |
| **참고 문서** | [구성서](../systems/) · [구축 가이드](../build-guide/) · [연결 상태 표](../RELEASES/2026.09/compatibility.md) · [개요서](../overview/) · [덱](../deck/) | **통합 릴리즈 `2026.09`**(HIS v4.18.0 · 2026-09-11) — 고정 |

참고 문서는 고치지 않고 그대로 둡니다. 그 시점의 사실로는 맞기 때문입니다. 대신 **지금 코드와 다른 문장 바로 아래에 「🔄 현재 개발본에서는 달라졌습니다」 한 줄**을 달아 이 문서로 이어지게 했습니다. 참고 문서 전체를 현재로 옮길지는 따로 정할 일입니다.

---

## 1. 어느 프로젝트가 움직였나

> **EN** — Five of the thirteen moved (HIS and the two apps in its repository, sign, AI Server); eight are exactly at their release commit.

| 프로젝트 | 통합 릴리즈 이후 | 자세히 |
|---|---|---|
| **HIS** | 485커밋 — 그중 7커밋만 v4.19.0 으로 발행 · **478커밋은 번호 없는 개발본** | [HIS 소개서 9절](his.md#9-통합-릴리즈-202609-이후-달라진-점) |
| 공개 홈페이지 | HIS 저장소 커밋 중 홈페이지를 건드린 9개 | [소개서 9절](homepage.md#9-통합-릴리즈-202609-이후-달라진-점) |
| 환자 앱 | HIS 저장소 커밋 중 앱을 건드린 7개 | [소개서 9절](patient-app.md#9-통합-릴리즈-202609-이후-달라진-점) |
| sign | 2커밋(콘솔 로그인 · 빌드 모드) · 서명 서비스 코드는 그대로 | [소개서 9절](sign.md#9-통합-릴리즈-202609-이후-달라진-점) |
| AI Server | 37커밋 · 코드 버전 2.125.41 → 2.125.56 | [소개서 9절](ai-server.md#9-통합-릴리즈-202609-이후-달라진-점) |
| LIS · PACS · ERP · twin · cerno · edu · Clinic · Jitsi | **없음** — 현재 개발본 = 통합 릴리즈 기준 커밋 | 각 소개서 9절 |

## 2. 참고 문서의 어느 문장이 달라졌나

> **EN** — The sentences in the reference layer that no longer match the current code. Most concern installing HIS: there is now an install script and a first-administrator tool, the production compose file now includes schema setup and the sentinel, the AI server address can be set by environment variable, and backups now include uploaded files. Each affected sentence carries a note.

| 주제 | 참고 문서가 말하는 것(통합 릴리즈 기준) | 현재 개발본 | 참고 문서의 자리 |
|---|---|---|---|
| **HIS 새 설치** | 저장소의 운영용 compose · Dockerfile 이 그대로는 동작하지 않았고, 따라가기에서 우회했습니다 | **빈 서버 설치 스크립트(7단계)** 가 생겼습니다. 운영용 compose 도 고쳐졌지만 저장소가 스스로 「끝까지 기동해 본 기록은 없고 검증된 정본은 설치 스크립트」라고 적습니다. 설치 스크립트도 로컬 컨테이너에서 한 번 돌려 본 것이고 실제 빈 서버에서는 아직입니다 | [README](../README.md#지금-알고-시작해야-할-것) · [S1](../build-guide/S1-core-his.md) |
| **HIS 스키마 적용** | 새 DB 에 `prisma db push` 로 반영합니다 | **새 설치는 마이그레이션(`prisma migrate deploy` · 기준선 포함 18개)** 입니다. 기존 운영 서버를 갱신하는 배포 스크립트만 여전히 `db push` 를 씁니다 | [S1](../build-guide/S1-core-his.md) |
| **HIS 첫 관리자** | 기본 시드(가상 병원 데이터 · 공용 비밀번호)로만 만들 수 있습니다 | **첫 관리자 생성 도구**가 생겼습니다(빈 DB 에서만 · 비밀번호 12자 이상). 컨테이너 설치에서는 한 번만 도는 서비스로 부릅니다 | [S1](../build-guide/S1-core-his.md) · [S8](../build-guide/S8-go-real.md) · [HIS 구성서](../systems/his.md) |
| **HIS 상시 감시자** | 운영 compose 에 감시자가 없어 따로 띄웁니다 | 운영 compose 에 **감시자 서비스가 들어갔습니다**(compose 로 끝까지 기동한 기록은 없음) | [README](../README.md#지금-알고-시작해야-할-것) · [S7](../build-guide/S7-rehearsal.md) · [HIS 구성서](../systems/his.md) |
| **HIS 백업** | 백업 스크립트는 HIS DB 하나만 뜹니다 | **업로드 파일도 같은 시각에 암호화 아카이브**로 남기고, 2차 사본 · 복원 시험 스크립트가 생겼습니다. 같은 서버의 다른 DB 는 여전히 **따로 지정**해야 포함됩니다 | [README](../README.md#지금-알고-시작해야-할-것) · [S8](../build-guide/S8-go-real.md) |
| **HIS AI 서버 주소** | 설정 화면으로도 환경 변수로도 바뀌지 않아 DB 에서 바꿉니다 | **환경 변수(`AI_SERVER_URL`)로 바꿀 수 있습니다.** 설정 화면에서 바꿀 수 없게 막아 둔 것은 그대로입니다. 기본 시드가 AI 설정을 DB 에 심던 것도 없어졌습니다 | [README](../README.md#지금-알고-시작해야-할-것) · [S6](../build-guide/S6-ai.md) |
| **HIS 규모** | 데이터 모델 562 · API 핸들러 3,251 · 웹 화면 450 · 메뉴 266 · 결정 등록부 56 | 573 · 3,323 · 456 · **272** · **156** | 구성서 · 개요서 3장 · 메뉴 구성표 · 체크리스트 |
| **HIS 리얼 모드** | (따로 적지 않음) | 보안 설정이 비어 있으면 **부팅 거부** · 운영 모드를 정하지 않으면 리얼 | — |
| **공개 홈페이지 빌드** | 운영 중인 공개 사이트 | 기준 커밋의 홈페이지 앱은 **첫 화면 4장의 구문 오류로 빌드가 멈추는 상태**였고, 현재 개발본에서 고쳐졌습니다 | [홈페이지 구성서](../systems/homepage.md) |
| **환자 앱 동의서 서명** | HIS 를 거쳐 sign 이 처리합니다 | 현재 개발본 코드를 읽은 결과, 앱의 동의서 서명은 **이름을 입력해 HIS 에 기록하는 방식**이고 sign 의 인증서 서명 경로가 아닙니다 | [환자 앱 구성서](../systems/patient-app.md) |
| **AI Server 시간대 프로파일** | 시간대별 운영 프로파일을 적용할 수 있습니다 | **자동 적용이 기본 꺼짐**이 됐습니다(상주 모델 정책과 부딪혀 실제로 적용되지 않았음). 수동 적용은 그대로입니다 | [AI Server 구성서](../systems/ai-server.md) |
| **형제 시스템 연동** | [연결 상태 표](../RELEASES/2026.09/compatibility.md)의 상태 | HIS · AI Server 의 연동 코드가 여러 곳 고쳐졌습니다. **연결 상태 표는 바꾸지 않았습니다** — 다시 불러 확인하기 전에는 상태를 옮기지 않습니다 | 연결 상태 표 · 연결 카드 |

## 3. 이 문서를 읽을 때

> **EN** — How to read this page.

- **소개서가 현재, 참고 문서가 통합 릴리즈 시점**입니다. 둘이 다르면 소개서를 먼저 보십시오.
- 「실제로 연결해 확인했다」는 표시는 모두 **통합 릴리즈 시점의 설치본**에서 한 것입니다. 현재 개발본으로 다시 부른 것은 없습니다.
- 수치는 센 방법이 같을 때만 나란히 적었습니다(센 방법은 [HIS 소개서의 근거 절](his.md#이-문서의-근거)).
