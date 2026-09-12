# LIS 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [LIS 시스템 구성서](../systems/lis.md)
> 계층 임상 부서 · 버전 `1.56.18` · 구현 상태 `파일럿` · 화면 41 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Laboratory information system. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

진단검사 · 미생물 · 병리 · 수혈 · 유전체 검사정보시스템입니다. HIS 의 검사 오더를 FHIR R4 로 가져가고, 결과를 확정해 되돌려 보냅니다.

## 화면

![LIS 대시보드 — 연계 상태와 시스템 알림](../assets/screens/lis-dashboard.png)

LIS 는 **연계 상태를 대시보드 맨 위에** 둡니다 — `HIS FHIR 연동` · `PACS 연동` · `오더 폴링 ON` · `Reflex 폴링 ON`. 화면이 그 아래 한 줄을 답니다: **"연동이 꺼져 있으면 자격증명 설정(운영자) 확인이 필요합니다."**

그 옆에 Reflex 양방향 오더 상태(승인 · 거절 · 반려취소 · `REJECTED_KEPT`)가 서고, 아래에 **위험치(Panic) 통보 대기**와 시스템 알림이 있습니다. 이 설치본의 알림에는 **MDRO 검출**(CRE · MRSA — 격리 필요) · **법정감염병 신고 대상**(결핵 PCR 검출) · QC 위반(Westgard 규칙 — **결과 확정 차단**) · 위탁 지연이 떠 있고, **연계 운영 이상**(DLQ 격리 · 오더 폴링 정체 · 위험치 통보 미확인)도 한 줄로 요약됩니다.

![LIS 검증 워크리스트 — 위험치와 QC 실패](../assets/screens/lis-verify-worklist.png)

자동검증에서 **보류된 결과만** 사유 우선순위로 올라옵니다(위험치 · 델타 · QC 비수치 · 위탁 회신). 행마다 검체 · 검사 · 결과 · **판정 배지**(`HH` · `LL` · `N`)가 붙고, `2차검증 확정` 으로 닫습니다. 화면이 그 결과를 미리 알립니다 — **"확정 시 HIS 알림 · 리플렉스가 실행됩니다."**

> 👤 **LIS 는 목록에서 환자 이름을 스스로 가립니다**(김\*수 · 리\*\*\*자). 검사실 화면에 이름 전체가 필요하지 않다는 판단입니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 lis-1 | 결과 검증 — 자동 검증 · 델타 체크 · 2차 검증 | `lis-result-verify.png` | ⬜ |
| 📷 lis-2 | 위험치 통보와 복창 기록 | `lis-critical-value.png` | ⬜ |
| 📷 lis-3 | 검체 접수와 진행 상태 | `lis-specimen.png` | ⬜ |
| 📷 lis-4 | 병리 — 슬라이드와 스캔 워크리스트 | `lis-pathology.png` | ⬜ |
| 📷 lis-5 | 수혈 — 출고 전 동의 확인 | `lis-transfusion.png` | ⬜ |

## 알아 둘 것

🔴 **검사 분석기 → LIS 결과 자동 수집(ASTM E1394)이 `미구현`입니다.** 결과 파일 입력 · 수기 입력 또는 인터페이스 중계 장치를 씁니다.

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [LIS 시스템 구성서](../systems/lis.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
