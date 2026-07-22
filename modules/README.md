# Modules

Each folder in this directory is a separate module. A module can include:

1. **Frontend** — Vue or React UI (`constants/`, `types/`, `utils/`, `pages/`, `components/`), registered via `<module>.ts` / `<module>.react.ts` and `index.ts` barrel exports.
2. **Backend** — Supabase SQL and API handlers under `supabase/` (`migrations/`, `seeders/`, `api/handle.ts`).
3. **Tests** — `vitests/` for Vitest (frontend and composables).

See [Modules documentation](/en/docs/core-concepts/modules) for the full structure and conventions.
