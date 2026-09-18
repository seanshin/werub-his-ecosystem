# WeRU.B HIS Ecosystem

**AI 기반 병원정보시스템(HIS)을 오픈 형태로 — 적은 자원으로도 세울 수 있게**
**An open ecosystem for AI-assisted hospital information systems — buildable with modest resources**

> 이 저장소는 **소개·구축 자료 저장소**입니다. 소스 코드는 담지 않습니다. 각 시스템의 소스는 아래 [시스템 13](#시스템-13)의 링크로 갑니다(링크는 정리되는 대로 채웁니다).
> 현재 상태: **자료 제작 중** — 진행 계획은 [ROADMAP.md](ROADMAP.md)를 보세요.
> **EN** — This is a **documentation repository**: it introduces the ecosystem and explains how to build it. It contains **no source code**; links to each system's source are listed under [시스템 13 / The 13 systems](#시스템-13) and will be filled in as they are settled. Status: **work in progress** — see [ROADMAP.md](ROADMAP.md).
> Documents are written in Korean with English summaries (marked **EN**) in each section.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 30초 요약

| | |
|---|---|
| **무엇** | 병원 하나를 돌리는 **13개 시스템**(HIS · 홈페이지 · 환자 앱 · LIS · PACS · sign · ERP · AI Server · twin · cerno · Clinic · edu · Jitsi)을 한 벌로 세우는 생태계 |
| **어떻게** | 공개 구성요소로 짜고, **AI 는 기관 안 GPU 한 장**에서 돌리고, 필요한 것부터 붙입니다 |
| **AI 는** | **보조합니다.** 초안과 제안을 만들고 **사람이 승인해야 정본**이 됩니다. 승인 이력이 남습니다 |
| **지금 상태** | 연결 113개 중 **실제로 호출해 확인한 것은 27개**(`검증됨` · 새 설치본끼리 · 2026-09-14~15) · 코드만 맞물린 것 61개 · 구축 가이드 S0~S8 은 **한 번 따라가 봤습니다**(개발 PC · GPU 없음) → [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약) |
| **규모 · 비용** | 개발 PC 한 대에 7개 시스템이 함께 떴습니다(메모리 약 2.9GB · 가상 데이터 · 디스크는 **200GB 이상** 권장). **금액은 적지 않습니다** — 기관 조건이 정합니다 → [규모 — 지금 말할 수 있는 것](#규모--지금-말할-수-있는-것) |
| **이 저장소** | 소스가 아니라 **소개 · 구축 자료**입니다. [MIT](LICENSE) · [의료기기가 아닙니다](DISCLAIMER.md) |
| **소스는** | 시스템마다 **저장소가 따로** 있습니다(11곳). 주소 · 기준 커밋 · 받은 뒤 처음 여는 파일은 → **[소스 받기](SOURCES.md)**. 🔴 저장소는 **하나씩 공개되는 중**이라 아직 열리지 않는 주소가 있습니다 |

**처음이라면 이 넷만 보세요** — [한 문장](overview/01-one-sentence.md) · [지금 상태](overview/08-status-and-preparation.md) · [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약) · [화면 293장](screens/)

**"왜 이렇게 까다로운가"가 궁금하면** → [설계 기준은 어떻게 생겼나](DESIGN-HISTORY.md) — 릴리즈 108개가 남긴 것 · [형제 시스템은 어떻게 자랐나](DESIGN-HISTORY-SYSTEMS.md) — 나머지 12개의 기록 666건

---

## 이 프로젝트가 바라는 것
**What this project aims for**

### 의료정보시스템이 비용 때문에 멈추지 않기를
**So that health information systems are not stopped by cost**

> **EN** — Running a hospital takes far more than a chart: registration, orders, labs, imaging, pharmacy, billing, claims, accounting, HR and staff education all have to run on connected systems. Acquiring them is still a large, expensive project — license fees, dedicated hardware and vendor lock-in leave **many institutions worldwide running on paper and spreadsheets**. This ecosystem exists to lower that threshold: the ecosystem's own code is offered under the [MIT license](LICENSE); it covers the whole set of 13 interlocking systems rather than a single HIS; and it is meant to be within reach of small and mid-sized hospitals, clinics, public health agencies and **health facilities in low-resource countries** — institutions that will build and run it themselves.

병원 하나가 제대로 돌아가려면 진료 기록만으로는 부족합니다. 접수·처방·검사·영상·약제·수납·청구·회계·인사·교육까지, 병원의 모든 일이 정보시스템 위에서 이어져야 합니다. 그런데 이 시스템을 갖추는 일은 여전히 크고 비싼 사업입니다. 라이선스 비용, 전용 하드웨어, 특정 업체에 묶이는 구조 때문에 **정보시스템 없이 종이와 엑셀로 버티는 의료기관**이 세계 곳곳에 많습니다.

이 생태계는 그 문턱을 낮추려고 만들었습니다.

- **오픈 형태로 제공합니다.** 생태계의 자체 코드는 [MIT 라이선스](LICENSE)로 제공합니다. 쓰고, 고치고, 다시 배포할 수 있습니다. 다만 **지금 공개된 것은 이 소개 · 구축 자료뿐입니다** — 소스 저장소는 프로젝트마다 정리가 끝나는 대로 열립니다([지금 받을 수 있는 것](#지금-받을-수-있는-것)).
- **병원 하나를 돌리는 데 필요한 시스템을 한 벌로 갖춥니다.** HIS 한 개가 아니라, 검사·영상·전자서명·경영·AI·협업·교육까지 13개 시스템이 서로 맞물린 생태계입니다.
- **많은 곳에서 폭넓게 쓰이기를 바랍니다.** 큰 병원만이 아니라 중소 병원, 의원급 기관, 공공 보건기관, 그리고 **의료 인프라가 부족한 개발도상국의 의료기관**도 자기 손으로 세우고 운영할 수 있는 것이 목표입니다.

### 최소한의 사양과 구현으로 쓸 수 있게
**Designed to run on minimal hardware**

> **EN** — "AI-based HIS" usually calls to mind a server room and datacenter GPUs. This ecosystem was designed the other way around: it is assembled from **freely available open components** (PostgreSQL, Redis, Node.js, Python, Orthanc, Ollama — note that each carries its own license terms, some of which change by version; see [THIRD_PARTY.md](THIRD_PARTY.md)); systems are **independent and attached as needed** over standard protocols (FHIR, DICOM, HL7 v2), so an institution can start with the HIS alone and connect an existing PACS rather than replacing it; **every AI feature has a switch** and the HIS is designed to work without the AI server, showing "fallback" or "cannot compute" instead of pretending a value exists.
> **A measured record, not a recommended spec** — eight systems (HIS, PACS, sign, LIS, twin, cerno, edu, Jitsi) ran together on **one 8-core / 16GB virtual server** (operations record of 2026-08-25, about 10GB memory in use, no swap headroom). Treat it as close to a *lower bound that actually ran*, not as a sizing recommendation. Per-system recommended specs will be measured during a fresh install walkthrough and published in the [build guide](build-guide/).

"AI 기반 HIS"라고 하면 대형 서버실과 데이터센터용 GPU 를 먼저 떠올립니다. 이 생태계는 반대 방향으로 설계했습니다.

| 설계 선택 | 무엇을 줄이나 |
|---|---|
| **무료로 받을 수 있는 공개 구성요소로 짭니다** — PostgreSQL · Redis · Node.js(NestJS·Next.js) · Python(FastAPI·Flask) · Orthanc · Ollama | 상용 데이터베이스·미들웨어를 사지 않아도 됩니다. 다만 구성요소마다 라이선스 조건이 다르고, 판본에 따라 조건이 바뀌는 것도 있습니다(예: Redis 는 7.4 부터 약관이 달라집니다 · AGPL·GPL 계열 서버 포함). 목록과 원문은 [THIRD_PARTY.md](THIRD_PARTY.md)에 있습니다 |
| **필요한 것부터 붙입니다** — 시스템마다 독립적이고, 표준 프로토콜(FHIR · DICOM · HL7 v2)로 연결합니다 | 처음부터 13개를 다 세울 필요가 없습니다. HIS 하나로 시작해 검사·영상·경영을 차례로 붙이고, 이미 쓰는 시스템(예: 기존 PACS)이 있으면 그대로 연결합니다 |
| **AI 는 기능마다 스위치가 있고, 기관이 결정해서 켭니다** | AI 서버 없이도 HIS 는 동작하도록 설계했습니다. AI 가 없거나 멈추면 화면이 그 칸을 "폴백" 또는 "산출 불가"로 표시하고, 정상인 척하지 않습니다. 다만 **코드 기본값은 기능마다 다릅니다**. 환자 브리핑 야간 배치 · 데이터 품질 AI 같은 기능은 기본 꺼짐이지만, AI 기능 전체 스위치와 PACS 영상 자동 선별은 기본 켜짐입니다(2026-09-11 코드 확인). 그래서 구축 가이드는 **설치 직후 AI 기능을 끄고, 기관 결정에 따라 하나씩 켜는 순서**로 안내합니다 |
| **서버 한 대에서 시작할 수 있습니다** | 아래 실측 기록을 보세요 |

**실제로 돌아간 기록** — HIS · PACS · sign · LIS · twin · cerno · edu · Jitsi 8개 시스템이 **8코어 · 16GB 메모리 가상 서버 한 대**에 함께 올라가 있었습니다(2026-08-25 운영 기록 · 메모리 약 10GB 사용). 다만 이 구성은 여유가 넉넉하지 않았습니다(스왑 여유 없음). 그래서 이 수치는 **"권장 사양"이 아니라 "실제로 돌아간 하한에 가까운 기록"** 입니다. 시스템별 권장 사양은 새 설치본으로 구축 절차를 따라가 보면서 측정해 [구축 가이드](build-guide/)에 싣습니다.

### AI 는 소비자용 GPU 한 장으로 — RTX 5080(16GB)
**AI on a single consumer GPU — RTX 5080 (16GB)**

> **EN** — All AI computation is handled by one **AI Server** inside the institution, developed and operated on a **single consumer GPU (NVIDIA RTX 5080, 16GB VRAM)**; the code is written to share that 16GB across models. A general-purpose 14B-class model (~10.5GB resident) is the default, either kept resident or loaded on demand and unloaded after five idle minutes; time-of-day profiles swap in smaller medical models as needed; speech-to-text and the ~1GB embedding model share the same memory. Accelerator selection (CUDA / Apple Silicon Metal / CPU) is automatic.
> **What the AI does is always assistive** — triage suggestions, draft clinical notes, voice records, medication explanations, DUR interaction checks, checkup result drafts, RAG answers, risk score cards. **A human must approve** before anything becomes part of the record, and the approval is logged.
> **Patient data does not leave the institution** — medical, personal-health and regulated AI work is bound by a `local_only` policy; attempts to route it to an external AI provider are **refused by the code** (fail-closed). External providers can be wired in, but every such default is off (verified 2026-09-11).
> **Institutions obtain the models themselves** — no model weights are included here or in the ecosystem source. Default targets are open-weight models (Qwen, MedGemma, Llama-derived medical models, Whisper) whose **terms differ per model**: the MedGemma terms direct clinical use toward regulatory approval, and some developers warn against clinical use without further validation. See [THIRD_PARTY.md §3](THIRD_PARTY.md#3-ai-모델-가중치).
> 📏 **Not yet measured** — throughput by concurrent users, per-model latency, and speed without a GPU. We do not call unmeasured things "sufficient."

이 생태계의 AI 연산은 **AI Server** 한 곳이 맡습니다. 이 AI Server 는 데이터센터용 GPU 가 아니라 **소비자용 GPU 한 장(NVIDIA RTX 5080 · VRAM 16GB)** 을 기준으로 개발하고 돌려 왔습니다. 코드도 처음부터 16GB 안에서 여러 모델을 나눠 쓰도록 짜여 있습니다(2026-09-11 코드 확인).

**16GB 를 나눠 쓰는 방식**

- **기본 모델은 범용 14B 급 하나**입니다(실제 적재 약 10.5GB). 운용 방식은 설정 한 줄로 고릅니다.
  - **상주** — 늘 올려 두어 첫 응답이 빠릅니다.
  - **요청할 때 적재** — 쉬는 동안 VRAM 을 비워 두고, 요청이 오면 올립니다. 5분 동안 쓰지 않으면 스스로 내려갑니다. 대신 쉬고 난 뒤의 첫 요청에는 적재 시간(14B 기준 수 초~십수 초)이 붙습니다.
- **동시에 올려 두는 모델 수는 모델 서빙 설정(`OLLAMA_MAX_LOADED_MODELS`)으로 정합니다.** 저장소 문서에는 1개(16GB 에서 한 모델만 상주 · 모델을 바꿀 때마다 다시 적재)와 2개 두 기록이 함께 있어, 권장값은 계측해 싣습니다. 어느 쪽이든 새 모델을 올릴 자리가 모자라면 **우선순위가 낮은 모델부터 내리고** 올리며, 이때 1.5GB 여유를 남깁니다.
- **시간대별 운영 프로파일**을 관리 기능으로 적용할 수 있습니다.

  | 프로파일 | 올려 두는 모델 | 필요할 때 올리는 모델 |
  |---|---|---|
  | 진료 시간(08:00~19:00) | 범용 14B 1개 | 의료 특화 4B~8B 모델(각 약 3.5~8.5GB) |
  | 진료 외 시간 | 범용 7B 1개(약 5.0GB) | — |

- 음성 기록(STT)도 같은 16GB 를 나눠 씁니다. 배치 음성 인식이 들어오면 쉬고 있는 실시간 인식 모델을 내려 자리를 만듭니다.
- 검색 증강(RAG)용 임베딩 모델은 약 1GB 로 작습니다.
- 모델별 VRAM 수치는 AI Server 코드에 적힌 **추정값**입니다. 실행 중에는 실제 적재량을 다시 읽어 씁니다.
- 가속기는 자동으로 고릅니다(**NVIDIA CUDA · Apple Silicon(Metal) · CPU**). GPU 가 없는 환경에서도 코드는 돌지만, 그 속도는 계측해 따로 싣습니다.

**AI 가 하는 일** — 모두 **사람의 판단을 돕는 보조**입니다. 분류(triage) 보조 · 진료 기록 초안 · 음성 기록 · 약물 설명 · 약물 상호작용 점검(DUR) 보조 · 검진 결과 설명 초안 · 근거 문서 질의(RAG) · 위험 점수 카드. AI 가 만든 것은 사람이 승인해야 정본(진료기록)이 되고, 누가 무엇을 승인했는지 기록이 남습니다.

**환자 데이터는 기관 밖으로 나가지 않게** — 온프레미스 GPU 한 장으로 돌리는 이유 중 하나입니다. 의료·개인건강정보·규제 관련 AI 작업은 코드에서 `local_only` 정책으로 묶여 있습니다. 외부 AI 제공자로 보내려고 하면 **코드가 거부합니다**(실패하면 막는 쪽으로 동작). 외부 AI 제공자를 연결할 자리는 있지만, 기본값은 모두 꺼져 있습니다(2026-09-11 확인). 클라우드 AI 사용료가 들지 않고, 인터넷 사정이 좋지 않은 곳에서도 AI 가 외부 서비스에 기대지 않습니다.

**모델은 기관이 골라서 직접 받습니다** — 모델 가중치는 이 저장소에도 생태계 소스에도 들어 있지 않습니다. 기본으로 가리키는 모델은 Qwen · MedGemma · Llama 계열 의료 모델 · Whisper 등 공개 가중치 모델이고, **약관은 모델마다 다릅니다.** 예를 들어 MedGemma 약관은 임상 사용에 해당하면 규제 기관의 승인을 받으라고 적고, 일부 의료 모델의 개발사는 추가 검증 없이 임상에 쓰지 말라고 경고합니다. 모델별 약관과 원문은 [THIRD_PARTY.md](THIRD_PARTY.md#3-ai-모델-가중치)에 정리했습니다.

> 📏 **아직 싣지 않은 수치** — 동시 사용자 수에 따른 처리량, 모델별 응답 시간, GPU 없는 환경의 속도는 아직 공개할 수 있는 계측이 없습니다. 측정 방법과 측정일을 붙여 [구축 가이드](build-guide/)에 싣습니다. 계측하지 않은 것을 "충분하다"고 말하지 않기 위해서입니다.

### 개발도상국에서도 세울 수 있는 수준으로
**Buildable in low-resource settings**

> **EN** — Taken together, the choices above are meant to hold up under real constraints: **small budget** (MIT code, free open components, no commercial DB, one consumer GPU); **few IT staff** (the build is divided into nine stages, S0–S8, each with its own verification screens and completion criteria, and the system itself tracks ~60 opening-readiness and ~60 go-live items); **unreliable internet** (inference runs on the institution's own GPU); **differing regulations** (hospital policy values are changed on a settings screen, not in code, and a *country axis* carries national rules — currently KR and AE); **different languages** (UI strings are language packs; Korean is the base, English and Japanese catalogs exist, Arabic is in preparation — **all current translations are AI drafts with no completed human review**); **staged adoption** (attach systems one at a time, connect existing ones over standard protocols).
> **Honestly, what an institution must supply in a new country** — **code masters** (drug, diagnosis, fee schedule, lab codes) differ by country and are distributed on each government's terms, so the institution obtains and loads them; **external-agency transmission** (claims, eligibility, notifiable disease reporting) follows national specifications and **is not implemented**, so an institution must add a module or run alongside existing claims software; **medical device and software approval** and privacy-regulation judgments are **made by the adopting institution** (see the [medical disclaimer](DISCLAIMER.md)).

위의 선택들을 모으면, 이 생태계는 다음 조건에서도 세울 수 있도록 만들어졌습니다.

| 제약 | 이 생태계의 대응 |
|---|---|
| 예산이 적다 | 자체 코드는 MIT · 무료 공개 구성요소 · 상용 DB 불필요 · AI 는 소비자용 GPU 한 장 |
| 전산 인력이 적다 | 구축을 9단계(S0 준비 ~ S8 실운영 전환)로 나누고, 단계마다 **확인 화면과 완료 조건**을 둡니다. 개원 준비 60여 항목과 개시 점검 60여 항목을 시스템이 직접 관리합니다 |
| 인터넷이 불안정하다 | AI 추론은 기관 안의 GPU 에서 합니다. 환자 데이터를 외부 AI 로 보내지 않습니다 |
| 규정이 나라마다 다르다 | 병원 규정 값은 코드가 아니라 **설정 화면**에서 바꿉니다. 국가별 규칙을 담는 **국가 축**이 있습니다(현재 한국 · UAE) |
| 언어가 다르다 | 화면 문구를 **언어 팩**으로 갈아 끼우는 구조입니다. 기본은 한국어이고, 영어 · 일본어 카탈로그가 있으며 아랍어는 준비 중입니다. 지금 번역은 모두 AI 초안이고 사람 검수를 마친 것은 아직 없습니다(검수 흐름은 있음 · 번역 범위는 계측해 싣습니다) |
| 모든 것을 한꺼번에 들일 수 없다 | 필요한 시스템부터 차례로 붙입니다. 기존 시스템과는 표준 프로토콜로 연결합니다 |

**솔직하게 — 새로운 나라에 세울 때 기관이 준비해야 하는 것**

- **코드 마스터**(약품 · 진단 · 수가 · 검사 코드)는 나라마다 다르고, 각 나라 공공기관이 배포 조건을 정합니다. 기관이 직접 받아 반입합니다. 국가 축은 현재 한국 · UAE 두 곳이 있고, 국가별로 어떤 코드 마스터를 반입할 수 있는지는 확인해 [구축 가이드](build-guide/) S1 장에 싣습니다. 그 밖의 나라는 코드 마스터 · 청구 규칙 · 언어 팩을 새로 붙여야 합니다.
- **청구 · 자격조회 같은 대외 기관 전송**은 나라마다 규격이 다릅니다. 현재는 대외 전송 모듈이 구현돼 있지 않아서, 기관이 전송 모듈을 붙이거나 기존 청구 소프트웨어와 함께 써야 합니다.
- **의료기기 · 소프트웨어 인허가**와 개인정보 규제 판단은 각 나라의 규정에 따라 **구축 기관이 합니다**([의료 면책 고지](DISCLAIMER.md)).
- 이 밖에 지금 구현 상태에서 알고 시작해야 할 것은 [아래](#지금-알고-시작해야-할-것)에 적었습니다.

---

## 이 자료가 답하려는 것
**What these materials answer**

> **EN** — Thirteen systems interlock as one ecosystem. These materials help an institution that intends to **build it in its own hospital** understand three things: **intent** (why it is designed this way — the principles an HIS should hold to in the age of AI), **structure** (what it is made of and how the systems connect), and **build** (in what order to stand it up, what to configure, what people must decide, and how far to turn AI on). All demonstrations use **synthetic hospital data**.

병원 하나를 돌리는 데 필요한 시스템 13개가 하나의 생태계로 맞물려 있습니다. 이 자료는 그 생태계를 **자기 병원에 세우려는 의료기관**이 다음 세 가지를 이해하도록 돕습니다.

1. **취지** — 왜 이렇게 설계했는가. AI 시대의 HIS 가 지켜야 할 원칙
2. **구조** — 무엇으로 이루어졌고, 시스템끼리 어떻게 연결되는가
3. **구축** — 어떤 순서로 세우고, 무엇을 설정하고, 사람이 무엇을 정해야 하며, AI 를 어디까지 켜는가

데모는 모두 **가상 병원 데이터**로 보여줍니다.

## 누가 읽나
**Who reads this**

| 역할 · Role | 들고 오는 질문 · The question they bring | 먼저 볼 것 |
|---|---|---|
| 병원장·CIO | 왜 이 구조인가? 무엇을 얻고 무엇을 감수하나? 구축 규모와 비용은? | [발표 덱](deck/) → [개요서 2 · 8장](overview/) → [규모 — 지금 말할 수 있는 것](#규모--지금-말할-수-있는-것) |
| 전산·인프라팀 | 무엇을 어디에 설치하나? 서버·GPU·DB 요구사항은? | [지금 받을 수 있는 것](#지금-받을-수-있는-것) → [구축 가이드 S0](build-guide/S0-prepare.md) → [규모](#규모--지금-말할-수-있는-것) → [시스템 구성서](systems/) |
| 의료정보·임상 리더 | 진료 흐름이 시스템 사이를 어떻게 지나가나? 병원 규정은 어디서 설정하나? | [데모 시나리오](scenarios/) → [화면으로 보는 생태계](screens/) |
| AI·거버넌스 위원회·법무 | AI 가 어디서 무엇을 하나? 어디까지 켜도 되나? 누가 승인하고 무엇이 남나? | [개요서 6장](overview/06-ai.md) → [S6 AI 계층](build-guide/S6-ai.md) → [AI 감독 화면](screens/his.md#ai-감독-관제--분모가-없으면-비율을-내지-않는다) |
| 연동 개발자·파트너 | 시스템끼리 무슨 프로토콜·인증으로 붙나? 무엇이 검증됐나? | [연결 카드](integration/cards/)(붙이려는 쌍 한 장) → [공통 규약](integration/contracts.md)(오류 봉투 · 서명 · 멱등 · 재시도) → [연동 계약 지도](integration/) → [연결 상태 표](RELEASES/draft/compatibility.md) |
| 보건 당국·국제 협력 기관 | 자원이 적은 지역에 세울 수 있나? 무엇을 현지에서 준비해야 하나? | [개발도상국에서도](#개발도상국에서도-세울-수-있는-수준으로) → [제공 조건](overview/09-terms.md) |

## 설계 취지
**Design principles**

> **EN** — Eight principles, each with what it means for the adopting institution: **AI assists, people decide** (approval and its history are required before an AI output becomes part of the record); **state the source** (every value is marked human / AI / fallback / cannot-compute); **do not pretend to know** (no sample means "cannot compute," not zero — so a green dashboard can be trusted); **one system of record** (vocabulary, numeric policy and status labels come from one place); **what people decide belongs on a screen** (decisions are layered — licensing authority / hospital committee / individual staff judgment — and recorded in one registry); **independent systems joined by standards** (attach what you need, swap what you already run); **outbound transmission takes three conditions** (implemented + configured, default off + approved); **pre- and post-opening are separated by build mode** (development / rehearsal / real).

| 취지 · Principle | 구축 기관에게 의미하는 것 · What it means for the institution |
|---|---|
| **AI 는 보조, 판단은 사람** | AI 를 켜도 책임 구조가 바뀌지 않습니다. AI 산출물은 사람이 승인해야 정본이 되고, 그 이력이 남습니다 |
| **출처를 말한다** | 값마다 사람 / AI / 폴백 / 산출 불가를 구분합니다. AI 서버가 멈춰도 화면이 정상인 척하지 않습니다 |
| **모르는 것을 아는 척하지 않는다** | 표본이 없으면 0 이 아니라 "산출 불가"라고 말합니다. 대시보드의 초록불을 믿을 수 있습니다 |
| **정본은 하나** | 어휘·수치 정책·상태 라벨이 한 곳에서 나옵니다. 병원 규정을 바꿀 때 한 곳만 고칩니다 |
| **사람이 정할 것은 화면에서** | 법적 허가권자 / 원내 위원회 / 직원 건별로 결정의 층을 나누고, 결정을 등록부 한 곳에 남깁니다 |
| **도메인마다 독립 시스템, 표준으로 연결** | 필요한 것부터 붙이고, 이미 쓰는 시스템을 바꿔 끼울 수 있습니다 |
| **대외 발신은 세 조건** | 구현 + 설정(기본 꺼짐) + 승인. 설정 하나로 몰래 외부에 나가지 않습니다 |
| **개시 전과 후를 모드로 가른다** | 개발 / 리허설 / 리얼. 리얼 전환 뒤에는 시험용 통로가 원천적으로 없습니다 |

> 이 여덟 가지는 처음부터 설계된 것이 아니라 **전부 겪은 것에서 나왔습니다.** 어떤 일이 있었는지는 [설계 기준은 어떻게 생겼나](DESIGN-HISTORY.md)와 [형제 시스템은 어떻게 자랐나](DESIGN-HISTORY-SYSTEMS.md)에 있습니다.

### 원칙은 말이 아니라 화면에 있습니다

돌아가는 설치본에서 **화면 293장**을 찍어 확인했습니다(2026-09-12~13 · 가상 병원 데이터). 같은 "0" 이라도 **왜 0 인지에 따라 화면이 다르게 말합니다.**

> "표본 0 기준이라 **안전을 의미하지 않습니다**" · "**재지 않았다(0 이 아니다)**" · "조회하지 않습니다(**비어 있다는 뜻이 아닙니다**)" · "0건은 **'없었다'는 뜻이 아닙니다**" · "**비어 있는 것은 할 일이 없다는 뜻이 아닙니다**" · "**추정 시각을 원장에 박지 않습니다**"

그중 가장 분명한 자리 — **OMOP CDM 변환** 화면입니다.

> 🔴 **"변환기(ETL)가 구현되어 있지 않습니다. 실행 버튼은 비활성이며, API 는 `501 Not Implemented` 로 응답합니다 — 변환되지 않고 '완료'라고 적지 않기 위함입니다."**

**가짜 성공을 반환하지 않으려고 API 를 501 로 둔 것**입니다. 아홉 가지 방식을 [취지 3](overview/02-principles.md#화면이-모른다고-말하는-아홉-가지-방식)에 표로 모았고, 각 행에서 실제 화면으로 갑니다.

## 시스템 13
**The 13 systems**

| 계층 · Layer | 시스템 · System | 한 줄 정의 · In one line | 소스 · Source |
|---|---|---|---|
| 코어 | **Hospital RUN (HIS)** | 외래·입원·수술·응급·검사·약제·검진·경영지원 통합 HIS · 생태계의 신원 허브 | 정리 중 |
| 환자 접점 | 공개 홈페이지 · 환자 앱 | 예약·결과 열람·동의·문진 | 정리 중 |
| 임상 부서 | **LIS** | 진단검사·미생물·병리·수혈·유전체 검사정보시스템 | 정리 중 |
| 임상 부서 | **PACS** | 웹 PACS — 영상 서버·뷰어·판독 워크플로·AI 연동 | 정리 중 |
| 신뢰 | **sign** | 자체 PKI·RFC 3161 타임스탬프·PAdES-LTA 전자서명 | 정리 중 |
| 경영 | **ERP** | 재무회계·원가·인사급여·자재·보험청구·세무 | 정리 중 |
| AI | **AI Server** | 온프레미스 GPU 통합 AI — 의료 분류·요약·DUR·RAG·음성 인식 보조 | 정리 중 |
| AI | **cerno** | 의료진별 개인화 임상 AI(근거가 없으면 생성하지 않는 RAG) | 정리 중 |
| AI | **twin** | 디지털 트윈 — 위험 점수 카드·SBAR·시뮬레이션 | 정리 중 |
| 협업·교육 | **Clinic** | 병원 그룹웨어 — 인수인계·근무표·알림·결재 | 정리 중 |
| 협업·교육 | **edu** | 직원 이러닝·법정교육·전자 이수증 | 정리 중 |
| 협업·교육 | **Jitsi** | 원격진료 화상(자체 호스팅) | 정리 중 |

> **EN** — A core HIS at the center (also the ecosystem's **identity hub**), with patient-facing, clinical-department, trust, management, AI, and collaboration/education layers around it. "정리 중" in the Source column means the source link is still being settled.

버전·규모·구현 상태는 첫 [통합 릴리즈](RELEASES/)에서 매니페스트로 고정해 싣습니다. 이 자료의 모든 수치에는 **값 · 센 방법 · 계측일**을 함께 적습니다.

## 구축은 이렇게 진행됩니다
**How a build proceeds**

> **EN** — Nine stages. **S0 preparation** (terms, servers, GPU, DB, institution profile, naming decision-makers) and **S1 core HIS** come first; **S2–S6** (patient access, clinical departments, trust layer, management layer, AI layer) are attached only as needed — though the **trust layer (sign) is best stood up before anything that needs signatures**; **S7 rehearsal** runs the whole flow on synthetic data; **S8 real cutover** isolates synthetic data, migrates real data and deploys a *real build* — it is not a settings toggle. Each stage chapter records ① install ② configure ③ what people must decide ④ verification screens and completion criteria ⑤ **what does not work yet and the workaround** ⑥ common pitfalls.

| 단계 · Stage | 내용 · What happens |
|---|---|
| S0 준비 | 제공 조건(MIT · 면책 · 제3자 구성요소) 확인 · 서버·GPU·DB 확보 · 기관 프로파일(국가·기관명·진료과) · 결정 권한자 지정 |
| S1 코어 HIS | 설치 · 코드 마스터 반입 · 부서·병상·직원·역할 · 병원 규정 설정 |
| S2 환자 접점 | 홈페이지·포털·앱 · 본인확인·알림 채널 |
| S3 임상 부서 | LIS·PACS 연결 · 장비 인터페이스 |
| S4 신뢰 계층 | 전자서명·인증서·타임스탬프 · 동의서 서명 |
| S5 경영 계층 | ERP·그룹웨어·교육 연결 |
| S6 AI 계층 | AI Server(GPU 한 장) 연결 · **설치 직후 AI 기능을 끄고 → 기관 결정으로 하나씩 켬**(코드 기본값이 켜진 기능이 있음) · 환자 AI 활용 동의 · 감독 지표 |
| S7 리허설 | 가상 데이터로 전 흐름 시연 · 안전 게이트 경고 운영 · 감시자 판정 |
| S8 리얼 전환 | 가상 데이터 격리 · 실데이터 이관 · 리얼 빌드 |

단계마다 ① 설치 ② 설정 ③ 사람이 정할 것 ④ 확인 화면·완료 조건 ⑤ **아직 안 되는 것과 대체 수단** ⑥ 흔한 함정을 [구축 가이드](build-guide/)에 적습니다. 가이드는 저장소와 릴리즈 기록을 읽고 쓴 뒤, **새 설치본으로 S0~S8 을 한 번 따라가 보며 고쳤습니다**(아래).
## 새 설치본으로 따라가 본 결과 — 요약
**What the first follow-along install confirmed (2026-09-13 ~ 2026-09-16)**

> **EN** — Seven systems were installed from their pinned base commits on one isolated development PC, and **27 connections were driven end to end between those fresh installs**; 23 of them were also re-tested with a tampered key, a forged signature, a replayed message or a mismatched target, to confirm the guard actually blocks. Details, including what did not work: [따라가 본 결과](build-guide/follow-along-2026-09.md).

기준 커밋으로 새로 세운 설치본 **7개**(HIS · sign · LIS · PACS · ERP · edu · AI Server)를 외부로 나가지 못하는 네트워크에 올리고, 시스템 사이 연결을 **새 설치본끼리만** 실제로 불러 봤습니다. 아래는 그렇게 **확인된 것**입니다.

### 확인된 것

| 무엇 | 확인 내용 |
|---|---|
| **연결 27개가 끝까지 동작** | 검사 오더 → 결과 → 재검 취소, 직원·환자 전자서명, 판독 서명, 진료비 계산서, 청구·정산, 사내교육 이수까지 **한 줄로 이어졌습니다**([연결 상태](RELEASES/draft/compatibility.md)의 확인일 칸) |
| **가드가 실제로 막았다** | 27개 중 **23개**에 틀린 키 · 변조 토큰 · 위조 서명 · 재전송 · 다른 대상을 일부러 넣어 다시 시험했고, 전부 거부됐습니다(401 · 403 · 409). 나머지 4개(오더 취소 전파 · 공개키 조회 · 직원 명부 · 이수 기록)는 **거부를 시험할 자리가 없어** 정상 동작만 확인했습니다 |
| **실패를 실패라고 말한다** | AI 주소가 허용 목록에 없으면 "설정이 없어 보내지 않았다", 감시자가 없으면 "스윕 기록 없음 · 정지 의심", 표본이 모자라면 "산출 불가(0 이 아닙니다)" |
| **직무 분리가 코드에 있다** | 결과를 적용한 직원은 자기 결과를 검증할 수 없고, LIS 관리자는 검체 접수·결과 입력을 할 수 없으며, 정리 작업은 요청자 본인이 승인할 수 없습니다 |
| **리허설 모드가 실제로 잡아 둔다** | 문자 · 메일 · 연동 발송이 나가지 않고 대기열에 보류됐고, 보류 중이라는 사실을 로그로 계속 알렸습니다 |
| **백업이 복원됐다** | 암호화 백업을 다른 DB 에 복원해 **562개 테이블의 행 수가 일치**하는 것까지 확인했습니다 |
| **원본 그대로 되는 설치도 있다** | sign · ERP · edu 는 저장소의 운영용 이미지가 **그대로 빌드되고 떴습니다** |
| **가이드가 실측으로 채워졌다** | 따라가기 전 92곳이던 `확인 필요(따라가기)` 표시가 **22곳**으로 줄었고, 막힌 곳과 우회는 각 단계 장에 그대로 적었습니다 |

### 그리고 정직하게

- 이 따라가기는 **개발 PC 한 대**(arm64 · GPU 없음)에서 했습니다. **처리량 · 응답 시간 · AI 품질은 이 결과로 판단하지 않습니다.**
- 끝까지 가지 못한 연결, 코드에 고정돼 설정으로 못 바꾸는 경로, 아직 하지 않은 것(기준 장비 · 리얼 전환 · 미설치 시스템)은 **빠짐없이 적어 두었습니다** → [따라가 본 결과](build-guide/follow-along-2026-09.md)
- 연결 상태는 **`검증됨`(확인일 필수) 27 · `구현·미검증` 61** 입니다. `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.

## 지금 받을 수 있는 것
**What you can actually get today**

> **EN** — Today this repository gives you the **materials**: the build playbook, 13 system briefs, the connection status table with verification dates, 293 screenshots, and three checklists. The **source repositories are listed by address but not yet open** — each project is opened once its own cleanup is done. Nothing here hides that.

| 지금 있는 것 | 어디에 |
|---|---|
| 구축 절차 S0~S8 · 따라가며 막힌 곳과 우회 | [구축 가이드](build-guide/) · [따라가 본 결과](build-guide/follow-along-2026-09.md) |
| 시스템 13개가 무엇으로 이루어졌나 | [시스템 구성서](systems/) |
| 무엇이 실제로 맞물려 도는가(확인일 포함) | [연결 상태 표](RELEASES/draft/compatibility.md) |
| 화면이 실제로 어떻게 생겼나 | [화면 293장](screens/) |
| 개원 · 개시 · 결정 체크리스트 | [checklist/](checklist/) |
| 버전 조합 한 벌 | [통합 릴리즈 초안](RELEASES/draft/RELEASE.md) |
| **소스를 어디서 어떻게 받나** — 저장소 11곳 · 기준 커밋 · 받은 뒤 처음 여는 파일 | **[소스 받기](SOURCES.md)** |

| 아직 없는 것 | 언제 |
|---|---|
| 🔴 **컨테이너 이미지**(미리 만들어 둔 것) | 배포 여부가 정해지지 않았습니다 — 지금은 각 저장소에서 직접 빌드합니다 |
| AI 모델 가중치 | 저장소에도 소스에도 담지 않습니다. 기관이 약관을 읽고 직접 받습니다([THIRD_PARTY](THIRD_PARTY.md)) |
| 코드 마스터(수가 · 약가 · 상병 등) | 공공기관이 배포합니다. 기관이 이용 조건을 확인하고 받습니다 |

**소스는 시스템마다 저장소가 따로 있고, [소스 받기](SOURCES.md)에 주소 · 기준 커밋 · 받은 뒤 처음 여는 파일을 한 장으로 정리해 두었습니다.** 저장소는 **각 프로젝트의 정리가 끝나는 대로 하나씩 공개**되는 중이라, 아직 열리지 않은 주소가 있습니다 — 그 안내는 **열리는 순간 그대로 동작합니다**(주소도 커밋도 바뀌지 않습니다).

## 규모 — 지금 말할 수 있는 것
**Sizing: what we can say, and what we cannot**

> **EN** — Numbers measured on one developer PC (arm64, no GPU, synthetic data) — useful for "will it fit", not for throughput. Reference-machine figures do not exist yet and we do not invent them.

⚠️ 아래 수치는 **개발 PC 한 대**(arm64 · GPU 없음 · 가상 데이터 · 사용자 없음)에서 잰 것입니다. **처리량 · 응답 시간 · AI 품질을 이 값으로 판단하지 않습니다.**

| 무엇 | 지금 말할 수 있는 값 | 근거 |
|---|---|---|
| 여러 시스템을 함께 올렸을 때 메모리 | HIS · ERP · PACS 코어 · AI(작은 대체 모델)를 함께 올려 **약 2.9GB** | [따라가 본 결과](build-guide/follow-along-2026-09.md) 2026-09-15 |
| 디스크 | 🔴 **200GB 이상**을 권합니다. 60GB 가상 머신이 빌드 이미지와 모델로 **두 번 가득 찼습니다** | 같은 곳 |
| 이미지 크기(큰 것) | HIS API 약 4GB · HIS 웹 약 4.7GB · AI 의존성 약 4.6GB · 모델 서버 약 7GB | 같은 곳 |
| 운영 기록 한 건 | 8개 시스템이 **8코어 · 16GB 가상 서버 한 대**에 함께(메모리 약 10GB 사용 · 2026-08-25) | [기존 운영 기록](build-guide/README.md) |
| AI | **GPU 한 장(16GB)** 기준 설계 · 14B 급 모델 상주 약 10.5GB | [S6](build-guide/S6-ai.md) |
| 사람 손이 드는 자리 | 설치 우회 · 코드 마스터 반입 · 검사 코드 매핑 보정 · **사람 결정 56건** | [체크리스트](checklist/) · 따라가 본 결과 |

| 아직 말할 수 없는 것 | 무엇이 있어야 하나 |
|---|---|
| 동시 사용자 수에 따른 처리량 · 응답 시간 | x86 · GPU 기준 장비에서의 부하 시험 |
| AI 품질 · 모델별 응답 시간 | 기준 장비 + 기준 모델(이번엔 작은 대체 모델로 호출 경로만 확인) |
| 실데이터 규모의 이관 · 백업 시간 | 실데이터 규모 시험 |

**비용은 금액으로 적지 않습니다.** 기관마다 조건이 달라 우리가 정할 값이 아닙니다. 대신 **무엇이 비용을 만드는지**는 적습니다 — ① 서버와 GPU ② 사람 손(설치 · 마스터 반입 · 매핑 · 검수) ③ 제3자 조건(모델 가중치 · 코드 마스터 · 일부 서버의 상용 라이선스) ④ 기관이 직접 받아야 하는 데이터. 각 항목이 어디서 생기는지는 [S0 준비](build-guide/S0-prepare.md)와 [THIRD_PARTY](THIRD_PARTY.md)에 있습니다.

## 지금 알고 시작해야 할 것
**Know this before you start**

> **EN** — So that an institution does not plan around things that are not there. Items needing a workaround today: **external-agency transmission** (claims, eligibility, notifiable disease reporting) is **not implemented**; **no SMS provider** is registered, so patient identity-verification texts are simulated; **signing keys are held in software** (no HSM), and a qualified timestamp authority and identity-verification vendor are the institution's to arrange; **the Jitsi telehealth install does not currently work** and must be rebuilt; **login** uses public-key verification for five systems (sign, PACS, edu, twin, cerno), a **shared secret** for two (ERP, Jitsi — separate key management required) and an API key for Clinic; **the hospital name is still hard-coded** in 118 HIS files (re-counted at the 2026-09-11 base commit — [file list](build-guide/replace-list.md#his)), so changing it means editing code until that work lands; and **one specific installation's addresses are code defaults** in 245 files across 11 repositories (docs excluded, same base commit — [file list](build-guide/replace-list.md)) — change them before installing and **bring the system up first with outbound network access blocked**, or requests may go to another installation.

구축 기관이 계획을 잘못 세우지 않도록, 현재 구현 상태에서 대체 수단을 준비해야 하는 것을 먼저 밝힙니다. 발행 전에 다시 확인해 확인일과 함께 갱신합니다.

- **대외 기관 전송**(청구 · 자격조회 · 감염병 신고 등) — 전송 모듈이 구현돼 있지 않습니다. 기관이 모듈을 붙이거나 기존 청구 소프트웨어와 함께 씁니다. 제품은 이것을 **결함이 아니라 「실 서비스 개시 전 완료 대상」으로 관리**하고, 채널마다 **수기 대체 절차와 법적 근거**를 화면에 적습니다 → [기관 연동 화면](screens/his.md#기관-연동--안-되는-것을-일정으로-관리한다)
- **문자 발송 제공자** — 등록돼 있지 않습니다. 환자 본인확인 문자는 모의 발송입니다.
- **전자서명 키 보관** — 인증 기관 키를 소프트웨어로 보관합니다(하드웨어 보안 모듈 **미적용** — 다만 PKCS#11 설정 자리는 이미 있습니다). 공인 타임스탬프 기관 연결과 본인확인 업체 연동은 기관이 준비합니다.
- **원격 화상(Jitsi)** — 현재 설치본은 동작하지 않습니다. 구축 기관이 새로 구성해야 합니다.
- **로그인 방식** — HIS 가 발급한 토큰을 다섯 시스템(sign · PACS · edu · twin · cerno)은 공개키로 검증합니다. 두 시스템(ERP · Jitsi)은 공유 비밀키 방식이라 키 관리가 따로 필요하고, Clinic 은 API 키로 붙습니다. edu 는 직원 로그인은 공개키로 검증하지만 **직원 명부 조회 · 이수 기록은 HIS 비밀키를 공유**해 호출합니다. AI Server 는 서버에서 발급한 API 키 두 종류로 붙습니다(따라가기 2026-09-14~15).
- **기관명 설정** — HIS 코드에 병원명이 고정 문자열로 남아 있는 파일이 있습니다(118개 · 2026-09-17 기준 커밋에서 다시 셈에서 다시 셈 · 09-10 값과 같음 · [파일 목록](build-guide/replace-list.md#his)). 설정값으로 옮기는 작업이 진행 중이며, 끝나기 전까지는 자기 병원명을 넣으려면 코드를 고쳐야 합니다.
- **기관 주소 설정** — 각 시스템의 코드와 설정 예시에 특정 설치본의 주소가 기본값으로 들어 있는 파일이 있습니다(11개 저장소 합계 299개 — [파일 목록](build-guide/replace-list.md) · 문서 제외 · 2026-09-17 기준 커밋에서 다시 셈). 자기 기관 주소로 바꾸지 않고 띄우면 **다른 설치본으로 요청이 갈 수 있으므로**, 설치 전에 바꾸고 첫 기동은 외부로 나가는 연결을 막은 상태에서 합니다. 바꿔야 할 설정 목록은 [구축 가이드](build-guide/)에 싣습니다.
- **HIS 설치 경로** — 🔴 저장소의 운영용 컨테이너 설치 파일(compose · Dockerfile)이 **그대로는 동작하지 않습니다**(새 설치본 따라가기 2026-09-13 · 빌드 메모리 · 누락 의존성 · 스키마 반영 명령 · 내부 바인딩). 첫 관리자 계정도 **데모 시드로만** 만들어집니다. 따라가기에서 한 우회와 순서는 [S1](build-guide/S1-core-his.md#설치-순서)에 있습니다. sign 은 이미지가 그대로 빌드되고 기동합니다([S4](build-guide/S4-trust.md#②-설치)). 다른 시스템에서 나온 것은 [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약)에 모았습니다.
- **상시 감시자 · 백업** — HIS 운영 compose 에는 **상시 감시자 프로세스가 없고**(배포 스크립트가 따로 띄움), 백업 스크립트는 **HIS DB 하나만** 뜹니다. 컨테이너로 설치하는 기관은 감시자를 따로 올리고, 같은 DB 서버에 둔 다른 시스템(ERP 등)의 백업을 따로 준비합니다([S7](build-guide/S7-rehearsal.md) · [S8](build-guide/S8-go-real.md)).
- **AI 서버 주소** — HIS 의 AI 서버 주소는 환자 임상 텍스트가 나가는 목적지라 **설정 화면에서 바꿀 수 없게 막혀 있고**, 기준 커밋에서는 환경변수로도 바뀌지 않았습니다. 설치 담당이 기록을 남기고 DB 에서 바꿉니다([S6](build-guide/S6-ai.md)).

## 저장소 구성
**Repository layout**

| 경로 · Path | 내용 · Contents | 상태 · Status |
|---|---|---|
| [`ROADMAP.md`](ROADMAP.md) | 자료 제작 계획 | ✅ |
| [`DESIGN-HISTORY.md`](DESIGN-HISTORY.md) | **설계 기준은 어떻게 생겼나** — 코어 HIS 릴리즈 108개와 판정 규칙 9축 | 🟡 초안 |
| [`DESIGN-HISTORY-SYSTEMS.md`](DESIGN-HISTORY-SYSTEMS.md) | **형제 시스템은 어떻게 자랐나** — 나머지 12개의 릴리즈 기록 666건 · 되풀이된 장면 다섯 | 🟡 초안 |
| [`overview/`](overview/) | 취지·구조 개요서(10장) | 🟡 초안 |
| [`SOURCES.md`](SOURCES.md) | **소스 받기** — 시스템 13 → 저장소 11 · 기준 커밋 · 받은 뒤 처음 여는 파일 · 저장소에 없는 것 | 🟢 생성물(주소 · 커밋 · 파일 존재를 기계로 대조) |
| [`build-guide/`](build-guide/) | **AI 기반 HIS 구축 가이드**(S0 준비 ~ S8 리얼 전환) | 🟡 초안 · **한 번 따라가 봄**(2026-09-13~16) · 남은 확인 필요 22곳 · [부록: 바꿔야 할 코드 기본값](build-guide/replace-list.md) |
| [`systems/`](systems/) | 시스템 구성서 13장 | 🟡 초안 |
| [`integration/`](integration/) | **연동 계약 지도** — 인증 3방식 · 개통 게이트 · **구축 시 연결 순서** · **[연결 카드 48장](integration/cards/)** · **[공통 규약](integration/contracts.md)**(오류 봉투 · 서명 대상 · 멱등 · 재시도) · [매트릭스](integration/matrix.md)(자동 생성) | 🟡 초안 · `검증됨` 27 / 113 |
| [`scenarios/`](scenarios/) | 데모 시나리오 4편(외래 · 응급 · 검진 · 입원→퇴원) | 🟡 초안 · 캡처 자리 52 중 **44**(✅ 36 · 🟡 8) · 응급 시나리오는 9/9 |
| [`deck/`](deck/) | 발표 덱(내용 32장 · A·E 시각 요약 + 화면 11장) | 🟡 초안 |
| [`checklist/`](checklist/) | 구축 체크리스트(개원 준비 60 · 개시 점검 60 · 사람 결정 56 — 레지스트리에서 자동 생성) | ✅ 1차 생성 |
| [`data/`](data/) | 규모 계측 스냅샷(계측일 · 기준 커밋 포함) | ✅ 1차 계측 |
| [`RELEASES/`](RELEASES/) | 생태계 통합 릴리즈([릴리즈 노트](RELEASES/draft/RELEASE.md) · 버전 조합 매니페스트 · 시스템별 릴리즈 요약 13 · [연결 상태](RELEASES/draft/compatibility.md) — 확인일 칸) | 🟡 초안 · 번호 미정 |
| [`screens/`](screens/) | **화면으로 보는 생태계**(시스템 13장 + 흐름 1장 · 캡처와 설명) | 🟡 초안 · 293장 |
| [`assets/screens/`](assets/screens/) | 화면 캡처 이미지 293장 + [캡처 목록](assets/screens/INDEX.md)(자동 생성) | 🟡 HIS 264 / 266 · 형제 시스템 29 |
| [`diagrams/`](diagrams/) | 도식 8종 + 연결 지도(연결 상태 표에서 자동 생성) | 🟡 초안 |
| [`glossary.md`](glossary.md) | 용어집 | 🟡 초안 |
| `tools/` | 공개 검사기 · 규모 계측기 · 체크리스트 추출기 · 매니페스트 생성기 · 연결 지도 · 연동 매트릭스 생성기 · HIS 메뉴 추출기 · 캡처 목록 생성기 · 릴리즈 기록 계수기 · 바꿔야 할 코드 기본값 목록 생성기 · 문서 간 일치 검사기 · **수치 주장 검사기**(문서에 적힌 「검증됨 N」 같은 수치가 연결 표와 같은지) · **릴리즈 자르기 도구**(번호가 정해지면 `RELEASES/draft/` 를 번호 폴더로 굳히고 링크를 한 번에 옮깁니다 — 기본이 미리보기) — 발행 전 한 번에 `node tools/verify-all.mjs`(검사 22개) | ✅ |

### 무엇부터 보면 되나

| 시간 | 이렇게 |
|---|---|
| **3분** | 위 [30초 요약](#30초-요약) → [한 문장](overview/01-one-sentence.md) |
| **20분** | [발표 덱](deck/) 32장 — 취지 · 구조 · 구축 · **지금 상태** · 데모 · 조건 |
| **1시간** | [개요서](overview/) 10장(병원장 · CIO 가 처음부터 끝까지 읽도록 씀) |
| **소스를 받으려면** | **[소스 받기](SOURCES.md)** — 어느 저장소에 무엇이 있고, 어느 커밋을 받아야 이 자료와 같은 것을 보는지 |
| **구축을 앞두고** | [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약) → [구축 가이드](build-guide/) S0~S8 + [체크리스트](checklist/) 세 벌(개원 60 · 개시 점검 60 · 사람 결정 56) |
| **화면이 궁금하면** | [화면으로 보는 생태계](screens/) — 돌아가는 설치본에서 찍은 293장 |
| **규모 · 비용이 궁금하면** | [규모 — 지금 말할 수 있는 것](#규모--지금-말할-수-있는-것) — 잰 값과 **아직 말할 수 없는 것**을 갈라 놓았습니다(금액은 적지 않습니다) |
| **원칙의 뿌리가 궁금하면** | [설계 기준은 어떻게 생겼나](DESIGN-HISTORY.md) — "만들었다"와 "동작한다"가 다른 일이라는 것을 배운 기록 |
| **다른 시스템도 그렇게 일했는지 궁금하면** | [형제 시스템은 어떻게 자랐나](DESIGN-HISTORY-SYSTEMS.md) — 서로 다른 트랙에서 같은 장면이 되풀이된 기록 |

## 참여
**Contributing**

이 자료는 아직 제작 중입니다. 외부 기여(이슈 · 풀 리퀘스트)를 어떻게 받을지는 정하는 중이며, 정해지면 이곳에 안내합니다.

> **EN** — These materials are still being produced. How external contributions (issues, pull requests) will be accepted is not yet decided; it will be announced here.

## 라이선스
**License**

> **EN** — This repository is [MIT](LICENSE), Copyright (c) 2026 Sean Shin. The ecosystem software is intended to be MIT as well, **but third-party servers run as separate services, AI model weights (each with its own terms) and government-distributed code master data follow their own conditions** — see [THIRD_PARTY.md](THIRD_PARTY.md). **The source repositories are not yet relabeled to MIT**; each repository's current declaration is carried verbatim in the [release manifest](RELEASES/draft/manifest.md), so check the label in the repository you obtain. And see the [medical disclaimer](DISCLAIMER.md): **this software is not an approved medical device**; AI output is supportive information, and clinical judgment and responsibility rest with the clinicians and the adopting institution.

- 이 저장소: [MIT](LICENSE) · Copyright (c) 2026 Sean Shin (신현묵)
- 생태계 소프트웨어도 MIT 로 제공합니다. 다만 별도 서비스로 쓰는 제3자 서버, **AI 모델 가중치**(모델마다 별도 약관), 공공기관이 배포하는 코드 마스터 데이터는 **각자의 조건**을 따릅니다. 목록은 [THIRD_PARTY.md](THIRD_PARTY.md)에 정리합니다.
- 각 소스 저장소의 라이선스 표기는 **아직 MIT 로 정리되지 않았습니다**. 저장소마다 현재 적힌 표기를 [통합 릴리즈 매니페스트](RELEASES/draft/manifest.md)에 그대로 싣고, 정리되는 대로 갱신합니다. 소스를 받을 때는 그 저장소에 적힌 표기를 확인하세요.
- [의료 면책 고지](DISCLAIMER.md) — 이 소프트웨어는 인허가받은 의료기기가 아닙니다. AI 산출물은 보조 정보이며, 임상 판단과 책임은 의료진과 구축 기관에 있습니다.
