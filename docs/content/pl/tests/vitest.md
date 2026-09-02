# Testowanie z Vitest

Nucleify używa Vitest jako frameworka testowego we wszystkich pakietach. Testy uruchamiają się równolegle przez wątki i obejmują narzędzia modułów, handlery API, zachowanie komponentów i poprawność kompilatora.

## Konfiguracja testów

### Konfiguracja root (`vitest.config.ts`)

Root config monorepo definiuje dwa projekty Vitest:

| Projekt | Root | Środowisko | Obejmuje |
| --- | --- | --- | --- |
| `web` | `web/` | `nuxt` (przez `@nuxt/test-utils`) | `vitests/**/*.{test,spec}.{js,ts,jsx,tsx}` |
| `shared` | `shared_modules/` | `happy-dom` | `**/vitests/**/*.{test,spec}.{js,ts}` |

Oba projekty współdzielą plik setup (`.config/vitest_setup.ts`), który:

- Ustawia `import.meta.client = true` i `import.meta.server = false` dla kompatybilności Nuxt
- Dostarcza śledzone `setTimeout`/`setInterval`/`requestAnimationFrame` z automatycznym cleanup w `afterEach`
- Polyfilluje `localStorage` implementacją in-memory

### Konfiguracja kompilatora (`.config/vitest.compiler.config.ts`)

Osobna konfiguracja celuje w `compiler/tests/` ze zwykłym środowiskiem Node:

```typescript
export default defineConfig({
  root: path.join(monorepo, 'compiler'),
  test: {
    name: 'compiler',
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts'],
  },
})
```

### Aliasy

Oba projekty `web` i `shared` aliasują `nucleify` do poprawnego pliku barrel:

- `web` → `web/src/nucleify.ts`
- `shared` → `shared_modules/nucleify.ts`

Projekt shared definiuje też `import.meta.client` i `import.meta.server` na poziomie build dla tree-shaking.

## Struktura testów

```
nucleify/
├── vitest.config.ts                          # Konfiguracja root (projekty web + shared)
├── .config/
│   ├── vitest.compiler.config.ts             # Konfiguracja testów kompilatora
│   └── vitest_setup.ts                       # Współdzielony setup (timery, polyfille)
├── web/
│   └── vitests/                              # Testy aplikacji web
├── shared_modules/
│   ├── nuc_api/vitests/                      # Testy modułu API
│   │   ├── api_handle.test.ts
│   │   ├── api_request.test.ts
│   │   ├── humanize_supabase_error.test.ts
│   │   ├── use_api_errors.test.ts
│   │   └── use_api_success.test.ts
│   └── nuc_colors/vitests/utils/             # Testy modułu colors
│       ├── create_color_shades.test.ts
│       ├── darken_color.test.ts
│       ├── set_color_opacity.test.ts
│       └── ...
└── compiler/
    └── tests/                                # Testy kompilatora
        ├── emit-vue.test.ts
        ├── emit-react.test.ts
        ├── import-vue.test.ts
        ├── import-react.test.ts
        ├── parse.test.ts
        └── ...
```

## Uruchamianie testów

### Wszystkie testy

```bash
pnpm tests          # Uruchom wszystkie testy (projekty web + shared)
```

### Według projektu

```bash
pnpm test:web       # Tylko testy projektu web
pnpm test:shared    # Tylko testy shared_modules
```

### Per pakiet

```bash
pnpm --filter @nucleify/web tests    # Testy pakietu web
pnpm compiler:test                    # Tylko testy kompilatora
```

### Tryb watch

```bash
pnpm test:watch     # Vitest w trybie watch (wszystkie projekty)
```

### Pojedynczy plik

```bash
pnpm vitest run shared_modules/nuc_api/vitests/api_handle.test.ts
```

## Pisanie testów

### Test API modułu

Typowy test modułu mockuje zależności i weryfikuje zachowanie:

```typescript
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { apiHandle } from '../utils/api_handle'
import * as apiRequestMod from '../utils/api_request'
import * as apiErrorsMod from '../utils/use_api_errors'

describe('apiHandle', () => {
  let onSuccess: ReturnType<typeof vi.fn>
  let setLoading: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSuccess = vi.fn()
    setLoading = vi.fn()
    vi.restoreAllMocks()
  })

  it('calls onSuccess with response data', async () => {
    vi.spyOn(apiRequestMod, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess })
    expect(onSuccess).toHaveBeenCalledWith('ok')
  })

  it('calls setLoading true/false', async () => {
    vi.spyOn(apiRequestMod, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('calls apiErrors on error', async () => {
    const error = new Error('fail')
    vi.spyOn(apiErrorsMod, 'apiErrors').mockImplementation((e) => { throw e })
    vi.spyOn(apiRequestMod, 'apiRequest').mockRejectedValueOnce(error)

    await expect(
      apiHandle({ url: '/api/test', onSuccess, setLoading })
    ).rejects.toThrow('fail')
  })
})
```

### Kluczowe konwencje

- Używaj `vi.restoreAllMocks()` w `beforeEach`, aby resetować wszystkie mocki między testami
- Typuj callback mocki jako `ReturnType<typeof vi.fn>` lub `(): void`
- Mockuj importy `nucleify` przy testowaniu composables zależnych od stanu modułu współdzielonego
- Pliki testów trafiają do katalogów `vitests/` obok testowanego kodu

## Golden testy kompilatora

Kompilator ma dedykowany zestaw testów weryfikujący poprawność emisji przez **golden file testing**. Każdy test czyta fixture dokumentu IR, emituje kod frameworka i porównuje z plikiem outputu referencyjnego.

### Testy emisji

```typescript
describe('emitVue golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta', 'counter']) {
    it(`matches compiler/tests/fixtures/emit/vue/${name}.vue`, async () => {
      const expected = readFileSync(join(fixtures, `emit/vue/${name}.vue`), 'utf8')
      const actual = await emitWithHeaders(name)
      expect(actual).toBe(expected)
    }, 30_000)
  }
})
```

Zestaw testów obejmuje:

| Plik testowy | Co weryfikuje |
| --- | --- |
| `emit-vue.test.ts` | Emisja `.nuc.tsx` → Vue SFC |
| `emit-react.test.ts` | Emisja `.nuc.tsx` → komponent React |
| `import-vue.test.ts` | Roundtrip Vue → IR (import zwrotny) |
| `import-react.test.ts` | Roundtrip React → IR (import zwrotny) |
| `parse.test.ts` | Poprawność parsowania `.nuc.tsx` → IR |
| `schema.test.ts` | Walidacja schematu IR |
| `state.test.ts` | Zarządzanie stanem w komponentach przenośnych |
| `attrs.test.ts` | Obsługa atrybutów/props |
| `adapters.test.ts` | Rozwiązywanie adapterów frameworka |
| `product-shell.test.ts` | Scaffolding powłoki produktu |
| `product-emit.test.ts` | Pełny pipeline emisji produktu |
| `discover.test.ts` | Odkrywanie komponentów |
| `smoke.test.ts` | Podstawowe smoke / sanity checks |

### Aktualizacja plików golden

Gdy logika emisji zmienia się intencjonalnie, przebuduj pliki golden i zweryfikuj diff:

```bash
pnpm compiler:build         # Przebuduj wszystkie wyemitowane pliki
git diff                    # Przejrzyj zmiany
pnpm compiler:test          # Potwierdź, że testy przechodzą
pnpm compiler:check         # Zweryfikuj fingerprinty emisji
```

## Wzorce mockowania

### Szpiegowanie eksportów modułu

```typescript
import * as myModule from '../utils/my_module'

vi.spyOn(myModule, 'fetchData').mockResolvedValueOnce({ items: [] })
```

### Mockowanie całych modułów

```typescript
vi.mock('../utils/api_request', () => ({
  apiRequest: vi.fn().mockResolvedValue({ data: 'mocked' }),
}))
```

### Mockowanie composables

Przy testowaniu kodu używającego composables Nuxt lub modułów współdzielonych, mockuj import `nucleify`:

```typescript
vi.mock('nucleify', () => ({
  useFlashToast: () => ({ show: vi.fn() }),
}))
```

## Linting i sprawdzanie typów

Nucleify używa wielu narzędzi jakości kodu, wszystkie uruchamialne z root monorepo:

| Komenda | Narzędzie | Co sprawdza |
| --- | --- | --- |
| `pnpm check` | Biome | Linting i formatowanie (JS/TS/JSON) |
| `pnpm write` | Biome | Auto-naprawa lint i format |
| `pnpm typeslint` | TypeScript (`tsc`) | Sprawdzanie typów dla `@nucleify/web` |
| `pnpm slint` | Stylelint | Linting SCSS w `web/`, `shared_modules/`, `portable/` |
| `pnpm slint:fix` | Stylelint | Auto-naprawa problemów SCSS |

### Biome

Biome zastępuje ESLint i Prettier. Konfiguracja jest w `.config/`. Uruchom `pnpm check` do walidacji lub `pnpm write` do auto-naprawy.

### Stylelint

Pliki SCSS są lintowane przez `stylelint-config-standard-scss`. Komenda celuje w:

- `web/**/*.scss`
- `shared_modules/**/*.scss`
- `portable/**/*.scss`

## Integracja CI

Workflow GitHub Actions (`.github/workflows/health-check.yml`) uruchamia się przy każdym pushu na dowolną gałąź. Po współdzielonym jobie setup (Node 22, pnpm, `--frozen-lockfile`) uruchamia te joby równolegle:

| Job | Komenda | Opis |
| --- | --- | --- |
| `biome` | `pnpm run check` | Lint Biome |
| `typeslint` | `pnpm run typeslint` | Sprawdzanie typów TypeScript |
| `stylelint` | `pnpm run slint` | Lint SCSS |
| `build` | `pnpm run build` | Produkcyjny build Nuxt |
| `test` | `pnpm run tests` | Vitest (web + shared) |
| `compiler` | `pnpm compiler:test` + `pnpm compiler:check` + sprawdzenie idempotentności | Testy kompilatora, fingerprinty i idempotentność buildu |

Job kompilatora weryfikuje też, że uruchomienie `pnpm compiler:build` nie produkuje żadnego git diff na śledzonych plikach — zapewniając, że wyemitowany kod jest zawsze commitowany i aktualny.

### Pre-commit i pre-push

Hooki Husky (`.husky/`) uruchamiają te same sprawdzenia lokalnie, zanim kod trafi do CI:

1. `pnpm btest` — Zestaw testów Bash
2. `pnpm check` — Lint Biome
3. `pnpm typeslint` — Sprawdzenie TypeScript
4. `pnpm slint` — Stylelint
5. `pnpm tests` — Vitest
