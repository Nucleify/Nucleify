# your-product convert

Same `convert` CLI as Nucleify, pointed at an **external** tree.

| Flag | Role |
|------|------|
| `--path=<dir>` | Existing app folder (`src/` required) |
| `--git=<url>` | Shallow clone as source |
| `--out=<name>` | Output dir under monorepo root |
| `--target=` | `next` \| `solid` \| `svelte` \| `astro` |
| `--force` | Wipe and recreate |

Pass only one of `--path` or `--git`. Run from the **Nucleify monorepo root**.

```bash
export PATH="$PWD/.config/bin:$PATH"
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert web --target=astro --git=https://github.com/org/app.git --out=fork-astro --force
# or: pnpm compiler -- convert …
```

**Gates: none** for `*.nuc.tsx`, `shared_modules` refactor, tokens, or IR-first rewrite of the app.

Nucleify’s own `web-astro/` / `admin-next/` are a different lane: [nucleify-convert.md](./nucleify-convert.md).
