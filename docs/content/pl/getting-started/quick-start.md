# Szybki start

## Zbuduj swój pierwszy komponent w 10 minut

Ten przewodnik przeprowadzi Cię przez tworzenie komponentu w Nucleify — najpierw jako standardowy komponent Vue w systemie Atomic Design, potem jako przenośny komponent `*.nuc.tsx`, który emituje zarówno Vue, jak i React.

> **Wymaganie wstępne:** Upewnij się, że ukończyłeś przewodnik [Instalacja](/pl/docs/getting-started/installation) i masz uruchomiony serwer dev przez `make web`.

---

## Zrozumienie struktury plików

Nucleify używa **Atomic Design** do organizacji komponentów UI pod `web/src/`. Wszystkie komponenty mają prefiks `ad-` (Atomic Design):

```
web/src/
├── pages/                  # Strony routingu ([lang]/home.vue itd.)
├── layouts/                # Layouty aplikacji (default, admin)
├── plugins/                # Rejestracja modułów (pluginy nuc_*)
├── server/
│   └── api/                # Bramka API Nitro (po stronie serwera)
├── composables/            # Composables Vue (auto-import)
├── components/
│   ├── atom/               # Podstawowe elementy UI
│   │   ├── button/         # <ad-button>
│   │   ├── input-text/     # <ad-input-text>
│   │   ├── icon/           # <ad-icon>
│   │   └── avatar/         # <ad-avatar>
│   ├── molecule/           # Kombinacje atomów
│   │   ├── float-label/    # <ad-float-label>
│   │   ├── anchor/         # <ad-anchor>
│   │   └── tile/           # <ad-tile>
│   └── organism/           # Złożone struktury
│       ├── data-table/     # <ad-data-table>
│       ├── dialog/         # <ad-dialog>
│       └── chart/          # <ad-chart>
└── assets/
    └── styles/             # Globalny SCSS
```

| Poziom | Opis | Przykłady nazewnictwa |
|--------|------|----------------------|
| **Atom** | Najmniejsze bloki UI | `<ad-button>`, `<ad-input-text>`, `<ad-icon>` |
| **Molecule** | Kombinacje atomów | `<ad-float-label>`, `<ad-anchor>`, `<ad-tile>` |
| **Organism** | Złożone struktury komponentów | `<ad-data-table>`, `<ad-dialog>`, `<ad-chart>` |

---

## Krok 1: Utwórz komponent Vue

Stwórzmy prosty komponent status badge jako **atom**.

### 1.1 Utwórz folder komponentu

```
web/src/components/atom/status-badge/
├── index.ts              # Eksporty
├── index.vue             # Komponent
└── types/
    ├── index.ts          # Eksporty typów
    └── interfaces.ts     # Interfejsy komponentu
```

### 1.2 Zdefiniuj interfejs

**`types/interfaces.ts`**

```typescript
export interface StatusBadgeInterface {
  label: string
  status?: 'success' | 'warning' | 'error' | 'info'
}
```

**`types/index.ts`**

```typescript
export * from './interfaces'
```

### 1.3 Zbuduj komponent

**`index.vue`**

```html
<template>
  <span :class="[$style['status-badge'], $style[props.status ?? 'info']]">
    {{ props.label }}
  </span>
</template>

<script setup lang="ts">
import type { StatusBadgeInterface } from '.'

const props = defineProps<StatusBadgeInterface>()
</script>

<style lang="scss" module>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;

  &.success { background: var(--nui-color-success-light); color: var(--nui-color-success); }
  &.warning { background: var(--nui-color-warning-light); color: var(--nui-color-warning); }
  &.error   { background: var(--nui-color-error-light);   color: var(--nui-color-error);   }
  &.info    { background: var(--nui-color-info-light);    color: var(--nui-color-info);    }
}
</style>
```

### 1.4 Eksportuj komponent

**`index.ts`**

```typescript
export { default as AdStatusBadge } from './index.vue'
export * from './types'
```

### 1.5 Zarejestruj w barrel atomów

Dodaj eksport do `web/src/components/atom/index.ts`:

```typescript
export * from './status-badge'
```

### 1.6 Użyj go

Komponenty w `web/src/components/` są **auto-importowane** przez Nuxt z prefiksem `ad-`. W szablonach nie potrzeba ręcznych importów:

```html
<template>
  <ad-status-badge label="Active" status="success" />
  <ad-status-badge label="Pending" status="warning" />
  <ad-status-badge label="Failed" status="error" />
</template>
```

Do użycia w skrypcie importuj jawnie przez alias `nucleify`:

```html
<script setup lang="ts">
import { AdStatusBadge, type StatusBadgeInterface } from 'nucleify'
</script>
```

---

## Krok 2: Utwórz komponent przenośny

Komponenty przenośne (`*.nuc.tsx`) to supermoc kompilatora — napisz raz, wyemituj Vue + React + CSS.

### 2.1 Utwórz plik źródłowy

Utwórz `portable/components/Counter.nuc.tsx`:

```tsx
import { nuc } from '#nuc-compiler/runtime'

export default nuc.component('Counter', {
  props: {
    initial: nuc.number(0),
    label: nuc.string('Count'),
  },
  setup({ props }) {
    const count = nuc.state(props.initial)

    const increment = () => { count.value++ }
    const reset = () => { count.value = props.initial }

    return () => (
      <div class="counter">
        <span class="counter__label">{props.label}: {count.value}</span>
        <button class="counter__btn" onClick={increment}>+1</button>
        <button class="counter__btn counter__btn--reset" onClick={reset}>Reset</button>
      </div>
    )
  },
  styles: `
    .counter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .counter__label {
      font-weight: 600;
      min-width: 6rem;
    }
    .counter__btn {
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      border: 1px solid var(--nui-color-border);
      cursor: pointer;
    }
    .counter__btn--reset {
      opacity: 0.6;
    }
  `,
})
```

### 2.2 Zbuduj kompilatorem

```bash
pnpm compiler:build
```

Kompilator odkrywa wszystkie pliki `*.nuc.tsx` i emituje:

```
portable/components/
├── Counter.nuc.tsx     # Twoje źródło (nienaruszone)
├── Counter.vue         # Wygenerowany Vue SFC
├── Counter.tsx         # Wygenerowany komponent React
└── Counter.css         # Wyodrębnione style
```

### 2.3 Zobacz output

**Wygenerowany `Counter.vue`:**

```html
<template>
  <div class="counter">
    <span class="counter__label">{{ label }}: {{ count }}</span>
    <button class="counter__btn" @click="increment">+1</button>
    <button class="counter__btn counter__btn--reset" @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  initial?: number
  label?: string
}>(), {
  initial: 0,
  label: 'Count',
})

const count = ref(props.initial)
const increment = () => { count.value++ }
const reset = () => { count.value = props.initial }
</script>
```

**Wygenerowany `Counter.tsx`:**

```tsx
import { useState } from 'react'
import './Counter.css'

interface CounterProps {
  initial?: number
  label?: string
}

export function Counter({ initial = 0, label = 'Count' }: CounterProps) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount(c => c + 1)
  const reset = () => setCount(initial)

  return (
    <div className="counter">
      <span className="counter__label">{label}: {count}</span>
      <button className="counter__btn" onClick={increment}>+1</button>
      <button className="counter__btn counter__btn--reset" onClick={reset}>Reset</button>
    </div>
  )
}
```

### 2.4 Import zwrotny

Jeśli edytujesz wygenerowany plik bezpośrednio (np. dopracowujesz `Counter.vue`), zaimportuj zmiany z powrotem do źródła:

```bash
pnpm compiler -- import --from=vue
```

To aktualizuje `Counter.nuc.tsx`, aby odzwierciedlić Twoje zmiany i utrzymać źródło prawdy w synchronizacji.

---

## Krok 3: Użyj modułu współdzielonego

Moduły współdzielone (`shared_modules/nuc_*`) dostarczają funkcje cross-cutting. Oto jak użyć `nuc_api` do wywołań API.

### 3.1 Zrozum przepływ API

```
Strona Vue → nuc_api.apiRequest() → /api/* (trasa serwera Nitro) → handle.ts modułu → Supabase
```

### 3.2 Wykonaj wywołanie API

W dowolnej stronie Vue lub composable:

```html
<script setup lang="ts">
import { apiRequest } from 'nuc_api'

const { data, error, pending } = await apiRequest({
  module: 'nuc_languages',
  action: 'get_translations',
  params: { locale: 'en' },
})
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>
    {{ data }}
  </div>
</template>
```

### 3.3 Jak to działa pod spodem

1. `apiRequest()` wysyła POST na `/api/nuc_languages` z `{ action: 'get_translations', params: { locale: 'en' } }`
2. Trasa API Nitro w `web/src/server/api/` odbiera żądanie
3. Deleguje do `shared_modules/nuc_languages/supabase/api/handle.ts`
4. Handler używa klienta Supabase **service role** do zapytania PostgreSQL
5. Odpowiedź wraca do frontendu

### 3.4 Szybka referencja struktury modułu

Każdy moduł `nuc_*` ma ten sam układ:

```
shared_modules/nuc_api/
├── nuc_api.ts              # Rejestracja pluginu Vue
├── index.ts                # Barrel Vue (import { apiRequest } from 'nuc_api')
├── index.react.ts          # Barrel React (to samo API, hooki React)
├── supabase/
│   ├── api/handle.ts       # Handler API po stronie serwera
│   └── migrations/         # Migracje SQL tabel modułu
├── types/                  # Interfejsy TypeScript
├── utils/                  # Composables i pomocniki
└── vitests/                # Testy
```

---

## Konwencje nazewnictwa

| Element | Konwencja | Przykład |
|---------|-----------|----------|
| Foldery komponentów | kebab-case | `status-badge/` |
| Eksporty komponentów | PascalCase z prefiksem `Ad` | `AdStatusBadge` |
| Interfejsy | PascalCase z sufiksem `Interface` | `StatusBadgeInterface` |
| Klasy CSS | kebab-case (BEM dla przenośnych) | `.status-badge`, `.counter__btn` |
| Pliki SCSS | prefiks podkreślenia | `_index.scss` |
| Pliki przenośne | PascalCase z `.nuc.tsx` | `Counter.nuc.tsx` |
| Moduły | snake_case z prefiksem `nuc_` | `nuc_api`, `nuc_colors` |

---

## Ściągawka komend

| Zadanie | Komenda |
|---------|---------|
| Uruchom serwer dev (Nuxt) | `make web` |
| Uruchom serwer dev (Next.js) | `make web TARGET=next` |
| Zbuduj komponenty przenośne | `pnpm compiler:build` |
| Importuj zmiany z Vue | `pnpm compiler -- import --from=vue` |
| Importuj zmiany z React | `pnpm compiler -- import --from=react` |
| Konwertuj web na Next.js | `pnpm compiler -- convert web --target=next` |
| Uruchom wszystkie testy | `pnpm tests` |
| Lint (Biome) | `pnpm check` |
| Sprawdzenie typów | `pnpm typeslint` |

---

## Co dalej?

Stworzyłeś komponent Vue, zbudowałeś komponent przenośny kompilatorem i wykonałeś wywołanie API przez moduł współdzielony. Oto kolejne kroki:

1. **[Moduły](/pl/docs/core-concepts/modules)** — poznaj wszystkie moduły i naucz się tworzyć własne
2. **[Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design)** — architektura organizacji kodu po domenach
3. **[Kompilator](/pl/docs/core-concepts/compiler)** — zaawansowane funkcje kompilatora, format IR i cele emisji
4. **[Supabase](/pl/docs/configuration/supabase)** — konfiguracja bazy, migracje, polityki RLS i edge functions
5. **[Standardy kodowania](/pl/docs/about/coding-standards)** — standardy kodu, workflow PR i wytyczne testowania
