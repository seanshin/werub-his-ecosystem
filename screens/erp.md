# ERP 화면

> 🟡 **초안 — 캡처 넣는 중** · [화면 소개 목차](README.md) · [ERP 시스템 구성서](../systems/erp.md)
> 계층 경영 · 버전 `1.287.3` · 구현 상태 `파일럿` — 문서마다 표기가 엇갈려 재확인 대상 · 화면 113 · 기준: [통합 릴리즈 초안](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

**EN** — Enterprise resource planning. Screens are captured on **synthetic hospital data**; institution-identifying information, secrets and infrastructure details are masked before publication ([capture rules](../assets/screens/README.md)).

---

## 무엇을 하는 화면인가

재무회계 · 원가 · 인사급여 · 자재 · 보험청구 · 세무. HIS 의 수납 이벤트가 전표로 들어오고, 진료비 계산서의 산정값을 HIS 에 돌려줍니다.

## 화면

![병원 ERP 대시보드](../assets/screens/erp-dashboard.png)

오늘 마감 · 연동 실패(DLQ) · 결제 · **사전심사 미처리** · 세금계산서 · 결재 대기 · **법정기한 임박** · 간호등급이 위에 서고, 아래에 최근 알림(정기업무 지연 · 결제 슬롯 점유 임계 초과) · **이의신청 기한 임박** · **삭감 통계(진료과별 건수와 삭감액, 자동 매칭률)** · 안전재고 경고 · **재무 건전성**(유동비율 · 부채비율 · 의료이익률 · 당기순이익) · IT 구독 비용이 놓입니다.

> 이 설치본은 HIS 와 **같은 주소 아래 `/erp/` 경로**로 열립니다. [시스템 구성서](../systems/erp.md)의 배포 형태와 함께 봅니다.

## 캡처 자리

| # | 담을 화면 | 파일 | 상태 |
|---|---|---|---|
| 📷 erp-1 | 청구 사전심사 — 고시 근거와 삭감 위험 보조 | `erp-claim-precheck.png` | ⬜ |
| 📷 erp-2 | 진료비 산정과 계산서 | `erp-billing.png` | ⬜ |
| 📷 erp-3 | 회계 전표와 결산 | `erp-accounting.png` | ⬜ |
| 📷 erp-4 | 자재 · 재고 | `erp-inventory.png` | ⬜ |

## 알아 둘 것

청구 사전심사에서도 **신고 금액 확정은 AI 에 넘기지 않습니다.** BI 도구(Grafana · Metabase)는 AGPL 계열이라 별도 compose 로 선택해 붙입니다([THIRD_PARTY](../THIRD_PARTY.md)).

- 이 시스템이 다른 시스템과 실제로 맞물리는지는 [연결 상태](../RELEASES/draft/compatibility.md)에서 봅니다 — **`검증됨` 0**(판정 2026-09-11 · 코드 대조 · 실제 호출 확인 없음).
- 설치 요구사항 · 주요 설정 · 한계는 [ERP 시스템 구성서](../systems/erp.md)에 있습니다.
- 캡처를 넣는 규칙은 [캡처 안내](../assets/screens/README.md), 사람 확인은 [캡처 대장](../assets/CAPTURE-LEDGER.md)에 있습니다.
