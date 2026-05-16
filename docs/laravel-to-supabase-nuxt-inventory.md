# Laravel to Supabase Inventory (Nuxt-first)

## Runtime and Config Entries
- `.config/nuxt/runtime.ts`: legacy backend URLs (`APP_URL`, `API_URL`) used by Nuxt runtime.
- `.config/nuxt/modules.ts`: Laravel-specific auth integration via Sanctum module.
- `.config/nuxt/auth.ts`: Sanctum API target.

## Nuxt Consumption Points
- `nuxt/composables/config/use.ts`: central accessor used by modules (`apiUrl`, `appUrl`).
- `nuxt/pages/[lang]/[...slug].vue`: page-builder render request made against `apiUrl`.
- `nuxt/app.vue`: consumes shared module side effects and app URL in canonical links.

## Shared Modules Calling Backend Endpoints
- `modules/nuc_colors/atomic/boson/utils/sync_colors_with_database.ts`
- `modules/nuc_colors/atomic/boson/utils/update_user_colors_in_database.ts`
- `modules/nuc_openapi/resources/views/swagger.js`

## Migration Order (Nuxt-first)
1. Auth and user context (Supabase Auth + RLS claims checks).
2. API request abstraction and error mapping.
3. File/storage interactions.
4. Data-heavy modules (charts, reports).
5. Settings/admin modules.
6. Remaining helper modules.

## Decommission Targets
- Laravel runtime and module backend layers after endpoint parity is complete.
- Sanctum integration and any Laravel-specific environment variables.
