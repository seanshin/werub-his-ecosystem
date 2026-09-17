# 통합 릴리즈 노트 (초안)
**Integrated ecosystem release notes (draft)**

> 번호: **미정**(번호 체계가 정해지면 이 값과 폴더 이름을 함께 바꿉니다) · 기준 커밋 고정 2026-09-11 · 이 노트 작성 2026-09-16
> **EN** — What this release combination is, what was verified by real calls, and what a hospital should know before building on it. Every number here points at a generated file; nothing is restated from a repository README.

이 노트는 **한 벌로 묶은 버전 조합**([매니페스트](manifest.md))이 무엇이고, 그 조합에서 **무엇이 실제로 확인됐는지**를 한 장에 모읍니다. 자세한 것은 각 문서로 이어집니다.

## 1. 이 릴리즈가 고정하는 것

| 무엇 | 값 | 어디서 |
|---|---|---|
| 시스템 | 13개(HIS · 공개 홈페이지 · 환자 앱 · sign · LIS · ERP · PACS · AI Server · twin · cerno · edu · Clinic · Jitsi) | [매니페스트](manifest.md) |
| 저장소 | 11개(공개 홈페이지 · 환자 앱은 HIS 저장소 안) | [기준 커밋](../../data/base-commits.json) |
| 기준 커밋 | 2026-09-11 고정 — 저장소에 새 커밋이 생겨도 이 초안은 고정을 옮기기 전까지 바뀌지 않습니다 | 같은 곳 |
| 연결 | 113개를 실었습니다(시스템 담당 확인을 기다리는 7개는 싣지 않음) | [연결 상태](compatibility.md) |
| 계측 | 규모 수치는 하루에 한 번에 센 스냅샷 | [`data/scale-snapshot.json`](../../data/scale-snapshot.json) |

## 2. 이 조합에서 실제로 확인된 것

2026-09-13~16 에 **기준 커밋으로 새 설치본을 세워** 시스템 사이를 직접 불러 봤습니다(개발 PC 한 대 · 외부로 나가지 못하는 네트워크 · 가상 병원 데이터 · 운영 서버 호출 없음).

| 무엇 | 수 |
|---|---|
| 새로 세운 설치본 | **7개** — HIS · sign · LIS · PACS · ERP · edu · AI Server |
| 실제 호출로 확인한 연결(`검증됨` · 확인일 있음) | **27 / 113**(2026-09-14~15) |
| 그중 결함을 일부러 넣어 가드까지 확인한 것 | **23** |
| 일부만 확인해 상태를 올리지 않은 연결 | 8 |
| 코드만 맞물린 연결(`구현·미검증`) | 61 |
| 구축 가이드의 `확인 필요(따라가기)` | 92 → **60** |

자세한 기록: [따라가 본 결과](../../build-guide/follow-along-2026-09.md) · 연결별 확인일: [연결 상태](compatibility.md)

## 3. 시스템별 요약

각 시스템의 이번 판본에서 달라진 것 · 규모 · 연동 · 한계는 [시스템별 요약 13장](systems/)에 있습니다. 모두 같은 틀([공통 틀](../SYSTEM-SUMMARY-TEMPLATE.md))로 새로 썼고, 저장소 릴리즈 기록을 그대로 옮기지 않았습니다.

## 4. 구축 기관이 이 릴리즈에서 알아야 할 것

- **`구현·미검증` 은 "동작한다"는 뜻이 아닙니다.** 양쪽 코드가 맞물려 있다는 뜻입니다. 쓰려는 연결은 리허설에서 기관이 직접 확인합니다.
- **설치 파일이 그대로 서지 않는 시스템이 있습니다.** 따라가기에서 필요했던 우회는 각 단계 장에 적었습니다 → [구축 가이드](../../build-guide/).
- **AI 는 기준 장비에서 재지 않았습니다.** 처리량 · 응답 시간 · 품질 수치는 이 릴리즈에 없습니다.
- **리얼 전환 뒤에야 확인되는 경로가 있습니다.** 리허설에서 보류된 발송은 전환 순간 나갑니다 → [S8](../../build-guide/S8-go-real.md).
- **규제 표기는 `대응 설계` 단계입니다.** 외부 인증·승인은 증빙 번호가 있을 때만 적습니다.
- **제3자 조건**(서버 · 모델 가중치 · 코드 마스터)은 MIT 가 덮지 않습니다 → [THIRD_PARTY](../../THIRD_PARTY.md).

## 5. 아직 정하지 않은 것

| 무엇 | 누가 정하나 |
|---|---|
| 릴리즈 번호 체계와 자르는 주기 | 생태계 자료 측 사람 결정 |
| 소스 압축본 첨부 여부 · 저장소 외 발행 형식(PDF · 웹) | 같음 |
| 각 시스템 담당의 **사실 확인** | 시스템 담당 — 확인되면 "시스템 담당 확인 전" 표시가 빠지고, 싣지 않은 연결 7개가 표에 들어옵니다 |
| 각 소스 저장소의 라이선스 표기 정리(MIT 목표) | 각 저장소 |
| 기준 커밋을 언제 옮길지 | 생태계 자료 측 — 옮기면 스냅샷 · 매니페스트 · 연결 표 · 요약을 다시 만듭니다 |

## 6. 이 릴리즈를 다시 만드는 법

```bash
node tools/measure-scale.mjs          # 규모 스냅샷(기준 커밋 내용만 읽음)
node tools/build-manifest.mjs         # 매니페스트
node tools/extract-checklist.mjs      # 체크리스트 3종
node tools/extract-his-nav.mjs        # HIS 메뉴
node tools/build-diagrams.mjs         # 도식·연결 지도
node tools/build-integration-map.mjs  # 연동 매트릭스
node tools/verify-all.mjs             # 발행 전 검사 21개 — 전부 통과해야 올립니다
```
