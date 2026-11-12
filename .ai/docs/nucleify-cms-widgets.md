# CMS widgets (admin + web)

Marketing pages use `section.*` widgets from `shared_modules/nuc_admin/cms/registry.ts`.
Posts use `block.*` widgets from `shared_modules/nuc_admin/cms/post_blocks.ts`.

## Add a marketing section

1. Add defaults in `shared_modules/nuc_admin/cms/defaults/marketing_props.ts`.
2. Register a widget with `adminFields` in `cms/widgets/` and export it from `cms/registry.ts`.
3. Add the Vue section under `web/src/sections/<name>/` and map it in `web/src/cms/section_registry.ts`.
4. If emit shells need it, update `compiler/src/sync/shell/cms-sections.ts`.
5. Regenerate seeders when the section belongs on a canonical page:

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
```

## Add a post body block

1. Append a widget to `postBlockWidgets` in `cms/post_blocks.ts`.
2. Render it in `web/src/components/PostBody.vue`.

## Feature packs

Site settings globals (`featureBlog`, `featureComments`, `featureContactInbox`, `featureRedirects`) toggle admin rail entries. Web routes still exist; turn packs off to hide admin surfaces.
