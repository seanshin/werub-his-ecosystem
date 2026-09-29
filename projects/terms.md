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
| **UAE** · **AE** | 아랍에미리트(국가 축의 두 번째 나라 · AE 는 그 코드) | United Arab Emirates |
| **S0 ~ S8** | 이 자료의 [구축 가이드](../build-guide/) 단계 번호(준비 → 코어 HIS → … → 리얼 전환) | Build-guide stages |
| **README** · **THIRD_PARTY** | 저장소 첫 안내 문서 · 제3자 구성요소 목록 문서 | Repository readme; third-party list |
