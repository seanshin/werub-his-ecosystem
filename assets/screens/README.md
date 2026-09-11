# 화면 캡처 — 넣는 규칙

이 폴더에는 **화면 캡처 이미지**가 들어갑니다. 화면을 설명하는 글은 [`screens/`](../../screens/)에 있고, 캡처할 화면의 목록은 [INDEX.md](INDEX.md)(자동 생성)에 있습니다.

> **EN** — Screenshot images live here. The narrative that explains each screen is in [`screens/`](../../screens/); the list of screens to capture is [INDEX.md](INDEX.md), generated from the HIS menu inventory. **Images are not readable by the text-based public checker**, so every image must be reviewed by a person and recorded in the [capture ledger](../CAPTURE-LEDGER.md) before it is published.

## 🔴 찍기 전에

1. **가상 병원 데이터로만 찍습니다.** 실환자 · 실직원 · 실기관 정보가 화면에 있으면 찍지 않습니다.
2. 화면에 아래가 보이면 **가리고 찍거나, 찍은 뒤 가립니다.**

   | 가릴 것 | 예 |
   |---|---|
   | 기관 식별 정보 | 실제 병원명 · 주소 · 전화 · 요양기관 기호 · 기관 코드 · 협력 기관명 |
   | 사람 | 실명 · 주민등록번호 · 연락처 · 환자번호(가상 데이터라도 실제 형식이면 가림) |
   | 인프라 정보 | 주소창의 호스트 · IP · 포트 · 서버 경로 · 프로세스 이름 · 계정 |
   | 비밀값 | 토큰 · API 키 · 세션 값 · 비밀번호(브라우저 저장 표시 포함) |

3. **주소창과 탭 제목을 함께 찍지 않습니다.** 화면 영역만 찍거나, 주소창을 가립니다.
4. 브라우저 확장 아이콘 · 북마크바 · 알림 팝업이 함께 찍히지 않게 합니다.

## 파일

| 항목 | 규칙 |
|---|---|
| 형식 | PNG(글자가 있는 화면) · 사진 성격이면 JPEG |
| 이름 | `his-<도메인키>-<화면경로 슬러그>.png` — 목록은 [INDEX.md](INDEX.md) 가 정합니다. 예) `/clinic-queue` · 도메인 `care` → `his-care-clinic-queue.png` |
| HIS 밖 시스템 | `<시스템키>-<화면 슬러그>.png` — 예) `lis-result-verify.png` · `pacs-reading-worklist.png` |
| 크기 | 가로 1600px 안팎 · 파일 하나 1MB 이하를 목표로 합니다(글자가 읽혀야 합니다) |
| 배율 | 브라우저 배율 100% · 다크 모드와 라이트 모드를 섞지 않습니다 |

## 넣는 절차

1. 찍습니다(가상 데이터 · 위의 가릴 것 확인).
2. `assets/screens/` 에 규칙대로 된 이름으로 넣습니다.
3. `node tools/build-screen-index.mjs` — 목록의 상태가 ⬜ 에서 ✅ 로 바뀝니다.
4. [캡처 대장](../CAPTURE-LEDGER.md)에 한 줄 적습니다.
5. **사람이 이미지를 눈으로 확인하고** 대장에 `확인` 을 표시합니다.
6. `node tools/verify-all.mjs` 를 통과시킨 뒤 커밋합니다.

> ⚠️ **글자 검사기는 이미지 속 글자를 볼 수 없습니다.** 5번을 건너뛴 이미지는 공개 검사기가 "미확인"으로 보고합니다. 대장에 `확인` 이 없는 이미지는 공개하지 않습니다.
