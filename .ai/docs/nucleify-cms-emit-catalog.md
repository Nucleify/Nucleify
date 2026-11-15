# CMS section emit catalog

Marketing sections have **one register**: `shared_modules/nuc_cms/cms/default_section_widgets.ts`.

| Consumer | How |
|----------|-----|
| Vue pack (`registerDefaultCmsPack`) | Registers each widget + lazy SFC from `sections/<slug>/index.vue` |
| Widget metadata / seed scripts | `registerDefaultWidgets()` iterates the same list |
| Emit shells (Next / Solid / Svelte) | `cms/section_emit_catalog.ts` → re-exported by `compiler/src/sync/shell/cms-sections.ts` |

Solid sync vs lazy: `SOLID_SYNC_SECTION_TYPES` in `default_section_widgets.ts` (`hero`, `intro`, `thank_you`).

Do **not** maintain a parallel type list under `compiler/`. Add the widget to `defaultSectionWidgets`, ship the SFC, regenerate seeders if needed.
