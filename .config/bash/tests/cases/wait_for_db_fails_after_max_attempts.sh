#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

root="$(with_tmp_root wait-db-fail)"
mkdir -p "$root/vendor/bin" "$root/bin"

cat > "$root/vendor/bin/sail" <<'EOF'
#!/usr/bin/env bash
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
  cd "$root" && PATH="$root/bin:$PATH" \
    bash ".config/bash/wait-for-db.sh" 2>&1
)"
status=$?
set -e

assert_equals "1" "$status" "wait-for-db fails after max attempts"
assert_contains "$output" "Failed to connect to database after 10 attempts."
