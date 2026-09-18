# Instalacja

Uruchom monorepo Nucleify na swoim komputerze.

---

## Wymagania

| Narzędzie | Wersja | Uwagi |
|-----------|--------|-------|
| **Node.js** | ≥ 20 | Wymagane przez root `package.json` |
| **pnpm** | 10.x | Menedżer workspace (`packageManager: pnpm@10.33.0`) |
| **Git** | dowolna nowsza | Klonowanie repozytorium |
| **Make** | dowolny | Skróty workspace z root `Makefile` |
| **Supabase CLI** | opcjonalnie | Tylko przy lokalnym stacku Supabase |

---

## Klonowanie repozytorium

```bash
git clone https://github.com/nucleify/nucleify.git
cd nucleify
```

---

## Pierwsza konfiguracja

Z katalogu głównego repozytorium uruchom:

```bash
make run
```

Ta komenda:

1. **Tworzy `.env`** — kopiuje `web/.config/.env.example` do root repozytorium, jeśli `.env` nie istnieje
2. **Instaluje zależności** — `pnpm install` we wszystkich pakietach workspace
3. **Przygotowuje Husky** — hooki git do lintu i testów
4. **Przygotowuje web** — `pnpm --filter @nucleify/web prepare`
5. **Synchronizuje reguły Cursor** — `pnpm sync-rules`
6. **Buduje kompilator** — `pnpm compiler:check` + `pnpm compiler:build` (pomiń przez `SKIP_COMPILER=1 make run`)

Jeśli masz już plik `.env`, użyj `make setup` — te same kroki bez nadpisywania konfiguracji środowiska.

---

## Zmienne środowiskowe

Po `make run` edytuj root `.env` i uzupełnij minimum:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Bramka API w `web/src/server/api/[...slug].ts` wymaga `SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` dla tras modułów. Bez nich endpointy smoke (`/api`, `/api/test`) nadal działają, ale handlery domenowe zwracają 503.

Zobacz [Zmienne środowiskowe](/pl/docs/configuration/environment) po pełną referencję.

---

## Weryfikacja instalacji

Uruchom aplikację landingową:

```bash
make web
```

Otwórz [http://localhost:3000](http://localhost:3000). Domyślne przekierowanie locale kieruje na `/en/home`.

Inne pakiety:

```bash
make admin    # panel admin (Nuxt)
make docs     # strona dokumentacji (Astro)
make compiler # tylko check + build kompilatora
```

---

## Pakiety workspace

Monorepo używa workspace pnpm. Filtruj komendy, gdy potrzebujesz konkretnego pakietu:

```bash
pnpm --filter @nucleify/web dev
pnpm --filter @nucleify/admin dev
pnpm --filter @nucleify/docs dev
```

Skróty root odpowiadają Makefile:

| Skrypt | Pakiet |
|--------|--------|
| `pnpm dev` | `@nucleify/web` |
| `pnpm admin` | `@nucleify/admin` |
| `pnpm docs` | `@nucleify/docs` |
| `pnpm compiler` | CLI `@nucleify/compiler` |

---

## Opcjonalnie: lokalny Supabase

Przy rozwoju na lokalnej instancji Supabase:

```bash
# Zastosuj scalone migracje modułów, fabryki i seedery
pnpm supabase:setup:local
```

SQL ze wszystkich modułów jest scalany przez `.config/bash/merge-module-supabase-sql.sh`. Szczegóły: [Supabase](/pl/docs/configuration/supabase).

---

## Rozwiązywanie problemów

### Kompilator nie przechodzi przy setupie

Pomiń codegen kompilatora podczas bootstrapu:

```bash
SKIP_COMPILER=1 make run
make compiler   # uruchom ręcznie, gdy deps są stabilne
```

### Port już zajęty

Nuxt domyślnie używa portu 3000. Ustaw inny port w shellu lub zatrzymaj konfliktujący proces.

### Błędy brakującego Supabase w trasach API

Upewnij się, że `.env` jest w **root repozytorium** (nie w `web/`). Nuxt ładuje go przez `web/.config/nuxt/load-env.ts`, który czyta root `.env` monorepo.

### Niezgodność wersji pnpm

Zainstaluj wersję przypiętą w `package.json`:

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
```

---

## Następne kroki

- [Szybki start](/pl/docs/getting-started/quick-start) — przegląd repozytorium i typowe workflow
- [Konfiguracja Web & Admin](/pl/docs/configuration/web) — rozdzielona konfiguracja Nuxt i aliasy
- [Układ monorepo](/pl/docs/core-concepts/monorepo) — referencja katalogów
