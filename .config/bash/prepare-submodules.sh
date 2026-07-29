#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
PKG_DIR="$ROOT_DIR/root"

. "$SCRIPT_DIR/utils/print_separator.sh"
. "$SCRIPT_DIR/utils/colors.sh"
. "$SCRIPT_DIR/configure-submodule-hooks.sh"

DEFAULT_BRANCH="main"
GITHUB_URL="https://github.com/Nucleify"
SUBMODULES_FILE="$SCRIPT_DIR/config/submodules.txt"

load_env() {
  [ -f .env ] || return 0
  log_info "Loading environment variables from .env"
  set -a && . ./.env && set +a
}

resolve_branch() {
  if git ls-remote --exit-code --heads "$1" "$TARGET_BRANCH" > /dev/null 2>&1; then
    echo "$TARGET_BRANCH"
  else
    log_warn "Branch '$TARGET_BRANCH' not found, using '$DEFAULT_BRANCH'" >&2
    echo "$DEFAULT_BRANCH"
  fi
}

get_version() {
  [ -f "$1/config.json" ] &&
    sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$1/config.json"
  return 0
}

get_remote_version() {
  local repo=$(echo "$1" | sed 's|https://github.com/||; s|\.git$||')
  curl -sf "https://raw.githubusercontent.com/$repo/$2/config.json" 2>/dev/null \
    | sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p'
}

has_local_modules() {
  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    [ -f "shared_modules/nuc_$name/config.json" ] && return 0
  done < "$SUBMODULES_FILE"
  return 1
}

cleanup_empty_modules() {
  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    local dir="shared_modules/nuc_$name"

    if [ -d "$dir" ] && [ ! -f "$dir/config.json" ]; then
      log_warn "nuc_$name: empty module detected, removing"
      rm -rf "$dir"
    fi
  done < "$SUBMODULES_FILE"
}

check_versions() {
  has_local_modules || {
    log_info "No local modules detected, skipping version check"
    echo
    return 0
  }

  log_header "Checking versions"
  echo
  local has_diff=0
  local checked_any=0

  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    local dir="shared_modules/nuc_$name"
    local url="$GITHUB_URL/nuc_$name.git"
    local local_ver=$(get_version "$dir")

    if [ -z "$local_ver" ]; then
      continue
    fi

    checked_any=1
    local remote_ver=$(get_remote_version "$url" "$TARGET_BRANCH")

    if [ -z "$remote_ver" ]; then
      log_info "nuc_$name: $local_ver (remote version unknown)"
    elif [ "$local_ver" != "$remote_ver" ]; then
      log_warn "nuc_$name: $local_ver -> $remote_ver (removing outdated)"
      rm -rf "$dir"
      has_diff=1
    else
      log_success "nuc_$name: $local_ver (up to date)"
    fi
  done < "$SUBMODULES_FILE"

  [ "$checked_any" -eq 0 ] && log_info "No local module versions found, skipping"
  echo
  [ "$checked_any" -eq 1 ] && [ "$has_diff" -eq 0 ] && log_success "All modules are up to date"
  echo
  return $has_diff
}

prompt_yn() {
  printf "${BOLD}%s [y/N]:${NC} " "$1"
  read -r answer
  echo
  case "$answer" in
    [yY]|[yY][eE][sS]) return 0 ;;
    *) return 1 ;;
  esac
}

confirm_local() {
  [ "$APP_ENV" = "local" ] || return 0
  has_local_modules || return 0
  echo
  prompt_yn "Run prepare-submodules?" || { log_info "Aborted"; exit 0; }

  print_separator
  log_warn "This will overwrite local modules with fresh clones"
  echo
  check_versions || true
}

clone_repo() {
  local name="$1" url="$2" dir="$3"
  log_header "Cloning $name"
  echo

  if [ -n "$NUC_SUBMODULES_CHECK" ] && [ -d "$dir" ]; then
    log_warn "Directory '$dir' exists, skipping"
    echo
    print_separator
    return 0
  fi

  local branch=$(resolve_branch "$url")
  git clone --depth=1 --branch "$branch" --progress "$url" "$dir" 2>&1 \
    | tr '\r' '\n' | grep -E '^(Cloning|remote:.*done)'
  echo
  log_success "Cloned $name ($branch)"
  echo
  print_separator
}

main() {
  load_env
  TARGET_BRANCH="${NUC_SUBMODULES_BRANCH:-$DEFAULT_BRANCH}"
  confirm_local

  print_separator
  log_header "Prepare Submodules"
  echo
  export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
  log_info "Target branch: $TARGET_BRANCH"
  cleanup_empty_modules
  [ -n "$NUC_SUBMODULES_CHECK" ] && log_info "Check mode: will skip existing directories"
  echo
  print_separator

  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    clone_repo "nuc_$name" "$GITHUB_URL/nuc_$name.git" "shared_modules/nuc_$name"
  done < "$SUBMODULES_FILE"

  configure_submodule_hooks "$ROOT_DIR" "$SUBMODULES_FILE"
  log_success "Done!"
}

main "$@"
