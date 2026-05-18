# Atomic Design

Nucleify implements Atomic Design methodology to create consistent, scalable, and maintainable UI systems.

## What is Atomic Design?

Atomic Design is a methodology created by Brad Frost that breaks down user interfaces into fundamental building blocks. Inspired by chemistry, it organizes components into a hierarchy from the smallest elements to complete pages.

**Key benefits:**
- **Consistency** - Reusable components ensure uniform look and feel
- **Maintainability** - Changes propagate automatically through the system
- **Scalability** - Easy to extend without breaking existing functionality
- **Collaboration** - Clear structure improves team communication

---

## Core Principle: No Business Logic

> **Atomic Design components must NOT contain business logic.**

Components should only include functionality directly related to their UI behavior:

| ✅ Allowed | ❌ Not Allowed |
|-----------|---------------|
| Input validation (format, length) | Hardcoded API calls |
| Animation and transitions | Direct data fetching |
| Local component state | Store mutations |
| Event emission | Hardcoded URLs or endpoints |
| Prop-based rendering | Authentication/authorization checks |
| Accessibility features | Domain-specific calculations |
| Configurable callbacks via props | Inflexible business rules |
| Generic event handlers | Hardcoded configuration |

**Business logic belongs in:**
- Stores (Pinia)
- Composables
- Services

### Exceptions

Nucleify extends the original Atomic Design with dedicated modules that **are allowed to contain business logic**:

| Module | Purpose |
|--------|---------|
| `nuc_templates` | Reusable templates for individual components (cards, forms, modals) |
| `nuc_sections` | Page sections with layout logic, data handling, section-specific behavior |
| `nuc_pages` | Full page components with API calls, store access, business rules |

These modules were intentionally separated from `nuxt/atomic/` because they serve as integration points where UI meets application logic. By isolating business logic here, all other atomic components remain pure, and reusable.

---

## The Hierarchy

Nucleify extends the original Atomic Design with an additional layer called **Bosons** for types and utilities.

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Bosons                                           │
│                      Types, utilities, constants (invisible layer)                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                        Atoms                                           │
│                        Basic UI elements (Button, Input, Icon)                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                      Molecules                                         │
│                    Simple combinations of atoms (FloatLabel, Tile)                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                      Organisms                                         │
│                     Complex UI sections (DataTable, Dialog, Menu)                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              Templates  (nuc_templates)                                │
│                   Reusable component templates (cards, forms, modals)                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               Sections  (nuc_sections)                                 │
│                    Page sections with layout and data handling                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 Pages  (nuc_pages)                                     │
│                  Full pages with API calls, stores, business rules                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Bosons - The Invisible Foundation

Bosons are the smallest, indivisible pieces of reusable logic. They don't render anything but provide the foundation for all components.

**What belongs in Bosons:**
- TypeScript interfaces and types
- Pure utility functions (no side effects)
- Constants and enums
- Component-specific helpers

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

## Atoms - Basic Building Blocks

Atoms are the smallest visual components. They cannot be broken down further without losing their meaning.

**Examples:** Button, Input, Icon, Label, Badge, Checkbox, Avatar

**What logic is allowed:**
- Handling click/focus/hover events
- Managing internal state (e.g., input value)
- Applying conditional styles based on props
- Emitting events to parent

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

**Folder structure:**

```txt
atomic/atom/button/
├── index.vue            # Component
├── index.ts             # Exports
├── _index.scss          # Styles (optional)
└── types/
    ├── index.ts
    ├── interfaces.ts
    └── variables.ts     # Type literals
```

---

## Molecules - Simple Combinations

Molecules combine atoms into functional units. They have a single responsibility and are still relatively simple.

**Examples:** FloatLabel, Anchor, Tile

**What logic is allowed:**
- Coordinating child atom states
- Simple computed values
- Local validation (format only, not business rules)

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

**When to create a molecule:**
- Two or more atoms always appear together
- The combination has specific interaction logic
- It represents a single, cohesive UI function

**Folder structure:**

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

## Organisms - Complex Structures

Organisms are complex UI sections composed of molecules, atoms, or other organisms. They are still **presentation-only** components.

**Examples:** DataTable, Dialog, Menu, Card, Accordion, Navbar

**What logic is allowed:**
- Rendering data passed via props
- Local filtering/sorting of provided data
- Managing open/closed states
- Emitting events for user actions

**What is NOT allowed:**
- Fetching data from APIs
- Direct store access
- Business rule validation

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

// ✓ Props for data - component doesn't fetch anything
const props = defineProps<DataTableInterface>()

// ✓ Local UI state only
const searchQuery = ref('')
const currentPage = ref(1)

// ✓ Local filtering - no business logic
const filteredData = computed(() =>
  props.data.filter(row =>
    Object.values(row).some(v =>
      String(v).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
)

// ✓ Emit events - let parent handle business logic
defineEmits<{ 'page-change': [page: number] }>()
</script>
```

**Folder structure:**

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

Templates are reusable component wrappers for cards, forms, modals, and other structured layouts. Business logic is allowed here.

**Location:** `modules/nuc_templates/`

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

**Folder structure:**

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

Sections are page-level building blocks with layout logic and data handling. They compose templates and organisms into meaningful page areas.

**Location:** `modules/nuc_sections/`

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

// ✓ Business logic allowed in sections
const props = defineProps<HeroSectionInterface>()

const emit = defineEmits<{ action: [] }>()

function handleAction() {
  // Can contain business logic
  emit('action')
}
</script>
```

**Folder structure:**

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

Pages are where **business logic lives**. They connect UI components with stores, APIs, and application state.

| Part | Location | Purpose |
|------|----------|---------|
| Route definition | `nuxt/pages/` | Nuxt routing (minimal wrapper) |
| Page content | `modules/nuc_pages/pages/` | Business logic + component composition |

**Route file** (`nuxt/pages/dashboard.vue`):

```html
<template>
  <nuc-dashboard-page />
</template>
```

**Page component** (`modules/nuc_pages/pages/Dashboard/index.vue`):

```html
<template>
  <dashboard-template>
    <template #sidebar>
      <navigation-menu :items="menuItems" />
    </template>

    <!-- ✓ Data passed to presentation component -->
    <ad-data-table
      :data="users"
      :columns="columns"
      @page-change="handlePageChange"
    />
  </dashboard-template>
</template>

<script setup lang="ts">
// ✓ Business logic lives here
const userStore = useUserStore()
const { users, fetchUsers } = userStore

// ✓ API calls in pages
onMounted(() => fetchUsers())

// ✓ Business logic handlers
function handlePageChange(page: number) {
  fetchUsers({ page })
}
</script>
```

**Folder structure:**

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

## Component Naming Conventions

All atomic components use the `ad-` prefix (Atomic Design):

| Level | Naming | Example |
|-------|--------|---------|
| Atom | `ad-{name}` | `<ad-button>`, `<ad-icon>` |
| Molecule | `ad-{name}` | `<ad-float-label>`, `<ad-tile>` |
| Organism | `ad-{name}` | `<ad-data-table>`, `<ad-dialog>` |
| Template | `nuc-{module}-{name}` | `<nuc-auth-template>` |
| Page | `nuc-{module}-page` | `<nuc-dashboard-page>` |

---

## Best Practices

### 1. Keep Components Pure

Components should be predictable - same props always produce same output:

```html
<!-- ✓ Good: Pure presentation -->
<ad-user-card :user="user" @follow="$emit('follow', user.id)" />

<!-- ✗ Bad: Side effects inside component -->
<ad-user-card :userId="userId" />  <!-- fetches user internally -->
```

### 2. Props Down, Events Up

Components receive data via props and communicate changes via events:

```html
<!-- Parent handles business logic -->
<ad-select
  v-model="selectedOption"
  :options="options"
  @change="saveToApi"
/>
```

### 3. Single Responsibility

Each component should do one thing well:

```html
<!-- ✓ Good: Focused component -->
<ad-avatar :src="user.avatar" :size="'lg'" />

<!-- ✗ Bad: Too many responsibilities -->
<user-card-with-avatar-and-actions-and-menu />
```

### 4. Use TypeScript Interfaces

Always define prop interfaces for type safety:

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

