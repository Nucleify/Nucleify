# @nucleify/shared-modules

Thin shared surface used by `web/`, `admin/`, `docs/` (and convert hosts).

**Not a migrate gate.** External apps convert **as-is** without a prior `shared_modules` refactor - see [Migrate FAQ](https://docs.nucleify.io/en/docs/getting-started/migrate-faq).

Currently absorbed (not git submodules):

- `nuc_api`
- `nuc_colors`
- `nuc_dark_mode`
- `nuc_globals`
- `nuc_languages`
- `nuc_stores`

Apps import from here directly (or via the `modules` alias → this package). There is no app-local `modules/` copy.
