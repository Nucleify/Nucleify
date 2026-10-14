# @nucleify/admin

Nuxt admin app — **canonical product shell** (`TARGET=nuxt`).

```bash
make admin
make admin TARGET=nuxt
make admin TARGET=next      # → admin-next/
make admin TARGET=solid     # → admin-solid/
make admin TARGET=svelte    # → admin-svelte/
pnpm --filter @nucleify/admin dev
```

Alternate shells: `make admin TARGET=next|solid|svelte` → gitignored `admin-next/` / `admin-solid/` / `admin-svelte/`.
