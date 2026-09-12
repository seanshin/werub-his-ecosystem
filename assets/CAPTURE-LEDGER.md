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
