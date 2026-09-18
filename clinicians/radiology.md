# 영상을 위한 안내

**For radiological technologists and reading rooms**

> **EN** — What changes in imaging: worklists reaching the modality, storing studies, the reading workflow and electronically sealed reports, contrast consent, and the AI reading assistance that only ever produces a draft. It is explicit that the HIS-side image proxy was **not** completed in the follow-along and that reading is done in the PACS screens meanwhile. Not clinical guidance.

> 🔴 **진료 지침이 아닙니다.** · 공통 내용은 [진료하는 사람을 위한 안내](README.md).

## 1. 내 일에서 달라지는 것

| 무엇 | 어떻게 |
|---|---|
| **촬영 목록(워크리스트)** | HIS 오더가 PACS 목록으로 갑니다. 장비는 표준 DICOM 으로 목록을 물어봅니다 |
| **영상 저장** | 장비가 보낸 영상을 받습니다(C-STORE) |
| **판독** | PACS 화면에서 작성하고, **판독 서명은 전자서명으로 봉인**됩니다 — 🔵 실제 호출로 확인됨 |
| **병리 슬라이드** | LIS 가 스캔 목록을 보내고 뷰어 링크로 엽니다 — 🔵 실제 호출로 확인됨 |
| **조영제 동의** | 환자 서명 → PACS 가 무결성을 확인합니다 — 🔵 실제 호출로 확인됨(본인 확인 없는 서명은 거부) |
| **AI 판독 보조** | 사전 점검 · 비교 판독 · 구조화 판독문 **초안**. 🔴 **초안은 판독이 아닙니다** — 판독의가 고쳐 서명합니다 |

## 2. 🔴 지금 알아야 할 제약

| 무엇 | 지금 |
|---|---|
| **HIS 화면에서 영상·판독 열기** | 따라가기에서 **하나도 끝까지 가지 못했습니다.** 두 프로젝트의 협의가 필요합니다 → 그동안 **PACS 화면에서 직접** 합니다 |
| **환자 영상 내보내기** | 양쪽에서 각각 켜야 하고, PACS 쪽 스위치는 **기본이 꺼짐**입니다 |
| **환자 외부 영상 업로드** | 경로가 없습니다(`미구현`) |
| **판독 결과 HL7 송신** | `미구현` — 판독 반영은 다른 경로로 갑니다 |

## 3. 막히는 자리

DICOM 통신에는 계정·비밀번호가 없습니다 — **이름표(AE 타이틀)와 망 구성이 경계**입니다. 그래서 촬영망을 따로 두고 허용 목록을 좁힙니다. 🔴 이것은 불편이 아니라 **설계**입니다.

## 4. 내 이름이 남는 곳

촬영 시행 · 판독 작성과 서명 · 조영제 동의 입회 · 영상 열람(감사 기록).

## 5. 더 볼 것

[PACS 구성서](../systems/pacs.md) · [PACS 화면](../screens/pacs.md) · [S3](../build-guide/S3-clinical-departments.md)
