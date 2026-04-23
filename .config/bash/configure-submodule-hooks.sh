#!/bin/sh

configure_submodule_hook_path() {
  local submodule_path="$1"
  local hooks_path="$2"

  if [ ! -d "$submodule_path" ]; then
    log_warn "Skipping $submodule_path (directory missing)"
    return 0
  fi

  if ! git -C "$submodule_path" rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    log_warn "Skipping $submodule_path (not a git repository)"
    return 0
  fi

  git -C "$submodule_path" config core.hooksPath "$hooks_path"
  log_success "Hook path set for $submodule_path -> $hooks_path"
}

configure_submodule_hooks() {
  [ "$APP_ENV" = "local" ] || return 0

  local root_dir="$1"
  local submodules_file="$2"
  local hooks_path="$root_dir/.husky"

  log_header "Configuring submodule hook paths"
  echo

  if [ ! -d "$hooks_path" ]; then
    log_warn "Missing $hooks_path, skipping hook path configuration"
    return 0
  fi

  while IFS= read -r name || [ -n "$name" ]; do
    [ -z "$name" ] && continue
    configure_submodule_hook_path "$root_dir/modules/nuc_$name" "$hooks_path"
  done < "$submodules_file"

  configure_submodule_hook_path "$root_dir/next" "$hooks_path"

  echo
  print_separator
}
