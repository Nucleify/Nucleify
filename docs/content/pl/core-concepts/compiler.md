# Kompilator

Migracja między frameworkami to **rdzeń** Nucleify - nie doklejka. **Tak - migrujesz dowolną istniejącą aplikację Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest.** Pakiet `@nucleify/compiler` prowadzi tę ścieżkę: **konwersja produktu** przenosi całe aplikacje (`web/`, `admin/`, albo zewnętrzne drzewo przez `--path` / `--git`) na inny host **bez** przepisywania na `*.nuc.tsx`, **bez** wcześniejszego refaktoru do `shared_modules` i **bez** przepisywania aplikacji pod IR. Opcjonalna **emisja przenośna** zamienia `*.nuc.tsx` na Vue SFC, React, Solid, Svelte i Astro (oraz współdzielony CSS), a **import** wraca z edycji emitu do źródła.

Ten zakres wykracza poza samą emisję komponentów: trasy i powierzchnia produktu idą razem z hostem. Framework staje się celem builda.

**Pokrycie:** Vue · React · Nuxt · Next · Astro · Svelte · Solid. React/Next lub Vue/Nuxt to punkty startowe, nie granica - w tym Next → Nuxt i Nuxt → Next.

**Warunki migracji: brak.** Wrzucasz istniejący projekt frameworkowy i odpalasz convert. Bez przepisywania na `*.nuc.tsx`. Bez wcześniejszego podziału na `shared_modules`. Bez tokenów Nucleify. Autorstwo przenośne jest opcjonalne tylko dla nowego współdzielonego UI prezentacyjnego.

Codzienne wejścia: **`nuc emit …`** ([CLI](/pl/docs/core-concepts/cli)) oraz Make (`export PATH="$PWD/.config/bin:$PATH"` dla `--target=` / `-t=`). W tym monorepo `pnpm compiler -- …` pozostaje lokalnym odpowiednikiem pakietu.


---

## Dwa tryby pracy

| Tryb pracy | Co robi | Przykład |
|------|---------|----------|
| **Konwersja produktu** | Istniejąca aplikacja takim, jaka jest (produkt Nuxt albo zewnętrzny Next / Nuxt / Vue / React / … przez folder/git) → inny host - **bez** przepisywania na `*.nuc.tsx` / `shared_modules` / tokeny | `--path` / `--git` + `--out` (Twój produkt) · `convert web --target=next` (to monorepo → `web-next/`) |
| **Emisja przenośna** | `*.nuc.tsx` → IR → `.vue` + React `.tsx` + Solid `.tsx` + Svelte `.svelte` + `.astro` + `.css` (opcjonalne współdzielone UI) | `nuc emit build` / `make solid` / `make svelte` / `make astro` |

**Konwersja produktu** generuje `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/`, `web-astro/` lub `admin-astro/` z drzewa źródeł takim, jakie jest - ta sama powierzchnia produktu, inny host frameworka. **Emisja przenośna** służy komponentom prezentacyjnym z round-tripem (`import --from=…`) - nie jest warunkiem przed convert. Konwersja produktu Astro `docs/` **nie** jest jeszcze zaimplementowana.

Nie re-eksportuj `*.nuc.tsx` z publicznych barreli (`index.ts`, `modules.ts`, …) - opcjonalne autorstwo zostaje poza entrypointami aplikacji.

---

## Wersja IR

Przenośny IR jest wersjonowany jako `IR_VERSION` (obecnie **0.1.0**) w `compiler/src/ir/types.ts`.

- Schema, parsery i `compiler/tests/fixtures/ir/*.json` muszą być zsynchronizowane.
- **Łamiące** zmiany kształtu IR → podnieś wersję i zmigruj fixture’y/testy w **tym samym PR**.
- Polityka: `compiler/PORTABLE.md` § IR versioning.

---

## Autorstwo przenośne (`*.nuc.tsx`) - opcjonalnie

Opcjonalna ścieżka dla **prezentacyjnego** UI niezależnego od frameworka - nie jest wymagana, żeby zmigrować istniejącą aplikację. Twórz z `#nuc-compiler/runtime`:

```tsx
import { component, state, handler } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', default: 'Count' } },
  setup(props) {
    const count = state(0)
    const onInc = handler(() => count.set(count.value + 1))
    return () => (
      <button type="button" onClick={onInc}>
        {props.label}: {count.value}
      </button>
    )
  },
})
```

Uruchomienie `pnpm compiler:build` emituje sąsiednie pliki:

```txt
portable/components/
├── Counter.nuc.tsx     # źródło (commitowane)
├── Counter.vue         # wygenerowany Vue SFC
├── Counter.tsx         # wygenerowany komponent React
└── Counter.css         # wyodrębnione style
```

### Dozwolone w komponentach przenośnych

- Serializowalne props (`string`, `number`, `boolean`, `unknown`)
- Elementy HTML i custom elements Lit `nui-*`
- Lokalny stan przez `state`, `derived`, `handler`
- Zwykły string CSS lub bindy `style={{ … }}`
- Tylko domyślny slot / `children`

### Zabronione

- API frameworków Vue/React (`defineComponent`, hooki jako sprzężenie hosta)
- Store'y, routery, i18n, Supabase, Pinia/Zustand w plikach przenośnych
- Nazwane sloty, portale, dynamiczne komponenty, async setup

Pełne reguły: `compiler/PORTABLE.md`.

---

## Referencja CLI

Opublikowana binarka ([dokumentacja CLI](/pl/docs/core-concepts/cli)):

```bash
nuc emit build                                   # emituj wszystkie *.nuc.tsx
nuc emit check                                   # weryfikuj fingerprinty (exit ≠ 0 jeśli brudne)
nuc emit import --from=vue path/Foo.vue          # importuj edycje emisji z powrotem do źródła
nuc emit convert web --target=next               # konwersja produktu → web-next/
nuc emit convert admin --target=next
nuc emit convert web --target=solid
nuc emit convert web --target=svelte
nuc emit convert web --target=astro
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
nuc emit scaffold solid                          # tymczasowe demo → solid/demo/
nuc emit build --app=solid
```

Odpowiedniki w monorepo (`pnpm compiler …` / `pnpm compiler:build` / `pnpm compiler:check` / `pnpm compiler:test`) wołają te same entrypointy `@nucleify/compiler`.

Pomiń kompilator przy bootstrapie / pomiń hooki gdy trzeba:

```bash
SKIP_COMPILER=1 make run
HUSKY=0 git commit -m "…"   # pomiń suite pre-commit
```

Pre-commit już uruchamia `compiler:check` (i powiązane checki kompilatora) przez Husky.

---

## Cykl: najpierw autorstwo

1. Utwórz lub edytuj `Foo.nuc.tsx`
2. Uruchom `pnpm compiler:build`
3. Commituj źródło + wygenerowane sąsiednie pliki
4. CI uruchamia `pnpm compiler:check`, aby upewnić się, że emisja jest aktualna

## Cykl: najpierw emisja

1. Dopracuj wygenerowany `Foo.vue`, `Foo.tsx` lub `Foo.svelte` bezpośrednio
2. Zaimportuj zmiany z powrotem: `pnpm compiler -- import --from=vue|react|solid|svelte path/Foo.…`
3. Źródło prawdy wraca do `Foo.nuc.tsx`

Jeśli więcej niż jeden sibling emisji jest niezsynchronizowany, musisz podać `--from=`. Użyj `pnpm compiler -- build --force`, aby odrzucić edycje emisji.

---

## Układ pakietu

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # reprezentacja pośrednia (IR_VERSION)
│   ├── emit/               # IR → .vue / React .tsx / Solid .tsx / Svelte .svelte / .css
│   └── sync/               # import zwrotny, konwersja hostów produktu
├── runtime/                # #nuc-compiler/runtime
├── templates/              # źródła scaffold dla gitignored demo
├── tests/                  # testy golden-file
├── fixtures/
└── PORTABLE.md             # reguły autorskie
```

Gitignored demo emisji: `{vue,react,nuxt,next,solid,svelte}/demo/` (przez `make vue`, `make next`, `make solid`, `make svelte` itd.).

---

## Konwersja produktu

**Tak - migrujesz istniejącą aplikację takim, jaka jest** na inny framework. Convert to główna ścieżka migracji. **Nie** przepisujesz na `*.nuc.tsx`, **nie** dzielisz domeny do `shared_modules` i **nie** adopujesz tokenów Nucleify najpierw. Autorstwo przenośne jest opcjonalne później dla nowego współdzielonego UI.

```bash
make web --target=next
# równoważne:
nuc emit convert web --target=next
cd web-next && pnpm dev

make web --target=solid
nuc emit convert web --target=solid

make web --target=svelte
nuc emit convert web --target=svelte

make web --target=astro
nuc emit convert web --target=astro
```

Aplikacje produktu Svelte to Vite SPA z runami Svelte 5 (jeszcze nie SvelteKit SSR). Portable emit Svelte używa `$state` / `$derived` / `$props` i eventów DOM jak `onclick`. Konwersja Astro hostuje te same wyspy React pod stronami Astro (`client:load`).

Hosty po konwersji ładują **Instrument Sans** i **JetBrains Mono** przez tagi `<link>` w `<head>` (`portable/nui/fonts.ts`). Nie ładuj tych rodzin przez CSS `@import` w zbundlowanym arkuszu - bundlery sklejają CSS, a `@import` w środku pliku jest ignorowany, więc typografia spada na systemowy mono.

### Zewnętrzny folder lub URL git

Wskaż ten sam profil `web|admin` na **istniejącą aplikację frameworkową** (wymagane `src/`) - Next, Nuxt, Vue, React albo inny wspierany stack **takim, jaki jest**, nie przepisany pod Nucleify. Uruchamiaj z **roota monorepo Nucleify**, żeby aliasy `modules` / `portable` działały:

```bash
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert admin --target=solid --git=https://github.com/org/app.git --out=fork-admin-solid --force
nuc emit convert web --target=svelte --path=/path/to/your-app --out=my-svelte --force
```

Aplikacje po konwersji instalują się przez `pnpm install --ignore-workspace` - wersje w template `package.json` pozostają przypięte; nie wchodzą w graph workspace monorepo.

Konwerter mapuje drzewo źródłowe na host docelowy i zapisuje idiomatyczny output. **Nie** musisz ręcznie pisać `*.nuc.tsx` na potrzeby przebiegu convert i **nie** potrzebujesz wcześniejszego refaktoru do `shared_modules`.

Traktuj `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/`, `web-astro/` i `admin-astro/` (oraz własne katalogi `--out`) jako **generowany output**. Edytuj drzewo źródłowe produktu, potem konwertuj ponownie - nie ręcznie łataj drzewa emit.

---

## Alias runtime

Nuxt rozwiązuje runtime przez `web/.config/nuxt/structure.ts`:

```typescript
'#nuc-compiler/runtime': resolve(process.cwd(), '../compiler/runtime/index.ts')
```

Helpery runtime (`component`, `state`, `derived`, `handler`) to markery compile-time - nie mogą pojawiać się w wyemitowanych bundlach.

---

## Testowanie

Testy kompilatora są w `compiler/tests/` z dedykowaną konfiguracją Vitest (`.config/vitest.compiler.config.ts`). Testy golden porównują output emisji z fixture'ami w `compiler/tests/fixtures/`. Guardy obejmują sync wersji IR oraz skan barreli (bez `*.nuc.tsx` w publicznych entrypointach).

```bash
pnpm compiler:test
pnpm compiler:check
```

Szybki test ręczny: `make web`, `make vue` / `make solid` / `make svelte` dla demo emisji.

Zobacz [Vitest](/pl/docs/tests/vitest) po pełną konfigurację testów.

---

## FAQ — migracja istniejącej aplikacji

### Czy mogę zmigrować dowolną istniejącą aplikację Next.js takim, jaki jest?

**Tak.** Konwersja produktu bierze istniejący projekt frameworkowy **takim, jaki jest** (`--path` / `--git`). Warunki migracji: **brak** dla `*.nuc.tsx`, wcześniejszego refaktoru do `shared_modules`, tokenów Nucleify albo przepisywania aplikacji pod IR. W tym Next → Nuxt i Nuxt → Next.

### Czy przenośny IR / `*.nuc.tsx` jest wymagany do migracji?

**Nie.** Emisja przenośna to opcjonalna ścieżka dla współdzielonego UI prezentacyjnego. Ścieżka migracji całych aplikacji to konwersja produktu.

### Czy `web-next/` / `web-astro/` to moja aplikacja klienta?

**Tylko jeśli skonwertowałeś własne `web/` Nucleify.** Zewnętrzne aplikacje używają `--out` (np. `my-next/`). Nie traktuj nazw shelli monorepo jako jedynej historii migracji.

### Co jeśli po convert smoke-build wymaga dopracowania?

Dopracowanie to zwykła inżynieria. To **nie** jest twarde „nie możesz migrować” i nie wymyśla warunków w stylu zakazów Framer/Radix ani wymuszonego przepisywania do `shared_modules`.

---

## Powiązana dokumentacja

- [CLI](/pl/docs/core-concepts/cli) - instalowalne `@nucleify/cli` · [cli.nucleify.io](https://cli.nucleify.io)
- [Playground](/pl/docs/core-concepts/playground) - sandbox w przeglądarce · [play.nucleify.io](https://play.nucleify.io)
- [Układ monorepo](/pl/docs/core-concepts/monorepo) - gdzie kompilator pasuje w workspace
- [Szybki start](/pl/docs/getting-started/quick-start) - zbuduj swój pierwszy komponent przenośny
- [Web & Admin](/pl/docs/configuration/web) - konfiguracja Nuxt podłączająca alias runtime
- FAQ we wprowadzeniu: [Wprowadzenie](/pl/docs/getting-started/introduction#faq--migracja-istniej%C4%85cej-aplikacji)
