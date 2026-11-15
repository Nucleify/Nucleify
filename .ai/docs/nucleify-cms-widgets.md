# CMS widgets (admin + web)

Marketing pages use `section.*` widgets from `shared_modules/nuc_cms`.
Posts use `block.*` widgets from `shared_modules/nuc_cms/cms/post_blocks.ts`.
Page frames (`rail`, `bare`, …) live in the page-template registry.
Public frame runtime (`CmsFrame`, menus, composables, frame motion/SCSS) also lives in `nuc_cms`; `web` layouts/pages are thin hosts.

## Add a marketing section

1. Add defaults in `shared_modules/nuc_cms/cms/defaults/marketing_props.ts`.
2. Add a widget with `adminFields` under `cms/widgets/` and append it to `defaultSectionWidgets` in `cms/default_section_widgets.ts` (one register for Vue pack + emit).
3. Add the Vue section at `shared_modules/nuc_cms/sections/<name>/index.vue` (`webComponentKey` must be `sections/<name>`). `registerDefaultCmsPack()` loads it via `import.meta.glob`; emit shells read `cms/section_emit_catalog.ts` (no hand edit of `compiler/.../cms-sections.ts`).
4. Regenerate seeders when the section belongs on a canonical page:

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
```

## Add a page template

1. Implement chrome (`rail` / `shear`) under `shared_modules/nuc_cms/templates/`; section parts (`holo_cube`, `module_board`) under `parts/`.
2. Call `registerPageTemplate({ id, label, frameEffects, Rail?, Shear? })` from `registerDefaultCmsPack()` (or your pack).
3. Pick the template on the page document (`cms_documents.template` / admin Page template field).

## Add a post body block

1. Append a widget to `postBlockWidgets` in `cms/post_blocks.ts`.
2. Render it in `shared_modules/nuc_cms/components/post_body.vue`.

## Feature packs

Site settings globals (`featureBlog`, `featureComments`, `featureContactInbox`, `featureRedirects`) toggle admin rail entries. Web routes still exist; turn packs off to hide admin surfaces.

## Shared section composables / utils

Prefer these over inlining timers, breakpoint CSS, or contact-form state in SFC scripts:

| Helper | Role |
|--------|------|
| `useBreakpointPanel` / `useCubeVisibility` | Cube/glance visibility + CSS class maps |
| `useHoloCubeFocus` | Cube face focus + optional auto-rotate |
| `useAutoRotateIndex` | Carousel index (stack, module board) |
| `useRespectfulInterval` | Client interval with reduced-motion / audit skip |
| `useContactFormPanel` | Open/close commerce form (home `close`, investor `ask`) |
| `scrollFrameTo` | In-frame section scroll |
| `holoCubeFaces` / `breakpoint_panel` / `nui_tooltip_copy` / `roving_tab_keydown` | Pure helpers |

Re-exported from `cms/use_section_props.ts` (via `nuc_cms` / `@shared_modules`) where sections already pull CMS helpers.
