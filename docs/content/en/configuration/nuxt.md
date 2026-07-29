# Nuxt Configuration

Frontend configuration in `.config/nuxt.config.ts`, re-exported from root `nuxt.config.ts`.

## SSR & Prerendering

```typescript
ssr: process.env.SSR === 'true',
nitro: {
  prerender: {
    routes: process.env.PRERENDER_ROUTES?.split(',') || [],
    crawlLinks: process.env.PRERENDER_CRAWL_LINKS === 'true',
    ignore: process.env.PRERENDER_IGNORE?.split(',') || [],
  },
  output: { publicDir: './public/build' },
  minify: true,
  compressPublicAssets: true,
},
```

| Option | Description |
|--------|-------------|
| `ssr` | Enable server-side rendering |
| `prerender.routes` | Routes to prerender at build |
| `prerender.crawlLinks` | Auto-discover links |
| `prerender.ignore` | Routes to skip |
| `minify` | Minify output |
| `compressPublicAssets` | Gzip/Brotli compression |

## Directory Structure

```typescript
srcDir: 'nuxt',
publicDir: './public',
```

| Option | Path | Description |
|--------|------|-------------|
| `srcDir` | `nuxt/` | Nuxt source files |
| `publicDir` | `public/` | Static assets |

## Components

```typescript
components: [
  { path: '~/atomic/atom', prefix: 'ad', extensions: ['vue'] },
  { path: '~/atomic/molecule', prefix: 'ad', extensions: ['vue'] },
  { path: '~/atomic/organism', prefix: 'ad', extensions: ['vue'] },
]
```

Components auto-registered with `ad-` prefix:
- `<ad-button>`, `<ad-input-text>`, `<ad-card>`, `<ad-dialog>`

## Auto-imports

```typescript
imports: {
  dirs: ['~/composables/**', '~/atomic/**', 'modules/**'],
},
alias: {
  nucleify: '~/atomic',
},
```

All exports from these directories are auto-imported. Use `nucleify` alias:

```typescript
import { useAuth, type UserInterface } from 'nucleify'
```

## Runtime Config

```typescript
runtimeConfig: {
  public: {
    appUrl: process.env.APP_URL,
    apiUrl: process.env.API_URL,
    appEnv: process.env.APP_ENV,
  },
},
```

Access in components:

```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
```

## App Head

```typescript
app: {
  head: {
    htmlAttrs: { lang: 'en' },
    title: 'Nucleify - Modular Web Framework',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '...' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
},
```

## UI (`nucleify-ui`)

Lit web components (`nui-*`) are registered by `nuxt/plugins/nucleify-ui.client.ts` (`applyTheme`, global styles). Custom elements matching `nui-` are configured in Vite (`isCustomElement`).

## Vite Build

```typescript
vite: {
  build: {
    chunkSizeWarningLimit: 1600,
    minify: 'terser',
    cssCodeSplit: true,
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', '@unhead/vue'],
          pinia: ['pinia', 'pinia-plugin-persistedstate'],
          chartjs: ['chart.js'],
          gsap: ['gsap'],
          marked: ['marked'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
},
```

Manual chunks for optimal code splitting and caching. State management: **Pinia** (Nuxt) with `pinia-plugin-persistedstate`; **Zustand** (Next.js) via `nuc_stores`.

## SCSS

```typescript
vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/assets/index";`,
        silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin'],
      },
    },
  },
},
```

Global SCSS imports available in all components.

## Google Fonts

```typescript
googleFonts: {
  families: {
    Inter: '300..700',
    Nunito: '300..700',
  },
  display: 'swap',
  subsets: ['latin'],
},
```

## Icons

```typescript
icon: {
  prefix: 'i-prime',
  mode: 'css',
},
```

Use icons with `i-prime` prefix:

```html
<Icon name="i-prime:check" />
```

## Supabase Auth

Authentication uses **Supabase Auth** (JWT sessions). The client is configured via `nuc_client` / `getSupabaseClient()` using `runtimeConfig.public.supabaseUrl` and `supabaseKey`.

Login and registration flows live in `nuc_users` (`auth/`); the server API gateway uses `SUPABASE_SERVICE_ROLE_KEY` from private runtime config.

See [Supabase](/en/docs/configuration/supabase) for the full auth and API flow.

## Experimental

```typescript
experimental: {
  payloadExtraction: true,
  renderJsonPayloads: true,
},
```

Performance optimizations for payload handling.

## Vitalizer

```typescript
vitalizer: {
  disableStylesheets: 'entry',
},
```

Defers non-critical CSS loading for better Core Web Vitals.
