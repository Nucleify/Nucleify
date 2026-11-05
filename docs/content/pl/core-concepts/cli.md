# CLI

CLI Nucleify (`@nucleify/cli`) to lokalny punkt wejścia dla uniwersalnych komponentów: piszesz raz w przenośnym TypeScript, emitujesz idiomatyczne UI dla **React · Vue · Svelte · Astro · Solid** bez wiązania produktu z jednym runtime frameworka.

Żywa powierzchnia produktu: [cli.nucleify.io](https://cli.nucleify.io).

---

## Instalacja

Wybierz jedną opcję:

```bash
npm install -g @nucleify/cli
```

```bash
pnpm add -g @nucleify/cli
```

```bash
npx @nucleify/cli@latest
```

Instalacja globalna sprawdza się na co dzień. `npx` wystarczy do jednorazowego uruchomienia bez instalacji globalnej.

---

## Co robi

| Zdolność | Rola |
|----------|------|
| **Emit** | Zamienia przenośne źródło komponentu na natywne pliki frameworka, które możesz commitować |
| **Skan projektu** | Przechodzi drzewo, zbiera przenośne moduły, przygotowuje żądania kompilacji |
| **Kompilacja w chmurze** | Rozmawia z usługą kompilacji Nucleify używaną przez CLI i przeglądarkowy playground |
| **Zapis z powrotem** | Wrzuca wyemitowane pliki do folderów aplikacji, żeby shell został czytelny |

CLI to **lokalna** połowa pipeline’u. Logika mapowania IR na idiomatyczne hooki React, composable Vue, runy Svelte itd. działa jako usługa - tę samą ścieżkę wykorzystuje [play.nucleify.io](https://play.nucleify.io) w przeglądarce.

---

## Typowy przebieg

1. Zainstaluj CLI (albo uruchom przez `npx`)
2. Napisz przenośne UI (albo otwórz przykład w [Playground](/pl/docs/core-concepts/playground))
3. Emituj do wybranej powłoki / powłok
4. Iteruj w frameworku, który dziś shipujesz - później zmień shell bez przepisywania logiki domenowej

Emit i konwersja produktu wewnątrz tego monorepo: zobacz [Kompilator](/pl/docs/core-concepts/compiler) (`pnpm compiler -- …`). Opublikowany pakiet `@nucleify/cli` to narzędzie instalowalne dla projektów, które konsumują Nucleify jako zależność.

---

## Powiązane

- Strona produktu: [cli.nucleify.io](https://cli.nucleify.io)
- Emit w przeglądarce: [play.nucleify.io](https://play.nucleify.io) · [Playground](/pl/docs/core-concepts/playground)
- IR / autorstwo przenośne w monorepo: [Kompilator](/pl/docs/core-concepts/compiler)
