# 바꿔야 할 코드 기본값 — 파일 목록
**Files carrying install-specific defaults**

> **EN** — Generated list of code files (per pinned base commit) that still carry **another installation's address** or **institution-identifying strings** (hospital name, institution details). Paths and categories only — the strings themselves are never printed. Regenerate with `node tools/list-install-defaults.mjs`.

> 🤖 **자동 생성 — 손으로 고치지 않습니다.** `node tools/list-install-defaults.mjs` 로 다시 만들고, `--check` 로 대조합니다. · [가이드 목차](README.md) · 쓰는 곳: [S1 코드에 고정된 병원명 · 설치본 주소 교체](S1-core-his.md#-코드에-고정된-병원명)

- **무엇을 셌나**: 각 저장소의 [기준 커밋](../data/base-commits.json)에서, 공개하지 않는 거부 목록의 문구가 들어 있는 **코드 파일**. 문서(`*.md` · `docs/`) · 잠금 파일 · 바이너리는 뺐고, **테스트 · 시드는 넣었습니다**(설치본에 함께 들어가기 때문입니다).
- **분류**: `주소` = 특정 설치본의 도메인 · `식별` = 병원명 · 기관 정보 · 연락처 같은 기관 식별 문자열. 한 파일이 둘 다일 수 있습니다.
- 🔴 **문구는 싣지 않습니다.** 무엇으로 바꿀지는 파일을 열어 보면 드러나고, 바꿀 값은 기관의 값입니다. 경로에 문구가 든 파일은 경로를 가렸습니다. 이메일 주소 안에만 들어 있는 경우(작성자 머리말)는 세지 않았습니다.
- 이 목록은 **"여기를 봐야 한다"** 이지 **"여기만 보면 된다"** 가 아닙니다 — 거부 목록에 없는 형태(다른 표기 · 이미지 속 글자 · DB 에 이미 들어간 값)는 잡히지 않습니다. 바꾼 뒤에는 격리 상태에서 밖으로 나가는 요청이 없는지 봅니다([S0](S0-prepare.md)).

## 한눈에

| 시스템 | 기준 커밋 | 파일 | 주소 | 식별 |
|---|---|---:|---:|---:|
| [HIS (+공개 홈페이지 · 환자 앱)](#his) | `e9d303984f80` | 236 | 73 | 183 |
| [sign](#sign) | `93f56d839c3f` | 19 | 19 | 0 |
| [LIS](#lis) | `ffb34e9d1dbc` | 19 | 16 | 4 |
| [ERP](#erp) | `0e1f54c5b902` | 38 | 31 | 12 |
| [PACS](#pacs) | `532a8ed13e87` | 34 | 31 | 6 |
| [AI Server](#ai-server) | `55acaee90068` | 21 | 13 | 10 |
| [twin](#twin) | `526b4f9a4d3f` | 10 | 10 | 1 |
| [cerno](#cerno) | `4f5c22b331fc` | 4 | 4 | 0 |
| [edu](#edu) | `f8127e6ee278` | 42 | 20 | 26 |
| [Clinic (병원 서비스 웹 · 병원 서비스 API 범위)](#clinic) | `2b20a89b7c3a` | 18 | 18 | 0 |
| [Jitsi](#jitsi) | `0984fbec7177` | 10 | 10 | 2 |
| **합계** | | **451** | 245 | 244 |

## his

**HIS (+공개 홈페이지 · 환자 앱)** — 236개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `apps/api/prisma/manual/seed-integrity-recalibration-20260818.sql` | ● | ● |
| `apps/api/prisma/seed.ts` | ● | ● |
| `apps/api/prisma/seeds/consult-desk.seed.cjs` |  | ● |
| `apps/api/src/common/util/ai-egress-url.ts` | ● |  |
| `apps/api/src/common/util/ai-phi-redact.ts` |  | ● |
| `apps/api/src/common/util/public-url.ts` | ● |  |
| `apps/api/src/main.ts` | ● |  |
| `apps/api/src/modules/agent-session/agent-session.service.ts` |  | ● |
| `apps/api/src/modules/auth/passkey/passkey.service.ts` |  | ● |
| `apps/api/src/modules/blockchain-cert/blockchain-cert.service.ts` |  | ● |
| `apps/api/src/modules/concierge/concierge.service.ts` |  | ● |
| `apps/api/src/modules/config/config-runtime.service.ts` | ● | ● |
| `apps/api/src/modules/decision-registry/decision.registry.ts` | ● |  |
| `apps/api/src/modules/document/document.service.ts` |  | ● |
| `apps/api/src/modules/hospital-info/hospital-info.service.ts` |  | ● |
| `apps/api/src/modules/medical-ai/medical-ai.service.ts` |  | ● |
| `apps/api/src/modules/mobile/identity/identity.service.ts` | ● |  |
| `apps/api/src/modules/partner-request/partner-request.controller.ts` | ● |  |
| `apps/api/src/modules/pharmacy/pharmacy.service.ts` |  | ● |
| `apps/api/src/modules/referral-letter/referral-letter.service.ts` |  | ● |
| `apps/api/src/modules/sign-integration/sign-integration.service.ts` | ● |  |
| `apps/api/src/modules/voucher/totp.ts` |  | ● |
| `apps/api/src/modules/voucher/voucher-email.service.ts` | ● | ● |
| `apps/api/src/modules/voucher/voucher.service.ts` |  | ● |
| `apps/api/src/sentinel/pipe-registry.ts` |  | ● |
| `apps/api/test/ai-call-log/ai-call-log-sink.spec.ts` | ● |  |
| `apps/api/test/ai-call-log/model-releases.spec.ts` | ● |  |
| `apps/api/test/architecture/deploy-public-site-notice.spec.ts` |  | ● |
| `apps/api/test/document/document-download-token.spec.ts` | ● |  |
| `apps/api/test/e2e/core-workflows.e2e.spec.ts` | ● |  |
| `apps/api/test/ess/clinical-certificate-approval.spec.ts` | ● |  |
| `apps/api/test/ess/consent-doctor-approval.spec.ts` | ● |  |
| `apps/api/test/ess/nursing-note-cosign.spec.ts` | ● |  |
| `apps/api/test/ess/record-copy-approval.spec.ts` | ● |  |
| `apps/api/test/evidence/evidence-extract.spec.ts` |  | ● |
| `apps/api/test/hospital-info/homepage-live-freshness.spec.ts` |  | ● |
| `apps/api/test/hospital-info/public-exposure.contract.spec.ts` | ● |  |
| `apps/api/test/integration/his-webhooks.service.spec.ts` | ● |  |
| `apps/api/test/medical-ai/ai-egress-canon.spec.ts` | ● |  |
| `apps/api/test/medical-ai/ai-egress-guard.spec.ts` | ● |  |
| `apps/api/test/medical-ai/ai-egress-hosts-failclosed.spec.ts` | ● |  |
| `apps/api/test/medical-ai/ai-grounding-guard.spec.ts` | ● |  |
| `apps/api/test/medical-ai/auto-soap-proposal.spec.ts` | ● |  |
| `apps/api/test/medical-ai/drug-generic-term-guard.spec.ts` | ● |  |
| `apps/api/test/medical-ai/image-url-reachability.spec.ts` | ● |  |
| `apps/api/test/medical-ai/medical-ai.service.spec.ts` | ● |  |
| `apps/api/test/medical-ai/no-auto-key-reissue.spec.ts` |  | ● |
| `apps/api/test/medical-record-copy/checkup-pdf-keys.spec.ts` |  | ● |
| `apps/api/test/mobile/safety-switch-default.spec.ts` | ● |  |
| `apps/api/test/patient/patient-field-mask.spec.ts` |  | ● |
| `apps/api/test/pre-auth/pre-auth-portal.service.spec.ts` | ● |  |
| `apps/api/test/pre-auth/pre-auth.service.spec.ts` | ● |  |
| `apps/api/test/prescription/fixtures/real-medication-vocabulary.ts` | ● |  |
| `apps/api/test/quality/measurement-authz-and-limit.spec.ts` | ● |  |
| `apps/api/test/setup-env.ts` | ● |  |
| `apps/api/test/sign-integration/sign-completed-emit.spec.ts` | ● |  |
| `apps/api/test/sign-integration/sign-hardening.spec.ts` | ● |  |
| `apps/api/test/smart-auth/ehr-launch.spec.ts` | ● |  |
| `apps/api/test/transfer/transfer-snapshot-failure.spec.ts` |  | ● |
| `apps/api/test/transfer/transfer.controller.spec.ts` |  | ● |
| `apps/api/test/transfer/transfer.service.spec.ts` |  | ● |
| `apps/homepage/.env.production.example` | ● | ● |
| `apps/homepage/amplify.yml` | ● |  |
| `apps/homepage/Dockerfile` | ● | ● |
| `apps/homepage/ecosystem.config.cjs` | ● |  |
| `apps/homepage/next.config.ts` | ● |  |
| `apps/homepage/src/app/about/csr/page.tsx` |  | ● |
| `apps/homepage/src/app/about/directions/page.tsx` |  | ● |
| `apps/homepage/src/app/about/facility/page.tsx` |  | ● |
| `apps/homepage/src/app/about/gallery/page.tsx` |  | ● |
| `apps/homepage/src/app/about/layout.tsx` |  | ● |
| `apps/homepage/src/app/about/page.tsx` |  | ● |
| `apps/homepage/src/app/booking/page.tsx` |  | ● |
| `apps/homepage/src/app/care/centers/layout.tsx` |  | ● |
| `apps/homepage/src/app/care/departments/[slug]/page.tsx` |  | ● |
| `apps/homepage/src/app/care/departments/layout.tsx` |  | ● |
| `apps/homepage/src/app/care/departments/page.tsx` |  | ● |
| `apps/homepage/src/app/care/doctors/[userId]/page.tsx` |  | ● |
| `apps/homepage/src/app/care/doctors/doctors-list-client.tsx` |  | ● |
| `apps/homepage/src/app/care/doctors/layout.tsx` |  | ● |
| `apps/homepage/src/app/care/non-covered/page.tsx` |  | ● |
| `apps/homepage/src/app/care/page.tsx` |  | ● |
| `apps/homepage/src/app/en/layout.tsx` | ● | ● |
| `apps/homepage/src/app/en/page.tsx` | ● | ● |
| `apps/homepage/src/app/guide/certificate/page.tsx` |  | ● |
| `apps/homepage/src/app/guide/emergency/page.tsx` |  | ● |
| `apps/homepage/src/app/guide/funeral/page.tsx` |  | ● |
| `apps/homepage/src/app/health-info/[slug]/layout.tsx` |  | ● |
| `apps/homepage/src/app/healthz/route.ts` |  | ● |
| `apps/homepage/src/app/home/page.tsx` |  | ● |
| `apps/homepage/src/app/international/insurance/page.tsx` |  | ● |
| `apps/homepage/src/app/international/interoperability/page.tsx` | ● | ● |
| `apps/homepage/src/app/international/page.tsx` |  | ● |
| `apps/homepage/src/app/international/partners/page.tsx` |  | ● |
| `apps/homepage/src/app/ja/layout.tsx` | ● | ● |
| `apps/homepage/src/app/ja/page.tsx` | ● | ● |
| `apps/homepage/src/app/layout.tsx` |  | ● |
| `apps/homepage/src/app/news/[slug]/layout.tsx` |  | ● |
| `apps/homepage/src/app/news/layout.tsx` |  | ● |
| `apps/homepage/src/app/news/news-list-client.tsx` |  | ● |
| `apps/homepage/src/app/news/recruit/recruit-list-client.tsx` |  | ● |
| `apps/homepage/src/app/privacy/page.tsx` |  | ● |
| `apps/homepage/src/app/search/search-client.tsx` |  | ● |
| `apps/homepage/src/app/terms/page.tsx` |  | ● |
| `apps/homepage/src/app/zh/layout.tsx` | ● | ● |
| `apps/homepage/src/app/zh/page.tsx` | ● | ● |
| `apps/homepage/src/components/homepage/CenterIllustration.tsx` |  | ● |
| `apps/homepage/src/components/homepage/CmsCategoryPage.tsx` |  | ● |
| `apps/homepage/src/components/homepage/FloatingMenu.tsx` |  | ● |
| `apps/homepage/src/components/homepage/Footer.tsx` |  | ● |
| `apps/homepage/src/components/homepage/GNB.tsx` |  | ● |
| `apps/homepage/src/components/homepage/HeroSlider.tsx` |  | ● |
| `apps/homepage/src/components/homepage/NewsSlider.tsx` |  | ● |
| `apps/homepage/src/lib/public-fetch.ts` | ● |  |
| `apps/homepage/src/lib/site-info.ts` | ● | ● |
| `apps/mobile/app/_layout.tsx` | ● |  |
| `apps/mobile/app/(tabs)/settings.tsx` | ● |  |
| `apps/mobile/app/(tabs)/telehealth.tsx` | ● |  |
| `apps/mobile/src/lib/api-client.ts` | ● |  |
| `apps/web/src/app/(auth)/login/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/csr/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/directions/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/facility/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/gallery/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/about/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/booking/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/centers/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/departments/[slug]/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/departments/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/departments/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/doctors/[userId]/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/doctors/doctors-list-client.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/doctors/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/non-covered/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/care/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/guide/certificate/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/guide/emergency/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/guide/funeral/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/health-info/[slug]/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/home/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/international/insurance/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/international/interoperability/page.tsx` | ● | ● |
| `apps/web/src/app/(homepage)/international/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/international/partners/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/news/[slug]/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/news/layout.tsx` |  | ● |
| `apps/web/src/app/(homepage)/news/news-list-client.tsx` |  | ● |
| `apps/web/src/app/(homepage)/news/recruit/recruit-list-client.tsx` |  | ● |
| `apps/web/src/app/(homepage)/privacy/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/robots.ts` | ● |  |
| `apps/web/src/app/(homepage)/search/search-client.tsx` |  | ● |
| `apps/web/src/app/(homepage)/sitemap.ts` | ● | ● |
| `apps/web/src/app/(homepage)/support/page.tsx` |  | ● |
| `apps/web/src/app/(homepage)/terms/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/analytics/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/blockchain-cert/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/homepage/banners/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/homepage/deploy/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/homepage/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/homepage/seo/page.tsx` | ● | ● |
| `apps/web/src/app/(main)/admin/hospital-info/page.tsx` |  | ● |
| `apps/web/src/app/(main)/admin/status/page.tsx` |  | ● |
| `apps/web/src/app/(main)/consent/templates/page.tsx` |  | ● |
| `apps/web/src/app/(main)/dashboard/components/SessionInfo.tsx` |  | ● |
| `apps/web/src/app/(main)/departments/page.tsx` |  | ● |
| `apps/web/src/app/(main)/doctors/page.tsx` |  | ● |
| `apps/web/src/app/(main)/facility-info/page.tsx` |  | ● |
| `apps/web/src/app/(main)/his-news/page.tsx` |  | ● |
| `apps/web/src/app/(main)/patients/[id]/components/PatientHeader.tsx` |  | ● |
| `apps/web/src/app/(main)/print/consent/[id]/page.tsx` |  | ● |
| `apps/web/src/app/(main)/print/opinion/[encounterId]/page.tsx` |  | ● |
| `apps/web/src/app/(main)/reception/components/ReceptionTicket.tsx` |  | ● |
| `apps/web/src/app/(main)/recruit/page.tsx` |  | ● |
| `apps/web/src/app/consent-device/page.tsx` |  | ● |
| `apps/web/src/app/distributor/page.tsx` |  | ● |
| `apps/web/src/app/en/layout.tsx` |  | ● |
| `apps/web/src/app/en/page.tsx` |  | ● |
| `apps/web/src/app/guide/[id]/page.tsx` |  | ● |
| `apps/web/src/app/ja/layout.tsx` |  | ● |
| `apps/web/src/app/ja/page.tsx` |  | ● |
| `apps/web/src/app/layout.tsx` |  | ● |
| `apps/web/src/app/manifest.ts` |  | ● |
| `apps/web/src/app/portal/_auth/LoginForm.tsx` |  | ● |
| `apps/web/src/app/portal/_services/ServicesTab.tsx` |  | ● |
| `apps/web/src/app/portal/page.tsx` |  | ● |
| `apps/web/src/app/questionnaire/[token]/page.tsx` |  | ● |
| `apps/web/src/app/sso/page.tsx` | ● |  |
| `apps/web/src/app/staff/approvals/page.tsx` |  | ● |
| `apps/web/src/app/staff/login/page.tsx` | ● | ● |
| `apps/web/src/app/staff/page.tsx` |  | ● |
| `apps/web/src/app/survey/[token]/page.tsx` |  | ● |
| `apps/web/src/app/tablet/layout.tsx` |  | ● |
| `apps/web/src/app/tablet/page.tsx` |  | ● |
| `apps/web/src/app/verify/page.tsx` |  | ● |
| `apps/web/src/app/zh/layout.tsx` |  | ● |
| `apps/web/src/app/zh/page.tsx` |  | ● |
| `apps/web/src/components/admin/CategoryCmsPage.tsx` |  | ● |
| `apps/web/src/components/document/lib/hospitalProfile.ts` |  | ● |
| `apps/web/src/components/homepage/CenterIllustration.tsx` |  | ● |
| `apps/web/src/components/homepage/CmsCategoryPage.tsx` |  | ● |
| `apps/web/src/components/homepage/Footer.tsx` |  | ● |
| `apps/web/src/components/homepage/GNB.tsx` |  | ● |
| `apps/web/src/components/homepage/HeroSlider.tsx` |  | ● |
| `apps/web/src/components/homepage/hospital-facts.ts` |  | ● |
| `apps/web/src/components/homepage/NewsSlider.tsx` |  | ● |
| `apps/web/src/components/layout/EduLauncher.tsx` | ● |  |
| `apps/web/src/components/layout/Sidebar.tsx` |  | ● |
| `apps/web/src/components/print/PrintGuard.tsx` |  | ● |
| `apps/web/src/components/print/PrintLayout.tsx` |  | ● |
| `apps/web/src/components/signature/ConsentSignView.tsx` |  | ● |
| `apps/web/src/components/ui/rich-text-editor.tsx` |  | ● |
| `apps/web/src/components/voice-emr/BiometricConsentModal.tsx` | ● |  |
| `apps/web/src/lib/crypto/webauthn.ts` |  | ● |
| `apps/web/src/lib/hospital-contact.ts` |  | ● |
| `apps/web/src/lib/public-fetch.ts` | ● |  |
| `apps/web/test/architecture/homepage-lib-copy-parity.spec.ts` |  | ● |
| `apps/web/test/architecture/hospital-contact-canon.spec.ts` |  | ● |
| `apps/web/test/ui/cms-editor-guard.spec.ts` |  | ● |
| `apps/web/test/ui/homepage-w9-truthfulness.spec.ts` | ● | ● |
| `apps/web/test/ui/public-site-w9-truthfulness.spec.ts` |  | ● |
| `infra/scripts/backup.sh` |  | ● |
| `infra/scripts/build-homepage.sh` | ● |  |
| `infra/scripts/deploy.sh` | ● | ● |
| `infra/scripts/e2e-flow-probe.sh` | ● |  |
| `infra/scripts/postgres-watch.sh` |  | ● |
| `infra/scripts/probe-chart-ai.py` | ● |  |
| `infra/scripts/smoke-e2e.sh` | ● |  |
| `packages/shared/src/i18n/messages/admin4.ts` |  | ● |
| `packages/shared/src/i18n/messages/admin5.ts` |  | ● |
| `packages/shared/src/i18n/messages/admin7.ts` |  | ● |
| `packages/shared/src/i18n/messages/dashboard.ts` |  | ● |
| `packages/shared/src/i18n/messages/layoutchrome.ts` |  | ● |
| `scripts/generate-homepage-images.sh` | ● |  |
| `scripts/i18n-draft.mjs` | ● |  |

## sign

**sign** — 19개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `.env.example` | ● |  |
| `.env.prod.example` | ● |  |
| `<가림 — 경로에 식별 문자열>` | ● |  |
| `docker-compose.prod.yml` | ● |  |
| `scripts/smoke.mjs` | ● |  |
| `src/application/sign-request-facade.service.ts` | ● |  |
| `src/application/signature-request.service.ts` | ● |  |
| `src/swagger.ts` | ● |  |
| `test/general-contract.e2e.mjs` | ● |  |
| `test/idle-admin-audit.e2e.mjs` | ● |  |
| `test/rbac.e2e.mjs` | ● |  |
| `test/webhook-internal-host.e2e.mjs` | ● |  |
| `web/manual.source.html` | ● |  |
| `web/src/app/admin/account/page.tsx` | ● |  |
| `web/src/app/admin/manual/manualHtml.ts` | ● |  |
| `web/src/app/admin/users/page.tsx` | ● |  |
| `web/tests/e2e/account-idle.spec.ts` | ● |  |
| `web/tests/e2e/contracts.spec.ts` | ● |  |
| `web/tests/e2e/rbac-users.spec.ts` | ● |  |

## lis

**LIS** — 19개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `<가림 — 경로에 식별 문자열>` | ● |  |
| `apps/api/.env.example` | ● |  |
| `apps/api/src/integration/his-fhir-client.ts` | ● |  |
| `apps/api/src/integration/his-fhir.spec.ts` | ● |  |
| `apps/api/src/integration/his-integration-client.spec.ts` | ● |  |
| `apps/api/src/integration/his-integration-client.ts` | ● |  |
| `apps/api/src/integration/integration.service.ts` | ● |  |
| `apps/api/src/integration/pacs-client.spec.ts` | ● |  |
| `apps/api/src/modules/admin/user-admin.service.ts` | ● |  |
| `apps/api/src/modules/health/metrics.controller.ts` | ● |  |
| `apps/api/src/modules/settings/webhook-host.spec.ts` | ● |  |
| `infra/docker/.env.production.example` | ● |  |
| `infra/docker/docker-compose.prod.yml` | ● |  |
| `infra/scripts/backup.sh` |  | ● |
| `infra/scripts/deploy-bluegreen.sh` | ● | ● |
| `infra/scripts/deploy.sh` |  | ● |
| `infra/scripts/e2e-server.sh` |  | ● |
| `infra/scripts/his-fhir-smoke.sh` | ● |  |
| `infra/scripts/reflex-pilot-rehearsal.sh` | ● |  |

## erp

**ERP** — 38개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `apps/web/scripts/esign-relay-e2e.mjs` | ● |  |
| `apps/web/scripts/smoke-e2e.mjs` | ● |  |
| `apps/web/src/app/(app)/admin/org/page.tsx` |  | ● |
| `apps/web/src/lib/app-info.ts` | ● |  |
| `infra/.env.example` | ● | ● |
| `infra/bi/metabase/provision.py` |  | ● |
| `infra/deploy.sh` |  | ● |
| `infra/docker-compose.bi.yml` | ● |  |
| `infra/ops/host-health-check.py` | ● |  |
| `infra/sync-to-prod.sh` |  | ● |
| `services/core/alembic/versions/0226_pending_decisions.py` | ● |  |
| `services/core/src/erp/common/router.py` | ● |  |
| `services/core/src/erp/config.py` | ● | ● |
| `services/core/src/erp/hr/eapproval_service.py` | ● |  |
| `services/core/src/erp/integrations/ai_publisher.py` | ● |  |
| `services/core/src/erp/integrations/clinic_staff.py` | ● |  |
| `services/core/src/erp/integrations/eapproval.py` | ● |  |
| `services/core/src/erp/integrations/esign_emp_map.py` | ● |  |
| `services/core/src/erp/integrations/esign_fetch.py` | ● |  |
| `services/core/src/erp/integrations/groupware.py` | ● |  |
| `services/core/src/erp/integrations/his_billing.py` | ● |  |
| `services/core/src/erp/integrations/his_fee_push.py` | ● |  |
| `services/core/src/erp/integrations/his_sign_origination.py` | ● |  |
| `services/core/src/erp/integrations/settlement_callback.py` | ● |  |
| `services/core/src/erp/integrations/weve_rag.py` | ● |  |
| `services/core/tests/test_clinic_staff.py` |  | ● |
| `services/core/tests/test_diagnose_endpoint.py` | ● |  |
| `services/core/tests/test_eapproval.py` | ● | ● |
| `services/core/tests/test_groupware_attendance.py` |  | ● |
| `services/core/tests/test_his_fee_push.py` | ● |  |
| `services/core/tests/test_his_sign_origination.py` | ● |  |
| `services/core/tests/test_org_settings.py` |  | ● |
| `services/core/tests/test_rendering.py` | ● | ● |
| `services/core/tests/test_settlement_callback.py` | ● |  |
| `services/core/tests/test_sign_mirror.py` | ● |  |
| `services/core/tests/test_sign_track_a.py` | ● |  |
| `services/core/tests/test_sso.py` | ● | ● |
| `services/core/tests/test_weve_rag.py` | ● |  |

## pacs

**PACS** — 34개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `admin/src/app/reading/view/ExternalEsign.tsx` | ● |  |
| `admin/src/app/reading/view/ReportEditor.tsx` | ● |  |
| `backend/app/api/viewer_launch.py` | ● |  |
| `backend/app/core/config.py` | ● |  |
| `backend/app/main.py` | ● |  |
| `backend/app/scripts/create_service_account.py` | ● |  |
| `backend/app/services/ai_health_monitor.py` | ● |  |
| `backend/app/services/alert_service.py` | ● |  |
| `backend/app/services/email_service.py` | ● |  |
| `backend/app/services/ollama_inference.py` | ● |  |
| `backend/app/services/sign_service.py` | ● |  |
| `backend/scripts/deploy_phase4.sh` | ● | ● |
| `backend/scripts/load_test.py` | ● |  |
| `deploy/ml-server/pacs-edge.conf` | ● | ● |
| `docker/nginx/server-nginx.conf` | ● | ● |
| `e2e/helpers/session.ts` | ● |  |
| `e2e/playwright.config.ts` | ● |  |
| `e2e/tests/07-prefetch.spec.ts` | ● |  |
| `e2e/tests/08-vrt.spec.ts` | ● |  |
| `e2e/tests/09-patient-export.spec.ts` | ● |  |
| `e2e/tests/12-xds-export.spec.ts` | ● |  |
| `e2e/tests/20-viewer-ux.spec.ts` | ● |  |
| `scripts/e2e-test.sh` | ● |  |
| `scripts/patient_export_test.py` | ● |  |
| `scripts/server/backup-openpacs.sh` |  | ● |
| `scripts/server/cutover-monitor.sh` | ● |  |
| `scripts/server/it-zip-extract-limits.sh` | ● |  |
| `scripts/sr_poc.py` | ● |  |
| `tests/load/locustfile.py` | ● |  |
| `tests/load/run_all.sh` | ● |  |
| `tests/load/study_upload_test.py` | ● |  |
| `tests/load/websocket_test.py` | ● |  |
| `werub-viewer/dist/9195.bundle.82029ebaba76024e67c5.js` |  | ● |
| `werub-viewer/patches/werub-source.patch` |  | ● |

## ai-server

**AI Server** — 21개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `app.py` | ● | ● |
| `client/his_client.py` | ● |  |
| `client/ollama_batch.py` | ● |  |
| `client/web/werub-ai.ts` | ● |  |
| `core/hira_drug_sync.py` | ● |  |
| `core/s3_storage.py` | ● |  |
| `routes/fhir.py` | ● |  |
| `routes/gateway.py` |  | ● |
| `routes/system.py` | ● | ● |
| `scripts/setup-his-tunnel.sh` |  | ● |
| `setup/com.werub.gpu-tunnel.plist` |  | ● |
| `setup/com.werub.his-tunnel.plist` |  | ● |
| `setup/com.werub.prod-tunnel.plist` |  | ● |
| `setup/tunnel.env` |  | ● |
| `templates/admin.html` | ● |  |
| `templates/eval_monitor.html` | ● |  |
| `templates/monitor.html` |  | ● |
| `tests/test_csrf_origin.py` | ● |  |
| `tests/test_ingress_mode.py` | ● |  |
| `tests/test_s3_minio_migration.py` | ● |  |
| `training/outputs/lora_adapter/tokenizer.json` |  | ● |

## twin

**twin** — 10개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `.env.example` | ● |  |
| `deploy/nginx-twin.conf` | ● | ● |
| `docker-compose.yml` | ● |  |
| `services/twin-web/lib/__tests__/smart.test.ts` | ● |  |
| `services/twin-web/lib/smart.ts` | ● |  |
| `services/twin/tests/test_cardiac_ep.py` | ● |  |
| `services/twin/tests/test_organ_mesh.py` | ● |  |
| `services/twin/tests/test_wchannel.py` | ● |  |
| `services/twin/twin/config.py` | ● |  |
| `services/twin/twin/writeback.py` | ● |  |

## cerno

**cerno** — 4개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `.env.example` | ● |  |
| `deploy/nginx-cerno.conf` | ● |  |
| `docker-compose.yml` | ● |  |
| `services/cerno-web/lib/smart.ts` | ● |  |

## edu

**edu** — 42개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `.env.example` | ● |  |
| `.env.prod.example` | ● | ● |
| `apps/api/prisma/archive-backfill.js` |  | ● |
| `apps/api/prisma/backfill-tenant.js` |  | ● |
| `apps/api/prisma/fork-catalog.js` |  | ● |
| `apps/api/prisma/reindex-rag.js` | ● |  |
| `apps/api/prisma/schema.prisma` |  | ● |
| `apps/api/prisma/seed-curriculum.js` |  | ● |
| `apps/api/prisma/seed-helper.js` |  | ● |
| `apps/api/prisma/seed-tenants.js` |  | ● |
| `apps/api/prisma/seed.ts` |  | ● |
| `apps/api/src/common/storage/storage-evictor.ts` |  | ● |
| `apps/api/src/common/tenant/tenant.service.ts` | ● |  |
| `apps/api/src/config/configuration.ts` | ● |  |
| `apps/api/src/integration/notify/email.channel.ts` | ● |  |
| `apps/api/src/integration/notify/groupware.channel.ts` | ● |  |
| `apps/api/src/modules/auth/auth.service.ts` |  | ● |
| `apps/api/src/modules/curriculum/curriculum.service.ts` |  | ● |
| `apps/api/src/modules/settings/settings.module.ts` | ● |  |
| `apps/api/test/invariants/asset-archiver.spec.ts` |  | ● |
| `apps/api/test/invariants/outbox-idempotency.spec.ts` |  | ● |
| `apps/api/test/invariants/storage-cache-fill.spec.ts` |  | ● |
| `apps/api/test/invariants/storage-evictor.spec.ts` |  | ● |
| `apps/api/test/invariants/storage-policy.spec.ts` |  | ● |
| `apps/api/test/invariants/storage-prefetch.spec.ts` |  | ● |
| `apps/api/test/invariants/storage-scorm.spec.ts` |  | ● |
| `apps/api/test/invariants/tenant-scope.spec.ts` |  | ● |
| `apps/api/test/regressions/groupware-bulk-groupkey.spec.ts` | ● | ● |
| `apps/api/test/regressions/his-webhook-unknown-event.spec.ts` |  | ● |
| `apps/api/test/regressions/sign-registrar-revoke.spec.ts` | ● |  |
| `apps/api/test/regressions/sign-webhook-always-2xx.spec.ts` |  | ● |
| `apps/api/test/regressions/tenant-auth-fallback.spec.ts` |  | ● |
| `apps/web/app/admin/offline/page.tsx` | ● |  |
| `apps/web/app/facilitate/[facToken]/page.tsx` | ● |  |
| `apps/web/app/platform/tenants/page.tsx` | ● | ● |
| `apps/web/app/session/route.ts` | ● |  |
| `apps/web/app/sso/route.ts` | ● |  |
| `apps/web/lib/api.ts` | ● |  |
| `apps/web/lib/auth.ts` | ● |  |
| `apps/web/middleware.ts` | ● |  |
| `infra/docker/docker-compose.prod.yml` | ● | ● |
| `infra/nginx/edu.conf` | ● |  |

## clinic

**Clinic (병원 서비스 웹 · 병원 서비스 API 범위)** — 18개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `packages/hospital-web/.env.example` | ● |  |
| `packages/hospital-web/next.config.mjs` | ● |  |
| `packages/hospital-web/src/app/dashboard/page.tsx` | ● |  |
| `packages/hospital-web/src/app/login/page.tsx` | ● |  |
| `packages/hospital-web/src/app/notifications/page.tsx` | ● |  |
| `packages/hospital-web/src/app/page.tsx` | ● |  |
| `packages/hospital-web/src/app/profile/page.tsx` | ● |  |
| `packages/hospital-web/src/app/register/page.tsx` | ● |  |
| `packages/hospital-web/src/app/signup/page.tsx` | ● |  |
| `packages/hospital-web/src/components/HospitalFooter.tsx` | ● |  |
| `packages/hospital-web/src/components/HospitalHeader.tsx` | ● |  |
| `packages/hospital-web/src/middleware.ts` | ● |  |
| `src/app/api/clinic/his/health/route.ts` | ● |  |
| `src/app/api/clinic/his/sso-login/route.ts` | ● |  |
| `src/app/api/clinic/his/sso-ticket/route.ts` | ● |  |
| `src/app/api/clinic/his/wsign/request/route.ts` | ● |  |
| `src/app/api/clinic/register/route.ts` | ● |  |
| `src/app/api/clinic/sso/token/route.ts` | ● |  |

## jitsi

**Jitsi** — 10개

| 파일 | 주소 | 식별 |
|---|:-:|:-:|
| `.env.example` | ● |  |
| `api/src/env.ts` | ● |  |
| `api/src/services/url-guard.test.ts` | ● |  |
| `coturn/turnserver.conf` | ● |  |
| `docker-compose.yml` | ● | ● |
| `nginx/meet-locations.conf` | ● | ● |
| `scripts/integration-test.sh` | ● |  |
| `scripts/load-test.sh` | ● |  |
| `stt-bridge/transcriber.py` | ● |  |
| `web/head.html` | ● |  |
