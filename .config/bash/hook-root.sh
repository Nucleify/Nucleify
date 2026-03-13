#!/bin/sh

go_to_hook_root() {
  super_root="$(git rev-parse --show-superproject-working-tree 2>/dev/null || true)"

  if [ -n "$super_root" ]; then
    cd "$super_root" || return 1
    return 0
  fi

  repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
  [ -n "$repo_root" ] || return 1
  cd "$repo_root" || return 1
}
