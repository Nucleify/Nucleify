# Vitest

Nucleify uses [Vitest](https://vitest.dev) for unit and integration tests across the monorepo. Root config defines two projects — **web** (Nuxt environment) and **shared** (happy-dom) — plus a separate compiler test suite.

---

## Running tests

```bash
pnpm tests              # all root projects (web + shared)
pnpm test:watch         # watch mode
pnpm test:web           # Nuxt project only
pnpm test:shared        # shared_modules only
pnpm compiler:test      # compiler unit tests
```

CI and Husky hooks run `pnpm tests` as part of `.config/bash/hook-checks.sh` alongside Biome, TypeScript, and Stylelint.

---

## Project configuration

Root `vitest.config.ts` defines workspace projects:

### `web` project

- **Root:** `web/`
- **Environment:** `nuxt` (via `@nuxt/test-utils`)
- **Include:** `vitests/**/*.{test,spec}.{js,ts,jsx,tsx}`
- **Timeout:** 30s
- **Alias:** `nucleify` → `web/src/nucleify.ts`

### `shared` project

- **Root:** `shared_modules/`
- **Environment:** `happy-dom`
- **Include:** `**/vitests/**/*.{test,spec}.{js,ts}`
- **Timeout:** 15s
- **Alias:** `nucleify` → `shared_modules/nucleify.ts`
- **Define:** `import.meta.client` / `import.meta.server` shims

Both projects share setup from `.config/vitest_setup.ts` and use threaded pools.

### Compiler project

Separate config at `.config/vitest.compiler.config.ts`:

```bash
pnpm compiler:test
```

Tests live in `compiler/tests/`.

---

## Where to put tests

| Location | Pattern | Project |
|----------|---------|---------|
| `web/vitests/` | `*.test.ts` | web |
| `shared_modules/nuc_*/vitests/` | `*.test.ts` | shared |
| `compiler/tests/` | fixtures + unit | compiler |

Co-locate module tests inside the module (`shared_modules/nuc_colors/vitests/`). Do not put shared module tests under `web/vitests/` unless they require Nuxt runtime.

---

## Writing module tests

Example under `shared_modules/nuc_colors/vitests/`:

```typescript
import { describe, expect, it } from 'vitest'
import { darkenColor } from '../../utils/darken_color'

describe('darkenColor', () => {
  it('darkens a hex color', () => {
    expect(darkenColor('#ffffff', 0.1)).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
```

Run only shared module tests while iterating:

```bash
pnpm test:shared
```

---

## Writing Nuxt tests

Place files in `web/vitests/`. The Nuxt test environment mounts components with `@nuxt/test-utils`:

```typescript
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders', async () => {
    const wrapper = await mountSuspended(MyComponent)
    expect(wrapper.text()).toContain('expected')
  })
})
```

---

## Setup file

`.config/vitest_setup.ts` configures global test behavior (mocks, matchers from `@testing-library/jest-dom` where used). Both web and shared projects import it via `setupFiles`.

Console log suppression is enabled (`onConsoleLog: () => false`) to reduce noise in CI.

---

## Pre-commit hook suite

Husky runs, in order:

1. `pnpm btest` — bash test suite
2. `pnpm check` — Biome
3. `pnpm typeslint` — TypeScript (`web/tsconfig.json`)
4. `pnpm slint` — Stylelint on SCSS
5. `pnpm tests` — Vitest

Fix failures locally before pushing.

---

## Coverage & debugging

Run a single file:

```bash
pnpm vitest run shared_modules/nuc_stores/cookie/get_item/index.test.ts
pnpm vitest run --project web web/vitests/some.test.ts
```

Enable watch during development:

```bash
pnpm test:watch
```

---

## Related docs

- [Modules](/en/docs/core-concepts/modules) — `vitests/` folder convention
- [Coding Standards](/en/docs/about/coding-standards) — naming and structure rules
- [Compiler](/en/docs/core-concepts/compiler) — `pnpm compiler:test`
