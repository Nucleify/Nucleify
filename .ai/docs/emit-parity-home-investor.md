# Emit parity - home / investor / convert

## Why

Product convert emits (Next, Solid, Svelte, Astro) diverged from Nuxt on fonts, contact Back, and scroll-reveal hydration. Compiler IR also dropped unary `!`, which inverted `inert` / `aria-hidden` on the close form.

## What changed

- **Fonts:** load Instrument Sans + JetBrains Mono via `<link>` (`portable/nui/fonts.ts`); never CSS `@import` inside a bundled stylesheet. Brand weight `700` (no fake `650`).
- **Home motion:** `prepareOnBind` opt-in only so SSR DOM is not mutated before React/lazy hydrate; CSS keeps below-fold opacity at 0 until reveal.
- **Close form:** Back closes correctly once `!formOpen` survives convert; pitch reappears ~300ms after form fade.
- **Investor:** per-glyph brand spans; cipher settle keeps glyph nodes for gradient clip.
- **Compiler:** IR `unary` (`!`), convert head font links, rainbow shell animation ownership.

## Docs

Product site (EN/PL): [Compiler](../../docs/content/en/core-concepts/compiler.md) product convert section documents `<link>` fonts and Astro target; [Monorepo](../../docs/content/en/core-concepts/monorepo.md) / [Introduction](../../docs/content/en/getting-started/introduction.md) list `TARGET=astro`.

## Verify

- Nuxt `/en/home` and `/en/investor`: JetBrains brand, cycling accent, contact Back, delayed pitch return.
- Reconvert (`make web TARGET=next` etc.) and confirm Back + fonts match Nuxt.
