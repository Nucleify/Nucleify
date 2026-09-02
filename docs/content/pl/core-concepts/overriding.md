# Nadpisywanie

Nadpisania pozwalają zastąpić dowolny plik w `web/`, `admin/`, `docs/` lub `shared_modules/` bez edycji oryginału. Przy buildzie Nuxt rozwiązuje ścieżkę override zamiast źródła.

Nadpisania są **tylko dla Nuxt**. Nie dotyczą cyklu import kompilatora, produkcyjnych buildów Astro poza Nuxt ani generowanego outputu Next — chyba że skonfigurujesz to osobno.

---

## Jak to działa

1. Odzwierciedl oryginalną ścieżkę pliku pod `overrides/{package}/`
2. Nuxt dev/build skanuje `overrides/` przy starcie
3. Gdy jest dopasowanie, override **całkowicie zastępuje** oryginał — bez merge, bez częściowego patcha

```txt
Oryginał:  web/src/composables/useAuth.ts
Override:  overrides/web/src/composables/useAuth.ts
```

---

## Układ katalogów

```txt
overrides/
├── web/
│   └── src/…               # odzwierciedla web/src/…
├── admin/
│   └── src/…
├── docs/
│   └── src/…
└── shared_modules/
    └── nuc_colors/…
```

Każdy podkatalog ma `README.md` z przykładami dla pakietu.

---

## Przykłady

### Nadpisanie sekcji landing

```txt
Oryginał:  web/src/pages/home/index.vue
Override:  overrides/web/src/pages/home/index.vue
```

Gdy forkujesz branding lub layout dla white-label, zachowując drzewo upstream `web/`.

### Nadpisanie composable

```txt
Oryginał:  web/src/composables/useAuth.ts
Override:  overrides/web/src/composables/useAuth.ts
```

Gdy flow auth różni się per wdrożenie, reszta app zostaje ta sama.

### Nadpisanie handlera API modułu

```txt
Oryginał:  shared_modules/nuc_colors/supabase/api/handle.ts
Override:  overrides/shared_modules/nuc_colors/supabase/api/handle.ts
```

Gdy backend musi się różnić bez forkowania całego modułu `nuc_colors`.

### Nadpisanie layoutu docs

```txt
Oryginał:  docs/src/layouts/DocsLayout.astro
Override:  overrides/docs/src/layouts/DocsLayout.astro
```

Uwaga: rozwiązywanie override w Astro zależy od setupu build docs — zweryfikuj w dev po dodaniu pliku.

---

## Debugowanie nadpisań

Gdy zachowanie różni się od tego, co widzisz w źródle:

1. Sprawdź `overrides/{package}/` pod kątem ścieżki pasującej do czytanego pliku
2. Tymczasowo przenieś lub usuń override, żeby potwierdzić, że to aktywna wersja
3. Pamiętaj: override zasłania **całe pliki** — jedna linia zmiany nadal wymaga skopiowania pełnego pliku

---

## Czym nadpisania nie są

| Potrzeba | Override? | Alternatywa |
|----------|-----------|-------------|
| Emit komponentu portable | Nie | Edytuj `*.nuc.tsx`, uruchom `pnpm compiler:build` |
| Import emit z powrotem do authoring | Nie | `pnpm compiler -- import --from=vue\|react` |
| Generowana powłoka Next.js | Nie* | Edytuj `web/`, konwertuj przez `make web TARGET=next` |
| Konfiguracja per środowisko | Nie | Root `.env`, `web/.config/nuxt/runtime.ts` |
| Schemat bazy | Nie | Migracje modułów w `shared_modules/nuc_*/supabase/` |

\*Chyba że dodasz osobne narzędzie override dla Next — poza domyślnym skanerem Nuxt.

---

## Dobre praktyki

1. **Mało nadpisań** — wiele override utrudnia upgrade
2. **Dokumentuj dlaczego** — komentarz na górze pliku override z powodem forka
3. **Preferuj moduły** — jeśli wiele app potrzebuje zmiany, rozszerz `shared_modules/`
4. **Sync upstream** — przy merge upstream Nucleify diffuj override z oryginałami
5. **Bez sekretów** — override to pliki źródłowe; klucze w `.env`

---

## Powiązane docs

- [Układ monorepo](/pl/docs/core-concepts/monorepo) — `overrides/` w kontekście
- [Moduły](/pl/docs/core-concepts/modules) — kiedy rozszerzyć moduł vs nadpisać
- [Kompilator](/pl/docs/core-concepts/compiler) — override poza cyklem import
