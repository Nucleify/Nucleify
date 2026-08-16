#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
PKG_DIR="$ROOT_DIR/web"
SUPABASE_LOCAL_BIN="${PKG_DIR}/node_modules/.bin/supabase"
if [[ ! -x "$SUPABASE_LOCAL_BIN" ]]; then SUPABASE_LOCAL_BIN="$ROOT_DIR/node_modules/.bin/supabase"; fi
KIND="${1:-}"
MODE="${2:-linked}"

if [[ "$KIND" != "factories" && "$KIND" != "seeders" ]]; then
  echo "Usage: bash .config/bash/apply-module-sql.sh [factories|seeders] [linked|local]"
  exit 1
fi

if [[ "$MODE" != "linked" && "$MODE" != "local" ]]; then
  echo "Usage: bash .config/bash/apply-module-sql.sh [factories|seeders] [linked|local]"
  exit 1
fi

DB_FLAG="--linked"
if [[ "$MODE" == "local" ]]; then
  DB_FLAG="--local"
fi

shopt -s nullglob
if [[ "$KIND" == "seeders" ]]; then
  found_any=0
  for module_dir in "$ROOT_DIR"/shared_modules/*; do
    [[ -d "$module_dir" ]] || continue
    module_seeder="$module_dir/supabase/seeders/module_seeder.sql"
    if [[ -f "$module_seeder" ]]; then
      found_any=1
      break
    fi
    legacy_seeders=( "$module_dir"/supabase/seeders/*.sql )
    if [[ ${#legacy_seeders[@]} -gt 0 ]]; then
      found_any=1
      break
    fi
  done

  if [[ "$found_any" -eq 0 ]]; then
    echo "No module seeders found under shared_modules/*/supabase/seeders."
    exit 0
  fi
else
  sources=( "$ROOT_DIR"/shared_modules/*/supabase/"$KIND"/*.sql )
  if [[ ${#sources[@]} -eq 0 ]]; then
    echo "No module $KIND found under shared_modules/*/supabase/$KIND."
    exit 0
  fi
fi

bash "$SCRIPT_DIR/merge-module-supabase-sql.sh" "$KIND"
MERGED="$ROOT_DIR/supabase/.temp/merged_${KIND}.sql"
if [[ ! -f "$MERGED" ]]; then
  echo "Expected merged file missing: $MERGED"
  exit 1
fi

lines="$(wc -l < "$MERGED" | tr -d ' ')"
bytes="$(wc -c < "$MERGED" | tr -d ' ')"
echo "Applying merged module $KIND ($MODE)..."
echo " -> supabase/.temp/merged_${KIND}.sql (${lines} lines, ${bytes} bytes)"
echo "    (pierwsze logi z CLI mogą pojawić się dopiero po stronie Supabase — to nie jest zawieszenie terminala)"

if [[ -x "$SUPABASE_LOCAL_BIN" ]]; then
  "$SUPABASE_LOCAL_BIN" db query "$DB_FLAG" -f "supabase/.temp/merged_${KIND}.sql"
elif command -v supabase >/dev/null 2>&1; then
  supabase db query "$DB_FLAG" -f "supabase/.temp/merged_${KIND}.sql"
else
  # --yes: bez tego npx potrafi czekać na interakcję i wyglądać jak „zacięcie”
  npx --yes supabase db query "$DB_FLAG" -f "supabase/.temp/merged_${KIND}.sql"
fi

echo "Module $KIND applied successfully."
