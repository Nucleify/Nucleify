---
description: TypeScript strict mode, path aliases, and naming conventions
globs: "**/*.{ts,tsx,vue}"
alwaysApply: false
---

# TypeScript

TypeScript 5.8, strict mode, ESNext target, bundler resolution.

## Path Aliases

| Alias | Nuxt resolves to | Next resolves to |
|-------|------------------|------------------|
| `nucleify` | `nuxt/nucleify.ts` → `modules/index.ts` | `next/atomic/index.ts` → `modules/index.react.ts` |
| `nuc_api` | `modules/nuc_api/supabase/api/server.ts` | same |
| `nuc_server` | `nuxt/server/nuc_server.ts` | same |
| `modules/*` | `modules/*` | `modules/*` |
| `~/*` | `nuxt/*` | — |

```typescript
import { AdButton, calendarRequests } from 'nucleify'
import type { NucCalendarEventObjectInterface } from 'nucleify'
```

## Naming

- Atomic props: `{Component}Interface` (e.g. `ButtonInterface`)
- Module types: `Nuc{Entity}{Type}Interface` (e.g. `NucArticleObjectInterface`)
- API types: `modules/nuc_*/types/api/interfaces.ts`
- React-specific API types: `interfaces.react.ts` when needed

## Type Check

```bash
pnpm nuxt:typeslint   # Nuxt + Vue modules (excludes .tsx)
pnpm next:typeslint   # Next + React modules (.tsx, index.react.ts)
```

## Rules

- Strict null checks, no implicit `any`
- Supabase row types: format in helpers before returning to client
- Discriminated unions for parse results (`ParsedBody | { error: string }`), not `Record<string, unknown>` for error branches
