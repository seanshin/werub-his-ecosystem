<!-- 생성물 — 직접 수정 금지. `node tools/extract-checklist.mjs` 로 다시 만듭니다. -->

# Go-Live(운영 전환) 체크리스트

> 자동 생성 — 손으로 고치지 않습니다. 원본 레지스트리가 바뀌면 추출기를 다시 돌립니다.

HIS 의 **Go-Live 관제** 화면(`/admin/go-live`)이 추적하는 개시 준비 항목입니다. 기술·보안·연동·법정 준비를 영역별로 나누고, 항목마다 **시스템이 직접 확인하는지(실검증)**, **사람이 표시하는지(자가신고)**를 구분합니다.

| 기준 | 값 |
|---|---|
| 원본 | HIS 저장소 `apps/api/src/modules/go-live/go-live.registry.ts` |
| HIS 버전 | v4.18.0 |
| 기준 커밋 | `e9d303984f80eda8271f29064a326bedad766815` (2026-09-11) |
| 추출일 | 2026-09-11 |
| 항목 수 | 60 (A 8 · B 16 · C 1 · D 1 · E 11 · F 3 · G 5 · H 15) |
| 판정 | 실검증 27 · 자가신고 33 |
| 개시 차단 항목 | 31 (나머지는 개시를 막지 않는 추적 항목) |

## 읽는 법

- **실검증** — 시스템이 설정 값·DB·결재 기록·코드의 구현 여부를 직접 읽어 판정합니다. 사람이 "됐다"고 적어도 바뀌지 않습니다.
- **자가신고** — 담당자가 화면에서 상태를 표시합니다. 근거는 화면 밖에 있으므로, 준비율에서 실검증과 따로 셉니다.
- **자가신고(운영 결정)** — 설정의 현재 값은 시스템이 보여 주지만, 켤지 말지는 사람이 정합니다.
- **개시 차단** — `예` 인 항목이 준비되지 않으면 개시 준비가 끝나지 않은 것으로 봅니다.
- 항목 이름·담당은 원본 레지스트리의 문구를 그대로 옮깁니다. 각 항목의 운영자용 비고(설치본의 현재 상태·경위)는 설치본마다 달라 여기에 싣지 않습니다 — 화면에서 확인합니다.

## `A` 임상 안전게이트 (8)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `gate.dur.enforce` | DUR 처방 게이트(병용금기·임부·알레르기·용량) | 설정 게이트 | 진료부·약제 | 실검증 | 설정 게이트 `dur.enforce` 이(가) 목표 모드 `BLOCK` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.pharmacy.durGate` | DUR 조제 게이트(미해결 경고 조제 차단) | 설정 게이트 | 약제 | 실검증 | 설정 게이트 `pharmacy.durGate.enforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.cdss.enforce` | CDSS 처방 검증(알레르기·신기능·연령) | 설정 게이트 | 진료부 | 실검증 | 설정 게이트 `cdss.enforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.imaging.contrast` | 조영제 안전(알레르기·eGFR) | 설정 게이트 | 영상의학과 | 실검증 | 설정 게이트 `imaging.contrastEnforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.imaging.pregnancy` | 임신확인(가임기 전리방사선) | 설정 게이트 | 영상의학과 | 실검증 | 설정 게이트 `imaging.pregnancyEnforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.inventory.expiry` | 만료/리콜 LOT 불출 차단 | 설정 게이트 | 물류 | 실검증 | 설정 게이트 `inventory.expiryIssueEnforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.formulary.enforce` | 원내 처방집(포뮬러리) 시행 | 설정 게이트 | 약제위 | 실검증 | 설정 게이트 `formulary.enforce` 이(가) 목표 모드 `WARN` 이상인지 | `/admin/safety-gates` | 예 | — |
| `gate.psychiatry.ect` | ECT 동의 게이트 | 설정 게이트 | 정신과 | 실검증 | 설정 게이트 `psychiatry.ectConsentEnforce` 이(가) 목표 모드 `BLOCK` 이상인지 | `/admin/safety-gates` | 예 | — |

## `B` 외부 연동 (16)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `integ.lis` | LIS Reflex 양방향 오더 컷오버 | 외부 | 진단검사의학과 | 실검증 | 연동 게이트 `LIS_REFLEX` 의 실제 결재 기록(개발 시드 결재는 세지 않음) | `/admin/integration-gates` | 예 | — |
| `integ.erp` | ERP 진료비/전표 연동(실 이관) | 외부 | 원무·전산 | 자가신고 | 담당자가 화면에서 표시 | `/admin/integration-gates` | 예 | — |
| `integ.sign` | W.Sign 전자서명 EXTERNAL 전환 | 외부 | 전산·보안 | 실검증 | 설정값 `sign.mode` = `EXTERNAL` 인지 | `/admin/integration-gates` | 예 | — |
| `integ.eligibility` | 수진자 자격조회 NHIS 실연동 | 외부 | 원무 | 실검증 | 설정값 `eligibility.mode` = `NHIS` 인지 | `/admin/integration-gates` | 예 | — |
| `integ.erpResidual` | ERP 잔여 왕복(전표 확인 회신·사번 백필 개시) | 외부 | ERP팀·전산 | 자가신고 | 담당자가 화면에서 표시 | `/admin/erp` | 아니오 | — |
| `integ.ems119` | 119 사전통보 개통(소방청 emsKey 발급·연동 상대 확정) | 외부 | 응급의학과·전산 | 자가신고 | 담당자가 화면에서 표시 | `/admin/config` | 아니오 | — |
| `integ.smsProvider` | SMS 제공자 등록(환자 로그인 OTP 실발송) | 외부 | 전산·원무 | 자가신고 | 담당자가 화면에서 표시 | `/admin/outbound-channels` | 예 | — |
| `integ.nimsKids` | 마약류 NIMS·부작용 KIDS 실전송 개통 | 외부 | 약제 | 실검증 | 대외 전송 채널 구현 여부(`NIMS`·`KIDS`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/outbound-channels` | 예 | — |
| `integ.hiraSubmit` | 심평원 EDI 명세서 실전송·반송 처리 | 외부 | 원무·심사 | 실검증 | 대외 전송 채널 구현 여부(`HIRA`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/hira-edi` | 예 | — |
| `integ.pacsCutover` | PACS 컷오버(PM 창 확정·당일 병리오더 검증) | 외부 | PM·전산 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `integ.cernoPilot` | Cerno 임상 AI 파일럿 착수(launch 경로 확인·대상 환자 AI 동의·실 의료진 왕복) | 외부 | Cerno·진료부 | 자가신고 | 담당자가 화면에서 표시 | `/admin/smart-clients` | 아니오 | — |
| `integ.bloodOrder` | 혈액원 발주 실연계 | 외부 | 혈액은행 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `integ.kcdc` | 법정감염병 질병관리청 웹신고 전송 | 외부 | 감염관리실 | 실검증 | 대외 전송 채널 구현 여부(`KCDC`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/outbound-channels` | 예 | — |
| `integ.konis` | 의료관련감염 KONIS 보고 전송 | 외부 | 감염관리실 | 실검증 | 대외 전송 채널 구현 여부(`KONIS`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/outbound-channels` | 예 | — |
| `integ.kccr` | 암등록 KCCR 전송 | 외부 | 암등록실 | 실검증 | 대외 전송 채널 구현 여부(`KCCR`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/outbound-channels` | 예 | — |
| `integ.hie` | 진료정보교류(HIE) 문서 전송 | 외부 | 의무기록·전산 | 실검증 | 대외 전송 채널 구현 여부(`HIE_HIGHWAY`) — 사람이 완료로 적어도 미구현이면 미완 | `/admin/outbound-channels` | 예 | — |

## `C` 개인정보/가명화 (1)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `cutover.phase0.pseudonym` | MRN 가명화 컷오버(chartNo→patientRef) | 승인 | 법무·CPO | 실검증 | 시스템 실측 — 가명화 컷오버의 승인·실행 기록 | `/admin/phase0-cutover` | 예 | — |

## `D` 데이터 준비 (1)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `data.hospitalInfo` | 기관 기본정보 완비(기호·사업자번호·대표자·주소) | 수동 | 원무 | 실검증 | 시스템 실측 — 기관 기본정보 입력 여부 | `/admin/data-quality` | 예 | — |

## `E` 보안/인증 (11)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `security.terminal2` | 단말② 재인증 게이트 활성화(생체 step-up) | 수동 | 보안·진료부 | 자가신고 | 담당자가 화면에서 표시 | `/admin/emr-cert` | 예 | — |
| `security.certSelfIssue` | HIS 자체 인증서 발급 폐지(sign 단독) | 설정 게이트 | 보안 | 실검증 | 설정 게이트 `blockchain.selfIssuanceEnabled` 이(가) 목표 모드 `OFF` 이상인지 | — | 예 | — |
| `security.hsm` | HSM/KMS 키 수탁 컷오버(sign 소관) | 외부 | 보안·sign | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `legal.retention` | 데이터 보유·실파기 개시(법무 승인 — DRY-RUN 완료 상태) | 승인 | 법무·CPO | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `legal.eduHardening` | edu 연동 시크릿 회수·aud 하드닝(법무 선결) | 수동 | 법무·전산 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `legal.voucher` | 건강검진권 블록체인 발행 개시(외국인 §27·법무) | 승인 | 법무 | 자가신고 | 담당자가 화면에서 표시 | `/admin/voucher/dashboard` | 아니오 | — |
| `legal.clinicalChannel` | 기록지 결재 채널전환 3중 게이트(HR CLINIC·W.Sign 템플릿·PHI 법무) | 수동 | 법무·현업 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `security.hisMode` | 운영 모드 REAL 전환(시드 로그인 노출 종료) | 시스템 실측 | 전산 | 실검증 | 시스템 실측 — 빌드의 운영 모드 상한 | — | 예 | — |
| `billing.institutionGrade` | 요양기관 종별 설정(개설 허가와 일치) | 시스템 실측 | 원무·보험 | 실검증 | 시스템 실측 — 요양기관 종별 설정 값이 DB 에 있는지 | `/admin/billing-calc` | 예 | `billing.institutionType` |
| `security.dbBackup` | 정기 DB 백업(GPG 암호화) 실행 확인 | 시스템 실측 | 전산 | 실검증 | 시스템 실측 — 최근 암호화 백업 파일의 생성 시각 | — | 예 | — |
| `security.encryptionKey` | PID 암호화 키 로테이션(운영 키가 플레이스홀더 아님) | 시스템 실측 | 보안·전산 | 실검증 | 시스템 실측 — 암호화 키가 설정돼 있고 개발용 값이 아닌지 | `/admin/config` | 예 | — |

## `F` 인프라/성능 (3)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `infra.ginIndex` | GIN 인덱스(한글검색) 적용 확인 | 시스템 실측 | 전산 | 실검증 | 시스템 실측 — DB 에 기대 인덱스가 실제로 있는지 조회 | — | 예 | — |
| `infra.redis` | Redis maxmemory/eviction 설정 | 수동 | 전산 | 자가신고 | 담당자가 화면에서 표시 | — | 예 | — |
| `infra.pgTuning` | PostgreSQL 튜닝(work_mem·pgss) — 공유 인스턴스 합의 | 수동 | 전산 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |

## `G` 하드웨어/AI (5)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `hw.printer` | 라벨 프린터(ZPL) 실기기 연동 | 하드웨어 | 전산 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `hw.webusb` | WEBUSB 디바이스 I/O | 하드웨어 | 전산 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `ai.werub` | WeRU.B AI 서버 활성(STT GPU) | 설정 게이트 | 전산·AI | 실검증 | 설정 게이트 `ai.server.enabled` 이(가) 목표 모드 `OFF` 이상인지 | — | 아니오 | — |
| `ai.scribeStt` | 앰비언트 스크라이브 STT GPU(large-v3 OOM 해소 — AI팀) | 외부 | AI팀 | 자가신고 | 담당자가 화면에서 표시 | — | 아니오 | — |
| `ai.draftProvenanceSchema` | AI 초안 프로비넌스 스키마 일반화 결정(진료 AI 보조·퇴원요약·동의서) | 수동 | 진료부·전산(스키마 승인) | 자가신고 | 담당자가 화면에서 표시 | `/admin/audit` | 아니오 | — |

## `H` 서비스 개시 설정 확정 (15)

| 키 | 항목 | 유형 | 담당(역할) | 판정 | 무엇으로 판정하나 | 확인 화면 | 개시 차단 | 관련 결정 |
|---|---|---|---|---|---|---|---|---|
| `flag.aiBriefBatch` | 환자 AI 브리핑 야간 배치(다음날 예약+재원 · 결정론) ON 여부 | 서비스 설정 | 진료부·전산 | 자가신고(운영 결정) | 현재 설정값 `ai.brief.batch.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/ai-settings` | 아니오 | — |
| `flag.aiBriefLlm` | 환자 AI 브리핑 배치 B(야간 LLM 사전 검사해석) ON 여부 | 서비스 설정 | 진료부·AI팀·개인정보보호 | 자가신고(운영 결정) | 현재 설정값 `ai.brief.llm.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/ai-settings` | 아니오 | — |
| `flag.uiA11yDefaults` | 접근성 기본값 확정(본문 배율·대비·색 외 상태 기호) | 수동 | 간호부·환자안전위 | 자가신고 | 담당자가 화면에서 표시 | `/admin/ai-settings` | 아니오 | — |
| `flag.devDemoDateRoll` | 개발 전용: 데모 날짜 롤포워드 비활성 | 서비스 설정 | 전산 | 실검증 | 설정값 `dev.demoDateRoll` = `false` 인지 | `/admin/config` | 예 | — |
| `flag.demoSeedPurge` | 개발 전용: 데모/시드·TEST- 픽스처 정리 | 수동 | 전산·원무 | 자가신고 | 담당자가 화면에서 표시 | `/admin/data-quality` | 예 | — |
| `flag.voiceEmrEnabled` | 음성 EMR(조회) 개방 여부 확정 | 서비스 설정 | 진료부·전산 | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.ambientEnabled` | 앰비언트 대화 기록 개방 여부 확정 | 서비스 설정 | 진료부·법무 | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.ambient.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.ambientAiDraft` | 앰비언트 AI 초안 사용 여부 확정 | 서비스 설정 | 진료부·AI | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.ambient.aiDraft.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.scribeEnabled` | 스크라이브(녹음→초안) 개방 여부 확정 | 서비스 설정 | 진료부·법무 | 자가신고(운영 결정) | 현재 설정값 `scribe.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.voiceWrite` | 음성 활력 입력(T1) 개방 승인 | 서비스 설정 | 진료부·간호부 | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.write.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.voiceOrder` | 음성 오더(T3) 개방 승인 | 서비스 설정 | 진료부·약제 | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.order.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.voiceDictate` | 음성 구술(T2) 개방 승인 | 서비스 설정 | 진료부 | 자가신고(운영 결정) | 현재 설정값 `voiceEmr.dictate.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/config` | 아니오 | — |
| `flag.qualityAi` | 데이터 품질 AI(컨시어지) 개방 승인 | 서비스 설정 | 원무·전산 | 자가신고(운영 결정) | 현재 설정값 `quality.ai.enabled` 을 보여 주고, 켤지는 사람이 정함 | `/admin/data-quality` | 아니오 | — |
| `flag.consentAiTranslate` | 동의서 AI 번역 초안 검토·활성화 | 수동 | 법무·국제진료 | 자가신고 | 담당자가 화면에서 표시 | `/consent/templates` | 아니오 | — |
| `flag.clinicalEapprovalGates` | 임상 기록지 전자결재 게이트 4종 활성화 | 수동 | 진료부·간호부·원무 | 자가신고 | 담당자가 화면에서 표시 | `/admin/approvals-dashboard` | 아니오 | — |
