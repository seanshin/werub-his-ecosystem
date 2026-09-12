<!-- 생성물 — 직접 수정 금지. `node tools/build-screen-index.mjs` 로 다시 만듭니다. -->

# 화면 캡처 목록 — HIS

> 자동 생성 — 손으로 고치지 않습니다. [HIS 메뉴 구성표](../../systems/his-domains.md)가 바뀌면 다시 만듭니다.

HIS 웹 화면의 **코드 기본 메뉴**를 캡처 목록으로 편 것입니다. 캡처 규칙은 [캡처 안내](README.md), 사람 확인은 [캡처 대장](../CAPTURE-LEDGER.md)에 있습니다.

| 기준 | 값 |
|---|---|
| 근거 | [HIS 메뉴 구성 — 도메인별](../../systems/his-domains.md) |
| HIS 버전 | v4.18.0 |
| 기준 커밋 | `e9d303984f80eda8271f29064a326bedad766815` (2026-09-11) |
| 메뉴 항목 | 266 |
| 캡처할 화면(경로 기준) | **266** |
| 지금 들어온 캡처 | **31** / 266 |

- **메뉴에 있다는 것은 화면이 있다는 뜻**이고, 실운영에서 검증됐다는 뜻이 아닙니다.
- 같은 화면 경로가 두 묶음에 걸려 있으면 **파일은 하나만** 둡니다(목록에는 첫 묶음에 적습니다).
- 캡처는 **가상 병원 데이터**로 찍습니다. 기관 식별 정보 · 비밀값 · 서버 정보가 화면에 있으면 가리고 찍습니다.

## 진료 — `care` (45)

### 외래 (9)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 통합 상황판 | `/command-center` | `his-care-command-center.png` | ✅ |
| 대시보드 | `/dashboard` | `his-care-dashboard.png` | ⬜ |
| 접수 | `/reception` | `his-care-reception.png` | ✅ |
| 진료실 대기 | `/clinic-queue` | `his-care-clinic-queue.png` | ✅ |
| 환자 관리 | `/patients` | `his-care-patients.png` | ⬜ |
| 외국인 환자 등록 | `/patients/register/foreign` | `his-care-patients-register-foreign.png` | ⬜ |
| 응급 미확인 등록 | `/patients/register/emergency` | `his-care-patients-register-emergency.png` | ⬜ |
| 예약 | `/schedule` | `his-care-schedule.png` | ⬜ |
| 처방(CPOE) | `/orders` | `his-care-orders.png` | ✅ |

### 간호 (3)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 간호 워크스테이션 | `/nurse-station` | `his-care-nurse-station.png` | ✅ |
| 간호 스테이션 보드 | `/nursing-station` | `his-care-nursing-station.png` | ⬜ |
| 환자 영상 조회 | `/nurse-station/imaging` | `his-care-nurse-station-imaging.png` | ⬜ |

### 수술/중환자 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 수술 | `/surgery` | `his-care-surgery.png` | ⬜ |
| 회복실(PACU) | `/pacu` | `his-care-pacu.png` | ⬜ |
| 응급실 | `/emergency` | `his-care-emergency.png` | ⬜ |
| 응급실 보드 | `/emergency-board` | `his-care-emergency-board.png` | ⬜ |
| 중환자실 | `/icu` | `his-care-icu.png` | ⬜ |
| Code Blue / RRT | `/code-blue` | `his-care-code-blue.png` | ⬜ |

### 전문 진료 (12)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 내과 | `/internal-medicine` | `his-care-internal-medicine.png` | ⬜ |
| 정형외과 | `/orthopedics` | `his-care-orthopedics.png` | ⬜ |
| 신경외과 | `/neurosurgery` | `his-care-neurosurgery.png` | ⬜ |
| 산부인과 | `/obgyn` | `his-care-obgyn.png` | ⬜ |
| 소아청소년과 | `/pediatrics` | `his-care-pediatrics.png` | ⬜ |
| 정신과 | `/psychiatry` | `his-care-psychiatry.png` | ⬜ |
| 안과 | `/ophthalmology` | `his-care-ophthalmology.png` | ⬜ |
| 이비인후과 | `/ent` | `his-care-ent.png` | ⬜ |
| 피부과 | `/dermatology` | `his-care-dermatology.png` | ⬜ |
| 치과 | `/dental` | `his-care-dental.png` | ⬜ |
| 성형외과 | `/plastic` | `his-care-plastic.png` | ⬜ |
| 비뇨의학과 | `/urology` | `his-care-urology.png` | ⬜ |

### 특수 치료 (5)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 재활의학 | `/rehab` | `his-care-rehab.png` | ⬜ |
| 방사선종양 | `/radiation` | `his-care-radiation.png` | ⬜ |
| 항암 치료(사이클) | `/chemo` | `his-care-chemo.png` | ⬜ |
| 투석실 | `/dialysis` | `his-care-dialysis.png` | ⬜ |
| 장기이식 | `/transplant` | `his-care-transplant.png` | ⬜ |

### 입원 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 입원 환자 | `/inpatient` | `his-care-inpatient.png` | ⬜ |
| 회진 | `/rounds` | `his-care-rounds.png` | ⬜ |
| 인수인계 | `/handoffs` | `his-care-handoffs.png` | ⬜ |
| 병상 현황 | `/beds` | `his-care-beds.png` | ⬜ |
| 병상·입원 보드 | `/bed-board` | `his-care-bed-board.png` | ✅ |
| 급식 | `/nutrition` | `his-care-nutrition.png` | ⬜ |

### 협진/의뢰 (4)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 협진 의뢰 | `/consultations` | `his-care-consultations.png` | ⬜ |
| 의뢰서 문서 | `/consultations/letters` | `his-care-consultations-letters.png` | ⬜ |
| 상담 데스크 | `/consult` | `his-care-consult.png` | ⬜ |
| 고객의 소리(VoC) | `/admin/voc` | `his-care-admin-voc.png` | ⬜ |

## 진료지원 — `support` (62)

### 진료 지원 (14)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 약국 | `/pharmacy` | `his-support-pharmacy.png` | ✅ |
| 약국 보드 | `/pharmacy-board` | `his-support-pharmacy-board.png` | ⬜ |
| 약사 임상활동 | `/pharmacist-activity` | `his-support-pharmacist-activity.png` | ⬜ |
| 검사실 | `/lab` | `his-support-lab.png` | ⬜ |
| 영상실 | `/imaging` | `his-support-imaging.png` | ⬜ |
| 병리과 | `/pathology` | `his-support-pathology.png` | ⬜ |
| 기초검사 | `/diagnostics` | `his-support-diagnostics.png` | ⬜ |
| 혈액은행 | `/blood-bank` | `his-support-blood-bank.png` | ⬜ |
| 화상진료 | `/telehealth` | `his-support-telehealth.png` | ⬜ |
| 비대면진료 | `/remote-consult` | `his-support-remote-consult.png` | ⬜ |
| 만성질환 관리 | `/chronic` | `his-support-chronic.png` | ⬜ |
| 임상 도구(점수·계산) | `/clinical-tools` | `his-support-clinical-tools.png` | ⬜ |
| 검사·영상 보드 | `/diagnostics-board` | `his-support-diagnostics-board.png` | ⬜ |
| PACS 주치의 포털 | `/pacs-portal` | `his-support-pacs-portal.png` | ⬜ |

### 워크스테이션 (28)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 접수 워크스테이션 | `/workstation/front-desk` | `his-support-workstation-front-desk.png` | ⬜ |
| 워크스테이션 | `/workstation` | `his-support-workstation.png` | ✅ |
| 검사실 | `/workstation/lab` | `his-support-workstation-lab.png` | ⬜ |
| 영상실 | `/workstation/imaging` | `his-support-workstation-imaging.png` | ✅ |
| 기초검사 | `/workstation/diagnostic` | `his-support-workstation-diagnostic.png` | ⬜ |
| 판독 대기 | `/workstation/reading` | `his-support-workstation-reading.png` | ✅ |
| 치료실 | `/workstation/therapy` | `his-support-workstation-therapy.png` | ⬜ |
| 검사항목 관리 | `/workstation/templates` | `his-support-workstation-templates.png` | ⬜ |
| 약국 | `/workstation/pharmacy` | `his-support-workstation-pharmacy.png` | ⬜ |
| 간호(입원) | `/workstation/nursing` | `his-support-workstation-nursing.png` | ⬜ |
| 간호(외래) | `/workstation/outpatient-nursing` | `his-support-workstation-outpatient-nursing.png` | ⬜ |
| 접수 | `/workstation/reception` | `his-support-workstation-reception.png` | ⬜ |
| 동의서 | `/workstation/consent` | `his-support-workstation-consent.png` | ⬜ |
| 서류 발급 | `/workstation/documents` | `his-support-workstation-documents.png` | ⬜ |
| 진단서 발급 | `/workstation/certificates` | `his-support-workstation-certificates.png` | ⬜ |
| 퇴원 | `/workstation/discharge` | `his-support-workstation-discharge.png` | ⬜ |
| 입원 | `/workstation/admission` | `his-support-workstation-admission.png` | ⬜ |
| 수술 준비 | `/workstation/surgery-prep` | `his-support-workstation-surgery-prep.png` | ⬜ |
| 수술 후 회복 | `/workstation/post-op` | `his-support-workstation-post-op.png` | ⬜ |
| 중환자실 | `/workstation/icu` | `his-support-workstation-icu.png` | ⬜ |
| 주치의 | `/workstation/attending` | `his-support-workstation-attending.png` | ⬜ |
| 응급실 | `/workstation/emergency` | `his-support-workstation-emergency.png` | ⬜ |
| 혈액은행 | `/workstation/blood-bank` | `his-support-workstation-blood-bank.png` | ⬜ |
| 영양 | `/workstation/nutrition` | `his-support-workstation-nutrition.png` | ⬜ |
| 장비 | `/workstation/equipment` | `his-support-workstation-equipment.png` | ⬜ |
| 중앙공급 | `/workstation/cssd` | `his-support-workstation-cssd.png` | ⬜ |
| 감염관리 | `/workstation/infection-control` | `his-support-workstation-infection-control.png` | ⬜ |
| 재활 | `/workstation/rehab-station` | `his-support-workstation-rehab-station.png` | ⬜ |

### 클리닉 센터 (17)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 건강검진센터 | `/his-checkup` | `his-support-his-checkup.png` | ✅ |
| 검진 접수 | `/his-checkup/reception` | `his-support-his-checkup-reception.png` | ⬜ |
| 검진 대기 | `/his-checkup/waiting` | `his-support-his-checkup-waiting.png` | ⬜ |
| 검사실 허브 | `/his-checkup/ws` | `his-support-his-checkup-ws.png` | ⬜ |
| 동선 현황판 | `/his-checkup/flow-board` | `his-support-his-checkup-flow-board.png` | ⬜ |
| 동선 모니터(QR) | `/patient-flow` | `his-support-patient-flow.png` | ⬜ |
| 대기 디스플레이 | `/display/checkup` | `his-support-display-checkup.png` | ⬜ |
| 검진 스테이션 | `/his-checkup/station` | `his-support-his-checkup-station.png` | ⬜ |
| 문진표 관리 | `/his-checkup/questionnaires` | `his-support-his-checkup-questionnaires.png` | ⬜ |
| 검진 프로그램 | `/his-checkup/programs` | `his-support-his-checkup-programs.png` | ⬜ |
| 검사항목 관리 | `/his-checkup/test-catalog` | `his-support-his-checkup-test-catalog.png` | ⬜ |
| 검진 프로토콜 | `/his-checkup/protocols` | `his-support-his-checkup-protocols.png` | ⬜ |
| 검진 예약 | `/his-checkup/schedule` | `his-support-his-checkup-schedule.png` | ⬜ |
| 소견 대기 | `/his-checkup/review` | `his-support-his-checkup-review.png` | ⬜ |
| 단체 검진 | `/his-checkup/contracts` | `his-support-his-checkup-contracts.png` | ⬜ |
| 추적 관리 | `/his-checkup/follow-ups` | `his-support-his-checkup-follow-ups.png` | ⬜ |
| 검진 통계 | `/his-checkup/stats` | `his-support-his-checkup-stats.png` | ⬜ |

### 의무기록 (3)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 동의서 | `/consent` | `his-support-consent.png` | ⬜ |
| 기록 검색 | `/medical-records/search` | `his-support-medical-records-search.png` | ⬜ |
| 사본 발급 | `/medical-records/copy` | `his-support-medical-records-copy.png` | ⬜ |

## 환자·고객 — `patient` (17)

### CRM (11)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| CRM 대시보드 | `/crm` | `his-patient-crm.png` | ⬜ |
| 검진 대상자 | `/crm/checkup/targets` | `his-patient-crm-checkup-targets.png` | ⬜ |
| 검진 실적 | `/crm/checkup/analytics` | `his-patient-crm-checkup-analytics.png` | ⬜ |
| 해외환자 케이스 | `/crm/international/cases` | `his-patient-crm-international-cases.png` | ⬜ |
| 해외환자 실적 | `/crm/international/analytics` | `his-patient-crm-international-analytics.png` | ⬜ |
| 캠페인 | `/crm/campaigns` | `his-patient-crm-campaigns.png` | ⬜ |
| 템플릿 | `/crm/templates` | `his-patient-crm-templates.png` | ⬜ |
| 세그먼트 | `/crm/segments` | `his-patient-crm-segments.png` | ⬜ |
| CRM 상담 | `/crm/consultation` | `his-patient-crm-consultation.png` | ⬜ |
| CRM 분석 | `/crm/analytics` | `his-patient-crm-analytics.png` | ⬜ |
| 자동화 | `/crm/automation` | `his-patient-crm-automation.png` | ⬜ |

### 병원 안내 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 진료과 안내 | `/departments` | `his-patient-departments.png` | ⬜ |
| 의료진 소개 | `/doctors` | `his-patient-doctors.png` | ⬜ |
| 시설 안내 | `/facility-info` | `his-patient-facility-info.png` | ⬜ |
| 병원 소식 | `/his-news` | `his-patient-his-news.png` | ⬜ |
| 건강정보 | `/his-health-info` | `his-patient-his-health-info.png` | ⬜ |
| 채용 안내 | `/recruit` | `his-patient-recruit.png` | ⬜ |

## 질·안전 — `quality` (22)

### 의료 질/연구 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 임상경로 | `/clinical-pathway` | `his-quality-clinical-pathway.png` | ⬜ |
| 다학제진료(MDT) | `/mdt` | `his-quality-mdt.png` | ⬜ |
| 암 등록 | `/cancer-registry` | `his-quality-cancer-registry.png` | ⬜ |
| 임상 연구(IRB) | `/research` | `his-quality-research.png` | ⬜ |
| OMOP CDM | `/omop-cdm` | `his-quality-omop-cdm.png` | ⬜ |
| 당직/근무 | `/duty-schedule` | `his-quality-duty-schedule.png` | ⬜ |

### 안전/질관리 (16)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 환자안전(사고 보고) | `/safety` | `his-quality-safety.png` | ⬜ |
| 감염·질·안전 보드 | `/safety-quality-board` | `his-quality-safety-quality-board.png` | ⬜ |
| 감염관리 | `/infection` | `his-quality-infection.png` | ⬜ |
| 직원 노출 사고 | `/infection/staff-exposure` | `his-quality-infection-staff-exposure.png` | ⬜ |
| QI | `/quality` | `his-quality-quality.png` | ⬜ |
| 매핑 임상검토 | `/mapping-review` | `his-quality-mapping-review.png` | ⬜ |
| 직원교육 | `/education` | `his-quality-education.png` | ⬜ |
| 자격·교육(SQE) | `/admin/sqe` | `his-quality-admin-sqe.png` | ✅ |
| 위원회·정책(GLD) | `/admin/gld` | `his-quality-admin-gld.png` | ⬜ |
| 안전 게이트 관제 | `/admin/safety-gates` | `his-quality-admin-safety-gates.png` | ✅ |
| 대외 발신 관제 | `/admin/outbound-channels` | `his-quality-admin-outbound-channels.png` | ✅ |
| 기관 연동 | `/admin/agency-integrations` | `his-quality-admin-agency-integrations.png` | ⬜ |
| 중요 결정 | `/admin/decisions` | `his-quality-admin-decisions.png` | ✅ |
| 감사 대시보드 | `/admin/audit-dashboard` | `his-quality-admin-audit-dashboard.png` | ✅ |
| 오더 서명 로그 | `/admin/order-sign-logs` | `his-quality-admin-order-sign-logs.png` | ✅ |
| 단말 보안 | `/admin/terminal-security` | `his-quality-admin-terminal-security.png` | ⬜ |

## 운영 — `ops` (19)

### 원무/관리 (13)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 원무·수납 보드 | `/reception-billing-board` | `his-ops-reception-billing-board.png` | ⬜ |
| 수납 | `/billing` | `his-ops-billing.png` | ⬜ |
| 보험 청구 | `/claims` | `his-ops-claims.png` | ⬜ |
| 원가 분석 | `/cost-analysis` | `his-ops-cost-analysis.png` | ⬜ |
| 환자 만족도 | `/satisfaction` | `his-ops-satisfaction.png` | ⬜ |
| 자재/재고 | `/inventory` | `his-ops-inventory.png` | ⬜ |
| 중앙공급 | `/cssd` | `his-ops-cssd.png` | ⬜ |
| 장비 | `/equipment` | `his-ops-equipment.png` | ⬜ |
| 인사 | `/hr` | `his-ops-hr.png` | ⬜ |
| 생체등록·기기관리 | `/admin/staff-devices` | `his-ops-admin-staff-devices.png` | ✅ |
| 인증 관리 콘솔 | `/admin/identity` | `his-ops-admin-identity.png` | ✅ |
| 승인 감사(서명·처방) | `/admin/stepup-approvals` | `his-ops-admin-stepup-approvals.png` | ⬜ |
| 동선 스테이션 | `/admin/location-stations` | `his-ops-admin-location-stations.png` | ⬜ |

### 전원/연동 (4)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 전원 관리 | `/transfer` | `his-ops-transfer.png` | ⬜ |
| 전원 의뢰 | `/transfer/request` | `his-ops-transfer-request.png` | ⬜ |
| 수신 전원 | `/transfer/incoming` | `his-ops-transfer-incoming.png` | ⬜ |
| 전원 이력 | `/transfer/history` | `his-ops-transfer-history.png` | ⬜ |

### 경영진 (2)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 경영 대시보드 | `/executive` | `his-ops-executive.png` | ⬜ |
| 의료 품질 | `/executive/clinical` | `his-ops-executive-clinical.png` | ⬜ |

## 지능형 — `intel` (7)

### AI(WeRU.B)/시뮬레이션 (7)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| AI(WeRU.B) 컨시어지 | `/concierge` | `his-intel-concierge.png` | ⬜ |
| AI(WeRU.B) 예약 도우미 | `/ai-booking` | `his-intel-ai-booking.png` | ⬜ |
| 시뮬레이터/플로어맵 | `/simulator` | `his-intel-simulator.png` | ⬜ |
| 메타버스 뷰어 | `/metaverse` | `his-intel-metaverse.png` | ⬜ |
| 환자 여정 | `/journey` | `his-intel-journey.png` | ⬜ |
| 상호운용성 | `/interoperability` | `his-intel-interoperability.png` | ⬜ |
| 연동 테스트 콘솔 | `/interoperability/test` | `his-intel-interoperability-test.png` | ⬜ |

## 시스템 관리 — `system` (87)

### 개원 전 시스템 관리 (36)

| 소분류 | 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|---|
| 개원 관제 | 개원·운영 단계 | `/admin/opening` | `his-system-admin-opening.png` | ✅ |
| 개원 관제 | 운영 전환(Go-Live) 관제 | `/admin/go-live` | `his-system-admin-go-live.png` | ✅ |
| 개원 관제 | 연동 개통 게이트 | `/admin/integration-gates` | `his-system-admin-integration-gates.png` | ⬜ |
| 개원 관제 | Phase0 컷오버 승인 | `/admin/phase0-cutover` | `his-system-admin-phase0-cutover.png` | ⬜ |
| 개원 관제 | EMR 인증 | `/admin/emr-cert` | `his-system-admin-emr-cert.png` | ⬜ |
| 코드·마스터 | 코드 마스터 | `/admin/codes` | `his-system-admin-codes.png` | ✅ |
| 코드·마스터 | 비급여 관리 | `/admin/non-covered` | `his-system-admin-non-covered.png` | ⬜ |
| 코드·마스터 | 약품 보험코드 매핑 | `/admin/drug-mapping` | `his-system-admin-drug-mapping.png` | ⬜ |
| 코드·마스터 | 수가 계산기 | `/admin/billing-calc` | `his-system-admin-billing-calc.png` | ⬜ |
| 코드·마스터 | 진료과 카탈로그 | `/admin/dept-catalog` | `his-system-admin-dept-catalog.png` | ⬜ |
| 코드·마스터 | 카테고리 관리 | `/admin/categories` | `his-system-admin-categories.png` | ⬜ |
| 임상 규칙·템플릿 | 약속처방(CP) | `/admin/order-sets` | `his-system-admin-order-sets.png` | ⬜ |
| 임상 규칙·템플릿 | 치료일정 템플릿 | `/admin/treatment-templates` | `his-system-admin-treatment-templates.png` | ⬜ |
| 임상 규칙·템플릿 | 원내 처방집(위원회) | `/admin/formulary` | `his-system-admin-formulary.png` | ⬜ |
| 임상 규칙·템플릿 | CDSS 규칙 | `/admin/cdss-rules` | `his-system-admin-cdss-rules.png` | ⬜ |
| 임상 규칙·템플릿 | 여정 프로토콜 | `/admin/protocols` | `his-system-admin-protocols.png` | ⬜ |
| 임상 규칙·템플릿 | 처방의 지정 규칙 | `/admin/prescriber-rules` | `his-system-admin-prescriber-rules.png` | ⬜ |
| 임상 규칙·템플릿 | 차트 에디터 | `/admin/chart-editor` | `his-system-admin-chart-editor.png` | ⬜ |
| 임상 규칙·템플릿 | 폼 빌더 | `/admin/forms` | `his-system-admin-forms.png` | ⬜ |
| 임상 규칙·템플릿 | 임상도구 검수 | `/admin/clinical-chart-verification` | `his-system-admin-clinical-chart-verification.png` | ⬜ |
| 임상 규칙·템플릿 | 트리아지 관리 | `/admin/triage` | `his-system-admin-triage.png` | ⬜ |
| 시설·장비 | 시설 관리 | `/admin/facility` | `his-system-admin-facility.png` | ⬜ |
| 시설·장비 | 응급실 베드 관리 | `/admin/er-beds` | `his-system-admin-er-beds.png` | ⬜ |
| 시설·장비 | TV 디스플레이 관리 | `/admin/displays` | `his-system-admin-displays.png` | ⬜ |
| 시설·장비 | 워크스테이션·디바이스 | `/admin/workstations` | `his-system-admin-workstations.png` | ⬜ |
| 권한·보안 | 접근 권한 | `/admin/access-control` | `his-system-admin-access-control.png` | ✅ |
| 권한·보안 | 역할 권한 | `/admin/rbac` | `his-system-admin-rbac.png` | ✅ |
| 권한·보안 | 전자인증서 | `/admin/blockchain-cert` | `his-system-admin-blockchain-cert.png` | ✅ |
| 권한·보안 | ERP 접근 설정 | `/admin/erp` | `his-system-admin-erp.png` | ⬜ |
| 화면·표시 | 메뉴 관리 | `/admin/menus` | `his-system-admin-menus.png` | ⬜ |
| 화면·표시 | 메뉴 구성·권한 | `/admin/menu-config` | `his-system-admin-menu-config.png` | ⬜ |
| 화면·표시 | 화면번호 레지스트리 | `/admin/screen-codes` | `his-system-admin-screen-codes.png` | ⬜ |
| 화면·표시 | 대시보드 템플릿 | `/admin/dashboard-templates` | `his-system-admin-dashboard-templates.png` | ⬜ |
| 화면·표시 | 수치 표시·반올림 정책 | `/admin/numeric-policy` | `his-system-admin-numeric-policy.png` | ⬜ |
| 화면·표시 | 확장 슬롯 | `/admin/extensions` | `his-system-admin-extensions.png` | ⬜ |
| 시스템 설정 | 시스템 설정 | `/admin/ai-settings` | `his-system-admin-ai-settings.png` | ✅ |

### 운영 시스템 관리 (33)

| 소분류 | 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|---|
| 인력·일정 | 직원 관리 | `/admin/staff-management` | `his-system-admin-staff-management.png` | ✅ |
| 인력·일정 | 신규 입사자 관리 | `/admin/onboarding` | `his-system-admin-onboarding.png` | ✅ |
| 인력·일정 | 의료팀 편성 | `/admin/care-teams` | `his-system-admin-care-teams.png` | ✅ |
| 인력·일정 | 진료표 | `/admin/clinic-schedule` | `his-system-admin-clinic-schedule.png` | ⬜ |
| 인력·일정 | 당직표 | `/admin/duty-schedule` | `his-system-admin-duty-schedule.png` | ⬜ |
| 병원 운영 | 전자결재 대시보드 | `/admin/approvals-dashboard` | `his-system-admin-approvals-dashboard.png` | ⬜ |
| 병원 운영 | 문진 대시보드 | `/admin/questionnaire-dashboard` | `his-system-admin-questionnaire-dashboard.png` | ⬜ |
| 병원 운영 | HIRA 청구 | `/admin/hira-edi` | `his-system-admin-hira-edi.png` | ⬜ |
| 병원 운영 | 환자 마킹(루비) | `/admin/patient-flags` | `his-system-admin-patient-flags.png` | ⬜ |
| 관제·지표 | 통계/분석 | `/admin/analytics` | `his-system-admin-analytics.png` | ⬜ |
| 관제·지표 | 환자여정 관제 | `/journey-console` | `his-system-journey-console.png` | ⬜ |
| 관제·지표 | 이탈·지연 분석 | `/flow-analytics` | `his-system-flow-analytics.png` | ⬜ |
| 관제·지표 | 병원 현황 | `/admin/status` | `his-system-admin-status.png` | ⬜ |
| 의료질·안전 | 질관리 (QI) | `/admin/qi` | `his-system-admin-qi.png` | ⬜ |
| 의료질·안전 | 기기 리콜 역추적 | `/admin/device-recall` | `his-system-admin-device-recall.png` | ⬜ |
| 의료질·안전 | 낙상/욕창 재평가 | `/admin/risk-reassessment` | `his-system-admin-risk-reassessment.png` | ⬜ |
| 의료질·안전 | 데이터 품질 | `/admin/data-quality` | `his-system-admin-data-quality.png` | ⬜ |
| 의료질·안전 | 마약류 관리 | `/admin/controlled-substance` | `his-system-admin-controlled-substance.png` | ⬜ |
| 기록·감사·감시 | 미비기록(HIM) | `/admin/him` | `his-system-admin-him.png` | ⬜ |
| 기록·감사·감시 | 감사 로그 | `/admin/audit` | `his-system-admin-audit.png` | ⬜ |
| 기록·감사·감시 | 응급 접근 검토 | `/admin/break-glass` | `his-system-admin-break-glass.png` | ✅ |
| 기록·감사·감시 | 보유·파기(Retention) | `/admin/retention` | `his-system-admin-retention.png` | ⬜ |
| 기록·감사·감시 | UI 다국어 검수 | `/admin/ui-locale` | `his-system-admin-ui-locale.png` | ⬜ |
| 기록·감사·감시 | 상시 감시 | `/admin/sentinel` | `his-system-admin-sentinel.png` | ⬜ |
| AI 운영·감수 | AI 약물설명 승인 | `/admin/drug-explain` | `his-system-admin-drug-explain.png` | ⬜ |
| AI 운영·감수 | 검진해석 콘텐츠(감수) | `/admin/checkup-explainer` | `his-system-admin-checkup-explainer.png` | ⬜ |
| AI 운영·감수 | 봇 관리 | `/admin/bots` | `his-system-admin-bots.png` | ⬜ |
| AI 운영·감수 | 의료법 AI(WeRU.B) | `/admin/medical-law` | `his-system-admin-medical-law.png` | ⬜ |
| AI 운영·감수 | 영상 AI(WeRU.B) | `/admin/ai-vision` | `his-system-admin-ai-vision.png` | ⬜ |
| AI 운영·감수 | 회의 분석 | `/admin/ai-meeting` | `his-system-admin-ai-meeting.png` | ⬜ |
| AI 운영·감수 | AI(WeRU.B) 상담 | `/admin/ai-counseling` | `his-system-admin-ai-counseling.png` | ⬜ |
| AI 운영·감수 | AI(WeRU.B) 번역 | `/admin/ai-translate` | `his-system-admin-ai-translate.png` | ⬜ |
| AI 운영·감수 | AI(WeRU.B) 감독 관제 | `/admin/ai-oversight` | `his-system-admin-ai-oversight.png` | ✅ |

### 검진권 (5)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 검진권 발행·조회 | `/admin/voucher/issue` | `his-system-admin-voucher-issue.png` | ⬜ |
| 검진권 목록 | `/admin/voucher/list` | `his-system-admin-voucher-list.png` | ⬜ |
| 검진권 대시보드 | `/admin/voucher/dashboard` | `his-system-admin-voucher-dashboard.png` | ⬜ |
| 검진권 딜러 | `/admin/voucher/distributors` | `his-system-admin-voucher-distributors.png` | ⬜ |
| 검진권 정책 | `/admin/voucher/settings` | `his-system-admin-voucher-settings.png` | ⬜ |

### 외부 연동 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 연동 신청 관리 | `/admin/partner-requests` | `his-system-admin-partner-requests.png` | ⬜ |
| 연동 모니터링 | `/admin/partner-monitoring` | `his-system-admin-partner-monitoring.png` | ⬜ |
| 연동 기관 | `/admin/organizations` | `his-system-admin-organizations.png` | ⬜ |
| SMART 클라이언트 | `/admin/smart-clients` | `his-system-admin-smart-clients.png` | ⬜ |
| 전원 통계 | `/admin/transfer-stats` | `his-system-admin-transfer-stats.png` | ⬜ |
| 진료정보교류(HIE) | `/admin/hie-dashboard` | `his-system-admin-hie-dashboard.png` | ⬜ |

### 홈페이지 관리 (7)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 홈페이지 대시보드 | `/admin/homepage` | `his-system-admin-homepage.png` | ⬜ |
| 콘텐츠 관리(CMS) | `/admin/hospital-info` | `his-system-admin-hospital-info.png` | ⬜ |
| 공지/팝업 | `/admin/homepage/popups` | `his-system-admin-homepage-popups.png` | ⬜ |
| 배너 관리 | `/admin/homepage/banners` | `his-system-admin-homepage-banners.png` | ⬜ |
| 미디어 라이브러리 | `/admin/homepage/media` | `his-system-admin-homepage-media.png` | ⬜ |
| SEO/메타데이터 | `/admin/homepage/seo` | `his-system-admin-homepage-seo.png` | ⬜ |
| 홈페이지 배포 | `/admin/homepage/deploy` | `his-system-admin-homepage-deploy.png` | ⬜ |

## 개인 — `personal` (7)

### 생활/편의 (1)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 직원 식단표 | `/staff-meal` | `his-personal-staff-meal.png` | ⬜ |

### 내 설정 (6)

| 메뉴 | 화면 경로 | 파일 | 상태 |
|---|---|---|---|
| 내 행정(ESS) | `/ess` | `his-personal-ess.png` | ⬜ |
| 내 전자인증서 | `/settings/my-certificate` | `his-personal-settings-my-certificate.png` | ⬜ |
| 내 서명 등록 | `/settings/my-signature` | `his-personal-settings-my-signature.png` | ⬜ |
| 나의 약속처방 | `/settings/my-codes` | `his-personal-settings-my-codes.png` | ⬜ |
| 단축키·화면번호 | `/settings/shortcuts` | `his-personal-settings-shortcuts.png` | ⬜ |
| 음성 설정 (VoiceEMR) | `/settings/voice` | `his-personal-settings-voice.png` | ⬜ |

## 다시 만들기

```sh
node tools/build-screen-index.mjs          # 다시 만들기
node tools/build-screen-index.mjs --check  # 메뉴 구성표 · 실제 파일과 같은지 확인만
```
