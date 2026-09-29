# 프로젝트 소개서

**Project introductions**

> **EN** — One introduction per project, written for hospital IT staff: what the system is, where in the hospital it is used, what it can do, how it is built, how it connects to the others, what it takes to install and run, why it was designed that way, and what is not there yet. Each introduction reads the project's **current development line** and states the commit it read at the end. The deeper reference documents (system briefs, build guide, connection table) stay pinned to the integrated release `2026.09`; each introduction lists what has changed since then.

이 생태계에 등록된 프로젝트 13개를 **하나씩 소개하는 문서**입니다. 읽는 사람은 **의료 전산담당자**를 기준으로 했습니다.

## 한 편에 들어 있는 것

| 절 | 답하는 질문 |
|---|---|
| Introduction (English) | 영문 독자를 위한 소개 |
| 1 한 문장 | 무엇인가 |
| 2 병원 업무의 어디에 | 누가 · 어떤 장면에서 쓰나 |
| 3 할 수 있는 일 | 기능 묶음 · 화면 |
| 4 어떻게 만들어졌나 | 구성 요소 · 기술 · 데이터가 사는 곳 |
| 5 다른 시스템과의 연결 | 주는 것 · 받는 것 · 인증 · 실제로 확인했나 |
| 6 설치 · 운영 | 서버 · 먼저 있어야 할 것 · 기관이 준비할 데이터 · 백업 · 감시 |
| 7 이렇게 만든 이유 | 설계의 특징과 이유 |
| 8 알아 둘 것 | 아직 안 되는 것 — 한 곳에 모음 |
| 9 통합 릴리즈 이후 달라진 점 | 기준 문서들과 무엇이 다른가 |
| 10 더 깊이 · 이 문서의 근거 | 참고 문서 · 읽은 커밋 · 센 방법 |

모르는 말이 나오면 → **[소개서 용어 풀이](terms.md)** — 소개서에 실제로 나오는 약어 · 기술 용어를 한 줄로 풀었습니다(검사기가 빠진 약어를 잡습니다).

## 목록

| 프로젝트 | 한 줄 | 소개서 |
|---|---|---|
| **HIS** | 병원 업무의 중심 · 생태계의 신원 허브 | ✅ [HIS](his.md) |
| 공개 홈페이지 | 병원 공개 사이트 · AI 예약 도우미 | ✅ [소개서](homepage.md) · [구성서](../systems/homepage.md) |
| 환자 앱 | 환자용 모바일 앱 | ✅ [소개서](patient-app.md) · [구성서](../systems/patient-app.md) |
| LIS | 진단검사 · 미생물 · 병리 · 수혈 · 유전체 | ✅ [소개서](lis.md) · [구성서](../systems/lis.md) |
| PACS | 영상 저장 · 판독 · 웹 뷰어 | ✅ [소개서](pacs.md) · [구성서](../systems/pacs.md) |
| sign | 전자서명 · 인증서 · 타임스탬프 | ✅ [소개서](sign.md) · [구성서](../systems/sign.md) |
| ERP | 재무 · 원가 · 인사급여 · 자재 · 보험청구 | ✅ [소개서](erp.md) · [구성서](../systems/erp.md) |
| AI Server | 기관 안의 AI 연산 | ✅ [소개서](ai-server.md) · [구성서](../systems/ai-server.md) |
| twin | 위험 점수 카드 · 운영 시뮬레이션 | ✅ [소개서](twin.md) · [구성서](../systems/twin.md) |
| cerno | 의료진별 근거 질의 | ✅ [소개서](cerno.md) · [구성서](../systems/cerno.md) |
| edu | 직원 교육 · 법정교육 | ✅ [소개서](edu.md) · [구성서](../systems/edu.md) |
| Clinic | 병원 그룹웨어 | ✅ [소개서](clinic.md) · [구성서](../systems/clinic.md) |
| Jitsi | 원격진료 화상 | ✅ [소개서](jitsi.md) · [구성서](../systems/jitsi.md) |

## 소개서와 다른 문서의 관계

- **소개서** — 처음 읽는 곳. 현재 개발본 기준.
- **[시스템 구성서](../systems/)** — 설정 키 · 연동 행 · 한계를 빠짐없이 적은 참고 문서. 통합 릴리즈 `2026.09` 기준.
- **[구축 가이드](../build-guide/)** — 세우는 순서. 통합 릴리즈 `2026.09` 기준.
