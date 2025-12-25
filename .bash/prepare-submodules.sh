#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

. "$SCRIPT_DIR/utils/print_separator.sh"
. "$SCRIPT_DIR/utils/colors.sh"

DEFAULT_BRANCH="main"
GITHUB_URL="https://github.com/Nucleify"
SUBMODULES_FILE="$SCRIPT_DIR/config/submodules.txt"

load_env() {
  [ -f .env ] || return 0
  log_info "Loading environment variables from .env"
  set -a && . ./.env && set +a
}

resolve_branch() {
  local url="$1"
  
  if git ls-remote --exit-code --heads "$url" "$TARGET_BRANCH" > /dev/null 2>&1; then
    echo "$TARGET_BRANCH"
  else
    log_warn "Branch '$TARGET_BRANCH' not found, using '$DEFAULT_BRANCH'" >&2
    echo "$DEFAULT_BRANCH"
  fi
}

clone_repo() {
  local name="$1" url="$2" dir="$3"
  
  print_separator
  log_header "Cloning $name"

  [ -d "$dir" ] && { log_warn "Directory '$dir' exists, skipping"; return 0; }

  local branch=$(resolve_branch "$url")
  git clone --depth=1 --branch "$branch" "$url" "$dir"
  log_success "Cloned $name ($branch)"
}

main() {
  log_header "Prepare Submodules"
  
  export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
  load_env
  
  TARGET_BRANCH="${NUC_SUBMODULES_BRANCH:-$DEFAULT_BRANCH}"
  log_info "Target branch: $TARGET_BRANCH"

  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    clone_repo "nuc_$name" "$GITHUB_URL/nuc_$name.git" "modules/nuc_$name"
  done < "$SUBMODULES_FILE"

  clone_repo "next" "$GITHUB_URL/Nucleify-React-Next.git" "next"

  print_separator
  log_success "Done!"
}

main "$@"
