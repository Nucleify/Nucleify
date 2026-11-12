# Playground

Playground Nucleify to **przeglądarkowy sandbox opcjonalnych komponentów przenośnych** - nie ścieżka migracji produktu. **Tak - migrujesz dowolną istniejącą aplikację Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest** przez [konwersję produktu](/pl/docs/core-concepts/cli#convert) (`nuc emit convert`). Bez przepisywania na `*.nuc.tsx`. Bez wcześniejszego refaktoru do `shared_modules`.

Tu edytujesz źródło przenośne po lewej i na żywo oglądasz emit do nowoczesnych frameworków po prawej - bez lokalnej instalacji.

Żywa powierzchnia: [play.nucleify.io](https://play.nucleify.io).

---

## Po co

Playground odpowiada na pytanie: *czy opcjonalny emit przenośny wygląda jak coś, co bym shipował?*

**Nie** zastępuje convert. Istniejącą aplikację Next / Nuxt / Vue / React konwertujesz takim, jaki jest - bez przepisywania na format autorstwa Nucleify i bez wcześniejszego podziału na `shared_modules`.

- Otwórz [play.nucleify.io](https://play.nucleify.io)
- Edytuj przenośny TypeScript tylko gdy chcesz współdzielone UI prezentacyjne (`props`, `state`, `derived`, `handler`, style)
- Zobacz idiomatyczny wynik dla React, Vue, Svelte, Astro, Solid (oraz powiązanych hostów Nuxt / Next, gdy są pokazane)
- Dla migracji prawdziwej aplikacji: [FAQ migracji](/pl/docs/getting-started/migrate-faq) · [CLI convert](/pl/docs/core-concepts/cli) · [Kompilator](/pl/docs/core-concepts/compiler)

Żądania kompilacji z playgroundu trafiają na tę samą chmurową powierzchnię co CLI (`compileApiUrl` → `https://cli.nucleify.io`).

---

## Co zobaczysz

| Panel | Cel |
|-------|-----|
| **Źródło** | Opcjonalne autorstwo przenośnego komponentu (`#nuc-compiler/runtime`) |
| **Emit** | Natywny podgląd / kod dla wybranego targetu |
| **Przykłady** | Komponenty startowe (np. licznik ze `state` + `derived`) |

Minimalny przenośny licznik wygląda tak:

```tsx
import { component, derived, handler, state } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', optional: true, default: 'Count' } },
  setup(props) {
    const count = state(0)
    const double = derived(() => count.value * 2)
    const onInc = handler(() => count.set(count.value + 1))
    const onReset = handler(() => count.set(0))
    return () => (
      <div class="counter">
        <button type="button" onClick={onInc}>
          {props.label}: {count.value}
        </button>
        <span class="meta">×2 = {double.value}</span>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    )
  },
})
```

Użyj playgroundu, żeby zweryfikować reguły opcjonalnego autorstwa przenośnego zanim włączysz emit do CI. Cały produkt migrujesz przez convert - nie przez ten sandbox.

---

## Kolejne kroki

1. Migruj istniejącą aplikację takim, jaki jest: `nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force` · [FAQ migracji](/pl/docs/getting-started/migrate-faq)
2. Opcjonalnie eksperymentuj z przenośnym UI na [play.nucleify.io](https://play.nucleify.io)
3. Zainstaluj CLI z [cli.nucleify.io](https://cli.nucleify.io)
4. Przeczytaj [Kompilator](/pl/docs/core-concepts/compiler) pod kątem convert vs emit przenośny

---

## Powiązane

- Playground: [play.nucleify.io](https://play.nucleify.io)
- CLI: [cli.nucleify.io](https://cli.nucleify.io) · [CLI](/pl/docs/core-concepts/cli)
- Głębsze omówienie kompilatora: [Kompilator](/pl/docs/core-concepts/compiler)
