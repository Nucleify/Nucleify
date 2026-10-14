# Filozofia

> Zbuduj raz. Przenieś na dowolny framework — bez przepisywania produktu.

Przenośność na pierwszym miejscu. Wspólne moduły jako jądro. Siedem nowoczesnych shelli webowych.

---

## Problem

Zespoły wcześnie wiążą się ze stackiem — Vue albo React, Nuxt albo Next — a potem płacą podatek od przepisywania, gdy rynek, rekrutacja albo klient wymagają innego frameworka. Auth, i18n, theming i kształt API są kopiowane między projektami.

Nucleify traktuje **migrację między technologiami** jako cel pierwszorzędny. Pokrycie to siedem shelli: **Vue · React · Nuxt · Next · Astro · Svelte · Solid**.

---

## Wizja

Jedno jądro. Trzy powierzchnie produktu. Siedem shelli.

1. **Współdzielone moduły** — API, SQL, UI i logika domenowa w `shared_modules/`
2. **Trzy powierzchnie** — `web/`, `admin/` i `docs/` z tego samego jądra
3. **Migracja, gdy trzeba** — konwersja lub emit do innego frameworka bez przepisywania biznesu
4. **Jeden backend Supabase** — gateway, SQL w modułach

Codzienna edycja zostaje na Nuxt (`web/`). Zmiana shella to komenda, nie projekt przepisywania.

---

## Metafora jądra

Jak jądro komórki, Nucleify koordynuje produkt. Każdy eksportowany moduł `nuc_*` to samodzielna jednostka — utils frontendu, opcjonalne handlery API, migracje, testy.

- **Samodzielne moduły** — pionowe plastry, nie rozrzucone warstwy
- **Wyraźne granice** — aplikacje komponują; moduły nie importują aplikacji
- **Organiczny wzrost** — dodawaj lub usuwaj moduły bez przebudowy monorepo
- **Siła zbiorowa** — jeden model domenowy na web, admin, docs i każdy shell

---

## Podstawowe zasady

### 1. Dowolny stack → dowolny inny

Przenośne komponenty `*.nuc.tsx` emitują do Vue, React, Solid i Svelte. Shelle produktu (`web` / `admin`) konwertujesz jedną komendą — także zewnętrzny folder Nuxt-like lub URL git przez `--path` / `--git` (zob. [Kompilator](/pl/docs/core-concepts/compiler)):

```bash
make web TARGET=next
make web TARGET=solid
make web TARGET=svelte
make admin TARGET=next
make admin TARGET=solid
make admin TARGET=svelte
```

Wybór frameworka staje się **celem builda**, nie forkiem architektury.

### 2. Moduły zamiast monolitów

Logika domenowa żyje w `shared_modules/nuc_*`, nie jest kopiowana między aplikacjami. Zobacz [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design).

### 3. Gateway, nie spaghetti

Uprzywilejowany dostęp serwerowy idzie przez `web/src/server/api/[...slug].ts`. Klient nie trzyma service key. Moduły rejestrują handlery; gateway je dispatchuje.

### 4. Konwencja zamiast konfiguracji

Podzielona konfiguracja Nuxt, spójny layout modułów, skróty Makefile, checki Husky — przewidywalne ścieżki zmniejszają zmęczenie decyzjami.

### 5. Overrides do forków, moduły do współdzielenia

Różnice white-label idą do `overrides/`. Zachowanie między produktami należy do `shared_modules/`.

### 6. Uczciwość kompilatora

Przenośne autorstwo ma jawne listy dozwolone/zabronione (`compiler/PORTABLE.md`). IR mostkuje frameworki — nie udajemy, że Vue i React są identyczne.

---

## Kanoniczny Nuxt vs wygenerowane shelle

| Codziennie (Nuxt) | Migracja / emit (convert) |
|---------------------|--------------------------|
| Edycja Nuxt + Vue w `web/` | Next (`web-next/`), Solid (`web-solid/`), Svelte (`web-svelte/`), demo portable |
| Źródło prawdy | Wygenerowane lustra, gdy klient lub zespół potrzebuje innego shella |

Wygenerowane shelle to nie druga baza kodu utrzymywana ręcznie. Napraw jądro, uruchom convert ponownie. Komunikacja produktu zawsze wymienia **wszystkie siedem shelli**, nawet gdy codzienna edycja zostaje na Nuxt.

---

## Design system

Prymitywy UI to **niezależne od frameworka komponenty Lit** (`nui-*` z `nucleify-ui`). Tokeny w `portable/nui/`. Każdy shell owija te same custom elements.

---

## Jakość

Monorepo egzekwuje jakość na pre-commit (pre-push jest no-op):

- Suite bash, Biome, TypeScript (web), Stylelint
- Produkcyjny build Nuxt
- Vitest (web + shared) oraz testy / check kompilatora

---

## Czym Nucleify nie jest

- Nie meta-framework ukrywający hosty — siedem shelli pozostaje widocznych
- Nie low-code — piszesz prawdziwy TypeScript
- Nie hosted SaaS — Ty trzymasz Supabase i deployment
- Nie „tajemnicze moduły” — dziś produkt napędza sześć eksportowanych pakietów `nuc_*`

---

## Powiązane

- [Wprowadzenie](/pl/docs/getting-started/introduction) — przegląd techniczny
- [Moduły](/pl/docs/core-concepts/modules) — architektura modułów
- [Kompilator](/pl/docs/core-concepts/compiler) — emit i convert
- [Standardy kodu](/pl/docs/about/coding-standards) — konwencje dnia codziennego
