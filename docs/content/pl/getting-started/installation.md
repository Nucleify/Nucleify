# Instalacja

## Gotowe w mniej niż 5 minut

Nucleify to frontend **Nuxt 3** lub **Next.js** z backendem **Supabase**. Jedna komenda `make` kopiuje konfigurację, instaluje zależności i uruchamia serwer deweloperski.

---

## Wymagania

| Wymaganie | Wersja | Komenda |
|-----------|--------|---------|
| **Node.js** | 20.x+ | `node --version` |
| **pnpm** | 9.x+ | `pnpm --version` |
| **Git** | Najnowszy | `git --version` |
| **Supabase CLI** | Najnowszy (baza) | `supabase --version` |

Potrzebny jest projekt Supabase ([supabase.com](https://supabase.com)) lub lokalna instancja (`supabase start`).

---

## Instalacja jedną komendą

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
make nuxt    # lub: make next
```

---

## Baza danych

Po uzupełnieniu `.env` kluczami Supabase:

```bash
bash .config/bash/apply-module-migrations.sh
bash .config/bash/apply-module-sql.sh seeders
```

---

## Adresy

| Usługa | URL |
|--------|-----|
| **Nuxt** | `http://localhost:3000` |
| **API** | `http://localhost:3000/api/test` |

---

## Dalej

1. **[Supabase](/pl/docs/configuration/supabase)** — Jak działa backend
2. **[Szybki start](/pl/docs/getting-started/quick-start)**
3. **[Moduły](/pl/docs/core-concepts/modules)**
