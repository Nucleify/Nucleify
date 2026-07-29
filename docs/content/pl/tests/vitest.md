# Vitest (Testy Frontend)

Vitest to framework testowy frontend dla Vue/TypeScript w Nucleify.

---

## Konfiguracja

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

## Struktura

### Testy globalne

```
vitests/
├── setup.ts              # Globalny setup
├── example.test.ts       # Przykładowy test
└── plugins/              # Testy pluginów
```

### Testy modułów

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

## Plik Setup

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

## Mockowanie

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

### Użycie

```typescript
import { beforeEach, vi } from 'vitest'
import * as nucleify from 'nucleify'

beforeEach((): void => {
  vi.clearAllMocks()
  nucleify.mockGlobalFetch(vi, mockResponse)
})
```

---

## Dane mockowe

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

## Pisanie testów

### Podstawowy test

```typescript
import { expect, test } from 'vitest'

test('example', (): void => {
  expect(true).toBe(true)
})
```

### Testy requestów API

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

### Testy composables

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

### Testowanie ze spy

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

## Asercje

### Powszechne matchery

```typescript
// Równość
expect(value).toBe(expected)
expect(value).toEqual(expected)

// Prawdziwość
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeDefined()

// Liczby
expect(value).toBeGreaterThan(3)
expect(value).toBeLessThan(5)

// Stringi
expect(value).toMatch(/regex/)
expect(value).toContain('substring')

// Tablice/Obiekty
expect(array).toContain(item)
expect(array).toHaveLength(3)
expect(obj).toHaveProperty('key')

// Funkcje
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg)
expect(fn).toHaveBeenCalledTimes(2)

// Async
await expect(promise).resolves.toBe(value)
await expect(promise).rejects.toThrow(Error)

// Częściowe dopasowanie
expect(obj).toMatchObject({ key: 'value' })
expect('test').stringContaining('est')
expect({ a: 1 }).objectContaining({ a: 1 })
```

---

## Komendy

```bash
# Uruchom wszystkie testy
pnpm run tests

# Tryb watch
pnpm run test:watch

# Uruchom raz
pnpm run tests

# Konkretny plik
pnpm exec vitest modules/nuc_entities/vitests/api/User/200.test.ts

# Z wzorcem
pnpm exec vitest --filter="userRequests"

# Z coverage
pnpm run test:coverage

# Z UI
pnpm exec vitest --ui

# Aktualizuj snapshoty
pnpm exec vitest --update
```

---

## Dobre praktyki

1. **Używaj aliasu `nucleify`** - Importuj z `nuxt/atomic`
2. **Mockuj global fetch** - `nucleify.mockGlobalFetch(vi, response)`
3. **Czyść mocki** - `vi.clearAllMocks()` w `beforeEach`
4. **Używaj bloków `describe`** - Grupuj powiązane testy
5. **Trzymaj testy modułów** w `modules/*/vitests/`
6. **Testuj async** z `async/await`
7. **Używaj danych mockowych** - Stałe w `vitests/constants/`
8. **Testuj CRUD** - GET, POST, PUT, DELETE
9. **Używaj częściowych matcherów** - `stringContaining()`, `objectContaining()`
