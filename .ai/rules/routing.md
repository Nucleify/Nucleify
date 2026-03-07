# Routing

## i18n Routing

All pages live under `nuxt/pages/[lang]/`. Root `index.vue` redirects to `/${locale}/home`:

```typescript
const locale = useCookie('nuc_locale')
navigateTo(`/${locale.value || 'en'}/home`, { redirectCode: 302 })
```

New pages must be created in `nuxt/pages/[lang]/`, not `nuxt/pages/`.

## Page Convention

Pages are thin wrappers rendering module components:

```vue
<template>
  <div id="admin">
    <nuc-admin-page />
  </div>
</template>
```

Nested routes: `[lang]/entities/articles.vue`, `[lang]/docs/[category]/[slug].vue`, `[lang]/[...slug].vue` (catch-all).

## Layouts

Selected dynamically in `app.vue` via `useOfficeType()` (from `nuc_pages`):

- **`front-office`** — public pages (home, offer, docs, login, register). Has `nuc-section-navbar` + `nuc-section-footer`.
- **`back-office`** — authenticated pages (admin, entities, settings, files). Has `nuc-dock`. Page transition: `{ name: 'page', mode: 'out-in' }`.
- **`default`** — fallback.

`useOfficeType()` checks current URL against `officeRoutes.front` / `officeRoutes.back` to pick layout.

## app.vue

- `NuxtLayout :name="officeType"` wraps `NuxtPage`
- Dark mode via `useDarkMode()` → `p-dark` class on `<html>`
- Color sync: `resetColorsIfEmpty()` on mount, `syncColorsWithDatabase()` on route change (debounced 300ms)
- Analytics (GTM, Google Ads, Clarity) loaded after 3.5s delay
