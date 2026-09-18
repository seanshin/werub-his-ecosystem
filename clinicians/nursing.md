# 간호를 위한 안내

**For nurses**

> **EN** — What changes for nursing: vitals and early-warning scores, medication administration with two-person checks, handover, consent capture, and education records. It states plainly where a count of zero does **not** mean "nothing happened", which steps the system deliberately blocks, and what is not yet available (hand-hygiene rate, exposure-incident tracking, remote video). Not clinical guidance.

> 🔴 **진료 지침이 아닙니다.** · 공통 내용은 [진료하는 사람을 위한 안내](README.md).

## 1. 내 일에서 달라지는 것

| 무엇 | 어떻게 |
|---|---|
| **활력 · 조기경고** | 입력하면 점수가 계산되고 상승 시 알림이 뜹니다. 🔴 **표본이 없으면 점수를 내지 않고 「산출 불가」로 적습니다** |
| **투약** | 시행은 **2인 확인**이 필요한 자리가 있습니다(수혈 등). 확인이 없으면 다음 단계가 열리지 않습니다 |
| **인수인계** | 시스템 안에서 넘기고 기록이 남습니다. 그룹웨어 채널로도 흘릴 수 있습니다(기관 설정) |
| **동의서** | 환자 서명을 받으면 상태가 자동 반영됩니다. 🔴 **본인 확인 없이 서명한 건은 거부됩니다** |
| **교육 · 이수증** | 법정교육 이수가 전자 이수증으로 봉인되고, 완료 통지가 교육 시스템에 반영됩니다 |

## 2. 0 을 읽는 법

🔴 **비어 있다고 없었던 것이 아닙니다.**

- 「이 계정은 해당 대기열을 **조회하지 않습니다**」 → 내 권한 밖입니다
- 「**재지 않았다**(0 이 아니다)」 → 계측 자체를 하지 않았습니다
- 「비어 있는 것은 **할 일이 없다는 뜻이 아닙니다**」 → 아직 연결되지 않은 목록입니다
- 손위생 준수율 **「산출 불가」** → 관찰 기록이 없으면 비율을 내지 않습니다

## 3. 막히는 자리 — 그렇게 만든 것입니다

동의 상태가 확인되지 않으면 수혈 출고가 자동 통과되지 않습니다 · 2인 확인이 없으면 시행이 완료되지 않습니다 · 표본이 없으면 지표를 내지 않습니다.

## 4. 내 이름이 남는 곳

투약 시행 · 2인 확인 · 인수인계 · 동의서 입회 · 교육 이수 · 비상 열람.

## 5. 아직 안 되는 것

| 안 되는 것 | 그때 |
|---|---|
| **손위생 준수율** | 관찰 기록이 들어와야 산출됩니다 — 지금은 「산출 불가」 |
| **직원 노출 사고 추적** | 계측이 아직입니다 |
| 🔴 원격 화상 | `중단` — 새로 구성해야 합니다 |

## 6. 더 볼 것

[HIS 화면](../screens/his.md) · [간호 · 병동 흐름](../scenarios/04-inpatient-to-discharge.md) · [교육 구성서](../systems/edu.md)
