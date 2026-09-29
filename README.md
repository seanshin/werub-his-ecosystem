# WeRU.B HIS Ecosystem

**AI 기반 병원정보시스템(HIS)을 오픈 형태로 — 적은 자원으로도 세울 수 있게**
**An open ecosystem for AI-assisted hospital information systems — buildable with modest resources**

> 이 저장소는 **소개·구축 자료 저장소**입니다. 소스 코드는 담지 않습니다. 각 시스템의 소스는 아래 [시스템 13](#시스템-13)의 링크로 갑니다(주소는 확정됐고, 저장소는 각 프로젝트의 정리가 끝나는 대로 하나씩 공개됩니다).
> 현재 상태: **자료 제작 중** — 진행 계획은 [ROADMAP.md](ROADMAP.md)를 보세요.
> **EN** — This is a **documentation repository**: it introduces the ecosystem and explains how to build it. It contains **no source code**; links to each system's source are listed under [시스템 13 / The 13 systems](#시스템-13) — the addresses are final, and each repository opens as its project finishes clean-up. Status: **work in progress** — see [ROADMAP.md](ROADMAP.md).
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
| **소스는** | 시스템마다 **저장소가 따로** 있습니다(11곳). 주소 · 기준 커밋 · 받은 뒤 처음 여는 파일은 → **[소스 받기](SOURCES.md)**. 🟢 **모두 공개할 예정**이고 정리가 끝나는 대로 하나씩 열립니다 — 아직 열리지 않은 주소가 있지만 **주소는 바뀌지 않습니다** |

**처음이라면 이 넷만 보세요** — [한 문장](overview/01-one-sentence.md) · [지금 상태](overview/09-status-and-preparation.md) · [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약) · [화면 293장](screens/)

**"왜 이렇게 까다로운가"가 궁금하면** → [설계 기준은 어떻게 생겼나](DESIGN-HISTORY.md) — 릴리즈 108개가 남긴 것 · [형제 시스템은 어떻게 자랐나](DESIGN-HISTORY-SYSTEMS.md) — 나머지 12개의 기록 666건

### 목차

| 알고 싶은 것 | 절 |
|---|---|
| 왜 만들었고 무엇을 믿나 | [이 프로젝트가 바라는 것](#이-프로젝트가-바라는-것) · [설계 취지](#설계-취지) |
| 무엇으로 이루어졌나 | [시스템 13](#시스템-13) · [기준 버전 · 상태 · 규모 · 기술](#시스템마다--기준-버전--구현-상태--규모--기술) · [시스템마다 무엇을 하나](#시스템마다-무엇을-하나) |
| 시스템이 어떻게 이어지나 | [시스템을 꿰는 흐름](#시스템을-꿰는-흐름) — 환자 여정 · 신원 · 신뢰 · 표준 |
| 무엇을 할 수 있나 | [업무로 보면](#업무로-보면--무엇을-할-수-있나) · [주요 기능 41편](#주요-기능--한-편씩-자세히) |
| AI 는 어디까지 | [AI 는 GPU 한 장으로](#ai-는-소비자용-gpu-한-장으로--rtx-508016gb) · [AI 계층 — 어디서 무엇을 하고 어떻게 켜나](#ai-계층--어디서-무엇을-하고-어떻게-켜나) |
| 어떻게 세우나 | [구축 단계](#구축은-이렇게-진행됩니다) · [구축을 관리하는 화면](#구축을-관리하는-화면--가이드는-이-화면들을-따라갑니다) · [따라가 본 결과](#새-설치본으로-따라가-본-결과--요약) |
| 무엇을 받고, 무엇이 아직 없나 | [지금 받을 수 있는 것](#지금-받을-수-있는-것) · [규모](#규모--지금-말할-수-있는-것) · [지금 알고 시작해야 할 것](#지금-알고-시작해야-할-것) |

---

## 이 프로젝트가 바라는 것
**What this project aims for**

### 의료정보시스템이 비용 때문에 멈추지 않기를
**So that health information systems are not stopped by cost**

> **EN** — Running a hospital takes far more than a chart: registration, orders, labs, imaging, pharmacy, billing, claims, accounting, HR and staff education all have to run on connected systems. Acquiring them is still a large, expensive project — license fees, dedicated hardware and vendor lock-in leave **many institutions worldwide running on paper and spreadsheets**. This ecosystem exists to lower that threshold: the ecosystem's own code is offered under the [MIT license](LICENSE); it covers the whole set of 13 interlocking systems rather than a single HIS; and it is meant to be within reach of small and mid-sized hospitals, clinics, public health agencies and **health facilities in low-resource countries** — institutions that will build and run it themselves.

병원 하나가 제대로 돌아가려면 진료 기록만으로는 부족합니다. 접수·처방·검사·영상·약제·수납·청구·회계·인사·교육까지, 병원의 모든 일이 정보시스템 위에서 이어져야 합니다. 그런데 이 시스템을 갖추는 일은 여전히 크고 비싼 사업입니다. 라이선스 비용, 전용 하드웨어, 특정 업체에 묶이는 구조 때문에 **정보시스템 없이 종이와 엑셀로 버티는 의료기관**이 세계 곳곳에 많습니다.

이 생태계는 그 문턱을 낮추려고 만들었습니다.

- **오픈 형태로 제공합니다.** 생태계의 자체 코드는 [MIT 라이선스](LICENSE)로 제공합니다. 쓰고, 고치고, 다시 배포할 수 있습니다. **소스 저장소도 모두 공개할 예정**이고, 프로젝트마다 정리가 끝나는 대로 하나씩 열립니다 — 주소는 이미 정해져 있고 바뀌지 않습니다([지금 받을 수 있는 것](#지금-받을-수-있는-것) · [소스 받기](SOURCES.md)).
- **병원 하나를 돌리는 데 필요한 시스템을 한 벌로 갖춥니다.** HIS 한 개가 아니라, 검사·영상·전자서명·경영·AI·협업·교육까지 13개 시스템이 서로 맞물린 생태계입니다.
- **많은 곳에서 폭넓게 쓰이기를 바랍니다.** 큰 병원만이 아니라 중소 병원, 의원급 기관, 공공 보건기관, 그리고 **의료 인프라가 부족한 개발도상국의 의료기관**도 자기 손으로 세우고 운영할 수 있는 것이 목표입니다.

### 최소한의 사양과 구현으로 쓸 수 있게
**Designed to run on minimal hardware**

> **EN** — "AI-based HIS" usually calls to mind a server room and datacenter GPUs. This ecosystem was designed the other way around: it is assembled from **freely available open components** (PostgreSQL, Redis, Node.js, Python, Orthanc, Ollama — note that each carries its own license terms, some of which change by version; see [THIRD_PARTY.md](THIRD_PARTY.md)); systems are **independent and attached as needed** over standard protocols (FHIR, DICOM, HL7 v2), so an institution can start with the HIS alone and connect an existing PACS rather than replacing it; **every AI feature has a switch** and the HIS is designed to work without the AI server, showing "fallback" or "cannot compute" instead of pretending a value exists.
> **A measured record, not a recommended spec** — eight systems (HIS, PACS, sign, LIS, twin, cerno, edu, Jitsi) ran together on **one 8-core / 16GB virtual server** (operations record of 2026-08-25, about 10GB memory in use, no swap headroom). Treat it as close to a *lower bound that actually ran*, not as a sizing recommendation. The first fresh-install walkthrough (2026-09-13 ~ 09-16) ran on a development PC, so it cannot ground a recommended spec; per-system recommendations wait for a reference machine (x86 + GPU) — see [Sizing](#규모--지금-말할-수-있는-것).

"AI 기반 HIS"라고 하면 대형 서버실과 데이터센터용 GPU 를 먼저 떠올립니다. 이 생태계는 반대 방향으로 설계했습니다.

| 설계 선택 | 무엇을 줄이나 |
|---|---|
| **무료로 받을 수 있는 공개 구성요소로 짭니다** — PostgreSQL · Redis · Node.js(NestJS·Next.js) · Python(FastAPI·Flask) · Orthanc · Ollama | 상용 데이터베이스·미들웨어를 사지 않아도 됩니다. 다만 구성요소마다 라이선스 조건이 다르고, 판본에 따라 조건이 바뀌는 것도 있습니다(예: Redis 는 7.4 부터 약관이 달라집니다 · AGPL·GPL 계열 서버 포함). 목록과 원문은 [THIRD_PARTY.md](THIRD_PARTY.md)에 있습니다 |
| **필요한 것부터 붙입니다** — 시스템마다 독립적이고, 표준 프로토콜(FHIR · DICOM · HL7 v2)로 연결합니다 | 처음부터 13개를 다 세울 필요가 없습니다. HIS 하나로 시작해 검사·영상·경영을 차례로 붙이고, 이미 쓰는 시스템(예: 기존 PACS)이 있으면 그대로 연결합니다 |
| **AI 는 기능마다 스위치가 있고, 기관이 결정해서 켭니다** | AI 서버 없이도 HIS 는 동작하도록 설계했습니다. AI 가 없거나 멈추면 화면이 그 칸을 "폴백" 또는 "산출 불가"로 표시하고, 정상인 척하지 않습니다. 다만 **코드 기본값은 기능마다 다릅니다**. 환자 브리핑 야간 배치 · 데이터 품질 AI 같은 기능은 기본 꺼짐이지만, AI 기능 전체 스위치와 PACS 영상 자동 선별은 기본 켜짐입니다(2026-09-11 코드 확인). 그래서 구축 가이드는 **설치 직후 AI 기능을 끄고, 기관 결정에 따라 하나씩 켜는 순서**로 안내합니다 |
| **서버 한 대에서 시작할 수 있습니다** | 아래 실측 기록을 보세요 |

**실제로 돌아간 기록** — HIS · PACS · sign · LIS · twin · cerno · edu · Jitsi 8개 시스템이 **8코어 · 16GB 메모리 가상 서버 한 대**에 함께 올라가 있었습니다(2026-08-25 운영 기록 · 메모리 약 10GB 사용). 다만 이 구성은 여유가 넉넉하지 않았습니다(스왑 여유 없음). 그래서 이 수치는 **"권장 사양"이 아니라 "실제로 돌아간 하한에 가까운 기록"** 입니다. 새 설치본 따라가기(2026-09-13~16)는 개발 PC 에서 했기 때문에 권장 사양의 근거가 되지 못합니다. 시스템별 권장 사양은 **기준 장비(x86 · GPU)에서 재서** 싣습니다 — 지금 말할 수 있는 값은 [규모](#규모--지금-말할-수-있는-것)에 있습니다.

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

- **코드 마스터**(약품 · 진단 · 수가 · 검사 코드)는 나라마다 다르고, 각 나라 공공기관이 배포 조건을 정합니다. 기관이 직접 받아 반입합니다. 국가 축은 현재 한국 · UAE 두 곳이 있지만, 🔴 **코드 마스터 반입 경로에는 국가 구분이 없습니다** — 기준 커밋의 반입은 한국 기준 데이터로 고정돼 있고, 국가 축은 보유 · 파기 기간과 표기 쪽에만 있습니다([S1](build-guide/S1-core-his.md)). 다른 나라에 세우려면 코드 마스터 · 청구 규칙 · 언어 팩과 **그 반입 경로**를 새로 붙여야 합니다.
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
| 🆕 **진료하는 사람**(의사 · 간호 · 검사 · 영상 · 약제) | 내 일에서 무엇이 달라지나? AI 가 내 이름으로 무엇을 하나? 막히면 왜 막히나? | **[진료하는 사람을 위한 안내](clinicians/)** → [업무별 기능 지도](functions/) → [화면 293장](screens/) |
| 병원장·CIO | 왜 이 구조인가? 무엇을 얻고 무엇을 감수하나? 구축 규모와 비용은? | [발표 덱](deck/) → [개요서 2 · 4 · 9장](overview/) → [규모 — 지금 말할 수 있는 것](#규모--지금-말할-수-있는-것) |
| 전산·인프라팀 | 무엇을 어디에 설치하나? 서버·GPU·DB 요구사항은? | [지금 받을 수 있는 것](#지금-받을-수-있는-것) → [구축 가이드 S0](build-guide/S0-prepare.md) → [규모](#규모--지금-말할-수-있는-것) → [시스템 구성서](systems/) |
| 의료정보·임상 리더 | 진료 흐름이 시스템 사이를 어떻게 지나가나? 병원 규정은 어디서 설정하나? | [데모 시나리오](scenarios/) → [화면으로 보는 생태계](screens/) |
| AI·거버넌스 위원회·법무 | AI 가 어디서 무엇을 하나? 어디까지 켜도 되나? 누가 승인하고 무엇이 남나? | [개요서 7장](overview/07-ai.md) → [S6 AI 계층](build-guide/S6-ai.md) → [AI 감독 화면](screens/his.md#ai-감독-관제--분모가-없으면-비율을-내지-않는다) |
| 연동 개발자·파트너 | 시스템끼리 무슨 프로토콜·인증으로 붙나? 무엇이 검증됐나? | [연결 카드](integration/cards/)(붙이려는 쌍 한 장) → [공통 규약](integration/contracts.md)(오류 봉투 · 서명 · 멱등 · 재시도) → [연동 계약 지도](integration/) → [연결 상태 표](RELEASES/2026.09/compatibility.md) |
| 보건 당국·국제 협력 기관 | 자원이 적은 지역에 세울 수 있나? 무엇을 현지에서 준비해야 하나? | [개발도상국에서도](#개발도상국에서도-세울-수-있는-수준으로) → [제공 조건](overview/10-terms.md) |

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
| 코어 | **Hospital RUN (HIS)** | 외래·입원·수술·응급·검사·약제·검진·경영지원 통합 HIS · 생태계의 신원 허브 | [seanshin/werubyHIS](https://github.com/seanshin/werubyHIS) |
| 환자 접점 | 공개 홈페이지 · 환자 앱 | 예약·결과 열람·동의·문진 | [seanshin/werubyHIS](https://github.com/seanshin/werubyHIS) (HIS 와 같은 저장소) |
| 임상 부서 | **LIS** | 진단검사·미생물·병리·수혈·유전체 검사정보시스템 | [seanshin/lis](https://github.com/seanshin/lis) |
| 임상 부서 | **PACS** | 웹 PACS — 영상 서버·뷰어·판독 워크플로·AI 연동 | [seanshin/openpacs](https://github.com/seanshin/openpacs) |
| 신뢰 | **sign** | 자체 PKI·RFC 3161 타임스탬프·PAdES-LTA 전자서명 | [seanshin/sign](https://github.com/seanshin/sign) |
| 경영 | **ERP** | 재무회계·원가·인사급여·자재·보험청구·세무 | [seanshin/hospital-erp](https://github.com/seanshin/hospital-erp) |
| AI | **AI Server** | 온프레미스 GPU 통합 AI — 의료 분류·요약·DUR·RAG·음성 인식 보조 | [seanshin/WeRUBLLMManager](https://github.com/seanshin/WeRUBLLMManager) |
| AI | **cerno** | 의료진별 개인화 임상 AI(근거가 없으면 생성하지 않는 RAG) | [seanshin/cerno](https://github.com/seanshin/cerno) |
| AI | **twin** | 디지털 트윈 — 위험 점수 카드·SBAR·시뮬레이션 | [seanshin/medical-digital-twin](https://github.com/seanshin/medical-digital-twin) |
| 협업·교육 | **Clinic** | 병원 그룹웨어 — 인수인계·근무표·알림·결재 | [weruby-co-kr/WeRUB](https://github.com/weruby-co-kr/WeRUB) |
| 협업·교육 | **edu** | 직원 이러닝·법정교육·전자 이수증 | [seanshin/edu](https://github.com/seanshin/edu) |
| 협업·교육 | **Jitsi** | 원격진료 화상(자체 호스팅) | [seanshin/hospital-jitsi](https://github.com/seanshin/hospital-jitsi) |

> **EN** — A core HIS at the center (also the ecosystem's **identity hub**), with patient-facing, clinical-department, trust, management, AI, and collaboration/education layers around it. The Source column gives each repository's final address. **All of them are to be made public**, one at a time as each project finishes its clean-up — until then a link will not open, and the address will not change. See [Getting the source](SOURCES.md).

🟢 **소스 칸의 주소는 확정된 것입니다.** 저장소는 **모두 공개할 예정**이고 각 프로젝트의 정리가 끝나는 대로 하나씩 열립니다 — 아직 열리지 않은 링크는 눌러도 열리지 않지만 **주소는 바뀌지 않습니다**. 받는 법과 기준 커밋은 [소스 받기](SOURCES.md)에 있습니다.

이 자료의 모든 수치에는 **값 · 센 방법 · 계측일**을 함께 적습니다.

### 시스템마다 — 기준 버전 · 구현 상태 · 규모 · 기술
**Per system: pinned version, stage, size and stack**

> **EN** — For each system: the version at the pinned base commit of release `2026.09`, its implementation stage (not yet confirmed by each system's owner), a few size counts and the main stack. The counts are **handlers, data models and pages found in the code by fixed rules** — they measure the size of the code, not the number of features and not whether anything runs. Each counting rule sits next to its value in [`data/scale-snapshot.json`](data/scale-snapshot.json) (measured 2026-09-13). The authoritative table is the [release manifest](RELEASES/2026.09/manifest.md).

버전 · 구현 상태는 [통합 릴리즈 `2026.09` 매니페스트](RELEASES/2026.09/manifest.md)의 기준 커밋 값이고, 규모는 같은 커밋의 코드를 정해진 규칙으로 센 값입니다(계측 2026-09-13 · 센 규칙은 값마다 [`data/scale-snapshot.json`](data/scale-snapshot.json)에 적혀 있습니다). 🔴 **규모는 코드의 크기입니다.** 기능의 수도, 동작한다는 증거도 아닙니다. 구현 상태는 **시스템 담당의 확인 전**입니다.

| 시스템 | 기준 버전 | 구현 상태 | 규모(기준 커밋에서 셈) | 기술 |
|---|---|---|---|---|
| **HIS** | `v4.18.0` | 통합 — 리허설 모드(가상 병원 데이터) | 데이터 모델 562 · API 핸들러 3,251 · 웹 화면 450 · 메뉴 항목 266 | NestJS · Prisma · Next.js · PostgreSQL 16 · Redis 7 |
| 공개 홈페이지 | `v4.18.0`(HIS 와 함께) | 운영 — 공개 사이트로 쓰이는 중 | 화면 50 | Next.js |
| 환자 앱 | `v4.18.0`(HIS 와 함께) | 개발 — 스토어 미배포 | 화면 32 | Expo · React Native |
| **sign** | `1.30.1` | 통합 | 데이터 모델 14 · API 162(OpenAPI 명세) · 화면 38 | NestJS · Prisma · Next.js |
| **LIS** | `1.56.18` | 파일럿 | 데이터 모델 84 · API 핸들러 356 · 화면 41 · E2E 시험 470 | NestJS · Prisma · Next.js |
| **ERP** | `1.287.3` | 파일럿 — 문서마다 표기가 엇갈려 재확인 대상 | 데이터 모델 219 · API 핸들러 717 · 화면 113 · 시험 1,736 | FastAPI · Next.js · PostgreSQL 15 |
| **PACS** | `v13.48` | 통합 | API 핸들러 475 + 웹소켓 3 · 관리 화면 47 · 시험 166 · E2E 132 | Orthanc · OHIF · FastAPI · Celery · Next.js |
| **AI Server** | `2.125.41` | 통합 — 의료 기능 기준(비의료 기능은 범위 밖) | API 핸들러 654 · 시험 1,930 | Flask · Gunicorn · Ollama |
| **twin** | `1.20.88` | 통합 | API 핸들러 107 · 화면 15 · 시험 881 | FastAPI · Next.js |
| **cerno** | `0.1.0` | 파일럿 — 섀도우 · 비임상 | API 핸들러 11 · 화면 3 · 시험 255 | FastAPI · Next.js · Redis |
| **edu** | `2.7.0` | 확인 필요 — 운영 여부 재확인 전 | 데이터 모델 40 · API 핸들러 167 · 화면 41 | NestJS · Prisma · Next.js |
| **Clinic** | `1.4.0`(병원 서비스) | 통합 — 모노레포 안의 병원 서비스만 | 화면 16 · HIS 연동 API 44 | Next.js |
| **Jitsi** | `1.0.0` | 중단 — 현재 설치본이 동작하지 않음 | 컨테이너 9 | Jitsi Meet 구성요소 · 회의 관리 API |

- **버전 표기가 어긋난 곳이 있습니다** — 태그 · 변경 기록 · 화면에 보이는 번호가 정본과 다른 저장소가 있고(PACS · AI Server · twin · cerno · Jitsi 는 태그가 정본과 다름), 그 목록은 [매니페스트](RELEASES/2026.09/manifest.md)에 그대로 실었습니다. 이 자료는 **정본 번호 하나**로만 말합니다.
- **기준 커밋은 고정돼 있습니다** — 저장소에 새 커밋이 쌓여도 이 표는 기준 커밋을 옮기기 전까지 바뀌지 않습니다. 받을 커밋은 [소스 받기](SOURCES.md)에 있습니다.

### 시스템마다 무엇을 하나
**What each system does**

> **EN** — One paragraph per system, condensed from section 4 ("core features") of each [system brief](systems/). Listing a feature here means the code has it at the base commit; it does not mean it has been verified in operation — see the [connection status table](RELEASES/2026.09/compatibility.md) and the [follow-along results](build-guide/follow-along-2026-09.md) for that.

각 [시스템 구성서](systems/) §4 「핵심 기능」을 줄인 것입니다. 🔴 **여기 적혔다는 것은 기준 커밋의 코드에 있다는 뜻이지, 운영에서 확인됐다는 뜻이 아닙니다.** 실제로 불러 확인한 것은 [연결 상태 표](RELEASES/2026.09/compatibility.md)와 [따라가 본 결과](build-guide/follow-along-2026-09.md)에 있습니다.

**HIS — 병원 업무의 정본이자 생태계의 신원 허브** · [구성서](systems/his.md) · [메뉴 266개 전체](systems/his-domains.md)
- 웹 메뉴는 **도메인 8 · 메뉴 묶음 26 · 메뉴 항목 266** — 진료(45) · 진료지원(62) · 환자·고객(17) · 질·안전(22) · 운영(19) · 지능형(7) · 시스템 관리(87) · 개인(7).
- **진료** — 외래 접수 · 대기 · 예약 · 처방 입력(CPOE) · 간호 워크스테이션 · 수술 · 회복실 · 응급실 · 중환자실 · Code Blue · 진료과별 전문 화면 · 투석 · 항암 · 방사선종양 · 재활 · 입원 · 병상 · 회진 · 퇴원 · 협진.
- **진료지원** — 약국 · 약사 임상활동 · 검사실 · 영상실 · 병리 · 혈액은행 · 건강검진센터(접수부터 결과서 · 추적까지) · 의무기록 검색 · 사본 · 제증명.
- **질 · 안전 · 운영** — 환자안전 사고 보고 · 감염관리 · 직원 노출 사고 · 질 지표 · 임상 연구(IRB) · 수납 · 청구서 · 인사 · 재고 · 경영 대시보드 · 전원.
- **메뉴 밖에서 서버가 하는 일** — 구축 관리(개원 단계 · Go-Live 관제 · 결정 등록부) · 안전 장치(운영 모드 · 안전 게이트 · 대외 발신 관제 · 값의 출처를 보여 주는 설정) · **상시 감시자**(정합성 · 파이프 생존 · 계약 어긋남 · 흐름 완결성 — 판정 못 하면 「관측 불가」) · 감사(비상 열람 검토 · 오더 서명 로그) · FHIR R4 외부 표면 · SMART on FHIR 앱 등록 · 국가 축과 언어 팩.

**공개 홈페이지** · [구성서](systems/homepage.md) — 병원 · 진료과 · 의료진 · 진료 일정 · 비급여 안내 · 건강검진 프로그램 · **AI 예약 도우미**(증상을 대화로 받아 진료과 **후보를 제안**하고 예약까지) · 이용 안내 · 국제 진료 · 협력 기관 신청. 콘텐츠 편집과 발행은 HIS 관리 화면에서 하고, 반영 여부는 사이트에 실린 빌드 스탬프로 판정합니다.

**환자 앱** · [구성서](systems/patient-app.md) — 로그인(기기 생체인증 PIN) · 보호자 위임 · 예약 · 진료 기록 · 입원 여정 · 검사 결과 · 영상 판독 · 검진 결과 비교 · 복약 · 만성질환 자가측정 · 동의서 전자서명 · 문진 · 제증명 신청 · 수납 · 담당의 메시지 · **내 기록을 누가 언제 열었는지**(비상 열람 사유 포함). 조회 실패를 「없음 · 0원 · 이상 없음」으로 바꿔 보여 주지 않습니다.

**LIS — 검사 다섯 분야** · [구성서](systems/lis.md)
- **진단검사** — 처방 수신 → 접수 · 라벨 → 검체(거부 · 재채취) → 결과 → 자동 검증 · 델타 체크 → 2차 검증 → **위험치 폐루프**(통보 · 상향 · 복창) → HIS 회신 → 청구 캡처. 참고치가 없거나 단위가 맞지 않으면 자동 확정을 막고, **입력자와 검증자가 같으면 검증을 막습니다.**
- **미생물**(감수성 전문가 규칙 · 다제내성균 · 법정감염병 신고 기록) · **병리**(그로싱 → 슬라이드 → 2단계 사인아웃 → 개정 보고 · PACS 슬라이드 영상) · **수혈**(ABO 부적합을 막는 독립 판정 · 출고 전 동의 확인 · 시행 2인 확인) · **유전체 · NGS**(ACMG 큐레이션 · **이차 소견 동의 게이트**).
- 정도관리(Westgard · 외부 정도관리) · **개시 전환 센터** · 해시체인 감사(DB 트리거로 수정 차단) · 파일럿 데이터 정리(실데이터가 감지되면 거부 · 요청과 승인을 다른 관리자가).

**PACS — 영상 저장 · 판독** · [구성서](systems/pacs.md)
- DICOM(DIMSE) · DICOMweb(토큰 게이트 뒤) · 모달리티 워크리스트 · MPPS · HL7 v2 오더 수신 · 외부 PACS 조회 · 환자 업로드 포털 · 키오스크(CD · USB) · 비표준 DICOM 정규화(원본 백업 · 되돌리기).
- **판독 워크플로**(배정 · SLA 상향 · 예비판독 → 전문의 · 위급 소견 알림) · **웹 뷰어**(MPR · 3D · 이전 검사 비교 · 병리 슬라이드 현미경 모드).
- **AI 보조**(판독문 **초안** · 비교 초안 · 자동 선별 알림 · 결과를 DICOM SR · SEG 로 저장 · 모델별 성능 추세와 판독의 수용률) · 비상 열람 · 추가만 되는 감사 · 비식별화 · 판독문 · 동의서는 sign 으로 서명(PACS 는 키를 갖지 않음) · 환자 결과 내보내기.

**sign — 서명 · 인증서 · 타임스탬프** · [구성서](systems/sign.md) — 2단 CA 가 서명자별 X.509 인증서 발급 · CAdES · **PAdES-LTA** 서명 · RFC 3161 타임스탬프 · **서명 시점 기준** 폐기 확인 · 모든 행위를 추가만 되는 해시체인에 쌓고 타임스탬프로 봉인 · 서명 채널 넷(시스템 제출 · 1회용 링크 · 의료진 SSO · 대리) · 웹훅(멱등 · HMAC · 재시도) · 다른 시스템의 행위(처방 · 판독 승인)를 봉인하는 행위 인증 로그. 키는 기본 소프트웨어 수탁이고 HSM 어댑터 자리가 있습니다.

**ERP — 병원 경영** · [구성서](systems/erp.md) — 모든 거래가 **전표 한 창구**로 들어오는 재무회계(멱등 · 결산 잠금) · 활동기준 원가와 진료과별 손익 · 인사 · 급여 · 면허 만료 경보 · 구매 → 발주 → 입고 · 선입선출 재고 · **마약류 수불부 해시 체인** · 원무 수납 · 보험청구 산정 · 삭감 · 이의신청 기한 · 유효 기간을 가진 수가 마스터 · HIS 약품 코드 ↔ 보험 코드 매칭 · 세무 · 전자결재 · **정기업무 레지스트리**(업무마다 수동 / 자동 / AI 보조).

**AI Server — 기관 안의 AI 연산** · [구성서](systems/ai-server.md) — 공공 DUR 기준 점검 **보조** · 약가 · 코드 조회 · 진료 기록 요약 · 설명문 · 분류 보조 · 번역 · 영상 소견 **초안** · 근거 문서 질의(권위 위계 · 근거가 없으면 `has_evidence: false`) · 음성 인식(모두 서버 안에서) · 역할 → 모델 라우팅 · 16GB GPU 나눠 쓰기 · 서킷 브레이커 · API 키 교체 · 약물 데이터 정제의 **스테이징 → 사람 승인** · 자기 품질 계측.

**twin — 위험 예측 · 시뮬레이션** · [구성서](systems/twin.md) — 병상 · 중환자실 · 응급실 · 수술실 **운영 트윈**과 What-if · 공표된 임상 점수를 카드로(계산식 · 변수 · 원 논문 인용을 펼쳐 봄 · **빠진 입력은 0 으로 채우지 않고 「입력 필요」**) · SBAR 는 규칙 기반(LLM 아님) · FHIR 로 HIS 에 write-back(규격 검증 뒤) · CDS Hooks 카드.

**cerno — 의료진별 근거 질의** · [구성서](systems/cerno.md) — 차트에서 SMART on FHIR 로 열려 그 환자 맥락이 붙음 · 서고 세 층(개인 · 그룹 · 공용) · **근거 게이트를 통과할 때만** 답변 초안 · 근거가 부족하면 「근거로 확인되지 않습니다」 · 고위험 표지와 DUR 결과는 **근거 유무와 따로** 표시 · 개인화는 모델 재학습이 아니라 프롬프트 레지스트리 · 서고 가중으로.

**edu — 직원 교육 · 법정교육** · [구성서](systems/edu.md) — 법정의무교육 마스터(근거 법령 · 주기 · 시수) · 직종별 필수교육 매일 자동 배정 · 만료 시 재이수 · SCORM 1.2 · xAPI 수신 · 집체교육 QR 출석 · 실제 학습 시간만 누적 · **sign 이 서명한 전자 이수증** · 미이수자 상급자 요약 알림 · 해시체인 감사 · 단독 배포와 멀티테넌트(행 수준 보안 두 겹).

**Clinic — 병원 그룹웨어** · [구성서](systems/clinic.md) — 역할별 대시보드 · 층별 병동 현황과 알림 · 근무 · 당직 · 교대 · **인수인계**(인수자 「수신 확인」) · 투약 · 수술판 상태 · 긴급 알림 · HIS 가 부르는 연동 API(직원 동기화 · SSO · 근태 · 휴가 · 결재 요청 등). HIS 에서 자료를 못 받은 화면은 **「데모」 배지**를 붙입니다.

**Jitsi — 원격진료 화상** · [구성서](systems/jitsi.md) — 🔴 **기준 커밋의 코드와 기록에 적힌 기능이고, 현재 설치본은 동작하지 않습니다.** HIS 발급 토큰으로 방 입장 · 회의 관리 API(권한 세 단계) · 입퇴장 웹훅 · 서버 녹화와 보존 기간 만료 · AI 회의록 **초안**과 자막(선택) · 모니터링.

---

## 시스템을 꿰는 흐름
**The threads that run across systems**

> **EN** — The system sections cut the ecosystem vertically; these four threads cut it the other way. **One patient's journey** runs through twelve segments from booking to telehealth, each with its current status. **One staff member's identity** is issued by the HIS and checked by the other systems in three ways (public key for five systems, shared secret for two, API key for one). **Trust** — who signed what, when, and that it has not changed — is produced in one place, sign. **Standards** (FHIR R4, SMART on FHIR, DICOM/DICOMweb, HL7 v2) carry the connections where possible; many links are still plain HTTPS REST and webhooks. Details: [overview chapters 4–5](overview/05-patient-journey.md).

시스템 절은 생태계를 **시스템별로** 자릅니다. 아래 네 흐름은 **가로질러** 자릅니다. 자세한 것은 [개요서 5장](overview/05-patient-journey.md) · [6장](overview/06-identity-trust-standards.md)과 도식([환자 여정](diagrams/patient-journey.md) · [신원 허브](diagrams/identity-hub.md) · [표준 층](diagrams/standards.md))에 있습니다.

### 환자 한 명의 여정

**예약 → 접수 → 진료(AI 보조) → 검사 → 병리 영상 → 영상 → 판독 서명 → 동의서 → 수납 · 청구 → 회계 → 결과 열람 → 원격 상담**

| 구간 | 경계 | 무엇이 오가나 | 상태 |
|---|---|---|---|
| 예약 | 홈페이지 · 환자 앱 → HIS | AI 예약 상담 · 예약 · 포털 로그인 | `구현·미검증` |
| 진료(AI 보조) | HIS → AI Server | 기록 초안 · 분류 보조 · 음성 인식. **의료진이 승인해야 기록이 됩니다** | `구현·미검증` |
| 검사 오더 · 결과 · 취소 | HIS ⇄ LIS | FHIR R4 오더를 LIS 가 가져가고, 확정 결과를 돌려보냄 | `검증됨`(2026-09-14~15) |
| 병리 영상 | LIS → PACS | 슬라이드 스캔 워크리스트(HL7 v2) · 뷰어 링크 | `검증됨`(2026-09-15) |
| 영상 오더 · 촬영 · 판독 반영 | HIS ⇄ PACS · PACS → 촬영 장비 | 워크리스트 자동 등록 · MWL · 판독 결과 반영 | `구현·미검증` — 따라가기에서 **HIS 화면 경로는 끝까지 가지 못했습니다** |
| 판독 서명 | PACS → sign | 판독의 본인 서명 | `검증됨`(2026-09-15) |
| 동의서 | HIS ⇄ sign | 서명 요청 · 완료 통지 | 완료 통지 `검증됨`(2026-09-14) · HIS 화면 경로의 직원 서명은 `구현·미검증` |
| 수납 · 청구 | HIS ⇄ ERP | 진료비 계산서 · 청구 라인 · 미청구분 | `검증됨`(2026-09-15) |
| 결과 열람 | 환자 앱 → HIS · HIS → PACS | 결과 · 처방 · 수납 · 본인 영상 | `구현·미검증` |
| 원격 상담 | 포털 · 환자 앱 → Jitsi | 화상 입장 | `중단` |

접수(HIS 안) · 회계(ERP 안)는 시스템 경계를 넘지 않습니다. 구간별 근거는 [개요서 5장](overview/05-patient-journey.md#구간별-상태).

### 직원 한 명의 신원 — HIS 한 곳에서

**HIS 가 직원 로그인 토큰을 발급하고**, 형제 시스템은 그 토큰을 검증해 같은 사람으로 받아들입니다.

| 방식 | 시스템 | 기관이 알아 둘 것 |
|---|---|---|
| 공개키로 검증 | sign · PACS · edu · twin · cerno | 비밀값을 나눠 가질 필요가 없습니다. twin · cerno 는 차트에서 앱을 여는 SMART on FHIR 흐름 안에서 받습니다 |
| 공유 비밀키 | ERP · Jitsi | 양쪽에 같은 값을 두고 **함께 교체**합니다 — 키 관리가 따로 필요합니다 |
| API 키 | Clinic | Clinic 이 범위를 정한 키를 발급하고 HIS 가 그 키로 부릅니다 |

입사 · 변경 · 퇴직은 HIS 에서 형제 시스템으로 전해집니다. 반대로 **HIS 가 멈추면 HIS 신원에 기대는 형제 시스템의 로그인도 영향을 받습니다**(edu 는 로그인이 HIS SSO 뿐입니다).

### 신뢰의 사슬 — sign 한 곳에서

| 질문 | 장치 |
|---|---|
| 누가 | 자체 PKI — 서명자별 X.509 인증서 |
| 무엇에 | 전자서명 — PDF 는 PAdES-LTA(인증서 만료 뒤에도 검증 가능) |
| 언제 | RFC 3161 타임스탬프 — 공인 기관을 계약하면 주소 설정으로 바꿈 |
| 바뀌지 않았다 | 추가만 되는 감사 해시체인 — 체인 머리를 타임스탬프로 봉인 |

동의서(HIS) · 판독(PACS) · 이수증(edu) · 계약(ERP)이 **모두 sign 을 부릅니다.** 그래서 서명을 쓰는 단계보다 sign 을 먼저 세우는 편이 순서가 꼬이지 않습니다. 🔴 전자서명의 법적 효력 판단은 구축 기관과 법무가 합니다.

### 표준의 층

| 층 | 표준 | 대표 연결 | 상태 |
|---|---|---|---|
| 임상 자원 | FHIR R4 | HIS ⇄ LIS 검사 오더 · 결과 · 취소 | `검증됨`(2026-09-14~15) |
| 임상 앱 | SMART on FHIR · CDS Hooks | 차트에서 twin · cerno 열기 · 위험 카드 | `구현·미검증` |
| 영상 | DICOM(DIMSE · MWL · MPPS) | PACS ⇄ 촬영 장비 · 외부 PACS | `구현·미검증` |
| 영상 | DICOMweb | LIS → PACS 병리 영상 확인 · 뷰어 링크 | `검증됨`(2026-09-15) |
| 메시지 | HL7 v2(MLLP) | LIS → PACS 병리 워크리스트 | `검증됨`(2026-09-15) |
| 메시지 · 장비 | HL7 v2 대체 경로 · ASTM E1394 | 검사 결과 · 처방 대체 경로 · 분석기 직결 | `미구현` |

모든 연결이 표준 프로파일은 아닙니다. 연결 표의 상당수는 **전용 HTTPS REST(JSON) · 웹훅**이고, 그 공통 약속(오류 봉투 · 서명 대상 · 멱등 · 재시도)은 [공통 규약](integration/contracts.md)에 정리했습니다. 🔴 **HL7 v2 로만 말하는 기존 장비 · 시스템이 있으면 S3 에서 먼저 확인하세요.**

---

## 업무로 보면 — 무엇을 할 수 있나
**By the work a hospital does**

> **EN** — The same features, re-threaded by the work a hospital actually does rather than by system. Each area names the systems that carry it and its main features; the full map is [functions/](functions/). **41 key features are written up one by one** in [functions/detail/](functions/detail/) — what it does, how it runs, **why it was built that way** and **what it prevents** — with what must exist first and what to fall back on in [dependencies](functions/dependencies.md). Listing a feature does not mean it is verified; status lives in the connection table.

기능을 **시스템이 아니라 하는 일로** 다시 묶은 것입니다. 전체 지도는 [업무별 기능 지도](functions/)에 있습니다.

| 업무 | 맡는 시스템 | 대표 기능 |
|---|---|---|
| 외래 진료 | HIS · AI Server · cerno · twin | 예약 · 접수 · 대기 · 오더 · 처방 · 기록 **초안** · 근거 질의 · 위험 점수 카드 |
| 입원 · 병동 간호 | HIS · Clinic | 퇴원 게이트 · 조기경고 점수 · **투약 바코드 대조 · 2인 확인** · 인수인계 |
| 수술 · 중환자 · 특수 치료 | HIS | 세 단계 체크리스트 · 좌우 판정 · 계수 대조 · 방사선(분할 · 누적선량) · 항암(사이클 게이트 · 무균조제) · 투석 · 재활 · 장기이식 |
| 응급 · 정신건강 | HIS | 중증도 분류 · 골든타임 프로토콜 · 격리 · 강박의 법정 최대시간 · 비자의입원 기한 |
| 검사 · 병리 · 수혈 · 유전체 | LIS · HIS · PACS | 검체 품질 · 자동 검증 · 위험치 폐루프 · 2단계 사인아웃 · 독립 판정 · 이차 소견 동의 게이트 |
| 영상 | PACS · HIS · AI Server | 워크리스트 · 판독 워크플로 · 웹 뷰어 · 판독 **초안** · 조영제 동의 |
| 약제 · 물류 | HIS · ERP · AI Server | 원내 처방집 · 처방 검토 · 조제 · 마약류 해시 원장 · 재고 · 장비 · 멸균 |
| 원무 · 경영 | HIS · ERP | 수납 · 계산서 · 청구 · 재무 · 원가 · 인사 · 급여 · 직원 셀프서비스 |
| 질 · 안전 · 신뢰 | HIS · sign · 전 시스템 | 안전 게이트 · 환자 확인 · 감염관리 · 미비기록 · 비상 열람 · 보유 · 파기 · 위원회 의결 · 서명 봉인 |
| 사람 · 조직 | edu · Clinic · Jitsi | 법정교육 · 전자 이수증 · 자격 원장 · 인수인계 · 결재 · 원격 상담(`중단`) |
| 세우고 지키기 | HIS · LIS | 개원 체크리스트 · Go-Live 게이트 · 개시 전환 · 연동 개통 게이트 · 감시자 |

### 주요 기능 — 한 편씩 자세히

환자안전에 닿는 기능부터 **41편**을 따로 썼습니다. 한 편마다 **무엇을 하나 · 어떻게 도나 · 왜 그렇게 만들었나 · 무엇을 막나 · 어디서 보나**를 적고, 실제 호출로 확인하지 않은 것은 그렇다고 밝힙니다. 먼저 있어야 하는 것과 못 쓸 때 대신할 것은 [전제와 파급](functions/dependencies.md), 낱말로 찾으려면 [찾아보기](functions/find.md).

| 묶음 | 편 |
|---|---|
| 진료 · 병동 | [외래 예약·대기](functions/detail/outpatient-scheduling.md) · [환자 확인](functions/detail/patient-identification.md) · [투약](functions/detail/medication-administration.md) · [환자 상태 점수](functions/detail/clinical-scores.md) · [퇴원 게이트](functions/detail/discharge-gate.md) · [임상 경로](functions/detail/clinical-pathway.md) · [AI 초안 승인](functions/detail/ai-draft-approval.md) |
| 수술 · 응급 · 특수 치료 | [수술 안전](functions/detail/surgery-safety.md) · [응급 중증도 분류](functions/detail/emergency-triage.md) · [골든타임 프로토콜](functions/detail/emergency-pathway.md) · [방사선 치료](functions/detail/radiation-therapy.md) · [항암 치료](functions/detail/chemotherapy.md) · [투석](functions/detail/dialysis.md) · [재활](functions/detail/rehabilitation.md) · [장기이식](functions/detail/transplant.md) · [격리·강박과 비자의입원](functions/detail/seclusion-restraint.md) |
| 검사 · 병리 · 수혈 | [검체](functions/detail/specimen-lifecycle.md) · [검사 결과 검증](functions/detail/result-verification.md) · [위험치 폐루프](functions/detail/critical-value.md) · [검사코드 카탈로그 반입](functions/detail/lab-code-catalog.md) · [병리 2단계 사인아웃](functions/detail/pathology-signout.md) · [수혈 안전](functions/detail/transfusion-safety.md) · [유전체 이차 소견](functions/detail/secondary-findings-gate.md) |
| 약 · 물류 | [원내 처방집](functions/detail/formulary.md) · [처방 조제](functions/detail/pharmacy-dispensing.md) · [마약류 수불 원장](functions/detail/narcotics-ledger.md) · [재고 · 장비 · 멸균](functions/detail/supply-equipment-sterile.md) |
| 기록 · 서명 · 환자에게 주기 | [오더 서명 봉인](functions/detail/order-signature.md) · [동의서 전자서명](functions/detail/consent-signature.md) · [진단서 · 기록 사본 발급](functions/detail/record-issuance.md) · [미비기록](functions/detail/incomplete-records.md) · [환자에게 자기 영상을 주는 길](functions/detail/patient-imaging-export.md) · [보유·파기](functions/detail/retention.md) · [비상 열람](functions/detail/emergency-access.md) |
| 질 · 안전 · 조직 | [안전 게이트](functions/detail/safety-gates.md) · [분모 없는 비율을 내지 않는다](functions/detail/no-ratio-without-denominator.md) · [감염관리](functions/detail/infection-control.md) · [위원회 의결](functions/detail/governance-enactment.md) · [직원 자격·교육](functions/detail/staff-credentials.md) |
| 세우기 | [개시 전환](functions/detail/golive-center.md) · [연동 개통 게이트](functions/detail/integration-gate.md) |

진료하는 사람이 자기 일부터 보려면 → [진료하는 사람을 위한 안내](clinicians/)(의사 · 간호 · 임상병리 · 영상 · 약제).

---

## AI 계층 — 어디서 무엇을 하고, 어떻게 켜나
**The AI layer: where it acts and how to turn it on**

> **EN** — What each AI assist produces and who confirms it; which systems call the AI Server; which AI features are **on by default in the code** (turn them off right after install) and which are off; the five-step order for turning features on by recorded decision; and what is kept for oversight. Details: [overview chapter 6](overview/07-ai.md) and [build stage S6](build-guide/S6-ai.md).

### AI 가 만드는 것과, 누가 확정하나

| 보조 | 무엇을 만드나 | 누가 확정하나 |
|---|---|---|
| 분류(triage) 보조 | 증상 분류 제안 | 의료진 |
| 진료 기록 초안 · 음성 기록 | 진료 대화 · 음성에서 기록 초안 | 의료진이 승인해야 기록이 됨 |
| 약물 설명 · 검진 결과 설명 | 환자용 설명 초안 | 사람이 감수 · 승인하는 화면을 거침 |
| 약물 상호작용 점검(DUR) 보조 | 점검 결과 제안 | 의료진 · 약사 |
| 근거 문서 질의(RAG) | 근거에서 찾은 답변 초안(cerno 는 근거가 없으면 만들지 않음) | 의료진 |
| 위험 점수 카드(twin) | 위험 예측 보조 · SBAR 초안 | 의료진이 「차트 저장」을 눌러야 HIS 에 저장 |
| 영상 판독 초안(PACS) | 예비 판독문 초안 · 비교 판독 · 자동 선별 알림 | 판독의 |

AI Server 를 부르는 쪽은 HIS · PACS · ERP · twin · cerno · edu · Jitsi 입니다(연결별 상태는 [개요서 7장](overview/07-ai.md#누가-ai-server-를-부르나--연결-상태)). 따라가기에서 일부 경로를 불러 봤지만 **연결 전체를 확인하지 못해 모두 `구현·미검증` 그대로**입니다 — 색인 경로는 임베딩 모델이 있는 기준 장비가 필요합니다.

### 끄고 시작해, 결정으로 하나씩 켠다

| 코드 기본값 켜짐 — **설치 직후 끔** | 코드 기본값 꺼짐 — 꺼져 있는지 확인 |
|---|---|
| HIS 의 AI 기능 전체 스위치 | 환자 AI 브리핑 야간 배치 |
| PACS 영상 자동 선별 | 데이터 품질 AI |
| HIS 의 AI 인사 | 음성 EMR · 앰비언트 기록 · 진료 스크라이브 등 |
| | PACS 판독문 자동 초안 · 드리프트 자동 격리 |

🔴 코드 기본값이 꺼짐이어도 **설치본의 DB 값(시드 포함)이 다를 수 있습니다** — 기본 시드가 AI 스위치를 켭니다. 설정 화면에서 **값과 출처**를 함께 봅니다.

1. 설치 직후 「기본 켜짐」 기능을 끕니다. 자기 기관 AI Server 주소를 넣기 전에는 켜지 않습니다.
2. **선행 결정을 기록합니다** — 의료기기(SaMD) 해당성 · 임상데이터 처리 경계 · 진료 음성 녹음 · 보관의 적법 근거 · 전송 목적지의 법적 한정.
3. **켤 범위를 원내 위원회가 정합니다**(AI 임상 기능 범위 — 개시 전 필수 결정).
4. HIS 를 AI Server 에 연결하고 전체 스위치를 켭니다. 개별 기능은 아직 꺼 둡니다.
5. **기능을 하나씩 켭니다** — 결정 기록 → 스위치 → Go-Live 항목 → 감독 화면에서 제안 · 승인 기록 확인 → 다음 기능. 되돌릴 때도 같은 순서로 끕니다.

### 무엇이 남나 — 감독

| 어디 | 남는 것 |
|---|---|
| HIS | AI 제안 원장(생성 → 승인 · 수정 · 거부) · 모델 릴리즈 기록 · AI 호출 기록 · 환자를 지목한 AI 조회의 감사 기록 · 품질 임계는 **기본 미설정**이고 표본이 모자라면 판정 보류 |
| AI Server | 충실도 · 검색 품질 등 자기 품질 계측 · 응답에 실리는 버전 정보 |
| twin | 쓰는 모델이 바뀌면 알림 |
| PACS | 모델별 성능 추세 · 판독의 수용률 · 드리프트 감지 |


## 구축은 이렇게 진행됩니다
**How a build proceeds**

> **EN** — Nine stages. **S0 preparation** (terms, servers, GPU, DB, institution profile, naming decision-makers) and **S1 core HIS** come first; **S2–S6** (patient access, clinical departments, trust layer, management layer, AI layer) are attached only as needed — though the **trust layer (sign) is best stood up before anything that needs signatures**; **S7 rehearsal** runs the whole flow on synthetic data; **S8 real cutover** isolates synthetic data, migrates real data and deploys a *real build* — it is not a settings toggle. Each stage chapter records ① install ② configure ③ what people must decide ④ verification screens and completion criteria ⑤ **what does not work yet and the workaround** ⑥ common pitfalls.

| 단계 · Stage | 무엇을 하나 · What happens | 사람이 정할 것(예) | 확인하는 곳 |
|---|---|---|---|
| S0 준비 | 제공 조건(MIT · 면책 · 제3자 구성요소) 확인 · 서버 · GPU · DB 확보 · **네트워크 격리** · 기관 프로파일(국가 · 기관명 · 진료과) · 결정 권한자 지정 | 어느 나라 기관인가 · 결정 세 층(허가권자 · 원내 위원회 · 직원)의 사람 · 임상데이터 처리 경계 | 개원 관제 · 위원회 화면 |
| S1 코어 HIS | 설치 · 코드 마스터 반입 · 부서 · 병상 · 직원 · 역할 · 병원 규정 설정 | 요양기관 종별 · 코드 신설 승인자 · 원외 처방전 유효기간 근거 | 시스템 설정(값과 출처) · Go-Live 관제 |
| S2 환자 접점 | 홈페이지 · 포털 · 앱 · 본인확인 · 알림 채널 | 환자 앱 알림의 적법 근거 · 문자 처리위탁 계약 · 스토어 배포 여부 | 대외 발신 관제 |
| S3 임상 부서 | LIS · PACS 연결 · 장비 인터페이스 · 부서별 대외 보고 | 직원 검사 결과 알림을 살릴지 · 활력 출처와 회복실 통합을 위한 스키마 변경 승인 | 연동 개통 게이트 · 감시자 |
| S4 신뢰 계층 | 전자서명 · 인증서 · 타임스탬프 · 동의서 서명 | 공인 타임스탬프 기관 계약 · 키 보관 장치(HSM) 이전 시점 · 장기 보관 문서의 재타임스탬프 | Go-Live 관제 |
| S5 경영 계층 | ERP · 그룹웨어 · 교육 연결 · 청구 자격 | 본인부담 절사 적용 · ERP 로 가는 환자번호 가명화 · 청구 상태 표기의 법적 검토 | ERP 연동 관제 |
| S6 AI 계층 | AI Server(GPU 한 장) 연결 · **설치 직후 AI 기능을 끄고 → 기관 결정으로 하나씩 켬** · 환자 AI 활용 동의 · 감독 지표 | 의료기기 해당성 · 음성 녹음 근거 · AI 임상 기능 범위([위](#ai-계층--어디서-무엇을-하고-어떻게-켜나)) | AI 설정 · AI 감독 관제 |
| S7 리허설 | 가상 데이터로 전 흐름 시연 · 안전 게이트 경고 운영 · 감시자 판정 · 연결 확인 | 경보 라우팅표 · 대기 시간 기준 통일 · 질지표 측정값의 출처 기록 | 안전 게이트 · 감시자 |
| S8 리얼 전환 | 가상 데이터 격리 · 실데이터 이관 · **리얼 빌드** · 개시 확인 | 키 파생 통일과 교체 시점 · **개시 승인(허가권자)** | Go-Live 관제 |

단계마다 ① 설치 ② 설정 ③ 사람이 정할 것 ④ 확인 화면 · 완료 조건 ⑤ **아직 안 되는 것과 대체 수단** ⑥ 흔한 함정을 [구축 가이드](build-guide/)에 적습니다. 사람이 정할 것은 모두 **56개**이고, 단계별 개수 · 개원 단계 · Go-Live 항목의 배정은 [가이드의 단계 표](build-guide/README.md#단계)에, 항목 전체는 [체크리스트](checklist/)에 있습니다. 가이드는 저장소와 릴리즈 기록을 읽고 쓴 뒤, **새 설치본으로 S0~S8 을 한 번 따라가 보며 고쳤습니다**(아래).

### 구축을 관리하는 화면 — 가이드는 이 화면들을 따라갑니다
**The screens that run the build itself**

> **EN** — The HIS already contains the machinery for running a build, so the guide does not invent a separate procedure; it explains these screens. Opening stages with a country axis, the go-live control board (machine-verified items kept apart from self-declared ones), the decision registry (who decided, which option, recorded ≠ applied), committee resolutions, operating modes, settings that show where each value comes from, safety gates (off / warn / block), the outbound-transmission board, and the always-on sentinel.

구축 과정 자체를 관리하는 장치가 HIS 안에 이미 있습니다. 가이드는 새 절차를 지어내지 않고 **그 화면들의 사용 설명서**가 됩니다. 화면은 [HIS 화면](screens/his.md)에 캡처가 있습니다.

| 화면 | 무엇을 하나 |
|---|---|
| 개원 관제 `/admin/opening` | 개원 전 · 개원 · 개원 후 단계와 항목 · **국가 축**(한국 · UAE) · 항목 상태를 다른 정본에서 끌어옴 · 증빙 첨부 |
| Go-Live 관제 `/admin/go-live` | 기술 · 보안 · 연동 · 법정 준비 항목 · **시스템이 판정한 것과 자가신고를 구분** |
| 결정 등록부 `/admin/decisions` | 사람이 정할 것 56개 · 결정 세 층 · 고른 선택지와 결과 · **기록한 것 ≠ 적용된 것** |
| 위원회 `/admin/governance` | 안건 · 정족수 · 의결 번호 · 집행 |
| 운영 모드 · AI 설정 `/admin/ai-settings` | 개발 / 리허설 / 리얼 — 빌드가 상한이고 실행 중에는 **좁히기만** 합니다 |
| 시스템 설정 `/admin/config` | 병원 규정 값 · **값의 출처**(DB / 기본값 / 미설정) |
| 안전 게이트 `/admin/safety-gates` | 게이트마다 끔 / 경고 / 차단 · 위반 통계 · 올릴 때의 안내 |
| 대외 발신 관제 `/admin/outbound-channels` | 밖으로 나가는 채널마다 구현 · 설정 · 승인 상태 |
| 감시자 `/admin/sentinel` | 정합성 · 흐름 · 계약 · 파이프 상시 감시 — 🔴 감시자 프로세스를 따로 띄워야 합니다 |

체크리스트 세 벌(개원 준비 60 · 개시 점검 60 · 사람 결정 56)은 이 화면들의 원본 레지스트리에서 **코드로 뽑은 것**입니다([checklist/](checklist/)).

## 새 설치본으로 따라가 본 결과 — 요약
**What the first follow-along install confirmed (2026-09-13 ~ 2026-09-16)**

> **EN** — Seven systems were installed from their pinned base commits on one isolated development PC, and **27 connections were driven end to end between those fresh installs**; 23 of them were also re-tested with a tampered key, a forged signature, a replayed message or a mismatched target, to confirm the guard actually blocks. Details, including what did not work: [따라가 본 결과](build-guide/follow-along-2026-09.md).

기준 커밋으로 새로 세운 설치본 **7개**(HIS · sign · LIS · PACS · ERP · edu · AI Server)를 외부로 나가지 못하는 네트워크에 올리고, 시스템 사이 연결을 **새 설치본끼리만** 실제로 불러 봤습니다. 아래는 그렇게 **확인된 것**입니다.

### 확인된 것

| 무엇 | 확인 내용 |
|---|---|
| **연결 27개가 끝까지 동작** | 검사 오더 → 결과 → 재검 취소, 직원·환자 전자서명, 판독 서명, 진료비 계산서, 청구·정산, 사내교육 이수까지 **한 줄로 이어졌습니다**([연결 상태](RELEASES/2026.09/compatibility.md)의 확인일 칸) |
| **가드가 실제로 막았다** | 27개 중 **23개**에 틀린 키 · 변조 토큰 · 위조 서명 · 재전송 · 다른 대상을 일부러 넣어 다시 시험했고, 전부 거부됐습니다(401 · 403 · 409). 나머지 4개(오더 취소 전파 · 공개키 조회 · 직원 명부 · 이수 기록)는 **거부를 시험할 자리가 없어** 정상 동작만 확인했습니다 |
| **실패를 실패라고 말한다** | AI 주소가 허용 목록에 없으면 "설정이 없어 보내지 않았다", 감시자가 없으면 "스윕 기록 없음 · 정지 의심", 표본이 모자라면 "산출 불가(0 이 아닙니다)" |
| **직무 분리가 코드에 있다** | 결과를 적용한 직원은 자기 결과를 검증할 수 없고, LIS 관리자는 검체 접수·결과 입력을 할 수 없으며, 정리 작업은 요청자 본인이 승인할 수 없습니다 |
| **리허설 모드가 실제로 잡아 둔다** | 문자 · 메일 · 연동 발송이 나가지 않고 대기열에 보류됐고, 보류 중이라는 사실을 로그로 계속 알렸습니다 |
| **백업이 복원됐다** | 암호화 백업을 다른 DB 에 복원해 **562개 테이블의 행 수가 일치**하는 것까지 확인했습니다 |
| **원본 그대로 되는 설치도 있다** | sign · ERP · edu 는 저장소의 운영용 이미지가 **그대로 빌드되고 떴습니다** |
| **가이드가 실측으로 채워졌다** | 따라가기 전 92곳이던 `확인 필요(따라가기)` 표시가 **19곳**으로 줄었고, 막힌 곳과 우회는 각 단계 장에 그대로 적었습니다 |

### 그리고 정직하게

- 이 따라가기는 **개발 PC 한 대**(arm64 · GPU 없음)에서 했습니다. **처리량 · 응답 시간 · AI 품질은 이 결과로 판단하지 않습니다.**
- 끝까지 가지 못한 연결, 코드에 고정돼 설정으로 못 바꾸는 경로, 아직 하지 않은 것(기준 장비 · 리얼 전환 · 미설치 시스템)은 **빠짐없이 적어 두었습니다** → [따라가 본 결과](build-guide/follow-along-2026-09.md)
- 연결 상태는 **`검증됨`(확인일 필수) 27 · `구현·미검증` 61** 입니다. `구현·미검증` 은 "양쪽 코드가 맞물려 있다"는 뜻이지 동작한다는 뜻이 아닙니다.

## 지금 받을 수 있는 것
**What you can actually get today**

> **EN** — Today this repository gives you the **materials**: the build playbook, 13 system briefs, the connection status table with verification dates, 293 screenshots, and three checklists. The source repositories are **listed by their final addresses and are all to be made public** — each is opened once its own cleanup is done, and the address does not change in the process. Some links will not open yet; nothing here hides that.

| 지금 있는 것 | 어디에 |
|---|---|
| 구축 절차 S0~S8 · 따라가며 막힌 곳과 우회 | [구축 가이드](build-guide/) · [따라가 본 결과](build-guide/follow-along-2026-09.md) |
| 시스템 13개가 무엇으로 이루어졌나 | [시스템 구성서](systems/) |
| 무엇이 실제로 맞물려 도는가(확인일 포함) | [연결 상태 표](RELEASES/2026.09/compatibility.md) |
| 화면이 실제로 어떻게 생겼나 | [화면 293장](screens/) |
| 개원 · 개시 · 결정 체크리스트 | [checklist/](checklist/) |
| 버전 조합 한 벌 | [통합 릴리즈 `2026.09`](RELEASES/2026.09/RELEASE.md) |
| **소스를 어디서 어떻게 받나** — 저장소 11곳 · 기준 커밋 · 받은 뒤 처음 여는 파일 | **[소스 받기](SOURCES.md)** |

| 아직 없는 것 | 언제 |
|---|---|
| 🔴 **컨테이너 이미지**(미리 만들어 둔 것) | 배포 여부가 정해지지 않았습니다 — 지금은 각 저장소에서 직접 빌드합니다 |
| AI 모델 가중치 | 저장소에도 소스에도 담지 않습니다. 기관이 약관을 읽고 직접 받습니다([THIRD_PARTY](THIRD_PARTY.md)) |
| 코드 마스터(수가 · 약가 · 상병 등) | 공공기관이 배포합니다. 기관이 이용 조건을 확인하고 받습니다 |

**소스는 시스템마다 저장소가 따로 있고, [소스 받기](SOURCES.md)에 주소 · 기준 커밋 · 받은 뒤 처음 여는 파일을 한 장으로 정리해 두었습니다.** 저장소는 **모두 공개할 예정**이고 각 프로젝트의 정리가 끝나는 대로 하나씩 열립니다. 아직 열리지 않은 주소가 있지만, 그 안내는 **열리는 순간 그대로 동작합니다**(주소도 커밋도 바뀌지 않습니다). 🔴 다만 **열렸다고 라이선스 표기가 MIT 로 정리됐다는 뜻은 아닙니다** — 저장소마다 지금 적힌 표기를 [매니페스트](RELEASES/2026.09/manifest.md)에 그대로 싣고 있습니다.

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
- **기관명 설정** — HIS 코드에 병원명이 고정 문자열로 남아 있는 파일이 있습니다(118개 · 기준 커밋에서 2026-09-17 에 다시 셈 · 09-10 값과 같음 · [파일 목록](build-guide/replace-list.md#his)). 설정값으로 옮기는 작업이 진행 중이며, 끝나기 전까지는 자기 병원명을 넣으려면 코드를 고쳐야 합니다.
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
| [`overview/`](overview/) | 취지·구조 개요서(11장 — 4장 「무엇을 할 수 있나」 2026-09-29 추가) | 🟡 초안 |
| [`SOURCES.md`](SOURCES.md) | **소스 받기** — 시스템 13 → 저장소 11 · 기준 커밋 · 받은 뒤 처음 여는 파일 · 저장소에 없는 것 | 🟢 생성물(주소 · 커밋 · 파일 존재를 기계로 대조) |
| [`build-guide/`](build-guide/) | **AI 기반 HIS 구축 가이드**(S0 준비 ~ S8 리얼 전환) | 🟡 초안 · **한 번 따라가 봄**(2026-09-13~16) · 남은 확인 필요 19곳 · [부록: 바꿔야 할 코드 기본값](build-guide/replace-list.md) |
| [`systems/`](systems/) | 시스템 구성서 13장 | 🟡 초안 |
| [`functions/`](functions/) | **업무별 기능 지도** + [주요 기능 상세 41편](functions/detail/) · [전제와 파급](functions/dependencies.md) · [찾아보기](functions/find.md) — 시스템이 아니라 **하는 일**로 묶은 색인(외래 · 병동 · 검사 · 영상 · 약제 · 원무 · 질·안전 · AI · 교육 · 개원). 구성서 §4 를 업무로 다시 꿴 것 | 🟡 초안 |
| [`clinicians/`](clinicians/) | **진료하는 사람을 위한 안내** — 공통 + 직역 5(의사 · 간호 · 임상병리 · 영상 · 약제). AI 가 하지 않는 일 · 시스템이 일부러 막는 것 · 내가 승인할 것 · 안 될 때의 대체 | 🟡 초안 |
| [`integration/`](integration/) | **연동 계약 지도** — 인증 3방식 · 개통 게이트 · **구축 시 연결 순서** · **[연결 카드 48장](integration/cards/)** · **[공통 규약](integration/contracts.md)**(오류 봉투 · 서명 대상 · 멱등 · 재시도) · [매트릭스](integration/matrix.md)(자동 생성) | 🟡 초안 · `검증됨` 27 / 113 |
| [`scenarios/`](scenarios/) | 데모 시나리오 4편(외래 · 응급 · 검진 · 입원→퇴원) | 🟡 초안 · 캡처 자리 52 중 **44**(✅ 36 · 🟡 8) · 응급 시나리오는 9/9 |
| [`deck/`](deck/) | 발표 덱(내용 34장 · A·E 시각 요약 + 화면 11장) | 🟡 초안 |
| [`checklist/`](checklist/) | 구축 체크리스트(개원 준비 60 · 개시 점검 60 · 사람 결정 56 — 레지스트리에서 자동 생성) | ✅ 1차 생성 |
| [`data/`](data/) | 규모 계측 스냅샷(계측일 · 기준 커밋 포함) | ✅ 1차 계측 |
| [`RELEASES/`](RELEASES/) | 생태계 통합 릴리즈([릴리즈 노트](RELEASES/2026.09/RELEASE.md) · 버전 조합 매니페스트 · 시스템별 릴리즈 요약 13 · [연결 상태](RELEASES/2026.09/compatibility.md) — 확인일 칸) | 🟢 **`2026.09`** · 담당 확인 전 |
| [`screens/`](screens/) | **화면으로 보는 생태계**(시스템 13장 + 흐름 1장 · 캡처와 설명) | 🟡 초안 · 293장 |
| [`assets/screens/`](assets/screens/) | 화면 캡처 이미지 293장 + [캡처 목록](assets/screens/INDEX.md)(자동 생성) | 🟡 HIS 264 / 266 · 형제 시스템 29 |
| [`diagrams/`](diagrams/) | 도식 8종 + 연결 지도(연결 상태 표에서 자동 생성) | 🟡 초안 |
| [`glossary.md`](glossary.md) | 용어집 | 🟡 초안 |
| `tools/` | 공개 검사기 · 규모 계측기 · 체크리스트 추출기 · 매니페스트 생성기 · 연결 지도 · 연동 매트릭스 생성기 · HIS 메뉴 추출기 · 캡처 목록 생성기 · 릴리즈 기록 계수기 · 바꿔야 할 코드 기본값 목록 생성기 · 문서 간 일치 검사기 · **수치 주장 검사기**(문서에 적힌 「검증됨 N」 같은 수치가 연결 표와 같은지) · **릴리즈 자르기 도구**(릴리즈 번호가 정해지면 폴더와 저장소 전체 링크를 한 번에 옮깁니다 — 기본이 미리보기 · `2026.09` 를 이걸로 잘랐습니다) · **링크 검사기**(저장소 안 링크 2,500여 개가 실제 파일과 제목을 가리키는지) · **내부 문구 누출 검사기**(공개하지 않기로 한 내부 서술이 공개 문서에 섞여 들어가지 않았는지) — 발행 전 한 번에 `node tools/verify-all.mjs`(검사 26개) · 푸시 전 자동 실행은 `sh tools/install-hooks.sh` 로 한 번 걸어 둡니다 | ✅ |

### 무엇부터 보면 되나

| 시간 | 이렇게 |
|---|---|
| **3분** | 위 [30초 요약](#30초-요약) → [한 문장](overview/01-one-sentence.md) |
| **20분** | [발표 덱](deck/) 34장 — 취지 · 구조 · 구축 · **지금 상태** · 데모 · 조건 |
| **1시간** | [개요서](overview/) 11장(병원장 · CIO 가 처음부터 끝까지 읽도록 씀) |
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

> **EN** — This repository is [MIT](LICENSE), Copyright (c) 2026 Sean Shin. The ecosystem software is intended to be MIT as well, **but third-party servers run as separate services, AI model weights (each with its own terms) and government-distributed code master data follow their own conditions** — see [THIRD_PARTY.md](THIRD_PARTY.md). **The source repositories are not yet relabeled to MIT**; each repository's current declaration is carried verbatim in the [release manifest](RELEASES/2026.09/manifest.md), so check the label in the repository you obtain. And see the [medical disclaimer](DISCLAIMER.md): **this software is not an approved medical device**; AI output is supportive information, and clinical judgment and responsibility rest with the clinicians and the adopting institution.

- 이 저장소: [MIT](LICENSE) · Copyright (c) 2026 Sean Shin (신현묵)
- 생태계 소프트웨어도 MIT 로 제공합니다. 다만 별도 서비스로 쓰는 제3자 서버, **AI 모델 가중치**(모델마다 별도 약관), 공공기관이 배포하는 코드 마스터 데이터는 **각자의 조건**을 따릅니다. 목록은 [THIRD_PARTY.md](THIRD_PARTY.md)에 정리합니다.
- 각 소스 저장소의 라이선스 표기는 **아직 MIT 로 정리되지 않았습니다**. 저장소마다 현재 적힌 표기를 [통합 릴리즈 매니페스트](RELEASES/2026.09/manifest.md)에 그대로 싣고, 정리되는 대로 갱신합니다. 소스를 받을 때는 그 저장소에 적힌 표기를 확인하세요.
- [의료 면책 고지](DISCLAIMER.md) — 이 소프트웨어는 인허가받은 의료기기가 아닙니다. AI 산출물은 보조 정보이며, 임상 판단과 책임은 의료진과 구축 기관에 있습니다.
