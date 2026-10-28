<div align="center">

# WeRU.B HIS Ecosystem

**AI 기반 병원정보시스템(HIS)을 오픈 형태로 — 적은 자원으로도 세울 수 있게**
<br>*An open ecosystem for AI-assisted hospital information systems — buildable with modest resources*

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Systems](https://img.shields.io/badge/systems-13-informational.svg)](#시스템-13)
[![Release](https://img.shields.io/badge/release-2026.09-success.svg)](RELEASES/2026.09/RELEASE.md)
[![Not a medical device](https://img.shields.io/badge/medical%20device-no-lightgrey.svg)](DISCLAIMER.md)

[프로젝트 소개서](projects/) · [구축 가이드](build-guide/) · [소스 받기](SOURCES.md) · [전체 안내](ABOUT.md) · [로드맵](ROADMAP.md)

</div>

> **EN** — Thirteen systems that together run a hospital — a core HIS, a public website, a patient app, laboratory, imaging, e-signature, back-office, AI and collaboration services — documented so that an institution can understand them and build them with modest resources. AI **assists and drafts**; a person approves before anything becomes the record. This repository holds the introductions, the build guide and the release record; each system's source is published as a separate MIT-licensed public edition, linked below.

## 한눈에

| | |
|---|---|
| **무엇** | 병원 하나를 돌리는 **13개 시스템**을 한 벌로 세우는 생태계 |
| **AI 는** | 기관 안 GPU 한 장에서 돌고, **보조만 합니다** — 초안과 제안을 만들고 사람이 승인해야 정본이 됩니다 |
| **지금** | 시스템 사이 연결 113개 중 **27개를 실제로 불러 확인**했습니다(2026-09-14~15) · [따라가 본 결과](build-guide/follow-along-2026-09.md) |
| **소스** | 시스템마다 공개판 저장소(MIT) — 아래 표의 소스 칸 · [소스 받기](SOURCES.md) |

## 시스템 13
**The 13 systems**

> **EN** — One row per system: its layer, what it does, its introduction, and its source. The source column is generated from the publication status — an opened public edition links to its repository and version; the others say "in preparation" and carry no link yet.

<!-- 시스템 표: 생성물 시작 — tools/build-sources.mjs 가 data/public-sources.json 에서 만든다. 손으로 고치지 않는다 -->

| 계층 | 시스템 | 하는 일 | 소개서 | 소스 |
|---|---|---|---|---|
| 코어 | **HIS** | 외래 · 입원 · 수술 · 응급 · 검사 · 약제 · 검진 · 원무를 묶는 병원 업무의 중심 · 생태계의 신원 허브 | [소개서](projects/his.md) | 준비 중 |
| 환자 접점 | **공개 홈페이지** | 병원 소개 · 예약 · 안내 — 환자가 처음 만나는 바깥 창구 | [소개서](projects/homepage.md) | 준비 중 |
| 환자 접점 | **환자 앱** | 예약 · 결과 열람 · 동의 · 문진을 환자 손안에서 | [소개서](projects/patient-app.md) | 준비 중 |
| 임상 부서 | **LIS** | 진단검사 · 미생물 · 병리 · 수혈 · 유전체 검사정보시스템 | [소개서](projects/lis.md) | [werub-lis](https://github.com/seanshin/werub-lis) `v1.56.18-public.3` |
| 임상 부서 | **PACS** | 영상 저장 · 뷰어 · 판독 워크플로 | [소개서](projects/pacs.md) | [werub-pacs](https://github.com/seanshin/werub-pacs) `v13.48` |
| 신뢰 | **sign** | 자체 PKI · 타임스탬프 · 장기 검증 전자서명 | [소개서](projects/sign.md) | [werub-sign](https://github.com/seanshin/werub-sign) `v1.30.1` |
| 경영 | **ERP** | 재무회계 · 원가 · 인사급여 · 자재 · 보험청구 | [소개서](projects/erp.md) | [werub-erp](https://github.com/seanshin/werub-erp) `v1.306.1` |
| AI | **AI Server** | 기관 안 GPU 한 장으로 도는 AI — 분류 · 요약 · DUR · RAG · 음성 인식 보조 | [소개서](projects/ai-server.md) | [werub-ai-server](https://github.com/seanshin/werub-ai-server) `v2.125.73` |
| AI | **twin** | 환자 · 병원 운영의 위험을 미리 보여 주는 디지털 트윈 | [소개서](projects/twin.md) | [werub-twin](https://github.com/seanshin/werub-twin) `v1.20.72-19-g526b4f9` |
| AI | **cerno** | 근거가 있을 때만 답하는 의료진별 임상 질의 도우미 | [소개서](projects/cerno.md) | [werub-cerno](https://github.com/seanshin/werub-cerno) `v0.1.8-public.2` |
| 협업 · 교육 | **Clinic** | 인수인계 · 근무표 · 알림 · 결재 그룹웨어 | [소개서](projects/clinic.md) | [werub-clinic](https://github.com/seanshin/werub-clinic) `v1.4.0` |
| 협업 · 교육 | **edu** | 직원 이러닝 · 법정교육 · 전자 이수증 | [소개서](projects/edu.md) | [werub-edu](https://github.com/seanshin/werub-edu) `v2.7.0` |
| 협업 · 교육 | **Jitsi** | 원격진료 화상(자체 호스팅) | [소개서](projects/jitsi.md) | [werub-jitsi](https://github.com/seanshin/werub-jitsi) `v2.10.0-9-g0984fbe` |

소스는 시스템마다 **공개판 저장소**(MIT)로 하나씩 엽니다 — 지금 **10/11곳**. HIS · 공개 홈페이지 · 환자 앱은 한 저장소입니다. 받는 법과 기준 판은 [소스 받기](SOURCES.md), 공개판에서 무엇을 뺐는지는 각 저장소의 `PUBLIC-EDITION.md` 에 있습니다.

<!-- 시스템 표: 생성물 끝 -->

## 처음 읽는다면
**Where to start**

> **EN** — Three steps: the introduction of the project you care about, then the functions by kind of work, then the build guide.

| | 읽을 것 | 얻는 것 |
|:---:|---|---|
| **1** | [프로젝트 소개서](projects/) — [HIS](projects/his.md)부터 | 무엇인지 · 누가 쓰는지 · 어떻게 만들어졌는지 · 무엇이 아직인지 |
| **2** | [업무별 기능 지도](functions/) · [주요 기능 상세](functions/detail/) | 외래 · 병동 · 검사 · 약 · 원무로 본 기능과 「왜 그렇게 만들었나」 |
| **3** | [구축 가이드](build-guide/) · [따라가 본 결과](build-guide/follow-along-2026-09.md) | 세우는 순서 · 사람이 정할 것 · 실제로 막힌 곳 |

모르는 말은 [용어 풀이](projects/terms.md), 소개서와 다른 문서가 다르게 말하면 [달라진 점](projects/changes-since-2026.09.md)을 보십시오.

## 문서 지도
**Document map**

> **EN** — Where to look, by what you want to know.

| 알고 싶은 것 | 문서 |
|---|---|
| 취지 · 설계 원칙 · 흐름 · AI · 규모까지 한 번에 | [전체 안내](ABOUT.md) |
| 경영진 · CIO 용 | [개요서](overview/) 11장 · [발표 덱](deck/) |
| 진료하는 사람 용 | [진료하는 사람을 위한 안내](clinicians/) |
| 시스템마다 무엇으로 이루어졌나 | [시스템 구성서](systems/) · [화면](screens/) |
| 시스템이 어떻게 맞물리나 | [연동 지도](integration/) · [연결 상태 표](RELEASES/2026.09/compatibility.md) |
| 어떻게 세우나 | [구축 가이드](build-guide/) · [체크리스트](checklist/) |
| 무엇을 받나 | [소스 받기](SOURCES.md) · [통합 릴리즈 `2026.09`](RELEASES/2026.09/RELEASE.md) · [제3자 구성요소](THIRD_PARTY.md) |
| 왜 이렇게 까다로운가 | [설계 기준은 어떻게 생겼나](DESIGN-HISTORY.md) · [형제 시스템은 어떻게 자랐나](DESIGN-HISTORY-SYSTEMS.md) |

## 프로젝트 소개서 — 13개를 하나씩
**Project introductions — one per project**

> **EN** — A short summary of each project, taken from section 1 of its introduction. Open the one you need.

<details>
<summary><b>13개 프로젝트 요약 펼치기</b> — 각 소개서 1절에서 만든 요약</summary>

<!-- 프로젝트 요약: 생성물 시작 — tools/build-project-digest.mjs 가 소개서 1절에서 만든다. 손으로 고치지 않는다 -->

### HIS — 병원 업무의 중심 시스템 · [소개서](projects/his.md)

> **EN** — HIS runs the day-to-day work of a hospital in one system and is the hub every other system in the ecosystem connects to. At a glance: usable now for trial installs and review, but real operation still needs the hospital's own code masters, code edits for the hospital name and a separate path for claims to insurers; it runs on one server with no other system required.

**HIS 는 병원의 하루 업무(접수부터 진료 · 검사 · 약 · 수납 · 경영지원까지)를 한 시스템에서 처리하고, 생태계의 다른 시스템이 모두 붙는 중심입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | **조건부.** 시험 설치와 기능 검토는 지금 됩니다. 실운영에는 코드 마스터 반입 · 병원 이름을 코드에서 고치기 · 보험 청구 전송을 따로 마련하기가 필요합니다(소개서 §8) |
| **세워야 하는 것** | 서버 한 대(GPU 없음)에 API 서버 · 직원 웹 · 상시 감시자(별도 프로세스) · PostgreSQL 16 · Redis 7 · PDF 렌더러(별도 컨테이너) |
| **먼저 있어야 할 것** | 다른 시스템은 없어도 됩니다. 기관이 준비할 것은 코드 마스터(약가 · 진단 · 수가 · 검사) · 기관 정보 · 부서 · 병상 · 직원 · 필수 설정 · 운영 모드 결정입니다 |
| **받을 코드** | **현재 개발본을 받습니다**(v4.19.0 이후 · 아직 버전 번호 없음). 새 설치 스크립트가 여기에만 있기 때문입니다. 통합 릴리즈 코드(v4.18.0)로 세우려면 [구축 가이드 S1](build-guide/S1-core-his.md)의 우회 순서를 따릅니다 · [소스 받기](SOURCES.md). 세운 뒤 다음 판으로 올리는 절차는 저장소가 아직 정하지 않았습니다(소개서 §6) |
| **실제로 확인된 것** | 2026년 9월 시험 설치(통합 릴리즈 코드 · 가상 데이터)에서 LIS · sign · ERP · edu 연결 일부를 실제로 불러 확인했습니다. 다만 LIS 는 HIS 기본 검사 코드 15개 중 3개만 매핑돼 있었고, 현재 개발본으로는 다시 부르지 않았습니다(소개서 §5) |
| **아직 모르는 것** | 사용자 수에 맞춘 서버 사양 · 빈 서버에서의 설치 · 운영용 컨테이너 구성(compose)으로 끝까지 띄우기 · 서버 이중화와 복구 목표 시간 · 이관에 걸리는 시간 · HIS 가 멈췄을 때 다른 시스템의 동작 |

### 공개 홈페이지 — 병원의 바깥 창구 · [소개서](projects/homepage.md)

> **EN** — The public website shows the hospital to the outside world and helps patients book, drawing everything except the hospital's name, contact and address from HIS. At a glance: usable only with HIS already running, after editing the hospital's details in code and building one image per institution — and it must be built from the current development line, because the release's code does not build.

**공개 홈페이지는 병원을 바깥에 소개하고 환자의 예약을 돕는 웹사이트이며, 보여 주는 내용은 병원 이름 · 연락처 · 주소를 빼고 모두 HIS 에서 가져옵니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | **조건부.** HIS 가 먼저 돌고 있어야 하고, 병원 이름 · 연락처 · 주소를 코드에서 고친 뒤 기관마다 따로 빌드해야 합니다(소개서 §8) |
| **세워야 하는 것** | Node 22 로 도는 웹 서버 하나 — 컨테이너 · 프로세스 관리자 · 관리형 호스팅 중 하나로 띄웁니다. 데이터베이스 · 캐시 · GPU 는 없습니다 |
| **먼저 있어야 할 것** | HIS(공개 API · 환자 포털 인증 · 홈페이지 관리 화면) · HIS 에 넣은 콘텐츠 · 기관의 개인정보처리방침 · 이용약관 · 비급여 고지 문안 · 빌드 결과를 올릴 발행 대상 |
| **받을 코드** | **통합 릴리즈 코드로는 빌드가 멈춥니다**(첫 화면 4장의 구문 오류). HIS 저장소 **현재 개발본**의 `apps/homepage` 를 받습니다 · [소스 받기](SOURCES.md). [구축 가이드 S2](build-guide/S2-patient-access.md)는 설정 순서로 참고합니다 |
| **실제로 확인된 것** | 없음. 2026년 9월 시험 설치에서 이 앱은 설치하지 않았고, HIS 와의 두 연결은 코드를 읽어 판정한 것입니다 |
| **아직 모르는 것** | 방문자 규모에 맞춘 사양 · 콘텐츠 전송망이 필요한지 · 예약 대화를 얼마나 보관하는지 · 즉시 반영이 실패했을 때 관리 화면이 어떻게 보여 주는지 |

### 환자 앱 — 환자 손안의 병원 기록 · [소개서](projects/patient-app.md)

> **EN** — The patient app lets patients see their own record and handle bookings, consents and questionnaires on their phone, through HIS. At a glance: not usable by patients today — it is not in any app store, patient sign-up is closed by default, and HIS has no desk-side way for staff to create an account; the web portal in HIS needs the same account, so an institution must first contract identity verification or ask for a desk-side issuing feature.

**환자 앱은 환자가 휴대전화로 자기 진료 기록을 보고 예약 · 동의서 · 문진 같은 일을 처리하는 앱이며, 모든 데이터를 HIS 에서 받습니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | **아니오.** 스토어에 배포된 앱이 없고, 기본 설정에서 환자 가입이 닫혀 있으며, 직원이 환자 계정을 만들어 주는 기능도 없습니다. HIS 의 웹 환자 포털도 같은 계정을 쓰므로 같은 제약을 받습니다(소개서 §8) |
| **세워야 하는 것** | 서버는 HIS 외에 없습니다. 앱을 빌드(Node · Expo SDK 56)해 스토어나 기관 배포 경로로 내보내는 일이 따로 있습니다 |
| **먼저 있어야 할 것** | HIS(환자 인증 · 환자 포털 켜짐) · 스토어 계정 · 앱 식별자 · 서명 키 · 스토어 빌드 설정(모두 저장소에 없음) · 배포 여부 · 알림의 적법 근거 · 본인인증 방식의 결정 |
| **받을 코드** | HIS 저장소 **현재 개발본**의 `apps/mobile` · [소스 받기](SOURCES.md). 통합 릴리즈 코드에서는 담당의 메시지 답장이 보내지지 않습니다(소개서 §9). 빌드 때 HIS 주소를 꼭 지정합니다(소개서 §6) |
| **실제로 확인된 것** | 없음. 2026년 9월 시험 설치에서 앱은 설치하지 않았고, 실기기 화면 시험도 없습니다 |
| **아직 모르는 것** | 스토어 심사와 의료 앱 규제 요건 · 웹 포털과의 화면별 차이 |

### LIS — 검사실의 업무 시스템 · [소개서](projects/lis.md)

> **EN** — LIS runs the laboratory's work from order to verified result across five fields, and exchanges orders and results with HIS over FHIR. At a glance: usable with HIS in place once test codes are mapped and the laboratory has signed its reference and critical values; the main HIS links were confirmed in September 2026 with one test (TSH) flowing from order to verified result and cancellation, while an unmapped blood-count order was held with an alert — only 3 of 15 starter test codes were mapped — three HIS links still unconfirmed, and an install script that needs manual steps.

**LIS 는 진단검사 · 미생물 · 병리 · 수혈 · 유전체 검사의 전 과정을 처리하는 검사실 시스템이며, HIS 에서 검사 처방을 받아 검증된 결과를 돌려줍니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | **조건부.** HIS 가 먼저 있어야 하고, 개시 전에 검사 코드 매핑과 참고치 · 위험치 서명을 끝내야 합니다. 장비 결과를 자동으로 받으려면 중계 장치나 파일 반입이 필요합니다(소개서 §8) |
| **세워야 하는 것** | Docker 호스트 하나에 컨테이너 셋(PostgreSQL 16 · API · 웹)과, 서버의 예약 작업으로 도는 매일 백업. 캐시 · 메시지 브로커 · GPU 는 없습니다 |
| **먼저 있어야 할 것** | HIS(검사 처방 · 서버 간 자격 · 코드 카탈로그 키) · 검사 코드 매핑 · 검사실과 법무가 서명한 참고치 · 위험치 · 수가 코드 · TLS · DNS · 방화벽 · 백업 저장소 · LIS 직원 계정. PACS · ERP 는 필요할 때 |
| **받을 코드** | LIS 저장소의 현재 개발본은 **통합 릴리즈 코드와 같습니다** · [소스 받기](SOURCES.md). 설치 스크립트는 그대로는 끝나지 않으므로 [구축 가이드 S3](build-guide/S3-clinical-departments.md)의 순서를 함께 봅니다(소개서 §6) |
| **실제로 확인된 것** | 2026년 9월 시험 설치(가상 데이터)에서 HIS 와의 오더 · 취소 · 결과 · 환자 조회 · 코드 반입, PACS 병리 슬라이드 두 경로, ERP 청구를 실제로 불러 확인했습니다. **범위는 검사 하나입니다** — 갑상선기능(TSH) 오더가 LIS 에 접수되고, 결과가 HIS 에서 확정되고, 취소가 전해졌습니다. 매핑이 없는 혈액검사(CBC) 오더는 LIS 가 보류하고 경보를 냈습니다. HIS 기본 검사 코드 15개 중 매핑된 것은 3개였습니다 |
| **아직 모르는 것** | HIS 와의 세 기능(반사 검사 · 수혈 동의 · 조직 결재)의 실제 동작 · 하루 검체 수와 동시 사용자에 맞춘 사양 · 기존 검사실 시스템의 데이터를 옮기는 방법 · 어떤 장비 중계 장치를 쓸지 |

### PACS — 영상을 저장하고 판독하는 시스템 · [소개서](projects/pacs.md)

> **EN** — PACS stores the hospital's medical images, shows them to the people who need them, and carries the radiologist's reading from the worklist to a signed report. At a glance: built to receive, store and read images on its own, and the September 2026 trial install confirmed part of that (twelve containers up, an HL7 order reaching the worklist, an uploaded slide stored, a finalized report signed) but not image reception from a real scanner; the paths that tie it to HIS are built but not yet confirmed, the install files needed workarounds, and it is not a certified medical device.

**PACS 는 병원의 의료 영상을 받아 저장하고, 필요한 사람에게 보여 주고, 판독의가 판독문을 쓰고 서명하기까지를 맡습니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | **조건부.** PACS 혼자 영상 저장 · 판독 · 서명을 하도록 만들어져 있습니다. 다만 세 가지가 아직입니다 — ① 촬영 장비에서 영상 받기는 확인 전(소개서 §6) ② HIS 와 오더 · 결과 자동 주고받기는 확인 전 ③ 인허가받은 의료기기가 아님 |
| **세워야 하는 것** | 컨테이너 약 12개 — 웹 입구(nginx) · 백엔드 API · 비동기 작업자 · 영상 서버(Orthanc) · 워크리스트 서버 · HL7 수신기 · 관리 화면 · 웹 뷰어 · PostgreSQL 16 · Redis 7. 영상 파일을 담을 디스크. 모니터링은 선택. GPU 는 필요 없음 |
| **먼저 있어야 할 것** | 다른 프로젝트는 없어도 됩니다. HIS 신원으로 들어오려면 HIS, 판독 서명에는 sign, AI 보조에는 AI Server. 기관은 촬영 장비 목록 · 공개 주소와 TLS 인증서 · 영상 저장 용량을 준비합니다 |
| **받을 코드** | 이 소개서가 설명하는 개발본은 통합 릴리즈 코드와 같습니다 — [소스 받기](SOURCES.md). 설치 파일이 그대로는 끝나지 않아 [우회 순서](build-guide/S3-clinical-departments.md)를 함께 봅니다 |
| **실제로 확인된 것** | 2026년 9월 시험 설치에서 sign(판독 서명 · 조영제 동의서 환자 서명 — 본인확인은 모의)과 LIS(병리 워크리스트 등록 · 취소 · 뷰어 링크 · 도착 확인 — 합성 슬라이드)를 불러 확인했습니다. PACS 혼자 해 본 범위는 소개서 §6 「시험 설치에서 PACS 혼자 해 본 것」. HIS · 촬영 장비 · AI Server 와는 아직 |
| **아직 모르는 것** | 서버 사양 · 영상 한 건의 평균 용량 · 백업 크기와 복구 시간 · 기존 PACS 에서 옮기는 시간 · 실제 촬영 장비와의 호환 |

### sign — 서명의 증거를 만드는 시스템 · [소개서](projects/sign.md)

> **EN** — sign makes "who signed what, when, and that it has not changed since" verifiable for the hospital's documents, and it is the only place in the ecosystem that holds document-signing keys — including each signer's own key, which sign generates and keeps encrypted. HIS holds a separate key for staff identity tokens, which is a different kind of signature. At a glance: signing and verification work between fresh installs (nine links confirmed), but patient identity checks and text messages run on mock providers until the hospital signs contracts, and the CA keys are kept in software.

**sign 은 병원 문서에 대해 「누가 · 언제 · 무엇에 서명했고, 그 뒤로 바뀌지 않았다」를 나중에 누구나 확인할 수 있게 만드는 전자서명 서비스입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — 다른 시스템의 요청으로 서명을 만들고 검증하는 데까지는 동작을 확인했습니다. 실제 환자가 서명하기 전에 본인확인 · 문자 사업자 계약이 있어야 하고, 법적 효력 판단은 기관이 합니다 |
| **세워야 하는 것** | 컨테이너 3개 — 서명 서비스 · 웹(관리 콘솔 · 서명 포털) · PostgreSQL 16. 키 보관소 볼륨. 선택으로 키 연산 프록시 · 본인확인 프록시. GPU · 캐시는 필요 없음 |
| **먼저 있어야 할 것** | 의료진 서명을 쓰려면 HIS. 기관은 마스터키 · 백업 암호의 보관 방법, 본인확인 · 문자 사업자 계약, 공인 타임스탬프 · 키 보관 장치(HSM)를 쓸지를 정합니다 |
| **받을 코드** | 이 소개서는 통합 릴리즈 코드(1.30.1) 뒤 2커밋을 더한 개발본을 설명합니다. 더해진 것은 콘솔 로그인 화면의 시험용 계정 패널뿐이고 서명 서비스는 같습니다 — [소스 받기](SOURCES.md) |
| **실제로 확인된 것** | 2026년 9월 시험 설치에서 9개 연결(HIS 3 · PACS 2 · ERP 2 · edu 2)을 가상 데이터로 불러 확인했습니다. 환자 본인확인은 모의 공급자였고, HIS 화면에서 보내는 동의서 서명 요청은 아직입니다 |
| **아직 모르는 것** | 서명 처리량 · 지연 · 권장 서버 사양 · 이미 다른 방식으로 서명한 문서를 옮기는 방법 · 인증서 만료 때의 갱신 운영 |

### ERP — 병원 경영지원 시스템 · [소개서](projects/erp.md)

> **EN** — ERP keeps the hospital's money, people and materials on one ledger. Patient and encounter records stay in HIS; ERP turns what HIS sends into accounting, and it also calculates the patient bill that HIS displays. At a glance: usable only with HIS in place and on the same host as HIS (some addresses are fixed in code); nine connections were confirmed in a September 2026 test install; sizing and migration effort are not measured.

**ERP 는 병원의 돈 · 사람 · 물자를 하나의 전표 원장(모든 거래가 모이는 회계 장부) 위에서 관리하는 경영지원 시스템입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — HIS 가 먼저 서 있어야 하고, HIS 와 같은 호스트에 둘 때 동작을 확인했습니다. 국내 의료 · 세무 · 노동 제도를 전제로 만들어졌습니다 |
| **세워야 하는 것** | 앱 컨테이너 4개(core API · 웹 · 연동 작업자 · 배치 작업자) · PostgreSQL — 권장 배치는 HIS 의 DB 서버 안에 ERP 전용 데이터베이스(6절) · Redis 7 · 첨부와 백업을 둘 디스크. 경영분석(BI)은 선택. GPU 는 필요 없음 |
| **먼저 있어야 할 것** | HIS — 로그인 · 첫 관리자 · 회계로 옮길 사건이 모두 HIS 에서 옵니다. 기관은 수가 · 약제 마스터 · 고시 원문 · 기관 정보 · 급여 규칙 · 담당 역할 배정을 준비합니다 |
| **받을 코드** | 이 소개서가 설명하는 개발본은 통합 릴리즈 코드와 같습니다 — [소스 받기](SOURCES.md). HIS · AI Server 를 부르는 주소 일부가 코드에 고정돼 있어, 다른 호스트에 두려면 코드를 고쳐야 합니다(8절) |
| **실제로 확인된 것** | 2026년 9월 시험 설치에서 9개 연결(HIS 6 · sign 2 · LIS 1)을 가상 데이터로 불러 확인했습니다. HIS 와 같은 호스트에 둔 구성이었습니다 |
| **아직 모르는 것** | 사용자 수 · 거래량에 따른 사양 · 기존 회계 · 급여 시스템에서 옮기는 품 · 세법 · 4대보험 개정 때 고치는 주체 · 전자세금계산서의 실제 전송 · DB 를 HIS 와 나눴을 때의 차이 |

### AI Server — 기관 안의 AI 연산 서버 · [소개서](projects/ai-server.md)

> **EN** — AI Server gathers the ecosystem's AI work on one GPU server inside the hospital and returns drafts and assisting results to the systems that call it. HIS keeps running without it, but its AI switch is on by default, so switch it off until AI Server is ready. The repository also holds non-medical features; this introduction covers only the medical side. At a glance: installed by hand (no install definition), models downloaded by the hospital, take the current development line because the integrated-release code can fail to issue API keys on a fresh install, no connection verified yet, and throughput and answer quality not measured.

**AI Server 는 생태계의 AI 연산을 기관 안 GPU 서버 한 대에 모아 맡고, 다른 시스템이 부르면 초안과 보조 결과를 돌려주는 서버입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — 새 서버에 올리는 설치 정의가 없어 손으로 설치하고, 모델은 기관이 직접 받습니다. 부르는 시스템과의 연결은 아직 하나도 끝까지 확인되지 않았고, 처리량과 답의 품질은 재지 않았습니다 |
| **세워야 하는 것** | GPU 서버 한 대 — API 서버(Flask · Gunicorn 프로세스 하나) · 같은 호스트의 모델 서빙(Ollama) · 음성 인식(Whisper). 검색 색인(ChromaDB)과 SQLite 파일은 앱 안에 있어 별도 DB 서버가 없습니다. 다른 시스템이 부르려면 앞단 프록시를 둡니다 |
| **먼저 있어야 할 것** | 다른 프로젝트 없이도 뜨지만, 부르는 시스템(주로 HIS)이 있어야 쓸모가 있습니다. 기관은 모델 가중치(약관 확인) · 공공 데이터 이용 키 · 공공 데이터를 받을 인터넷 연결이나 반입 절차를 준비합니다 |
| **받을 코드** | 이 소개서가 설명하는 현재 개발본을 받습니다. 통합 릴리즈 코드로 새로 설치하면 API 키 발급이 실패할 수 있어서입니다. 판 번호 · 커밋 · 달라진 점은 9절 · [소스 받기](SOURCES.md) |
| **실제로 확인된 것** | 없음 |
| **아직 모르는 것** | 처리량 · 응답 시간 · 답의 품질 · 동시 사용자에 따른 GPU · 메모리 · 디스크 · 모델을 모두 받았을 때의 디스크 합계 · 장애 뒤 복구 절차 · 요청과 응답 본문을 얼마나 남기는지 |

### twin — 환자와 병원 운영을 읽어 위험을 미리 보여 주는 디지털 트윈 · [소개서](projects/twin.md)

> **EN** — twin reads data from HIS and shows clinicians risk-score cards and handover summaries, and shows managers bed, unit and equipment indicators with what-if simulation. At a glance: usable only with HIS in place; five containers — API, worker, PostgreSQL, Redis and the web app, which the compose file lists as an optional profile but which is needed to open twin from the HIS chart; the code to take is the same as the integrated release; nothing has been verified by a real call, because twin was not built in the September 2026 test installs.

**twin 은 HIS 의 자료를 읽어서, 의료진에게는 환자의 위험 점수와 인계 요약을, 병원 운영 쪽에는 병상 · 병동 · 장비 지표와 「이렇게 바꾸면 어떻게 되나」 시뮬레이션을 보여 주는 별도 서비스입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — **HIS 가 있어야** 씁니다. 다른 시스템과 실제로 이어 본 적이 없고, 의료기기 해당 여부도 정해지지 않았습니다(8절) |
| **세워야 하는 것** | 컨테이너 5개 — API · 워커(같은 이미지) · PostgreSQL 16 · Redis 7 · 웹. **웹도 반드시 올립니다** — 설치 파일에는 선택으로 적혀 있지만, 빼면 HIS 차트에서 twin 을 열 수 없습니다. 생리 엔진 컨테이너는 선택입니다. GPU 는 필요 없습니다 |
| **먼저 있어야 할 것** | HIS — 앱 등록 · twin 전용 읽기 계정 · 환자의 AI 활용 동의 기록. AI Server — 설명 초안 · 아바타 · 영상 계산을 쓸 때만, 호출 키와 함께 |
| **받을 코드** | 통합 릴리즈 코드와 같은 현재 개발본입니다. 저장소 태그가 아니라 [소스 받기](SOURCES.md)가 가리키는 커밋을 받습니다 |
| **실제로 확인된 것** | 없음 — 2026년 9월 시험 설치에서 twin 은 세우지 않았습니다. 화면 캡처는 가상 병원 데이터로 찍은 것이고, 연결 확인은 아닙니다 |
| **아직 모르는 것** | 동시 사용자 수 · HIS 에 주는 읽기 부하 · HIS 쪽 준비에 걸리는 시간 · 감사 기록 보존 기간 설정 · 의료기기 해당 여부 |

### cerno — 근거가 있을 때만 답하는 의료진별 임상 질의 도우미 · [소개서](projects/cerno.md)

> **EN** — cerno drafts answers to clinicians' questions only from documents it can cite, and stays silent when it finds no evidence; it runs as a non-clinical shadow pilot. At a glance: usable only as a pilot, with both HIS and the AI Server in place; three containers; the code to take is the same as the integrated release; nothing has been verified by a real call, and there are no pilot results.

**cerno 는 의료진이 차트에서 던진 질문에, 기관 지침과 본인이 올린 자료에서 찾은 근거로만 답변 초안을 만들고, 근거가 없으면 답하지 않는 도우미입니다. 지금은 임상 결정에 쓰지 않는 섀도우(참고 운영) 파일럿입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — **HIS 와 AI Server 가 둘 다 있을 때, 임상 결정에 쓰지 않는 시험 운영으로만** 씁니다. 시스템이 임상 사용을 막아 주지는 않으므로, 이 한정은 병원이 운영 규칙으로 지킵니다(8절) |
| **세워야 하는 것** | 컨테이너 3개 — 웹(밖으로 여는 유일한 곳) · API · Redis 7. 기록은 데이터 볼륨의 SQLite 파일에 둡니다. GPU 는 필요 없습니다 |
| **먼저 있어야 할 것** | HIS 에 앱 등록 · AI Server 의 호출 키와 답변 · 임베딩 모델 · 참여 의료진 명단 · 공용 서고에 넣을 기관 지침 원문 |
| **받을 코드** | 통합 릴리즈 코드와 같은 현재 개발본입니다. [소스 받기](SOURCES.md)가 가리키는 커밋을 받습니다 |
| **실제로 확인된 것** | 없음 — 2026년 9월 시험 설치에서 cerno 는 세우지 않았습니다. 파일럿 결과도 저장소에 없습니다 |
| **아직 모르는 것** | 답이 나오기까지 걸리는 시간 · 동시에 몇 명이 쓸 수 있나 · 기관 서고에서의 근거 기준값 · 질의 기록 보존 기간 |

### edu — 직원 교육 · 법정교육 · 전자 이수증 · [소개서](projects/edu.md)

> **EN** — edu delivers staff training and statutory courses, and turns each completion into an HIS education record and a signed completion certificate. At a glance: usable once HIS is running, with sign needed for certificates; four containers plus a content volume; the code to take is the same as the integrated release, installed as a single-hospital deployment in the order of section 6; sign-in from HIS, the roster, completion records and certificates were verified between test installs with made-up data in September 2026.

**edu 는 직원에게 교육을 전하고, 이수 하나를 HIS 의 교육 기록과 전자서명된 이수증으로 남기는 시스템입니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — **HIS 가 먼저 돌고 있어야** 씁니다. 이수증까지 내려면 sign 도 있어야 합니다 |
| **세워야 하는 것** | 컨테이너 4개 — API · 웹 · PostgreSQL 16 · Redis 7. 동영상 · 이수증을 담는 콘텐츠 볼륨과 그 백업. GPU 는 필요 없습니다 |
| **먼저 있어야 할 것** | HIS — edu 주소 설정 · 서명 비밀값 공유. sign — 이수증에 서명할 자격(등록자 인증서) · https 로 edu 에 닿는 길. 기관이 정할 교육 담당과 콘텐츠 검수 책임자 |
| **받을 코드** | 통합 릴리즈 코드와 같은 현재 개발본입니다([소스 받기](SOURCES.md)). 병원 하나에 세우는 **단독 배포**이며, 저장소 설치 안내에 빠진 단계가 있어 6절 순서를 따릅니다 |
| **실제로 확인된 것** | 2026년 9월 시험 설치에서 가상 데이터로 — HIS 사내교육 단추 로그인 · 공개키 · 직원 명부 · 이수 기록, sign 이수증 서명과 완료 통지. 운영 병원이 아니고, edu 로그인 화면 경로 · 직원 이벤트 · Clinic 은 확인 전이며 AI 는 문항 생성만 불러 봤습니다 |
| **아직 모르는 것** | 동시에 몇 명이 배울 수 있나 · 동영상 저장 용량 · 복구 절차와 걸리는 시간 · sign 없이 쓰는 구성 · 실제 기관의 운영 여부 |

### Clinic — 병원 그룹웨어 · [소개서](projects/clinic.md)

> **EN** — Clinic is the hospital groupware where staff hand over shifts, see rosters and ward status, and receive alerts and approval requests, drawing on data from HIS. At a glance: hosted or installed; an installed Clinic means running three processes (the shared main application, the hospital screens, the authentication service), two containers (PostgreSQL 15 and Redis) and a SQL script, plus the scheduler process if calendar reminders are wanted — the other eight processes are not called by the hospital service; the code is the same as the integrated release but comes with the whole repository; no link has been verified by a real call.

**Clinic 은 직원이 인수인계 · 근무표 · 병동 현황 · 알림 · 결재를 한곳에서 보는 병원 그룹웨어이고, HIS 의 자료를 받아 보여 줍니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 조건부 — 운영사 서버에 가입해 쓰거나(가입형), 병원 서버에 세웁니다(설치형). 설치형은 병원 화면만 떼어 세울 수 없습니다. HIS 자료를 보려면 HIS 가 있어야 하고, 실제로 이어 본 연결은 없습니다 |
| **세워야 하는 것** | **설치형에서 띄우는 것 전부:**<br/>① 메인앱 프로세스 — 같은 저장소의 다른 서비스와 함께 쓰는 공용 앱. HIS 연동 API · 웹훅 수신이 여기 있습니다<br/>② 병원 화면 프로세스 ③ 인증 서비스 프로세스<br/>④ PostgreSQL 15 컨테이너(벡터 검색 확장이 든 이미지) ⑤ Redis 컨테이너<br/>⑥ 병원 서비스 상태 테이블을 더하는 SQL 스크립트 실행<br/>HIS 연동만 쓰면 ①④⑤ 로 됩니다. 근무 캘린더 일정 알림을 쓰려면 예약 작업 프로세스를 더합니다. 저장소의 나머지 프로세스 8개는 병원 서비스가 부르지 않습니다(4절). GPU 는 필요 없습니다 |
| **먼저 있어야 할 것** | HIS — Clinic 주소 · Clinic 이 발급한 API 키(6절) · 병원 코드 · 웹훅 서명 비밀값. 메인앱에 넣을 HIS 주소와 HIS 쪽 키. 빌드할 때 봇 방지 사이트 키 |
| **받을 코드** | 통합 릴리즈 코드와 같은 현재 개발본입니다([소스 받기](SOURCES.md)). 병원 밖 서비스까지 든 **저장소 전체**를 받고, 병원 서비스 전용 태그가 없어 커밋으로 고정합니다 |
| **실제로 확인된 것** | 없음 — 2026년 9월 시험 설치에서 Clinic 은 세우지 않았습니다. 공급 형태 · 로그인 흐름만 운영사의 공개 소개 페이지로 읽었습니다 |
| **아직 모르는 것** | 메인앱이 HIS 에 병동 자료를 물을 때 쓰는 키를 HIS 에서 어떻게 받나 · 그 요청이 HIS 쪽과 맞물리나 · 서버 사양 · 백업과 복구 · 가입형의 저장 위치와 계약 조건 |

### Jitsi — 원격진료 화상 서버 · [소개서](projects/jitsi.md)

> **EN** — Jitsi is the hospital's own video server for telemedicine and remote consultation; the current installation does not work and must be built anew. At a glance: not usable today; building it means nine containers (two more for live captions) plus a front proxy the institution runs; HIS, a public domain and open firewall ports come first; the code is the same as the integrated release; nothing has been verified by a real call.

**Jitsi 는 원격진료 · 원격협진 화상을 병원이 직접 운영하는 화상 서버이며, 지금 설치본은 동작하지 않아 새로 구성해야 합니다.**

| | |
|---|---|
| **지금 쓸 수 있나** | 아니오 — 이 생태계를 개발하며 쓰던 설치본이 동작하지 않습니다. 원격진료가 필요한 기관은 새로 구성합니다 |
| **세워야 하는 것** | 컨테이너 9개 — 화상 웹 · 시그널링 · 회의 조정 · 미디어 중계 · TURN · 녹화 · 회의 관리 API · 지표 수집 · 대시보드. 실시간 자막을 쓰면 2개 더, 그리고 기관이 두는 앞단 프록시. GPU 는 필요 없습니다 |
| **먼저 있어야 할 것** | HIS(입장 토큰을 만듦) · 공개 도메인 · 공인 주소 · TLS 인증서 · 방화벽 모든 계층의 미디어 포트 · 녹화용 호스트 사운드 장치 · HIS 와 나눌 공유 비밀키. AI Server 는 선택 |
| **받을 코드** | 통합 릴리즈 코드와 같은 현재 개발본입니다. 저장소 태그가 아니라 [소스 받기](SOURCES.md)가 가리키는 커밋을 받습니다 |
| **실제로 확인된 것** | 없음 — 지금 설치본이 동작하지 않고, 2026년 9월 시험 설치에서도 세우지 않았습니다 |
| **아직 모르는 것** | 새로 구성하면 끝까지 동작하는지 · 동시 통화 수와 화질별 사양 · 구성에 드는 기간 · 휴대전화 환자의 입장 방법 · 원격진료 규제 대응 |

<!-- 프로젝트 요약: 생성물 끝 -->

</details>

## 지금 받을 수 있는 것
**What you can get today**

> **EN** — Available now: the materials in this repository and the public editions of the systems already opened. Not included anywhere: prebuilt container images, AI model weights, and government-distributed code masters.

| 있는 것 | 없는 것 |
|---|---|
| 소개서 · 구축 가이드 · 구성서 · 연결 상태 표 · 화면 · 체크리스트 | 미리 만든 **컨테이너 이미지** — 각 저장소에서 직접 빌드합니다 |
| 통합 릴리즈 `2026.09`(버전 조합 · 시스템별 요약) | **AI 모델 가중치** — 기관이 약관을 읽고 직접 받습니다([THIRD_PARTY](THIRD_PARTY.md)) |
| 공개판 소스 — [시스템 13](#시스템-13)의 소스 칸 · [`source/`](source/README.md) 하위 모듈 | **코드 마스터**(수가 · 약가 · 상병) — 배포 기관에서 받습니다 |

공개판 저장소에는 비밀값이 들어 있지 않습니다. 받은 뒤 직접 정할 값과 보안 설정은 저장소마다 `PUBLIC-EDITION.md` 에 있습니다.

## 참여
**Contributing**

> **EN** — How external contributions will be accepted is not yet decided; it will be announced here.

외부 기여(이슈 · 풀 리퀘스트)를 받는 방식은 정하는 중입니다.

## 라이선스
**License**

> **EN** — This repository and every public edition are [MIT](LICENSE), Copyright (c) 2026 Sean Shin. Third-party servers, AI model weights and code master data follow their own terms ([THIRD_PARTY.md](THIRD_PARTY.md)). This software is **not an approved medical device** ([DISCLAIMER.md](DISCLAIMER.md)).

- 이 저장소와 공개판 저장소: [MIT](LICENSE) · Copyright (c) 2026 Sean Shin (신현묵)
- 제3자 서버 · AI 모델 가중치 · 코드 마스터는 각자의 조건을 따릅니다 — [THIRD_PARTY.md](THIRD_PARTY.md)
- 인허가받은 의료기기가 아닙니다. AI 산출물은 보조 정보이고, 임상 판단과 책임은 의료진과 구축 기관에 있습니다 — [의료 면책 고지](DISCLAIMER.md)
