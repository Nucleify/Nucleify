# Kompilator

Pakiet `@nucleify/compiler` to wyróżnik Nucleify: przenośny kompilator UI oparty na IR, który zamienia źródła `*.nuc.tsx` na Vue SFC, komponenty React i współdzielony CSS — oraz może konwertować całe powłoki produktu Nuxt na Next.js (Tryb B).

---

## Dwa tryby pracy

| Tryb | Co robi | Przykład |
|------|---------|----------|
| **Tryb A** (emisja komponentów) | `*.nuc.tsx` → IR → `.vue` + `.tsx` + `.css` | `pnpm compiler:build` |
| **Tryb B** (powłoka produktu) | Aplikacja Nuxt → aplikacja Next.js | `pnpm compiler -- convert web --target=next` |

**Tryb A** służy przenośnym komponentom prezentacyjnym. **Tryb B** generuje `web-next/` lub `admin-next/` z drzewa źródeł Vue — te same trasy, współdzielone moduły, inna powłoka frameworka.

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
pnpm compiler:check                              # weryfikuj fingerprinty (exit 1 jeśli dirty)
pnpm compiler:test                               # zestaw testów golden-file

pnpm compiler -- import --from=vue path/Foo.vue  # importuj edycje emisji z powrotem do źródła
pnpm compiler -- import --from=react path/Foo.tsx
pnpm compiler -- build --force                   # odrzuć edycje emisji; regeneruj

pnpm compiler -- convert web --target=next       # Tryb B → web-next/
pnpm compiler -- convert admin --target=next     # Tryb B → admin-next/
pnpm compiler -- scaffold next                   # throwaway demo → next/demo/
```

Pomiń kompilator podczas bootstrapu:

```bash
SKIP_COMPILER=1 make run
```

---

## Cykl A — autorstwo najpierw

1. Utwórz lub edytuj `Foo.nuc.tsx`
2. Uruchom `pnpm compiler:build`
3. Commituj źródło + wygenerowane sąsiednie pliki
4. CI uruchamia `pnpm compiler:check`, aby upewnić się, że emisja jest aktualna

## Cykl B — edycja emisji najpierw

1. Dopracuj wygenerowany `Foo.vue` lub `Foo.tsx` bezpośrednio
2. Zaimportuj zmiany z powrotem: `pnpm compiler -- import --from=vue path/Foo.vue`
3. Źródło prawdy wraca do `Foo.nuc.tsx`

Jeśli oba `.vue` i `.tsx` są dirty, musisz podać `--from=`. Użyj `pnpm compiler -- build --force`, aby odrzucić edycje emisji.

---

## Układ pakietu

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # reprezentacja pośrednia
│   ├── emit/               # IR → .vue / .tsx / .css
│   └── sync/               # import zwrotny, konwersja powłok produktu
├── runtime/                # #nuc-compiler/runtime
├── templates/              # źródła scaffold dla gitignored demo
├── tests/                  # testy golden-file
├── fixtures/
└── PORTABLE.md             # reguły autorskie
```

Gitignored demo emisji: `{vue,react,nuxt,next}/demo/` (przez `make vue`, `make next` itd.).

---

## Konwersja powłoki produktu (Tryb B)

```bash
make web TARGET=next
# równoważne:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev
```

Konwerter czyta drzewo źródeł Nuxt w `web/`, mapuje strony i composables na odpowiedniki React i zapisuje output do `web-next/`. Moduły współdzielone są konsumowane przez barrel `index.react.ts`.

Traktuj `web-next/` i `admin-next/` jako **generowany output**. Rozwijaj w `web/` lub `admin/`, potem konwertuj.

---

## Alias runtime

Nuxt rozwiązuje runtime przez `web/.config/nuxt/structure.ts`:

```typescript
'#nuc-compiler/runtime': resolve(process.cwd(), '../compiler/runtime/index.ts')
```

Helpery runtime (`component`, `state`, `derived`, `handler`) to markery compile-time — nie mogą pojawiać się w wyemitowanych bundlach.

---

## Testowanie

Testy kompilatora są w `compiler/tests/` z dedykowaną konfiguracją Vitest (`.config/vitest.compiler.config.ts`). Testy golden porównują output emisji z fixture'ami w `compiler/tests/fixtures/`.

```bash
pnpm compiler:test
pnpm compiler:check
```

Zobacz [Vitest](/pl/docs/tests/vitest) po pełną konfigurację testów.

---

## Powiązana dokumentacja

- [Układ monorepo](/pl/docs/core-concepts/monorepo) — gdzie kompilator pasuje w workspace
- [Szybki start](/pl/docs/getting-started/quick-start) — zbuduj swój pierwszy komponent przenośny
- [Web & Admin](/pl/docs/configuration/web) — konfiguracja Nuxt podłączająca alias runtime
