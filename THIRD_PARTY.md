# 제3자 구성요소와 MIT 가 덮지 않는 것

생태계 자체 코드는 [MIT](LICENSE)로 제공합니다. 이 문서는 MIT 가 **덮지 않는** 구성요소를 적습니다. 각 구성요소는 자기 조건을 따르므로 구축 기관이 따로 확인해야 합니다.

> **이 문서는 법률 검토가 아닙니다.** 구성요소의 이름·버전·라이선스·원문 위치라는 사실만 적습니다. 의무가 생기는지, 생긴다면 어떻게 이행할지는 **구축 기관과 법무가** 설치 형태에 맞춰 확인합니다.

---

## 읽는 법

| 항목 | 뜻 |
|---|---|
| 기준일 | **2026-09-11**. 각 시스템 저장소의 컨테이너 구성 파일 · Dockerfile · 의존성 선언 · AI 설정 파일을 읽기 전용으로 확인했습니다. 버전은 첫 [통합 릴리즈](RELEASES/) 매니페스트에서 다시 고정합니다 |
| 확인한 버전 | 저장소에 고정된 태그입니다. `메이저만 고정` = `16-alpine` 처럼 큰 번호만 고정 · `고정 안 됨` = `latest` 등 받는 날에 따라 바뀌는 태그 |
| 라이선스 | [SPDX 식별자](https://spdx.org/licenses/)로 적습니다. SPDX 목록에 없는 약관은 `LicenseRef-…` 로 적습니다 |
| 상태 `원문 확인` | 기준일에 공식 저장소·공식 사이트의 원문을 봤습니다. 원문이 쓰는 버전의 태그가 아니라 기본 브랜치나 현행 페이지이면 링크 옆에 `(기본 브랜치)`·`(현행)` 으로 표시합니다 |
| 상태 `확인 필요` | 원문을 보지 못했거나, 쓰는 버전과 원문의 대응을 확정하지 못했습니다. 이유를 함께 적습니다 |

이 문서에 **적지 않은 것**: 각 시스템이 링크하는 라이브러리 의존성(npm·pip 패키지)과 런타임 기반 이미지(Node.js·Python·Alpine 등). 시스템별 의존성 목록은 따로 생성할 예정입니다.

---

## 한눈에 — 조건이 두드러진 구성요소

라이선스 이름과 원문이 적은 사실만 모았습니다. 판단은 각 절의 원문으로 합니다.

| 구성요소 | 원문이 적은 사실 | 구축 기관·법무가 확인할 것 |
|---|---|---|
| Grafana · Metabase · Orthanc 플러그인(DICOMweb·PostgreSQL) | AGPL-3.0 계열입니다. AGPL 제13조는 수정본을 네트워크로 사용자에게 제공하는 경우를 다룹니다 | 수정 여부 · 외부 사용자에게 제공하는지 |
| Orthanc 코어 | GPL-3.0-or-later 입니다 | 이미지를 재배포하거나 수정하는지 |
| Redis 7 | 7.4.x 부터 RSALv2 또는 SSPLv1 중 선택입니다. 7.2 이하는 BSD-3-Clause 입니다. 저장소의 `7-alpine` 태그는 기준일에 7.4.11 을 받습니다 | 실제 받은 버전 · 어느 약관을 고를지 |
| browserless(v1 이미지) | GPL-3.0-or-later 또는 상용 라이선스입니다. v1 README 는 폐쇄 소스 상업 용도에 상용 라이선스가 필요하다고 적습니다 | 쓰는 용도 · 대체 수단 |
| MedGemma 계열 모델 | Health AI Developer Foundations 약관입니다. 임상 사용에는 해당하면 규제 기관 승인을 받으라고 적습니다 | 약관 전문 · 금지 사용 정책 |
| Llama 계열 파생 모델(Med42·Meditron) | Llama 3 / Llama 2 Community License 입니다. 개발사 모델 카드는 추가 검증 없이 임상에 쓰지 말라고 경고합니다 | 약관 · 허용 사용 정책 · 표시 요건 |
| SNOMED CT | 대한민국은 2020-08 SNOMED International 회원국이 됐습니다. 회원국 사용은 무료이며 국가 배포 센터(NRC)에 사용을 등록하라고 적습니다 | NRC 등록 절차 |

---

## 1. 별도 서비스로 쓰는 제3자 서버

생태계 시스템이 **자기 코드에 넣지 않고** 별도 컨테이너나 별도 프로세스로 띄워 쓰는 서버입니다.

| 구성요소 | 쓰는 시스템 | 확인한 버전 | 라이선스 | 원문 | 확인일 | 상태 |
|---|---|---|---|---|---|---|
| PostgreSQL | HIS · sign · LIS · PACS · twin · edu (16) · Clinic (15) · ERP(개발용 compose 15 · CI · README 16) | 메이저만 고정 | `PostgreSQL` | [postgresql.org](https://www.postgresql.org/about/licence/) | 2026-09-11 | 원문 확인 |
| pgvector (확장이 든 PostgreSQL 이미지) | Clinic | 고정 안 됨(`pg15` 태그) | `PostgreSQL` | [LICENSE](https://github.com/pgvector/pgvector/blob/master/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| Redis | HIS · LIS · ERP · PACS · twin · cerno · edu · Clinic | 메이저만 고정(`7-alpine` → 기준일 7.4.11) | 7.4.x: `LicenseRef-RSALv2 OR SSPL-1.0` · 7.2 이하: `BSD-3-Clause` | [redis.io 라이선스 표](https://redis.io/legal/licenses/) · [7.4.0 LICENSE](https://github.com/redis/redis/blob/7.4.0/LICENSE.txt) | 2026-09-11 | 원문 확인 |
| Orthanc 코어 | PACS | 이미지 `orthancteam/orthanc:24.12.2` · 코어 판본 미확정(주 1) | `GPL-3.0-or-later` | [COPYING 1.12.5](https://orthanc.uclouvain.be/hg/orthanc/file/Orthanc-1.12.5/COPYING) · [라이선스 안내](https://orthanc.uclouvain.be/book/faq/licensing.html) | 2026-09-11 | 원문 확인 · 판본 확인 필요 |
| Orthanc DICOMweb 플러그인 | PACS | 위 이미지에 포함 · 판본 미확정(주 1) | `AGPL-3.0-or-later` | [COPYING 1.18](https://orthanc.uclouvain.be/hg/orthanc-dicomweb/file/OrthancDicomWeb-1.18/COPYING) | 2026-09-11 | 원문 확인 · 판본 확인 필요 |
| Orthanc PostgreSQL 플러그인 | PACS | 위 이미지에 포함 · 판본 미확정(주 1) | `AGPL-3.0-or-later` | [COPYING 7.0](https://orthanc.uclouvain.be/hg/orthanc-databases/file/OrthancPostgreSQL-7.0/COPYING) | 2026-09-11 | 원문 확인 · 판본 확인 필요 |
| nginx | HIS · PACS | HIS 고정 안 됨(`alpine`) · PACS 1.27 · PACS 뷰어 이미지 1.24 | `BSD-2-Clause` | [nginx.org](https://nginx.org/LICENSE) (현행) | 2026-09-11 | 원문 확인 |
| Grafana (OSS 이미지) | HIS(관측) · PACS · Jitsi 11.2.0 · ERP(BI) 11.3.0 | 11.2.0 · 11.3.0 | `AGPL-3.0-only` (일부 패키지는 Apache-2.0) | [v11.2.0 LICENSE](https://github.com/grafana/grafana/blob/v11.2.0/LICENSE) · [v11.3.0 LICENSING.md](https://github.com/grafana/grafana/blob/v11.3.0/LICENSING.md) | 2026-09-11 | 원문 확인 |
| Metabase (OSS 이미지) | ERP(BI) | v0.51.6 | AGPL 제3판(원문에 only·or-later 구분 없음) — 엔터프라이즈 디렉터리·엔터프라이즈 이미지는 상용 라이선스 | [v0.51.6 LICENSE.txt](https://github.com/metabase/metabase/blob/v0.51.6/LICENSE.txt) | 2026-09-11 | 원문 확인 |
| Prometheus | HIS(관측) · Jitsi v2.54.1 · PACS v2.54.0 | v2.54.1 · v2.54.0 | `Apache-2.0` | [v2.54.1 LICENSE](https://github.com/prometheus/prometheus/blob/v2.54.1/LICENSE) | 2026-09-11 | 원문 확인 |
| Alertmanager | PACS | v0.27.0 | `Apache-2.0` | [v0.27.0 LICENSE](https://github.com/prometheus/alertmanager/blob/v0.27.0/LICENSE) | 2026-09-11 | 원문 확인 |
| Node Exporter | PACS | v1.8.2 | `Apache-2.0` | [v1.8.2 LICENSE](https://github.com/prometheus/node_exporter/blob/v1.8.2/LICENSE) | 2026-09-11 | 원문 확인 |
| PostgreSQL Exporter | PACS | 고정 안 됨(`latest`) | `Apache-2.0` | [LICENSE](https://github.com/prometheus-community/postgres_exporter/blob/master/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| Redis Exporter | PACS | 고정 안 됨(`latest`) | `MIT` | [LICENSE](https://github.com/oliver006/redis_exporter/blob/master/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| browserless (v1 이미지 `browserless/chrome`) | HIS(서버 PDF 렌더) | 고정 안 됨(`latest`) | `GPL-3.0-or-later OR LicenseRef-Browserless-Commercial` | [v1 LICENSE.md](https://github.com/browserless/browserless/blob/v1/LICENSE.md) | 2026-09-11 | 원문 확인 (주 2) |
| Jitsi Meet (웹) | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/jitsi-meet/blob/stable/jitsi-meet_9823/LICENSE) | 2026-09-11 | 원문 확인 |
| docker-jitsi-meet (이미지 구성) | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/docker-jitsi-meet/blob/stable-9823/LICENSE) | 2026-09-11 | 원문 확인 |
| Jicofo | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/jicofo/blob/stable/jitsi-meet_9823/LICENSE) | 2026-09-11 | 원문 확인 |
| Jitsi Videobridge | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/jitsi-videobridge/blob/stable/jitsi-meet_9823/LICENSE) | 2026-09-11 | 원문 확인 |
| Jibri (녹화) | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/jibri/blob/master/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| Jigasi (전사 — 선택 구성) | Jitsi | `stable-9823` | `Apache-2.0` | [LICENSE](https://github.com/jitsi/jigasi/blob/master/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| Prosody (XMPP 서버) | Jitsi | `stable-9823` 이미지에 포함 · 판본 미확정 | `MIT` | [prosody.im](https://prosody.im/source/mit) (현행) | 2026-09-11 | 원문 확인 · 판본 확인 필요 |
| coturn (TURN 서버) | Jitsi | 4.6 | `BSD-3-Clause` | [4.6.0 LICENSE](https://github.com/coturn/coturn/blob/4.6.0/LICENSE) | 2026-09-11 | 원문 확인 |
| Pulse Physiology Engine | twin (시험 구성 · 기본 미기동) | 4.3.1 | `Apache-2.0` | [pulse.kitware.com](https://pulse.kitware.com/) (현행) | 2026-09-11 | 원문 확인 |
| Ollama (모델 서버) | AI Server (cerno·twin 은 AI Server 를 거쳐 씀) | 고정 안 됨(호스트에 직접 설치) | `MIT` | [LICENSE](https://github.com/ollama/ollama/blob/main/LICENSE) (기본 브랜치) | 2026-09-11 | 원문 확인 |
| ChromaDB | AI Server — 별도 서버가 아니라 **프로세스 안에 내장한 벡터 저장소** | 1.5.8 | `Apache-2.0` | [1.5.8 LICENSE](https://github.com/chroma-core/chroma/blob/1.5.8/LICENSE) | 2026-09-11 | 원문 확인 |

**주 1 — Orthanc 판본.** 저장소는 이미지 태그 `24.12.2` 만 고정합니다. 이미지 제작처 [릴리즈 노트](https://github.com/orthanc-server/orthanc-builder/blob/master/release-notes-docker-images.md)에는 24.12.0(코어 1.12.5 · DICOMweb 1.18 · PostgreSQL 7.0)과 25.1.0 만 있고 24.12.2 항목이 없습니다. 그래서 표의 원문 링크는 24.12.0 판본 기준입니다. 실제 판본은 받은 이미지 안에서 확인해야 합니다. PACS 의 Orthanc 설정은 DICOMweb·PostgreSQL 플러그인을 쓰고, 플러그인 폴더를 통째로 읽습니다. 이미지에 든 다른 플러그인이 함께 켜지는지, 켜진다면 그 라이선스가 무엇인지도 확인이 필요합니다. Orthanc 안내 문서는 확장·클라우드 기능 플러그인을 AGPLv3+ 로 낸다고 적습니다.

**주 2 — browserless.** Docker Hub 는 `browserless/chrome` 을 구판(v1)으로 표시하고 v2 를 권합니다. v2 원문은 `SSPL-1.0 OR` 상용 라이선스로 v1 과 다릅니다. 이미지 안의 Chromium 은 따로 라이선스가 있고, 이 문서에서는 확인하지 않았습니다.

---

## 2. 소스를 가져와 고친 제3자 코드

| 구성요소 | 쓰는 시스템 | 확인한 버전 | 라이선스 | 원 저작권 고지 | 원문 | 확인일 | 상태 |
|---|---|---|---|---|---|---|---|
| OHIF Viewer | PACS (웹 영상 뷰어) | v3.12.0 | `MIT` | Copyright (c) 2018 Open Health Imaging Foundation | [v3.12.0 LICENSE](https://github.com/OHIF/Viewers/blob/v3.12.0/LICENSE) | 2026-09-11 | 원문 확인 |
| Cornerstone3D (`@cornerstonejs/core` · `tools` · `dicom-image-loader` 등) | PACS (OHIF 빌드에 포함) | 4.15.29 | `MIT` | Copyright (c) 2019 Open Health Imaging Foundation | [v4.15.29 LICENSE](https://github.com/cornerstonejs/cornerstone3D/blob/v4.15.29/LICENSE) | 2026-09-11 | 원문 확인 |

**쓰는 방식.** PACS 뷰어는 OHIF 공식 소스(v3.12.0 태그)를 받아 패치 파일 1개 · 자체 확장 코드 · 화면 설정 · 한국어 번역을 얹고 정적 파일로 빌드합니다. 기준일의 패치 파일은 OHIF 쪽 파일(확장·플랫폼·모드)만 고치고, Cornerstone3D 는 고치지 않은 채 npm 패키지로 빌드에 묶습니다.

**원 고지.** MIT 는 사본과 상당 부분에 원 저작권 고지와 허가 고지를 포함하라고 적습니다. 기준일에 PACS 뷰어 이미지에는 OHIF 원 저작권 고지를 담은 LICENSE 파일이 함께 들어갑니다. 빌드 산출물에 묶이는 나머지 npm 패키지의 고지 목록은 아직 만들지 않았습니다. 뷰어를 다시 빌드하거나 배포하는 기관은 그 목록을 따로 확인해야 합니다.

---

## 3. AI 모델 가중치

**모델 가중치는 이 저장소에도, 생태계 소스에도 들어 있지 않습니다. 구축 기관이 모델마다 약관을 읽고 직접 받습니다**(Ollama 로 받거나 Hugging Face 에서 받습니다). 약관은 MIT 가 아니고 모델마다 다릅니다.

아래 표에는 **기준일에 AI Server 의 설정·코드가 기본으로 가리키는 모델**을 적었습니다. 어떤 모델을 설치하고 켤지는 구축 기관이 정하고, 설정으로 바꿀 수 있습니다. AI Server 에 있는 비의료 기능(창작·게임·코딩 등)의 모델은 생태계에 쓰이지 않으므로 뺐습니다.

| 모델 | 쓰는 AI 기능 | 받는 이름(태그) | 원 모델 | 라이선스 | 원문 | 확인일 | 상태 |
|---|---|---|---|---|---|---|---|
| Qwen2.5 14B Instruct | 일반 질의 · 요약 · 증상 분류 · 품질 평가 채점 · cerno 기본 | `qwen2.5:14b` | Qwen/Qwen2.5-14B-Instruct | `Apache-2.0` | [LICENSE](https://huggingface.co/Qwen/Qwen2.5-14B-Instruct/blob/main/LICENSE) | 2026-09-11 | 원문 확인 |
| Qwen2.5 7B Instruct | 경량 의료 질의 · RAG 답변 · twin 기본 · 교차 검증 | `qwen2.5:7b` | Qwen/Qwen2.5-7B-Instruct | `Apache-2.0` | [LICENSE](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct/blob/main/LICENSE) | 2026-09-11 | 원문 확인 |
| Qwen3 8B | 도구 호출(오케스트레이터) · 회의 요약 | `qwen3:8b` | Qwen/Qwen3-8B | `Apache-2.0` | [LICENSE](https://huggingface.co/Qwen/Qwen3-8B/blob/main/LICENSE) | 2026-09-11 | 원문 확인 |
| Qwen3-VL 8B | 회의 화면 프레임 설명 · 일반 이미지 설명 | `qwen3-vl:8b` | Qwen/Qwen3-VL-8B-Instruct | `Apache-2.0` | [모델 카드](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct) | 2026-09-11 | 원문 확인(모델 카드 표기 · LICENSE 파일 없음) |
| MedGemma 1.5 4B | 의료 영상 판독 **초안** · 이중 판독 1차 (PACS·twin 영상 경로) | `dcarrascosa/medgemma-1.5-4b-it:Q8_0` (Ollama 커뮤니티 재포장 · 주 3) | google/medgemma-1.5-4b-it | `LicenseRef-HAI-DEF-Terms` | [HAI-DEF 약관](https://developers.google.com/health-ai-developer-foundations/terms) · [모델 카드](https://huggingface.co/google/medgemma-1.5-4b-it) | 2026-09-11 | 원문 확인 |
| MedGemma 4B | 이중 판독 2차 · 구조화 판독 **초안** | `medgemma:4b` | google/medgemma-4b-it | `LicenseRef-HAI-DEF-Terms` | [HAI-DEF 약관](https://developers.google.com/health-ai-developer-foundations/terms) · [모델 카드](https://huggingface.co/google/medgemma-4b-it) | 2026-09-11 | 원문 확인 |
| Llama3-Med42-8B | 임상 질의 · 재입원·합병증 위험 추론의 1순위 후보 | `thewindmom/llama3-med42-8b` (Ollama 커뮤니티 재포장 · 주 3) | m42-health/Llama3-Med42-8B | `LicenseRef-Llama-3-Community` | [Llama 3 약관](https://developer.meta.com/ai/llama3/license/) · [모델 카드](https://huggingface.co/m42-health/Llama3-Med42-8B) | 2026-09-11 | 원문 확인 |
| Meditron 7B | 약물 분석 1단계 · 일부 임상 도메인의 후순위 후보 | `meditron` | epfl-llm/meditron-7b | 가중치 `LicenseRef-Llama-2-Community` · 코드 `Apache-2.0` | [Llama 2 약관](https://developer.meta.com/ai/llama2/license/) · [모델 카드](https://huggingface.co/epfl-llm/meditron-7b) | 2026-09-11 | 원문 확인 |
| BGE-M3 | RAG 임베딩 (AI Server · cerno) | `bge-m3` | BAAI/bge-m3 | `MIT` | [모델 카드](https://huggingface.co/BAAI/bge-m3) | 2026-09-11 | 원문 확인 |
| Whisper large-v3 · medium (CTranslate2 변환본) | 음성 인식 — 회의 일괄 처리(large-v3) · 실시간(medium) | faster-whisper 가 `large-v3` · `medium` 이름으로 받음 | Systran/faster-whisper-large-v3 · -medium (원 모델 OpenAI Whisper) | `MIT` | [large-v3](https://huggingface.co/Systran/faster-whisper-large-v3) · [medium](https://huggingface.co/Systran/faster-whisper-medium) · [OpenAI Whisper LICENSE](https://github.com/openai/whisper/blob/main/LICENSE) | 2026-09-11 | 원문 확인 (주 4) |
| SpeechBrain ECAPA-TDNN | 화자 구분 · 화자 대조 | `speechbrain/spkrec-ecapa-voxceleb` | 동일 | `Apache-2.0` | [모델 카드](https://huggingface.co/speechbrain/spkrec-ecapa-voxceleb) | 2026-09-11 | 원문 확인 (학습 데이터 VoxCeleb 1·2 의 조건은 미확인) |
| DeepSeek-OCR | 의료법·고시 문서 반입 시 글자 인식 | `deepseek-ocr` | deepseek-ai/DeepSeek-OCR | `MIT` | [모델 카드](https://huggingface.co/deepseek-ai/DeepSeek-OCR) | 2026-09-11 | 원문 확인 |
| 자체 파인튜닝 의료 모델 2종 | 일부 의료 요약·초안 경로. 공개 모델로 바꾸는 설정이 있음 | 공개 배포하지 않음 | Qwen2.5-7B-Instruct 기반 QLoRA | 기반 모델 `Apache-2.0` · 파인튜닝 가중치의 제공 조건은 정하지 않음 | — | 2026-09-11 | 확인 필요 (제공 여부·조건 미정) |

**코드에 선택지로만 등록된 의료 모델.** MedGemma 27B · MedLlama2 7B · OpenBioLLM 8B · MediChat-Llama3 8B · GPT-OSS 20B · Phi-4-reasoning 과, MedGemma 1.5 4B 의 다른 재포장 태그가 있습니다. 모두 기본 경로가 아닙니다. MedGemma 27B 만 모델 카드에서 HAI-DEF 약관 표기를 봤고, 나머지는 원문을 보지 않았습니다(`확인 필요`). 켜기 전에 각 약관을 따로 확인해야 합니다. 비상업 라이선스(CC BY-NC 4.0)인 검증 모델 1종은 기본에서 빠졌고 설치본에서도 지웠습니다. 지금은 선택 설정에 이름만 남아 있습니다.

**원문이 적은 조건** (요약이므로 반드시 원문 전문을 읽으십시오)

- **HAI-DEF 약관(MedGemma).** 임상 사용을 "환자의 진단이나 치료에 쓰는 것(연구 포함)"으로 정의합니다. 해당하면 관할 규제 기관의 승인을 받으라고 적습니다. Google 이 의료기기 "제조자"로 간주될 수 있는 사용을 금지합니다. 파생물을 넘길 때는 약관 사본을 주고 Notice 파일을 넣으라고 적습니다. 별도 문서인 금지 사용 정책도 약관에 포함됩니다.
- **Llama 3 Community License(Med42).** 월간 활성 사용자가 7억 명을 넘으면 Meta 에 따로 라이선스를 요청하라고 적습니다. 배포할 때는 약관 사본을 주고 "Built with Meta Llama 3" 를 표시하라고 적습니다. 파생 모델 이름 앞에는 "Llama 3" 를 붙이라고 적습니다. 허용 사용 정책도 약관에 포함됩니다.
- **Llama 2 Community License(Meditron).** 월간 활성 사용자 7억 명 조항이 있습니다. 배포할 때는 Notice 파일에 저작권 고지를 넣으라고 적습니다. 허용 사용 정책도 약관에 포함됩니다.
- **개발사 경고.** Med42 모델 카드: *"not yet ready for clinical use without further testing and validation"*. Meditron 모델 카드: *"recommend against deploying Meditron in medical applications without extensive use-case alignment, as well as additional testing"*. 이 경고는 라이선스 조항이 아니라 개발사의 권고입니다. 이 생태계에서 AI 는 초안과 제안을 만들 뿐이며, 사람이 승인해야 정본이 됩니다([의료 면책 고지](DISCLAIMER.md)).

**주 3 — 커뮤니티 재포장 태그.** 원 개발사가 아니라 제3자가 Ollama 에 올린 태그입니다. MedGemma 1.5 재포장본 페이지는 HAI-DEF 약관을 따른다고 적습니다. 가중치가 원본과 같은지, 원 약관이 그대로 적용되는지는 구축 기관이 확인해야 합니다. 원 개발사 배포본을 직접 받아 변환하는 방법도 있습니다.

**주 4 — Whisper 표기.** 받는 파일은 Systran 변환본이고, 그 모델 카드 표기는 MIT 입니다. 원 모델의 OpenAI GitHub 저장소 LICENSE 도 MIT 입니다. 다만 OpenAI 가 Hugging Face 에 올린 원 모델 카드의 메타데이터는 `apache-2.0` 으로 적혀 있어, 원 모델 쪽 표기가 두 가지입니다. macOS 경로는 `mlx-community/whisper-large-v3-mlx` 를 쓰고, 모델 카드 표기는 MIT 입니다.

---

## 4. 코드 마스터·기준 데이터

생태계는 공공기관이 배포하는 코드와 기준 데이터를 반입해서 씁니다. **이 저장소는 그 데이터를 담지 않습니다. 구축 기관이 배포 기관에서 직접 받아 반입합니다.** 반입 절차는 [구축 가이드](build-guide/) S1(코어 HIS)과 S6(AI 계층)에서 안내합니다(준비 중).

| 데이터 | 쓰는 시스템 | 배포 기관 | 이용 조건 | 확인일 | 상태 |
|---|---|---|---|---|---|
| 약제급여목록·약가(의약품 표준코드 포함) · 저가약 대체조제 목록 | HIS(반입) · AI Server(조회) | 건강보험심사평가원 | 배포 기관·데이터셋마다 다름 | 2026-09-11 | 확인 필요 (원문 미확인) |
| 수가 · 치료재료 코드(EDI 행위·검사 코드 포함) | HIS · AI Server | 건강보험심사평가원 · 보건복지부 고시 | 배포 기관·데이터셋마다 다름 | 2026-09-11 | 확인 필요 (원문 미확인) |
| KCD(한국표준질병·사인분류) | HIS · AI Server | 국가데이터처(구 통계청) | 이용 조건 미확인. **제9차 개정**이 2025-07-01 고시되어(고시 제2025-299호) 2026-01-01 부터 시행 중입니다([고시](https://mods.go.kr/board.es?act=view&bid=107&list_no=437419&mid=a10403040000&nPage=1)). 생태계 코드의 KCD 표기는 기준일에 제8차입니다 | 2026-09-11 | 확인 필요 (이용 조건 · 제9차 반영) |
| DUR 금기 정보 · 의약품 개요정보 | AI Server(DUR 점검·약 정보) · HIS | 식품의약품안전처(공공데이터포털 제공) | 데이터셋마다 다름 | 2026-09-11 | 확인 필요 (원문 미확인) |
| 법정감염병 목록 | AI Server · HIS | 질병관리청 | 미확인 | 2026-09-11 | 확인 필요 |
| 의료법 조문 · 고시 원문(RAG 코퍼스) | AI Server | 법제처 · 보건복지부 · 건강보험심사평가원 등 | 문서마다 다름 | 2026-09-11 | 확인 필요 |
| LOINC | LIS · HIS(검사 코드 매핑) · twin | Regenstrief Institute | 로열티 없는 라이선스이며 조건이 있습니다([원문](https://loinc.org/kb/license)). 원문 페이지가 기준일에 자동 조회를 막아(403) 공식 사이트의 발췌만 봤습니다 | 2026-09-11 | 확인 필요 |
| SNOMED CT | HIS · LIS 등(코드 참조) | SNOMED International · 국내 국가 배포 센터 한국보건의료정보원 | 대한민국은 2020-08 회원국이 됐습니다([회원 안내](https://www.snomed.org/members/republic-of-korea)). 회원국 사용은 무료이고, 그 나라 NRC 에 사용을 등록하라고 적습니다([받는 법](https://www.snomed.org/get-snomed)) | 2026-09-11 | 원문 확인 (등록 절차는 NRC 에 확인) |
| Synthea (합성 환자 데이터 생성기) | twin (위험 궤적 검증용 합성 코호트) | MITRE · SyntheticHealth | `Apache-2.0` ([LICENSE](https://github.com/synthetichealth/synthea/blob/master/LICENSE), 기본 브랜치) | 2026-09-11 | 원문 확인 |

- 기준일에 일부 시스템의 시드·매핑 파일은 **LOINC 와 SNOMED CT 코드를 참조**합니다(파일 수·건수는 세지 않음). 이 코드가 든 소스를 배포하거나 운영에 쓸 때의 조건은 구축 기관과 법무가 각 원문으로 확인합니다.
- KCD 제8차 표기는 HIS 코드를 문자열로 검색해 셌습니다(제8차 표기 25개 파일 · 제9차 표기 0개). 제9차 반영 계획은 통합 릴리즈에서 다시 확인합니다.

---

## 5. 구조 — 링크하지 않고 별도 컨테이너로 씁니다

이 절은 생태계를 **어떻게 짜 놓았는지** 설명합니다. 라이선스상 결론이 아닙니다.

- 1장의 서버(데이터베이스·캐시·영상 서버·관측·BI·화상 회의·PDF 렌더·모델 서버)는 생태계 코드에 **링크하거나 소스를 섞지 않습니다.** 공식 이미지나 공식 설치본을 **별도 컨테이너나 별도 프로세스**로 띄우고, 생태계 코드는 네트워크 프로토콜로 부릅니다(SQL · Redis 프로토콜 · DICOMweb · HTTP · XMPP 등).
- 예외가 셋 있습니다. ① **PACS 뷰어**는 OHIF·Cornerstone3D 소스를 받아 함께 빌드합니다(2장). ② **ChromaDB** 는 AI Server 프로세스 안에 라이브러리로 들어갑니다. ③ 각 시스템의 **라이브러리 의존성**은 그 시스템 코드에 링크됩니다(목록 생성 예정).
- AI 모델 가중치와 코드 마스터는 소스에 넣지 않습니다. 구축 기관이 받아 설정된 위치에 둡니다(3장·4장).

이 구조가 각 라이선스에서 어떤 의미를 갖는지는 이 문서가 판단하지 않습니다. AGPL 의 네트워크 제공 조항, GPL 의 배포 조건, 약관의 사용 제한과 표시 요건이 여기에 해당합니다. 특히 다음 경우는 구축 기관과 법무가 따로 확인해야 합니다.

1. 제3자 서버를 **수정해서** 쓰는 경우
2. 제3자 서버 기능을 원내 직원이 아닌 **외부 사용자에게 네트워크로 제공**하는 경우
3. 이미지나 빌드 산출물을 **다른 기관에 재배포**하는 경우
4. `메이저만 고정`·`고정 안 됨` 태그처럼 **받는 날에 따라 판본이 바뀌는** 구성요소(예: Redis 7.2 → 7.4 에서 라이선스가 바뀜)

---

## 남은 확인

| 항목 | 할 일 |
|---|---|
| 버전 고정 | 첫 통합 릴리즈 매니페스트에서 이 표의 버전을 다시 고정합니다. `고정 안 됨`인 태그(PostgreSQL Exporter · Redis Exporter · browserless · nginx(HIS) · pgvector · Ollama)는 판본을 적습니다 |
| Orthanc 판본 | 이미지 `24.12.2` 안의 코어·플러그인 판본과, 켜지는 플러그인 목록을 확인합니다 |
| 코드 마스터 이용 조건 | 배포 기관별 원문(공공데이터포털 이용 허락 범위 등)을 확인해 이 표를 채웁니다 |
| 라이브러리 의존성 | 시스템별 npm·pip 의존성과 PACS 뷰어 빌드 산출물의 고지 목록을 생성합니다 |
| 선택 등록 모델 | 기본 경로가 아닌 의료 모델의 약관을 확인합니다 |

이 문서에서 틀린 곳을 찾으면 알려 주십시오(알리는 경로는 [README 의 참여](README.md#참여) 절에 안내합니다). 원문 링크와 확인일을 함께 적어 주시면 고치겠습니다.
