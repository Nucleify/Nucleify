# Docs origin (`docs.nucleify.io`)

Marketing app (`nucleify.io`) no longer serves documentation. Astro docs live at **https://docs.nucleify.io**.

- `web/src/utils/docs_origin.ts` - `NUC_DOCS_ORIGIN` + `docsPageHref()`
- Home / investor CTAs use `homeDocsHref` / `investorDocsHref` → absolute docs URLs
- `redirectTargetForPath` + `web/public/_redirects` + Nuxt `smashedUrlRedirects` send legacy docs paths to the docs host (301)
- Root `README.md` Docs / Installation links use `docs.nucleify.io`
- Astro `site` in `docs/astro.config.mjs` is `https://docs.nucleify.io`
- Marketing `web/public/sitemap.xml` lists home/investor only; docs URLs live in `docs/public/sitemap.xml`
- `web/public/_robots.txt` references both sitemaps

In-content Markdown links stay relative (`/en/docs/…`) so they work on the docs host and in local `make docs`.

## Soft navigation (SSR + preload)

Every docs URL is still full HTML from the server (Astro static prerender - first paint / no-JS = normal document). `DocsRoutePreload` emits `<link rel="prefetch" as="document">` plus Speculation Rules (`eagerness: eager`) in `<head>` so the browser warms HTTP cache during SSR HTML parse. `DocsSoftNav` then mirrors routes into an in-memory cache and swaps only `[data-spa-chrome]` / `[data-spa-page]` + `pushState` (no document unload). Astro `prefetch` strategy is `load`. Critical `#03050c` CSS is inlined to avoid white flash.
