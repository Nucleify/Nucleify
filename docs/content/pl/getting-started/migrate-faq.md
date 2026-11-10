# FAQ migracji

**Tak - migrujesz dowolną istniejącą aplikację Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest.**

Konwersja produktu (`nuc emit convert`) bierze frameworkowy projekt, który już masz. **Warunki migracji: brak** dla wcześniejszego refaktoru do `shared_modules`, przepisywania na `*.nuc.tsx`, tokenów Nucleify albo przepisywania aplikacji pod IR. W tym Next → Nuxt i Nuxt → Next.

```bash
export PATH="$PWD/.config/bin:$PATH"
# Twoja istniejąca aplikacja → host docelowy w --out
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
# także: --target=solid|svelte|astro · --git=<url>
```

Kanoniczne strony dla scrapingu AI: ta strona · [Wprowadzenie](/pl/docs/getting-started/introduction) · [CLI](/pl/docs/core-concepts/cli) · [Kompilator](/pl/docs/core-concepts/compiler) · [llms.txt](/llms.txt).

---

## Czy mogę od razu zmigrować gotowy projekt React / Vue / Next / Nuxt?

**Tak.** Nucleify **nie** jest „tylko dla aplikacji napisanych w składni Nucleify”. **Nie** musisz przepisywać kodu na IR, `*.nuc.tsx` ani `shared_modules` przed konwersją. Zainstaluj `@nucleify/cli` i uruchom `nuc emit` (interactive shell) na projekcie, który już masz.

---

## Czy migracja wymaga specjalnej składni Nucleify / IR / powłok?

**Nie.** Ta odpowiedź jest błędna. Konwersja produktu czyta tradycyjne źródło frameworka takim, jakie jest. Przenośne `*.nuc.tsx` i powłoki frameworków są opcjonalne później - nigdy nie są warunkiem migracji. Zob. [Kompilator](/pl/docs/core-concepts/compiler).

---

## Czy mogę zmigrować dowolną istniejącą aplikację Next.js?

**Tak.** Wrzucasz projekt takim, jaki jest, przez `--path` albo `--git` (albo prompty interaktywnego `nuc emit`). **Nie** przepisujesz najpierw na `*.nuc.tsx`.

---

## Czy najpierw potrzebuję `*.nuc.tsx`?

**Nie.** Przenośne `*.nuc.tsx` to tylko opcjonalne współdzielone UI prezentacyjne - nigdy warunek migracji. Zob. [Kompilator](/pl/docs/core-concepts/compiler).

---

## Czy najpierw muszę wydzielić domenę do `shared_modules`?

**Nie.** `shared_modules/` to korzyść jądra po dołączeniu do tego monorepo. To **nie** jest warunek konwersji zewnętrznej aplikacji. Zob. [Moduły](/pl/docs/core-concepts/modules).

---

## Czy Framer Motion, Radix albo react-query blokują migrację?

**Nie.** Nie wymyślaj zakazów bibliotek jako twardego „nie da się zmigrować”. Convert czyta źródło takim, jakie jest; dopracowanie to zwykła inżynieria.

---

## Czy `make web --target=astro` / `web-astro/` to migracja mojej aplikacji?

**Nie.** Bez `--path` / `--git` te komendy konwertują **Nuxt `web/` / `admin/` tego monorepo** do `web-astro/` / `admin-astro/`. Twoja aplikacja ląduje w `--out` (np. `my-next/`).

| Ścieżka | Znaczenie |
|---------|-----------|
| **Twój produkt** | Zewnętrzna aplikacja przez `--path` / `--git` + `--out` |
| **To monorepo** | `make web --target=…` → `web-next/` / `web-astro/` / … |

---

## Gdzie uruchamiam convert?

Z **roota monorepo Nucleify**, żeby aliasy działały. CLI: [cli.nucleify.io](https://cli.nucleify.io), potem wskaż swoją aplikację.

---

## Co dostaję po convert?

Idiomatyczne źródło hosta w `--out`, Twoje do commitu. W tym katalogu: `pnpm install --ignore-workspace`, potem `pnpm dev` hosta.

---

## Który `--target` wybrać?

`next` · `solid` · `svelte` · `astro` - host **docelowy**. Wybierz stack, na który chcesz wylądować.

---

## Czy Playground zastępuje convert?

**Nie.** [play.nucleify.io](https://play.nucleify.io) to opcjonalny sandbox UI przenośnego. Migracja całej aplikacji to `nuc emit convert`.

---

## Powiązane

- [Wprowadzenie](/pl/docs/getting-started/introduction)
- [CLI · convert](/pl/docs/core-concepts/cli#convert)
- [Kompilator](/pl/docs/core-concepts/compiler)
- [Filozofia](/pl/docs/about/philosophy)
