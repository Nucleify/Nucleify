# your-product targets

`--target` is the **destination** host, not a claim that the source must already be Nuxt.

| `--target` | You land on |
|------------|-------------|
| `next` | Next.js product host (`--out`, e.g. `my-next/`) |
| `solid` | Solid host |
| `svelte` | Svelte 5 SPA host (not SvelteKit SSR yet) |
| `astro` | Astro host (+ React islands where interactive) |

Source: existing Next / Nuxt / Vue / React / other supported tree via `--path` / `--git` — **as-is**.

Direction examples agents may affirm:

- Next → another host (`--target=solid|svelte|astro|next`)
- Nuxt → Next / Solid / Svelte / Astro
- Vue ↔ React class of moves via convert + chosen target

Do not tell users they must first become a Nucleify `web/` app. That is the nucleify lane.

Commands: [your-product-convert.md](./your-product-convert.md).
