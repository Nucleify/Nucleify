# Atomic Design

Nucleify implementuje metodologię Atomic Design do tworzenia spójnych, skalowalnych i łatwych w utrzymaniu systemów UI.

## Czym jest Atomic Design?

Atomic Design to metodologia stworzona przez Brada Frosta, która rozkłada interfejsy użytkownika na podstawowe elementy składowe. Inspirowana chemią, organizuje komponenty w hierarchię od najmniejszych elementów do kompletnych stron.

**Kluczowe korzyści:**
- **Spójność** - Komponenty wielokrotnego użytku zapewniają jednolity wygląd
- **Łatwość utrzymania** - Zmiany propagują się automatycznie przez cały system
- **Skalowalność** - Łatwe rozszerzanie bez naruszania istniejącej funkcjonalności
- **Współpraca** - Przejrzysta struktura ułatwia komunikację w zespole

---

## Główna zasada: Brak logiki biznesowej

> **Komponenty Atomic Design NIE MOGĄ zawierać logiki biznesowej.**

Komponenty powinny zawierać tylko funkcjonalność bezpośrednio związaną z ich zachowaniem UI:

| ✅ Dozwolone | ❌ Niedozwolone |
|-------------|----------------|
| Walidacja inputów (format, długość) | Zakodowane na sztywno wywołania API |
| Animacje i przejścia | Bezpośrednie pobieranie danych |
| Lokalny stan komponentu | Mutacje store |
| Emitowanie zdarzeń | Zakodowane na sztywno URL-e lub endpointy |
| Renderowanie oparte na propsach | Sprawdzanie autoryzacji/uwierzytelniania |
| Funkcje dostępności | Obliczenia specyficzne dla domeny |
| Konfigurowalne callbacki przez propsy | Nieelastyczne reguły biznesowe |
| Generyczne handlery zdarzeń | Zakodowana na sztywno konfiguracja |

**Logika biznesowa należy do:**
- Store'ów (Pinia)
- Composables
- Serwisów

### Wyjątki

Nucleify rozszerza oryginalny Atomic Design o dedykowane moduły, które **mogą zawierać logikę biznesową**:

| Moduł | Przeznaczenie |
|-------|---------------|
| `nuc_templates` | Szablony wielokrotnego użytku dla pojedynczych komponentów (karty, formularze, modale) |
| `nuc_sections` | Sekcje stron z logiką layoutu, obsługą danych, zachowaniem specyficznym dla sekcji |
| `nuc_pages` | Pełne komponenty stron z wywołaniami API, dostępem do store'ów, regułami biznesowymi |

Te moduły zostały celowo oddzielone od `nuxt/atomic/`, ponieważ służą jako punkty integracji, gdzie UI spotyka się z logiką aplikacji. Izolując logikę biznesową tutaj, wszystkie pozostałe komponenty atomowe pozostają czyste i wielokrotnego użytku.

---

## Hierarchia

Nucleify rozszerza oryginalny Atomic Design o dodatkową warstwę zwaną **Bosons** dla typów i narzędzi.

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Bosons                                           │
│                      Typy, narzędzia, stałe (niewidoczna warstwa)                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                        Atoms                                           │
│                      Podstawowe elementy UI (Button, Input, Icon)                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                      Molecules                                         │
│                    Proste kombinacje atomów (FloatLabel, Tile)                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                      Organisms                                         │
│                    Złożone sekcje UI (DataTable, Dialog, Menu)                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              Templates  (nuc_templates)                                │
│                   Szablony komponentów (karty, formularze, modale)                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               Sections  (nuc_sections)                                 │
│                    Sekcje stron z logiką layoutu i obsługą danych                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 Pages  (nuc_pages)                                     │
│                 Pełne strony z wywołaniami API, store'ami, regułami                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Bosons - Niewidzialna podstawa

Bosons to najmniejsze, niepodzielne elementy logiki wielokrotnego użytku. Nie renderują niczego, ale stanowią fundament dla wszystkich komponentów.

**Co należy do Bosons:**
- Interfejsy i typy TypeScript
- Czyste funkcje narzędziowe (bez efektów ubocznych)
- Stałe i enumy
- Helpery specyficzne dla komponentów

```typescript
// types/interfaces.ts
export interface ButtonInterface {
  label?: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

// utils/format_date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date)
}

// constants/breakpoints.ts
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const
```

---

## Atoms - Podstawowe elementy

Atoms to najmniejsze wizualne komponenty. Nie można ich dalej rozłożyć bez utraty znaczenia.

**Przykłady:** Button, Input, Icon, Label, Badge, Checkbox, Avatar

**Jaka logika jest dozwolona:**
- Obsługa zdarzeń click/focus/hover
- Zarządzanie wewnętrznym stanem (np. wartość inputa)
- Stosowanie warunkowych stylów na podstawie propsów
- Emitowanie zdarzeń do rodzica

```html
<template>
  <button
    :class="[
      $style['ad-button'],
      variant && $style[variant],
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonInterface } from './types'

defineProps<ButtonInterface>()
defineEmits<{ click: [event: MouseEvent] }>()
</script>

<style lang="scss" module>
.ad-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: var(--primary-color);
    color: white;
  }

  &.secondary {
    background: transparent;
    border: 1px solid var(--border-color);
  }
}
</style>
```

**Struktura folderów:**

```txt
atomic/atom/button/
├── index.vue            # Komponent
├── index.ts             # Eksporty
├── _index.scss          # Style (opcjonalne)
└── types/
    ├── index.ts
    ├── interfaces.ts
    └── variables.ts     # Literały typów
```

---

## Molecules - Proste kombinacje

Molecules łączą atomy w funkcjonalne jednostki. Mają jedną odpowiedzialność i są nadal stosunkowo proste.

**Przykłady:** FloatLabel, Anchor, Tile

**Jaka logika jest dozwolona:**
- Koordynowanie stanów atomów-dzieci
- Proste wartości computed
- Lokalna walidacja (tylko format, nie reguły biznesowe)

```html
<template>
  <div :class="$style['float-label']">
    <ad-input
      :id="inputId"
      v-model="model"
      :placeholder="placeholder"
    />
    <ad-label :for="inputId">
      {{ label }}
    </ad-label>
  </div>
</template>

<script setup lang="ts">
import type { FloatLabelInterface } from './types'

const props = defineProps<FloatLabelInterface>()
const model = defineModel<string>()
const inputId = computed(() => props.id || `input-${Math.random()}`)
</script>
```

**Kiedy tworzyć molekułę:**
- Dwa lub więcej atomów zawsze występują razem
- Kombinacja ma specyficzną logikę interakcji
- Reprezentuje pojedynczą, spójną funkcję UI

**Struktura folderów:**

```txt
nuxt/atomic/molecule/
├── float-label/
│   ├── index.vue
│   ├── index.ts
│   └── types/
├── anchor/
├── tile/
└── index.ts
```

---

## Organisms - Złożone struktury

Organisms to złożone sekcje UI składające się z molekuł, atomów lub innych organizmów. Są nadal komponentami **tylko prezentacyjnymi**.

**Przykłady:** DataTable, Dialog, Menu, Card, Accordion, Navbar

**Jaka logika jest dozwolona:**
- Renderowanie danych przekazanych przez propsy
- Lokalne filtrowanie/sortowanie dostarczonych danych
- Zarządzanie stanami otwarte/zamknięte
- Emitowanie zdarzeń dla akcji użytkownika

**Co NIE jest dozwolone:**
- Pobieranie danych z API
- Bezpośredni dostęp do store'ów
- Walidacja reguł biznesowych

```html
<template>
  <div :class="$style['data-table']">
    <div :class="$style.header">
      <ad-input
        v-model="searchQuery"
        placeholder="Search..."
      />
    </div>

    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field">
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filteredData" :key="row.id">
          <td v-for="col in columns" :key="col.field">
            {{ row[col.field] }}
          </td>
        </tr>
      </tbody>
    </table>

    <ad-pagination
      v-model="currentPage"
      :total="totalPages"
      @change="$emit('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { DataTableInterface } from './types'

// ✓ Propsy dla danych - komponent nic nie pobiera
const props = defineProps<DataTableInterface>()

// ✓ Tylko lokalny stan UI
const searchQuery = ref('')
const currentPage = ref(1)

// ✓ Lokalne filtrowanie - brak logiki biznesowej
const filteredData = computed(() =>
  props.data.filter(row =>
    Object.values(row).some(v =>
      String(v).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
)

// ✓ Emituj zdarzenia - rodzic obsługuje logikę biznesową
defineEmits<{ 'page-change': [page: number] }>()
</script>
```

**Struktura folderów:**

```txt
nuxt/atomic/organism/
├── data-table/
│   ├── index.vue
│   ├── index.ts
│   ├── _index.scss
│   └── types/
├── dialog/
├── menu/
├── card/
└── index.ts
```

---

## Templates

Templates to szablony komponentów wielokrotnego użytku dla kart, formularzy, modali i innych strukturalnych layoutów. Logika biznesowa jest tutaj dozwolona.

**Lokalizacja:** `modules/nuc_templates/`

```html
<template>
  <div :class="$style['dashboard-template']">
    <aside :class="$style.sidebar">
      <slot name="sidebar" />
    </aside>
    <main :class="$style.content">
      <header>
        <slot name="header" />
      </header>
      <slot />
    </main>
  </div>
</template>
```

**Struktura folderów:**

```txt
modules/nuc_templates/
├── atomic/
│   └── templates/
│       ├── dashboard/
│       │   ├── index.vue
│       │   ├── index.ts
│       │   └── types/
│       ├── auth/
│       ├── card/
│       └── index.ts
├── config.json
└── index.ts
```

---

## Sections

Sections to bloki budulcowe na poziomie strony z logiką layoutu i obsługą danych. Komponują szablony i organizmy w znaczące obszary strony.

**Lokalizacja:** `modules/nuc_sections/`

```html
<template>
  <section :class="$style['hero-section']">
    <div :class="$style.content">
      <ad-heading>{{ title }}</ad-heading>
      <ad-paragraph>{{ description }}</ad-paragraph>
      <ad-button @click="handleAction">{{ actionLabel }}</ad-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroSectionInterface } from './types'

// ✓ Logika biznesowa dozwolona w sekcjach
const props = defineProps<HeroSectionInterface>()

const emit = defineEmits<{ action: [] }>()

function handleAction() {
  // Może zawierać logikę biznesową
  emit('action')
}
</script>
```

**Struktura folderów:**

```txt
modules/nuc_sections/
├── atomic/
│   └── sections/
│       ├── hero/
│       │   ├── index.vue
│       │   ├── index.ts
│       │   └── types/
│       ├── features/
│       ├── pricing/
│       └── index.ts
├── config.json
└── index.ts
```

---

## Pages

Pages to miejsce, gdzie **żyje logika biznesowa**. Łączą komponenty UI ze store'ami, API i stanem aplikacji.

| Część | Lokalizacja | Przeznaczenie |
|-------|-------------|---------------|
| Definicja route'a | `nuxt/pages/` | Routing Nuxt (minimalny wrapper) |
| Zawartość strony | `modules/nuc_pages/pages/` | Logika biznesowa + kompozycja komponentów |

**Plik route'a** (`nuxt/pages/dashboard.vue`):

```html
<template>
  <nuc-dashboard-page />
</template>
```

**Komponent strony** (`modules/nuc_pages/pages/Dashboard/index.vue`):

```html
<template>
  <dashboard-template>
    <template #sidebar>
      <navigation-menu :items="menuItems" />
    </template>

    <!-- ✓ Dane przekazane do komponentu prezentacyjnego -->
    <ad-data-table
      :data="users"
      :columns="columns"
      @page-change="handlePageChange"
    />
  </dashboard-template>
</template>

<script setup lang="ts">
// ✓ Logika biznesowa żyje tutaj
const userStore = useUserStore()
const { users, fetchUsers } = userStore

// ✓ Wywołania API w stronach
onMounted(() => fetchUsers())

// ✓ Handlery logiki biznesowej
function handlePageChange(page: number) {
  fetchUsers({ page })
}
</script>
```

**Struktura folderów:**

```txt
modules/nuc_pages/
├── pages/
│   ├── Dashboard/
│   │   ├── index.vue
│   │   ├── index.ts
│   │   └── types/
│   ├── Home/
│   ├── Profile/
│   └── index.ts
├── config.json
└── index.ts
```

---

## Konwencje nazewnictwa komponentów

Wszystkie komponenty atomowe używają prefiksu `ad-` (Atomic Design):

| Poziom | Nazewnictwo | Przykład |
|--------|-------------|----------|
| Atom | `ad-{nazwa}` | `<ad-button>`, `<ad-icon>` |
| Molecule | `ad-{nazwa}` | `<ad-float-label>`, `<ad-tile>` |
| Organism | `ad-{nazwa}` | `<ad-data-table>`, `<ad-dialog>` |
| Template | `nuc-{moduł}-{nazwa}` | `<nuc-auth-template>` |
| Page | `nuc-{moduł}-page` | `<nuc-dashboard-page>` |

---

## Najlepsze praktyki

### 1. Utrzymuj komponenty czyste

Komponenty powinny być przewidywalne - te same propsy zawsze produkują ten sam output:

```html
<!-- ✓ Dobrze: Czysta prezentacja -->
<ad-user-card :user="user" @follow="$emit('follow', user.id)" />

<!-- ✗ Źle: Efekty uboczne wewnątrz komponentu -->
<ad-user-card :userId="userId" />  <!-- pobiera użytkownika wewnętrznie -->
```

### 2. Props w dół, Events w górę

Komponenty otrzymują dane przez propsy i komunikują zmiany przez zdarzenia:

```html
<!-- Rodzic obsługuje logikę biznesową -->
<ad-select
  v-model="selectedOption"
  :options="options"
  @change="saveToApi"
/>
```

### 3. Pojedyncza odpowiedzialność

Każdy komponent powinien robić jedną rzecz dobrze:

```html
<!-- ✓ Dobrze: Skoncentrowany komponent -->
<ad-avatar :src="user.avatar" :size="'lg'" />

<!-- ✗ Źle: Zbyt wiele odpowiedzialności -->
<user-card-with-avatar-and-actions-and-menu />
```

### 4. Używaj interfejsów TypeScript

Zawsze definiuj interfejsy propsów dla bezpieczeństwa typów:

```typescript
// types/interfaces.ts
export interface CardInterface {
  title?: string
  subtitle?: string
  variant?: CardVariant
  clickable?: boolean
}

// types/variables.ts
export type CardVariant = 'default' | 'outlined' | 'elevated'
```
