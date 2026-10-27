# 소스 받기

**Getting the source**

> **EN** — Development happens in private repositories; what is published is a **public edition** of each system (`seanshin/werub-…`, MIT): the final state of the development repository with internal working records and operational details removed, starting from a single commit. They are opened one at a time — 8 of 11 so far. An opened edition carries the original release tag, is linked as a submodule under `source/`, and, where marked, is the same point in time as the base commit every number in these materials was read from. A repository still marked "in preparation" will not open yet.

> 🟢 **개발은 비공개 저장소에서 하고, 공개는 시스템마다 「공개판 저장소」로 합니다.** 공개판은 개발 저장소의 최종 상태에서 **내부 작업 기록(다른 시스템과 주고받은 결함 보고 · 회신 · 키 교체 런북 등)과 운영 정보(운영 도메인 · 서버 주소 · 계정)를 뺀 것**이고, 커밋 하나에서 시작하며 **MIT** 입니다. 정리가 끝난 시스템부터 **하나씩** 엽니다 — 지금 **8/11곳** 공개.
>
> 「준비 중」인 주소는 아직 열리지 않습니다.

이 자료의 모든 수치 · 화면 · 연결 상태는 개발 저장소의 **기준 커밋**에서 읽은 것입니다. 공개판의 **기준 판**은 원본 태그를 그대로 쓰고, 같은 원본을 다시 내보내면 `-public.N` 을 붙입니다(공개된 이력은 다시 쓰지 않고 그 위에 커밋을 더합니다). 그 커밋과 같은 시점이면 표에 「기준 커밋과 같음」으로 적었습니다.

## 1. 어느 저장소에 무엇이 있나

| 시스템 | 공개판 저장소 | 상태 | 기준 판 | 구축 단계 |
|---|---|---|---|---|
| HIS | `seanshin/werub-his` · 준비 중 | 준비 중 | — | [S1](build-guide/S1-core-his.md) |
| 공개 홈페이지 | `seanshin/werub-his` · 준비 중 | 준비 중 | — | [S2](build-guide/S2-patient-access.md) |
| 환자 앱 | `seanshin/werub-his` · 준비 중 | 준비 중 | — | [S2](build-guide/S2-patient-access.md) |
| sign | [seanshin/werub-sign](https://github.com/seanshin/werub-sign) | 🟢 공개(2026-10-15) | `v1.30.1` · `0813933bd01c` — 코드는 기준 커밋과 같음 — 기준 커밋은 그 뒤 운영 기록 문서만 더했다 | [S4](build-guide/S4-trust.md) |
| LIS | [seanshin/werub-lis](https://github.com/seanshin/werub-lis) | 🟢 공개(2026-10-15) | `v1.56.18-public.3` · `a83e9d14d281` — 기준 커밋과 같음 | [S3](build-guide/S3-clinical-departments.md) |
| ERP | `seanshin/werub-erp` · 준비 중 | 준비 중 | — | [S5](build-guide/S5-management.md) |
| PACS | [seanshin/werub-pacs](https://github.com/seanshin/werub-pacs) | 🟢 공개(2026-10-27) | `v13.48` · `721c7ea5dabc` — 기준 커밋과 같음 | [S3](build-guide/S3-clinical-departments.md) |
| AI Server | [seanshin/werub-ai-server](https://github.com/seanshin/werub-ai-server) | 🟢 공개(2026-10-27) | `v2.125.73` · `c012ac37e057` — 현재 개발본(새 설치는 이 판을 받습니다 · 원본에 태그가 없어 코드 버전으로 표기) | [S6](build-guide/S6-ai.md) |
| twin | [seanshin/werub-twin](https://github.com/seanshin/werub-twin) | 🟢 공개(2026-10-26) | `v1.20.72-19-g526b4f9` · `7a25b11232c2` — 기준 커밋과 같음 | [S5](build-guide/S5-management.md) |
| cerno | [seanshin/werub-cerno](https://github.com/seanshin/werub-cerno) | 🟢 공개(2026-10-15) | `v0.1.8-public.2` · `9b34828d4d62` — 기준 커밋과 같음 | [S5](build-guide/S5-management.md) |
| edu | [seanshin/werub-edu](https://github.com/seanshin/werub-edu) | 🟢 공개(2026-10-26) | `v2.7.0` · `1808f0c3eb8b` — 기준 커밋과 같음 | [S5](build-guide/S5-management.md) |
| Clinic | `seanshin/werub-clinic` · 준비 중 | 준비 중 | — | [S5](build-guide/S5-management.md) |
| Jitsi | [seanshin/werub-jitsi](https://github.com/seanshin/werub-jitsi) | 🟢 공개(2026-10-26) | `v2.10.0-9-g0984fbe` · `6d41dfc9dd40` — 기준 커밋과 같음 | [S5](build-guide/S5-management.md) |

**HIS · 공개 홈페이지 · 환자 앱은 한 저장소**입니다(모노레포). 나머지는 시스템마다 저장소가 하나입니다 — 저장소 **11개**로 시스템 **13개**가 됩니다.

## 2. 받는 법

공개된 시스템은 이 저장소의 `source/` 폴더에 **하위 모듈**로 연결되어 있습니다. 둘 중 편한 쪽으로 받습니다.

```sh
# ① 소개 자료와 공개된 소스를 한 번에
git clone --recurse-submodules https://github.com/seanshin/werub-his-ecosystem.git

# ② 시스템 하나만 (예: cerno)
git clone https://github.com/seanshin/werub-cerno.git cerno
cd cerno
git checkout <위 표의 기준 판 태그>   # 🔴 이 자료와 같은 것을 보려면 이 판
```

- **기준 판을 쓰는 이유** — 이 자료의 수치(데이터 모델 수 · 화면 수 · 연결 상태 · 체크리스트 항목 수)는 전부 그 시점에서 기계로 읽은 것입니다. 이후 판을 받으면 **자료와 숫자가 달라집니다**(틀린 것이 아니라 시점이 다른 것입니다).
- **공개판에서 빠진 것** — 내부 작업 기록 문서와 운영 정보입니다. 코드는 그대로이고, 운영 도메인 · 서버 주소 · 계정 같은 값은 예시 값(`example.org` 등)으로 바뀌어 있습니다. 소스 주석이 빠진 문서를 가리키는 곳이 남아 있을 수 있습니다.
- 🔴 **비밀값은 들어 있지 않습니다** — 비밀번호 · 비밀 · 토큰 · 키는 `CHANGE_ME` 로 비웠습니다. **받은 뒤 직접 정해야 하는 값**은 공개판마다 루트의 `PUBLIC-EDITION.md` 에 목록으로 있습니다.
- **라이선스** — 공개판은 **MIT** 입니다(저장소마다 `LICENSE`). [통합 릴리즈 매니페스트](RELEASES/2026.09/manifest.md)의 「저장소 라이선스 표기」 칸은 개발 저장소의 기준 커밋 표기를 기록한 것입니다.
- **최신으로 세우고 싶다면** 그렇게 해도 됩니다. 다만 이 자료의 「막힌 곳」과 「우회」는 기준 커밋에서 겪은 것이므로, 최신에서는 이미 고쳐졌거나 다른 자리에서 막힐 수 있습니다.

## 3. 받은 뒤 처음 여는 파일

그 판에 **실제로 있는 파일만** 적었습니다 — 공개된 곳은 공개판에서, 준비 중인 곳은 개발 저장소의 기준 커밋에서 확인했습니다(준비 중인 곳은 공개판에서 빠질 수 있습니다).

| 저장소 | 처음 여는 파일 |
|---|---|
| seanshin/werub-his | `infra/docker/docker-compose.prod.yml` · `infra/scripts/deploy.sh` · `README.md` |
| seanshin/werub-sign | `docker-compose.prod.yml` · `docker-compose.yml` · `README.md` |
| seanshin/werub-lis | `infra/docker/docker-compose.prod.yml` · `infra/scripts/deploy.sh` · `README.md` |
| seanshin/werub-erp | `infra/docker-compose.prod.yml` · `infra/docker-compose.yml` · `infra/deploy.sh` · `services/core/Dockerfile` · `README.md` |
| seanshin/werub-pacs | `docker-compose.yml` · `backend/Dockerfile` · `README.md` |
| seanshin/werub-ai-server | `gunicorn.conf.py` · `requirements.txt` · `README.md` |
| seanshin/werub-twin | `docker-compose.yml` · `README.md` |
| seanshin/werub-cerno | `docker-compose.yml` · `README.md` |
| seanshin/werub-edu | `infra/docker/docker-compose.prod.yml` · `README.md` |
| seanshin/werub-clinic | `docker-compose.yml` · `ecosystem.config.cjs` · `README.md` |
| seanshin/werub-jitsi | `docker-compose.yml` · `README.md` |

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

> 이 문서는 `node tools/build-sources.mjs` 가 만듭니다 — 주소는 릴리즈 입력값에서(공개판 상태 `data/public-sources.json` 과 어긋나면 실패), 처음 여는 파일은 **그 판에 있는지 확인해** 싣습니다. 손으로 고치지 마십시오.
