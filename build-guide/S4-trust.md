# S4 신뢰 계층 — 전자서명 · 인증서 · 타임스탬프 · 동의서 서명

> ⚠️ 리허설 전 초안 — 새 설치본으로 따라가 보기 전입니다. `확인 필요(따라가기)` 표시는 따라가기에서 확정합니다. · 기준 2026-09-11 · [가이드 목차](README.md)

## ① 목적과 완료 조건

**sign** 을 세워 "누가 · 언제 · 무엇에 서명했고, 그 뒤로 바뀌지 않았다"를 증명할 수 있게 합니다. sign 은 자체 PKI(2단 CA) · RFC 3161 타임스탬프 · PAdES-LTA · CMS(CAdES) · 감사 해시체인으로 이루어집니다. HIS · PACS 같은 연동 시스템은 개인키를 갖지 않고, **인증서 발급은 sign 한 곳에서만** 합니다.

sign 을 부르는 곳: HIS(동의서 · 발급 문서 · 직원 · 환자 인증서 · 오더 서명 감사) · PACS(판독 서명 · 영상 동의서) · edu(이수증) · ERP(계약 · 감사 이벤트) · Clinic(결재 문서 앵커) — 모두 `구현·미검증`([연결 상태](../RELEASES/draft/compatibility.md)).

완료 조건:

- [ ] sign 서비스 · 웹 · 데이터베이스가 떠 있고, 비밀값을 새로 만들어 넣었다
- [ ] 🔴 HIS 가 서명을 sign 에 맡긴다(`sign.mode` = `EXTERNAL`)
- [ ] 🔴 HIS 자체 인증서 발급을 껐다(sign 단독 발급)
- [ ] 🔴 단말 재인증 게이트를 켰다
- [ ] 기관이 준비할 외부 연결(공인 타임스탬프 기관 · 키 보관 장치 · 본인확인 · 알림 사업자)의 방침을 정했다

실제 서명 왕복(동의서 한 건 서명 → 완료 통지 → HIS 반영)은 [S7](S7-rehearsal.md) 리허설에서 확인합니다.

## ② 설치

| 항목 | 내용 |
|---|---|
| 구현 상태 | `통합` |
| 운영 구성 | 서비스(API) · 웹 · PostgreSQL 컨테이너. 컨테이너가 기동할 때 DB 마이그레이션을 자동으로 적용합니다 |
| 비밀값 | 마스터키 같은 비밀값은 **설치할 때 새로 만들어** 넣습니다. 설정 예시 파일(`.env.example` · `.env.prod.example`)의 키는 성격별로 이렇게 나뉩니다(2026-09-12 기준 커밋 확인) — 암호 재료 `CRYPTO_MASTER_KEY` · `CRYPTO_PEPPER` / 키를 프로세스 밖에 두는 구조 `KEY_SIGNER_DRIVER` · `CRYPTO_PROXY_URL` · `CRYPTO_PROXY_TOKEN` · `CRYPTO_PROXY_PORT` · `CRYPTO_PROXY_VAULT` / **하드웨어 보안 모듈** `HSM_PROVIDER` · `PKCS11_MODULE` · `PKCS11_PIN` · `PKCS11_TOKEN_LABEL` · `PKCS11_SLOT` / 타임스탬프 · 앵커 `TSA_PROVIDER` · `TSA_URL` · `ANCHOR_TSA_URLS` · `SCHEDULER_ANCHOR_MIN` / 관리 콘솔 · 세션 `SIGN_ADMIN_API_KEY` · `SIGN_ADMIN_USER` · `SIGN_ADMIN_PASSWORD` · `SESSION_SECRET` · `SESSION_TTL_MIN` · `SESSION_IDLE_TIMEOUT_MIN` · `SESSION_MAX_CONCURRENT` / 다른 시스템과의 연결 `HIS_API_URL` · `HIS_WEBHOOK_URL` · `HIS_WEBHOOK_SECRET` · `HIS_SSO_JWKS_URL` · `HIS_SSO_ISSUER` · `ERP_API_KEY` · `ERP_WEBHOOK_SECRET` / 나가는 요청 제한 `WEBHOOK_ALLOWED_HOSTS` · `WEBHOOK_INTERNAL_HOSTS`. 값은 전부 **설치할 때 새로 만들어** 넣습니다.<br>📌 **하드웨어 보안 모듈은 「쓸 자리가 없다」가 아니라 「아직 붙이지 않았다」입니다** — PKCS#11 설정 키가 이미 있고, 키 서명을 맡을 드라이버를 `KEY_SIGNER_DRIVER` 로 고르게 돼 있습니다([8장](../overview/08-status-and-preparation.md)) |
| 시작 안내 | 개발은 sign 저장소 README 의 **"빠르게 시작하기(개발)"** 절입니다. 운영은 **빌드 → `prisma migrate deploy` → 빌드 산출물 실행**(작업 스크립트 이름 `build` · `prisma:deploy` · `start:prod`)입니다. 운영 compose 는 컨테이너가 기동할 때 마이그레이션을 스스로 적용합니다.<br>**키 서명 · 본인확인은 기본이 서명 서버 프로세스 안**입니다(`KEY_SIGNER_DRIVER=soft` · `IDV_DRIVER=local`). 키를 프로세스 밖에 두려면 **선택 프로필** `--profile proxies` 로 암호 프록시 · 본인확인 프록시를 따로 띄우고 드라이버를 `proxy` 로 바꿉니다(2026-09-13 따라가기에서 정정 — 이전 판은 "프록시 없이는 키 작업이 돌지 않는다"고 잘못 적었습니다. 프록시 없이 기동해 CA 번들 생성 · PAdES 체인 초기화까지 확인) |
| 따라가기(2026-09-13) | ✅ **이미지 빌드가 원본 그대로 됩니다.** 🔴 다만 운영 compose 가 **외부 네트워크 `docker_default` 를 필수로 요구**해(기존 서버의 다른 compose 프로젝트에 맞춘 값), 새 호스트에서는 그대로 `up` 이 멈춥니다 — 네트워크를 만들거나 compose 의 네트워크 설정을 기관 구성에 맞게 바꿉니다. DB 비밀번호 `POSTGRES_PASSWORD` 는 **반드시 지정**합니다(마스터키 · 페퍼 · HIS 연동 키 · 웹훅 비밀은 비어 있으면 기동을 거부하지만, DB 비밀번호는 비어도 기동됩니다). `HIS_SSO_JWKS_URL` · `PUBLIC_BASE_URL` · `CONTRACT_PORTAL_BASE_URL` 의 기본값은 특정 설치본 주소이므로 채웁니다. **첫 관리자는 `SIGN_ADMIN_PASSWORD` 또는 `SIGN_ADMIN_API_KEY` 로 만듭니다** — 없으면 기동 로그가 "관리자 계정 미부트스트랩"을 경고합니다 |
| 연결 시험(2026-09-13 · 새 설치본끼리) | **HIS → sign 직원 신원** — HIS 설정 `sign.mode=EXTERNAL` · `sign.url` · `sign.allowedHosts`(sign 호스트 이름을 넣어야 HIS 가 나가는 요청을 허용) · `sign.apiKey` · `sign.webhookSecret` 을 넣으면 `/api/v1/sign-integration/status` 가 `externalReady: true`. HIS 가 발급한 직원 토큰(`aud=sign`)을 sign `POST /v1/sign/staff` 에 보내면 **정상 토큰은 인증을 통과하고, 서명을 일부러 망가뜨린 토큰은 `signature verification failed` 로 거부**됩니다. 이어서(2026-09-14) HIS `enroll-staff`(직원 인증서 발급 · RSA-3072) → sign 에 서명 요청 생성(`x-api-key`) → 직원 토큰으로 `POST /v1/sign/staff` → **`COMPLETED`** · 감사 체인 `valid` · sign → HIS 웹훅 전송 · HIS HMAC 검증 통과까지 **끝까지 성공**했고, 다른 직원에게 묶인 참가자는 **403 `STAFF_BINDING_MISMATCH`** 로 막혔습니다. 연결 표의 **HIS → sign 직원 신원 · 서명** 이 첫 **`검증됨`(2026-09-14)** 입니다. 🔴 HIS 설정 `sign.url` 은 **`/v1` 까지** 넣어야 합니다 — 호스트만 넣으면 인증서 발급이 404 로 실패합니다(설정 설명에는 없음) |
| 문서 PDF 렌더(HIS 경유 서명의 전제) | HIS 가 동의서 등을 sign 에 보낼 때는 **먼저 문서를 PDF 로 만들어 해시**를 냅니다. 이 렌더는 **별도 서비스(browserless · HIS 저장소 `infra/pdf`)** 가 HIS 의 인쇄 페이지를 열어 만들고, **운영 compose 에는 이 서비스와 키가 들어 있지 않습니다.** 띄우지 않으면 서명 요청이 `fetch failed`(500)로 실패합니다. HIS API 에 `PDF_SERVICE_URL` · `PDF_SERVICE_TOKEN`(렌더러 `TOKEN` 과 같은 값) · `PDF_RENDER_SECRET` · `DOC_DOWNLOAD_SECRET` 을 **새 값으로** 넣고, 렌더러가 HIS 공개 주소(`PUBLIC_URL`)의 `/print/…` 에 닿을 수 있게 둡니다(따라가기 2026-09-14) |
| HIS → sign 오더 서명 로그 봉인(2026-09-14 · `검증됨`) | `sign.mode=EXTERNAL` 로 바꾼 뒤 낸 오더의 서명 로그가 HIS 에서 **봉인됨**으로 바뀌고, sign 감사 스트림에 같은 해시로 쌓입니다. 🔴 **봉인(앵커)은 sign 의 주기 작업이고 기본 주기가 하루(`SCHEDULER_ANCHOR_MIN=1440`)** 라, 앵커가 돌기 전까지 검증은 "체인은 맞지만 앵커 없음"으로 나옵니다. 외부 타임스탬프 기관(`ANCHOR_TSA_URLS`)을 붙이지 않으면 sign 자체 앵커뿐입니다. 저장된 이벤트 하나를 바꾸면 검증이 **체인 불일치**로 실패합니다(따라가기에서 확인). SIMULATION 시절에 쌓인 로그는 `SKIPPED` 로 남습니다 |
| sign → HIS 서명 완료 통지(2026-09-14 · `검증됨`) | 직원 서명이 끝나면 sign 이 HIS 웹훅으로 알리고, HIS 는 **동의서의 서명 상태를 `COMPLETED` 로 바꾸며 참가자 · 인증서 일련번호 · 키 보관 방식 · 감사 증명 주소**를 함께 남깁니다. 서명(HMAC)이 틀리거나 없는 통지는 **반영되지 않습니다.** 🔸 HIS 화면 경로(`request-sign`)로 만든 직원 서명 요청을 끝까지 서명하는 흐름은 따라가기에서 아직 완료를 확인하지 못했습니다 — `확인 필요(따라가기)` |
| 시드 | 개발 시드(상태별 더미 데이터)는 운영에서 차단된다고 저장소가 적습니다 |

## ③ 설정

### sign

| 설정 | 기본 동작 | 할 일 |
|---|---|---|
| 콘텐츠 보안 정책(CSP) | 관찰 모드가 기본(1.28.0) | 위반 보고를 본 뒤 차단 모드로 바꿉니다 |
| 알림 수신처 | 설정하지 않으면 경보가 로그에만 남습니다(1.29.0) | 수신처를 넣습니다. 백업 스크립트가 성공 신호를 보내게 하지 않으면 백업 신선도 경보가 계속 납니다 |
| 허용 출처(CORS) | 운영 하드닝을 켠 상태에서 비어 있으면 교차 출처 요청을 거부합니다(1.30.0) | 콘솔 · API 를 다른 출처에서 부르면 허용 목록을 넣습니다 |
| 외부 타임스탬프 교차 앵커 | 주소를 설정해야 켜집니다. 없으면 자체 앵커만 씁니다 | 공인 타임스탬프 기관을 계약하면 주소 설정을 바꿉니다 |

연동 시스템의 호출 권한(스코프) · 인증 경로 · 완료 웹훅 수신 규칙은 sign 저장소 README 의 **"API 사용법"** 과 **"연동 시 반드시 확인할 것"** 절을 따릅니다.

### HIS 쪽

- 서명 모드 `sign.mode` 를 `EXTERNAL` 로 둡니다(Go-Live `integ.sign` 이 이 값을 직접 읽습니다).
- HIS 가 의료진 서명용 토큰을 발급하고, sign 은 **HIS 공개키(JWKS)로 검증**합니다. 공개키 검증 방식이라 공유 비밀키를 나눠 가질 필요가 없습니다.
- HIS 자체 인증서 발급 게이트 `blockchain.selfIssuanceEnabled` 를 끕니다(Go-Live 목표 모드 `OFF`).
- sign 이 보내는 서명 이벤트는 HIS 의 **`POST /api/v1/sign-integration/webhook`** 으로 들어오고, HIS 는 원문(raw body) HMAC 으로 검증합니다. 비밀값은 양쪽에 같은 값을 넣습니다.
  - HIS: 설정 키 **`sign.webhookSecret`**(`/admin/config` · 설정 설명 "openssl rand -hex 32, admin 주입") · 바꿀 때는 직전 값을 **`sign.webhookSecretPrev`** 에 두어 무중단으로 넘기고, 넘긴 뒤 비웁니다.
  - sign: 환경 변수 **`HIS_WEBHOOK_SECRET`** · 수신 주소 `HIS_WEBHOOK_URL`(요청마다 콜백 주소를 주지 않을 때 쓰는 기본값) · HIS 호출 주소 `HIS_API_URL`.
  - ERP 는 **따로** `ERP_WEBHOOK_SECRET` 을 씁니다(소비자별 분리 · HIS 와 공유하지 않음). PACS 등 다른 소비자는 전용 값이 없으면 `HIS_WEBHOOK_SECRET` 으로 서명됩니다.

### 다른 시스템 쪽

- **PACS**: 판독의 본인 서명은 PACS 화면이 HIS 서명용 토큰을 받아 sign 에 제출하는 구간입니다. PACS 쪽 설정(환경 예시 기준): 외부 서명 **`SIGN_SERVICE_ENABLED`(기본 꺼짐 — "서비스가 있을 때 켠다")** · `SIGN_SERVICE_URL` · `SIGN_SERVICE_API_KEY` · `SIGN_PORTAL_BASE_URL`, HIS 공통 로그인 검증 `HIS_JWKS_URL` · `HIS_JWT_AUDIENCE` · `HIS_JWT_ISSUER`. 이 값을 비워 두면 PACS 는 자기 로그인만 씁니다.
- **edu**: 이수증 봉인 · 폐기 규칙 → [S5](S5-management.md).
- **ERP**: 거래처 계약 서명(트랙 A) · 감사 이벤트 → [S5](S5-management.md).

### 키 관리

- 인증 기관(CA) 키는 **소프트웨어로 보관**합니다(하드웨어 보안 모듈 미적용). 키 보관 장치를 쓰려면 기관이 장비나 클라우드 키 관리 서비스를 마련합니다.
- 마스터키 · 백업 암호화 비밀의 보관과 교체 절차는 sign 저장소 운영 가이드를 따르고, `확인 필요(따라가기)`. 백업 암호화 비밀은 **서버 밖에도** 보관합니다.

## ④ 사람이 정할 것

결정 등록부에는 이 단계 전용 결정이 아직 없습니다(2026-09-11 기준 커밋). 기관이 정할 것은 다음과 같습니다(sign 릴리즈 요약 · Go-Live 항목에서 모음).

| 정할 것 | 누가(권장 층) | 비고 |
|---|---|---|
| 공인 타임스탬프 기관(TSA)을 계약할 것인가 | 허가권자 | 계약하면 주소 설정만 바꾸도록 짜여 있습니다 |
| CA 키를 키 보관 장치(HSM · KMS)로 옮길 것인가, 언제 | 허가권자 · 정보보호책임자 | Go-Live `security.hsm`(자가신고)로 추적 |
| 본인확인 사업자 · 알림 사업자 계약 | 허가권자 | 어댑터는 있고 지금은 모의 상태입니다 |
| 국내 검증필 암호모듈(KCMVP)이 필요한가 | 허가권자 · 법무 | 기관 유형에 따라 구축 기관이 판단합니다 |
| 장기 보관 문서의 재타임스탬프 방침 | 원내 위원회(의무기록) | 인증서 · TSA 수명보다 문서 보존 기간이 긴 경우 |

## ⑤ 확인

| 확인 화면 | 무엇을 보나 |
|---|---|
| `/admin/integration-gates` | `sign.mode` 가 `EXTERNAL` 인지 |
| `/admin/emr-cert` | 단말 재인증 게이트 |
| `/admin/go-live` | 아래 항목 |
| sign 콘솔 | 인증서 · 서명 요청 상태 · 감사 체인 검증 |

이 단계를 닫는 Go-Live 항목 (4):

| 키 | 항목 | 판정 | 개시 차단 |
|---|---|---|---|
| `integ.sign` | 전자서명 EXTERNAL 전환 — 설정값 `sign.mode` 를 직접 읽음 | 실검증 | 🔴 예 |
| `security.certSelfIssue` | HIS 자체 인증서 발급 폐지 — 설정 게이트 `blockchain.selfIssuanceEnabled` 가 `OFF` 인지 | 실검증 | 🔴 예 |
| `security.terminal2` | 단말 재인증 게이트 활성화(생체 단계 인증) | 자가신고 | 🔴 예 |
| `security.hsm` | 키 보관 장치(HSM · KMS) 수탁 컷오버 — sign 소관 | 자가신고 | 아니오 |

이 단계를 닫는 개원 단계 기본 항목은 없습니다.

## ⑥ 아직 안 되는 것과 대체 수단

| 아직 안 되는 것 | 대체 수단 |
|---|---|
| CA 키가 소프트웨어 보관입니다 | 기관이 키 보관 장치를 마련해 옮깁니다(Go-Live `security.hsm`) |
| 공인 타임스탬프 기관과 연결돼 있지 않습니다 | 자체 TSA 로 서명합니다. 공인 TSA 를 계약하면 주소 설정을 바꿉니다 |
| 본인확인 · 알림 사업자 연결이 모의 상태입니다 | 기관이 계약해 어댑터에 연결합니다 |
| 장기 보관 문서의 재타임스탬프 작업이 없습니다 | 보존 기간이 인증서 · TSA 수명보다 긴 문서의 처리 방침을 기관이 정합니다 |
| 한 기관(단일 테넌트)을 전제로 합니다 | 기관마다 설치본을 따로 둡니다 |
| 콘솔 · 포털 다국어가 없습니다(한국어) | 외국인 서명자 안내는 기관이 보완합니다 |
| ERP 의 일반 전자계약(템플릿 · 주소록 · 발송) 연결은 `미구현` 입니다 | 거래처 계약은 트랙 A(`구현·미검증`)를 씁니다 → [S5](S5-management.md) |

## ⑦ 흔한 함정

- **CSP 를 관찰 모드로 둔 채 개시하는 것.** 위반 보고를 보고 차단 모드로 바꾸는 단계를 잊기 쉽습니다.
- **알림 수신처를 비워 두는 것.** 경보가 로그에만 남아 아무도 보지 못합니다.
- **허용 출처 목록 없이 하드닝을 켜는 것.** 다른 출처에서 부르는 콘솔 · API 가 거부됩니다.
- **리허설 인증서를 운영에 가져가는 것.** 저장소 문서는 실운영 전환 전에 테스트 데이터와 CA 를 새로 만드는 초기화 절차를 둡니다. 이때 **연동 시스템이 보관한 인증서도 다시 발급**받아야 합니다 → [S8](S8-go-real.md).
- **1.26.0 이전 설치본을 올리는 것.** 감사 체인에 이미 분기가 있으면 동시성 보호용 마이그레이션이 일부러 실패합니다. 배포 전에 저장소 운영 가이드의 읽기 전용 점검을 먼저 돌립니다(업그레이드 때만 해당).
- **백업 암호화 비밀을 서버에만 두는 것.**
