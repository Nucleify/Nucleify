# Overriding

Overrides let you replace any file in `web/`, `admin/`, `docs/`, or `shared_modules/` without editing the original. At build time, Nuxt resolves the override path instead of the source path.

Overrides are **Nuxt-only**. They do not apply to the compiler import cycle, Astro in production builds outside Nuxt, or generated `web-next/` unless separately configured.

---

## How it works

1. Mirror the original file path under `overrides/{package}/`
2. Nuxt dev/build scans `overrides/` at startup
3. When a match exists, the override **fully replaces** the original — no merge, no partial patch

```txt
Original:  web/src/composables/useAuth.ts
Override:  overrides/web/src/composables/useAuth.ts
```

---

## Directory layout

```txt
overrides/
├── web/
│   └── src/…               # mirrors web/src/…
├── admin/
│   └── src/…
├── docs/
│   └── src/…
└── shared_modules/
    └── nuc_colors/…
```

Each subdirectory has a `README.md` with examples for that package.

---

## Examples

### Override a landing page section

```txt
Original:  web/src/pages/home/index.vue
Override:  overrides/web/src/pages/home/index.vue
```

Use when you fork branding or layout for a white-label deployment while keeping the upstream `web/` tree intact.

### Override a composable

```txt
Original:  web/src/composables/useAuth.ts
Override:  overrides/web/src/composables/useAuth.ts
```

Use when auth flow differs per deployment but the rest of the app stays the same.

### Override a module API handler

```txt
Original:  shared_modules/nuc_colors/supabase/api/handle.ts
Override:  overrides/shared_modules/nuc_colors/supabase/api/handle.ts
```

Use when backend behavior must diverge without forking the entire `nuc_colors` module.

### Override docs layout

```txt
Original:  docs/src/layouts/DocsLayout.astro
Override:  overrides/docs/src/layouts/DocsLayout.astro
```

Note: Astro override resolution depends on your docs build setup — verify in dev after adding the file.

---

## Debugging overrides

When behavior differs from what you expect in source:

1. Check `overrides/{package}/` for a path matching the file you are reading
2. Temporarily rename or remove the override to confirm it is the active version
3. Remember: overrides shadow **entire files** — a one-line change still requires copying the full file

---

## What overrides are not

| Concern | Override? | Alternative |
|---------|-----------|-------------|
| Portable component emit | No | Edit `*.nuc.tsx`, run `pnpm compiler:build` |
| Import emit back to authoring | No | `pnpm compiler -- import --from=vue\|react` |
| Next.js generated shell | No* | Edit `web/`, convert with `make web TARGET=next` |
| Environment-specific config | No | Root `.env`, `web/.config/nuxt/runtime.ts` |
| Database schema | No | Module migrations in `shared_modules/nuc_*/supabase/` |

\*Unless you add separate override tooling for Next — not part of the default Nuxt override scanner.

---

## Best practices

1. **Keep overrides small in count** — many overrides make upgrades hard
2. **Document why** — add a comment at the top of override files explaining the fork reason
3. **Prefer modules** — if multiple apps need the change, extend `shared_modules/` instead
4. **Sync upstream** — when merging upstream Nucleify changes, diff override files against originals
5. **Do not commit secrets** — overrides are source files; use `.env` for keys

---

## Related docs

- [Monorepo Layout](/en/docs/core-concepts/monorepo) — `overrides/` in context
- [Modules](/en/docs/core-concepts/modules) — when to extend a module vs override
- [Compiler](/en/docs/core-concepts/compiler) — overrides excluded from import cycle
