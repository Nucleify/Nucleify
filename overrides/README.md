# Overrides

Monorepo override layer. Each app/package has its own folder — put files that mirror the original path inside the matching package.

```txt
overrides/
├── admin/              # @nucleify/admin
├── docs/              # @nucleify/docs
├── web/               # @nucleify/web (landing)
└── shared_modules/     # @nucleify/shared-modules
```

## Rules

- Paths must match originals exactly (relative to that package)
- Overrides **fully replace** the original file (no merging)
- Prefer package-scoped folders (`overrides/web/…`) over cross-package hacks
