# 생태계 통합 릴리즈
**Integrated ecosystem release**

> **EN** — The 13 systems version themselves differently. This folder pins **exactly which version combination these materials describe**, as one release: a manifest (version, base commit, release date, license declaration, source link, implementation status per system), a human-readable release note, per-system release summaries, and the connection-status table for that combination.


13개 시스템은 저장소마다 버전을 매기는 방식이 다릅니다. 이 폴더는 **이 자료가 설명하는 것이 정확히 어느 버전 조합인지**를 릴리즈 한 벌로 고정합니다. 자료의 모든 수치 · 상태 · 설명은 그 조합을 기준으로 합니다.

## 한 벌의 구성

| 파일 | 내용 | 만드는 법 |
|---|---|---|
| `manifest.json` · `manifest.md` | 시스템별 버전(정본) · 기준 커밋 · 릴리즈일 · 버전 표기 어긋남 · 저장소 라이선스 표기 · 구현 상태 · 소스 링크 | `node tools/build-manifest.mjs` — 저장소와 계측 스냅샷에서 읽습니다 |
| `inputs.json` | 코드에서 뽑을 수 없는 사람 판단(구현 상태 · 소스 링크 · 모노레포의 시스템 범위) | 사람이 적습니다 |
| `systems/<시스템>.md` | 시스템별 릴리즈 요약 13개 — [공통 틀](SYSTEM-SUMMARY-TEMPLATE.md) | 각 저장소의 릴리즈 기록을 읽고 새로 씁니다(원문을 옮기지 않습니다) |
| `RELEASE.md` | 통합 릴리즈 노트 — 이 조합이 무엇이고 무엇이 실제로 확인됐는지 한 장에 | 시스템별 요약 · 연결 상태 · 따라가기 결과에서 모읍니다 |
| `compatibility.md` | 이 조합에서 시스템 사이 연결별 상태(`검증됨`(확인일) · `구현·미검증` · `설계만` · `미구현` · `중단` · `판정 불가`) | 1차는 양쪽 코드를 대조해 씁니다. `검증됨`은 실제 호출로 확인한 뒤에만 붙입니다 |

## 지금 있는 것 — [`draft/`](draft/)

첫 통합 릴리즈의 **초안**입니다. 릴리즈 번호 체계를 아직 정하지 않아 `draft` 라는 이름을 씁니다. 번호가 정해지면 폴더 이름을 바꿉니다.

- [매니페스트(사람이 읽는 판)](draft/manifest.md)
- [통합 릴리즈 노트](draft/RELEASE.md) — 이 조합이 고정하는 것 · 실제로 확인된 것 · 구축 기관이 알아야 할 것 · 아직 정하지 않은 것
- [연결 상태](draft/compatibility.md) — 코드 대조 1차 + 새 설치본 실호출(연결 113개 실음 · `검증됨` 27 · 시스템 담당 확인을 기다리는 7개는 싣지 않음)
- 시스템별 요약(초안 · 시스템 담당 사실 확인 전): [HIS](draft/systems/his.md) · [공개 홈페이지](draft/systems/homepage.md) · [환자 앱](draft/systems/patient-app.md) · [sign](draft/systems/sign.md) · [LIS](draft/systems/lis.md) · [PACS](draft/systems/pacs.md) · [ERP](draft/systems/erp.md) · [AI Server](draft/systems/ai-server.md) · [twin](draft/systems/twin.md) · [cerno](draft/systems/cerno.md) · [edu](draft/systems/edu.md) · [Clinic](draft/systems/clinic.md) · [Jitsi](draft/systems/jitsi.md)
- 기준 커밋: [`data/base-commits.json`](../data/base-commits.json) — 저장소에 새 커밋이 생겨도 이 초안은 고정을 옮기기 전까지 바뀌지 않습니다

## 검사

```bash
node tools/measure-scale.mjs --check    # 계측 스냅샷이 기준 커밋의 내용과 같은가
node tools/build-manifest.mjs --check   # 매니페스트가 저장소·스냅샷·입력과 같은가 + 요약 머리의 버전·기준 커밋이 매니페스트와 같은가
node tools/check-public.mjs             # 공개하면 안 되는 정보가 없는가
```

- 매니페스트 생성기는 계측 스냅샷이 낡았으면(저장소에 새 커밋이 있으면) 만들지 않습니다. 먼저 다시 계측합니다.
- 버전 표기가 서로 다르면 한쪽을 조용히 고르지 않고 **어긋남으로 적고 등급을 매깁니다**: 주요(태그 · 릴리즈 기록이 다름) · 표면(화면 · API 에 보이는 버전 상수가 다름) · 참고(하위 패키지 선언만 다름).
