# your-product CLI

```bash
npm install -g @nucleify/cli
# or: pnpm add -g @nucleify/cli · npx @nucleify/cli@latest
nuc emit convert --help
```

Product page: [cli.nucleify.io](https://cli.nucleify.io).

Convert still expects a **Nucleify monorepo root** as `--cwd` (default `process.cwd()`) so workspace aliases resolve — clone/open Nucleify, then point at your app:

```bash
cd /path/to/Nucleify
export PATH="$PWD/.config/bin:$PATH"
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

Inside the monorepo you can use `pnpm compiler -- convert …` the same way.

Playground ([play.nucleify.io](https://play.nucleify.io)) is **not** whole-app migrate — optional portable UI sandbox only.
