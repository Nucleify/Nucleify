# Docs origin (`docs.nucleify.io`)

Marketing app (`nucleify.io`) no longer serves documentation. Astro docs live at **https://docs.nucleify.io**.

- `web/src/utils/docs_origin.ts` — `NUC_DOCS_ORIGIN` + `docsPageHref()`
- Home / investor CTAs use `homeDocsHref` / `investorDocsHref` → absolute docs URLs
- `redirectTargetForPath` + `web/public/_redirects` + Nuxt `smashedUrlRedirects` send legacy docs paths to the docs host (301)
- Root `README.md` Docs / Installation links use `docs.nucleify.io`
- Astro `site` in `docs/astro.config.mjs` is `https://docs.nucleify.io`
- Marketing `web/public/sitemap.xml` lists home/investor only; docs URLs live in `docs/public/sitemap.xml`
- `web/public/_robots.txt` references both sitemaps

In-content Markdown links stay relative (`/en/docs/…`) so they work on the docs host and in local `make docs`.

## Soft navigation

Docs use Astro `ClientRouter` (view transitions) + `prefetch` so sidebar/home links swap content without a full MPA reload. Brand mark uses `transition:persist`. Critical `#03050c` CSS is inlined to avoid white flash.
