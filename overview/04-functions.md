# 4. 무엇을 할 수 있나 — 업무로 본 기능

**4. What it can do — features seen through the work**

> [개요서 목차](README.md) · ← [3. 계층 구조와 시스템 13](03-layers-and-systems.md) · 다음 → [5. 환자 한 명의 여정](05-patient-journey.md)

> **EN** — Chapter 3 lists the systems; this chapter lists what they **do**, grouped by the work a hospital does rather than by system. It gives a sense of scale (the HIS menu alone has 266 items in 8 domains), eleven work areas with the systems that carry them, and — more important for a decision-maker — **the six habits the features share**: the person who enters is not the person who verifies; what cannot be computed is shown as "cannot compute", never as zero; blocks are recorded, and so are bypasses and exemptions; a report that did not leave the building is never marked "submitted"; most safety gates ship **off** and the institution turns them on; and turning something on means a recorded decision, not a toggle. Listing a feature here means the code has it at the base commit — it does not mean it has been verified in operation.

> 🟡 **초안 — 시스템 담당 확인 전** · 기준: [통합 릴리즈 `2026.09` 매니페스트](../RELEASES/2026.09/manifest.md)
> 🔴 **여기 적혔다는 것은 기준 커밋의 코드에 있다는 뜻입니다.** 동작을 확인했다는 뜻이 아닙니다. 연결 상태는 [9장](09-status-and-preparation.md)과 [연결 상태 표](../RELEASES/2026.09/compatibility.md)가 정본입니다.

3장이 **무엇으로 이루어졌나**를 시스템별로 적었다면, 이 장은 그 시스템들이 **무엇을 하는지**를 병원이 하는 일로 묶어 적습니다. 병원장 · CIO 가 「우리 병원의 어느 일이 여기로 옮겨 오나」와 「이 기능들이 어떤 버릇을 갖고 있나」를 한 번에 보도록 썼습니다.

---

## 규모의 감 — HIS 메뉴만 266개

코어 HIS 의 웹 메뉴는 코드에서 **도메인 8 · 메뉴 묶음 26 · 메뉴 항목 266** 으로 짜여 있습니다(기준 커밋에서 기계적으로 뽑음 → [HIS 메뉴 구성](../systems/his-domains.md)).

| 도메인 | 메뉴 항목 | 무엇이 들어 있나(대표) |
|---|---:|---|
| 진료 | 45 | 외래 · 처방 입력 · 간호 · 수술 · 회복실 · 응급 · 중환자 · 특수 치료 · 입퇴원 · 협진 |
| 진료지원 | 62 | 약국 · 검사실 · 영상실 · 병리 · 혈액은행 · 건강검진센터 · 의무기록 · 제증명 |
| 환자·고객 | 17 | 고객관계관리 · 해외환자 · 병원 안내 |
| 질·안전 | 22 | 환자안전 사고 · 감염관리 · 직원 노출 사고 · 질 지표 · 임상 연구 |
| 운영 | 19 | 수납 · 청구 · 인사 · 재고 · 경영 대시보드 · 전원 |
| 지능형 | 7 | AI 컨시어지 · AI 예약 도우미 · 시뮬레이터 · 환자 여정 |
| 시스템 관리 | 87 | 개원 관제 · 코드 마스터 · 임상 규칙 · 권한 · 설정 · 감사 · AI 운영 · 외부 연동 |
| 개인 | 7 | 내 설정 · 인증서 · 기기 |

메뉴에 있다는 것은 화면이 있다는 뜻입니다. 여기에 검사(LIS) · 영상(PACS) · 서명(sign) · 경영(ERP) · AI · 교육 · 협업 시스템의 기능이 더해집니다. 시스템별 기능은 [구성서](../systems/) §4 에 있습니다.

## 업무별로 — 누가 맡고 무엇이 있나

| 업무 | 맡는 시스템 | 대표 기능 |
|---|---|---|
| 외래 진료 | HIS · AI Server · cerno · twin | 예약 · 접수 · 대기 · 오더 · 처방 · 기록 **초안** · 근거 질의 · 위험 점수 카드 |
| 입원 · 병동 간호 | HIS · Clinic | 퇴원 게이트 · 조기경고 점수 · 투약 바코드 대조와 2인 확인 · 인수인계 |
| 수술 · 중환자 · 특수 치료 | HIS | 세 단계 수술 체크리스트 · 좌우 판정 · 계수 대조 · 방사선 · 항암 · 투석 · 재활 · 장기이식 |
| 응급 · 정신건강 | HIS | 중증도 분류 · 골든타임 프로토콜 · 격리 · 강박의 법정 최대시간 · 비자의입원 기한 |
| 검사 · 병리 · 수혈 · 유전체 | LIS · HIS · PACS | 검체 품질 · 자동 검증 · 위험치 폐루프 · 2단계 사인아웃 · 수혈 독립 판정 · 이차 소견 동의 게이트 |
| 영상 | PACS · HIS · AI Server | 워크리스트 · 판독 워크플로 · 웹 뷰어 · 판독 **초안** · 조영제 동의 |
| 약제 · 물류 | HIS · ERP · AI Server | 원내 처방집 · 처방 검토 · 조제 · 마약류 해시 원장 · 재고 · 장비 · 멸균 |
| 원무 · 경영 | HIS · ERP | 수납 · 진료비 계산서 · 청구 · 재무 · 원가 · 인사 · 급여 · 직원 셀프서비스 |
| 질 · 안전 · 신뢰 | HIS · sign · 전 시스템 | 안전 게이트 · 환자 확인 · 감염관리 · 미비기록 · 비상 열람 · 보유 · 파기 · 위원회 의결 · 서명 봉인 |
| 사람 · 조직 | edu · Clinic · Jitsi | 법정교육 · 전자 이수증 · 자격 원장 · 인수인계 · 결재 · 원격 상담(`중단`) |
| 세우고 지키기 | HIS · LIS | 개원 체크리스트 · Go-Live 게이트 · 개시 전환 · 연동 개통 게이트 · 상시 감시자 |

전체 지도와 각 행의 화면 · 구성서 연결은 [업무별 기능 지도](../functions/)에 있습니다.

## 기능들이 함께 지키는 여섯 가지

기능을 한 편씩 자세히 쓰다 보니([주요 기능 — 자세히](../functions/detail/)), 서로 다른 업무의 기능들이 **같은 버릇**을 갖고 있다는 것이 보였습니다. 도입을 결정하는 사람에게는 기능 목록보다 이 버릇이 더 중요합니다 — 현장에서 「왜 여기서 막히지?」가 나오는 자리가 대개 여기이기 때문입니다.

| 버릇 | 무엇을 뜻하나 | 어디서 보이나(예) |
|---|---|---|
| **① 만든 사람이 스스로 확정하지 않는다** | 입력자와 검증자, 조제자와 검수자, 방사선 치료 처방자와 승인자를 가릅니다 | [검사 결과 검증](../functions/detail/result-verification.md) · [처방 조제](../functions/detail/pharmacy-dispensing.md) · [방사선 치료](../functions/detail/radiation-therapy.md) |
| **② 모르는 것을 0 으로 말하지 않는다** | 입력이 모자라면 점수 · 비율을 내지 않고 「산출 불가」와 빠진 항목을 보여 줍니다 | [환자 상태 점수](../functions/detail/clinical-scores.md) · [분모 없는 비율](../functions/detail/no-ratio-without-denominator.md) · [응급 중증도 분류](../functions/detail/emergency-triage.md) · [직원 자격·교육](../functions/detail/staff-credentials.md) |
| **③ 막을 때도, 비켜 갈 때도 기록이 남는다** | 우회와 면제를 허용하는 자리에서도 누가 · 왜를 남깁니다. 급할 때 막지 않는 기능은 대신 **아무도 모르게 열리지 않게** 합니다 | [투약](../functions/detail/medication-administration.md) · [퇴원 게이트](../functions/detail/discharge-gate.md) · [비상 열람](../functions/detail/emergency-access.md) |
| **④ 나가지 않은 것을 나갔다고 적지 않는다** | 대외 보고 채널이 없는 자리는 「제출 완료」로 적지 않습니다 | [마약류 수불 원장](../functions/detail/narcotics-ledger.md) · [감염관리](../functions/detail/infection-control.md) |
| **⑤ 안전 게이트는 대부분 꺼진 채로 온다** | 게이트는 끔 · 경고 · 차단 세 모드이고, 기준 커밋의 배선된 게이트 28개 중 코드 기본값은 **차단 6 · 경고 4 · 끔 18** 입니다. 🔴 꺼진 게이트는 위반을 세지 않으므로 **가장 깨끗해 보입니다** | [안전 게이트](../functions/detail/safety-gates.md) · [원내 처방집](../functions/detail/formulary.md) |
| **⑥ 켜는 것은 스위치가 아니라 결정이다** | 연동 개통 · 개시 전환 · AI 기능 · 위원회 정책은 **기록된 결정**을 거쳐 반영됩니다. 시스템이 판정할 수 있는 항목은 사람이 완료로 찍지 못합니다 | [연동 개통 게이트](../functions/detail/integration-gate.md) · [개시 전환](../functions/detail/golive-center.md) · [위원회 의결](../functions/detail/governance-enactment.md) · [AI 초안 승인](../functions/detail/ai-draft-approval.md) |

이 여섯은 [2장 취지](02-principles.md)가 원칙으로 적은 것이 **기능 안에서 어떻게 보이는가**입니다. 원칙이 어디서 왔는지는 [설계 기준은 어떻게 생겼나](../DESIGN-HISTORY.md)에 있습니다.

## 기관에게 의미하는 것

- **도입 첫날의 화면은 「설정 전」 상태입니다.** 안전 게이트 대부분과 AI 개별 기능은 꺼져 있고, 코드 기본값이 켜진 것도 있습니다. 무엇을 언제 켤지는 [8장](08-build-path.md)의 단계마다 사람이 정합니다.
- **현장의 반발이 예상되는 자리는 버릇 ① · ③ 입니다.** 혼자서 끝내던 일에 두 번째 사람이 들어오고, 비켜 갈 때 사유를 적어야 합니다. 도입 전에 부서와 합의할 것을 [진료하는 사람을 위한 안내](../clinicians/)가 직역별로 정리합니다.
- **대시보드가 「0」이 아니라 「산출 불가」를 보일 때가 많습니다**(버릇 ②). 결함이 아니라 입력이 아직 없다는 뜻입니다 — 초록불을 믿을 수 있게 하려는 선택입니다.
- **먼저 있어야 하는 것이 있습니다.** 직원 신원(HIS) · 코드 마스터 · 검사코드 매핑 · PDF 렌더 서비스 · AI 목적지 허용 목록 · 조직 결재가 없으면 여러 기능이 한꺼번에 멈춥니다 → [전제와 파급](../functions/dependencies.md).

## 더 읽을 것

| 알고 싶은 것 | 문서 |
|---|---|
| 업무별 전체 지도 | [업무별 기능 지도](../functions/) |
| 기능 하나를 자세히 — 무엇 · 어떻게 · 왜 · 무엇을 막나 | [주요 기능 — 자세히](../functions/detail/) |
| 기능을 켜기 전에 있어야 할 것 · 못 쓸 때 대신할 것 | [전제와 파급](../functions/dependencies.md) |
| 낱말로 찾기 | [찾아보기](../functions/find.md) |
| 진료하는 사람의 자리에서 | [진료하는 사람을 위한 안내](../clinicians/) |
| 시스템별 기능 원문 | [시스템 구성서](../systems/) §4 · [HIS 메뉴 266개](../systems/his-domains.md) |

---

← [3. 계층 구조와 시스템 13](03-layers-and-systems.md) · 다음 → [5. 환자 한 명의 여정](05-patient-journey.md)
