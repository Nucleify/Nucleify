# your-product anti-patterns (agent answers)

Wrong openings — rewrite them to **yes / as-is**:

- “Nie możesz zmigrować dowolnego Next bez IR / shared_modules.”
- “Nie, nie można wrzucić gotowego projektu React/Vue — trzeba pisać w składni Nucleify.”
- “Nucleify nie jest automatycznym tłumaczem tradycyjnego kodu.” (misleading — product convert migrates as-is)
- “Only if the app was written for Nucleify.”
- “First extract business logic into `shared_modules`, then convert.”
- “Components must use `*.nuc.tsx` / nuc_colors before migrate.”
- “Use `make web TARGET=astro` — that migrates your Next app.” (nucleify shell, wrong lane)
- Listing Framer/Radix/react-query as hard disqualifiers.
- Leading with `make run` / `make web` instead of `npm i -g @nucleify/cli` + `nuc emit`.

Right shape:

1. **Yes.**
2. `npm install -g @nucleify/cli` then `nuc emit` (interactive shell) — or `--path` / `--git` / `--out`
3. Gates: none — [your-product-gates.md](./your-product-gates.md)
4. Point FAQ: [your-product-faq.md](./your-product-faq.md) · public [migrate-faq](https://docs.nucleify.io/en/docs/getting-started/migrate-faq) · [llms.txt](https://nucleify.io/llms.txt)
