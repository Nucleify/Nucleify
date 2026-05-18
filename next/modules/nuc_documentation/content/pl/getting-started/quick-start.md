# Szybki Start

Zacznij pracę z Nucleify w kilka minut.

## Zrozumienie Atomic Design

Nucleify wykorzystuje metodologię Atomic Design do organizacji komponentów:

| Poziom | Opis | Przykłady |
|--------|------|-----------|
| **Bosons** | Logika wielokrotnego użytku, typy, narzędzia | Stałe, interfejsy, funkcje pomocnicze |
| **Atoms** | Najmniejsze elementy UI | Button, Input, Icon, Label |
| **Molecules** | Proste kombinacje atomów | FloatLabel, Anchor, Tile |
| **Organisms** | Złożone struktury UI | DataTable, Dialog, Menu, Card |

## Tworzenie Pierwszego Komponentu

### 1. Utwórz Folder Komponentu

Przejdź do odpowiedniego poziomu atomic w `nuxt/atomic/`:

```txt
nuxt/atomic/atom/my-component/
├── index.ts            # Eksporty
├── index.vue           # Komponent
└── types/
    ├── index.ts        # Eksporty typów
    └── interfaces.ts   # Interfejsy komponentu
```

### 2. Zdefiniuj Interfejs

Utwórz definicje typów komponentu w `types/interfaces.ts`:

```typescript
export interface MyComponentInterface {
  label?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}
```

Eksportuj typy w `types/index.ts`:

```typescript
export * from './interfaces'
```

### 3. Zbuduj Komponent

Utwórz komponent Vue w `index.vue`:

```html
<template>
  <div :class="$style['my-component']">
    {{ props.label }}
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { MyComponentInterface } from '.'

const props = defineProps<MyComponentInterface>()
</script>

<style lang="scss" module>
.my-component {
  // Twoje style
}
</style>
```

### 4. Eksportuj Komponent

Utwórz `index.ts` aby wyeksportować wszystko:

```typescript
export { default as AdMyComponent } from './index.vue'
export * from './types'
```

### 5. Zarejestruj w Rodzicu Index

Dodaj eksport do nadrzędnego `index.ts` (np. `nuxt/atomic/atom/index.ts`):

```typescript
export * from './my-component'
```

## Auto-Import i Rejestracja

Komponenty w `nuxt/atomic/` są **automatycznie rejestrowane** przez Nuxt z prefixem `ad-`. Nie potrzeba ręcznych importów w templateach!

```html
<template>
  <!-- Działają automatycznie - bez importów -->
  <ad-button label="Kliknij mnie" />
  <ad-my-component label="Cześć" />
</template>

<script setup lang="ts">
// Brak importów potrzebnych do użycia w template!
</script>
```

**Jak to działa:**
- Komponenty z folderów `atom/`, `molecule/`, `organism/` są skanowane automatycznie
- Każdy komponent dostaje prefix `ad-` (np. `button/index.vue` → `<ad-button>`)
- Typy i narzędzia z aliasu `nucleify` są również auto-importowane

### Jawne Importy

Gdy potrzebujesz użyć komponentów lub typów w script (nie template), importuj z `nucleify`:

```html
<script setup lang="ts">
import { AdButton, type ButtonInterface } from 'nucleify'

// Użycie w logice script
const buttonRef = ref<InstanceType<typeof AdButton>>()
</script>
```

### Co Jest Auto-Importowane

| Źródło | Auto-Import |
|--------|-------------|
| `~/atomic/atom/*` | Komponenty z prefixem `ad-` |
| `~/atomic/molecule/*` | Komponenty z prefixem `ad-` |
| `~/atomic/organism/*` | Komponenty z prefixem `ad-` |
| `~/composables/**` | Composables |

## Stylowanie Komponentów

Dla komponentów Atomic Design zalecamy używanie **CSS Modules** - zapewniają automatyczne scopowanie, zapobiegają kolizjom nazw i świetnie współpracują z TypeScript.

### Opcja 1: CSS Modules (Zalecane)

Użyj atrybutu `module` na tagu style. Dostęp do klas przez obiekt `$style`:

```html
<template>
  <div :class="$style['my-component']">
    <span :class="$style.label">{{ label }}</span>
  </div>
</template>

<style lang="scss" module>
.my-component {
  display: flex;
  padding: 1rem;

  .label {
    font-weight: 600;
  }
}
</style>
```

**Zalety:**
- Automatyczne unikalne nazwy klas (brak kolizji)
- Wsparcie TypeScript przez `$style`
- Lepsza enkapsulacja dla komponentów wielokrotnego użytku

### Opcja 2: Normalne SCSS

Globalne style bez scopowania. Klasy używane bezpośrednio w template:

```html
<template>
  <div class="my-component">
    <span class="label">{{ label }}</span>
  </div>
</template>

<style lang="scss">
.my-component {
  display: flex;
  padding: 1rem;

  .label {
    font-weight: 600;
  }
}
</style>
```

**Kiedy używać:**
- Globalne style i nadpisania
- Style które muszą wpływać na komponenty potomne
- Strony i layouty

### Zewnętrzne Pliki SCSS

Dla złożonych komponentów, wyodrębnij style do `_index.scss`:

```txt
my-component/
├── _index.scss   # Style
├── index.ts
└── index.vue
```

Zaimportuj w komponencie:

```html
<style lang="scss">
@import 'index';
</style>
```

## Konwencje Nazewnictwa

| Element | Konwencja | Przykład |
|---------|-----------|----------|
| Nazwy folderów | kebab-case | `my-component/` |
| Eksporty komponentów | PascalCase z prefixem `Ad` | `AdMyComponent` |
| Interfejsy | PascalCase z suffixem `Interface` | `MyComponentInterface` |
| Klasy CSS | kebab-case | `.my-component` |
| Pliki SCSS | prefix underscore | `_index.scss` |

## Następne Kroki

- Dowiedz się więcej o [Modułach](/pl/docs/core-concepts/modules) do organizacji funkcji
- Poznaj metodologię [Atomic Design](/pl/docs/core-concepts/atomic-design)
- Przeczytaj [Standardy Kodu](/pl/docs/contributing/code-standards) dla najlepszych praktyk

