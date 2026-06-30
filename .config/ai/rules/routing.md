# Routing

## i18n

All user-facing routes live under `[lang]/` (`en`, `pl`, `vn`).

**Nuxt:** `nuxt/pages/[lang]/` — root `index.vue` redirects to `/${locale}/home`.

**Next:** `next/app/[lang]/` — App Router with `[lang]` segment.

New pages must be created under `[lang]/`, not at the app root.

## Page Convention

Pages are thin wrappers rendering module components:

```vue
<!-- nuxt/pages/[lang]/calendar.vue -->
<template>
  <nuc-calendar-page />
</template>
```

```tsx
// next/app/[lang]/calendar/page.tsx
import { NucCalendarPage } from 'nucleify'

export default function CalendarPage() {
  return <NucCalendarPage />
}
```

Nested routes: `[lang]/entities/articles.vue`, `[lang]/docs/[category]/[slug].vue`, catch-all `[lang]/[...slug].vue`.

## API Routes

- **Nuxt:** `nuxt/server/api/[...slug].ts` — single gateway for all module APIs
- **Next:** equivalent route handler wiring to `gateway_dispatch.ts`

Client calls `apiUrl() + '/module/…'` — not module-specific Nitro files.

## Layouts (Nuxt)

Selected in `app.vue` via `useOfficeType()`:

- **`front-office`** — public pages; navbar + footer
- **`back-office`** — authenticated; dock or sidebar (`useToolbarStyle`)
- **`default`** — fallback

`back-office` adds `toolbar-sidebar` class when sidebar mode is active.

## Next Layout

`next/app/[lang]/layout.client.tsx` mirrors back-office chrome (sidebar vs dock).
