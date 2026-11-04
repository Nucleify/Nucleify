#!/usr/bin/env bash
# Source repo-root .env into the current shell (idempotent).
# shellcheck disable=SC1091

_load_root_env_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
_load_root_env_file="${_load_root_env_dir}/.env"

if [[ -f "$_load_root_env_file" ]]; then
  set -a
  # shellcheck disable=SC1090
  . "$_load_root_env_file"
  set +a
fi

require_linked_db_password() {
  if [[ -n "${SUPABASE_DB_PASSWORD:-}" ]]; then
    return 0
  fi
  echo "Linked Supabase DB needs SUPABASE_DB_PASSWORD in the repo-root .env." >&2
  echo "  Dashboard → Project Settings → Database → Database password" >&2
  echo "  Then: SUPABASE_DB_PASSWORD=... in .env and re-run." >&2
  return 1
}
