# TypeScript

## Overview

The project uses **TypeScript 5.8** in strict mode with `ESNext` target. Configuration is in `tsconfig.json` at the project root.

---

## Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "atomic": ["nuxt/atomic"],
      "atomic/*": ["nuxt/atomic/*"],
      "modules": ["./modules"],
      "modules/*": ["./modules/*"],
      "~/*": ["./*"]
    }
  }
}
```

---

## Key Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `target` | `ESNext` | Latest JS features |
| `module` | `ESNext` | ES module syntax |
| `moduleResolution` | `bundler` | Vite/Nuxt compatible resolution |
| `strict` | `true` | All strict checks enabled |
| `jsx` | `preserve` | Vue JSX/TSX support |
| `skipLibCheck` | `true` | Skip `node_modules` type checking |
| `resolveJsonModule` | `true` | Import `.json` files |
| `esModuleInterop` | `true` | CommonJS interop |

---

## Path Aliases

| Alias | Resolves to | Usage |
|-------|-------------|-------|
| `atomic` | `nuxt/atomic/` | Cross-module atomic imports |
| `atomic/*` | `nuxt/atomic/*` | Deep atomic imports |
| `modules` | `./modules/` | Module imports |
| `modules/*` | `./modules/*` | Deep module imports |
| `~/*` | `./*` | Project root imports |

### Import Examples

```typescript
// Cross-module imports via atomic alias
import { AdButton, articleRequests } from 'atomic'
import type { NucArticleObjectInterface } from 'atomic'

// Module-specific imports
import { registerNucEntities } from 'modules/nuc_entities'
```

---

## Included Files

- `**/*.d.ts`, `**/*.ts`, `**/*.tsx`
- `**/*.vue`, `**/*.js`, `**/*.jsx`

## Excluded Files

- `node_modules`, `.nuxt`, `dist`, `vendor`
- `cypress*`, `next`
- `**/*.stories.ts`, `**/*.stories.tsx` (Storybook)
- `**/*.spec.ts`, `**/*.spec.tsx`, `**/*.test.ts`, `**/*.test.tsx` (Tests)

---

## Type Checking Command

```bash
# Run type checking without emitting files
npm run typeslint
```

This runs `tsc --noemit` to check for type errors across the project.

---

## Conventions

### Interface Naming

- Atomic component props: `{Component}Interface` (e.g. `ButtonInterface`, `CardInterface`)
- Module types: `Nuc{Entity}{Type}Interface` (e.g. `NucArticleObjectInterface`, `NucArticleRequestsInterface`)
- API types: `{Action}{Entity}RequestType` (e.g. `StoreEntityRequestType`, `DeleteEntityRequestType`)

### Type Files Structure

Types are always organized in a `types/` folder:

```
types/
├── index.ts          # Re-exports all type files
├── interfaces.ts     # Interface definitions
└── variables.ts      # Type aliases and union types (optional)
```

### Strict Mode

With `strict: true`, the following are enforced:
- `strictNullChecks` — no implicit `null`/`undefined`
- `noImplicitAny` — explicit types required
- `strictFunctionTypes` — contravariant function parameters
- `strictBindCallApply` — typed `bind`/`call`/`apply`
- `strictPropertyInitialization` — class properties must be initialized

### Suppression

When needed, suppress with a `// @ts-expect-error` comment with explanation:

```typescript
// @ts-expect-error setup is a function on the plugin object
await module.setup(nuxtApp)
```

For Vue template type issues, use `/* @vue-ignore */`:

```typescript
export interface ButtonInterface extends /* @vue-ignore */ ButtonProps { }
```

