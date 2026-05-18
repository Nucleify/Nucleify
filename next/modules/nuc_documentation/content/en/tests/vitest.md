# Vitest (Frontend Testing)

Vitest is the frontend testing framework for Vue/TypeScript in Nucleify.

---

## Configuration

### vitest.config.ts

```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'

export default defineVitestConfig({
  resolve: {
    alias: {
      nucleify: resolve(__dirname, 'nuxt/atomic'),
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

---

## Structure

### Global Tests

```
vitests/
├── setup.ts              # Global setup
├── example.test.ts       # Example test
└── plugins/              # Plugin tests
```

### Module Tests

```
modules/nuc_example/vitests/
├── api/
│   └── User/
│       └── 200.test.ts
├── components/
└── constants/
    └── api/
        ├── user.ts
        └── article.ts
```

---

## Setup File

### vitests/setup.ts

```typescript
import { afterEach } from 'vitest'

const activeTimeouts = new Set<NodeJS.Timeout>()
const activeIntervals = new Set<NodeJS.Timeout>()

const originalSetTimeout = globalThis.setTimeout
const trackedSetTimeout = (callback: Function, delay?: number) => {
  const id = originalSetTimeout(() => {
    activeTimeouts.delete(id)
    callback()
  }, delay)
  activeTimeouts.add(id)
  return id
}

globalThis.setTimeout = trackedSetTimeout as typeof setTimeout

afterEach(() => {
  activeTimeouts.forEach((id) => clearTimeout(id))
  activeTimeouts.clear()
  activeIntervals.forEach((id) => clearInterval(id))
  activeIntervals.clear()
})
```

---

## Mocking

### mockGlobalFetch()

```typescript
// modules/nuc_api/utils/__mocks__/mock_global_fetch.ts

import type { Mock, vi } from 'vitest'

export function mockGlobalFetch(
  vi: { fn: typeof vi.fn; stubGlobal: typeof vi.stubGlobal },
  response: unknown
): Mock {
  const mockFetch: Mock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('$fetch', mockFetch)
  return mockFetch
}
```

### Usage

```typescript
import { beforeEach, vi } from 'vitest'
import * as nucleify from 'nucleify'

beforeEach((): void => {
  vi.clearAllMocks()
  nucleify.mockGlobalFetch(vi, mockResponse)
})
```

---

## Mock Data

```typescript
// vitests/constants/api/user.ts

import type { NucUserObjectInterface } from 'nucleify'

export const mockUser: NucUserObjectInterface = {
  id: 999999,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
```

---

## Writing Tests

### Basic Test

```typescript
import { expect, test } from 'vitest'

test('example', (): void => {
  expect(true).toBe(true)
})
```

### API Request Tests

```typescript
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import * as nucleify from 'nucleify'

describe('userRequests', (): void => {
  const { closeDialog } = nucleify.useNucDialog()
  const requests = nucleify.userRequests(closeDialog)
  const mockResponse = [nucleify.mockUser]

  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllUsers', async (): Promise<void> => {
    await requests.getAllUsers()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeUser', async (): Promise<void> => {
    await requests.storeUser(nucleify.mockUser)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('deleteUser', async (): Promise<void> => {
    await requests.deleteUser(nucleify.mockUser.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
```

### Composable Tests

```typescript
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as nucleify from 'nucleify'

describe('useAddFriend', (): void => {
  let instance: ReturnType<typeof nucleify.useAddFriend>

  beforeEach((): void => {
    vi.clearAllMocks()
    instance = nucleify.useAddFriend()
  })

  it('should add friend', async (): Promise<void> => {
    nucleify.mockGlobalFetch(vi, [{ id: 1, name: 'Test' }])
    const spy = vi.spyOn(friendship, 'sendRequest')

    await instance.handleAddFriend()

    expect(spy).toHaveBeenCalled()
  })
})
```

### Testing with Spies

```typescript
import { describe, expect, it, vi } from 'vitest'

describe('spies', (): void => {
  it('should track calls', (): void => {
    const callback = vi.fn()
    callback('arg1', 'arg2')
    
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('should spy on methods', (): void => {
    const obj = { method: (x: number) => x * 2 }
    const spy = vi.spyOn(obj, 'method')
    
    obj.method(5)
    
    expect(spy).toHaveBeenCalledWith(5)
    expect(spy).toHaveReturnedWith(10)
  })
})
```

---

## Assertions

### Common Matchers

```typescript
// Equality
expect(value).toBe(expected)
expect(value).toEqual(expected)

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeDefined()

// Numbers
expect(value).toBeGreaterThan(3)
expect(value).toBeLessThan(5)

// Strings
expect(value).toMatch(/regex/)
expect(value).toContain('substring')

// Arrays/Objects
expect(array).toContain(item)
expect(array).toHaveLength(3)
expect(obj).toHaveProperty('key')

// Functions
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg)
expect(fn).toHaveBeenCalledTimes(2)

// Async
await expect(promise).resolves.toBe(value)
await expect(promise).rejects.toThrow(Error)

// Partial matching
expect(obj).toMatchObject({ key: 'value' })
expect('test').stringContaining('est')
expect({ a: 1 }).objectContaining({ a: 1 })
```

---

## Commands

```bash
# Run all tests
pnpm run tests

# Watch mode
pnpm run test:watch

# Run once
pnpm run tests

# Specific file
pnpm exec vitest modules/nuc_entities/vitests/api/User/200.test.ts

# With pattern
pnpm exec vitest --filter="userRequests"

# With coverage
pnpm run test:coverage

# With UI
pnpm exec vitest --ui

# Update snapshots
pnpm exec vitest --update
```

---

## Best Practices

1. **Use `nucleify` alias** - Import from `nuxt/atomic`
2. **Mock global fetch** - `nucleify.mockGlobalFetch(vi, response)`
3. **Clear mocks** - `vi.clearAllMocks()` in `beforeEach`
4. **Use `describe` blocks** - Group related tests
5. **Keep module tests** in `modules/*/vitests/`
6. **Test async** with `async/await`
7. **Use mock data** - Constants in `vitests/constants/`
8. **Test CRUD** - GET, POST, PUT, DELETE
9. **Use partial matchers** - `stringContaining()`, `objectContaining()`
