# source — 공개판 소스

**source — public editions of each system**

> **EN** — Each system's public edition is linked here as a git submodule, one folder per repository. The table also lists the folders reserved for editions not yet opened, with the address each will have — 4 of 11 are open now. Clone with `--recurse-submodules` (or run `git submodule update --init`) to fetch the opened ones. How to pick a version and what was removed from an edition: [Getting the source](../SOURCES.md).

이 폴더에는 시스템별 **공개판 저장소**가 하위 모듈로 들어옵니다. 저장소 하나에 폴더 하나이고, 아직 열지 않은 시스템도 **들어갈 자리와 주소를 미리** 적어 두었습니다 — 지금 **4/11곳** 공개.

| 폴더 | 시스템 | 공개판 저장소 | 상태 | 기준 판 |
|---|---|---|---|---|
| `source/his` | HIS · 공개 홈페이지 · 환자 앱 | [seanshin/werub-his](https://github.com/seanshin/werub-his) | 준비 중 | — |
| [`source/sign`](sign) | sign | [seanshin/werub-sign](https://github.com/seanshin/werub-sign) | 🟢 공개(2026-10-15) | `v1.30.1` · `0813933bd01c` |
| [`source/lis`](lis) | LIS | [seanshin/werub-lis](https://github.com/seanshin/werub-lis) | 🟢 공개(2026-10-15) | `v1.56.18-public.2` · `7b8a549619f1` |
| `source/erp` | ERP | [seanshin/werub-erp](https://github.com/seanshin/werub-erp) | 준비 중 | — |
| `source/pacs` | PACS | [seanshin/werub-pacs](https://github.com/seanshin/werub-pacs) | 준비 중 | — |
| `source/ai-server` | AI Server | [seanshin/werub-ai-server](https://github.com/seanshin/werub-ai-server) | 준비 중 | — |
| `source/twin` | twin | [seanshin/werub-twin](https://github.com/seanshin/werub-twin) | 준비 중 | — |
| [`source/cerno`](cerno) | cerno | [seanshin/werub-cerno](https://github.com/seanshin/werub-cerno) | 🟢 공개(2026-10-15) | `v0.1.8-public.2` · `9b34828d4d62` |
| [`source/edu`](edu) | edu | [seanshin/werub-edu](https://github.com/seanshin/werub-edu) | 🟢 공개(2026-10-26) | `v2.7.0` · `1808f0c3eb8b` |
| `source/clinic` | Clinic | [seanshin/werub-clinic](https://github.com/seanshin/werub-clinic) | 준비 중 | — |
| `source/jitsi` | Jitsi | [seanshin/werub-jitsi](https://github.com/seanshin/werub-jitsi) | 준비 중 | — |

```sh
git clone --recurse-submodules https://github.com/seanshin/werub-his-ecosystem.git
# 이미 받았다면
git submodule update --init
```

- 「준비 중」인 폴더는 아직 없습니다. 공개되는 순간 이 표의 이름 그대로 생깁니다.
- 공개판에서 무엇이 빠졌고 어느 판을 받아야 이 자료와 같은지는 [소스 받기](../SOURCES.md)에 있습니다.

---

> 이 문서는 `node tools/build-sources.mjs` 가 `data/public-sources.json` 과 `.gitmodules` 를 대조해 만듭니다. 손으로 고치지 마십시오.
