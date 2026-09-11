<!-- 생성물 — 직접 수정 금지. 연결 판정 기록에서 만듭니다. -->

# 연결 상태 (초안)

> 이 통합 릴리즈 초안의 버전 조합에서, 시스템 사이 연결이 **코드상 어디까지 준비돼 있는지**를 적습니다.

| 기준 | 값 |
|---|---|
| 판정 방법 | 양쪽 시스템의 코드를 기준 커밋에서 읽어 대조했습니다(2026-09-11). 실제로 호출해 확인한 것은 아직 없습니다 |
| 기준 커밋 | [`data/base-commits.json`](../../data/base-commits.json) (고정 2026-09-11) |
| 사실 확인 | 시스템 담당 확인 전 — 생태계 자료 측 조사 기준 |
| 싣지 않은 연결 | **7개** — 시스템 담당의 확인을 기다리는 연결입니다. 확인되면 이 표에 넣습니다 |

## 상태를 읽는 법

| 상태 | 뜻 |
|---|---|
| `검증됨` | 실제로 호출해 동작을 확인함(확인일 필수) — **이 초안에는 아직 없습니다** |
| `구현·미검증` | 양쪽 코드가 서로 맞물려 있음. 실제 호출로는 아직 확인하지 않음 |
| `설계만` | 문서 · 규격만 있음 |
| `미구현` | 한쪽 코드가 없음 — 이 연결이 필요하면 구축 기관이 대체 수단을 준비합니다 |
| `중단` | 지금 동작하지 않음 |
| `판정 불가` | 배포 구성(주소 · 앞단 프록시 등)에 따라 달라져 코드만으로 정할 수 없음 |

## 합계

| 실은 연결 | 구현·미검증 | 설계만 | 미구현 | 중단 | 판정 불가 |
|---:|---:|---:|---:|---:|---:|
| 113 | 88 | 1 | 15 | 7 | 2 |

연결은 방향과 목적별로 나눴습니다(같은 두 시스템 사이에도 여러 연결이 있습니다). 실제 호출로 `검증됨`을 붙이는 일은 새 설치본으로 구축 절차를 따라가며 합니다.

## 시스템 쌍별

### HIS ⇄ ERP

`구현·미검증` 14 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → ERP | 수납·청구·재고·자산·인사·검진권·서명완료 운영 이벤트 전달(회계 전표·미러 적재) | HTTP POST 웹훅 · HIS outbox(20초 디스패처·지수 백오프·(domain,ref) 멱등) →… | `구현·미검증` |
| HIS → ERP | 직원 SSO — HIS 로그인 사용자를 ERP 로 자동 로그인(JIT 계정 생성) | 브라우저 SSO 핸드오프(공유 비밀키 서명 토큰) | `구현·미검증` |
| HIS → ERP | 직원 셀프서비스(ESS) — 급여명세·연차 잔여·원천징수·공제코드·당직·성과·퇴직금·증명서 조회, 급여 신원 등록 | HTTP GET/POST /api/v1/integration/hr/{payslip\|leave-balance… | `구현·미검증` |
| HIS → ERP | 수납 화면·환자 포털의 중간/최종 진료비 계산서 조회(ERP 산정값) | HTTP GET /api/v1/integration/billing/invoice?chartNo=&encoun… | `구현·미검증` |
| HIS → ERP | 마스터 — ERP 가 확정한 약품 코드 매핑을 HIS 가 가져와 보험코드 백필 | HTTP GET /api/v1/integration/regulatory/drug-map/confirmed | `구현·미검증` |
| ERP → HIS | 청구 라인·미청구 진행분·비급여·재료·재원(census) 조회 — 전환 시 일괄 적재(backfill)와 간호 모니터 | HTTP GET /api/v1/integration/billing/{lines\|unbilled-progre… | `구현·미검증` |
| ERP → HIS | 마스터 — HIS 직원 디렉터리 조회 후 ERP 사원코드를 HIS 직원에 매핑(전자서명 서명자 식별용) | HTTP GET /api/v1/integration/hr/staff · POST /api/v1/integra… | `구현·미검증` |
| ERP → HIS | 마스터 — 행위 수가·비급여·재료대 마스터를 ERP 에서 HIS 로 적재 | HTTP POST /api/v1/integration/fee/{procedure-codes\|non-cove… | `구현·미검증` |
| ERP → HIS | 전자결재 상신 릴레이 — ERP 결재 문서를 HIS 경유로 Clinic 그룹웨어 결재(W.Sign)에 올림 · 결재선 조회 · 상태 조회 | HTTP POST /api/v1/erp/eapproval/submit(Idempotency-Key) · GE… | `구현·미검증` |
| HIS → ERP | 전자결재 결과 콜백 — Clinic W.Sign 결재 결과를 HIS 가 ERP 로 전달 | HTTP POST (상신 때 받은 callback_url, ERP 기본 /api/v1/integrations… | `구현·미검증` |
| ERP → HIS | 휴가 결재 결과를 HIS ESS 로 릴레이 | HTTP POST /api/v1/ess/leave/eapproval-callback | `구현·미검증` |
| ERP → HIS | 검진권 딜러 정산 지급 회신(settlement.paid) | HTTP POST /api/v1/voucher/settlements/erp-callback (2분 주기 워커… | `구현·미검증` |
| ERP → HIS | 재고 입고(inventory·CSSD supply)·자산 코드 매핑·청구 심사결과 콜백·환자 조회 — HIS 가 받을 준비만 된 경로들 | HTTP POST /api/v1/integration/inventory/supply · /api/v1/int… | `미구현` |
| ERP → HIS | 의료진 계약 전자서명 발의 — ERP 가 계약을 만들면 HIS 가 문서 발급·sign 제출·요청 ID 바인딩 | HTTP POST /api/v1/sign-integration/erp/request-sign {sourceI… | `구현·미검증` |
| ERP → HIS | 서명 완료본(PDF) 회수 — sign.completed 이벤트에 실린 HIS 문서 다운로드 주소로 가져와 첨부 | HTTP GET (이벤트 payload.document 의 단기 토큰 URL) · ERP 아웃박스(2분 주기… | `구현·미검증` |

### HIS ⇄ LIS

`구현·미검증` 9 · `미구현` 4

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → LIS | 검사 오더 전달 — LIS가 HIS FHIR ServiceRequest(active)를 5분 주기 증분 폴링 | FHIR R4 REST 검색(searchset) · 폴링 | `구현·미검증` |
| HIS → LIS | 검사 오더 취소 전파 — LIS가 status=revoked 를 같은 워터마크로 폴링해 LIS 오더·병리 케이스 취소 | FHIR R4 REST 검색 · 폴링 | `구현·미검증` |
| LIS → HIS | 환자 성명 조회(오더 폴링 중 subject Patient 읽기) | FHIR R4 REST read | `구현·미검증` |
| LIS → HIS | 검사 결과 전달 — 결과 확정 시 DiagnosticReport(contained Observation) POST → HIS 스테이징 큐 | FHIR R4 REST create | `구현·미검증` |
| LIS → HIS | 검사 결과 HL7 ORU^R01 전송(MLLP) — 대체 경로 | HL7 v2.5.1 over MLLP(TCP) | `미구현` |
| HIS → LIS | 검사 처방 HL7 OML^O21 수신(LIS inbound) — 대체 경로 | HL7 v2 메시지를 HTTP 본문으로(POST) | `미구현` |
| LIS → HIS | Reflex 추가검사 오더 — LIS 가 ServiceRequest(draft)를 transaction Bundle 로 보내 HIS PreOrder(의사 승인 대기)로 수용 | FHIR R4 transaction Bundle(POST fhir/R4) | `구현·미검증` |
| LIS → HIS | Reflex 추가검사 오더 HL7 ORM^O01(MLLP) — HIS_ORDER_TRANSPORT=ORM 선택 시 | HL7 v2 over MLLP | `미구현` |
| LIS → HIS | Reflex PreOrder 승인·반려 상태 폴링(GET ServiceRequest/:id) | FHIR R4 REST read · 10분 폴링 | `구현·미검증` |
| HIS → LIS | Reflex 승인·반려 웹훅(HIS→LIS push · 폴링 대안) | HTTPS POST JSON | `미구현` |
| LIS → HIS | 검사코드 카탈로그 반입(H1 · edi_code 정본 · 1:N 패널 · since 증분) | HTTPS GET JSON(커스텀) | `구현·미검증` |
| LIS → HIS | 조직 게이트 결재 상태 참조(HIS 전자결재 중계 EApprovalRelay) | HTTPS GET JSON(커스텀) | `구현·미검증` |
| LIS → HIS | 수혈 동의 상태 참조(FHIR Consent 파생 상태 · 출고 전 확인) | HTTPS GET JSON(Consent 모양 · 커스텀 EP) | `구현·미검증` |

### HIS ⇄ Clinic

`구현·미검증` 10 · `미구현` 1 · `판정 불가` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| Clinic → HIS | 직원 SSO 로그인 — Clinic 이 1회용 토큰 발급 → HIS `/sso`(또는 `POST /api/v1/sso/verify`) 가 Clinic `/api/clinic/sso/verify` 로… | HTTPS 리다이렉트(브라우저) + 서버간 REST(JSON) | `구현·미검증` |
| HIS → Clinic | 직원 일괄 등록(HIS 재직자 → Clinic 멤버·계정 생성) · 회신 clinicUserId 를 Staff 에 영속 | REST(JSON) POST `/api/clinic/his/staff/sync` | `구현·미검증` |
| HIS → Clinic | 조직도·보고라인 동기화 v2(사번 기준 멱등 upsert · mappings[] 회신 영속) — 결재선 추천 근거 | REST(JSON) POST `/api/clinic/his/organization/sync` | `구현·미검증` |
| HIS → Clinic | Clinic 직원 목록 조회 → 이메일·clinicUserId 로 HIS Staff 매핑(sync-staff) | REST(JSON) GET `/api/clinic/his/staff` | `구현·미검증` |
| HIS → Clinic | 업무 연동 API 군 — 알림(일반·긴급)·채널 메시지·인수인계·채널 목록·캘린더 동기화·수술 일정·근태·연차 조회/신청·위키 검색/조회/생성·Clinic 웹훅 구독/해제 | REST(JSON) `/api/clinic/his/{notify,notify/urgent,channel/me… | `구현·미검증` |
| HIS → Clinic | 전자결재(W.Sign) 요청·상태 조회·결재선 추천 — ERP 결재 릴레이의 HIS→Clinic 구간 | REST(JSON) `/api/clinic/his/wsign/request` · `/wsign/status/… | `구현·미검증` |
| Clinic → HIS | W.Sign 결재 결과 콜백(wsign.approved/rejected/withdrawn) → HIS 가 ERP 릴레이 결과로 전달 | HTTPS POST 웹훅 → HIS `/api/v1/webhooks/clinic` | `구현·미검증` |
| Clinic → HIS | Clinic 일반 이벤트 웹훅(연차 승인·반려 등) — HIS 가 webhooks 구독으로 등록한 URL 로 발송 | HTTPS POST 웹훅 {event,cafeId,data,timestamp} | `구현·미검증` |
| Clinic → HIS | 병원 등록(hospital-register) — Clinic 관리자가 병원을 승인할 때 발급한 API 키·병원 코드를 HIS 에 통지 | HTTPS POST(fire-and-forget) | `구현·미검증` |
| Clinic → HIS | 병원 서비스(hospital-web)의 워크그룹(의사 일정·수술·병동·투약·근무)·동선(층·구역·흐름) 데이터 — 메인앱 `/api/clinic/his/{workgroup,floor}/*` 가 HI… | REST(JSON) + SSE 패스스루 | `판정 불가` |
| HIS → Clinic | HIS → Clinic 열람 SSO 티켓(재로그인 없이 Clinic 결재 문서 열람) | REST POST `/api/clinic/his/sso-ticket` → 브라우저 `/api/clinic/h… | `미구현` |
| HIS → Clinic | HIS 이벤트 → Clinic W.Channel 채널 카드(his_webhooks format=SLACK · 직원·청구·재고 등 카탈로그 이벤트) | HTTPS POST 웹훅(Slack 호환 카드) → Clinic `/api/hooks/[webhookId]` | `구현·미검증` |

### HIS ⇄ PACS

`구현·미검증` 7 · `미구현` 3 · `판정 불가` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → PACS | 영상 오더 생성 시 PACS 워크리스트 자동 등록 + 실패분 재등록 | HTTPS REST JSON(POST /api/v1/worklist) | `구현·미검증` |
| HIS → PACS | 영상 조회 프록시 — 스터디·시리즈·판독 목록·워크리스트·대시보드·템플릿·AI 모델 목록 | HTTPS REST JSON(HIS api/v1/pacs/* → PACS /api/v1/*) | `구현·미검증` |
| HIS → PACS | 판독 작성·수정·서명 프록시(POST /reports · PATCH /reports/{id} · POST /reports/{id}/sign) | HTTPS REST JSON | `구현·미검증` |
| HIS → PACS | WADO 영상 바이트 중계(판독 워크스테이션 · 화면이 PACS 를 직접 부르지 않게) | HTTPS GET WADO-URI | `판정 불가` |
| PACS → HIS | 판독 결과 반영 — PACS 가 HIS DB 에 imaging_results UPSERT + orders.status=COMPLETED 직접 쓰기 | PostgreSQL 직접 접속(SQL) | `구현·미검증` |
| PACS → HIS | 영상 오더 → PACS 워크리스트 동기화(HIS DB 읽기 전용 · 관리자 온디맨드) · 환자 병합 재조정 | PostgreSQL 직접 접속(읽기) | `구현·미검증` |
| PACS → HIS | 판독 결과 HL7 ORU^R01 송신 | HL7 v2 over MLLP | `미구현` |
| HIS(환자 포털) → PACS | 환자 영상·판독 결과 내보내기(암호화 패키지 요청 → 상태 폴링 → 1회 수령) | HTTPS REST JSON + 1회용 게이트웨이 다운로드 | `구현·미검증` |
| HIS(환자 포털) → PACS | 환자 본인 영상·판독 목록·판독완료 알림·썸네일·판독 PDF 조회 | HTTPS REST JSON / 바이너리 | `구현·미검증` |
| HIS(환자 포털) → PACS | 환자 외부 영상(DICOM) 업로드 멀티파트 중계 | HTTPS POST multipart | `미구현` |
| HIS → PACS | 환자 인구정보·병합 HL7 ADT(IHE PIX Feed ITI-8 · Query ITI-9) | HL7 v2 ADT/QBP over MLLP | `미구현` |

### HIS ⇄ edu

`구현·미검증` 6 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → edu | 직원 SSO 핸드오프 — HIS 웹 '사내교육' 런처가 staff-token(aud=edu, RS256) 발급 → edu `/sso?token=` → edu API `POST /api/v1/auth… | 브라우저 새 창 리다이렉트 + edu 내부 REST | `구현·미검증` |
| edu → HIS | edu 자체 로그인 화면의 ID/PW 를 HIS `/api/v1/auth/login` 으로 중계 → HIS access 토큰으로 staff-token?aud=edu 교환 → JWKS 검증 → edu… | 서버간 REST(JSON) | `구현·미검증` |
| edu → HIS | staff-token 검증용 공개 JWKS 조회(테넌트별 캐시 1시간 · kid 미스 시 재조회) | HTTPS GET JWKS | `구현·미검증` |
| edu → HIS | 직원 디렉터리 조회(교육 대상자 자동 지정 · 야간 폴링 안전망) | REST GET `/api/v1/hr/staff?status=ACTIVE` | `구현·미검증` |
| edu → HIS | 교육 이수기록 기록(법정·보수교육 → HIS 자격·교육 원장) · 카탈로그 이수 | REST POST `/api/v1/staff-qualification/education`(Idempotenc… | `구현·미검증` |
| HIS → edu | 직원 이벤트 웹훅(staff.created·changed·schedule_changed·resigned 반영, qualification_changed 는 수신만) — 입사·변경·퇴직의 실시간 반영 | HTTPS POST 웹훅 {event_type,event_id,source_ref,payload} → edu… | `구현·미검증` |
| edu → HIS | edu → HIS 직원 인앱 알림 인입 | REST POST `/api/v1/integration/edu/notifications` | `미구현` |

### HIS ⇄ twin

`구현·미검증` 6

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → twin | 트윈 보기 — HMAC 서명 런치 URL(5분) 발급(구방식) | 브라우저 이동 URL(서명 토큰 쿼리) · twin-web 미들웨어가 검증 | `구현·미검증` |
| HIS → twin | SMART on FHIR EHR launch — 의료진+환자 바인딩 launch 토큰 → twin-web authorize(PKCE) → token → id_token(RS256·JWKS) 검증으로… | SMART App Launch(EHR launch · authorization_code + PKCE) · O… | `구현·미검증` |
| HIS → twin | CDS Hooks patient-view — 차트 열람 시 트윈 위험 카드(ASCVD/UKPDS/eGFR·알림·Patient-360 링크) | CDS Hooks 형식 POST /cds-services/twin-patient-view (twin-web … | `구현·미검증` |
| twin → HIS | 환자 트윈 FHIR 읽기(Patient·Condition·Observation·MedicationRequest·AllergyIntolerance·Encounter·Procedure) — 위험 점수 … | FHIR R4 REST 검색·단건 — 레거시(서비스 계정 직원 JWT → /fhir/R4/*) + SMART… | `구현·미검증` |
| twin → HIS | 운영 트윈 REST(병상·병동·재원·운영통계·의료기기·ICU/ER/OR) + 트윈 전용 EP(AI 활용 동의·일반병동 활력·영상 study 목록) | HTTPS REST(JSON · {data,meta}) | `구현·미검증` |
| twin → HIS | FHIR write-back — AI 생성 RiskAssessment · SBAR/SOAP DocumentReference 를 의료진 '차트 저장' 액션으로 HIS 에 저장 | FHIR R4 POST /fhir/R4/RiskAssessment · /fhir/R4/DocumentRefe… | `구현·미검증` |

### HIS ⇄ AI Server

`구현·미검증` 4 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → AI Server | 임상 보조 스킬 전반(요약·분석·초안·트리아지·약물상호작용·DUR·약가/대체약·수가코드·지식 RAG·예측·추론체인·자동기록·영상 판독 보조·FHIR 래퍼·의료법 점검·회의분석·상담·오케스트레이터·글… | HTTPS REST(JSON · 일부 NDJSON 스트리밍 · multipart) — 전송은 공통 egres… | `구현·미검증` |
| HIS → AI Server | VoiceEMR 실시간 STT(원음 PCM 청크 전사 · 모델 워밍 · 어휘 바이어싱 · 상태) | HTTPS REST — application/octet-stream(raw PCM 16-bit LE mono… | `구현·미검증` |
| HIS → AI Server | 앰비언트 진료 스크라이브 — 오디오 업로드 → 전사·화자분리 잡 제출 → 잡 폴링 | HTTPS REST(JSON) — 업로드 후 서명 URL 을 회의분석 잡에 전달, 비동기 잡 폴링 | `구현·미검증` |
| HIS → AI Server | 생성형 소형 클라이언트 — 환자 컨시어지 · 데이터 품질 AI · 약품집 · 거버넌스 문서 · VOC 초안 · 환자 약 설명 · 화면 번역 | HTTPS REST — Ollama 형식 /api/generate(JSON·stream:false) · /a… | `구현·미검증` |
| HIS → AI Server | 관리 화면 모델 레지스트리 — 상류 설치 모델 목록 대조(요구 태그 누락 판정) | HTTPS GET /api/tags(Ollama 표준 목록 형식 기대) | `미구현` |

### ERP ⇄ sign

`구현·미검증` 3 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| ERP → sign | 외부 거래처(외주) 계약 전자서명(트랙 A) — 증인 인증서 발급·포털 서명요청·포털 토큰 발급 | HTTP POST /v1/certificates/enroll · /v1/requests(signMode PO… | `구현·미검증` |
| sign → ERP | 서명 완료 통지(트랙 A 계약 미러·발효) | HTTP POST 웹훅 → ERP /api/v1/integrations/sign/webhook (202) ·… | `구현·미검증` |
| ERP → sign | 신뢰의 사슬 — 자금 결재 등 ERP 감사 이벤트를 sign 감사 스트림에 기록·체인 검증 | HTTP POST /v1/audit-events · GET /v1/audit-events · GET /v1/… | `구현·미검증` |
| ERP → sign | 일반 전자계약(sign contracts API — 템플릿·주소록·발송) | HTTP /v1/contracts* (sign 에 구현) | `미구현` |

### HIS ⇄ sign

`구현·미검증` 4

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → sign | 동의서·발급 문서·ERP 계약의 서명요청 제출(facade) 및 직원·환자 인증서 발급 | HTTP POST /v1/sign-requests(channel DIRECT\|PORTAL\|STAFF, d… | `구현·미검증` |
| sign → HIS | 서명 이벤트 통지 — 동의서 상태 반영·개정(superseded)·서명자 인증서 일련번호 미러·ERP 로 sign.completed 재발행 | HTTP POST 웹훅 → HIS /api/v1/sign-integration/webhook (sign 기본… | `구현·미검증` |
| HIS → sign | 직원 신원 — HIS 가 의료진 서명 전용 JWT(aud=sign) 발급, sign 이 HIS 공개 JWKS 로 검증(의료진 직접 서명 /v1/sign/staff · 결재) | HIS GET /api/v1/sign-integration/staff-token(발급) · 공개 GET /a… | `구현·미검증` |
| HIS → sign | 신뢰의 사슬 — 오더 서명 로그·거버넌스 결정의 감사 이벤트를 sign 스트림에 봉인(TSA 앵커)·체인 검증 | HTTP POST /v1/audit-events(stream his-orders 등, anchor) · GE… | `구현·미검증` |

### HIS ⇄ Jitsi

`중단` 3

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → Jitsi | 원격진료 화상 입장(의료진) — HIS 가 Jitsi JWT 를 직접 서명(의사=모더레이터) → 웹이 `NEXT_PUBLIC_JITSI_URL/<room>?jwt=` 를 연다 → Prosody 가 … | HTTPS(브라우저) · Jitsi Meet/XMPP(Prosody JWT 인증) | `중단` |
| HIS 환자 포털(웹) → Jitsi | 환자 화상 입장 — 원격진료(portal patient-token)·원격협진(remote-consult video/token)·상담(consult video) | HTTPS(브라우저 iframe/새 창) · Prosody JWT | `중단` |
| HIS 웹 → Jitsi | 원격진료 녹화 목록·메모·삭제·다운로드(Jitsi API `/meet-api/recordings*`) | REST(JSON) · 브라우저에서 직접 호출(동일 출처 프록시 경로) | `중단` |

### LIS ⇄ PACS

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| LIS → PACS | 병리 슬라이드 스캔 워크리스트 등록·취소(ORM^O01 NW/CA → PACS worklist → MWL) | HL7 v2.3 ORM^O01 over MLLP(TCP) | `구현·미검증` |
| LIS → PACS | 병리 WSI 뷰어 링크 해소 · QIDO 로 영상 도착 확인 · 열람 확인 기록 | HTTPS REST(PACS 로그인) + DICOMweb QIDO-RS + 뷰어 런처 URL | `구현·미검증` |

### PACS ⇄ sign

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| PACS → sign | 판독보고서 STAFF 전자서명(판독의 본인 서명) — 판독 서명 구간 | PACS 화면이 HIS staff-token(aud=sign) 발급 → PACS 백엔드 POST /api/v… | `구현·미검증` |
| PACS → sign | 영상·조영제 동의서 환자 서명(포털 링크·알림) | HTTP POST /v1/certificates/enroll(환자·대리인) · /v1/requests · /… | `구현·미검증` |

### edu ⇄ sign

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| edu → sign | 법정교육 이수증 봉인(시스템 발급 서명)·폐기·철회 | HTTP POST /v1/certificates/enroll · /v1/sign-requests(DIRECT… | `구현·미검증` |
| sign → edu | 이수증 서명 완료 통지(정합 확인·해시 교차검증) | HTTP POST 웹훅 → edu /api/v1/webhooks/sign[/{tenantSlug}] | `구현·미검증` |

### Clinic ⇄ ERP

`구현·미검증` 1 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| ERP → Clinic | 그룹웨어 직원 명단 수집(ERP 인사 대사·clinicUserId 매핑) | HTTP GET /api/clinic/his/staff (일 1회 03:30) | `구현·미검증` |
| ERP → Clinic | 그룹웨어 근태(출퇴근) 수집 → 월 근태 집계 | HTTP GET /api/clinic/his/attendance?since= (일 1회 04:00) | `미구현` |

### AI Server ⇄ PACS

`구현·미검증` 1 · `미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| PACS → AI Server | 영상 AI 보조(판독 보조·사전점검·비교 판독·구조화 판독문) · 텍스트 보조(요약·분석·설명·초안·참고·자동기록) · 예측·코드매핑 · 오케스트레이션 파이프라인 관리 · 정규화 AI · 추론(/a… | HTTPS REST(JSON · multipart) | `구현·미검증` |
| PACS → AI Server | AI 서버 가용성 감시(30분 주기 프로브 · 상태 전이 알림) | HTTPS GET /api/tags | `미구현` |

### AI Server ⇄ ERP

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| ERP → AI Server | 보험·수가 공시(notice) 수명주기 색인 발신 — 등록·철회·색인 상태 조회·동기화 검증(아웃박스 큐) | HTTPS REST(JSON) — 비동기 큐 워커 | `구현·미검증` |
| ERP → AI Server | 청구 사전심사 — 공시 RAG 검색(유형·시행일 필터) · 코드 진단 | HTTPS REST(JSON) | `구현·미검증` |

### AI Server ⇄ Jitsi

`중단` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| Jitsi → AI Server | 원격 상담 녹화 회의록 자동 분석(서명 URL 제출 · 콜백 · 상태) | HTTPS REST(JSON) + AI Server → Jitsi 콜백 | `중단` |
| Jitsi(stt-bridge) → AI Server | 원격 상담 실시간 자막(STT 청크) · 자막 번역 | HTTPS REST — PCM 청크 · JSON 번역 | `중단` |

### HIS ⇄ cerno

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → cerno | SMART EHR launch 런처 — 차트에서 cerno 를 열 때 의료진+환자 바인딩 1회용 launch 토큰 발급 → cerno-web authorize(PKCE) → token → id_to… | SMART App Launch(EHR launch · authorization_code + PKCE S256… | `구현·미검증` |
| cerno → HIS | 근거 질의용 환자 맥락 FHIR 읽기(Condition·Observation·DiagnosticReport·Procedure 필수 / MedicationRequest·AllergyIntoleranc… | FHIR R4 REST 검색·단건(리소스별 독립 수집 · 부분 실패 허용) | `구현·미검증` |

### Clinic ⇄ edu

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| edu → Clinic | 교육 알림(미이수 독촉 등) 단건·대량 발송 — Clinic 이 그룹웨어 허브로 중계 | REST POST(설정된 전체 endpoint · 대량은 `/bulk`) → Clinic `/api/inte… | `구현·미검증` |
| Clinic → edu | Clinic 로그인 사용자 → edu 자동 로그인 딥링크 | 브라우저 리다이렉트(토큰 쿼리) → edu `/sso` → `POST /api/v1/auth/sso` | `구현·미검증` |

### HIS ⇄ 공개 홈페이지

`구현·미검증` 2

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| 공개 홈페이지 → HIS | 공개 정보 조회(병원 정보·진료과·의료진·센터·소식·건강정보·채용·팝업·검진 프로그램/수용량·비급여) 및 공개 접수(협력 신청·전원 요청) | REST(JSON) — SSR 은 INTERNAL_API_URL 로 서버에서 직접, 브라우저는 상대경로 `/… | `구현·미검증` |
| 공개 홈페이지 → HIS | 예약 — AI 예약 상담 세션·증상 목록·향상 예약 · 환자 포털 로그인과 본인 정보(프로필·예약·결과·처방·수납) 조회 | REST(JSON) `/api/v1/booking/*` · `/api/v1/portal/{auth,profi… | `구현·미검증` |

### 검사 장비 ⇄ PACS

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| PACS → 검사 장비(모달리티) | Modality Worklist C-FIND 응답 · MPPS N-CREATE/N-SET 로 워크리스트 상태 갱신 · C-STORE 수신(Orthanc) | DICOM DIMSE(MWL SCP · MPPS · Storage Commitment · C-STORE) | `구현·미검증` |

### 외부 PACS ⇄ PACS

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| PACS → 외부 PACS | 원격 DICOM 노드 조회·가져오기·보내기(C-ECHO/C-FIND/C-MOVE/C-STORE) | DICOM DIMSE(Orthanc 경유) | `구현·미검증` |

### 외부 XDS-I.b 저장소 ⇄ PACS

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| PACS → 외부 XDS-I.b 저장소 | 영상 문서 세트 제출(ITI-41/RAD-68 · KOS 매니페스트) 및 XDM 오프라인 패키지 내보내기 | IHE XDS-I.b(SOAP 1.2 + MTOM) · XDM ZIP | `구현·미검증` |

### 검사 장비 ⇄ LIS

`미구현` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| 검사 장비(분석기) → LIS | 장비 결과 자동 수집(ASTM E1394 레코드 · 계기 CSV) → 코드 매핑 → 자동 평가 파이프라인 | HTTP POST(본문에 ASTM/CSV 원문) — ASTM 저수준 전송(E1381 직렬·TCP) 없음 | `미구현` |

### Clinic ⇄ sign

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| Clinic → sign | 신뢰의 사슬 — 그룹웨어 전자결재(W.Sign) 문서 인증: 결재 이벤트를 sign 감사 스트림에 앵커·검증 | HTTP POST {baseUrl}/audit-events(anchor) · GET {baseUrl}/aud… | `구현·미검증` |

### ERP ⇄ LIS

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| LIS → ERP | 검사 청구 캡처(LIS 수량 → ERP 산정) · 상태 폴링 | HTTP POST ERP /api/v1/integration/lis/billing(202, 인박스 적재 li… | `구현·미검증` |

### AI Server ⇄ twin

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| twin → AI Server | 위험 예측 보조(재입원·합병증·약물이상반응) · 약물상호작용·DUR · 서술형 요약/질의(LLM) · 개인 RAG · 의료법 질의 · 영상(판독 보조·비교·사전점검·이중판독·장기 메시·심장 EP) … | HTTPS REST(JSON · multipart · NDJSON 스트림) + OpenAI 호환 /v1/ch… | `구현·미검증` |

### AI Server ⇄ cerno

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| cerno → AI Server | 의료진별 근거 RAG(검색·색인·삭제) · 근거 기반 답변 생성(챗) · 모델 워밍 · DUR 점검 · 충실도 평가 쌍 기록 | HTTPS REST(JSON) | `구현·미검증` |

### AI Server ⇄ edu

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| edu → AI Server | AI 학습 튜터(과정 자료 RAG 색인·질의·삭제) · 문항 생성·요약·번역(범용 생성) · 집합교육 녹취 분석(STT·요약·화자분리) | HTTPS REST(JSON) + OpenAI 호환 /v1/chat/completions · 회의분석은 서명… | `구현·미검증` |

### HIS ⇄ Clinic · Jitsi

`설계만` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| HIS → Clinic · Jitsi | HIS 내부 IdP 단기 토큰(audience 'clinic'·'jitsi' · 경로 B redemption code 백채널 교환 · introspect) | REST `/api/v1/sso/internal/{grant,redeem,introspect}` | `설계만` |

### 환자 앱 ⇄ Jitsi

`중단` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| 환자 앱 → Jitsi | 환자 앱 원격진료 입장 — 대기실 입장 기록(PATCH portal/telehealth/:id/join) 후 Jitsi URL 을 외부 열기 | 딥링크/브라우저 열기 | `중단` |

### Clinic ⇄ Jitsi

`중단` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| Clinic → Jitsi | W.Channel 회의 녹화 제어·녹화 스트림·회의 분석(Jitsi API) | REST(JSON) 서버간 | `중단` |

### HIS ⇄ 환자 앱

`구현·미검증` 1

| 방향 | 목적 | 프로토콜 | 상태 |
|---|---|---|---|
| 환자 앱 → HIS | 환자 인증(가입·로그인·PIN·토큰 갱신·기기 푸시 토큰·보호자·알림) 및 포털 기능(결과·영상·처방·수납·문진·동의서 서명·서류 발급·원격진료 예약·AI 질의 등) | REST(JSON) | `구현·미검증` |
