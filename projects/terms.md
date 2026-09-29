# 소개서 용어 풀이

**Plain-language terms used in the project introductions**

> **EN** — Every abbreviation and technical term that appears in the Korean body of the thirteen [project introductions](README.md), explained in one line for hospital IT staff, with an English gloss. It covers only words that actually appear there — the full glossary of the materials is [glossary.md](../glossary.md). A checker (`tools/check-plain.mjs`) fails if an introduction uses an abbreviation that is not listed here.

[프로젝트 소개서](README.md) 13편의 **한국어 본문에 실제로 나오는 말**만 모아, 의료 전산담당자가 한 줄로 알 수 있게 풀었습니다. 자료 전체의 용어집은 [용어집](../glossary.md)에 있습니다. 소개서에 여기 없는 약어가 나오면 검사기(`tools/check-plain.mjs`)가 실패합니다.

---

## 1. 이 생태계의 시스템

> **EN** — The thirteen systems by their short names.

| 말 | 풀이 | English |
|---|---|---|
| **HIS** | 병원정보시스템(Hospital Information System) — 접수 · 진료 · 오더 · 간호 · 수납 · 경영지원을 한 시스템에서 처리합니다. 이 생태계의 중심 | Hospital information system — the core |
| **LIS** | 검사정보시스템(Laboratory Information System) — 진단검사 · 미생물 · 병리 · 수혈 · 유전체 | Laboratory information system |
| **PACS** | 의료영상저장전송시스템(Picture Archiving and Communication System) — 영상 저장 · 판독 · 뷰어 | Picture archiving and communication system |
| **ERP** | 전사적 자원관리 — 여기서는 병원의 재무 · 원가 · 인사급여 · 자재 · 보험청구 | Enterprise resource planning (back office) |
| **AI** | 인공지능. 이 생태계에서는 **보조하고 초안을 만들 뿐**, 진단 · 판단은 사람이 합니다 | Artificial intelligence — assists and drafts only |
| **IT** | 정보기술 — 소개서에서는 병원 전산팀을 가리킵니다 | Information technology (the hospital's IT team) |
| **Clinic** | 이 생태계의 병원 그룹웨어 — 인수인계 · 근무표 · 알림 · 결재 | Hospital groupware |
| **sign** · **edu** · **twin** · **cerno** · **Jitsi** | 전자서명 · 직원 교육 · 위험 예측 · 의료진 근거 질의 · 원격 화상 시스템의 이름 | Names of the e-signature, e-learning, digital-twin, evidence-Q&A and video systems |

## 2. 표준과 연동 방식

> **EN** — The standards and connection styles the systems use to talk to each other.

| 말 | 풀이 | English |
|---|---|---|
| **API** | 프로그램끼리 서로 부르는 입구. 화면 없이 요청과 응답을 주고받습니다 | Application programming interface |
| **REST** | 웹 주소(URL)와 HTTP 요청으로 자료를 주고받는 가장 흔한 API 방식 | A common style of web API |
| **HTTP** | 웹이 쓰는 기본 통신 규약 | The web's basic protocol |
| **FHIR** · **R4** | 의료 정보를 주고받는 국제 표준 형식(HL7 FHIR). R4 는 그 판(4판)입니다. 환자 · 오더 · 검사 결과를 같은 모양으로 주고받게 합니다 | International standard for exchanging health data (release 4) |
| **SMART** | SMART on FHIR — 외부 앱을 차트 안에서 열고(환자 맥락을 넘겨줌), 서버끼리 표준 토큰을 받는 방법 | Standard way to launch apps from the chart and get tokens |
| **CDS** | 임상 의사결정 지원. **CDS Hooks** 는 차트를 열 때 외부 시스템이 알림 카드를 보내는 표준입니다 | Clinical decision support; CDS Hooks sends cards into the chart |
| **HL7** | 의료 메시지 표준을 만드는 기구와 그 표준. 소개서의 「HL7 v2」는 오래 쓰여 온 줄 단위 메시지 형식입니다 | Health Level Seven; "HL7 v2" is the classic message format |
| **DICOM** | 의료 영상과 그 정보를 담고 주고받는 국제 표준. **DICOMweb** 은 그것을 웹 API 로 하는 방식 | Standard for medical images; DICOMweb is its web API |
| **AE 타이틀** | DICOM 장비 · 서버가 서로를 알아보는 이름표. 촬영 장비와 PACS 를 이을 때 양쪽에 등록합니다(나라 코드 AE 와는 다른 말) | DICOM Application Entity title |
| **MWL** | 촬영 장비가 PACS 에서 「오늘 찍을 환자 목록」을 받아 가는 DICOM 기능(모달리티 워크리스트) | DICOM Modality Worklist |
| **IHE** · **XDS-I** · **PIX** | IHE 는 표준들을 병원 업무에 맞게 묶은 규약집. XDS-I 는 영상 문서 공유, PIX 는 환자 식별 번호 대조 규약입니다 | Integration profiles: image document sharing, patient ID cross-reference |
| **ASTM** | 검사 장비가 결과를 보내는 오래된 통신 규격(ASTM E1394) | Lab-analyser interface standard |
| **SR** · **SEG** | DICOM 안에 AI 결과를 담는 형식 — 구조화 보고(SR) · 영역 표시(SEG) | DICOM structured report and segmentation |
| **MPR** | 3차원 영상을 여러 방향 단면으로 다시 보는 기능 | Multiplanar reconstruction |
| **SCORM** · **xAPI** | 이러닝 콘텐츠와 학습 기록의 표준 | E-learning content and learning-record standards |
| **MCP** | 외부 AI 도구가 시스템의 기능을 부를 수 있게 여는 규약(Model Context Protocol) | Protocol that exposes tools to AI agents |
| **CSV** | 쉼표로 칸을 나눈 표 파일 | Comma-separated values file |
| **YAML** | 설정을 사람이 읽기 쉽게 적는 파일 형식 | A human-readable configuration format |
| **웹훅** | 일이 생겼을 때 상대 시스템에 먼저 알려 주는 호출 | A call made to another system when something happens |

## 3. 기술 구성

> **EN** — Building blocks: databases, servers, containers and the like.

| 말 | 풀이 | English |
|---|---|---|
| **DB** · **SQL** | 데이터베이스와 그것을 다루는 질의 언어 | Database and its query language |
| **PostgreSQL** · **SQLite** | 공개 데이터베이스 소프트웨어. SQLite 는 파일 하나로 도는 작은 DB | Open-source databases |
| **Redis** | 빠른 임시 저장소(캐시) — 이 생태계에서는 대부분 **지워져도 되는 값**만 둡니다 | In-memory cache |
| **GPU** · **VRAM** · **CPU** | 그래픽 처리 장치(AI 연산에 씀)와 그 메모리, 그리고 일반 중앙 처리 장치 | Graphics processor, its memory, and the main processor |
| **PC** | 개인용 컴퓨터 — 소개서에서는 따라가기에 쓴 개발용 컴퓨터 | Personal computer |
| **컨테이너** · **Docker** · **Compose** | 프로그램과 그 실행 환경을 한 묶음으로 띄우는 방식. Compose 는 여러 컨테이너를 한 파일로 함께 띄웁니다 | Containers and multi-container definitions |
| **모노레포** | 여러 앱(API · 웹 · 앱)을 한 저장소에 함께 두는 구성 | One repository holding several apps |
| **TypeScript** · **Node** · **NestJS** · **Prisma** | 자바스크립트 계열의 언어 · 실행 환경 · 서버 틀 · DB 도구 | JavaScript-family language, runtime, server framework, database toolkit |
| **Next.js** · **React** · **Expo** | 웹 화면을 만드는 틀과 그 바탕 · 모바일 앱을 만드는 틀 | Web and mobile app frameworks |
| **Python** · **FastAPI** · **Flask** | 파이썬 언어와 그 웹 서버 틀 | Python and its web frameworks |
| **SDK** | 어떤 서비스를 쓰기 위한 개발 도구 묶음 | Software development kit |
| **Ollama** · **Whisper** | 기관 안에서 AI 모델을 돌리는 서버 · 음성 인식 모델 | Local model server; speech-recognition model |
| **Orthanc** · **OHIF** | 공개 DICOM 영상 서버 · 웹 영상 뷰어 | Open-source image server and web viewer |
| **Prometheus** · **Grafana** | 운영 지표를 모으는 도구 · 그것을 그래프로 보여 주는 도구 | Metrics collection and dashboards |
| **BI** | 경영 분석 화면 도구(Business Intelligence) | Business-intelligence dashboards |
| **PWA** | 웹을 앱처럼 설치해 쓰는 방식 | Web app installable like an app |
| **TURN** | 병원 방화벽 뒤에서도 화상 연결이 되게 중계하는 서버 | Relay that lets video calls cross firewalls |
| **TCP** · **UDP** · **IP** · **DNS** | 네트워크 기본 규약과 주소, 이름을 주소로 바꾸는 체계 | Network protocols, addresses and name lookup |
| **VPN** | 떨어진 곳을 암호화된 전용 통로로 잇는 방식 | Virtual private network |
| **CORS** | 브라우저가 다른 주소의 서버를 부를 수 있는지 정하는 규칙 | Browser cross-origin rule |
| **CD** · **USB** | 환자가 가져오는 영상 매체 | Media patients bring in |
| **QR** | 휴대폰으로 읽는 사각 코드 — 출석 · 길안내 · 진위 확인에 씀 | QR code |
| **PDF** | 인쇄 모양 그대로의 문서 파일 | Portable document format |
| **마이그레이션** | 데이터베이스 구조(테이블)를 판마다 차례로 적용하는 절차 | Step-by-step database schema changes |
| **outbox(대기열)** | 다른 시스템에 보낼 일을 DB 에 먼저 적어 두고, 예약 작업이 보내고 실패하면 다시 보내는 방식 | Outbox table — send later, retry on failure |
| **멱등키** | 같은 요청이 여러 번 와도 한 번만 처리되게 붙이는 식별값 | Idempotency key |
| **리버스 프록시** | 바깥 요청을 받아 안쪽 서버로 넘겨 주는 앞단 서버(예: nginx) | Front server that forwards requests inside |
| **헬스 체크** | 서버가 살아 있고 준비됐는지 묻는 주소 | Health-check endpoint |
| **임베딩 · 벡터 검색** | 문서를 숫자 목록으로 바꿔 비슷한 뜻의 문서를 찾는 방법 — 근거 문서 질의(RAG)에 씀 | Embedding and vector search |
| **RAG** | 근거 문서를 찾아 붙여 답변 초안을 만드는 방법 | Retrieval-augmented generation |
| **RLS** | 데이터베이스가 행마다 접근을 거르는 기능(행 수준 보안) | Row-level security |

## 4. 보안 · 서명 · 법

> **EN** — Security, signatures and licences.

| 말 | 풀이 | English |
|---|---|---|
| **토큰** | 로그인했다는 증명. HIS 가 발급하고 다른 시스템이 확인합니다 | Proof of sign-in |
| **공개키로 검증** | 발급자가 비밀키로 서명한 토큰을 누구나 공개키로 확인하는 방식 — 비밀을 나눠 가질 필요가 없음 | Verification with a published public key |
| **공유 비밀키** | 양쪽이 같은 비밀값을 가지고 확인하는 방식 — 양쪽을 함께 바꿔야 합니다 | Shared secret |
| **API 키** | 시스템마다 발급하는 접속 열쇠 | Per-system access key |
| **HMAC** | 공유 비밀로 만든 서명 — 통지가 위조되지 않았음을 확인 | Keyed message signature |
| **PIN** | 짧은 숫자 비밀번호 | Personal identification number |
| **TLS** | 인터넷 통신을 암호화하는 규약(https 의 s) | Transport encryption |
| **GPG** · **AES-256** · **GCM** | 파일 · 데이터 암호화 도구와 방식 | Encryption tools and modes |
| **HSM** | 서명 키를 꺼낼 수 없게 보관하는 전용 장치 | Hardware security module |
| **KCMVP** | 국내 검증필 암호모듈 제도 | Korean cryptographic module validation |
| **CA** · **PKI** | 인증서를 발급하는 기관과 그 체계 | Certificate authority and public-key infrastructure |
| **LTA** | PAdES-LTA — 인증서가 만료된 뒤에도 서명을 검증할 수 있게 검증 자료를 PDF 안에 넣는 장기 서명 형식 | Long-term-archive PDF signature |
| **타임스탬프** | 「그 시각에 그 문서가 있었다」를 증명하는 도장(RFC 3161) | Trusted timestamp |
| **해시체인** | 기록마다 앞 기록의 지문을 이어 붙여, 중간을 고치면 드러나게 하는 방식 | Hash chain (tamper evidence) |
| **감사 로그** | 누가 언제 무엇을 했는지 남기는 기록 | Audit log |
| **PHI** | 환자를 알아볼 수 있는 건강 정보 | Protected health information |
| **MIT** · **GPL** · **AGPL** | 소프트웨어 라이선스 — MIT 는 자유롭게 쓰고 고칠 수 있고, GPL · AGPL 은 고쳐서 배포할 때 소스 공개 조건이 붙습니다 | Software licences |

## 5. 의료 · 업무 용어

> **EN** — Clinical and hospital-operations terms.

| 말 | 풀이 | English |
|---|---|---|
| **DUR** | 처방할 때 병용 금기 · 중복 · 용량 등을 점검하는 의약품 안전 사용 점검 | Drug utilization review |
| **SBAR** | 상황 · 배경 · 평가 · 권고 순서로 쓰는 인계 형식 | Situation–Background–Assessment–Recommendation handover |
| **SOAP** | 주관 · 객관 · 평가 · 계획 순서의 진료 기록 형식 | Subjective–Objective–Assessment–Plan note |
| **NEWS2** | 활력징후로 환자 악화를 미리 알리는 조기경고 점수 | National Early Warning Score 2 |
| **ABO** | ABO 혈액형 — 수혈 적합성의 기본 | ABO blood group |
| **ACMG** | 유전 변이를 병원성 여부로 분류하는 국제 기준 | Variant-classification guideline |
| **NGS** | 차세대 염기서열 분석 | Next-generation sequencing |
| **IRB** | 연구 윤리 심의 위원회 | Institutional review board |
| **SLA** | 정해 둔 처리 시한(예: 판독 완료까지의 목표 시간) | Service-level target time |
| **CT** | 컴퓨터 단층 촬영 | Computed tomography |
| **FMEA** | 고장 형태와 영향을 미리 분석하는 위험 관리 기법 | Failure mode and effects analysis |
| **정본** | 같은 정보가 여러 곳에 있을 때 기준이 되는 원본 | The single source of truth |
| **운영 모드** | 개발 · 리허설(가상 데이터로 시연 · 외부 발송 보류) · 리얼(실제 운영) 세 단계 | Development / rehearsal / real |
| **안전 게이트** | 위험한 동작 앞에서 끔 · 경고 · 차단 중 하나로 동작하는 점검 | Safety check with off / warn / block modes |
| **상시 감시자** | 정합성 · 흐름 · 연동 · 백업을 주기적으로 훑는 별도 프로세스 | Always-on sentinel process |
| **섀도우 파일럿** | 실제 업무 결정에 쓰지 않고 곁에서 시험해 보는 단계 | Shadow (non-clinical) pilot |

## 6. 지역 · 자료 이름

> **EN** — Place names and names of other documents in these materials.

| 말 | 풀이 | English |
|---|---|---|
| **UAE** | 아랍에미리트(국가 축의 두 번째 나라). 국가 코드로는 **AE** 로 적습니다 — 영상 장비의 「AE 타이틀」과는 다른 말입니다 | United Arab Emirates (country code AE) |
| **S0 ~ S8** | 이 자료의 [구축 가이드](../build-guide/) 단계 번호(준비 → 코어 HIS → … → 리얼 전환) | Build-guide stages |
| **README** · **THIRD_PARTY** | 저장소 첫 안내 문서 · 제3자 구성요소 목록 문서 | Repository readme; third-party list |

## 7. 소개서를 읽으며 막힌 말 — 가상 독자 검토 뒤 추가

> **EN** — Terms that proxy readers (hospital IT staff seeing these materials for the first time) stumbled on while reading the introductions, added after the 2026-09-29 review. Grouped by the introduction where they first appear.


### HIS

| 말 | 풀이 | English |
|---|---|---|
| **코드 마스터** | 약 · 진단 · 수가 · 검사 코드처럼 병원이 공통으로 쓰는 코드표. 기관이 배포처에서 받아 넣는다 | code masters |
| **시드** | 설치 직후 넣는 기본 · 예시 데이터. 가상 병원 데모 데이터는 실운영에 넣지 않는다 | seed data |
| **스키마** | 데이터베이스의 테이블 구조 정의 | schema |
| **크론 · 예약 작업** | 정해진 시각이나 간격마다 서버가 스스로 도는 작업 | cron · scheduled job |
| **트리거 · 부분 유니크 인덱스** | 데이터베이스 안에 두는 보조 규칙. 트리거는 수정을 막거나 자동 기록을 남기고, 부분 유니크 인덱스는 조건에 맞는 행끼리만 중복을 막는다 | trigger · partial unique index |
| **헤드리스 브라우저** | 화면 없이 서버에서 도는 브라우저. 서식을 PDF 로 찍는 데 쓴다 | headless browser |
| **개원 관제** | HIS 안에서 개원 전 · 개원 · 개원 후에 할 일을 단계별로 닫아 가는 화면 | opening control board |
| **운영 전환 관제(Go-Live)** | 실운영으로 넘어가도 되는지 준비 상태(연동 · 보안 · 설정 등)를 한 화면에서 확인하는 곳 | go-live control board |
| **결정 등록부** | 소프트웨어가 아니라 사람이 정해야 할 것을 누가 · 언제 정했는지와 함께 남기는 목록 | decision registry |
| **워크스테이션** | 한 직역이 하루 업무를 한 화면에서 처리하게 묶은 업무 화면(예: 간호 워크스테이션) | workstation (role work screen) |
| **협진 · 회진** | 협진은 다른 진료과 의사에게 의견을 청하는 일, 회진은 의사가 입원 환자를 차례로 돌아보는 일 | consultation · ward round |
| **청구서 작성 · 청구 전송** | 작성은 병원 안에서 청구 내역을 만드는 일, 전송은 그것을 보험 기관으로 보내는 일. HIS 는 작성까지 | claim preparation · claim submission |

### 공개 홈페이지

| 말 | 풀이 | English |
|---|---|---|
| **캐시 무효화 · 재검증** | 저장해 둔 페이지를 버리고 다음 요청 때 새로 그리게 하는 일. 홈페이지의 「즉시 반영 요청」이 이것이다 | cache invalidation · revalidation |
| **서버에서 그림** | 페이지를 브라우저가 아니라 서버가 완성해 보내는 방식. 검색엔진이 내용을 읽기 쉽다 | server-side rendering |
| **경로 재작성** | 받은 주소를 다른 서버의 주소로 바꿔 넘기는 기능. 브라우저는 한 주소만 보게 된다 | rewrite |
| **사이트맵** | 검색엔진에 알리는 사이트의 페이지 목록 파일 | sitemap |
| **검색 노출 설정** | 검색엔진에 보일 페이지 제목 · 설명 같은 값 | SEO settings |
| **pm2 · 프로세스 관리자** | 서버에서 프로그램을 띄우고, 멈추면 다시 살리는 도구 | process manager |
| **관리형 호스팅** | 클라우드 업체가 서버 운영을 대신해 주는 배포 방식 | managed hosting |
| **빌드 때 박히는 값** | 빌드하는 순간 결과물 안에 들어가 고정되는 설정. 바꾸려면 다시 빌드한다(Next.js 의 `NEXT_PUBLIC_*`, Expo 의 `EXPO_PUBLIC_*`) | build-time variable |
| **포털 토큰** | 환자가 HIS 의 포털 인증을 마치면 HIS 가 내주는 토큰. 본인 정보를 부를 때 붙인다 | patient-portal token |
| **비급여 고지** | 건강보험이 적용되지 않는 진료 항목의 가격을 알리는 안내 | non-covered price notice |
| **의료광고** | 의료기관이 내는 광고. 나라마다 법으로 내용과 심의를 정한다 | medical advertising |
| **콘텐츠 전송망** | 사용자 가까운 곳에 사본을 두어 공개 사이트를 빠르게 보내는 서비스 | CDN |

### 환자 앱

| 말 | 풀이 | English |
|---|---|---|
| **딥링크 스킴** | 다른 앱이나 문자 속 링크로 이 앱의 특정 화면을 바로 여는 주소 형식 | deep-link scheme |
| **번들러** | 앱 코드와 라이브러리를 하나로 묶어 기기에 올릴 결과물을 만드는 도구 | bundler |
| **앱 식별자** | 앱 스토어가 앱을 구별하는 고유 이름. 한 번 정하면 바꾸기 어렵다 | bundle id · application id |
| **앱 서명 키** | 스토어에 올리는 앱이 그 기관의 것임을 증명하는 키. 잃으면 같은 앱으로 갱신할 수 없다 | app signing key |
| **스토어 빌드 설정** | 스토어에 낼 설치 파일을 만드는 방법과 값(Expo 의 빌드 서비스 설정 등) | store build configuration |
| **라우트 파일** | 파일 이름이 곧 화면 주소가 되는 방식에서 화면 하나를 이루는 파일 | route file |
| **푸시 알림** | 앱을 열지 않아도 기기에 뜨는 알림. 서버의 발송과 앱의 수신 패키지가 둘 다 있어야 온다 | push notification |
| **보호자 위임** | 보호자가 환자 대신 기록을 보도록 관계 · 법적 근거 · 만료일과 함께 허락받는 절차 | guardian delegation |
| **비상 열람 · 사후 승인** | 응급 상황에서 담당이 아닌 의료진이 사유를 남기고 기록을 여는 것, 그리고 그 열람을 나중에 책임자가 검토해 승인하는 것 | break-the-glass · after-the-fact approval |
| **본인확인 · 본인인증** | 이 자료에서 본인확인은 등록번호 · 생년월일처럼 병원이 가진 정보로 맞춰 보는 것, 본인인증은 휴대전화 인증처럼 외부 기관을 거치는 것 | identity check · identity verification |
| **TanStack Query** | 서버에서 받은 데이터를 앱 안에 잠시 두고 다시 쓰게 하는 조회 도구 | TanStack Query |
| **화상 대기실 입장** | 원격진료 방에 들어가기 전, 환자가 도착했다는 기록을 HIS 에 남기는 단계 | telehealth waiting-room check-in |

### LIS

| 말 | 풀이 | English |
|---|---|---|
| **참고치 · 위험치** | 참고치는 결과의 정상 범위, 위험치는 즉시 의료진에게 알려야 하는 수준. 둘 다 검사실이 정해 서명하는 기준값 | reference range · critical value |
| **복창** | 위험치를 전화 등으로 받은 사람이 값을 되읽어 확인하는 것. LIS 는 이 기록이 있어야 통보를 닫는다 | read-back |
| **Westgard 규칙** | 관리 물질의 측정값이 흔들리는 모양으로 장비 · 시약 이상을 잡는 정도관리 통계 규칙 | Westgard rules |
| **델타 체크** | 같은 환자의 이전 결과와 비교해 갑자기 크게 달라진 값을 걸러 내는 검사 | delta check |
| **분주** | 한 검체를 여러 검사용으로 나눠 담는 일 | aliquoting |
| **반사 검사** | 첫 결과에 따라 추가검사를 자동으로 제안하는 규칙(Reflex). LIS 는 의사 승인 대기로 올린다 | reflex testing |
| **그람 예비보고 · 동정 · 감수성** | 미생물 검사의 단계. 염색으로 먼저 알리는 예비 결과, 균의 종류를 밝히는 것, 어떤 항균제가 듣는지 보는 것 | Gram preliminary report · identification · susceptibility |
| **다제내성균** | 여러 항균제가 듣지 않는 균. 격리 알림 대상 | multidrug-resistant organism |
| **그로싱 · 블록 · 동결절편** | 병리 검체를 눈으로 보고 잘라 내는 일, 파라핀에 굳힌 조각, 수술 중 급히 얼려 만드는 절편 | grossing · block · frozen section |
| **사인아웃** | 병리 판독의가 보고서를 최종 확정 · 서명하는 단계. LIS 는 2단계로 한다 | sign-out |
| **교차시험** | 수혈 전 환자 혈액과 혈액 제제가 맞는지 보는 시험 | crossmatch |
| **이차 소견** | 유전체 검사에서 원래 목적과 다르게 드러난 의미 있는 변이. 동의 없이는 보이지 않는다 | secondary findings |
| **개시 전환 센터 · 개시 키** | LIS 가 실운영을 시작하기 전 확인 항목을 모은 화면, 그리고 그 전환을 허락하는 값 | go-live center · go-live key |
| **다운타임 오더** | HIS 연결이 멈췄을 때 LIS 에서 직접 만드는 오더. 사유를 남기고 나중에 HIS 오더 번호와 맞춘다 | downtime order |
| **종단 시험** | 화면부터 저장까지 실제 흐름을 처음부터 끝까지 돌려 보는 시험 | end-to-end test |
| **루프백 · 사설 대역** | 같은 서버 안에서만 닿는 주소, 그리고 기관 내부망에서만 쓰는 주소 범위 | loopback · private address range |

### PACS

| 말 | 풀이 | English |
|---|---|---|
| **Celery** | 파이썬 서버에서 오래 걸리는 일을 뒤에서 나눠 처리하는 작업자 도구 — 예약 작업(beat)도 맡습니다 | Python background task worker and scheduler |
| **XDS-I.b** | 기관끼리 영상 문서 세트를 등록 · 조회하는 IHE 규약(XDS-I)의 현재 판. 「.b」는 판을 가리킵니다 | IHE cross-enterprise imaging document sharing, revision b |
| **증분 스냅샷** | 백업할 때 앞 백업 뒤로 바뀐 것만 새로 담는 방식 — 복구는 처음 백업부터 차례로 겹쳐 되살립니다 | Incremental snapshot |

### sign

| 말 | 풀이 | English |
|---|---|---|
| **JWKS** | 토큰을 확인할 공개키들을 표준 형식으로 모아 웹 주소로 내놓은 목록 — sign 은 HIS 의 이 목록으로 직원 신원을 확인합니다 | JSON Web Key Set |
| **PAdES** | PDF 안에 전자서명을 넣는 유럽 표준 형식. 소개서의 **PAdES-LTA** 는 그 장기 보존판입니다 | PDF Advanced Electronic Signatures |
| **OpenAPI** | API 의 주소 · 입력 · 응답을 기계가 읽을 수 있게 적는 표준 설명서 형식 | Machine-readable API description standard |
| **RFC 3161** | 신뢰할 수 있는 타임스탬프를 주고받는 인터넷 표준 문서 번호 | Internet standard for trusted timestamps |
| **런북** | 운영자가 장애 · 복구 · 교체 때 따라 하는 절차서 | Runbook (operations procedure) |
| **테넌트** | 한 설치본을 나눠 쓰는 기관 하나하나. 「단일 테넌트」는 한 기관만 쓰는 구성 | Tenant |

### ERP

| 말 | 풀이 | English |
|---|---|---|
| **전표** · **정정 전표** | 거래 한 건을 장부에 적는 단위 · 마감한 전표를 지우지 않고 고친 내용을 새로 적는 전표 | Accounting voucher · correcting entry |
| **모듈러 모놀리스** | 한 프로그램 · 한 저장소 안에서 업무 모듈의 경계만 나눈 구조(여러 서비스로 쪼개지 않음) | Modular monolith |
| **시드 데이터** | 설치할 때 미리 넣는 예시 · 기본 데이터 | Seed data |
| **패스키** | 비밀번호 대신 휴대폰 · 보안키의 생체 인증으로 로그인하는 표준 방식 | Passkey (WebAuthn) |

### AI Server

| 말 | 풀이 | English |
|---|---|---|
| **폴백** | 원래 기능이 안 될 때 미리 정한 기본 동작으로 대신하는 것(예: AI 없이 키워드로 답함) | Fallback |
| **Gunicorn** · **ChromaDB** | 파이썬 웹 서버를 띄우는 실행기 · 프로그램 안에 내장해 쓰는 벡터 검색 저장소 | Python app server · embedded vector store |
| **BGE-M3** | AI Server 가 문서 색인에 쓰는 임베딩 모델. 이름이 코드에 정해져 있습니다 | Embedding model used for document indexing |
| **VL** | 모델 이름의 「Vision-Language」 — 글과 함께 이미지를 읽는 모델 | Vision-language (model name suffix) |
| **NVIDIA** · **CUDA** | GPU 제조사와 그 GPU 에서 AI 연산을 돌리는 도구 | GPU maker and its compute toolkit |
| **Apple Silicon** | 맥 컴퓨터에 쓰이는 애플의 칩 | Apple's Mac processors |

### twin

| 말 | 풀이 | English |
|---|---|---|
| **LOINC** | 검사 · 관찰 항목에 붙이는 국제 공통 코드. 병원마다 다른 검사 이름을 같은 번호로 맞춥니다 | Logical Observation Identifiers Names and Codes |
| **eGFR** | 혈액 검사 값으로 계산한 콩팥의 거르는 능력(추정 사구체 여과율) | Estimated glomerular filtration rate |
| **SMART Backend Services** | 사람 로그인 없이 서버가 다른 서버에서 정해진 범위만 읽도록 표준 토큰을 받는 SMART 의 한 방식 | Server-to-server token flow in SMART |
| **SMART 앱 등록** | HIS 관리 화면에서 외부 앱의 이름 · 돌아올 주소 · 허용 범위를 적어 두는 일. 등록해야 차트에서 열 수 있습니다 | Registering an app with the HIS so it can be launched |
| **SimPy** | 대기열 · 흐름을 흉내 내는 시뮬레이션용 Python 라이브러리 | Python discrete-event simulation library |
| **Alembic** | DB 표 구조를 판 단위로 올리는 Python 도구 | Python database migration tool |
| **Pulse** | 사람 몸의 생리를 계산으로 흉내 내는 공개 엔진 | Open-source physiology engine |
| **지문(digest)** | 파일 내용으로 만든 고유한 짧은 값. 내용이 한 글자라도 바뀌면 값이 달라집니다 | Content digest used to detect changes |

### cerno

| 말 | 풀이 | English |
|---|---|---|
| **프롬프트** | AI 모델에게 건네는 지시문. 같은 모델이라도 지시문에 따라 답의 모양이 달라집니다 | Prompt — the instruction given to a model |
| **프롬프트 인젝션** | 질문이나 문서 안에 AI 를 엉뚱한 방향으로 이끄는 문장을 숨겨 넣는 공격 | Prompt injection |
| **모델 예열** | 질문이 오기 전에 AI 모델을 GPU 메모리에 미리 올려 두어 첫 답의 대기를 줄이는 일 | Model warm-up |

### edu

| 말 | 풀이 | English |
|---|---|---|
| **등록자 인증서** | sign 이 기관(또는 연결된 시스템)에 내주는 「이 이름으로 서명을 요청할 자격」. 폐기하면 그 자격으로 낸 서명이 모두 영향을 받습니다 | Registrar certificate issued by sign |
| **S3 호환 저장소** | 파일을 인터넷 주소 단위로 넣고 꺼내는 저장 방식(아마존 S3 와 같은 규약). 원내 장비로도 둘 수 있습니다 | S3-compatible object storage |
| **Turborepo** | 여러 앱을 한 저장소에 두고 함께 빌드하게 해 주는 도구 | Monorepo build tool |
| **인증평가** | 의료기관이 정해진 기준을 지키는지 외부 기관이 주기적으로 평가하는 제도. 직원 교육 이수도 평가 항목입니다 | Hospital accreditation |

### Clinic

| 말 | 풀이 | English |
|---|---|---|
| **Turnstile** | 사람이 아닌 자동 프로그램의 가입 · 로그인을 걸러 내는 무료 봇 방지 서비스(Cloudflare) | Cloudflare bot-protection widget |
| **pgvector** | PostgreSQL 에 「뜻이 비슷한 글 찾기(벡터 검색)」 기능을 더하는 확장 | PostgreSQL vector-search extension |
| **온프레미스** | 운영사 서버가 아니라 병원이 가진 서버에 설치해 쓰는 방식 | On-premises installation |
| **1회용 로그인 표(SSO 티켓)** | 한 시스템에 로그인한 직원이 다른 시스템으로 다시 로그인하지 않고 넘어가도록, 한 번만 쓸 수 있게 만든 짧은 표 | One-time single-sign-on ticket |
| **통합 계정** | 한 저장소의 여러 서비스가 함께 쓰는 하나의 로그인 계정 | Shared account across services |

### Jitsi

| 말 | 풀이 | English |
|---|---|---|
| **XMPP** | 실시간 메시지 · 접속 상태를 주고받는 공개 규약. Jitsi 는 이것으로 방 입장 · 참가자 정보를 주고받습니다 | Extensible Messaging and Presence Protocol |
| **Prosody · Jicofo · Videobridge · Jibri** | Jitsi 를 이루는 부품 — 각각 시그널링 서버 · 회의 조정자 · 미디어 중계 · 녹화기 | Jitsi components |
