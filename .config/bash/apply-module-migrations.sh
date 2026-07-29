#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
PKG_DIR="$ROOT_DIR/root"
SUPABASE_LOCAL_BIN="${PKG_DIR}/node_modules/.bin/supabase"
if [[ ! -x "$SUPABASE_LOCAL_BIN" ]]; then SUPABASE_LOCAL_BIN="$ROOT_DIR/node_modules/.bin/supabase"; fi
MODE="${1:-linked}"
if [[ "$MODE" != "linked" && "$MODE" != "local" ]]; then
  echo "Usage: bash .config/bash/apply-module-migrations.sh [linked|local]"
  exit 1
fi

DB_FLAG="--linked"
if [[ "$MODE" == "local" ]]; then
  DB_FLAG="--local"
fi

shopt -s nullglob
module_sources=( "$ROOT_DIR"/shared_modules/*/supabase/migrations/*.sql )

if [[ ${#module_sources[@]} -eq 0 ]]; then
  echo "No module migrations found under shared_modules/*/supabase/migrations."
  exit 0
fi

bash "$SCRIPT_DIR/merge-module-supabase-sql.sh" migrations
MERGED="$ROOT_DIR/supabase/.temp/merged_migrations.sql"
if [[ ! -f "$MERGED" ]]; then
  echo "Expected merged file missing: $MERGED"
  exit 1
fi

lines="$(wc -l < "$MERGED" | tr -d ' ')"
bytes="$(wc -c < "$MERGED" | tr -d ' ')"
echo "Applying merged module migrations ($MODE)..."
echo " -> supabase/.temp/merged_migrations.sql (${lines} lines, ${bytes} bytes)"
echo "    (pierwsze logi z CLI mogą pojawić się dopiero po stronie Supabase — to nie jest zawieszenie terminala)"

if [[ -x "$SUPABASE_LOCAL_BIN" ]]; then
  "$SUPABASE_LOCAL_BIN" db query "$DB_FLAG" -f "supabase/.temp/merged_migrations.sql"
elif command -v supabase >/dev/null 2>&1; then
  supabase db query "$DB_FLAG" -f "supabase/.temp/merged_migrations.sql"
else
  npx --yes supabase db query "$DB_FLAG" -f "supabase/.temp/merged_migrations.sql"
fi

echo "Module migrations applied successfully."
