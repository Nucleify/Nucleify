# @nucleify/admin

Nuxt admin app - **canonical product host** (`--target=nuxt` / default).

```bash
export PATH="$PWD/.config/bin:$PATH"
make admin
make admin --target=next      # → admin_next/
make admin -t=solid           # → admin_solid/
make admin --target=svelte    # → admin_svelte/
make admin --target=astro     # → admin_astro/
# classic (no shim): make admin TARGET=next
pnpm --filter @nucleify/admin dev
```

Alternate hosts: `make admin --target=next|solid|svelte|astro` → gitignored `admin-*`. Product convert does **not** require `*.nuc.tsx`.
