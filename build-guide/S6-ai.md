# S6 AI 계층 — GPU 한 장 · 끄고 시작해 결정으로 하나씩 켜기 · 환자 AI 활용 동의 · 감독

> ⚠️ 리허설 전 초안 — 새 설치본으로 따라가 보기 전입니다. `확인 필요(따라가기)` 표시는 따라가기에서 확정합니다. · 기준 2026-09-11 · [가이드 목차](README.md)

## ① 목적과 완료 조건

생태계의 AI 연산은 **AI Server** 한 곳이 맡습니다. 각 시스템(HIS · PACS · twin · cerno · edu · ERP)은 AI Server 를 부릅니다. 이 단계의 원칙은 하나입니다.

> 🔴 **설치 직후 AI 기능을 모두 끄고, 기관 결정에 따라 하나씩 켭니다.**
> 코드 기본값은 기능마다 다릅니다. 환자 브리핑 야간 배치 · 데이터 품질 AI 같은 기능은 기본 꺼짐이지만, **HIS 의 AI 기능 전체 스위치와 PACS 영상 자동 선별은 기본 켜짐**입니다(2026-09-11 코드 확인).

AI 는 사람의 판단을 **보조하고 초안을 만듭니다.** AI 가 만든 것은 사람이 승인해야 정본(진료기록)이 되고, 누가 무엇을 승인했는지 기록이 남습니다. AI 서버 없이도 HIS 는 동작하도록 설계했고, AI 가 없거나 멈추면 화면이 그 칸을 "폴백" 또는 "산출 불가"로 표시합니다.

완료 조건:

- [ ] 🔴 AI 를 연결하기 **전에** HIS `ai.server.enabled` 와 PACS 영상 자동 선별을 껐고, 나머지 AI 기능 스위치의 현재 값과 출처를 확인했다
- [ ] AI 를 끈 상태에서 AI 칸이 "폴백" · "산출 불가"로 표시되는 것을 확인했다
- [ ] 🔴 선행 결정 넷(`legal.phiBoundary.gpuTier` · `legal.ai.deviceClassification` · `legal.voiceRecording.basis` · `legal.aiEgress.transferScope`)과 `policy.ai.clinicalFeatureScope` 를 기록했다
- [ ] 기관이 약관을 확인한 모델만 받아 AI Server 에 올렸다
- [ ] 환자 AI 활용 동의를 어떻게 받고 확인할지 정했다
- [ ] 켠 기능마다 결정 → 스위치 → Go-Live 표시 → 감독 화면 확인을 한 바퀴 돌렸다

## ② 설치

### AI Server

| 항목 | 내용 |
|---|---|
| 구현 상태 | `통합`(의료 기능) |
| 스택 | Flask · Ollama(모델 서빙 — 호스트에 직접 설치 · MIT · 판본 고정 안 됨) · ChromaDB(프로세스 안 벡터 저장소) · SQLite(데이터셋 · 작업 큐) |
| 시작 안내 | AI Server 저장소 README 의 **Quick Start** · **Models** 절. 운영 설치 명령과 순서는 `확인 필요(따라가기)` |
| 배포 절차(저장소) | 코드 가져오기 → 실제 DB 대상 사전 점검 → 회귀 테스트 → 재기동 → 스모크 게이트. 게이트를 통과하지 못하면 멈춥니다 |

### GPU — RTX 5080(16GB) 한 장 기준

AI Server 는 **소비자용 GPU 한 장(NVIDIA RTX 5080 · VRAM 16GB)** 을 기준으로 개발하고 돌려 왔습니다. 코드도 16GB 안에서 여러 모델을 나눠 쓰도록 짜여 있습니다(2026-09-11 코드 확인).

| 방식 | 내용 |
|---|---|
| 기본 모델 | 범용 14B 급 하나(실제 적재 약 10.5GB) |
| 운용 방식(설정 한 줄) | **상주**(첫 응답이 빠름) 또는 **요청할 때 적재**(쉬는 동안 VRAM 을 비우고 5분 미사용 시 내림 · 쉬고 난 뒤 첫 요청에 수 초~십수 초 적재 시간) |
| 동시 적재 | 모델 서빙 설정(`OLLAMA_MAX_LOADED_MODELS`)으로 정합니다 — 저장소 문서에 1개 · 2개 기록이 함께 있어 `확인 필요(따라가기)`. 자리가 모자라면 우선순위가 낮은 모델부터 내리고, 1.5GB 여유를 남깁니다 |
| 시간대 프로파일 | 진료 시간(08:00~19:00)은 범용 14B 상주 + 의료 특화 4B~8B 필요 시 적재 · 진료 외 시간은 범용 7B(약 5.0GB) |
| 음성 인식 · 임베딩 | 같은 16GB 를 나눠 씁니다. 배치 음성 인식이 들어오면 쉬는 실시간 인식 모델을 내립니다. 임베딩 모델은 약 1GB |
| 가속기 | NVIDIA CUDA · Apple Silicon(Metal) · CPU 중 자동 선택 |

모델별 VRAM 수치는 코드에 적힌 **추정값**이고, 실행 중에는 실제 적재량을 다시 읽어 씁니다. 운용 방식을 고르는 설정 키 이름은 `확인 필요(따라가기)`. 📏 동시 사용자 수에 따른 처리량 · 모델별 응답 시간 · GPU 없는 환경의 속도는 **아직 계측이 없습니다.**

### 모델 받기 — 기관이 약관을 읽고 직접 받습니다

모델 가중치는 이 저장소에도 생태계 소스에도 없습니다. Ollama 로 받거나 Hugging Face 에서 받습니다. 격리 구간 안으로 반입하는 방법은 `확인 필요(따라가기)`.

| 기본 경로 모델 | 쓰는 곳 | 약관 요점([THIRD_PARTY.md §3](../THIRD_PARTY.md#3-ai-모델-가중치)) |
|---|---|---|
| Qwen2.5 14B · 7B · Qwen3 8B · Qwen3-VL 8B | 일반 질의 · 요약 · 증상 분류 · RAG 답변 · 도구 호출 등 | Apache-2.0 |
| **MedGemma 1.5 4B · MedGemma 4B** | 의료 영상 판독 **초안** · 이중 판독 · 구조화 판독 초안 | HAI-DEF 약관 — 🔴 **임상 사용(진단 · 치료에 쓰는 것, 연구 포함)에 해당하면 관할 규제 기관의 승인을 받으라고 적습니다.** 금지 사용 정책 포함. 1.5 4B 기본 태그는 제3자 재포장본 |
| Llama3-Med42-8B · Meditron 7B | 임상 질의 · 위험 추론 후보 · 약물 분석 1단계 | Llama 3 · Llama 2 Community License. 개발사가 추가 검증 없이 임상에 쓰지 말라고 경고합니다 |
| BGE-M3 · Whisper(large-v3 · medium) · SpeechBrain ECAPA · DeepSeek-OCR | 임베딩 · 음성 인식 · 화자 구분 · 문서 글자 인식 | MIT · Apache-2.0(원문 확인 표기는 THIRD_PARTY) |

- 자체 파인튜닝 의료 모델 2종은 공개 배포하지 않습니다. 공개 모델로 바꾸는 설정이 있습니다.
- 받은 모델에 맞춰 AI Server 의 **역할 → 모델 라우팅 표**를 고칩니다. 호출하는 쪽은 모델 이름이 아니라 역할 이름을 부르고, 등록되지 않은 역할은 다른 모델로 흘러가지 않고 바로 실패합니다.

### AI Server 설정

- **API 키** — 생태계 시스템은 API 키로 붙습니다. 키 발급은 서버 로컬에서만 할 수 있습니다. 키에 만료일이 있으므로 만료 전에 교체 일정을 잡습니다(신 · 구 병행 가능).
- **`ingress_mode`** — 기본값은 `ssh_tunnel` 입니다. 앞단 구성이 다르면 `proxy` 또는 `none` 으로 바꿔야 상태 점검이 거짓 경보를 내지 않습니다.
- **호출 한도** — 호출하는 시스템은 429 응답을 받으면 기다렸다 다시 시도하게 만듭니다.
- **의료 데이터 정본** — 의약품 · DUR · 코드 · 수가 정본을 공공 데이터 API 에서 받아 옵니다. 인터넷 연결이 제한된 환경에서의 반입은 `확인 필요(따라가기)`.
- **`local_only`** — 의료 · 개인건강정보 · 규제 관련 AI 작업은 `local_only` 정책으로 묶여 있어, 외부 AI 제공자로 보내려 하면 **코드가 거부합니다**(실패하면 막는 쪽). 외부 제공자 연결 자리는 있지만 기본값은 모두 꺼져 있습니다.

## ③ 설정 — 끄고 시작해 하나씩 켜기

### 1단계 · 설치 직후 끌 것 (코드 기본값이 켜짐)

| 시스템 | 설정 | 코드 기본값 | 할 일 |
|---|---|---|---|
| HIS | `ai.server.enabled` — AI 기능 전체 스위치 | 켜짐 | 🔴 끕니다(`/admin/config`) |
| PACS | 영상 자동 선별 | 켜짐 | 🔴 끕니다 — PACS 백엔드 설정 `screening_enabled`(환경 변수 `SCREENING_ENABLED`) |
| HIS | `ai.greeting.enabled` — AI 인사 | 켜짐(기준 커밋 설정 목록) | 끄고 필요하면 결정 뒤에 켭니다 |

`ai.server.url`(AI Server 주소)의 값과 출처를 먼저 확인합니다. 특정 설치본의 주소가 기본값으로 남아 있을 수 있으므로, **자기 기관 AI Server 주소를 넣기 전에는 AI 를 켜지 않습니다.**

### 2단계 · 꺼져 있는지 확인할 것 (결정 뒤에 하나씩 켬)

코드 기본값이 꺼짐이어도, 설치본의 DB 값(시드 포함)이 다를 수 있습니다. 시드가 이 값들을 넣는지는 `확인 필요(따라가기)` — `/admin/config` 에서 출처(DB / 기본값 / 미설정)와 함께 봅니다.

| 키 | 기능 | 켜기 전 결정 · 추적 |
|---|---|---|
| `ai.brief.batch.enabled` | 환자 AI 브리핑 야간 배치 | Go-Live `flag.aiBriefBatch` |
| `ai.brief.llm.enabled` | 브리핑 배치 B(야간 LLM 검사해석 초안) — 배치 A 가 켜져 있을 때만 동작 | `flag.aiBriefLlm` · 개인정보보호 담당 참여 |
| `voiceEmr.enabled` | 음성 EMR 마스터 | `legal.voiceRecording.basis` · `flag.voiceEmrEnabled` |
| `voiceEmr.write.enabled` · `voiceEmr.dictate.enabled` · `voiceEmr.order.enabled` | 음성 활력 입력 · 구술 · 음성 오더 | `flag.voiceWrite` · `flag.voiceDictate` · `flag.voiceOrder` |
| `voiceEmr.ambient.enabled` · `voiceEmr.ambient.aiDraft.enabled` | 앰비언트 대화 기록 · AI 초안 | `flag.ambientEnabled` · `flag.ambientAiDraft` |
| `scribe.enabled` | 진료 스크라이브(녹음 → 초안) | `legal.voiceRecording.basis` · `flag.scribeEnabled` |
| `quality.ai.enabled` | 데이터 품질 AI(컨시어지) | `flag.qualityAi` |
| `ai.evidenceExtract.enabled` | 행정 증빙 문서 AI 판독 — 첨부 이미지가 AI 서버로 갑니다 | 결정 `policy.evidenceExtract.enable`(기록하면 시스템 반영) |
| `consult.ai.autoReply` | 상담실 AI 자동응답 — 켜면 사람 검토 없이 환자에게 전송된다고 설정 설명이 적습니다 | 결정 등록부에 항목 없음 — 기관이 따로 정합니다 |
| PACS 판독문 자동 초안 · 드리프트 자동 격리 | 기본 꺼짐 | 켜기 전 결정 |

다른 시스템의 AI 관련 설정:

| 시스템 | 설정 | 비고 |
|---|---|---|
| twin | `patient_require_consent`(환자 동의 요구 · 기본 꺼짐) · `twin_identity_enforce` · `mcp_enabled`(켜면 `mcp_deidentify` 로 비식별) · `pulse_enabled` | 동의 운영을 확인한 뒤 `patient_require_consent` 를 켜기를 저장소가 권합니다. 채팅 모델 이름과 digest 를 설정으로 고정하고 6시간마다 AI Server 와 대조합니다 |
| cerno | `CERNO_AI_KEYS`(의료진별 AI Server 키 매핑 · JSON) | 형식이 틀리면 기동하지 않습니다. 임상 사용 범위는 결정 전이며 **비임상 한정이 기본**입니다. 참여 의료진 식별자를 설정 파일에 등록합니다 |
| edu | AI Server 연동(문항 · 요약 · 학습 도우미 · 전사) | 전사는 진료 기능과 GPU 를 나눠 씁니다 |
| ERP | 청구 사전심사(공시 RAG) | 신고 금액 확정은 AI 에 넘기지 않습니다 |

### 3단계 · 결정으로 하나씩 켜기

1. **선행 결정을 기록합니다** — `legal.phiBoundary.gpuTier`(S0) · `legal.ai.deviceClassification` · `legal.voiceRecording.basis` · `legal.aiEgress.transferScope`.
2. **켤 범위를 위원회가 정합니다** — `policy.ai.clinicalFeatureScope`(선행 결정 셋이 필요) · 품질 임계(`policy.aiQualityThreshold`) · 자동실행 범위(`policy.ai.autonomyScope`).
3. **HIS 를 AI Server 에 연결합니다** — `ai.server.url` · `ai.server.apiKey` 를 넣고 `ai.server.enabled` 를 켭니다. 이 상태에서도 개별 기능 스위치는 꺼져 있어야 합니다.
4. **기능을 하나씩 켭니다** — 기능마다 결정 기록 → 스위치 → Go-Live `H` 영역의 해당 항목 표시 → 감독 화면에서 제안 · 승인 기록 확인 → 다음 기능.
5. 켠 순서와 날짜를 기관 문서에 남깁니다. 되돌릴 때도 같은 순서로 끕니다.

각 단계의 화면 조작(어느 화면에서 누가 바꾸는지)은 `확인 필요(따라가기)`.

### 환자 AI 활용 동의

- twin 은 HIS 의 **AI 활용 동의** 조회 경로를 씁니다(`구현·미검증`). twin 의 `patient_require_consent` 가 꺼져 있으면 동의를 요구하지 않습니다.
- cerno 파일럿 착수 조건에 **대상 환자의 AI 동의**가 들어 있습니다(Go-Live `integ.cernoPilot`).
- 진료 음성 녹음 · 보관은 환자 · 의료인 동의를 갖춘 범위에서의 적법성을 허가권자가 확인합니다(`legal.voiceRecording.basis`).
- HIS 에서 환자 AI 활용 동의를 받고 기록하는 화면 · 서명(S4) 연결 · 철회 처리는 `확인 필요(따라가기)`.

### 감독 지표

| 어디 | 무엇이 남나 |
|---|---|
| HIS | AI 제안 원장(생성 → 승인 · 수정 · 거부) · 모델 릴리즈 기록 · AI 호출 기록 · 환자를 지목한 AI 조회의 감사 기록. 기준 커밋에 AI 감독 화면 경로(`/admin/ai-oversight`)가 있습니다 — 보이는 지표는 `확인 필요(따라가기)` |
| HIS 품질 임계 | `ai.skill.quality.minAiRate` · `ai.skill.quality.minCalls` · `ai.skill.quality.action` — 임계는 기본이 **미설정**이고 위원회가 과거 실측에서 정합니다(`policy.aiQualityThreshold`). 표본이 최소 호출 수보다 적으면 판정을 보류합니다 |
| AI Server | 충실도(근거와 맞는지) · 검색 품질 · 채점기 일관성 등 자기 품질 계측 · 응답 헤더의 버전 · 계약 버전 · 커밋 · Prometheus 지표 |
| twin | 모델 digest 대조(바뀌면 알림) |

화면의 AI 표기는 공용 상수 하나(`AI(WeRU.B)`)로 통일돼 있고 면책 문구를 함께 보여 줍니다.

## ④ 사람이 정할 것 (10)

| 키 | 층 | 개시 관계 | 무엇을 정하나 |
|---|---|---|---|
| `legal.aiEgress.transferScope` | 허가권자 | 🔴 개시 전 필수 | 임상데이터 전송 목적지 · 경로를 법적으로 한정했는가(배포로 반영) |
| `legal.voiceRecording.basis` | 허가권자 | 🔴 개시 전 필수 | 진료 음성 녹음 · 보관의 적법 근거 — 확인함 / 검토가 끝날 때까지 원음 수집 중단 |
| `policy.ai.clinicalFeatureScope` | 원내 위원회 | 🔴 개시 전 필수 | AI 임상 기능을 어디까지 켤 것인가 — 선행 `legal.ai.deviceClassification` · `legal.phiBoundary.gpuTier` · `legal.voiceRecording.basis` |
| `legal.ai.deviceClassification` | 허가권자 | 개시 뒤 가능(30일) | AI 자동실행이 의료기기(SaMD)에 해당하는지 확인했는가 |
| `policy.ai.autonomyScope` | 원내 위원회 | 개시 뒤 가능(30일) | AI 자동실행 범위 — 없음 / 저위험 항목만. 선행 `legal.ai.deviceClassification` |
| `policy.aiQualityThreshold` | 원내 위원회 | 개시와 무관 | AI 스킬 품질 임계값을 과거 실측으로 확정할 것인가 |
| `policy.evidenceExtract.enable` | 원내 위원회 | 개시 뒤 가능 | 행정 증빙 문서 AI 판독을 켤 것인가 — 선행 `legal.aiEgress.transferScope` · 기록하면 시스템 반영 |
| `policy.metrics.upstreamScope` | 원내 위원회 | 개시 뒤 가능(30일) | 상향 전송을 허용할 비식별 지표의 범위 — 선행 `legal.phiBoundary.gpuTier` |
| `policy.loopspec.adopt` | 원내 위원회 | 개시와 무관 | 루프 선언 플랫폼(LoopSpec)을 채택할 것인가 · 어디까지 |
| `policy.loopspec.lifecycleAuthority` | 원내 위원회 | 개시와 무관 | 루프 승격(shadow → limited → general) 권한과 절차 — 선행 `policy.loopspec.adopt` |

`legal.phiBoundary.gpuTier`(원내 GPU 인가 위탁 유지인가)는 [S0](S0-prepare.md)에서 정합니다. 결정 등록부 밖에서 기관이 정할 것: 받을 모델과 그 약관 확인 주체 · `consult.ai.autoReply` · 환자 AI 활용 동의 절차.

## ⑤ 확인

| 확인 화면 | 무엇을 보나 |
|---|---|
| `/admin/config` | AI 스위치의 현재 값과 출처 |
| `/admin/ai-settings` | 환자 AI 브리핑 배치 스위치 |
| `/admin/data-quality` | 데이터 품질 AI |
| `/admin/smart-clients` | cerno · twin 의 SMART 앱 등록 |
| `/admin/audit` · `/admin/ai-oversight` | AI 호출 · 제안 · 승인 기록 |
| AI Server 의료 데이터 카탈로그(`GET /api/medical/catalog`) | 데이터셋별 건수 · 최신성 · 마지막 동기화 상태 |
| twin `/health/deps` | FHIR 검증기 등 의존성 상태 |

이 단계를 닫는 Go-Live 항목 (15) — 모두 개시를 막지 않는 추적 항목입니다. **켤지 말지는 사람이 정합니다.**

| 키 | 항목 | 판정 |
|---|---|---|
| `ai.werub` | AI 서버 활성 — 설정 게이트 `ai.server.enabled` | 실검증 |
| `ai.scribeStt` | 스크라이브 음성 인식 GPU(large-v3 메모리 부족 해소) | 자가신고 |
| `ai.draftProvenanceSchema` | AI 초안 출처 기록 스키마 일반화 결정 | 자가신고 |
| `integ.cernoPilot` | cerno 파일럿 착수(런치 경로 · 대상 환자 AI 동의 · 실 의료진 왕복) | 자가신고 |
| `flag.aiBriefBatch` · `flag.aiBriefLlm` | 환자 AI 브리핑 배치 A · B | 자가신고(운영 결정) |
| `flag.voiceEmrEnabled` · `flag.voiceWrite` · `flag.voiceDictate` · `flag.voiceOrder` | 음성 EMR · 활력 입력 · 구술 · 음성 오더 | 자가신고(운영 결정) |
| `flag.ambientEnabled` · `flag.ambientAiDraft` · `flag.scribeEnabled` | 앰비언트 기록 · AI 초안 · 스크라이브 | 자가신고(운영 결정) |
| `flag.qualityAi` | 데이터 품질 AI | 자가신고(운영 결정) |
| `flag.consentAiTranslate` | 동의서 AI 번역 초안 검토 · 활성화(법무 · 국제진료) | 자가신고 |

이 단계를 닫는 개원 단계 기본 항목은 없습니다.

## ⑥ 아직 안 되는 것과 대체 수단

| 아직 안 되는 것 | 대체 수단 |
|---|---|
| HIS 관리 화면의 모델 레지스트리 대조 · PACS 의 AI Server 가용성 감시가 `미구현` 입니다 | AI Server 쪽 지표와 상태 점검으로 봅니다 |
| 원격 상담 녹화 분석 · 실시간 자막(Jitsi → AI Server)이 `중단` 입니다 | Jitsi 를 새로 구성한 뒤 다시 확인합니다 → [S2](S2-patient-access.md) |
| HIS 의 영상 AI 사전판독은 사용 매뉴얼상 "사용 불가"입니다 | 영상 판독 초안은 PACS → AI Server 경로(`구현·미검증`)를 봅니다 |
| 16GB 에서는 상주 모델 하나와 그 밖의 모델 하나까지만 함께 올립니다. 음성 인식 여러 건의 동시 처리 · 영상과 대화 모델의 동시 적재는 더 큰 GPU 가 있어야 풀린다고 저장소 문서가 적습니다 | 시간대 프로파일로 나눠 씁니다. 부족하면 GPU 를 늘립니다 |
| 동시 처리는 단일 워커 구성이고, 처리량 계측이 없습니다 | 리허설(S7)에서 기관 규모로 측정합니다 |
| 의료 데이터 정본과 근거 문서가 한국 공공기관 자료입니다 | 다른 나라는 그 나라의 기준 데이터와 근거 문서를 새로 붙입니다 |
| 의료기기 해당성이 확정되지 않았습니다(twin 은 안전 등급 분류 예비 단계 · cerno 는 비임상 한정) | 판단과 인허가는 구축 기관이 합니다([DISCLAIMER.md](../DISCLAIMER.md)) |
| twin 의 위험 분석은 AI 관련 고장 모드 중 자동화 편향 · 데이터 편향을 "조치 필요"로 둡니다(정량 검증 미실시) | 결정 `policy.aiQualityThreshold` · 감독 지표로 운영 중 계측합니다 |
| 자체 파인튜닝 모델은 제공하지 않습니다 | 공개 모델로 바꾸는 설정을 씁니다 |

## ⑦ 흔한 함정

- **전체 스위치가 켜진 채 AI Server 주소부터 넣는 것.** 넣는 순간 AI 호출이 시작됩니다. 먼저 끄고, 결정 뒤에 켭니다.
- **AI Server 주소 기본값을 확인하지 않는 것.** 특정 설치본의 주소가 남아 있으면 다른 설치본으로 요청이 갑니다.
- **받은 모델과 라우팅 표가 어긋나는 것.** 등록되지 않은 역할은 다른 모델로 넘어가지 않고 바로 실패합니다.
- **커뮤니티 재포장 태그를 원본으로 믿는 것.** 가중치와 약관이 원본과 같은지 기관이 확인합니다.
- **모델을 바꾸고 twin 대조를 잊는 것.** twin 은 digest 가 바뀌면 알립니다. 저장소의 변경 절차(PCCP)에 따라 검증 스크립트를 다시 돌립니다.
- **요청 시 적재 방식의 첫 응답 지연을 장애로 오해하는 것.** 쉬고 난 뒤 첫 요청에 적재 시간이 붙습니다.
- **`ingress_mode` 를 앞단 구성과 다르게 두는 것.** 상태 점검이 거짓 경보를 냅니다.
- **API 키 만료.** 만료일 전에 신 · 구 키를 병행해 교체합니다.
- **화면의 AI 표기나 면책 문구를 지우는 것.** 표기는 공용 상수 하나로 관리됩니다.
- **환자 데이터를 외부 AI 로 보내려는 설정.** `local_only` 작업은 코드가 거부합니다. 우회하려 하지 말고 결정(`legal.aiEgress.transferScope`)으로 다룹니다.
