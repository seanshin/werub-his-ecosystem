# 약제를 위한 안내

**For pharmacists**

> **EN** — What changes in pharmacy: prescription review with interaction and DUR checks that distinguish block from warning, dispensing, patient medication explanations drafted by AI for a human to approve, narcotics ledgers sealed as a hash chain, and insurance code mapping pulled from the ERP. It also names what the institution must decide before go-live — who may override a DUR block and what must be recorded when they do — and notes that external claim transmission is not implemented. Not clinical guidance.

> 🔴 **진료 지침이 아닙니다.** 약물 · 용량 기준을 이 자료가 제시하지 않습니다. · 공통 내용은 [진료하는 사람을 위한 안내](README.md).

## 1. 내 일에서 달라지는 것

| 무엇 | 어떻게 |
|---|---|
| **처방 검토** | 상호작용 · 중복 · DUR 점검이 **보조**로 붙습니다. **차단(BLOCK)** 과 **경고(WARN)** 가 구분됩니다 — 🔵 실제 호출로 확인됨 |
| **중복 처방** | 같은 성분·기간이 겹치면 중복으로 표시됩니다 |
| **복약 설명** | 환자용 설명 **초안**이 만들어집니다 — 🔴 사람이 승인해야 나갑니다 |
| **마약류 수불** | 원장이 해시로 이어져 사후 변조가 드러납니다 |
| **보험코드 매핑** | ERP 에서 확정된 약품 보험코드를 가져옵니다 — 🔵 실제 호출로 확인됨(형식이 맞지 않으면 거부) |
| **약국 대기열** | 🔒 권한이 있는 계정에만 보입니다 — **비어 있다고 없는 것이 아닙니다** |

## 2. 막히는 자리 · 주의할 자리

| 무엇 | 지금 |
|---|---|
| DUR 차단(BLOCK) | 다음 단계로 넘어가지 않습니다 |
| **DUR 우회(override)** | 🔴 개시 전에 기관이 정할 것 — **누가 우회할 수 있고, 우회할 때 무엇이 남아야 하는가**(사유 · 행위자 · 시각). 정한 뒤 **우리 설치본에서 실제로 그렇게 남는지 눌러서 확인**하십시오 |
| 코드 마스터 | 약가 · 급여 · DUR 데이터는 **기관이 배포처에서 직접 받아 반입**합니다. 자료와 저장소에 들어 있지 않습니다 |

## 3. 0 을 읽는 법

「이 계정은 해당 대기열을 조회하지 않습니다(비어 있다는 뜻이 아닙니다)」 · AI 원장의 0 은 「AI 를 안 썼다」가 아니라 「이 원장에 남은 것이 없다」.

## 4. 내 이름이 남는 곳

처방 검토 · 조제 · DUR 판정과 우회 · 마약류 수불 · 복약 설명 승인.

## 5. 아직 안 되는 것

🔴 **대외 기관 전송(청구 · 보고)** — 전송 모듈이 없습니다. 기존 청구 소프트웨어를 쓰고 그 사실을 기관 문서에 남깁니다.

## 6. 더 볼 것

[HIS 구성서](../systems/his.md) · [AI Server 구성서](../systems/ai-server.md) · [제3자 조건 — 코드 마스터](../THIRD_PARTY.md)
