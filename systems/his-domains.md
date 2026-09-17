<!-- 생성물 — 직접 수정 금지. `node tools/extract-his-nav.mjs` 로 다시 만듭니다. -->

# HIS 메뉴 구성 — 도메인별

> 자동 생성 — 손으로 고치지 않습니다. HIS 코드의 메뉴 정의가 바뀌면 추출기를 다시 돌립니다.

> **EN** — Generated from the HIS web sidebar definition at the base commit: every left-menu entry grouped by domain, with the roles each entry is shown to. It is the evidence table behind §4 of the [HIS system reference sheet](his.md). Do not edit by hand.

HIS 웹 화면 왼쪽 메뉴의 **코드 기본 구성**입니다. [HIS 시스템 구성서](his.md) §4 의 근거 표입니다.

| 기준 | 값 |
|---|---|
| 원본 | HIS 저장소 `apps/web/src/components/layout/Sidebar.tsx` 의 `NAV_SECTIONS` · `MENU_DOMAINS` · `SECTION_META` (역할 이름은 `packages/shared/src/constants.ts` 의 `USER_ROLE_LABEL`) |
| HIS 버전 | v4.18.0 |
| 기준 커밋 | `e9d303984f80eda8271f29064a326bedad766815` (2026-09-11) |
| 추출일 | 2026-09-17 |
| 규모 | 도메인 8 · 메뉴 묶음 26 · 메뉴 항목 266(서로 다른 화면 경로 266) |
| 센 방법 | 메뉴 항목 = `NAV_SECTIONS` 각 묶음의 `items` 원소 수. 같은 화면 경로가 두 묶음에 걸려 있으면 항목은 둘로, 화면 경로는 하나로 셉니다. 관리자가 화면에서 추가한 메뉴는 코드에 없으므로 세지 않습니다 |
| 리터럴로 읽지 못한 칸 | 0 |

## 읽는 법

- 메뉴에 있다는 것은 **화면이 있다**는 뜻입니다. 실운영에서 검증됐다는 뜻은 아닙니다. 다른 시스템과의 연결 상태는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다.
- **사용 역할**은 코드의 기본값입니다. 기관 관리자가 메뉴 관리 화면에서 메뉴를 숨기거나, 역할 · 이름 · 순서를 바꾸거나, 메뉴를 추가할 수 있습니다. 이 표는 그런 기관 설정을 싣지 않습니다.
- 메뉴 표시와 기능 권한은 따로 정해집니다. 메뉴에서 숨겨도 기능 권한은 서버의 역할 규칙이 판정합니다.
- **소분류**는 관리 메뉴를 보기 좋게 나눈 표시 분류입니다. 권한이나 순서를 뜻하지 않습니다.
- 메뉴 이름은 코드에 적힌 한국어 원문 그대로입니다. 화면에는 언어 팩에 따라 번역돼 보일 수 있습니다.
- `(코드에서 산출)` — 값이 코드에서 계산돼 이 추출기가 리터럴로 읽지 못한 칸입니다. 추측해 채우지 않습니다.

## 역할 이름

| 역할 코드 | 화면 이름 | 기본 메뉴에 쓰임 |
|---|---|---|
| `ADMIN` | 관리자 | 예 |
| `DOCTOR` | 의사 | 예 |
| `NURSE` | 간호사 | 예 |
| `RECEPTIONIST` | 원무 | 예 |
| `PHARMACIST` | 약사 | 예 |
| `LAB_TECH` | 검사기사 | 예 |
| `NUTRITION` | 급양 | 예 |
| `ADMIN_STAFF` | 행정직 | 예 |
| `MEDICAL_RECORDS` | 의무기록사 | 예 |
| `CHECKUP` | 검진센터 | 예 |
| `CRM_MANAGER` | 고객관리 책임자 | 예 |
| `CRM_STAFF` | 고객상담 | 예 |
| `EXECUTIVE` | 경영진 | 예 |
| `READ` | 조회 전용 | 예 |

## 도메인 한눈에

| 도메인 | 설명(코드 원문) | 메뉴 묶음 · 항목 수 | 항목 합계 |
|---|---|---|---|
| 진료 (`care`) | 외래·입원·간호·전문진료·수술 등 임상 진료 전반 | 외래 9 · 간호 3 · 수술/중환자 6 · 전문 진료 12 · 특수 치료 5 · 입원 6 · 협진/의뢰 4 | 45 |
| 진료지원 (`support`) | 약국·검사·영상·의무기록·워크스테이션 등 진료 지원 | 진료 지원 14 · 워크스테이션 28 · 클리닉 센터 17 · 의무기록 3 | 62 |
| 환자·고객 (`patient`) | CRM·예약·병원 안내 등 환자/고객 관리 | CRM 11 · 병원 안내 6 | 17 |
| 질·안전 (`quality`) | 환자안전·감염관리·질 지표·임상 연구 | 의료 질/연구 6 · 안전/질관리 16 | 22 |
| 운영 (`ops`) | 원무·청구·인사·경영 대시보드·전원/연동 | 원무/관리 13 · 전원/연동 4 · 경영진 2 | 19 |
| 지능형 (`intel`) | AI(WeRU.B) 진단보조·시뮬레이션·디지털 트윈 | AI(WeRU.B)/시뮬레이션 7 | 7 |
| 시스템 관리 (`system`) | 직원·권한·설정·외부연동·홈페이지 관리 | 개원 전 시스템 관리 36 · 운영 시스템 관리 33 · 검진권 5 · 외부 연동 6 · 홈페이지 관리 7 | 87 |
| 개인 (`personal`) | 내 설정·복리후생·교육 | 생활/편의 1 · 내 설정 6 | 7 |

## 진료 — `care`

> 외래·입원·간호·전문진료·수술 등 임상 진료 전반

### 외래 (9)

접수·진료실 대기·환자 관리·예약·처방(CPOE) 등 외래 진료 전 과정

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 통합 상황판 | `/command-center` | 관리자 · 간호사 · 의사 · 약사 · 검사기사 |
| 대시보드 | `/dashboard` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 접수 | `/reception` | 관리자 · 간호사 · 원무 |
| 진료실 대기 | `/clinic-queue` | 관리자 · 의사 · 간호사 · 원무 |
| 환자 관리 | `/patients` | 관리자 · 의사 · 간호사 · 의무기록사 |
| 외국인 환자 등록 | `/patients/register/foreign` | 관리자 · 간호사 |
| 응급 미확인 등록 | `/patients/register/emergency` | 관리자 · 간호사 · 의사 |
| 예약 | `/schedule` | 관리자 · 의사 · 간호사 · 원무 |
| 처방(CPOE) | `/orders` | 관리자 · 의사 · 간호사 |

### 간호 (3)

간호 워크스테이션 등 간호 업무

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 간호 워크스테이션 | `/nurse-station` | 관리자 · 간호사 |
| 간호 스테이션 보드 | `/nursing-station` | 관리자 · 간호사 · 의사 |
| 환자 영상 조회 | `/nurse-station/imaging` | 관리자 · 간호사 · 의사 |

### 수술/중환자 (6)

수술·회복실(PACU)·응급실·중환자실

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 수술 | `/surgery` | 관리자 · 의사 |
| 회복실(PACU) | `/pacu` | 관리자 · 의사 · 간호사 |
| 응급실 | `/emergency` | 관리자 · 의사 · 간호사 |
| 응급실 보드 | `/emergency-board` | 관리자 · 의사 · 간호사 |
| 중환자실 | `/icu` | 관리자 · 의사 · 간호사 |
| Code Blue / RRT | `/code-blue` | 관리자 · 의사 · 간호사 |

### 전문 진료 (12)

내과·외과 등 진료과별 전문 진료

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 내과 | `/internal-medicine` | 관리자 · 의사 |
| 정형외과 | `/orthopedics` | 관리자 · 의사 |
| 신경외과 | `/neurosurgery` | 관리자 · 의사 |
| 산부인과 | `/obgyn` | 관리자 · 의사 |
| 소아청소년과 | `/pediatrics` | 관리자 · 의사 |
| 정신과 | `/psychiatry` | 관리자 · 의사 |
| 안과 | `/ophthalmology` | 관리자 · 의사 |
| 이비인후과 | `/ent` | 관리자 · 의사 |
| 피부과 | `/dermatology` | 관리자 · 의사 |
| 치과 | `/dental` | 관리자 · 의사 |
| 성형외과 | `/plastic` | 관리자 · 의사 |
| 비뇨의학과 | `/urology` | 관리자 · 의사 |

### 특수 치료 (5)

투석·항암·재활 등 특수 치료

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 재활의학 | `/rehab` | 관리자 · 의사 · 간호사 |
| 방사선종양 | `/radiation` | 관리자 · 의사 |
| 항암 치료(사이클) | `/chemo` | 관리자 · 의사 · 간호사 · 약사 |
| 투석실 | `/dialysis` | 관리자 · 의사 · 간호사 |
| 장기이식 | `/transplant` | 관리자 · 의사 |

### 입원 (6)

입원 환자 관리·병동

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 입원 환자 | `/inpatient` | 관리자 · 의사 · 간호사 |
| 회진 | `/rounds` | 관리자 · 의사 |
| 인수인계 | `/handoffs` | 관리자 · 의사 |
| 병상 현황 | `/beds` | 관리자 · 의사 · 간호사 |
| 병상·입원 보드 | `/bed-board` | 관리자 · 의사 · 간호사 |
| 급식 | `/nutrition` | 관리자 · 간호사 · 급양 |

### 협진/의뢰 (4)

타과 협진 의뢰·회신

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 협진 의뢰 | `/consultations` | 관리자 · 의사 · 간호사 |
| 의뢰서 문서 | `/consultations/letters` | 관리자 · 의사 |
| 상담 데스크 | `/consult` | 관리자 · 의사 · 간호사 |
| 고객의 소리(VoC) | `/admin/voc` | 관리자 · 고객관리 책임자 · 고객상담 |

## 진료지원 — `support`

> 약국·검사·영상·의무기록·워크스테이션 등 진료 지원

### 진료 지원 (14)

약국·검사실·영상실·병리·혈액은행·화상진료

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 약국 | `/pharmacy` | 관리자 · 약사 |
| 약국 보드 | `/pharmacy-board` | 관리자 · 약사 |
| 약사 임상활동 | `/pharmacist-activity` | 관리자 · 약사 |
| 검사실 | `/lab` | 관리자 · 검사기사 |
| 영상실 | `/imaging` | 관리자 · 검사기사 · 의사 |
| 병리과 | `/pathology` | 관리자 · 검사기사 · 의사 |
| 기초검사 | `/diagnostics` | 관리자 · 의사 · 간호사 |
| 혈액은행 | `/blood-bank` | 관리자 · 검사기사 · 의사 · 간호사 |
| 화상진료 | `/telehealth` | 관리자 · 의사 · 간호사 |
| 비대면진료 | `/remote-consult` | 관리자 · 의사 · 간호사 |
| 만성질환 관리 | `/chronic` | 관리자 · 의사 · 간호사 |
| 임상 도구(점수·계산) | `/clinical-tools` | 관리자 · 의사 · 간호사 |
| 검사·영상 보드 | `/diagnostics-board` | 관리자 · 검사기사 · 의사 · 간호사 |
| PACS 주치의 포털 | `/pacs-portal` | 관리자 · 의사 |

### 워크스테이션 (28)

접수·검사·영상·간호·입원 등 부서별 워크스테이션

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 접수 워크스테이션 | `/workstation/front-desk` | 관리자 · 간호사 |
| 워크스테이션 | `/workstation` | 관리자 · 검사기사 · 간호사 |
| 검사실 | `/workstation/lab` | 관리자 · 검사기사 |
| 영상실 | `/workstation/imaging` | 관리자 · 검사기사 |
| 기초검사 | `/workstation/diagnostic` | 관리자 · 간호사 · 검사기사 |
| 판독 대기 | `/workstation/reading` | 관리자 · 의사 |
| 치료실 | `/workstation/therapy` | 관리자 · 간호사 · 검사기사 |
| 검사항목 관리 | `/workstation/templates` | 관리자 · 검사기사 · 간호사 |
| 약국 | `/workstation/pharmacy` | 관리자 · 약사 |
| 간호(입원) | `/workstation/nursing` | 관리자 · 간호사 |
| 간호(외래) | `/workstation/outpatient-nursing` | 관리자 · 간호사 |
| 접수 | `/workstation/reception` | 관리자 · 간호사 |
| 동의서 | `/workstation/consent` | 관리자 · 의사 · 간호사 |
| 서류 발급 | `/workstation/documents` | 관리자 · 간호사 |
| 진단서 발급 | `/workstation/certificates` | 관리자 · 의사 |
| 퇴원 | `/workstation/discharge` | 관리자 · 의사 · 간호사 |
| 입원 | `/workstation/admission` | 관리자 · 의사 · 간호사 |
| 수술 준비 | `/workstation/surgery-prep` | 관리자 · 의사 |
| 수술 후 회복 | `/workstation/post-op` | 관리자 · 의사 · 간호사 |
| 중환자실 | `/workstation/icu` | 관리자 · 의사 · 간호사 |
| 주치의 | `/workstation/attending` | 관리자 · 의사 |
| 응급실 | `/workstation/emergency` | 관리자 · 의사 · 간호사 |
| 혈액은행 | `/workstation/blood-bank` | 관리자 · 검사기사 · 간호사 |
| 영양 | `/workstation/nutrition` | 관리자 · 간호사 · 급양 |
| 장비 | `/workstation/equipment` | 관리자 |
| 중앙공급 | `/workstation/cssd` | 관리자 |
| 감염관리 | `/workstation/infection-control` | 관리자 · 의사 · 간호사 |
| 재활 | `/workstation/rehab-station` | 관리자 · 의사 · 간호사 |

### 클리닉 센터 (17)

건강검진센터 등 클리닉 센터

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 건강검진센터 | `/his-checkup` | 관리자 · 의사 · 간호사 · 검진센터 |
| 검진 접수 | `/his-checkup/reception` | 관리자 · 간호사 · 검진센터 |
| 검진 대기 | `/his-checkup/waiting` | 관리자 · 의사 · 간호사 · 검진센터 |
| 검사실 허브 | `/his-checkup/ws` | 관리자 · 간호사 · 검사기사 |
| 동선 현황판 | `/his-checkup/flow-board` | 관리자 · 의사 · 간호사 · 검진센터 |
| 동선 모니터(QR) | `/patient-flow` | 관리자 · 의사 · 간호사 · 검진센터 |
| 대기 디스플레이 | `/display/checkup` | 관리자 · 의사 · 간호사 · 검진센터 |
| 검진 스테이션 | `/his-checkup/station` | 관리자 · 의사 · 간호사 |
| 문진표 관리 | `/his-checkup/questionnaires` | 관리자 |
| 검진 프로그램 | `/his-checkup/programs` | 관리자 |
| 검사항목 관리 | `/his-checkup/test-catalog` | 관리자 |
| 검진 프로토콜 | `/his-checkup/protocols` | 관리자 |
| 검진 예약 | `/his-checkup/schedule` | 관리자 · 의사 · 간호사 · 검진센터 |
| 소견 대기 | `/his-checkup/review` | 관리자 · 의사 |
| 단체 검진 | `/his-checkup/contracts` | 관리자 · 검진센터 |
| 추적 관리 | `/his-checkup/follow-ups` | 관리자 · 의사 · 간호사 · 검진센터 |
| 검진 통계 | `/his-checkup/stats` | 관리자 · 의사 · 검진센터 |

### 의무기록 (3)

의무기록 조회·사본발급·제증명

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 동의서 | `/consent` | 관리자 · 의사 · 간호사 |
| 기록 검색 | `/medical-records/search` | 관리자 · 의사 · 의무기록사 |
| 사본 발급 | `/medical-records/copy` | 관리자 · 의무기록사 |

## 환자·고객 — `patient`

> CRM·예약·병원 안내 등 환자/고객 관리

### CRM (11)

검진·해외환자·캠페인 등 고객관계관리

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| CRM 대시보드 | `/crm` | 관리자 · 고객관리 책임자 · 고객상담 |
| 검진 대상자 | `/crm/checkup/targets` | 관리자 · 고객관리 책임자 · 고객상담 |
| 검진 실적 | `/crm/checkup/analytics` | 관리자 · 고객관리 책임자 · 고객상담 |
| 해외환자 케이스 | `/crm/international/cases` | 관리자 · 고객관리 책임자 · 고객상담 |
| 해외환자 실적 | `/crm/international/analytics` | 관리자 · 고객관리 책임자 · 고객상담 |
| 캠페인 | `/crm/campaigns` | 관리자 · 고객관리 책임자 · 고객상담 |
| 템플릿 | `/crm/templates` | 관리자 · 고객관리 책임자 · 고객상담 |
| 세그먼트 | `/crm/segments` | 관리자 · 고객관리 책임자 · 고객상담 |
| CRM 상담 | `/crm/consultation` | 관리자 · 고객관리 책임자 · 고객상담 |
| CRM 분석 | `/crm/analytics` | 관리자 · 고객관리 책임자 |
| 자동화 | `/crm/automation` | 관리자 · 고객관리 책임자 |

### 병원 안내 (6)

병원 안내·동선·시설

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 진료과 안내 | `/departments` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 의료진 소개 | `/doctors` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 시설 안내 | `/facility-info` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 병원 소식 | `/his-news` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 건강정보 | `/his-health-info` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 채용 안내 | `/recruit` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |

## 질·안전 — `quality`

> 환자안전·감염관리·질 지표·임상 연구

### 의료 질/연구 (6)

의료 질 관리·임상 연구

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 임상경로 | `/clinical-pathway` | 관리자 · 의사 |
| 다학제진료(MDT) | `/mdt` | 관리자 · 의사 |
| 암 등록 | `/cancer-registry` | 관리자 · 의사 |
| 임상 연구(IRB) | `/research` | 관리자 · 의사 |
| OMOP CDM | `/omop-cdm` | 관리자 |
| 당직/근무 | `/duty-schedule` | 관리자 · 의사 |

### 안전/질관리 (16)

환자안전·감염관리·질 지표

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 환자안전(사고 보고) | `/safety` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 · 고객관리 책임자 · 고객상담 |
| 감염·질·안전 보드 | `/safety-quality-board` | 관리자 · 의사 · 간호사 |
| 감염관리 | `/infection` | 관리자 · 의사 · 간호사 |
| 직원 노출 사고 | `/infection/staff-exposure` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 · 고객관리 책임자 · 고객상담 |
| QI | `/quality` | 관리자 · 의사 · 간호사 |
| 매핑 임상검토 | `/mapping-review` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 |
| 직원교육 | `/education` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 자격·교육(SQE) | `/admin/sqe` | 관리자 |
| 위원회·정책(GLD) | `/admin/gld` | 관리자 · 의사 · 간호사 |
| 안전 게이트 관제 | `/admin/safety-gates` | 관리자 |
| 대외 발신 관제 | `/admin/outbound-channels` | 관리자 |
| 기관 연동 | `/admin/agency-integrations` | 관리자 |
| 중요 결정 | `/admin/decisions` | 관리자 |
| 감사 대시보드 | `/admin/audit-dashboard` | 관리자 |
| 오더 서명 로그 | `/admin/order-sign-logs` | 관리자 |
| 단말 보안 | `/admin/terminal-security` | 관리자 |

## 운영 — `ops`

> 원무·청구·인사·경영 대시보드·전원/연동

### 원무/관리 (13)

청구·수납·인사·재고·교육

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 원무·수납 보드 | `/reception-billing-board` | 관리자 · 간호사 · 의사 |
| 수납 | `/billing` | 관리자 · 간호사 · 원무 · 검진센터 |
| 보험 청구 | `/claims` | 관리자 |
| 원가 분석 | `/cost-analysis` | 관리자 |
| 환자 만족도 | `/satisfaction` | 관리자 |
| 자재/재고 | `/inventory` | 관리자 · 행정직 |
| 중앙공급 | `/cssd` | 관리자 |
| 장비 | `/equipment` | 관리자 · 행정직 |
| 인사 | `/hr` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |
| 생체등록·기기관리 | `/admin/staff-devices` | 관리자 |
| 인증 관리 콘솔 | `/admin/identity` | 관리자 |
| 승인 감사(서명·처방) | `/admin/stepup-approvals` | 관리자 |
| 동선 스테이션 | `/admin/location-stations` | 관리자 |

### 전원/연동 (4)

전원·외부기관 연동(HIE)

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 전원 관리 | `/transfer` | 관리자 · 의사 |
| 전원 의뢰 | `/transfer/request` | 관리자 · 의사 |
| 수신 전원 | `/transfer/incoming` | 관리자 · 의사 |
| 전원 이력 | `/transfer/history` | 관리자 · 의사 |

### 경영진 (2)

경영 대시보드·임상 지표

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 경영 대시보드 | `/executive` | 관리자 · 경영진 |
| 의료 품질 | `/executive/clinical` | 관리자 · 경영진 |

## 지능형 — `intel`

> AI(WeRU.B) 진단보조·시뮬레이션·디지털 트윈

### AI(WeRU.B)/시뮬레이션 (7)

AI(WeRU.B) 진단보조·시뮬레이션·디지털 트윈

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| AI(WeRU.B) 컨시어지 | `/concierge` | 관리자 · 의사 · 간호사 |
| AI(WeRU.B) 예약 도우미 | `/ai-booking` | 관리자 · 의사 · 간호사 |
| 시뮬레이터/플로어맵 | `/simulator` | 관리자 |
| 메타버스 뷰어 | `/metaverse` | 관리자 · 의사 · 간호사 |
| 환자 여정 | `/journey` | 관리자 · 의사 · 간호사 |
| 상호운용성 | `/interoperability` | 관리자 · 의사 · 간호사 |
| 연동 테스트 콘솔 | `/interoperability/test` | 관리자 |

## 시스템 관리 — `system`

> 직원·권한·설정·외부연동·홈페이지 관리

### 개원 전 시스템 관리 (36)

문 열기 전에 정해두는 기준 — 코드·수가 마스터, 템플릿·규칙, 권한, 연동 개통, 개원 단계 관제. 운영 중 바뀌면 여기서 고친다

| 소분류 | 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|---|
| 개원 관제 | 개원·운영 단계 | `/admin/opening` | 관리자 · 경영진 |
| 개원 관제 | 운영 전환(Go-Live) 관제 | `/admin/go-live` | 관리자 · 경영진 |
| 개원 관제 | 연동 개통 게이트 | `/admin/integration-gates` | 관리자 |
| 개원 관제 | Phase0 컷오버 승인 | `/admin/phase0-cutover` | 관리자 |
| 개원 관제 | EMR 인증 | `/admin/emr-cert` | 관리자 |
| 코드·마스터 | 코드 마스터 | `/admin/codes` | 관리자 |
| 코드·마스터 | 비급여 관리 | `/admin/non-covered` | 관리자 |
| 코드·마스터 | 약품 보험코드 매핑 | `/admin/drug-mapping` | 관리자 · 약사 |
| 코드·마스터 | 수가 계산기 | `/admin/billing-calc` | 관리자 |
| 코드·마스터 | 진료과 카탈로그 | `/admin/dept-catalog` | 관리자 |
| 코드·마스터 | 카테고리 관리 | `/admin/categories` | 관리자 |
| 임상 규칙·템플릿 | 약속처방(CP) | `/admin/order-sets` | 관리자 · 의사 |
| 임상 규칙·템플릿 | 치료일정 템플릿 | `/admin/treatment-templates` | 관리자 · 의사 |
| 임상 규칙·템플릿 | 원내 처방집(위원회) | `/admin/formulary` | 관리자 |
| 임상 규칙·템플릿 | CDSS 규칙 | `/admin/cdss-rules` | 관리자 |
| 임상 규칙·템플릿 | 여정 프로토콜 | `/admin/protocols` | 관리자 |
| 임상 규칙·템플릿 | 처방의 지정 규칙 | `/admin/prescriber-rules` | 관리자 |
| 임상 규칙·템플릿 | 차트 에디터 | `/admin/chart-editor` | 관리자 · 의사 |
| 임상 규칙·템플릿 | 폼 빌더 | `/admin/forms` | 관리자 |
| 임상 규칙·템플릿 | 임상도구 검수 | `/admin/clinical-chart-verification` | 관리자 · 의사 |
| 임상 규칙·템플릿 | 트리아지 관리 | `/admin/triage` | 관리자 · 의사 |
| 시설·장비 | 시설 관리 | `/admin/facility` | 관리자 |
| 시설·장비 | 응급실 베드 관리 | `/admin/er-beds` | 관리자 |
| 시설·장비 | TV 디스플레이 관리 | `/admin/displays` | 관리자 |
| 시설·장비 | 워크스테이션·디바이스 | `/admin/workstations` | 관리자 |
| 권한·보안 | 접근 권한 | `/admin/access-control` | 관리자 |
| 권한·보안 | 역할 권한 | `/admin/rbac` | 관리자 |
| 권한·보안 | 전자인증서 | `/admin/blockchain-cert` | 관리자 |
| 권한·보안 | ERP 접근 설정 | `/admin/erp` | 관리자 |
| 화면·표시 | 메뉴 관리 | `/admin/menus` | 관리자 |
| 화면·표시 | 메뉴 구성·권한 | `/admin/menu-config` | 관리자 |
| 화면·표시 | 화면번호 레지스트리 | `/admin/screen-codes` | 관리자 |
| 화면·표시 | 대시보드 템플릿 | `/admin/dashboard-templates` | 관리자 |
| 화면·표시 | 수치 표시·반올림 정책 | `/admin/numeric-policy` | 관리자 |
| 화면·표시 | 확장 슬롯 | `/admin/extensions` | 관리자 |
| 시스템 설정 | 시스템 설정 | `/admin/ai-settings` | 관리자 |

### 운영 시스템 관리 (33)

문 연 뒤 매일 보는 것 — 인력·일정 · 병원 운영 · 관제·지표 · 의료질·안전 · 기록·감사·감시 · AI 운영·감수

| 소분류 | 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|---|
| 인력·일정 | 직원 관리 | `/admin/staff-management` | 관리자 |
| 인력·일정 | 신규 입사자 관리 | `/admin/onboarding` | 관리자 |
| 인력·일정 | 의료팀 편성 | `/admin/care-teams` | 관리자 |
| 인력·일정 | 진료표 | `/admin/clinic-schedule` | 관리자 |
| 인력·일정 | 당직표 | `/admin/duty-schedule` | 관리자 |
| 병원 운영 | 전자결재 대시보드 | `/admin/approvals-dashboard` | 관리자 |
| 병원 운영 | 문진 대시보드 | `/admin/questionnaire-dashboard` | 관리자 |
| 병원 운영 | HIRA 청구 | `/admin/hira-edi` | 관리자 |
| 병원 운영 | 환자 마킹(루비) | `/admin/patient-flags` | 관리자 · 의사 · 간호사 |
| 관제·지표 | 통계/분석 | `/admin/analytics` | 관리자 · 경영진 |
| 관제·지표 | 환자여정 관제 | `/journey-console` | 관리자 · 경영진 |
| 관제·지표 | 이탈·지연 분석 | `/flow-analytics` | 관리자 · 경영진 |
| 관제·지표 | 병원 현황 | `/admin/status` | 관리자 |
| 의료질·안전 | 질관리 (QI) | `/admin/qi` | 관리자 · 의사 |
| 의료질·안전 | 기기 리콜 역추적 | `/admin/device-recall` | 관리자 |
| 의료질·안전 | 낙상/욕창 재평가 | `/admin/risk-reassessment` | 관리자 · 간호사 |
| 의료질·안전 | 데이터 품질 | `/admin/data-quality` | 관리자 |
| 의료질·안전 | 마약류 관리 | `/admin/controlled-substance` | 관리자 |
| 기록·감사·감시 | 미비기록(HIM) | `/admin/him` | 관리자 |
| 기록·감사·감시 | 감사 로그 | `/admin/audit` | 관리자 |
| 기록·감사·감시 | 응급 접근 검토 | `/admin/break-glass` | 관리자 |
| 기록·감사·감시 | 보유·파기(Retention) | `/admin/retention` | 관리자 |
| 기록·감사·감시 | UI 다국어 검수 | `/admin/ui-locale` | 관리자 |
| 기록·감사·감시 | 상시 감시 | `/admin/sentinel` | 관리자 |
| AI 운영·감수 | AI 약물설명 승인 | `/admin/drug-explain` | 관리자 · 약사 |
| AI 운영·감수 | 검진해석 콘텐츠(감수) | `/admin/checkup-explainer` | 관리자 · 의사 |
| AI 운영·감수 | 봇 관리 | `/admin/bots` | 관리자 |
| AI 운영·감수 | 의료법 AI(WeRU.B) | `/admin/medical-law` | 관리자 |
| AI 운영·감수 | 영상 AI(WeRU.B) | `/admin/ai-vision` | 관리자 |
| AI 운영·감수 | 회의 분석 | `/admin/ai-meeting` | 관리자 |
| AI 운영·감수 | AI(WeRU.B) 상담 | `/admin/ai-counseling` | 관리자 |
| AI 운영·감수 | AI(WeRU.B) 번역 | `/admin/ai-translate` | 관리자 · 고객관리 책임자 · 고객상담 |
| AI 운영·감수 | AI(WeRU.B) 감독 관제 | `/admin/ai-oversight` | 관리자 · 경영진 · 의사 |

### 검진권 (5)

건강검진권 발행·딜러·정책 관리

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 검진권 발행·조회 | `/admin/voucher/issue` | 관리자 |
| 검진권 목록 | `/admin/voucher/list` | 관리자 |
| 검진권 대시보드 | `/admin/voucher/dashboard` | 관리자 |
| 검진권 딜러 | `/admin/voucher/distributors` | 관리자 |
| 검진권 정책 | `/admin/voucher/settings` | 관리자 |

### 외부 연동 (6)

외부 서비스 연동 설정

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 연동 신청 관리 | `/admin/partner-requests` | 관리자 |
| 연동 모니터링 | `/admin/partner-monitoring` | 관리자 |
| 연동 기관 | `/admin/organizations` | 관리자 |
| SMART 클라이언트 | `/admin/smart-clients` | 관리자 |
| 전원 통계 | `/admin/transfer-stats` | 관리자 |
| 진료정보교류(HIE) | `/admin/hie-dashboard` | 관리자 |

### 홈페이지 관리 (7)

홈페이지 콘텐츠·CMS 관리

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 홈페이지 대시보드 | `/admin/homepage` | 관리자 |
| 콘텐츠 관리(CMS) | `/admin/hospital-info` | 관리자 |
| 공지/팝업 | `/admin/homepage/popups` | 관리자 |
| 배너 관리 | `/admin/homepage/banners` | 관리자 |
| 미디어 라이브러리 | `/admin/homepage/media` | 관리자 |
| SEO/메타데이터 | `/admin/homepage/seo` | 관리자 |
| 홈페이지 배포 | `/admin/homepage/deploy` | 관리자 |

## 개인 — `personal`

> 내 설정·복리후생·교육

### 생활/편의 (1)

복리후생·교육·편의

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 직원 식단표 | `/staff-meal` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 |

### 내 설정 (6)

개인 설정·인증서·기기

| 메뉴 | 화면 경로 | 사용 역할(기본값) |
|---|---|---|
| 내 행정(ESS) | `/ess` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 · 조회 전용 |
| 내 전자인증서 | `/settings/my-certificate` | 관리자 · 의사 · 간호사 · 약사 |
| 내 서명 등록 | `/settings/my-signature` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 |
| 나의 약속처방 | `/settings/my-codes` | 관리자 · 의사 |
| 단축키·화면번호 | `/settings/shortcuts` | 관리자 · 의사 · 간호사 · 약사 · 검사기사 · 급양 · 원무 · 행정직 · 의무기록사 · 경영진 · 검진센터 · 조회 전용 · 고객관리 책임자 · 고객상담 |
| 음성 설정 (VoiceEMR) | `/settings/voice` | 관리자 · 의사 · 간호사 |

## 다시 만들기

```bash
node tools/extract-his-nav.mjs          # 이 파일을 다시 만듭니다
node tools/extract-his-nav.mjs --check  # 표가 코드와 같은지 확인만(쓰지 않음)
```
