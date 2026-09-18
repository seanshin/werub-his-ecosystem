#!/bin/sh
# 푸시 전 검사를 git 훅으로 건다 — 한 번만 돌리면 된다.
#
#   sh tools/install-hooks.sh
#
# 🔴 왜 두나 — 푸시 전 검사(발행 전 검사 + 이력 검사)를 **손으로 치다 놓친 일**이 실제로 있었다
#    (2026-09-18: 걸린 것을 출력해 놓고 그 아래에 조건 없이 「0건」 을 찍는 줄을 붙여 그대로 올렸다).
#    훅은 `.git/hooks` 에 있어 **커밋되지 않으므로**, 저장소를 다시 클론하면 이 스크립트를 다시 돌린다.
#    급할 때는 `git push --no-verify` 로 건너뛸 수 있다 — 건너뛰었다는 것을 알고 건너뛰게 하려는 것이다.
set -e
ROOT="$(git rev-parse --show-toplevel)"
HOOK="$ROOT/.git/hooks/pre-push"
cat > "$HOOK" <<'HOOK_EOF'
#!/bin/sh
set -e
cd "$(git rev-parse --show-toplevel)"
echo "── 푸시 전 검사 ─────────────────────────"
node tools/verify-all.mjs    || { echo "🔴 발행 전 검사 실패 — 푸시하지 않습니다"; exit 1; }
node tools/check-history.mjs || { echo "🔴 이력 검사 실패 — 푸시하지 않습니다"; exit 1; }
echo "── 통과 ────────────────────────────────"
HOOK_EOF
chmod +x "$HOOK"
echo "걸었습니다 — $HOOK"
echo "  · 푸시할 때 발행 전 검사(26개)와 이력 검사가 자동으로 돕니다."
echo "  · 건너뛰려면 git push --no-verify"
