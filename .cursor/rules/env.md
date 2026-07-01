---
description: Environment variables for Nuxt, Next, and Supabase
globs: .config/.env*,nuxt.config.ts,next/**/*
alwaysApply: false
---

# Environment Variables

Example files: `.config/.env.nuxt.example`, `.config/.env.next.example`, `.config/.env.ci.example`, `.config/.env.test.example`.

## App

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_ENV` | `local` | Environment (`local`, `production`, `testing`) |
| `APP_DEBUG` | `true` | Debug flag |
| `APP_FRONTEND` | `nuxt` | Active frontend (`nuxt` or `next`) |
| `NUXT_PUBLIC_APP_URL` | `http://localhost:3000` | Public app URL |

## Supabase

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_KEY` | Anon/public key (client-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **server only**, never expose to client |
| `SUPABASE_EDGE_BASE` | Optional edge functions base URL |

## Nuxt (`nuxt.config.ts`)

| Variable | Example | Description |
|----------|---------|-------------|
| `SSR` | `true` | Server-side rendering |
| `PRERENDER_ROUTES` | `/home,/login,…` | Comma-separated prerender routes |
| `PRERENDER_CRAWL_LINKS` | `true` | Crawl links when prerendering |
| `PRERENDER_IGNORE` | `/settings` | Routes to skip |
| `PRERENDER_LOCALES` | `en,pl,vn` | Locales for prerender |
| `NITRO_PRESET` | `cloudflare` | Nitro deployment preset |

## Submodules

| Variable | Example | Description |
|----------|---------|-------------|
| `NUC_SUBMODULES_BRANCH` | `main` | Branch for `prepare-submodules` |
| `NUC_SUBMODULES_CHECK` | `1` | Skip existing dirs when set |

## Other

| Variable | Description |
|----------|-------------|
| `NUC_ALLOWED_ORIGINS` | CORS allowlist |
| `NUC_ALLOWED_ORIGINS_PATTERNS` | CORS pattern allowlist |
| `NUC_CONVERT_DOCUMENTS_URL` | External document conversion service |
