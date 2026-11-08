# Filozofia

> Zbuduj raz. Przenieś na dowolny framework - bez przepisywania produktu.

**Migracja jest produktem.** Współdzielone moduły to jądro. Kompilator oparty na IR to sposób zmiany frameworka. Siedem nowoczesnych runtime’ów webowych.

---

## Problem

Zespoły wcześnie zamykają się na stack - Vue albo React, Nuxt albo Next - i potem płacą podatek przepisania, gdy rynek, rekrutacja albo klient wymagają innego frameworka. Auth, i18n, theming i kształt API kopiują się między projektami. Toolchainy „tylko komponenty” zostawiają aplikację, trasy i domenę w tyle.

Nucleify traktuje **migrację między technologiami** jako trwałą warstwę monorepo - nie boczny eksperyment. Pokrycie to siedem frameworków: **Vue · React · Nuxt · Next · Astro · Svelte · Solid**.

---

## Wizja

Jedno jądro. Trzy powierzchnie produktu. Siedem frameworków. Jeden pipeline migracji.

1. **Współdzielone moduły** - API, SQL, UI i logika domenowa w `shared_modules/`
2. **Trzy powierzchnie** - `web/`, `admin/` i `docs/` z tego samego jądra
3. **Migracja jako komenda** - konwersja produktu dla całych istniejących aplikacji (bez przepisywania na `*.nuc.tsx`), opcjonalny emit przenośny dla współdzielonego UI, import z powrotem z brudnego emitu
4. **Jeden backend Supabase** - przez bramkę, SQL w rękach modułów

Codzienna edycja zostaje na Nuxt (`web/`). Zmiana frameworka to przebieg kompilatora na Twoim istniejącym źródle - nie przepisywanie na format autorstwa Nucleify.

---

## Metafora jądra

Jak jądro komórki, Nucleify koordynuje produkt. Każdy eksportowany moduł `nuc_*` to samodzielna jednostka - utils frontendu, opcjonalne handlery API, migracje, testy - którą da się zrozumieć i przetestować osobno.

- **Samodzielne moduły** - pionowe plasterki, nie rozproszone warstwy
- **Jasne granice** - aplikacje komponują; moduły nie importują aplikacji
- **Organiczny wzrost** - dodawaj lub usuwaj moduły bez przebudowy monorepo
- **Siła zbiorowa** - jeden model domenowy na web, admin, docs i każdy host frameworka

---

## Zasady rdzeniowe

### 1. Dowolny stack → dowolny inny

To jest pętla rdzeniowa. **Konwersja produktu** przenosi istniejącą aplikację - także zewnętrzny folder lub URL git przez `--path` / `--git` - na inny framework **bez** przepisywania na `*.nuc.tsx` (zob. [Kompilator](/pl/docs/core-concepts/compiler)). Opcjonalne przenośne komponenty `*.nuc.tsx` emitują przez własny IR, gdy chcesz współdzielone UI prezentacyjne. Zmiany z emitu wracają do źródła. Biznes nie forkuje się per host.

```bash
export PATH="$PWD/.config/bin:$PATH"   # włącza --target= / -t=
make web --target=next
make web -t=solid
make web --target=svelte
make web --target=astro
make admin --target=next
make admin -t=solid
make admin --target=svelte
# klasycznie (bez shima): make web TARGET=next
```

Forma opublikowanego CLI (ta sama konwersja):

```bash
nuc emit convert web --target=next
nuc emit convert admin --target=next
```

Wybór frameworka staje się **celem builda**, nie forkiem architektury.

### 2. Moduły zamiast monolitu

Logika domenowa żyje w `shared_modules/nuc_*`, nie jest kopiowana między aplikacjami. Zob. [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design).

### 3. Bramka, nie spaghetti

Uprzywilejowany dostęp serwera idzie przez `web/src/server/api/[...slug].ts`. Klienci nie trzymają service key. Moduły rejestrują handlery; bramka dysponuje.

### 4. Konwencja ponad konfigurację

Rozdzielona konfiguracja Nuxt, spójny układ modułów, skróty Makefile (`make help`), sprawdzenia egzekwowane przez Husky - przewidywalne ścieżki obniżają koszt decyzji.

### 5. Overrides do forków, moduły do współdzielenia

Różnice white-label idą do `overrides/`. Zachowanie cross-product należy do `shared_modules/`.

### 6. Uczciwość kompilatora

Konwersja produktu to ścieżka migracji istniejących aplikacji. Autorstwo przenośne jest opcjonalne i ma jawne listy dozwolone/zabronione (`compiler/PORTABLE.md`). IR mostkuje frameworki - nie udajemy, że Vue i React są identyczne. Round-trip import i konwersja produktu są pierwszorzędne; jednokierunkowy dump komponentów nie jest celem.

---

## Kanoniczny Nuxt vs wygenerowane hosty

| Codziennie (Nuxt) | Migracja / emit (convert) |
|-------------------|---------------------------|
| Edytuj Nuxt + Vue w `web/` | Hosty Next, Solid, Svelte, Astro + demo przenośne |
| Źródło prawdy | Wygenerowane lustra, gdy klient lub zespół potrzebuje innego frameworka |

Wygenerowane hosty to nie druga baza kodu utrzymywana ręcznie. Napraw jądro, uruchom convert ponownie. Komunikacja produktu zawsze wymienia **wszystkie siedem frameworków**, nawet gdy codzienna edycja zostaje na Nuxt.

---

## Stanowisko systemu designu

Prymitywy UI to **niezależne od frameworka komponenty Lit** (`nui-*` z `nucleify-ui`). Tokeny w `portable/nui/`. Każdy host owija te same custom elements - bez duplikatów przycisków per framework.

---

## Poprzeczka jakości

Monorepo egzekwuje jakość na pre-commit (pre-push jest no-op):

- Suite bash, Biome, TypeScript (web), Stylelint
- Produkcyjny build Nuxt
- Vitest (web + shared) oraz testy kompilatora / check emit

---

## Czym Nucleify nie jest

- Nie meta-framework ukrywający hosty - siedem frameworków pozostaje widocznych
- Nie warstwa emisji „tylko komponenty” - konwersja produktu przenosi całe aplikacje ze współdzielonymi modułami
- Nie low-code builder - piszesz prawdziwy TypeScript
- Nie hostowany SaaS - Ty masz Supabase i deployment
- Nie „tajemnicze moduły” - dziś produkt napędza sześć eksportowanych pakietów `nuc_*`

---

## Powiązane dokumenty

- [Wprowadzenie](/pl/docs/getting-started/introduction) - przegląd techniczny
- [CLI](/pl/docs/core-concepts/cli) - referencja `nuc emit`
- [Moduły](/pl/docs/core-concepts/modules) - architektura modułów
- [Kompilator](/pl/docs/core-concepts/compiler) - emit i convert
- [Standardy kodowania](/pl/docs/about/coding-standards) - konwencje dnia codziennego
