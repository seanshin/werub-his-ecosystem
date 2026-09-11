# 도식 원본
**Diagram sources**

> **EN** — Eight hand-drawn diagrams plus one generated connection map, all in **mermaid** (no ASCII art), rendered directly by GitHub. Each carries a short explanation and the public document it was derived from. The connection map is generated from the connection-status table by `tools/build-diagrams.mjs` — do not edit it by hand.


생태계를 그림으로 봅니다. 모든 도식은 **mermaid** 원본이며(ASCII 그림은 쓰지 않습니다), GitHub 에서 바로 그려집니다. 도식마다 짧은 설명과 **근거**(어느 공개 문서에서 가져왔는지)를 함께 적었습니다.

> 🟡 **초안** — 도식의 상태 표기는 [통합 릴리즈 초안](../RELEASES/draft/)(2026-09-11)을 따릅니다. 실제 호출로 `검증됨`을 붙이는 일은 새 설치본으로 구축 절차를 따라가며 합니다([ROADMAP](../ROADMAP.md) P1).

| # | 도식 | 한 줄 | 만든 방법 | 상태 |
|---|---|---|---|---|
| ① | [계층 생태계 지도](layers.md) | 시스템 13개를 7계층(코어 · 환자 접점 · 임상 부서 · 신뢰 · 경영 · AI · 협업·교육)으로 | 손으로 | 초안 |
| ② | [구축 단계 로드맵](build-roadmap.md) | S0 준비 ~ S8 리얼 전환, 단계별 사람이 정할 것, S6 에서 AI 를 끄고 결정으로 켜는 순서 | 손으로 | 초안 |
| ③ | [환자 여정 스윔레인](patient-journey.md) | 예약부터 원격 상담까지 시스템 경계를 건너는 화살표와 그 연결 상태 | 손으로 | 초안 |
| ④ | [신원 허브](identity-hub.md) | HIS 가 발급한 토큰을 공개키 5곳 · 공유 비밀키 2곳 · API 키 1곳이 받는 구조 | 손으로 | 초안 |
| ⑤ | [신뢰의 사슬](trust-chain.md) | sign 의 PKI · 타임스탬프 · 감사 해시체인과, 서명 요청 · 감사 이벤트를 보내는 시스템 | 손으로 | 초안 |
| ⑥ | [표준 층](standards.md) | FHIR · SMART · CDS Hooks · DICOM · IHE · HL7 v2 · ASTM · 코드 체계와 그 표준을 쓰는 연결 | 손으로 | 초안 |
| ⑦ | [AI 호출 지도](ai-map.md) | 각 시스템 → AI Server 호출, `local_only` 경계, 기관이 직접 받는 모델 가중치 | 손으로 | 초안 |
| ⑧ | [배포 구성(일반형)](deployment.md) | 앱 서버 한 대 + GPU 서버 한 대 + 선택 영상 저장소, 서버 한 대 실측 기록 | 손으로 | 초안 |
| — | [연결 지도](connections.md) | 시스템 쌍마다 선 하나, 상태별 연결 수 — 연결 표와 기계적으로 일치 | **생성**(`tools/build-diagrams.mjs`) | 초안 |

## 도식을 고칠 때

- **연결 지도(`connections.md`)는 직접 고치지 않습니다.** 연결 표([`RELEASES/draft/compatibility.md`](../RELEASES/draft/compatibility.md))에서 만듭니다.

  ```sh
  node tools/build-diagrams.mjs          # 다시 만들기
  node tools/build-diagrams.mjs --check  # 연결 표와 같은지 확인만(다르면 종료 코드 1)
  ```

- 손으로 그린 도식(①~⑧)에 연결 상태를 적을 때는 연결 표의 값만 옮깁니다. 연결 표에 없는 구간은 지어내지 않고 `확인 중`으로 적습니다.
- 연결 표가 바뀌면 연결 지도를 다시 만들고, 손으로 그린 도식의 상태 표기를 함께 대조합니다([ROADMAP §8](../ROADMAP.md#8-발행-전-검사) 4번 — 도식 · 본문 · 연동 지도의 상태 일치).
- 기관 식별 정보 · 주소 · 포트 · 호스트 이름은 도식에 넣지 않습니다. 발행 전 `node tools/check-public.mjs` 를 통과시킵니다.
