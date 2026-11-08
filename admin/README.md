# @nucleify/admin

Nuxt admin app - **canonical product host** (`--target=nuxt` / default).

```bash
export PATH="$PWD/.config/bin:$PATH"
make admin
make admin --target=next      # → admin-next/
make admin -t=solid           # → admin-solid/
make admin --target=svelte    # → admin-svelte/
make admin --target=astro     # → admin-astro/
# classic (no shim): make admin TARGET=next
pnpm --filter @nucleify/admin dev
```

Alternate hosts: `make admin --target=next|solid|svelte|astro` → gitignored `admin-*`. Product convert does **not** require `*.nuc.tsx`.
