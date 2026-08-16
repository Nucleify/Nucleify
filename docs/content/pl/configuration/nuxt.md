# Konfiguracja Nuxt

Konfiguracja frontendu w `web/.config/nuxt/`, składana przez `web/nuxt.config.ts`.

## SSR i Prerendering

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

| Opcja | Opis |
|-------|------|
| `ssr` | Włącz server-side rendering |
| `prerender.routes` | Trasy do prerenderowania przy buildzie |
| `prerender.crawlLinks` | Auto-odkrywanie linków |
| `prerender.ignore` | Trasy do pominięcia |
| `minify` | Minifikacja outputu |
| `compressPublicAssets` | Kompresja Gzip/Brotli |

## Struktura katalogów

```typescript
srcDir: 'nuxt',
publicDir: './public',
```

| Opcja | Ścieżka | Opis |
|-------|---------|------|
| `srcDir` | `nuxt/` | Pliki źródłowe Nuxt |
| `publicDir` | `public/` | Statyczne assety |

## Komponenty

```typescript
components: [
  { path: '~/atomic/atom', prefix: 'ad', extensions: ['vue'] },
  { path: '~/atomic/molecule', prefix: 'ad', extensions: ['vue'] },
  { path: '~/atomic/organism', prefix: 'ad', extensions: ['vue'] },
]
```

Komponenty auto-rejestrowane z prefixem `ad-`:
- `<ad-button>`, `<ad-input-text>`, `<ad-card>`, `<ad-dialog>`

## Auto-importy

```typescript
imports: {
  dirs: ['~/composables/**', '~/atomic/**', 'modules/**'],
},
alias: {
  nucleify: '~/atomic',
},
```

Wszystkie eksporty z tych katalogów są auto-importowane. Użyj aliasu `nucleify`:

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

Dostęp w komponentach:

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

Komponenty Lit (`nui-*`) rejestruje plugin `nuxt/plugins/nucleify-ui.client.ts` (`applyTheme`, style globalne). Custom elements `nui-` są ustawione w Vite (`isCustomElement`).

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

Ręczne chunki dla optymalnego code splitting i cache. Stan: **Pinia** (Nuxt) z `pinia-plugin-persistedstate`; **Zustand** (Next.js) przez `nuc_stores`.

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

Globalne importy SCSS dostępne we wszystkich komponentach.

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

## Ikony

```typescript
icon: {
  prefix: 'i-prime',
  mode: 'css',
},
```

Użyj ikon z prefixem `i-prime`:

```html
<Icon name="i-prime:check" />
```

Dostępne pod `http://localhost:6006` po odpaleniu Nuxta.

## Supabase Auth

```typescript
// runtimeConfig.public — SUPABASE_URL, SUPABASE_KEY
```

Autentykacja przez **Supabase Auth** (sesje JWT). Klient konfigurowany w `nuc_client` / `getSupabaseClient()`.

## Experimental

```typescript
experimental: {
  payloadExtraction: true,
  renderJsonPayloads: true,
},
```

Optymalizacje wydajności dla obsługi payloadu.

## Vitalizer

```typescript
vitalizer: {
  disableStylesheets: 'entry',
},
```

Opóźnia ładowanie niekrytycznego CSS dla lepszych Core Web Vitals.
