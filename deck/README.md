# F 발표 덱
**F — Presentation deck**

> **EN** — A visual summary of the overview (A) and the demo scenarios (E), written for the hospital director or CIO deciding whether to build on this ecosystem: 29 content slides plus 6 section covers, in six parts — intent, structure, build, **current status**, demo, and terms. It renders directly on GitHub (mermaid included) and converts to slides or PDF with Marp using `marp-header.yml`.


A 개요서 · E 데모 시나리오의 **시각 요약**입니다. 이 생태계로 AI 기반 HIS 를 세울지 정하는 **병원장 · CIO** 가 한 번에 볼 수 있게 썼습니다.

> 🟡 **초안** — 시스템 담당 확인 전 · 새 설치본 따라가기 전 · **화면 캡처 없음**(데모 병원 이름을 정한 뒤 넣습니다)
> 기준: [통합 릴리즈 초안 매니페스트](../RELEASES/draft/manifest.md)(계측일 2026-09-11)

## 본문

**→ [slides.md](slides.md)** — 내용 슬라이드 29장 + 장 표지 6장. GitHub 에서 그대로 읽히고, mermaid 도식도 바로 그려집니다.

## 짜임

| 장 | 슬라이드 | 무엇을 말하나 | 근거 |
|---|---:|---|---|
| 표지 · 읽는 법 | 2 | 한 문장 · 상태 표기 · 근거 원칙 | [A README](../overview/README.md) |
| **Ⅰ 왜 — 취지** | 4 | 한 문장 · 왜 만들었나 · 취지 8가지 · **얻는 것과 감수하는 것** | [A 1 · 2장](../overview/) |
| **Ⅱ 무엇으로 — 구조** | 10 | 계층 지도 · 시스템 13 · 규모와 서버 · 환자 여정 · 신원 · 신뢰 · 표준 · AI 3장 | [A 3~6장](../overview/) · [도식 ①③④⑤⑥⑦⑧](../diagrams/) |
| **Ⅲ 어떻게 세우나 — 구축** | 4 | S0~S8 · 단계별 결정 수 · 체크리스트 셋 · 시작 전 세 가지 | [A 7장](../overview/07-build-path.md) · [② 로드맵](../diagrams/build-roadmap.md) |
| **Ⅳ 지금 상태** | 4 | **`검증됨` 0** · 시스템별 상태 · 알고 시작할 것 · 준비할 것 | [A 8장](../overview/08-status-and-preparation.md) · [연결 상태](../RELEASES/draft/compatibility.md) |
| **Ⅴ 데모로 보기** | 2 | 시나리오 4 합계 · 외래 34단계 한 장 | [E 시나리오](../scenarios/) |
| **Ⅵ 조건과 다음** | 3 | MIT 세 겹 · 면책 · 남은 일 · 역할별 읽을 것 | [A 9 · 10장](../overview/) · [THIRD_PARTY](../THIRD_PARTY.md) |

## 이 덱이 지키는 것

- **수치는 값 · 센 방법 · 계측일을 함께** 적습니다. 계측하지 않은 것은 "충분하다"고 쓰지 않고 **"아직 계측이 없다"** 고 적습니다.
- **연결 상태는 [연결 상태 표](../RELEASES/draft/compatibility.md)에서만** 옮깁니다. 표에 없는 연결은 지어내지 않습니다.
- **AI 는 "보조한다 · 초안을 만든다"** 로만 적습니다. 진단 · 판단한다고 쓰지 않습니다.
- **규제는 3단계 표기**(`대응 설계` · `자체 점검 완료` · `외부 인증·승인`)만 씁니다. 지금은 모두 `대응 설계` 입니다.
- 기관 식별 정보 · 주소 · 포트 · 호스트 이름 · 비밀값을 싣지 않습니다.

## 슬라이드로 바꾸려면

발행 형식은 아직 정해지지 않았습니다([ROADMAP](../ROADMAP.md)). 저장소 안의 markdown 이 정본이고, 슬라이드 · PDF 는 여기서 만듭니다.

[`marp-header.yml`](marp-header.yml) 을 앞에 붙여 [Marp](https://marp.app) 로 변환합니다(`---` 하나가 슬라이드 하나입니다).

```sh
cat deck/marp-header.yml deck/slides.md > /tmp/deck.md
npx @marp-team/marp-cli /tmp/deck.md --pdf   --allow-local-files -o deck.pdf
npx @marp-team/marp-cli /tmp/deck.md --html  --allow-local-files -o deck.html
```

- 변환본(`deck.pdf` · `deck.html`)은 **저장소에 넣지 않습니다.** 필요할 때 만듭니다.
- mermaid 도식은 Marp 가 그리지 않습니다. 슬라이드로 쓸 때는 [도식](../diagrams/)에서 이미지로 내보내 바꿔 넣고, [캡처 대장](../assets/CAPTURE-LEDGER.md)에 한 줄 적은 뒤 사람이 확인합니다.
- 이미지를 넣은 뒤에는 발행 전에 `node tools/verify-all.mjs` 를 다시 통과시킵니다. **글자 검사기는 이미지 속 글자를 볼 수 없습니다.**

## 고칠 때

이 덱은 A 개요서 · E 시나리오의 **요약**입니다. 사실이 바뀌면 **원본을 먼저 고치고** 덱을 맞춥니다.

| 무엇이 바뀌면 | 덱의 어디를 고치나 |
|---|---|
| [연결 상태 표](../RELEASES/draft/compatibility.md) | Ⅱ 환자 여정 · 표준 · **Ⅳ 연결 상태 합계** · Ⅴ 시나리오 합계 |
| [매니페스트](../RELEASES/draft/manifest.md) | Ⅱ 시스템 13 · Ⅳ 시스템별 구현 상태 · Ⅵ 저장소 라이선스 표기 |
| [계측 스냅샷](../data/) | Ⅱ 규모와 서버 |
| [체크리스트](../checklist/) | Ⅲ 단계별 결정 수 · 체크리스트 셋 |
| 새 설치본 따라가기 결과 | Ⅳ 「실제로 호출해 확인한 연결은 아직 없습니다」 전체 · Ⅵ 남은 일 |
