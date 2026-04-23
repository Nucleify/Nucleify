#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

root="$(with_tmp_root wait-db-ok)"
mkdir -p "$root/vendor/bin" "$root/bin"
counter="$root/counter.txt"

cat > "$root/vendor/bin/sail" <<'EOF'
#!/usr/bin/env bash
count=0
if [ -f "$TMP_COUNTER" ]; then
  count="$(cat "$TMP_COUNTER")"
fi
count=$((count + 1))
echo "$count" > "$TMP_COUNTER"
if [ "$count" -ge 3 ]; then
  exit 0
fi
exit 1
EOF
chmod +x "$root/vendor/bin/sail"

cat > "$root/bin/sleep" <<'EOF'
#!/bin/sh
exit 0
EOF
chmod +x "$root/bin/sleep"

set +e
output="$(
  cd "$root" && PATH="$root/bin:$PATH" TMP_COUNTER="$counter" \
    bash ".config/bash/wait-for-db.sh" 2>&1
)"
status=$?
set -e

assert_equals "0" "$status" "wait-for-db exits successfully after retries"
assert_equals "3" "$(cat "$counter")" "wait-for-db should attempt until third run"
assert_contains "$output" "Database not ready, retrying"
