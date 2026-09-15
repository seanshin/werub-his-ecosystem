<!-- 생성물 — 직접 수정 금지. `node tools/build-integration-map.mjs` 로 다시 만듭니다. -->

# 연동 매트릭스

> 자동 생성 — 손으로 고치지 않습니다. [연결 상태 표](../RELEASES/draft/compatibility.md)가 바뀌면 다시 만듭니다.

연결을 **시스템 쌍** · **프로토콜** 두 축으로 다시 셉니다. 각 연결의 방향 · 목적 · 프로토콜 · 상태는 연결 상태 표에 있고, 여기서는 **어디에 무엇이 몰려 있는지**를 봅니다.

| 기준 | 값 |
|---|---|
| 원본 | [연결 상태 표](../RELEASES/draft/compatibility.md)(코드 대조 2026-09-11 · 새 설치본 실호출 확인 26) |
| 실은 연결 | 113 |
| 시스템 쌍 | 33 |

## 시스템 쌍별

| 쌍 | 연결 | 검증됨 | 구현·미검증 | 설계만 | 미구현 | 중단 | 판정 불가 |
|---|---:|---:|---:|---:|---:|---:|---:|
| HIS ⇄ ERP | 15 | 6 | 8 | · | 1 | · | · |
| HIS ⇄ LIS | 13 | 5 | 4 | · | 4 | · | · |
| HIS ⇄ Clinic | 12 | · | 10 | · | 1 | · | 1 |
| HIS ⇄ PACS | 11 | · | 7 | · | 3 | · | 1 |
| HIS ⇄ edu | 7 | 4 | 2 | · | 1 | · | · |
| HIS ⇄ twin | 6 | · | 6 | · | · | · | · |
| HIS ⇄ AI Server | 5 | · | 4 | · | 1 | · | · |
| ERP ⇄ sign | 4 | 2 | 1 | · | 1 | · | · |
| HIS ⇄ sign | 4 | 3 | 1 | · | · | · | · |
| HIS ⇄ Jitsi | 3 | · | · | · | · | 3 | · |
| LIS ⇄ PACS | 2 | 2 | · | · | · | · | · |
| PACS ⇄ sign | 2 | 1 | 1 | · | · | · | · |
| edu ⇄ sign | 2 | 2 | · | · | · | · | · |
| Clinic ⇄ ERP | 2 | · | 1 | · | 1 | · | · |
| AI Server ⇄ PACS | 2 | · | 1 | · | 1 | · | · |
| AI Server ⇄ ERP | 2 | · | 2 | · | · | · | · |
| AI Server ⇄ Jitsi | 2 | · | · | · | · | 2 | · |
| HIS ⇄ cerno | 2 | · | 2 | · | · | · | · |
| Clinic ⇄ edu | 2 | · | 2 | · | · | · | · |
| HIS ⇄ 공개 홈페이지 | 2 | · | 2 | · | · | · | · |
| 검사 장비 ⇄ PACS | 1 | · | 1 | · | · | · | · |
| 외부 PACS ⇄ PACS | 1 | · | 1 | · | · | · | · |
| 외부 XDS-I.b 저장소 ⇄ PACS | 1 | · | 1 | · | · | · | · |
| 검사 장비 ⇄ LIS | 1 | · | · | · | 1 | · | · |
| Clinic ⇄ sign | 1 | · | 1 | · | · | · | · |
| ERP ⇄ LIS | 1 | 1 | · | · | · | · | · |
| AI Server ⇄ twin | 1 | · | 1 | · | · | · | · |
| AI Server ⇄ cerno | 1 | · | 1 | · | · | · | · |
| AI Server ⇄ edu | 1 | · | 1 | · | · | · | · |
| HIS ⇄ Clinic · Jitsi | 1 | · | · | 1 | · | · | · |
| 환자 앱 ⇄ Jitsi | 1 | · | · | · | · | 1 | · |
| Clinic ⇄ Jitsi | 1 | · | · | · | · | 1 | · |
| HIS ⇄ 환자 앱 | 1 | · | 1 | · | · | · | · |
| **합계** | **113** | 26 | 62 | 1 | 15 | 7 | 2 |

> `검증됨` 26 — 기준 커밋으로 새로 세운 설치본끼리 실제로 호출해 확인한 연결(확인일은 연결 상태 표의 확인일 칸).

## 시스템별 — 몇 개의 연결에 걸려 있나

| 시스템 | 걸린 연결 | 보내는 쪽 | 받는 쪽 |
|---|---:|---:|---:|
| HIS | 80 | 41 | 39 |
| ERP | 24 | 16 | 8 |
| PACS | 20 | 10 | 10 |
| Clinic | 18 | 8 | 10 |
| LIS | 17 | 12 | 5 |
| AI Server | 14 | 0 | 14 |
| sign | 13 | 3 | 10 |
| edu | 12 | 8 | 4 |
| twin | 7 | 4 | 3 |
| Jitsi | 7 | 2 | 5 |
| cerno | 3 | 2 | 1 |
| 공개 홈페이지 | 2 | 2 | 0 |
| 검사 장비 | 2 | 1 | 1 |
| 환자 앱 | 2 | 2 | 0 |
| HIS 환자 포털 | 1 | 1 | 0 |
| HIS 웹 | 1 | 1 | 0 |
| 외부 PACS | 1 | 0 | 1 |
| 외부 XDS-I.b 저장소 | 1 | 0 | 1 |
| Clinic · Jitsi | 1 | 0 | 1 |

> 한 연결이 두 시스템에 각각 한 번씩 걸립니다(합계가 연결 수의 두 배).

## 프로토콜별

| 묶음 | 연결 | 검증됨 | 구현·미검증 | 미구현 | 중단 | 판정 불가 | 설계만 |
|---|---:|---:|---:|---:|---:|---:|---:|
| FHIR R4 | 9 | 4 | 5 | · | · | · | · |
| DICOM | 3 | 1 | 2 | · | · | · | · |
| HL7 v2 | 6 | 1 | · | 5 | · | · | · |
| ASTM | 1 | · | · | 1 | · | · | · |
| HTTPS REST | 52 | 11 | 31 | 7 | 2 | 1 | · |
| 웹훅 | 8 | 3 | 5 | · | · | · | · |
| 인증·SSO | 10 | 1 | 5 | 1 | 2 | · | 1 |
| 그 밖 | 24 | 5 | 14 | 1 | 3 | 1 | · |

- 묶음은 연결 상태 표의 **프로토콜 칸 문자열**에서 기계적으로 나눈 것입니다(`FHIR` · `HL7` · `DICOM`/`DIMSE`/`MWL`/`MPPS` · `ASTM` · `SMART`/`OAuth`/`SSO`/토큰 · 웹훅 · 그 밖의 HTTP). **표준 프로파일을 쓴다는 인증이 아닙니다.**
- `HTTPS REST` 가 많은 것은 **표준 프로파일보다 전용 API 로 붙은 연결이 많다**는 뜻입니다 → [취지 6](../overview/02-principles.md#6-도메인마다-독립-시스템-표준으로-연결)

## 미구현 · 중단 · 판정 불가 — 대체 수단이 필요한 연결

| 방향 | 목적 | 상태 |
|---|---|---|
| ERP → HIS | 재고 입고(inventory·CSSD supply)·자산 코드 매핑·청구 심사결과 콜백·환자 조회 — HIS 가 받을 준비만 된 경로들 | `미구현` |
| LIS → HIS | 검사 결과 HL7 ORU^R01 전송(MLLP) — 대체 경로 | `미구현` |
| HIS → LIS | 검사 처방 HL7 OML^O21 수신(LIS inbound) — 대체 경로 | `미구현` |
| LIS → HIS | Reflex 추가검사 오더 HL7 ORM^O01(MLLP) — HIS_ORDER_TRANSPORT=ORM 선택 시 | `미구현` |
| HIS → LIS | Reflex 승인·반려 웹훅(HIS→LIS push · 폴링 대안) | `미구현` |
| Clinic → HIS | 병원 서비스(hospital-web)의 워크그룹(의사 일정·수술·병동·투약·근무)·동선(층·구역·흐름) 데이터 — 메인앱 `/api/clin… | `판정 불가` |
| HIS → Clinic | HIS → Clinic 열람 SSO 티켓(재로그인 없이 Clinic 결재 문서 열람) | `미구현` |
| HIS → PACS | WADO 영상 바이트 중계(판독 워크스테이션 · 화면이 PACS 를 직접 부르지 않게) | `판정 불가` |
| PACS → HIS | 판독 결과 HL7 ORU^R01 송신 | `미구현` |
| HIS → PACS | 환자 외부 영상(DICOM) 업로드 멀티파트 중계 | `미구현` |
| HIS → PACS | 환자 인구정보·병합 HL7 ADT(IHE PIX Feed ITI-8 · Query ITI-9) | `미구현` |
| edu → HIS | edu → HIS 직원 인앱 알림 인입 | `미구현` |
| HIS → AI Server | 관리 화면 모델 레지스트리 — 상류 설치 모델 목록 대조(요구 태그 누락 판정) | `미구현` |
| ERP → sign | 일반 전자계약(sign contracts API — 템플릿·주소록·발송) | `미구현` |
| HIS → Jitsi | 원격진료 화상 입장(의료진) — HIS 가 Jitsi JWT 를 직접 서명(의사=모더레이터) → 웹이 `NEXT_PUBLIC_JITSI_UR… | `중단` |
| HIS 환자 포털 → Jitsi | 환자 화상 입장 — 원격진료(portal patient-token)·원격협진(remote-consult video/token)·상담(cons… | `중단` |
| HIS 웹 → Jitsi | 원격진료 녹화 목록·메모·삭제·다운로드(Jitsi API `/meet-api/recordings*`) | `중단` |
| ERP → Clinic | 그룹웨어 근태(출퇴근) 수집 → 월 근태 집계 | `미구현` |
| PACS → AI Server | AI 서버 가용성 감시(30분 주기 프로브 · 상태 전이 알림) | `미구현` |
| Jitsi → AI Server | 원격 상담 녹화 회의록 자동 분석(서명 URL 제출 · 콜백 · 상태) | `중단` |
| Jitsi → AI Server | 원격 상담 실시간 자막(STT 청크) · 자막 번역 | `중단` |
| 검사 장비 → LIS | 장비 결과 자동 수집(ASTM E1394 레코드 · 계기 CSV) → 코드 매핑 → 자동 평가 파이프라인 | `미구현` |
| HIS → Clinic · Jitsi | HIS 내부 IdP 단기 토큰(audience 'clinic'·'jitsi' · 경로 B redemption code 백채널 교환 · int… | `설계만` |
| 환자 앱 → Jitsi | 환자 앱 원격진료 입장 — 대기실 입장 기록(PATCH portal/telehealth/:id/join) 후 Jitsi URL 을 외부 열기 | `중단` |
| Clinic → Jitsi | W.Channel 회의 녹화 제어·녹화 스트림·회의 분석(Jitsi API) | `중단` |

## 다시 만들기

```sh
node tools/build-integration-map.mjs          # 다시 만들기
node tools/build-integration-map.mjs --check  # 연결 상태 표와 같은지 확인만
```
