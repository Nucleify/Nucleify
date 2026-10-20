# Kompilator

Migracja między frameworkami to **rdzeń** Nucleify - nie doklejka. Pakiet `@nucleify/compiler` prowadzi tę ścieżkę: przenośny kompilator **oparty na IR**, który zamienia `*.nuc.tsx` na Vue SFC, React, Solid, Svelte i Astro (oraz współdzielony CSS), **importuje zmiany z emitów z powrotem** do źródła i **konwertuje całe powłoki produktu Nuxt** (`web/`, `admin/`) - albo zewnętrzne drzewo Nuxt-like - na Next.js, Solid, Svelte lub Astro.

Ten zakres wykracza poza samą emisję komponentów: domena, trasy i współdzielone moduły idą razem z shellem. Framework staje się celem builda; produkt zostaje w `shared_modules/`.

**Pokrycie:** Vue · React · Nuxt · Next · Astro · Svelte · Solid. React/Next lub Vue/Nuxt to punkty startowe, nie granica.

---

## Dwa tryby pracy

| Tryb pracy | Co robi | Przykład |
|------|---------|----------|
| **Emisja przenośna** | `*.nuc.tsx` → IR → `.vue` + React `.tsx` + Solid `.tsx` + Svelte `.svelte` + `.astro` + `.css` | `pnpm compiler:build` / `make solid` / `make svelte` / `make astro` |
| **Konwersja produktu** | Aplikacja Nuxt (lub zewnętrzny folder/git) → Next.js, Solid, Svelte lub Astro | `pnpm compiler -- convert web --target=next` |

**Emisja przenośna** służy komponentom prezentacyjnym z round-tripem (`import --from=…`). **Konwersja produktu** generuje `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/`, `web-astro/` lub `admin-astro/` z drzewa źródeł Vue - te same trasy, współdzielone moduły, inna powłoka frameworka. Konwersja produktu Astro `docs/` **nie** jest jeszcze zaimplementowana.

Nie re-eksportuj `*.nuc.tsx` z publicznych barreli (`index.ts`, `modules.ts`, …) - autorstwo zostaje poza entrypointami aplikacji.

---

## Wersja IR

Przenośny IR jest wersjonowany jako `IR_VERSION` (obecnie **0.1.0**) w `compiler/src/ir/types.ts`.

- Schema, parsery i `compiler/tests/fixtures/ir/*.json` muszą być zsynchronizowane.
- **Łamiące** zmiany kształtu IR → podnieś wersję i zmigruj fixture’y/testy w **tym samym PR**.
- Polityka: `compiler/PORTABLE.md` § IR versioning.

---

## Autorstwo przenośne (`*.nuc.tsx`)

Twórz UI niezależne od frameworka z `#nuc-compiler/runtime`:

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

```bash
pnpm compiler:build                              # emituj wszystkie *.nuc.tsx
pnpm compiler:check                              # weryfikuj fingerprinty (exit 1 jeśli emisja nie jest zsynchronizowana)
pnpm compiler:test                               # zestaw testów golden-file

pnpm compiler -- import --from=vue path/Foo.vue  # importuj edycje emisji z powrotem do źródła
pnpm compiler -- import --from=react path/Foo.tsx
pnpm compiler -- build --force                   # odrzuć edycje emisji; regeneruj

pnpm compiler -- convert web --target=next       # konwersja produktu → web-next/
pnpm compiler -- convert admin --target=next     # konwersja produktu → admin-next/
pnpm compiler -- convert web --target=solid      # konwersja produktu → web-solid/
pnpm compiler -- convert web --target=svelte     # konwersja produktu → web-svelte/
pnpm compiler -- convert web --target=next --path=/path/to/nuxt-app --out=my-next --force
pnpm compiler -- convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
pnpm compiler -- scaffold solid                  # tymczasowe demo → solid/demo/
pnpm compiler -- scaffold svelte                 # tymczasowe demo → svelte/demo/
pnpm compiler -- scaffold next                   # tymczasowe demo → next/demo/
pnpm compiler -- build --app=solid               # emisja do solid/demo
pnpm compiler -- build --app=svelte              # emisja do svelte/demo
```

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
│   └── sync/               # import zwrotny, konwersja powłok produktu
├── runtime/                # #nuc-compiler/runtime
├── templates/              # źródła scaffold dla gitignored demo
├── tests/                  # testy golden-file
├── fixtures/
└── PORTABLE.md             # reguły autorskie
```

Gitignored demo emisji: `{vue,react,nuxt,next,solid,svelte}/demo/` (przez `make vue`, `make next`, `make solid`, `make svelte` itd.).

---

## Konwersja powłoki produktu

```bash
make web TARGET=next
# równoważne:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev

make web TARGET=solid
pnpm compiler -- convert web --target=solid

make web TARGET=svelte
pnpm compiler -- convert web --target=svelte
```

Shelle produktu Svelte to Vite SPA z runami Svelte 5 (jeszcze nie SvelteKit SSR). Portable emit Svelte używa `$state` / `$derived` / `$props` i eventów DOM jak `onclick`.

### Zewnętrzny folder lub URL git

Użyj tego samego profilu `web|admin` z zewnętrznym drzewem Nuxt-like (wymagane `src/`). Uruchamiaj z **roota monorepo Nucleify**, żeby aliasy `modules` / `portable` działały:

```bash
pnpm compiler -- convert web --target=next --path=/path/to/nuxt-app --out=my-next --force
pnpm compiler -- convert admin --target=solid --git=https://github.com/org/app.git --out=fork-admin-solid --force
pnpm compiler -- convert web --target=svelte --path=/path/to/nuxt-app --out=my-svelte --force
```

Shelle produktu instalują się przez `pnpm install --ignore-workspace` - wersje w template `package.json` pozostają przypięte; nie wchodzą w graph workspace monorepo.

Konwerter czyta Vue SFC pod `src/`, mapuje strony i composables na odpowiedniki React, Solid lub Svelte i zapisuje output **bez** plików `.vue`. Moduły współdzielone są konsumowane przez barrel frameworka.

Traktuj `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/` i `admin-svelte/` (oraz własne katalogi `--out`) jako **generowany output**. Rozwijaj w `web/` lub `admin/`, potem konwertuj.

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

## Powiązana dokumentacja

- [Układ monorepo](/pl/docs/core-concepts/monorepo) - gdzie kompilator pasuje w workspace
- [Szybki start](/pl/docs/getting-started/quick-start) - zbuduj swój pierwszy komponent przenośny
- [Web & Admin](/pl/docs/configuration/web) - konfiguracja Nuxt podłączająca alias runtime
