# 소스 받기

**Getting the source**

> **EN** — Each system lives in its own repository. This page maps the thirteen systems to their repositories, pins the **base commit** every number in these materials was read from, and names the file to open first. Repositories are being made public one at a time; until a given one is, its link will not open.

> 🔴 **저장소는 하나씩 공개되는 중입니다.** 아직 열리지 않은 주소는 눌러도 열리지 않습니다 — 접근 권한이 없다는 뜻이고, **이 안내는 열리는 순간 그대로 동작합니다**(주소도 커밋도 바뀌지 않습니다).

이 자료의 모든 수치 · 화면 · 연결 상태는 아래 **기준 커밋**에서 읽은 것입니다. 같은 것을 보려면 그 커밋을 받으십시오 — 최신 커밋은 이 자료보다 앞서 있을 수 있습니다.

## 1. 어느 저장소에 무엇이 있나

| 시스템 | 저장소 | 기준 커밋 | 구축 단계 |
|---|---|---|---|
| HIS | [seanshin/werubyHIS](https://github.com/seanshin/werubyHIS) | `e9d303984f80` | [S1](build-guide/S1-core-his.md) |
| 공개 홈페이지 | [seanshin/werubyHIS](https://github.com/seanshin/werubyHIS) | `e9d303984f80` | [S2](build-guide/S2-patient-access.md) |
| 환자 앱 | [seanshin/werubyHIS](https://github.com/seanshin/werubyHIS) | `e9d303984f80` | [S2](build-guide/S2-patient-access.md) |
| sign | [seanshin/sign](https://github.com/seanshin/sign) | `93f56d839c3f` | [S4](build-guide/S4-trust.md) |
| LIS | [seanshin/lis](https://github.com/seanshin/lis) | `ffb34e9d1dbc` | [S3](build-guide/S3-clinical-departments.md) |
| ERP | [seanshin/hospital-erp](https://github.com/seanshin/hospital-erp) | `0e1f54c5b902` | [S5](build-guide/S5-management.md) |
| PACS | [seanshin/openpacs](https://github.com/seanshin/openpacs) | `532a8ed13e87` | [S3](build-guide/S3-clinical-departments.md) |
| AI Server | [seanshin/WeRUBLLMManager](https://github.com/seanshin/WeRUBLLMManager) | `55acaee90068` | [S6](build-guide/S6-ai.md) |
| twin | [seanshin/medical-digital-twin](https://github.com/seanshin/medical-digital-twin) | `526b4f9a4d3f` | [S5](build-guide/S5-management.md) |
| cerno | [seanshin/cerno](https://github.com/seanshin/cerno) | `4f5c22b331fc` | [S5](build-guide/S5-management.md) |
| edu | [seanshin/edu](https://github.com/seanshin/edu) | `f8127e6ee278` | [S5](build-guide/S5-management.md) |
| Clinic | [weruby-co-kr/WeRUB](https://github.com/weruby-co-kr/WeRUB) | `2b20a89b7c3a` | [S5](build-guide/S5-management.md) |
| Jitsi | [seanshin/hospital-jitsi](https://github.com/seanshin/hospital-jitsi) | `0984fbec7177` | [S5](build-guide/S5-management.md) |

**HIS · 공개 홈페이지 · 환자 앱은 한 저장소**입니다(모노레포). 나머지는 시스템마다 저장소가 하나입니다 — 저장소 **11개**로 시스템 **13개**가 됩니다.

## 2. 받는 법

```sh
# 예: HIS
git clone <위 표의 주소>.git his
cd his
git checkout <위 표의 기준 커밋>      # 🔴 이 자료와 같은 것을 보려면 이 커밋
git rev-parse HEAD                    # 표의 커밋과 같은지 확인
```

- **기준 커밋을 쓰는 이유** — 이 자료의 수치(데이터 모델 수 · 화면 수 · 연결 상태 · 체크리스트 항목 수)는 전부 그 커밋에서 기계로 읽은 것입니다. 최신 커밋을 받으면 **자료와 숫자가 달라집니다**(틀린 것이 아니라 시점이 다른 것입니다).
- **최신으로 세우고 싶다면** 그렇게 해도 됩니다. 다만 이 자료의 「막힌 곳」과 「우회」는 기준 커밋에서 겪은 것이므로, 최신에서는 이미 고쳐졌거나 다른 자리에서 막힐 수 있습니다.
- 저장소마다 **라이선스 표기가 다릅니다**(일부는 독점 · 일부는 표기 없음). 받기 전에 [통합 릴리즈 매니페스트](RELEASES/2026.09/manifest.md)의 「저장소 라이선스 표기」 칸을 보십시오. **이 소개 저장소의 MIT 는 이 자료에만 적용됩니다.**

## 3. 받은 뒤 처음 여는 파일

기준 커밋에 **실제로 있는 파일만** 적었습니다(2026-09-17 확인).

| 저장소 | 처음 여는 파일 |
|---|---|
| seanshin/werubyHIS | `infra/docker/docker-compose.prod.yml` · `infra/scripts/deploy.sh` · `README.md` |
| seanshin/sign | `docker-compose.prod.yml` · `docker-compose.yml` · `README.md` |
| seanshin/lis | `infra/docker/docker-compose.prod.yml` · `infra/scripts/deploy.sh` · `README.md` |
| seanshin/hospital-erp | `infra/docker-compose.prod.yml` · `infra/docker-compose.yml` · `infra/deploy.sh` · `services/core/Dockerfile` · `README.md` |
| seanshin/openpacs | `docker-compose.yml` · `backend/Dockerfile` · `README.md` |
| seanshin/WeRUBLLMManager | `gunicorn.conf.py` · `requirements.txt` · `README.md` |
| seanshin/medical-digital-twin | `docker-compose.yml` · `README.md` |
| seanshin/cerno | `docker-compose.yml` · `README.md` |
| seanshin/edu | `infra/docker/docker-compose.prod.yml` · `README.md` |
| weruby-co-kr/WeRUB | `docker-compose.yml` · `ecosystem.config.cjs` · `README.md` |
| seanshin/hospital-jitsi | `docker-compose.yml` · `README.md` |

- 🔴 **저장소의 설치 파일이 그대로 도는 것은 아닙니다.** 새 설치본으로 따라가 본 결과, 여러 시스템에서 이미지 빌드 · 스키마 반영 · 기동이 원본 파일로는 막혔습니다 — 무엇이 어떻게 막혔고 어떻게 우회했는지는 [따라가 본 결과](build-guide/follow-along-2026-09.md)와 각 단계 장에 있습니다. **그 장을 먼저 읽고 시작하십시오.**
- 위 표는 "여기서 시작한다"는 뜻이지 "이것만 있으면 된다"는 뜻이 아닙니다.

## 4. 저장소에 없는 것

| 없는 것 | 어떻게 구하나 |
|---|---|
| **AI 모델 가중치** | 기관이 약관을 확인하고 직접 받습니다 → [S6](build-guide/S6-ai.md) · [THIRD_PARTY](THIRD_PARTY.md) |
| **코드 마스터**(의약품 · 수가 · 표준 코드) | 발행처에서 받습니다. 저장소에는 반입 경로만 있습니다 → [S0](build-guide/S0-prepare.md) |
| **실환자 데이터** | 필요하지 않습니다. 데모는 가상 병원 데이터입니다 |
| **컨테이너 이미지**(미리 만들어 둔 것) | 배포 여부가 아직 정해지지 않았습니다 — 지금은 각 저장소에서 직접 빌드합니다 |

## 5. 받은 뒤 어디로

1. [S0 준비](build-guide/S0-prepare.md) — 장비 · 디스크 · 막아야 할 나가는 연결
2. [따라가 본 결과](build-guide/follow-along-2026-09.md) — 막힌 곳과 우회를 먼저 읽습니다
3. [S1](build-guide/S1-core-his.md) 부터 순서대로
4. 연동을 붙일 때는 [연결 카드](integration/cards/)에서 방향 쌍마다 한 장씩

---

> 이 문서는 `node tools/build-sources.mjs` 가 만듭니다 — 주소는 릴리즈 입력값에서, 커밋은 기준 커밋 파일에서, 처음 여는 파일은 **그 커밋에 있는지 확인해** 싣습니다. 손으로 고치지 마십시오.
