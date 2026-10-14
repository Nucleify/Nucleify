# Hooks — pre-commit parity with GHA

- **pre-commit** runs `.config/bash/hook-checks.sh`: `btest`, `check`, `typeslint`, `slint`, `build`, `tests`, `compiler:test`, `compiler:check`, `compiler:convert:check`.
- **pre-push** is a no-op (`exit 0`).
- Skip: `HUSKY=0 git commit …` (all hooks); `SKIP_COMPILER=1 make setup` (bootstrap codegen only).
- `compiler:convert:check` (`.config/bash/convert-check.sh`) mirrors the GHA convert matrix: `web|admin` × `next|solid|svelte` — convert + emit + product shell `pnpm build`. Emit-only demos stay CI-only (`.github/workflows/compiler.yaml` `emit` job).

Hero/investor CTAs use portable `<nui-icon>` (not Nuxt `<Icon>`) so `convert web → next|solid|svelte` typechecks. Compiler also remaps remaining Nuxt `<Icon name>` → `<nui-icon icon>`.
