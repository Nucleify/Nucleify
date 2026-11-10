# nucleify emit barrels (`web-*` / `admin-*`)

Converted hosts import via `@web`, `@shared_modules`, `@portable`.

- `@web` → local `src/web-host.ts` (not Nuxt `web/src/index.ts`)
- `@shared_modules` → `shared_modules/index.host.ts` on convert hosts
- Shims (`useReactive`, Astro params/router, Solid `useRef`) re-exported from `@web`

```bash
pnpm compiler -- convert web --target=astro --force
```
