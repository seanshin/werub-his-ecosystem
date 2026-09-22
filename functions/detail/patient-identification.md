# 환자 확인 — 이름만으로 사람을 특정하지 않는다

**Patient identification — a name is not an identifier**

> **EN** — Misidentifying a patient is the failure that every other safeguard sits on top of, so identification appears in several places at once: a check record with a type and a method, machine matching before medication and transfusion, an identity band for newborns, and a deliberate refusal to treat a name as an identifier in the emergency department, where unknown patients and shared names genuinely occur. Two details are worth reading. First, the identification statistics return **"cannot compute" rather than 0%** when nothing has been recorded, because a screen that says "no identification errors in 30 days" over an empty table is the most convincing lie the system can tell. Second, the newborn band gate records its violation **before** the registration when blocking and **after** it when warning — a blocked registration has nothing to point at, while a warned one must point at the newborn that was created. Most of these gates ship **off**. Sits on judgment rules ① honesty, ③ guards and ④ gates.

## 1. 무엇을 하나

환자를 잘못 아는 일은 **다른 모든 안전장치가 그 위에 서 있는 실패**입니다. 약이 맞아도 환자가 다르면 소용이 없습니다.

그래서 식별은 한 기능이 아니라 **여러 자리에 동시에** 있습니다.

| 자리 | 무엇 |
|---|---|
| **확인 기록** | 언제 · 어떤 상황에서 · 어떤 방법으로 확인했는가 |
| **기계 대조** | 투약 · 수혈 전 스캔 |
| **신생아 식별밴드** | 모아 오식별 |
| **응급실** | 🔴 **이름으로 특정하지 않는다** |

## 2. 어떻게 도나

### ① 확인 기록 — 상황과 방법을 함께 남긴다

| 축 | 값 |
|---|---|
| 상황 | 입원 · 시술 · 투약 · 수혈 · 검체 |
| 방법 | 팔찌 · 구두 · 바코드 · 두 가지 식별자 |
| 결과 | 통과 · 실패 |

통계는 상황별·방법별로 **실패율**을 함께 냅니다 — **어느 상황에서, 어떤 방법으로 확인할 때 실패가 나는지**가 개선의 단서이기 때문입니다.

🔴 **관측이 하나도 없으면 비율을 내지 않습니다**(산출 불가). 빈 표 위에 **「최근 30일 식별 오류가 없습니다 ✓」**라고 적는 것은 이 시스템이 할 수 있는 **가장 설득력 있는 거짓말**입니다 — 실제로 한동안 그렇게 적고 있었습니다([취지 1](../../overview/02-principles.md#화면이-모른다고-말하는-아홉-가지-방식)).

### ② 기계 대조 — 사람 눈 대신 스캔

| 자리 | 무엇 |
|---|---|
| 투약 | 손목밴드와 약품 바코드를 맞춰 봅니다. 🔴 **불일치는 모드와 무관하게 차단**입니다([투약](medication-administration.md)) |
| 수혈 | 시작 전 **환자와 혈액백 대조** 게이트(기준 커밋 기본 **꺼짐**)([수혈 안전](transfusion-safety.md)) |
| 검체 | 채취 라벨에 **바코드**를 담아 손으로 옮겨 적지 않게 합니다([검체](specimen-lifecycle.md)) |

### ③ 신생아 식별밴드 — 🔴 기록하는 **시점**이 모드마다 다르다

밴드 번호 없이 신생아를 등록하는 것을 막는 게이트입니다(기준 커밋 기본 **꺼짐**).

| 모드 | 기록 시점 | 왜 |
|---|---|---|
| 차단 | 🔴 **등록 전** | 막아야 하므로 등록이 일어나기 전에 남깁니다 |
| 경고 | 🔴 **등록 후** | **생성된 신생아를 지목해야** 나중에 추적할 수 있습니다 |

→ 같은 게이트가 **모드에 따라 기록 시점을 바꾸는** 드문 예입니다. 코드가 이유를 적어 두었습니다 — **모아 오식별은 되돌릴 수 없는 사건**이라, 경고로 켜 둔 기간에 **아무 흔적도 남지 않으면 차단으로 올릴 근거가 영영 생기지 않습니다**([안전 게이트](safety-gates.md)).

**다태아**는 출생 순번이 겹치지 않게 **분만 기록에 행 잠금**을 걸고, 마지막 방어선으로 **순번 중복 자체를 막는 제약**을 둡니다.

### ④ 응급실 — 🔴 **동명이인과 신원미상은 실제로 일어난다**

응급실 대기 목록은 이름과 함께 **환자번호를 반드시** 싣습니다. 코드가 그대로 적습니다 — **이름만으로 환자를 특정하면 안 된다.**

같은 화면에서 나온 다른 교훈도 있습니다. 🔴 **처분 결과 항목을 서버가 안 주는 동안, 화면은 처분이 끝난 환자를 전부 「대기」로 분류**했습니다. 화면은 그 값으로 나누고 있었고 서버는 주지 않았으니 **모두 빈 값**이 된 것입니다 — **몇 건 남지 않은 상황이 수십 명 대기로** 보였습니다.

→ 이 저장소의 규칙이 여기서 나옵니다 — **화면이 쓰는 값은 서버 계약에 있어야 하고, 없으면 화면은 조용히 틀린 말을 합니다**(판정 규칙 ②).

## 3. 🔴 왜 그렇게 만들었나

- **표본 0에 비율을 내지 않는 이유.** 식별은 **안 하고 있을 때 가장 위험**한데, 안 하고 있으면 기록도 없습니다. 0%를 내면 **가장 위험한 상태가 가장 좋아 보입니다**(판정 규칙 ①).
- **상황과 방법을 함께 남기는 이유.** 「식별 오류 N건」만으로는 **무엇을 고칠지** 알 수 없습니다. 수혈 전 구두 확인에서 실패가 나는 것과 검체 채취 바코드에서 실패가 나는 것은 **전혀 다른 문제**입니다.
- **차단과 경고의 기록 시점을 바꾼 이유.** 위 ③ 그대로 — **차단은 가리킬 대상이 없고, 경고는 가리킬 대상이 생깁니다.**
- **다태아에 행 잠금을 건 이유.** 동시에 등록되면 **같은 순번이 두 번** 생깁니다. 신생아 식별에서 순번은 **구별의 일부**입니다.
- **응급실에서 이름을 식별자로 쓰지 않는 이유.** 코드가 적은 그대로 — **동명이인과 신원미상이 실제로 발생**합니다.
- 🔴 **찾지 못한 것** — 확인 방법 네 가지 중 **어떤 상황에 어떤 방법을 요구하는지**는 코드에 규칙으로 들어 있지 않습니다. **기관이 정해서 운영으로 지켜야 하는 부분**입니다.

## 4. 🔴 무엇을 막나

- **빈 표 위의 「오류 없음 ✓」** — 관측이 없으면 비율을 내지 않습니다
- **「식별 오류 N건」만 보여 주는 것** — 상황별·방법별로 나눠 셉니다
- **다른 환자에게 약이 가는 것** — 스캔 불일치는 모드와 무관하게 차단입니다
- **밴드 없는 신생아 등록** — 게이트를 켰을 때
- **경고 모드에서 흔적이 남지 않는 것** — 등록 후에 기록해 대상을 지목합니다
- **다태아 순번이 겹치는 것** — 행 잠금과 중복 제약
- **이름으로 환자를 특정하는 것** — 응급 목록은 환자번호를 함께 싣습니다
- **서버에 없는 값으로 화면이 분류하는 것** — 계약에 항목을 넣습니다
- **막지 못하는 것** — 🔴 **신생아 밴드 게이트와 수혈 전 스캔 게이트는 기준 커밋 기본이 꺼짐**입니다. 그리고 🔴 **어떤 상황에 어떤 확인 방법을 쓸지는 시스템이 강제하지 않습니다** — 기관의 규칙입니다

## 5. 어디서 보나 · 확인된 범위

[HIS 구성서](../../systems/his.md) · [HIS 화면 — 환자안전 · 응급실](../../screens/his.md) · [투약](medication-administration.md) · [수혈 안전](transfusion-safety.md) · [검체](specimen-lifecycle.md) · [안전 게이트](safety-gates.md) · [간호 안내](../../clinicians/nursing.md) · [응급 시나리오](../../scenarios/02-emergency.md)

- 🔴 **실제 호출로 확인하지 않았습니다.** 새 설치본 따라가기에서 **확인 기록 · 신생아 등록 · 응급 대기 목록을 부르지 않았습니다** — 화면은 캡처돼 있으나(가상 병원 데이터), 이 글은 기준 커밋 코드를 읽은 것입니다([따라가 본 결과](../../build-guide/follow-along-2026-09.md)).
- 기본 모드(신생아 밴드 · 수혈 전 스캔 모두 **꺼짐**)는 **기준 커밋 코드를 읽은 값**이며 설치본의 **현재** 설정이 아닙니다.
- 이 기능은 **한 시스템 안**에서 끝나므로 [연결 상태 표](../../RELEASES/2026.09/compatibility.md)에는 나오지 않습니다. 형제 시스템이 환자를 어떻게 맞춰 보는지는 [연동 계약의 공통 규약](../../integration/contracts.md)을 보십시오.
