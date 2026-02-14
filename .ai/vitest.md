# Vitest (Frontend Testing)

## Overview

Frontend tests use **Vitest 3.2** with Nuxt test environment. Tests live in `vitests/` (global) and `modules/*/vitests/` (per module). API mocking uses `mockGlobalFetch()` to stub Nuxt's `$fetch`.

---

## Stack

- **Framework:** Vitest 3.2
- **Environment:** `nuxt` (via `@nuxt/test-utils`)
- **Pool:** threads (multi-threaded by default)
- **Timeout:** 30 seconds

---

## Configuration (`vitest.config.ts`)

```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'

export default defineVitestConfig({
  resolve: {
    alias: {
      atomic: resolve(__dirname, 'nuxt/atomic'),
    },
  },
  test: {
    environment: 'nuxt',
    setupFiles: ['./vitests/setup.ts'],
    include: [
      'vitests/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'modules/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    testTimeout: 30000,
    pool: 'threads',
  },
})
```

Key points:
- `atomic` alias resolves to `nuxt/atomic/` for module imports
- Tests collected from both `vitests/` and all `modules/*/` directories
- `setup.ts` runs before all tests

---

## Setup File (`vitests/setup.ts`)

Tracks and cleans up timers, intervals, and `requestAnimationFrame` calls to prevent leaks between tests:

- Wraps `setTimeout`, `setInterval`, `requestAnimationFrame` with tracked versions
- In `afterEach()`: clears all active timers and GSAP ScrollTrigger instances
- Applied to `globalThis`, `global`, and `window`

---

## Test Structure

### Global Tests (`vitests/`)

```
vitests/
├── setup.ts                # Global setup (timer cleanup)
├── example.test.ts         # Example test
└── plugins/
    ├── modules.test.ts     # Tests all module registrations
    └── plugins.test.ts     # Tests Nuxt plugin structure
```

### Module Tests (`modules/*/vitests/`)

```
modules/nuc_example/vitests/
├── index.ts                # Barrel exports (test constants)
├── api/
│   └── {Entity}/
│       └── 200.test.ts     # API request tests
└── constants/
    └── api/
        ├── {entity}.ts     # Mock data constants
        └── index.ts
```

---

## Mocking

### `mockGlobalFetch()` (`nuc_api/utils/__mocks__/mock_global_fetch.ts`)

Stubs Nuxt's `$fetch` global with a mock function:

```typescript
export function mockGlobalFetch(
  vi: VitestContextWithMocking,
  response: unknown
): Mock {
  const mockFetch: Mock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('$fetch', mockFetch)
  return mockFetch
}
```

Usage in tests:

```typescript
import { beforeEach, vi } from 'vitest'
import * as atomic from 'atomic'

beforeEach((): void => {
  vi.clearAllMocks()
  atomic.mockGlobalFetch(vi, mockResponse)
})
```

### Mock Data Constants

Each module defines mock objects matching their interfaces in `vitests/constants/api/`:

```typescript
// vitests/constants/api/article.ts
import type { NucArticleObjectInterface } from 'atomic'

export const mockArticle: NucArticleObjectInterface = {
  id: 999999,
  user_id: 1,
  title: 'Example Article',
  description: 'Example Description',
  category: 'example',
}
```

Mock constants are exported through barrel files and accessible via `atomic.mockArticle`.

---

## Writing Tests

### Conventions

- Import everything from `vitest`: `{ beforeEach, describe, expect, it, type Mock, vi }`
- Import module code via `import * as atomic from 'atomic'`
- Use `describe()` for grouping, `it()` for individual tests
- All callbacks typed with `(): void =>` or `async (): Promise<void> =>`
- Clear mocks in `beforeEach` with `vi.clearAllMocks()`
- Use `vi.fn()` for function mocks, `vi.mock()` for module mocks

### API Request Tests

Test each CRUD operation by verifying `$fetch` was called correctly:

```typescript
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import * as atomic from 'atomic'

describe('articleRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests = atomic.articleRequests(closeDialog)
  const mockResponse = [atomic.mockArticle]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllArticles', async (): Promise<void> => {
    await requests.getAllArticles()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeArticle', async (): Promise<void> => {
    await requests.storeArticle(atomic.mockArticle)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editArticle', async (): Promise<void> => {
    await requests.editArticle(atomic.mockArticle)
    // assert PUT method called
  })

  it('deleteArticle', async (): Promise<void> => {
    await requests.deleteArticle(atomic.mockArticle.id ?? 0)
    // assert DELETE method called
  })
})
```

### Plugin Tests

Test that all module registration functions are called:

```typescript
import { beforeEach, expect, it, vi } from 'vitest'
import * as modules from '../../modules'
import module from '../../nuxt/plugins/modules'

vi.mock('../../modules', () => ({
  registerNucEntities: vi.fn(),
  registerNucAuth: vi.fn(),
  // ... all modules
}))

it('registers all modules', async (): Promise<void> => {
  await module.setup(nuxtApp)
  expect(modules.registerNucEntities).toHaveBeenCalledWith(vueApp)
})
```

### Plugin Structure Tests

Verify Nuxt plugins export correct structure:

```typescript
it('exports the correct structure', async (): Promise<void> => {
  const plugin = (await import(path)).default
  if (plugin && typeof plugin === 'object' && 'setup' in plugin) {
    expect(typeof plugin.setup).toBe('function')
  } else {
    expect(typeof plugin).toBe('function')
  }
})
```

### Utility / Unit Tests

For pure functions and store utilities (e.g. `nuc_stores`), tests are co-located as `index.test.ts`:

```
modules/nuc_stores/pinia/toggle_state/
├── index.ts
├── cases.ts
└── index.test.ts        # ← co-located test
```

---

## Running Tests

```bash
# Run all vitest tests
npm run tests

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

