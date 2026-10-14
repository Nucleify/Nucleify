# Vitest

Nucleify używa [Vitest](https://vitest.dev) do testów jednostkowych i integracyjnych w monorepo. Root config definiuje dwa projekty — **web** (środowisko Nuxt) i **shared** (happy-dom) — plus osobny suite kompilatora.

---

## Uruchamianie testów

```bash
pnpm tests              # wszystkie projekty root (web + shared)
pnpm test:watch         # tryb watch
pnpm test:web           # tylko projekt Nuxt
pnpm test:shared        # tylko shared_modules
pnpm compiler:test      # testy jednostkowe kompilatora
```

CI i hook Husky pre-commit uruchamiają `pnpm tests` jako część `.config/bash/hook-checks.sh` wraz z testami bash, Biome, TypeScript, Stylelint, buildem Nuxt i checkami kompilatora (pre-push jest no-op).

---

## Konfiguracja projektów

Root `vitest.config.ts` definiuje projekty workspace:

### Projekt `web`

- **Root:** `web/`
- **Środowisko:** `nuxt` (przez `@nuxt/test-utils`)
- **Include:** `vitests/**/*.{test,spec}.{js,ts,jsx,tsx}`
- **Timeout:** 30s
- **Alias:** `nucleify` → `web/src/nucleify.ts`

### Projekt `shared`

- **Root:** `shared_modules/`
- **Środowisko:** `happy-dom`
- **Include:** `**/vitests/**/*.{test,spec}.{js,ts}`
- **Timeout:** 15s
- **Alias:** `nucleify` → `shared_modules/nucleify.ts`
- **Define:** shimy `import.meta.client` / `import.meta.server`

Oba projekty dzielą setup z `.config/vitest_setup.ts` i używają threaded pools.

### Projekt kompilatora

Osobny config w `.config/vitest.compiler.config.ts`:

```bash
pnpm compiler:test
```

Testy są w `compiler/tests/` (w tym goldeny emit/import dla Vue, React, Solid i Svelte).

---

## Gdzie kłaść testy

| Lokalizacja | Wzorzec | Projekt |
|-------------|---------|---------|
| `web/vitests/` | `*.test.ts` | web |
| `shared_modules/nuc_*/vitests/` | `*.test.ts` | shared |
| `compiler/tests/` | fixtures + unit | compiler |

Trzymaj testy modułu wewnątrz modułu (`shared_modules/nuc_colors/vitests/`). Nie kładź testów shared modules pod `web/vitests/`, chyba że wymagają runtime Nuxt.

---

## Pisanie testów modułu

Przykład pod `shared_modules/nuc_colors/vitests/`:

```typescript
import { describe, expect, it } from 'vitest'
import { darkenColor } from '../../utils/darken_color'

describe('darkenColor', () => {
  it('darkens a hex color', () => {
    expect(darkenColor('#ffffff', 0.1)).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
```

Uruchom tylko testy shared podczas iteracji:

```bash
pnpm test:shared
```

---

## Pisanie testów Nuxt

Pliki w `web/vitests/`. Środowisko Nuxt montuje komponenty przez `@nuxt/test-utils`:

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

## Plik setup

`.config/vitest_setup.ts` konfiguruje globalne zachowanie testów (mocki, matchery z `@testing-library/jest-dom` gdzie używane). Oba projekty importują go przez `setupFiles`.

Tłumienie logów konsoli jest włączone (`onConsoleLog: () => false`), żeby zmniejszyć szum w CI.

---

## Suite pre-commit

Husky pre-commit uruchamia (przez `.config/bash/hook-checks.sh`), w kolejności:

1. `pnpm btest` — suite bash
2. `pnpm check` — Biome
3. `pnpm typeslint` — TypeScript (`web/tsconfig.json`)
4. `pnpm slint` — Stylelint na SCSS
5. `pnpm build` — produkcyjny build Nuxt
6. `pnpm tests` — Vitest
7. `pnpm compiler:test` — testy jednostkowe kompilatora
8. `pnpm compiler:check` — odciski emit

Pre-push jest no-op. Napraw błędy lokalnie przed commitem.

---

## Coverage i debug

Jeden plik:

```bash
pnpm vitest run shared_modules/nuc_stores/cookie/get_item/index.test.ts
pnpm vitest run --project web web/vitests/some.test.ts
```

Watch w development:

```bash
pnpm test:watch
```

---

## Powiązana dokumentacja

- [Moduły](/pl/docs/core-concepts/modules) — konwencja folderu `vitests/`
- [Standardy kodowania](/pl/docs/about/coding-standards) — nazewnictwo i struktura
- [Kompilator](/pl/docs/core-concepts/compiler) — `pnpm compiler:test`
