# portable/nui

Shared **nucleify-ui** wiring for product shells and compiler demos.

- **No** Nucleify-authored components here — only tokens, fonts, and `nui-*` registration.
- Compiler authoring / goldens live in `compiler/tests/fixtures/`, not under `portable/`.

## Contents

| File | Role |
|------|------|
| `fonts.css` | Instrument Sans + JetBrains Mono (same families as Nuxt google-fonts) |
| `tokens.css` / `tokens.scss` | `.nuc-nuxt` / `.nuc-next` → `--nui-*` |
| `register.ts` | Fonts + nucleify-ui CSS + Lit elements |
| `theme.ts` | `setupNui({ palette, mode })` |
| `index.ts` | Public entry |

## Usage

**Sass** (add `portable/` to includePaths):

```scss
@import 'nui/tokens';
```

**JS/TS** (Nuxt plugin / Next provider / Vite entry):

```ts
import { setupNui } from 'portable/nui'

setupNui({ palette: 'next', mode: 'dark' })
```

Consumers: `web/`, `admin/`, `compiler/templates/*`, `convert` → `next/web`.
