# Nadpisywanie

Nadpisywanie pozwala zastąpić oryginalne pliki bez modyfikowania kodu źródłowego. Umożliwia to wdrożenia customowe u klienta bez edytowania plików core, przy zachowaniu czystej ścieżki aktualizacji.

Obsługiwane nadpisania:
- **Frontend** (Vue, TypeScript): `nuxt/`, `modules/*`
- **Backend** (Supabase SQL, API handlers): `modules/*/supabase/`

## Kluczowe zasady

- Pliki nadpisujące muszą mieć **dokładnie taką samą ścieżkę** jak oryginały
- Pliki nadpisujące **całkowicie zastępują** oryginały (bez łączenia)
- Skopiuj oryginalny folder, usuń pliki których nie nadpisujesz, **zostaw tylko te które zmieniasz**
- Nadpisuj tylko to, co **musisz zmienić**
- Testuj dokładnie - nadpisania mogą przestać działać po aktualizacjach

## Jak to działa

Umieść pliki w katalogu `overrides/` z taką samą strukturą jak oryginał:

```txt
overrides/
├── nuxt/                    # Nadpisania dla katalogu nuxt/
│   ├── composables/
│   ├── pages/
│   └── ...
└── modules/                 # Nadpisania dla katalogu modules/
    └── nuc_users/
        ├── atomic/
        └── supabase/
```

System automatycznie:
- **Frontend**: Przekierowuje importy, wyklucza oryginały z buildu, obsługuje wszystkie typy importów
- **Backend**: Ta sama mechanika dla handlerów `supabase/api/*.ts` importowanych przez bramkę API

## Typowe przypadki użycia

### Własna autentykacja

```txt
overrides/
└── modules/
    └── nuc_users/
        ├── atomic/
        │   └── pages/
        │       └── Login/
        │           └── index.vue      # Własny UI logowania
        └── supabase/
            └── api/
                └── handle.ts              # Własna logika API
```

### Własny handler API

```txt
overrides/
└── modules/
    └── nuc_entities/
        └── supabase/
            └── api/
                └── handle.ts           # Dodatkowa walidacja lub zapytania
```

### Własny dashboard

```txt
overrides/
└── nuxt/
    └── pages/
        └── dashboard.vue              # Własny layout dashboardu
```

## Nadpisywanie frontendu

### Komponenty Vue

Oryginał: `modules/nuc_users/auth/pages/login.vue`

Nadpisanie: `overrides/modules/nuc_users/auth/pages/login.vue`

```html
<template>
  <div class="custom-login">
    <!-- Twój własny UI logowania -->
  </div>
</template>

<script setup lang="ts">
// Twoja własna logika
</script>
```

### Pliki TypeScript

Oryginał: `nuxt/composables/useAuth.ts`

Nadpisanie: `overrides/nuxt/composables/useAuth.ts`

```typescript
export function useAuth() {
  // Twoja własna logika autentykacji
}
```

### Strony Nuxt

Oryginał: `nuxt/pages/dashboard.vue`

Nadpisanie: `overrides/nuxt/pages/dashboard.vue`

## Nadpisywanie backendu

### Handlery API

Oryginał: `modules/nuc_users/supabase/api/handle.ts`

Nadpisanie: `overrides/modules/nuc_users/supabase/api/handle.ts`

```typescript
import { apiNotHandled } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleAuthApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  // Twoja własna logika handlera
  return apiNotHandled()
}
```

### Migracje SQL

Dla zmian schematu specyficznych dla wdrożenia preferuj nowe pliki migracji we własnym module zamiast nadpisywania core SQL. Jeśli musisz nadpisać dane seed, odwzoruj ścieżkę w `overrides/modules/<module>/supabase/seeders/`.

## Szczegóły techniczne

### Frontend (Vite Plugin)

System nadpisywania używa pluginu Vite który:
1. Skanuje `overrides/nuxt/` i `overrides/modules/` przy starcie
2. Tworzy mapowanie oryginał → ścieżka nadpisania
3. Przechwytuje ładowanie plików i zwraca zawartość nadpisania
4. Obserwuje zmiany i hot-reloaduje

Handlery API po stronie serwera w `modules/*/supabase/api/` korzystają z tego samego rozwiązywania ścieżek przy imporcie w buildzie Nuxt/Next.
