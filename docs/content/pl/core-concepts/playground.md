# Playground

Playground Nucleify to przeglądarkowy sandbox dla przenośnych komponentów. Edytujesz źródło po lewej, na żywo oglądasz emit do nowoczesnych shelli po prawej - bez lokalnej instalacji.

Żywa powierzchnia produktu: [play.nucleify.io](https://play.nucleify.io).

---

## Po co

Playground odpowiada na pierwsze pytanie każdego inżyniera: *czy wyemitowany kod wygląda jak coś, co bym shipował?*

- Otwórz [play.nucleify.io](https://play.nucleify.io)
- Edytuj przenośny TypeScript (props, `state`, `derived`, `handler`, style)
- Zobacz idiomatyczny wynik dla React, Vue, Svelte, Astro, Solid (oraz powiązanych shelli Nuxt / Next, gdy są pokazane)
- Skopiuj snippety albo przejdź do [CLI](/pl/docs/core-concepts/cli) w prawdziwym projekcie

Żądania kompilacji z playgroundu trafiają na tę samą chmurową powierzchnię co CLI (`compileApiUrl` → `https://cli.nucleify.io`).

---

## Co zobaczysz

| Panel | Cel |
|-------|-----|
| **Źródło** | Autorstwo przenośnego komponentu (`#nuc-compiler/runtime`) |
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

Użyj playgroundu, żeby zweryfikować reguły autorstwa zanim włączysz emit do CI albo lokalnej aplikacji.

---

## Kolejne kroki

1. Eksperymentuj na [play.nucleify.io](https://play.nucleify.io)
2. Zainstaluj CLI z [cli.nucleify.io](https://cli.nucleify.io) · [CLI](/pl/docs/core-concepts/cli)
3. Przeczytaj [Kompilator](/pl/docs/core-concepts/compiler) pod kątem IR, emitów przenośnych i konwersji produktu w monorepo

---

## Powiązane

- Playground: [play.nucleify.io](https://play.nucleify.io)
- CLI: [cli.nucleify.io](https://cli.nucleify.io) · [CLI](/pl/docs/core-concepts/cli)
- Głębsze omówienie kompilatora: [Kompilator](/pl/docs/core-concepts/compiler)
