# 캡처 대장

이미지 속 글자는 문자열 검사로 볼 수 없습니다. 저장소에 올리는 모든 이미지(스크린샷·PDF)는 여기에 한 줄씩 적고, 사람이 **기관 식별 정보·비밀값·서버 정보가 없음**을 확인한 뒤 `확인` 을 표시합니다. 이 표에 `확인` 이 없는 이미지는 공개 검사기가 "미확인"으로 보고합니다.

| 파일 | 내용 | 데모 병원명 사용 | 확인 |
|---|---|---|---|
| `assets/screens/his-care-command-center.png` | HIS 통합 상황판(`/command-center`) — 지표 카드 · 조치 필요 · 부서 보드 · 원내 여정 | 아니오(병원명 그대로 — 가상 병원이라는 확인 2026-09-12) | 확인 (2026-09-12) |
| `assets/screens/flow-onboarding-01-login.png` | HIS 로그인 화면 — 브랜드 패널(인증 대응 · 모듈 · AI · 보안) · 로그인 폼 · 진입 버튼 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 테스트 계정 목록 · 자동완성 팝업 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-onboarding.png` | 신규 입사자 관리(`/admin/onboarding`) — 입사예정자 등록 → 초대 발급 → 서류·계약·활성화 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-staff-management.png` | 직원 관리(`/admin/staff-management`) — 직원 목록 · 조직도 · 직원 등록 · Clinic 연동 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 직원 이메일 열 **가림**(기관 도메인) | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-rbac.png` | 역할 권한(`/admin/rbac`) — 권한 × 역할 14 매트릭스 · **판정 43/63** · 미집행 표시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-ops-admin-identity.png` | 인증 관리 콘솔(`/admin/identity`) — 직원 102 · 미등록 100 · 인증서 활성 0 · 승인 대기(4-eyes) 3 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-care-teams.png` | 의료팀 편성(`/admin/care-teams`) — 외래 · 입원 · 응급 탭(데이터 없음 · 구조만) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-opening.png` | 개원·운영 단계(`/admin/opening`) — 국가 축(KR · AE) · 기본값 출처 표시 · 항목별 `기록 없음` | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-go-live.png` | 운영 전환 관제(`/admin/go-live`) — 준비도 32% · **전환을 막는 항목 21** · 크리티컬 패스 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 보안 점검 항목 한 줄 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-decisions.png` | 중요 결정(`/admin/decisions`) — 세 층 · 결정 대상 61 중 기록 0 · 개시 전 필수 0/15 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-sqe.png` | 자격·교육 SQE(`/admin/sqe`) — 등록 자격 0 · **표본 0 기준이라 안전을 의미하지 않는다** 명시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-access-control.png` | 접근 권한 관리(`/admin/access-control`) — 부서별 메뉴 · 역할별 데이터 · 외부 시스템 · 기능 접근 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-blockchain-cert.png` | sign 전자서명 인증서 현황(`/admin/blockchain-cert`) — 발급 serial **미러(읽기전용)** · 직원 29/102 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 인증서 일련번호 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-break-glass.png` | 응급 접근 사후 검토(`/admin/break-glass`) — 시간제한 토큰의 의무 사후 검토 · 미검토 1건 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/flow-onboarding-my-certificate.png` | 내 전자서명 인증서(`/settings/my-certificate`) — **보유 여부를 표시하지 못한다(미발급이라는 뜻이 아니다)** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-ops-admin-staff-devices.png` | 생체등록·기기 관리(`/admin/staff-devices`) — 직원 102 역할별 · 기기 등록 상태 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 이메일 한 줄 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-outbound-channels.png` | 대외 발신 관제(`/admin/outbound-channels`) — 통로 6 중 실제 발신 2 · 푸시 4종 중 0종 · SMS 조건 0/3 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-safety-gates.png` | 안전 게이트 관제(`/admin/safety-gates`) — 끔/경고/차단 · **BLOCK 인데 평가 모집단 미상** 판정 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-ai-oversight.png` | AI 감독 관제(`/admin/ai-oversight`) — 비율 전부 `산출 불가` · 호출 지연 실측(표본 12) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-config.png` | 시스템 설정(`/admin/config`) — 전역 구성 파라미터 키·값 · 「값이 어디서 왔는지 함께 표시」 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-ai-settings.png` | 시스템 설정(`/admin/ai-settings`) — AI 서버 연결 · 브리핑 스위치 · **진료 보조 스킬 실측** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 AI 서버 주소 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-order-sign-logs.png` | 오더 서명 로그(`/admin/order-sign-logs`) — 봉인 5201/5201 · 미기록 취소 10 · 복원 불가 63 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/flow-onboarding-02-role-doctor.png` | 역할 비교 ② **의사** — 같은 통합 상황판 · 접수/외국인등록 없음 · 「의사 진료 매뉴얼」 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/flow-onboarding-03-role-nurse.png` | 역할 비교 ③ **간호사** — 접수·외국인등록 있음 · 「간호 매뉴얼」 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/flow-onboarding-04-role-executive.png` | 역할 비교 ④ **경영진** — 첫 화면이 `/executive` 경영 대시보드로 바뀜 · 메뉴 축소 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-orders.png` | 처방 관리 CPOE(`/orders`) — 전체 133(약물 71·검사 47·영상 7·치료 8) · 긴급 17 · 상태별 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-clinic-queue.png` | 진료실 대기(`/clinic-queue`) — 예상 대기 `산출 불가` · 🔒 약국 탭 권한 안내 · 대기 11명 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-reception.png` | 접수 데스크(`/reception`) — **간호사 계정** · AI 접수 어시스턴트 동작 · 곧 도착 예약 · 진료실 현황 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-nurse-station.png` | 간호 워크스테이션(`/nurse-station`) — 투약·활력징후·I/O·간호기록·인계·병동보드 탭 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-bed-board.png` | 병상·입원 보드(`/bed-board`) — 병동별 가동률 · 장기재원 5 · 평균 재원 91일 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-pharmacy.png` | 약국 조제(`/pharmacy`) — **약사 계정** · 접수→조제→검수→불출 · 전체 6(접수 대기 2 · 검수 대기 4) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation.png` | 워크스테이션 허브(`/workstation`) — **판독의 계정** · 검사실 8 · 영상실 8 · 부서별 13 카드 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation-reading.png` | 판독 대기열(`/workstation/reading`) — 🔴 **AI 사전판독 사용 불가**(StudyInstanceUID 미기록) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation-imaging.png` | 일반촬영 워크스테이션(`/workstation/imaging`) — ⚠️ 검사항목 설정이 실제 코드와 불일치 경고 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup.png` | 건강검진센터(`/his-checkup`) — **검진 원무 계정** · 예약→접수→검사중→검사완료→소견대기→완료(당일 0) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-codes.png` | 코드 마스터(`/admin/codes`) — 총 18,199 · 코드체계 `KCD-8` · ICD-10/11 매핑 열 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-admin-audit-dashboard.png` | 감사 대시보드(`/admin/audit-dashboard`) — ⚠️ **BTG 0건은 '없었다'는 뜻이 아님** · 집계 범위 명시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-emergency-board.png` | 응급실 보드(`/emergency-board`) — KTAS 분포 · 구역 점유 · NEDOCS 과밀도 · 119 사전통보 · 골든타임 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-sentinel.png` | 상시 감시(`/admin/sentinel`) — 네 축 · **관측 불가 3** · 「데이터를 고치지 않는다」 명시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-triage.png` | 트리아지 관리(`/admin/triage`) — 증상→진료과 매핑(순위·가중치)·별칭·응급 · AI 예약의 근거 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-safety.png` | 환자안전 IPSG(`/safety`) — 사고 보고 폼 · **보고자 신원 비표시(환자안전법 §17)** 명시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-code-blue.png` | Code Blue / RRT(`/code-blue`) — 경과 기록 27건 · 팀도착(분) · 제세동 · 결과 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-emergency.png` | 응급실(`/emergency`) — 미배정 재실 중증 우선 · 구역별 베드 25 · 끌어다 배정 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-surgery.png` | 수술방 관리(`/surgery`) — 예정 4·완료 46 · OR Board · 마취기록·PACU·안전체크리스트 탭 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-icu.png` | 중환자실(`/icu`) — 병상 8·사용 3 · 활력징후 · GCS·APACHE · 입실사유 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-rounds.png` | 회진(`/rounds`) — 의사별 담당 환자와 진행률 · 입원 경위 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation-consent.png` | 동의서 워크스테이션(`/workstation/consent`) — 서명 대기 13 · 기기로 보내기·링크·PDF · DNR 유형 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation-discharge.png` | 퇴원 워크스테이션(`/workstation/discharge`) — 🔧 **업무 목록 미연결 · 「비어 있는 것은 할 일이 없다는 뜻이 아닙니다」** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-workstation-certificates.png` | 진단서 워크스테이션(`/workstation/certificates`) — **의료법 §17** 인용 · 사망진단서는 창구 접수 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-patient-crm.png` | CRM 대시보드(`/crm`) — 검진·해외환자·캠페인·상담 네 축 · 이탈 위험 731 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 **테스트 계정·비밀번호 가림** | 확인 (2026-09-12) |
| `assets/screens/his-care-consult.png` | 상담 데스크(`/consult`) — 직원 한국어 → 환자 언어 자동 번역 · 언어 배지 · 경과 시간 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/flow-portal-01-login.png` | 환자 포털 로그인(`/portal`) — ⚠️ 리허설 배너(실환자 아님·전송 안 나감) · 휴대폰 번호 로그인 · AI 예약 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 테스트 계정 · 자동완성 팝업 **가림** | 확인 (2026-09-12) |
| `assets/screens/homepage-booking.png` | 온라인 진료 예약(`/booking`) — 공개 홈페이지 상단 메뉴 · 본인 확인 후 AI 컨시어지 안내 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 **기관 주소·대표전화 가림** · 테스트 계정 가림 | 확인 (2026-09-12) |
| `assets/screens/lis-dashboard.png` | LIS 대시보드 — 연계 상태(HIS FHIR·PACS·오더 폴링·Reflex) · 위험치 통보 대기 · MDRO/법정감염병 알림 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/lis-verify-worklist.png` | LIS 검증 워크리스트 — 위험치·QC 실패·위탁 회신 · HH/LL/N 판정 · **LIS 가 환자명 자체 마스킹** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/pacs-admin-login.png` | PACS Admin 로그인 — 사용자명·비밀번호 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 **테스트 계정 5 · 비밀번호 평문 가림** | 확인 (2026-09-12) |
| `assets/screens/pacs-admin-dashboard.png` | PACS Admin 대시보드 — 판독 대기 33 · **영상 출처 추적(AI 생성·익명화·테스트 데이터)** · HIS 연동 요청 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/pacs-admin-ai-models.png` | PACS AI 모델 관리 — 등록 29(의료 13·범용 16) · 용도 전부 「보조」 · 자체 모델 2종 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 AI 서버 주소 가림 | 확인 (2026-09-12) |
| `assets/screens/his-intel-concierge.png` | AI 컨시어지(`/concierge`) — 환자 맞춤 안내 · 환자 선택 후 세션 시작 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-intel-ai-booking.png` | AI 예약 도우미(`/ai-booking`) — 증상에서 진료과·일정 추천 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-intel-interoperability.png` | 상호운용성(`/interoperability`) — **FHIR R4 리소스 17종** · 전원 4단계 · 환자 유형 6 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-intel-interoperability-test.png` | 연동 테스트 콘솔(`/interoperability/test`) — FHIR 엔드포인트 8종 실호출 버튼 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-intel-journey.png` | 환자 여정 대시보드(`/journey`) — 질관리 지표 · **분모 병기(공휴 3건 기준)** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-ops-billing.png` | 수납 관리(`/billing`) — 대기 80 · 본인부담금 · 대기시간 · 시드 환자 ID 노출 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-ops-claims.png` | 건강보험 청구(`/claims`) — **「전송 여부 확인 불가」 배지** · XML 생성 · 인정액 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-ops-transfer.png` | 전원 관리(`/transfer`) — 발신·수신 대시보드 · 긴급도 · 상태 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 **협력 기관명 가림** | 확인 (2026-09-12) |
| `assets/screens/his-quality-infection.png` | 감염관리(`/infection`) — 격리 21(집계 기준 병기) · **KONIS 자동 전송 없음 · 수기 보고 안내** · 미보고 29 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-omop-cdm.png` | OMOP CDM 변환(`/omop-cdm`) — **「변환 미구현」** · 8개 테이블 전부 미생성 · **API 501 Not Implemented** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-quality-agency-integrations.png` | 기관 연동(`/admin/agency-integrations`) — **채널 7 중 전송 구현 0** · 채널별 수기 대체 수단 · 법적 근거 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-integration-gates.png` | 연동 개통 게이트(`/admin/integration-gates`) — 게이트 3 충족 시 개통 · **`개발 시드(DEV-SEED)`** 배지 · 실결재 교체 4단계 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/sign-admin-login.png` | sign 트러스트 서비스 관리 콘솔 로그인 — API 키 로그인(break-glass) · v1.25.0 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/twin-patient-chart.png` | twin 환자 차트 — NEWS2·위험·eGFR · **「트윈 파생」 배지** · 「규칙기반 파생·임상 판단 보조」 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/twin-ops-console.png` | twin 운영 콘솔 — **「운영 모드 · 비PHI 집계」** · 환자는 UUID 로만 · 고위험/기기 알림 20 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/erp-dashboard.png` | 병원 ERP 대시보드(`/erp/dashboard`) — 사전심사 미처리 · 법정기한 · 삭감 통계 · 재무 건전성 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 도메인 한 줄 가림 | 확인 (2026-09-12) |
| `assets/screens/edu-login.png` | edu 로그인 — **「HIS 계정으로 인증 · 운영 전환 시 HIS SSO 로 대체」** · 기관명이 HIS 와 다름 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 이메일 도메인 가림 | 확인 (2026-09-12) |
| `assets/screens/lis-order-receipt.png` | LIS 오더·검체 접수 — 접수·라벨발행 · 검체 처리(거부·분주·정정) · 상태별 분모 6(응급3·접수10·진행20·완료7·보고2·취소1) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 처방의 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/lis-qc-westgard.png` | LIS 정도관리(QC · Westgard) — 측정 등록 즉시 PASS/FAIL · 로그 75건 · FAIL 은 결과 확정 차단으로 이어짐 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/lis-signoff-worksheet.png` | LIS 개시 서명·결재 — 참고치·위험치 · 자동검증 델타 한계 · EDI 수가코드 매핑을 섹션별로 사람이 서명 · **「dev seed 대표값 · 임상 권위 값 아님」** 자기 고지 · 「서명 이후 변경됨」 표시 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/erp-claim-precheck.png` | ERP 청구 사전심사 워크리스트(`/erp/claims/pre-review`) — BLOCK/WARN 심각도 · 위험액·청구액 병기 · 담당 `미배정` · AI 는 보조 버튼 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 도메인 한 줄 가림 | 확인 (2026-09-12) |
| `assets/screens/erp-accounting.png` | ERP 재무 전표·예산·정산(`/erp/finance`) — 예실대비 · 수동 전표 초안→상신→승인 · **전표 출처 배지**(patient·claims·scm·manual) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 도메인 한 줄 가림 | 확인 (2026-09-12) |
| `assets/screens/erp-daily-closing.png` | ERP 원무 수납·일마감(`/erp/patients/closing`) — 토요일이라 0건 · 「해당 일자 수납 없음」 · 현금 시재 계산식 병기 · **마감 후 정정 = 덮개 전표 + 재마감, 원 마감 보존** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 도메인 한 줄 가림 | 확인 (2026-09-12) |
| `assets/screens/erp-inventory.png` | ERP 재고 품목·마약류·발주(`/erp/inventory`) — 입고 시 로트·유효기간 필수 · REQUESTED→APPROVED→RECEIVED · 안전재고 · 마약류 강조 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 도메인 한 줄 가림 | 확인 (2026-09-12) |
| `assets/screens/pacs-worklist.png` | PACS 워크리스트 관리 — MWL 로 장비에 자동 제공 · MPPS 자동 보고 · AE `OPENPACS-MWL` · 예약9·진행0·완료0·취소5 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/pacs-emergency-board.png` | PACS 응급 영상 보드 — 15초 자동 갱신 · 대기 29 / 전체 33 · STAT/긴급·판독 대기·판독 완료 탭 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명 열 **가림**(이 화면은 이름을 그대로 보여 줌) | 확인 (2026-09-12) |
| `assets/screens/pacs-reading-queue.png` | PACS 판독 큐 — 상태 5단계 · 모달리티 배지와 영상 장수 · **출처 배지**(AI 생성·테스트 데이터 등) · 전체 33·대기 29 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-care-internal-medicine.png` | 내과 대시보드(`/internal-medicine`) — **세부 분과 탭 8**(순환기·호흡기·소화기·내분비·신장·혈액종양·감염·류마티스) · 총 검사 279 · 오늘 6 · 완료 0 · 대기 4 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-care-pediatrics.png` | 소아청소년과 대시보드(`/pediatrics`) — 같은 골격에 **세부 분과 탭 없음** · 오늘 예약 1 · 완료·진행·대기 0 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-care-chemo.png` | 항암 치료 사이클 엔진(`/chemo`) — 레지멘 기반 코스 · BSA 용량계산 · nadir 게이트 · 무균조제(CHEMO) 자동 연계 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-support-consent.png` | 동의서 관리(`/consent`) — 23건 · 유형 6(일반·시술·수술·마취·수혈·DNR) · 서명대기/서명완료 · 생성일·서명일 분리 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 환자명·환자번호 열 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-support-medical-records-copy.png` | 의무기록 사본 발급(`/medical-records/copy`) — PDF 생성 + **발급 이력 등록**(신청자·관계·부수·발급목적·기록 유형) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-patient-departments.png` | 진료과 안내(`/departments`) — 진료과 카드 · 전문 분야 태그 · 내선. ⚠️ 설명 본문에 **HTML 태그가 그대로 보이는 표시 문제**가 있습니다(2026-09-12 관찰) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 대표 전화 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-ops-executive.png` | 경영 대시보드(`/executive`) — KPI 목표·실적·달성률. **표본이 없는 지표는 0 이 아니라 「산출 불가」**(이번달 퇴원 0건·청구 0건) · 미완료 차트 214건(DRAFT 24시간 경과) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-voucher-dashboard.png` | 검진권 대시보드(`/admin/voucher/dashboard`) — 상태 6(SOLD·REDEEMED·ALLOCATED·REFUNDED·REVOKED·ISSUED) · 딜러 정산 **USD·KRW 이중 통화** · claw-back | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-smart-clients.png` | SMART 클라이언트(`/admin/smart-clients`) — SMART-on-FHIR OAuth2 클라이언트 7 · **스코프 단위 권한**(patient/* · system/*) · 외부 앱 접근 리포트(앱별·의료진별·리소스별) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 EHR launch 주소 2 · 저장소 식별자 1 · **협력 기관명 2 전체 가림** | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-hie-dashboard.png` | 진료정보교류 HIE(`/admin/hie-dashboard`) — **전체 교류 0 · 전송 0 · 수신 0 · 실패 0 · 「교류 이력이 없습니다」** — 8장의 `미구현` 표기가 화면에서 그대로 확인됨 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-system-admin-homepage-deploy.png` | 홈페이지 배포(`/admin/homepage/deploy`) — 콘텐츠 변경(CMS 즉시)과 코드 변경(빌드·발행)을 나눠 안내 · **라이브 표본 확인**(실제 서비스 중인 페이지를 열어 빌드 번호 대조) · 최근 빌드 상태와 실패 사유 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 확인 대상 도메인 · 아티팩트 저장소 주소 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-personal-settings-my-certificate.png` | 내 전자서명 인증서(`/settings/my-certificate`) — **「내 sign 인증서 정보는 여기서 확인할 수 없습니다 … 미발급이라는 뜻이 아닙니다」** · 관리자에게 조회 요청 안내 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-personal-settings-voice.png` | 음성 설정 VoiceEMR(`/settings/voice`) — 마이크·감도·화자 음성 등록(성문). **「등록 완료로 기록되었으나 성문이 AI 서버에 없습니다 — 화자 인식은 동작하지 않습니다」** · 다자간 화자분리는 `실험` | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-care-patients-register-emergency.png` | 응급 미확인 환자 등록(`/patients/register/emergency`) — **최소 정보만**(추정 성별·추정 연령·손상 유형 11) · 임시 ID 자동 부여 · 「신원 확인 시 환자 상세에서 정보를 갱신」 안내 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-blood-bank.png` | 혈액은행(`/blood-bank`) — 대시보드·재고 관리·수혈 관리·안전/MTP/발주 탭 · 혈액형 8종 재고 표(전부 0) · 수혈 오더·교차시험 대기·유효기간 임박 0 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-programs.png` | 검진 프로그램 관리(`/his-checkup/programs`) — 프로그램 14(기본·플러스·정밀·프리미엄·PET 정밀·특화 9) · 가격·소요시간·항목수 · **국가암검진 6종은 0원** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-schedule.png` | 검진 예약 관리(`/his-checkup/schedule`) — 날짜별 예약 목록. 캡처한 날(토요일)은 **0건 · 「해당 날짜에 예약이 없습니다」** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-station.png` | 검진 스테이션(`/his-checkup/station`) — 스테이션 탭 9(채혈·검체·신체계측·심전도·X-ray·초음파·내시경·안과·폐기능) · 8초 자동 갱신 · 대기 0 · **검사실 허브로 옮겨 간다는 안내 배너** | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-flow-board.png` | 검진 동선 현황판(`/his-checkup/flow-board`) — **0 수검자 × 11 스테이션 · 5초 갱신** · 완료/진행/대기 범례 · 「오늘 접수된 수검자가 없습니다」 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · — | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-review.png` | 검진 소견 작성 대기(`/his-checkup/review`) — 총 16 · 소견대기 10 · 검사완료 5 · 부분완료 1 · 행마다 프로그램과 **결과 진행 분모**(1/1 · 4/5 · 13/14) | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 수검자명·이니셜 아바타 16행 **가림** | 확인 (2026-09-12) |
| `assets/screens/his-support-his-checkup-follow-ups.png` | 검진 추적 관리(`/his-checkup/follow-ups`) — **기한 초과 6건**을 맨 위에 · 추적 사유(위용종 추적 · HbA1c 상승 · 안압 상승 등) · 예정일 · 근거 검진 회차 | 아니오(병원명 그대로 — 가상 병원 확인 2026-09-12) · 🔴 수검자명 · **연락처 6건 가림** | 확인 (2026-09-12) |
