# Vitest

Vitest 3.2. Tests in `modules/*/vitests/` and root `vitests/` if present.

## Module Test Structure

```
modules/nuc_example/vitests/
├── api/example/200.test.ts
├── utils/example.test.ts
└── constants/…              # mock data
```

## Conventions

- `import * as nucleify from 'nucleify'` (or direct imports from module under test)
- `import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'`
- `beforeEach`: `vi.clearAllMocks()`; mock `$fetch` / `fetch` via `nuc_api` test helpers when available
- Typed callbacks: `(): void =>` / `async (): Promise<void> =>`
- Mock data matches module interfaces

## API Composable Test Pattern

```typescript
describe('calendarRequests', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, mockEvents)
  })

  it('getEventsInRange', async (): Promise<void> => {
    const { getEventsInRange } = nucleify.calendarRequests()
    await getEventsInRange('2026-01-01', '2026-01-31')
    expect((globalThis as unknown as { $fetch: Mock }).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('calendar/events'),
      expect.objectContaining({ method: 'GET' })
    )
  })
})
```

## Commands

```bash
pnpm tests           # run all
pnpm test:watch      # watch mode
pnpm test:coverage   # with coverage
pnpm next:test       # Next-specific vitest config
```

## What We Don't Test in Vitest

- Supabase SQL migrations — apply via `pnpm supabase:migrations:apply:*` manually or in deploy
- E2E browser flows — not in default pipeline
