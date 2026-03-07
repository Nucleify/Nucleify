# Vitest

Vitest 3.2 + Nuxt test environment. Tests in `vitests/` (global) and `modules/*/vitests/` (per module).

## Module Test Structure

```
modules/nuc_example/vitests/
├── index.ts                    # Barrel exports
├── api/{Entity}/200.test.ts    # API request tests
└── constants/api/
    ├── entity.ts               # Mock data matching interfaces
    └── index.ts
```

## Conventions

- `import * as nucleify from 'nucleify'`
- `import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'`
- `beforeEach`: `vi.clearAllMocks()` + `nucleify.mockGlobalFetch(vi, mockResponse)`
- Typed callbacks: `(): void =>` / `async (): Promise<void> =>`
- Mock data exported through barrel files, accessible via `nucleify.mockEntity`

## API Test Pattern

```typescript
describe('entityRequests', (): void => {
  const { closeDialog } = nucleify.useNucDialog()
  const requests = nucleify.entityRequests(closeDialog)
  const mockResponse = [nucleify.mockEntity]

  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, mockResponse)
  })

  it('getAll', async (): Promise<void> => {
    await requests.getAll()
    expect((globalThis as unknown as { $fetch: Mock }).$fetch)
      .toHaveBeenCalledWith(expect.stringContaining('entities'), expect.objectContaining({ method: 'GET' }))
  })
})
```

## Commands

```bash
npm run tests          # run all
npm run test:watch     # watch mode
npm run test:coverage  # with coverage
```
