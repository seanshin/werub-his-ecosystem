# 5. 신원 · 신뢰 · 표준

> 🟡 초안 — 시스템 담당 확인 전 · **새 설치본 따라가기 1차 완료**(2026-09-13~16) · 기준: [RELEASES/draft 매니페스트](../RELEASES/draft/manifest.md)
> [개요서 목차](README.md) · ← [4. 환자 한 명의 여정](04-patient-journey.md) · 다음 → [6. AI 는 한 곳에서, 판단은 사람이](06-ai.md)

> **EN** — Three things must line up for thirteen systems to behave like one hospital: **who this person is**, **whether this document can be trusted**, and **whether the systems speak the same language**. Staff identity is issued once by the HIS and verified by the others in three different ways — public-key verification (five systems), a shared secret (two, which means key management becomes the institution's job), and a scoped API key (one). Trust — certificates, RFC 3161 timestamps, PAdES-LTA signatures, append-only audit chains — is concentrated in sign. Standards (FHIR R4, SMART on FHIR, CDS Hooks, DICOM, DICOMweb, HL7 v2) carry what they can, but **many connections are plain HTTPS REST or webhooks**, and every row says which it is.

---

시스템이 13개여도 한 병원처럼 움직이려면 세 가지가 맞아야 합니다.

| 질문 | 답하는 장치 | 도식 |
|---|---|---|
| **이 사람은 누구인가** — 직원 한 명이 여러 시스템에서 같은 사람으로 통하는가 | 신원 허브(HIS) | [④ 신원 허브](../diagrams/identity-hub.md) |
| **이 문서는 믿을 만한가** — 누가 · 언제 · 무엇에 서명했고, 그 뒤로 바뀌지 않았는가 | 신뢰의 사슬(sign) | [⑤ 신뢰의 사슬](../diagrams/trust-chain.md) |
| **서로 같은 말을 쓰는가** — 시스템끼리, 그리고 기관이 이미 쓰는 장비 · 시스템과 | 표준 층 | [⑥ 표준 층](../diagrams/standards.md) |

연결 상태는 모두 [연결 상태](../RELEASES/draft/compatibility.md)에서 옮겼습니다(코드 대조 2026-09-11 · 그중 27개는 새 설치본끼리 실제로 불러 확인 2026-09-14~15).

---

## 신원 — 직원 한 명의 신원은 HIS 한 곳에서

직원은 HIS 에 로그인합니다. **HIS 가 직원 로그인 토큰을 발급하고**, 형제 시스템은 그 토큰을 검증해 같은 사람으로 받아들입니다. 검증 방식은 시스템마다 세 가지로 나뉩니다.

| 방식 | 시스템 | 기관이 알아 둘 것 |
|---|---|---|
| **공개키로 검증** | sign · PACS · edu · twin · cerno (5곳) | HIS 가 게시한 공개키 목록으로 검증하므로 비밀값을 나눠 가질 필요가 없습니다. twin · cerno 는 차트에서 앱을 여는 SMART on FHIR 흐름 안에서 이 신원을 받습니다 |
| **공유 비밀키로 검증** | ERP · Jitsi (2곳) | HIS 와 상대 시스템이 같은 비밀키를 가집니다. **키 관리가 따로 필요합니다** — 양쪽에 같은 값으로 두고 함께 교체합니다 |
| **API 키로 연결** | Clinic (1곳) | Clinic 이 범위를 지정한 API 키를 발급하고, HIS 가 그 키로 Clinic 을 부릅니다 |

근거: [README 「지금 알고 시작해야 할 것」](../README.md#지금-알고-시작해야-할-것) · [신원 허브 도식](../diagrams/identity-hub.md).

**입사부터 퇴사까지** — HIS 가 직원 정보의 정본이라, 입사 · 변경 · 퇴직이 HIS 에서 형제 시스템으로 전해집니다. 예를 들어 edu 는 HIS 의 직원 이벤트 웹훅을 받고(`구현·미검증`), Clinic 은 HIS 의 직원 일괄 등록을 받습니다(`구현·미검증`). 따라가기에서는 HIS ⇄ edu 의 직원 SSO · 공개키 조회 · 직원 명부 · 이수 기록을 실제로 불러 확인했습니다(`검증됨` · 2026-09-14).

**기관에게 의미하는 것**

- 직원 계정 · 역할을 **HIS 한 곳에서** 관리합니다. 형제 시스템마다 계정을 따로 만들고 지우는 일을 줄입니다.
- 반대로 HIS 가 멈추면 HIS 신원에 기대는 형제 시스템의 로그인도 영향을 받습니다(예: edu 는 로그인이 HIS SSO 뿐이라 HIS 없이 따로 쓸 수 없습니다 — [edu 요약](../RELEASES/draft/systems/edu.md)). HIS 의 가용성과 키 관리가 생태계 전체의 기반입니다([2장 취지 4](02-principles.md#4-정본은-하나)).
- 연결별 토큰 대상 · 교환 경로 같은 세부는 이 개요서가 다루지 않습니다. [연동 계약 지도](../integration/)(인증 3방식 · 개통 게이트 · 연결 순서)와 각 [시스템 구성서](../systems/)를 봅니다. 운영 보안 점검은 기관이 설치 형태에 맞춰 따로 합니다.

---

## 신뢰 — 서명 · 인증서 · 타임스탬프는 sign 한 곳에서

"**누가 · 언제 · 무엇에** 서명했고, 그 뒤로 **바뀌지 않았다**"를 제3자가 검증할 수 있게 하는 구조입니다. 전자서명 · 인증서 · 타임스탬프 · 감사 해시체인은 모두 **sign** 이 만들고, 다른 시스템은 서명 요청과 감사 이벤트를 sign 에 보냅니다.

| 질문 | 장치 |
|---|---|
| 누가 | 자체 PKI — 서명자별 X.509 인증서를 sign 한 곳에서 발급 |
| 무엇에 | 전자서명 — PDF 는 PAdES-LTA(검증 자료를 PDF 안에 넣어 인증서 만료 뒤에도 검증 가능) |
| 언제 | RFC 3161 타임스탬프 — 공인 타임스탬프 기관을 계약하면 주소 설정으로 바꿀 수 있게 짜여 있음 |
| 바뀌지 않았다 | 추가만 되는 감사 해시체인 — 체인 머리를 타임스탬프로 봉인(앵커) |

**sign 을 부르는 시스템과 연결 상태**

| 방향 | 목적 | 상태 |
|---|---|---|
| HIS → sign | 동의서 · 발급 문서 · ERP 계약의 서명 요청, 직원 · 환자 인증서 발급 | `구현·미검증` — 직원 신원 · 서명은 `검증됨`(2026-09-14)이고, HIS 화면 경로의 서명요청 제출은 따라가기에서 끝까지 가지 못했습니다 |
| PACS → sign | 판독보고서 판독의 본인 서명 · 영상 · 조영제 동의서 환자 서명 | `검증됨`(2026-09-15) |
| edu → sign | 법정교육 이수증 봉인 | `검증됨`(2026-09-15) |
| ERP → sign | 외부 거래처 계약 전자서명 | `검증됨`(2026-09-15) |
| HIS → sign | 감사 이벤트 — 오더 서명 로그 · 거버넌스 결정을 sign 스트림에 봉인 | `검증됨`(2026-09-14) |
| ERP → sign | 감사 이벤트 — 자금 결재 등 | `구현·미검증` |
| Clinic → sign | 감사 이벤트 — 그룹웨어 전자결재 문서 | `구현·미검증` |

이 밖에 sign 이 서명 완료를 알리는 웹훅(sign → HIS · ERP · edu)이 있고(셋 다 `검증됨` · 2026-09-14~15), ERP → sign 의 일반 전자계약 API 는 `미구현`입니다([연결 상태](../RELEASES/draft/compatibility.md) ERP ⇄ sign).

**기관이 준비하는 것** — README 가 밝힌 대로, 기준 버전은 인증 기관 키를 **소프트웨어로 보관**합니다(하드웨어 보안 모듈 미적용). 하드웨어 보안 모듈 · 공인 타임스탬프 기관 연결 · 본인확인 사업자 연동은 구축 기관이 준비합니다. **전자서명의 법적 효력 판단은 구축 기관과 법무가 합니다.** 이 개요서는 구조를 설명할 뿐 법적 효력이나 인증을 말하지 않습니다([S4](../build-guide/S4-trust.md)).

**순서에 관한 조언** — 동의서(HIS) · 판독(PACS) · 이수증(edu) · 계약(ERP)이 모두 sign 을 부르므로, 서명을 쓰는 단계보다 sign 을 먼저 세우는 편이 순서가 꼬이지 않습니다([구축 가이드](../build-guide/README.md#단계)).

---

## 표준 — 가능한 한 국제 표준으로

시스템끼리 붙는 말은 가능한 한 국제 표준으로 맞췄습니다. 그래서 이미 쓰는 시스템(예: 기존 PACS)을 바꿔 끼울 수 있습니다. 다만 모든 연결이 표준 프로파일은 아닙니다. 연결 표의 상당수는 전용 HTTPS REST(JSON) · 웹훅입니다.

| 층 | 표준 | 어디에 쓰나(대표) | 상태 |
|---|---|---|---|
| 임상 앱 · 의사결정 지원 | SMART on FHIR | 차트에서 twin · cerno 열기(EHR launch) | `구현·미검증` |
| | CDS Hooks | 차트 열람 시 twin 위험 카드 | `구현·미검증` |
| 임상 자원 교환 | FHIR R4 | HIS ⇄ LIS 검사 오더 · 결과 · 취소 전파 | `검증됨`(2026-09-14~15) |
| | | HIS ⇄ LIS Reflex, twin · cerno 의 환자 맥락 읽기 · write-back | `구현·미검증` |
| 영상 | DICOM(DIMSE · MWL · MPPS) | PACS ⇄ 촬영 장비 · 외부 PACS | `구현·미검증` |
| | DICOMweb | LIS → PACS 병리 영상 도착 확인 · 뷰어 링크 | `검증됨`(2026-09-15) |
| | | HIS → PACS 영상 바이트 중계 | `판정 불가` |
| | IHE XDS-I.b | PACS → 외부 영상 문서 저장소 제출 | `구현·미검증` |
| | IHE PIX(HL7 v2 ADT) | HIS → PACS 환자 인구정보 · 병합 | `미구현` |
| 메시지 · 장비 | HL7 v2(MLLP) | LIS → PACS 병리 스캔 워크리스트 | `검증됨`(2026-09-15) |
| | | LIS · PACS → HIS 결과 · Reflex 오더, HIS → LIS 처방(대체 경로) | `미구현` |
| | ASTM E1394 | 검사 분석기 → LIS 결과 자동 수집 | `미구현` |
| 코드 체계 | LOINC · SNOMED CT · KCD | 시스템 안의 코드 · 매핑으로 씀(연결 표의 프로토콜 칸에는 나오지 않음) | — |

근거: [표준 층 도식 「표준별 연결」](../diagrams/standards.md#표준별-연결).

**기관에게 의미하는 것**

- **FHIR R4 주 경로(HIS ⇄ LIS 검사 오더 · 결과 · 취소)는 새 설치본끼리 실제로 불러 확인했습니다**(`검증됨` · 2026-09-14~15). **DICOM 쪽은 양쪽 코드가 맞물려 있는 단계**입니다(`구현·미검증` — 촬영 장비와의 연결은 기관이 리허설에서 확인합니다).
- **HL7 v2 쪽은 경로 몇 개(검사 결과 · 처방 대체 경로, 판독 결과 송신, 환자 인구정보)가 `미구현`입니다.** HL7 v2 로만 말하는 기존 검사 장비 · 시스템이 있다면 S3 에서 연결 방식을 먼저 확인합니다([S3](../build-guide/S3-clinical-departments.md)).
- **검사 분석기 자동 수집은 `미구현`입니다.** 장비 결과를 자동으로 받아야 하는 기관은 대체 수단을 준비합니다.
- **코드 체계는 기관이 받아 옵니다.** 코드 마스터는 이 저장소에도 소스에도 없습니다. KCD 는 제9차 개정이 2026-01-01 부터 시행 중인데 기준 버전 코드의 표기는 제8차입니다. SNOMED CT 는 국가 배포 센터에 사용 등록이 필요하다고 원문이 적습니다([THIRD_PARTY §4](../THIRD_PARTY.md#4-코드-마스터기준-데이터) · [9장](09-terms.md)).

---

← [4. 환자 한 명의 여정](04-patient-journey.md) · 다음 → [6. AI 는 한 곳에서, 판단은 사람이](06-ai.md)
