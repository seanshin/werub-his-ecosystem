# 연동 계약의 공통 규약

> **EN** — What the wire looks like once two systems are connected: the **error envelope each system returns** (they differ — where you dig the code out of is not the same in HIS/LIS, ERP, sign, PACS), **what the HMAC signature is computed over** (raw body vs. `timestamp.body`, with or without a `sha256=` prefix, under different header names), **idempotency keys**, **retry and backoff**, and the places where **a 2xx does not mean "applied"**. Read from the code at the base commit on 2026-09-18; not yet confirmed by the owning projects. Request/response field lists per connection are **not** here — this document says so plainly rather than inventing them.

> 🟡 **초안** — 기준 커밋([`data/base-commits.json`](../data/base-commits.json))의 코드를 읽어 적었습니다(2026-09-18). **시스템 담당 확인 전**입니다.
> 카드는 「A 를 B 에 **어떻게 붙이나**」까지 말합니다([연결 카드 48장](cards/)). 이 문서는 붙인 **뒤에 오가는 메시지의 공통 규약**입니다.

---

## 1. 오류 봉투가 시스템마다 다릅니다

| 시스템 | 성공 | 실패 | 코드를 꺼내는 자리 |
|---|---|---|---|
| **HIS** · **LIS** | `{ data, meta? }` | `{ error: { code, message, details }, meta }` | `body.error.code` |
| **ERP** | 경로마다 | `{ error: { code, message, details } }` | `body.error.code` |
| **sign** | 경로마다 | 입력 검증 실패는 **400** `{ error: { code: "VALIDATION", … } }` | `body.error.code` |
| **PACS** | 경로마다 | 표준 형식 `{ "detail": "…" }` | `body.detail` (**코드가 없습니다** — 문자열입니다) |
| **edu**(웹훅 수신) | `{ data: { ok, applied, event, reason? } }` | 서명 불일치는 **401** | 아래 [5절](#5-2xx-가-반영됨을-뜻하지-않는-자리) |
| **AI Server** | — | — | 🔴 이 자료는 공통 오류 모양을 **확인하지 않았습니다** |

🔴 **한 시스템에 맞춰 만든 오류 처리기를 다른 시스템에 그대로 쓰면 메시지가 사라집니다.** `body.error.code` 를 읽는 코드로 PACS 응답을 받으면 `undefined` 가 나옵니다(PACS 는 `detail` 문자열 하나입니다).

**HIS 가 상태코드로 구분해 말하는 것** — 데이터베이스 오류를 500 으로 뭉개지 않고 갈라 놓았습니다.

| 상황 | 상태 | 코드 |
|---|---|---|
| 고칠 대상을 못 찾음 | 404 | `NOT_FOUND` |
| 이미 있는 값(유니크 충돌) | 409 | `DUPLICATE` |
| 식별자 형식이 아님 | 400 | `INVALID_FORMAT` |
| 연결된 대상이 올바르지 않음 | 400 | `FK_CONSTRAINT` |
| 그 밖의 예기치 못한 것 | 500 | `INTERNAL_ERROR`(내부 메시지는 감춥니다) |

**sign 은 선언되지 않은 입력 필드를 조용히 버립니다** — 보낸 쪽은 200 을 받았는데 값이 반영되지 않는 모양이 됩니다. 새 필드를 보내려면 받는 쪽이 먼저 그 필드를 선언해야 합니다.

---

## 2. 서명 — 무엇에, 어떻게 거나

HMAC-SHA256 이라는 점은 같지만 **세 가지가 연결마다 다릅니다**.

| 보내는 쪽 → 받는 쪽 | 헤더 이름 | 서명 대상 | `sha256=` 접두사 |
|---|---|---|---|
| HIS → 웹훅 구독자(edu · 그룹웨어 채널 등) | `X-HIS-Signature` (+ `X-HIS-Signature-Ts`) | 본문 그대로 (Ts 쪽은 `시각.본문`) | **있음** |
| HIS → ERP 인박스 | `X-Signature` | `시각.본문` | **없음** |
| LIS → ERP | `X-Integration-Signature` (+ `X-Integration-Ts`) | `시각.본문` | 있음 |
| sign → 구독자(edu 등) | `X-Sign-Signature` | 본문 그대로 | — |
| 그룹웨어 → HIS | `X-Clinic-Signature` | 본문 그대로 | — |

🔴 **자주 어긋나는 세 자리** — ① 접두사 `sha256=` 의 유무 ② 서명 대상이 **본문만**인지 **`시각.본문`** 인지 ③ 헤더 이름. 셋 중 하나만 달라도 401 이고, 401 만으로는 어느 것이 틀렸는지 알 수 없습니다. **붙이기 전에 세 가지를 문서로 맞추십시오.**

**시각과 재전송**
- 시각 헤더는 이름이 여럿입니다 — HIS 는 `X-Sign-Timestamp` 와 `X-Timestamp` 를 **같은 값으로 함께** 보냅니다(받는 쪽이 어느 이름을 보든 되도록).
- ERP 수신부는 시각 어긋남을 **300초**까지 받아들이고, 그 창 안에서 **같은 서명은 한 번만** 받습니다(같은 요청을 그대로 다시 보내면 거부됩니다).
- HIS 는 ERP 로 보낼 때 매 발송·매 재시도마다 **새 nonce** 를 붙입니다 — 재시도는 같은 내용이어도 서명이 달라집니다.
- 서명 비교는 **길이가 다르면 바로 실패, 같으면 timing-safe 비교**입니다(edu 수신부에서 확인).

🔴 **양쪽 시계가 맞아야 합니다.** 시각을 서명에 넣는 연결(ERP · LIS → ERP)은 시계가 5분 이상 어긋나면 **모든 요청이 401** 입니다.

---

## 3. 멱등 — 같은 것을 두 번 보내면

| 자리 | 무엇으로 가르나 |
|---|---|
| HIS 발신 대기열(outbox) | **(도메인, 참조)** 한 쌍이 유니크 — 같은 사건을 두 번 적재해도 한 행으로 남습니다 |
| 여러 구독자에게 같은 사건을 보낼 때 | 내부적으로는 구독자별 행이지만, **받는 쪽에 가는 참조 값은 원래 값 하나**로 맞춥니다 — 수신측 멱등키가 구독자마다 달라지지 않습니다 |
| sign → edu 완료 통지 | 본문의 **사건 번호** |
| edu → 그룹웨어 알림 | **`Idempotency-Key` 헤더** |
| ERP 수신 | 신선도 창 안의 **같은 서명**은 한 번만 |

받는 쪽을 만들 때는 **같은 키로 두 번 와도 한 번만 반영**되게 하고, 두 번째에도 **성공으로 답하십시오**(오류로 답하면 보내는 쪽이 재시도를 계속합니다).

---

## 4. 재시도 — 실패하면 언제 다시 오나

| 보내는 쪽 | 주기 | 실패하면 | 멈추면 |
|---|---|---|---|
| **HIS** 발신 대기열 | **20초**마다 디스패처가 훑습니다 | **2ⁿ초**씩 뒤로 미룹니다(n = 시도 횟수 · **최대 1시간**) | 정해진 횟수를 넘기면 `FAILED` — **자동 재시도가 멈춥니다.** 관리 화면에서 손으로 다시 보냅니다 |
| **sign** 통지 | 기본 **5분**마다 재시도 배치 | 다시 보냅니다 | 계속 실패하면 `DEAD` — 따로 되살려야 합니다 |
| **LIS** Reflex 폴링 | **10분** | 다음 주기에 다시 | — |

🔴 **sign 의 재시도 배치는 끌 수 있습니다.** 끄면(스케줄러 비활성) **외부에서 주기적으로 불러 줘야** 밀린 통지가 나갑니다 — 끄고 부르지 않으면 통지가 영영 멈춥니다.

받는 쪽은 **응답이 느려도 재시도가 온다**는 전제로 만드십시오. 처리에 시간이 걸리면 먼저 접수(2xx)하고 나중에 처리하는 편이 안전합니다.

---

## 5. 2xx 가 「반영됨」을 뜻하지 않는 자리

- **edu 의 HIS 직원 사건 수신** — 모르는 사건 종류, 사람을 못 찾은 경우에도 **200** 으로 답하고 본문에 `applied: false` 와 이유(`unhandled-event-type` · `unknown-staffId-no-userId` · `no-identifier` · `known-event-not-mapped`)를 담습니다. 🔴 **상태코드가 아니라 `applied` 를 보십시오.** 200 만 세면 「다 반영됐다」로 읽힙니다.
- **큐에 접수만 하는 수신부**(예: LIS → ERP 검사 청구) — **202** 는 「받았다」이지 「산정했다」가 아닙니다. 결과는 상태 조회로 봅니다.
- **HIS 리허설 모드** — 발신 대기열이 **쌓이기만 하고 나가지 않습니다**. 보낸 쪽 화면에는 이상이 없어 보입니다([S8](../build-guide/S8-go-real.md)).

---

## 6. 이 문서가 말하지 않는 것

| 없는 것 | 어떻게 하나 |
|---|---|
| **연결마다의 요청·응답 필드 목록과 예시** | 없습니다. 저장소가 열리면 각 시스템의 API 문서를 따릅니다([소스 받기](../SOURCES.md)) |
| **오류 코드의 전체 목록** | 없습니다. 위 표는 **공통 봉투와 HIS 의 대표 코드**까지입니다 |
| **샌드박스 · 모의 서버 · 샘플 페이로드** | 없습니다 |
| **AI Server 의 공통 오류 모양** | 확인하지 않았습니다 |
| **담당 확인** | 🔴 전부 기준 커밋 코드를 읽은 것입니다. 각 시스템 담당의 확인을 받지 않았습니다 |

이어지는 문서 — [연결 카드](cards/) · [연동 계약 지도](README.md) · [연결 상태 표](../RELEASES/2026.09/compatibility.md)
