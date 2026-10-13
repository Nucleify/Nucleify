# Szybki start

Uruchom Nucleify, poznaj repozytorium i wprowadź pierwszą zmianę w mniej niż dziesięć minut.

---

## 1. Bootstrap

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
make run
```

Uzupełnij wartości `SUPABASE_*` w root `.env`, jeśli planujesz wywoływać trasy API modułów.

---

## 2. Uruchom aplikację landingową

```bash
make web
```

Otwórz [http://localhost:3000/en/home](http://localhost:3000/en/home).

Źródło landingu jest w `web/src/pages/home/` — sekcje złożone przez `web/src/pages/home/index.vue`. Trasy to cienkie wrappery pod `web/src/pages/[lang]/`:

```vue
<!-- web/src/pages/[lang]/home.vue -->
<script setup lang="ts">
import NucHomePage from '../home/index.vue'
</script>
<template><NucHomePage /></template>
```

---

## 3. Zrozum przepływ żądania

```txt
Przeglądarka  →  strona Nuxt (web/src/pages/)
              →  shared_modules/nuc_*/utils/   (composables, klient API)
              →  /api/*                         (bramka Nitro)
              →  nuc_*/supabase/api/handle.ts   (handlery modułów)
              →  Supabase (PostgreSQL, Auth, Edge Functions)
```

Smoke-test bramki:

```bash
curl http://localhost:3000/api
curl http://localhost:3000/api/test
```

---

## 4. Zaimportuj moduł współdzielony

Moduły rozwiązują się przez alias `modules` (`web/.config/nuxt/structure.ts` → `shared_modules/`):

```typescript
import { useDarkMode } from 'modules/nuc_dark_mode/utils/use_dark_mode'
import { apiRequest } from 'modules/nuc_api/utils/api_request'
```

Cztery moduły rejestrują się automatycznie przy starcie aplikacji w `web/src/plugins/modules.ts`:

- `nuc_globals`
- `nuc_colors`
- `nuc_dark_mode`
- `nuc_languages`

`nuc_api` i `nuc_stores` importujesz tam, gdzie są potrzebne — bez globalnej rejestracji pluginu.

---

## 5. Wypróbuj kompilator

Zbuduj emisję przenośną z dowolnych `*.nuc.tsx` pod korzeniami odkrywania (`web/`, `admin/`, `shared_modules/`, `portable/`):

```bash
pnpm compiler:build
pnpm compiler:check   # exit 1, jeśli emit jest brudny względem autorstwa
```

Skonwertuj cały produkt web na Next (Tryb B):

```bash
make web TARGET=next
```

To uruchamia `pnpm compiler -- convert web --target=next`, buduje, instaluje i startuje `web-next/`.

---

## 6. Uruchom inne aplikacje

```bash
make admin    # admin Nuxt w admin/src/pages/
make docs     # docs Astro na http://localhost:4321 (domyślny port Astro)
```

Treść docs to Markdown w `docs/content/{en,pl}/{category}/{slug}.md`.

---

## 7. Uruchom sprawdzenia

Przed commitem hook Husky pre-commit uruchamia ten sam zestaw co CI (pre-push jest no-op):

```bash
pnpm btest          # suite bash
pnpm check          # Biome
pnpm typeslint      # TypeScript (web)
pnpm slint          # Stylelint (SCSS)
pnpm build          # produkcyjny build Nuxt
pnpm tests          # Vitest (web + shared)
pnpm compiler:test  # testy jednostkowe kompilatora
pnpm compiler:check # odciski emit
```

---

## Typowe zadania

### Dodaj trasę API do istniejącego modułu

1. Dodaj handlery w `shared_modules/nuc_example/supabase/api/example_handlers.ts`
2. Wyeksportuj `handleExampleApi` z `handle.ts`
3. Zarejestruj handler w `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`
4. Wywołuj `/api/example/...` z klienta przez helpery requestów `nuc_api`

### Nadpisz plik bez edycji upstream

Odwzoruj ścieżkę pod `overrides/`:

```txt
web/src/composables/useAuth.ts
  → overrides/web/src/composables/useAuth.ts
```

Zobacz [Nadpisywanie](/pl/docs/core-concepts/overriding).

### Autorsuj komponent przenośny

Utwórz `Foo.nuc.tsx` obok miejsca użycia. Uruchom `pnpm compiler:build`. Commituj `.nuc.tsx` i wygenerowane siblingi. Nie edytuj ręcznie `.vue`/`.tsx` jako źródła prawdy — użyj `pnpm compiler -- import`, jeśli edytowałeś emit.

---

## Co dalej

| Temat | Doc |
|-------|-----|
| Mapa katalogów | [Układ monorepo](/pl/docs/core-concepts/monorepo) |
| Anatomia modułu | [Moduły](/pl/docs/core-concepts/modules) |
| Cykle kompilatora | [Kompilator](/pl/docs/core-concepts/compiler) |
| Konfiguracja Nuxt | [Web & Admin](/pl/docs/configuration/web) |
| Workflow Supabase | [Supabase](/pl/docs/configuration/supabase) |
| Testy | [Vitest](/pl/docs/tests/vitest) |
