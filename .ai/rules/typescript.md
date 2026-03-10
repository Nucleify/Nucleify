# TypeScript

TypeScript 5.8, strict mode, ESNext target, bundler resolution.

## Path Aliases

| Alias | Resolves to | Usage |
|-------|-------------|-------|
| `nucleify` | `nuxt/atomic/` | Cross-module atomic imports |
| `modules` | `./modules/` | Module imports |
| `~/*` | `./*` | Project root |

```typescript
import { AdButton, articleRequests } from 'nucleify'
import type { NucArticleObjectInterface } from 'nucleify'
```

## Naming

- Atomic props: `{Component}Interface` (e.g. `ButtonInterface`)
- Module types: `Nuc{Entity}{Type}Interface` (e.g. `NucArticleObjectInterface`)
- Types in `types/` folders: `index.ts`, `interfaces.ts`, `variables.ts` (optional)

## Rules

- Strict null checks, no implicit any
- `/* @vue-ignore */` for Vue template type issues
- Type check: `npm run typeslint` (`tsc --noemit`)
