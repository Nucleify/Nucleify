# Quick Start

Get up and running with Nucleify in minutes.

## Understanding Atomic Design

Nucleify uses Atomic Design methodology to organize components:

| Level | Description | Examples |
|-------|-------------|----------|
| **Bosons** | Reusable logic, types, utilities | Constants, interfaces, helper functions |
| **Atoms** | Smallest UI building blocks | Button, Input, Icon, Label |
| **Molecules** | Simple combinations of atoms | FloatLabel, Anchor, Tile |
| **Organisms** | Complex UI structures | DataTable, Dialog, Menu, Card |

## Creating Your First Component

### 1. Create the Component Folder

Navigate to the appropriate atomic level in `nuxt/atomic/`:

```txt
nuxt/atomic/atom/my-component/
├── index.ts            # Exports
├── index.vue           # Component
└── types/
    ├── index.ts        # Type exports
    └── interfaces.ts   # Component interfaces
```

### 2. Define the Interface

Create your component's type definitions in `types/interfaces.ts`:

```typescript
export interface MyComponentInterface {
  label?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}
```

Export types in `types/index.ts`:

```typescript
export * from './interfaces'
```

### 3. Build the Component

Create your Vue component in `index.vue`:

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
  // Your styles
}
</style>
```

### 4. Export the Component

Create `index.ts` to export everything:

```typescript
export { default as AdMyComponent } from './index.vue'
export * from './types'
```

### 5. Register in Parent Index

Add export to the parent `index.ts` (e.g., `nuxt/atomic/atom/index.ts`):

```typescript
export * from './my-component'
```

## Auto-Import & Registration

Components in `nuxt/atomic/` are **automatically registered** by Nuxt with the `ad-` prefix. No manual imports needed in templates!

```html
<template>
  <!-- These work automatically - no imports required -->
  <ad-button label="Click me" />
  <ad-my-component label="Hello" />
</template>

<script setup lang="ts">
// No imports needed for template usage!
</script>
```

**How it works:**
- Components from `atom/`, `molecule/`, `organism/` folders are scanned automatically
- Each component gets the `ad-` prefix (e.g., `button/index.vue` → `<ad-button>`)
- Types and utilities from `nucleify` alias are also auto-imported

### Explicit Imports

When you need to use components or types in script (not template), import from `nucleify`:

```html
<script setup lang="ts">
import { AdButton, type ButtonInterface } from 'nucleify'

// Use in script logic
const buttonRef = ref<InstanceType<typeof AdButton>>()
</script>
```

### What Gets Auto-Imported

| Source | Auto-Import |
|--------|-------------|
| `~/atomic/atom/*` | Components with `ad-` prefix |
| `~/atomic/molecule/*` | Components with `ad-` prefix |
| `~/atomic/organism/*` | Components with `ad-` prefix |
| `~/composables/**` | Composables |

## Styling Components

For Atomic Design components we recommend using **CSS Modules** - they provide automatic scoping, prevent naming collisions, and work great with TypeScript.

### Option 1: CSS Modules (Recommended)

Use `module` attribute on the style tag. Access classes via `$style` object:

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

**Benefits:**
- Automatic unique class names (no collisions)
- TypeScript support via `$style`
- Better encapsulation for reusable components

### Option 2: Normal SCSS

Global styles without scoping. Classes are used directly in template:

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

**When to use:**
- Global styles and overrides
- Styles that need to affect child components
- Pages and layouts

### External SCSS Files

For complex components, extract styles to `_index.scss`:

```txt
my-component/
├── _index.scss   # Styles
├── index.ts
└── index.vue
```

Import in your component:

```html
<style lang="scss">
@import 'index';
</style>
```

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Folder names | kebab-case | `my-component/` |
| Component exports | PascalCase with `Ad` prefix | `AdMyComponent` |
| Interfaces | PascalCase with `Interface` suffix | `MyComponentInterface` |
| CSS classes | kebab-case | `.my-component` |
| SCSS files | underscore prefix | `_index.scss` |

## Next Steps

- Learn about [Modules](/en/docs/core-concepts/modules) for organizing features
- Explore [Atomic Design](/en/docs/core-concepts/atomic-design) methodology
- Read [Code Standards](/en/docs/contributing/code-standards) for best practices
