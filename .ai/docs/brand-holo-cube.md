# Brand - holo-cube + favicon

## Canonical marks

| Asset | Role |
|-------|------|
| `web/public/img/holo-cube.svg` | Classic holo wireframe (READMEs, schema-org, OG source) |
| `web/public/img/favicon.svg` | Tab / apple / docs chrome - face colors: top green, left turquoise, right pink, bottom tip blue; transparent bg |
| `web/public/favicon.ico` | RGBA multi-size ICO from `favicon.svg` |

`favicon` viewBox: `20 22 160 160`.

## Synced copies

- `web/public/img/logo.svg` / `logo.png` - logo alias (may still be classic holo; docs UI uses `favicon.svg`)
- `docs/public/img/favicon.svg` + `favicon.ico` + `logo.svg` / `logo.png` (logo aliased to favicon for docs)
- `docs/public/img/holo-cube.svg` - synced from web classic mark

## Wired in

- Nuxt: `web/.config/nuxt/app.ts` → favicon.svg + favicon.ico
- Docs: `DocsLayout.astro`, `index.astro` → favicon.svg (icon, apple-touch, header, home mark)
- Package READMEs / root README may still reference `holo-cube.svg`
