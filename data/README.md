# 계측 스냅샷
**Measurement snapshot**

> **EN** — The scale and versions of all 13 systems, counted **on one day in one pass** from each repository's pinned base commit. Every number in these materials comes from here; numbers written in the individual repositories' own READMEs are not used, because versions and counts disagree across them. Each entry carries the value, the counting rule, and the measurement date.


이 폴더에는 생태계 13개 시스템의 **규모와 버전을 한날 한 번에 센 결과**가 들어 있습니다.
이 자료의 모든 수치는 여기서 나옵니다. 각 시스템 저장소 README 에 적힌 수치는 쓰지 않습니다. 저장소마다 버전과 수치가 서로 어긋나 있기 때문입니다.

| 파일 | 내용 |
|---|---|
| `scale-snapshot.json` | 시스템별 기준 커밋 · 버전 선언 · 규모 수치(값과 센 방법) · 계측일 |
| `base-commits.json` | 저장소별 **기준 커밋 고정값** — 모든 도구가 이 커밋의 내용만 읽습니다 |

## 수치를 읽는 법

수치는 언제나 **값 · 센 방법 · 계측일**을 함께 봅니다.

- `measuredAt` — 계측일
- `systems.<시스템>.state` — 센 기준 커밋(`head`) · 커밋 날짜 · 마지막 태그 · 고정 여부(`pinned`). 작업 트리가 아니라 **그 커밋의 내용**을 세므로, 같은 기준 커밋이면 언제 다시 세어도 같은 값이 나옵니다
- `systems.<시스템>.counts.<지표>` — `value`(값) · `rule`(포함·제외 규칙) · `detail`(분해). 셀 수 없으면 `value` 를 `null` 로 두고 `reason` 에 까닭을 적습니다. 추정하거나 자르지 않습니다
- `systems.<시스템>.version` — 정본 위치 한 곳의 선언값(`value` · `source`)과 다른 선언·태그(`otherDeclarations`). 값이 서로 다르면 `mismatch` 를 `true` 로 두고 다른 곳을 `mismatchWith` 에 적습니다. 한쪽을 조용히 고르지 않습니다
- `conventions` — 모든 지표에 공통으로 적용하는 규칙(어떤 파일을 세는지, 엔드포인트와 테스트를 무엇으로 세는지)

엔드포인트 수는 핸들러 수이지 고유 경로 수가 아닙니다. 테스트 수는 선언 수이지 실행·통과 수가 아닙니다.
HIS · 공개 홈페이지 · 환자 앱의 수치는 HIS 저장소의 정본 계측기가 낸 값을 그대로 옮깁니다.

## 다시 만들기

```bash
node tools/measure-scale.mjs          # 다시 세어 scale-snapshot.json 을 새로 씁니다
node tools/measure-scale.mjs --check  # 다시 세어 지금 스냅샷과 비교만 합니다(아무것도 쓰지 않습니다)
node tools/measure-scale.mjs --repin  # 기준 커밋 고정을 각 저장소의 지금 커밋으로 옮기고 다시 셉니다
```

- 계측기는 각 시스템 저장소를 **읽기만** 합니다. 기준 커밋의 내용을 임시 폴더에 풀어서 세고, 다 세면 지웁니다. 그래서 저장소에서 다른 작업이 진행 중이어도 값이 흔들리지 않습니다.
- 기준 커밋은 `base-commits.json` 에 고정합니다. 저장소에 새 커밋이 생겨도 이 자료는 고정을 옮기기 전까지 바뀌지 않습니다. 옮기는 것은 `--repin` 으로 명시적으로 합니다.
- 실행 전후로 각 저장소의 상태도 비교합니다. 달라졌으면 동시 작업으로 보고 경고합니다(값은 기준 커밋만 읽었으므로 영향이 없습니다).
- 각 저장소를 어디서 읽을지는 로컬 설정 파일 `tools/.local.json` 에 적습니다. 이 파일은 공개하지 않습니다(`.gitignore`). 설정이 없으면 계측기는 "미실행"으로 끝납니다. 통과가 아닙니다.
- `--check` 는 계측일을 뺀 모든 항목을 비교합니다. 수치 · 규칙 문장 · 버전 · 기준 커밋 중 하나라도 다르면 실패합니다.

| 종료 코드 | 뜻 |
|---|---|
| 0 | 스냅샷 기록 완료, 또는 `--check` 일치 |
| 1 | `--check` 불일치 |
| 2 | 계측기 오류(고정된 기준 커밋을 저장소에서 찾지 못함 포함) |
| 3 | 미실행(로컬 설정 또는 저장소 없음) |
