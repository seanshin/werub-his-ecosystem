# 찾아보기 — 낱말로 찾기

**Find it by name**

> **EN** — A lookup table: you know the word, you want the page. Each row points to the feature description, the screens, the status and, where relevant, the checklist item. It is deliberately a **pointer**, not a definition — for what a term means see the [glossary](../glossary.md); for what the system does with it, follow the links here.

> 낱말의 **뜻**은 [용어집](../glossary.md)에 있습니다. 이 표는 **그 기능이 어디 적혀 있는지**를 가리킵니다.
> 업무로 찾으려면 → [업무별 기능 지도](README.md) · 내 일로 찾으려면 → [진료하는 사람을 위한 안내](../clinicians/)

## 진료 · 기록

| 낱말 | 어디를 보나 |
|---|---|
| 오더 · 처방 | [의사 안내](../clinicians/physician.md) · [오더 서명 봉인](detail/order-signature.md) · [HIS 구성서](../systems/his.md) |
| 진료 기록 초안(음성 · 대화) | [AI 초안 승인](detail/ai-draft-approval.md) · [개요서 6장](../overview/06-ai.md) |
| 전자서명 | [동의서 전자서명](detail/consent-signature.md) · [sign 구성서](../systems/sign.md) · [신뢰의 사슬](../diagrams/trust-chain.md) |
| 동의서 | [동의서 전자서명](detail/consent-signature.md) · [간호 안내](../clinicians/nursing.md) |
| 비상 열람(BTG) | [비상 열람](detail/emergency-access.md) · [진료하는 사람을 위한 안내 §5](../clinicians/README.md#5-내가-승인해야-하는-것--내-이름이-남는-곳) · [용어집](../glossary.md) |
| 감사 기록 · 해시체인 | [오더 서명 봉인](detail/order-signature.md) · [개요서 5장](../overview/05-identity-trust-standards.md) |
| 보유 기간 · 파기 · 보존명령 | 🔴 [보유·파기](detail/retention.md) — 세기는 하고 지우지는 않습니다 |
| 미비기록 · 의무기록 완결도 | [미비기록](detail/incomplete-records.md) · [HIS 화면](../screens/his.md) |
| 퇴원요약 · 미서명 차트 | [미비기록 §2](detail/incomplete-records.md) |
| 상병(진단) 미입력 · 청구 삭감 | 🔴 [미비기록 §2](detail/incomplete-records.md) — 서명이 청구 방아쇠입니다 |
| 손위생 준수율 · WHO 다섯 순간 | [감염관리 §2](detail/infection-control.md) — 🔴 관측 0건이면 「산출 불가」 |
| 격리 환자 수 · 접촉주의 | [감염관리 §2](detail/infection-control.md) — 네 출처를 환자 단위로 합칩니다 |
| 법정감염병 신고 · 국가 감시체계 보고 | 🔴 [감염관리 §2](detail/infection-control.md) — 자동 전송은 `미구현`, 수기 보고입니다 |
| 직원 노출 사고(자상 · 체액) | [감염관리 §2](detail/infection-control.md) — 0 은 「사고 없음」이 아닙니다 |
| 안전 게이트 · 끔 · 경고 · 차단 | [안전 게이트](detail/safety-gates.md) · [S7](../build-guide/S7-rehearsal.md) |
| 「위반 0건」을 읽는 법 · 평가 모집단 | 🔴 [안전 게이트 §2](detail/safety-gates.md) — 분모가 없으면 준수가 아닙니다 |

## 검사 · 영상

| 낱말 | 어디를 보나 |
|---|---|
| 검사 오더 · 결과 회신 | [업무별 지도 §2](README.md#2-검사하고-찍는-일) · [연결 상태 표](../RELEASES/2026.09/compatibility.md) |
| 자동 검증 · 델타 체크 | [검사 결과 검증](detail/result-verification.md) |
| 2차 검증(입력자≠검증자) | [검사 결과 검증](detail/result-verification.md) · [임상병리 안내](../clinicians/laboratory.md) |
| 위험치(critical value) | [위험치 폐루프](detail/critical-value.md) |
| 수혈 · 교차시험 · ABO | [수혈 안전](detail/transfusion-safety.md) |
| 유전체 · 이차 소견 | [이차 소견 게이트](detail/secondary-findings-gate.md) |
| 병리 · 사인아웃 · 개정 | [병리 2단계 사인아웃](detail/pathology-signout.md) |
| 환자에게 영상 주기 · CD | [환자에게 자기 영상을 주는 길](detail/patient-imaging-export.md) — 🔴 CD·USB 경로는 없습니다 |
| 블록 · 슬라이드 · 디지털 슬라이드(WSI) | [병리 2단계 사인아웃](detail/pathology-signout.md) |
| 검사코드 카탈로그 · 매핑 | [카탈로그 반입](detail/lab-code-catalog.md) · [전제와 파급 §1](dependencies.md) |
| 장비 연결(ASTM · 결과 파일) | [전제와 파급 §3](dependencies.md) · [LIS 구성서 §10](../systems/lis.md) |
| 워크리스트(MWL) · 촬영 | [영상 안내](../clinicians/radiology.md) · [PACS 구성서](../systems/pacs.md) |
| 판독 · 판독 서명 | [영상 안내](../clinicians/radiology.md) · [연결 상태 표](../RELEASES/2026.09/compatibility.md) |
| 병리 슬라이드 · WSI | [업무별 지도 §2](README.md#2-검사하고-찍는-일) · [LIS 구성서 §4](../systems/lis.md#4-핵심-기능) |

## 약 · 청구

| 낱말 | 어디를 보나 |
|---|---|
| DUR · 약물 상호작용 | [약제 안내](../clinicians/pharmacy.md) · [업무별 지도 §3](README.md#3-약과-물류) |
| 마약류 수불 | [마약류 수불 원장](detail/narcotics-ledger.md) · [약제 안내](../clinicians/pharmacy.md) · [ERP 구성서](../systems/erp.md) |
| 법정 취급보고(마약류) | 🔴 [마약류 수불 원장 §2](detail/narcotics-ledger.md) — 전송은 `미구현`, 사람이 올리고 접수번호를 적습니다 |
| 보험코드 매핑 | [약제 안내](../clinicians/pharmacy.md) · [연결 상태 표](../RELEASES/2026.09/compatibility.md) |
| 수납 · 진료비 계산서 | [업무별 지도 §4](README.md#4-돈과-운영) |
| 청구 · 대외 전송 | 🔴 [전제와 파급 §3](dependencies.md) — 전송은 `미구현`, 대체 수단이 있습니다 |
| 코드 마스터(수가 · 약가 · 상병) | [전제와 파급 §1](dependencies.md) · [THIRD_PARTY](../THIRD_PARTY.md) |

## AI

| 낱말 | 어디를 보나 |
|---|---|
| AI 가 하지 않는 일 | [진료하는 사람을 위한 안내 §2](../clinicians/README.md#2-ai-가-하는-일과-하지-않는-일) |
| 초안 승인 원장 | [AI 초안 승인](detail/ai-draft-approval.md) |
| RAG · 근거 질의 | [업무별 지도 §6](README.md#6-ai) · [cerno 구성서](../systems/cerno.md) |
| 위험 점수 · SBAR | [twin 구성서](../systems/twin.md) · [선택과 값](../DESIGN-HISTORY-SYSTEMS.md#5-시스템마다-무엇을-정하고-무엇을-포기했나) |
| 음성 인식(STT) | [업무별 지도 §6](README.md#6-ai) · [AI Server 구성서](../systems/ai-server.md) |
| 모델 반입 · GPU | [S6](../build-guide/S6-ai.md) · [전제와 파급 §1](dependencies.md) |

## 신원 · 권한 · 안전

| 낱말 | 어디를 보나 |
|---|---|
| 신원 허브 · 토큰 | [신원 허브 도식](../diagrams/identity-hub.md) · [개요서 5장](../overview/05-identity-trust-standards.md) |
| 권한 · 역할 | [화면으로 보는 생태계](../screens/) · [HIS 메뉴](../systems/his-domains.md) |
| 4-eyes(두 사람) | [연동 개통 게이트](detail/integration-gate.md) · [수혈 안전](detail/transfusion-safety.md) |
| 「산출 불가」 · 분모 | [분모 없는 비율](detail/no-ratio-without-denominator.md) · [개요서 2장](../overview/02-principles.md) |
| 모른다고 말하는 아홉 가지 | [진료하는 사람을 위한 안내 §4](../clinicians/README.md#4-화면이-모른다고-말하는-자리) |

## 세우고 여는 일

| 낱말 | 어디를 보나 |
|---|---|
| 연동 개통 게이트 | [개통 게이트](detail/integration-gate.md) · [연동 계약 지도](../integration/README.md) |
| 개시 전환(Go-Live) | [개시 전환](detail/golive-center.md) · [체크리스트](../checklist/) · [S8](../build-guide/S8-go-real.md) |
| 개발 시드(DEV-SEED) 배지 | [개통 게이트](detail/integration-gate.md) |
| 설치 순서 S0~S8 | [구축 가이드](../build-guide/) |
| 연결 카드(쌍별 붙이는 법) | [연결 카드 48장](../integration/cards/) · [공통 규약](../integration/contracts.md) |
| 소스 받기 · 기준 커밋 | [소스 받기](../SOURCES.md) |
| 백업 · 복원 | [S8](../build-guide/S8-go-real.md) |

## 없는 것을 찾을 때

찾는 낱말이 여기 없다면 세 가지 가능성이 있습니다.

1. **아직 쓰지 않았습니다** — [자세히 쓴 편 목록](detail/)에 「아직 쓰지 않은 것」이 있습니다
2. **그 기능이 없습니다** — [전제와 파급 §3](dependencies.md) 과 각 구성서 §10 에 **대체 수단**이 있습니다
3. **낱말의 뜻을 찾는 것이라면** → [용어집](../glossary.md)
