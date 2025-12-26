#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

. "$SCRIPT_DIR/utils/print_separator.sh"
. "$SCRIPT_DIR/utils/colors.sh"

MODULES_DIR="$ROOT_DIR/modules"
SUBMODULES_FILE="$SCRIPT_DIR/config/submodules.txt"
GITHUB_ORG="Nucleify"

usage() {
  echo "Usage: $0 <module_name> [--dry-run] [--all]"
  echo ""
  echo "Options:"
  echo "  --all       Release all modules with version changes"
  echo "  --dry-run   Show what would be done without making changes"
  echo ""
  echo "Examples:"
  echo "  $0 nuc_media"
  echo "  $0 media"
  echo "  $0 nuc_media --dry-run"
  echo "  $0 --all"
  exit 1
}

get_version() {
  local config_file="$1"
  grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$config_file" | sed 's/.*"\([^"]*\)"$/\1/'
}

check_gh_cli() {
  if ! command -v gh >/dev/null 2>&1; then
    log_error "GitHub CLI (gh) is not installed"
    log_info "Install it: https://cli.github.com/"
    exit 1
  fi
  
  if ! gh auth status >/dev/null 2>&1; then
    log_error "Not authenticated with GitHub CLI"
    log_info "Run: gh auth login"
    exit 1
  fi
}

release_module() {
  local module_name="$1"
  local dry_run="$2"
  
  # Normalize module name (add nuc_ prefix if missing)
  case "$module_name" in
    nuc_*) ;;
    *) module_name="nuc_$module_name" ;;
  esac
  
  local module_dir="$MODULES_DIR/$module_name"
  local config_file="$module_dir/config.json"
  local repo="$GITHUB_ORG/$module_name"
  
  print_separator
  log_header "Release: $module_name"
  
  # Check if module exists
  if [ ! -d "$module_dir" ]; then
    log_error "Module directory not found: $module_dir"
    return 1
  fi
  
  # Check if config.json exists
  if [ ! -f "$config_file" ]; then
    log_error "Config file not found: $config_file"
    return 1
  fi
  
  # Get version and description from config.json
  local version=$(get_version "$config_file")
  local description=$(grep -o '"description"[[:space:]]*:[[:space:]]*"[^"]*"' "$config_file" | sed 's/.*"\([^"]*\)"$/\1/' || echo "")
  
  if [ -z "$version" ]; then
    log_error "Could not extract version from $config_file"
    return 1
  fi
  
  local tag="v$version"
  
  log_info "Repository: $repo"
  log_info "Version: $tag"
  
  # Check if tag already exists on remote
  if gh api "repos/$repo/git/refs/tags/$tag" >/dev/null 2>&1; then
    log_warn "Tag $tag already exists on remote"
    log_info "Bump the version in config.json to create a new release"
    return 0
  fi
  
  if [ "$dry_run" = "true" ]; then
    log_info "[DRY RUN] Would create tag $tag on $repo"
    log_info "[DRY RUN] Would create GitHub release $tag"
    return 0
  fi
  
  # First, push any local changes in the submodule to remote
  if [ -d "$module_dir/.git" ]; then
    log_info "Pushing local changes to $repo..."
    cd "$module_dir"
    
    if [ -n "$(git status --porcelain)" ]; then
      git add -A
      git commit -m "chore: prepare release $tag"
    fi
    
    git push origin HEAD 2>/dev/null || log_warn "Could not push (might need permissions)"
    cd "$ROOT_DIR"
  fi
  
  # Get latest commit SHA from remote
  local commit_sha=$(gh api "repos/$repo/commits/main" --jq '.sha' 2>/dev/null || \
                     gh api "repos/$repo/commits/master" --jq '.sha' 2>/dev/null)
  
  if [ -z "$commit_sha" ]; then
    log_error "Could not get commit SHA for $repo"
    return 1
  fi
  
  log_info "Creating tag on commit: ${commit_sha:0:8}"
  
  # Create tag via GitHub API
  gh api "repos/$repo/git/refs" \
    -X POST \
    -f ref="refs/tags/$tag" \
    -f sha="$commit_sha" >/dev/null
  
  log_success "Created tag $tag"
  
  # Create GitHub Release
  log_info "Creating GitHub release..."
  
  gh api "repos/$repo/releases" \
    -X POST \
    -f tag_name="$tag" \
    -f name="$tag" \
    -f body="## $module_name $tag

$description

---

Released from nucleify main repository." \
    -F draft=false \
    -F prerelease=false >/dev/null
  
  print_separator
  log_success "Released $module_name $tag"
}

release_all_changed() {
  local dry_run="$1"
  
  print_separator
  log_header "Checking all modules for version changes..."
  
  if [ ! -f "$SUBMODULES_FILE" ]; then
    log_error "Submodules file not found: $SUBMODULES_FILE"
    exit 1
  fi
  
  local released=0
  local failed=0
  
  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    
    local module_name="nuc_$name"
    local module_dir="$MODULES_DIR/$module_name"
    local config_file="$module_dir/config.json"
    local repo="$GITHUB_ORG/$module_name"
    
    [ -d "$module_dir" ] || continue
    [ -f "$config_file" ] || continue
    
    local version=$(get_version "$config_file")
    [ -z "$version" ] && continue
    
    local tag="v$version"
    
    # Check if tag exists on remote
    if ! gh api "repos/$repo/git/refs/tags/$tag" >/dev/null 2>&1; then
      log_info "New version detected: $module_name $tag"
      
      if release_module "$module_name" "$dry_run"; then
        released=$((released + 1))
      else
        failed=$((failed + 1))
      fi
    fi
  done < "$SUBMODULES_FILE"
  
  print_separator
  
  if [ "$released" -eq 0 ] && [ "$failed" -eq 0 ]; then
    log_info "No modules need releasing"
  else
    [ "$released" -gt 0 ] && log_success "Released $released module(s)"
    [ "$failed" -gt 0 ] && log_warn "Failed to release $failed module(s)"
  fi
}

main() {
  local module_name=""
  local dry_run="false"
  local all_modules="false"
  
  # Parse arguments
  while [ $# -gt 0 ]; do
    case "$1" in
      --dry-run)
        dry_run="true"
        ;;
      --all)
        all_modules="true"
        ;;
      -h|--help)
        usage
        ;;
      *)
        module_name="$1"
        ;;
    esac
    shift
  done
  
  check_gh_cli
  
  if [ "$all_modules" = "true" ]; then
    release_all_changed "$dry_run"
  elif [ -n "$module_name" ]; then
    release_module "$module_name" "$dry_run"
  else
    usage
  fi
}

main "$@"

