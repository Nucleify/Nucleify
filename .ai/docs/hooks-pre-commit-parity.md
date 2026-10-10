# Hooks — pre-commit parity with GHA

- **pre-commit** runs `.config/bash/hook-checks.sh`: `btest`, `check`, `typeslint`, `slint`, `build`, `tests`, `compiler:test`, `compiler:check`.
- **pre-push** is a no-op (`exit 0`).
- Compiler emit/convert matrices remain CI-only (`.github/workflows/compiler.yaml`).

Hero/investor CTAs use portable `<nui-icon>` (not Nuxt `<Icon>`) so `convert web → next|solid` typechecks. Compiler also remaps leftover `<Icon name>` → `<nui-icon icon>`.
