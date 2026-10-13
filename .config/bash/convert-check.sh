#!/usr/bin/env bash
# Pre-commit / local parity with .github/workflows/compiler.yaml convert matrix.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

matrix=(
  "web:next:web-next"
  "web:solid:web-solid"
  "admin:next:admin-next"
  "admin:solid:admin-solid"
)

for entry in "${matrix[@]}"; do
  IFS=':' read -r product target dir <<<"$entry"
  echo "==> convert ${product} → ${target} (${dir})"
  pnpm exec tsx compiler/src/cli.ts convert "${product}" --target="${target}" --force

  if [[ "${target}" == "next" || "${target}" == "solid" ]]; then
    echo "==> emit portable into ${target}"
    pnpm exec tsx compiler/src/cli.ts build --app="${target}" --force
  fi

  echo "==> install + build ${dir}"
  (
    cd "${dir}"
    pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true
    pnpm run --ignore-workspace build
  )
done

echo "convert-check: ok"
