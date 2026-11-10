# CLI

CLI Nucleify (`nuc`) migruje i emituje UI frameworków. **Tak - migrujesz dowolną istniejącą aplikację Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest.** Najpierw konwersja produktu: `nuc emit convert` wskazuje na istniejącą aplikację (produkt w monorepo albo `--path` / `--git`) i ląduje na innym hoście - **bez przepisywania na `*.nuc.tsx`, bez wcześniejszego refaktoru do `shared_modules`, bez tokenów Nucleify**. Opcjonalny emit przenośny (`nuc emit build`) jest tylko dla współdzielonego UI prezentacyjnego, które świadomie tak autoryzujesz.

Pokrycie: **Vue · React · Nuxt · Next · Astro · Svelte · Solid** - bez wiązania produktu z jednym runtime.

- Pakiet produktowy: [`@nucleify/cli`](https://cli.nucleify.io) · [cli.nucleify.io](https://cli.nucleify.io)
- Binarka: **`nuc`** - wszystkie komendy to `nuc emit …`

Poniższa referencja opisuje **aktualną** powierzchnię komend (`emit`). Logika mapowania IR na idiomatyczne hooki React, composable Vue, runy Svelte itd. działa jako usługa kompilacji - tę samą ścieżkę wykorzystuje [play.nucleify.io](https://play.nucleify.io) dla opcjonalnego sandboxu przenośnego.

---

## Instalacja

```bash
npm install -g @nucleify/cli
```

```bash
pnpm add -g @nucleify/cli
```

```bash
npx @nucleify/cli@latest
```

Po instalacji:

```bash
nuc emit --help
nuc emit <komenda> [opcje] [argumenty]
nuc emit convert web --target=next
nuc emit build --target=vue
nuc emit ./Button.vue --target=next
```

`npx @nucleify/cli@latest …` wystarczy do jednorazowego uruchomienia bez instalacji globalnej. W monorepo Nucleify używaj tej samej formy `nuc emit …` z roota (po zainstalowanym CLI).

---

## Co robi CLI

| Zdolność | Rola |
|----------|------|
| **Emit (`build`)** | `*.nuc.tsx` → IR → natywne pliki frameworka, które możesz commitować |
| **Skan projektu** | Przechodzi drzewo, zbiera przenośne moduły, przygotowuje emisję |
| **Konwersja produktu (`convert`)** | Istniejąca aplikacja takim, jaka jest → inny host (**bez** przepisywania na `*.nuc.tsx` / `shared_modules` / tokeny) |
| **Import** | Wciąga edycje z brudnego emitu z powrotem do `*.nuc.tsx` |
| **Check** | Weryfikuje fingerprinty emisji (brudny emit = exit ≠ 0) |
| **Scaffold** | Odtwarza tymczasowe demo `{framework}/demo` z template’ów |

CLI to **lokalna** połowa pipeline’u. Szczegóły IR, reguł przenośnych i cyklu autorstwa: [Kompilator](/pl/docs/core-concepts/compiler).

---

## Struktura komend

```txt
emit
├── version
├── scaffold <app> [--cwd]
├── convert <product> --target=<…> [--force] [--path] [--git] [--out] [--cwd]
├── build [--target] [--app] [--force] [--dump-ir] [--cwd]
├── check [--cwd]
├── watch
└── import [path] [--from] [--force]
```

Pomoc wbudowana:

```bash
nuc emit --help
nuc emit <komenda> --help
```

---

## `version`

Wypisuje tożsamość pakietu (`nazwa` + `phase`).

```bash
nuc emit version
```

Brak argumentów i opcji.

---

## `scaffold`

Odtwarza gitignored demo w `{framework}/demo` z `compiler/templates/{framework}/demo`.

```bash
nuc emit scaffold <app> [--cwd=<root>]
```

| Argument / opcja | Wymagane | Wartości / domyślne | Opis |
|------------------|----------|---------------------|------|
| `<app>` | tak | `vue` \| `react` \| `nuxt` \| `next` \| `solid` \| `svelte` \| `astro` | Framework demo |
| `--cwd` | nie | `process.cwd()` | Root workspace |

Przykłady:

```bash
nuc emit scaffold solid
nuc emit scaffold svelte
nuc emit scaffold next
nuc emit scaffold vue --cwd=/path/to/nucleify
```

---

## `convert`

Generuje aplikację produktu w `{product}-{target}/` (albo w katalogu z `--out`) z profilu `web` / `admin`. **Tak - wrzucasz istniejącą aplikację frameworkową takim, jaka jest** - bez przepisywania na `*.nuc.tsx`, bez wcześniejszego podziału na `shared_modules`, bez tokenów Nucleify.

```bash
nuc emit convert <product> --target=<framework> \
  [--force] [--path=<dir>] [--git=<url>] [--out=<name>] [--cwd=<root>]
```

| Argument / opcja | Wymagane | Wartości / domyślne | Opis |
|------------------|----------|---------------------|------|
| `<product>` | tak | `web` \| `admin` \| `docs` | Profil produktu (`docs` - convert jeszcze niedostępny) |
| `--target` | tak | `next` \| `solid` \| `svelte` \| `astro` | Docelowy framework |
| `--force` | nie | `false` | Wytrzyj i utwórz output od nowa |
| `--path` | nie | — | Zewnętrzny folder istniejącej aplikacji frameworkowej (musi zawierać `src/`) - Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest |
| `--git` | nie | — | URL gita do płytkiego clone jako źródło convert |
| `--out` | nie | `{product}-{target}` | Nazwa katalogu wyjściowego pod `--cwd` |
| `--cwd` | nie | `process.cwd()` | Root workspace |

Ograniczenia:

- Podaj **tylko jedno** z `--path` albo `--git` (nie oba).
- Uruchamiaj z **roota monorepo Nucleify**, żeby aliasy `modules` / `portable` działały.
- Wygenerowany output traktuj jako emit - edytuj źródło produktu, potem convert ponownie.

Przykłady:

```bash
nuc emit convert web --target=next
nuc emit convert admin --target=next
nuc emit convert web --target=solid
nuc emit convert web --target=svelte
nuc emit convert web --target=astro
nuc emit convert web --target=vue
nuc emit convert admin --target=svelte

# Istniejąca aplikacja takim, jaka jest (Next, Nuxt albo inny wspierany stack) - bez przepisywania pod Nucleify:
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
```

Równoważne skróty Make w repo: `make web --target=next` / `make admin -t=next` (wymaga `PATH="$PWD/.config/bin:$PATH"`) albo klasycznie `make web --target=next` - zob. [Kompilator](/pl/docs/core-concepts/compiler).

---

## `build`

Parsuje wszystkie `*.nuc.tsx` w workspace → IR → emituje do demo / aplikacji docelowych.

```bash
nuc emit build \
  [--target=all|vue|react|solid|svelte|astro] \
  [--app=vue|react|nuxt|next|solid|svelte|astro] \
  [--force] [--dump-ir] [--cwd=<root>]
```

| Opcja | Wymagane | Wartości / domyślne | Opis |
|-------|----------|---------------------|------|
| `--target` | nie | `all` | Rodzina emisji: `vue` \| `react` \| `solid` \| `svelte` \| `astro` \| `all` |
| `--app` | nie | wszystkie dopasowane | Tylko to demo: `vue` \| `react` \| `nuxt` \| `next` \| `solid` \| `svelte` \| `astro` |
| `--force` | nie | `false` | Nadpisz brudny emit (bez `--force` brudne pliki są pomijane, exit ≠ 0) |
| `--dump-ir` | nie | `false` | Zapisz `*.ir.json` obok źródła przenośnego |
| `--cwd` | nie | `process.cwd()` | Root workspace |

Zachowanie:

- Brak `*.nuc.tsx` → komunikat `build: no *.nuc.tsx found` (sukces).
- Brudny emit bez `--force` → `skipped dirty … (use import or --force)` i niezerowy kod wyjścia.
- Po sukcesie: `build: ok (N file(s), target=…)`.

Przykłady:

```bash
nuc emit build
nuc emit build --force
nuc emit build --target=vue
nuc emit build --target=react
nuc emit build --app=solid
nuc emit build --app=svelte --force
nuc emit build --dump-ir --target=astro
```

---

## `check`

Waliduje fingerprinty IR / emisji. Brudny emit kończy się błędem.

```bash
nuc emit check [--cwd=<root>]
```

| Opcja | Wymagane | Domyślne | Opis |
|-------|----------|----------|------|
| `--cwd` | nie | `process.cwd()` | Root workspace |

Wyjście:

| Sygnał | Znaczenie |
|--------|-----------|
| `dirty <path>` (stderr) + exit ≠ 0 | Emisja rozjechała się ze źródłem |
| `orphan emit <path>` (warn) | Emisja bez sparowanego źródła - ostrzeżenie |
| `check: ok` | Wszystko zsynchronizowane |

```bash
nuc emit check
nuc emit check
```

---

## `watch`

Rezerwacja pod watch `*.nuc.tsx` i przebudowę.

```bash
nuc emit watch
```

**Status:** jeszcze niezaimplementowane - komenda kończy się błędem (`watch: not implemented yet`).

---

## `import`

Wciąga edycje z brudnego emitu z powrotem do odpowiadającego `*.nuc.tsx`.

```bash
nuc emit import [--from=<framework>] [--force] <path>
```

| Argument / opcja | Wymagane | Wartości | Opis |
|------------------|----------|----------|------|
| `<path>` | tak | ścieżka do `.vue` / `.tsx` / `.svelte` / `.astro` / sąsiedniego `.css` | Plik emisji do zaimportowania |
| `--from` | warunkowo | `vue` \| `react` \| `solid` \| `svelte` \| `astro` | Źródłowy framework emisji - **wymagane**, gdy więcej niż jeden sibling jest niezsynchronizowany |
| `--force` | nie | `false` | Wymuś import mimo konfliktów / stanu dirty |

Przykłady:

```bash
nuc emit import --from=vue path/Foo.vue
nuc emit import --from=react path/Foo.tsx
nuc emit import --from=solid path/Foo.tsx
nuc emit import --from=svelte path/Foo.svelte
nuc emit import --from=astro path/Foo.astro
```

Po imporcie źródłem prawdy znów jest `*.nuc.tsx`. Żeby **odrzucić** ręczne edycje emisji zamiast je importować: `nuc emit build --force`.

---

## Typowy przebieg

### Emisja przenośna

1. Napisz lub edytuj `Foo.nuc.tsx` (reguły: [Kompilator](/pl/docs/core-concepts/compiler), `compiler/PORTABLE.md`)
2. `nuc emit build`
3. Commituj źródło + wygenerowane sąsiednie pliki
4. CI / lokalnie: `nuc emit check`

### Najpierw emisja, potem import

1. Dopracuj wygenerowany `Foo.vue` / `Foo.tsx` / `Foo.svelte` / …
2. `nuc emit import --from=vue|react|solid|svelte|astro path/Foo.…`
3. Źródło wraca do `Foo.nuc.tsx`

### Konwersja produktu (migracja frameworka)

1. Z roota monorepo: `nuc emit convert web --target=next` (lub `--path` / `--git` dla istniejącej aplikacji Next / Nuxt / Vue / React / … takim, jaki jest)
2. Wejdź w wygenerowany katalog (`web-next/` itd.) i uruchom dev server hosta
3. Iteruj w frameworku, który dziś shipujesz - później zmień framework bez przepisywania aplikacji pod Nucleify najpierw

Playground w przeglądarce (bez lokalnej instalacji): [Playground](/pl/docs/core-concepts/playground) · [play.nucleify.io](https://play.nucleify.io).

---

## Kody wyjścia i diagnostyka

| Sytuacja | Typowy skutek |
|----------|----------------|
| Nieznany `<app>` / `<product>` / `--target` | komunikat na stderr, exit ≠ 0 |
| `convert` z `--path` **i** `--git` | `convert: pass only one of --path or --git` |
| `import` bez ścieżki | `import: path required …` |
| Brudny emit przy `build` bez `--force` | `skipped dirty …`, exit ≠ 0 |
| Brudny emit przy `check` | `check: N dirty emit file(s)`, exit ≠ 0 |
| `watch` | zawsze exit ≠ 0 (niezaimplementowane) |

Pomijanie emisji przy bootstrapie / hookach (gdy potrzeba lokalnie):

```bash
SKIP_COMPILER=1 make run
HUSKY=0 git commit -m "…"
```

---

## FAQ — migracja istniejącej aplikacji

### Czy `nuc` zmigruje dowolną istniejącą aplikację Next / Nuxt / Vue / React?

**Tak.** Konwersja produktu na Twoim drzewie **takim, jakie jest**:

```bash
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
# albo: --git=<url> · --target=solid|svelte|astro
```

Bez przepisywania na `*.nuc.tsx`, bez wcześniejszego refaktoru do `shared_modules`, bez tokenów Nucleify. Uruchamiaj z roota monorepo Nucleify, żeby aliasy działały.

### Czy przed `convert` potrzebuję `*.nuc.tsx`?

**Nie.** `nuc emit build` / przenośne `*.nuc.tsx` to opcjonalne współdzielone UI. Convert tego nie wymaga.

### Czy `make web --target=next` to to samo co migracja mojej aplikacji Next?

**Nie samo w sobie.** Bez `--path` / `--git` konwertuje własne `web/` Nucleify do `web-next/`. Dla **Twojej** aplikacji podaj `--path` albo `--git` oraz `--out`.

### Czy Playground zastępuje convert?

**Nie.** [play.nucleify.io](https://play.nucleify.io) to opcjonalny sandbox UI przenośnego. Migracja całej aplikacji to `nuc emit convert`.

---

## Powiązane

- Strona produktu: [cli.nucleify.io](https://cli.nucleify.io)
- Emit w przeglądarce: [play.nucleify.io](https://play.nucleify.io) · [Playground](/pl/docs/core-concepts/playground)
- IR, autorstwo przenośne, reguły `*.nuc.tsx`, układ pakietu: [Kompilator](/pl/docs/core-concepts/compiler)
- FAQ migracji: [FAQ migracji](/pl/docs/getting-started/migrate-faq) · [llms.txt](/llms.txt)
- FAQ we wprowadzeniu: [Wprowadzenie](/pl/docs/getting-started/introduction#faq--migracja-istniej%C4%85cej-aplikacji)
