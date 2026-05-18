# Nadpisywanie

Nadpisywanie pozwala zastąpić oryginalne pliki bez modyfikowania kodu źródłowego. Umożliwia to wdrożenia customowe u klienta bez edytowania plików core, przy zachowaniu czystej ścieżki aktualizacji.

Obsługiwane nadpisania:
- **Frontend** (Vue, TypeScript): `nuxt/`, `modules/*`
- **Backend** (Laravel, PHP): `modules/*`, `app/*`, `config/*`, `database/*`, `routes/*`

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
    └── nuc_auth/
        ├── atomic/
        └── app/
```

System automatycznie:
- **Frontend**: Przekierowuje importy, wyklucza oryginały z buildu, obsługuje wszystkie typy importów
- **Backend**: Ładuje nadpisane pliki PHP zamiast oryginalnych podczas bootstrapu

## Typowe przypadki użycia

### Własna autentykacja

```txt
overrides/
└── modules/
    └── nuc_auth/
        ├── atomic/
        │   └── pages/
        │       └── Login/
        │           └── index.vue      # Własny UI logowania
        └── app/
            └── Http/
                └── Controllers/
                    └── Auth/
                        └── LoginController.php     # Własna logika auth
```

### Rozszerzony model User

```txt
overrides/
└── modules/
    └── nuc_entities/
        └── app/
            └── Models/
                └── User.php           # Dodatkowe pola/relacje
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

Oryginał: `modules/nuc_auth/atomic/pages/Login/index.vue`

Nadpisanie: `overrides/modules/nuc_auth/atomic/pages/Login/index.vue`

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

### Modele

Oryginał: `modules/nuc_entities/app/Models/User.php`

Nadpisanie: `overrides/modules/nuc_entities/app/Models/User.php`

```php
<?php

namespace Modules\nuc_entities\app\Models;

class User extends \Illuminate\Foundation\Auth\User
{
    // Twoja własna logika modelu
    protected $fillable = ['name', 'email', 'custom_field'];
}
```

### Serwisy

Oryginał: `modules/nuc_auth/app/Services/AuthService.php`

Nadpisanie: `overrides/modules/nuc_auth/app/Services/AuthService.php`

### Kontrolery

Oryginał: `modules/nuc_entities/app/Http/Controllers/UserController.php`

Nadpisanie: `overrides/modules/nuc_entities/app/Http/Controllers/UserController.php`

### Konfiguracje

Oryginał: `modules/nuc_auth/config/auth.php`

Nadpisanie: `overrides/modules/nuc_auth/config/auth.php`

## Szczegóły techniczne

### Frontend (Vite Plugin)

System nadpisywania używa pluginu Vite który:
1. Skanuje `overrides/nuxt/` i `overrides/modules/` przy starcie
2. Tworzy mapowanie oryginał → ścieżka nadpisania
3. Przechwytuje ładowanie plików i zwraca zawartość nadpisania
4. Obserwuje zmiany i hot-reloaduje

### Backend (PHP Service)

Klasa `OverrideService`:
1. Buduje mapę oryginał → ścieżka nadpisania
2. Udostępnia `getOverridePath()` do rozwiązywania
3. Funkcje pomocnicze używają tego serwisu automatycznie
