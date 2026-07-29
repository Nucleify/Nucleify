# Installation

## Ready in Under 5 Minutes

Nucleify is a **Nuxt 3** or **Next.js** frontend with a **Supabase** backend. One `make` command copies env config, installs dependencies, and starts the dev server.

---

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Node.js** | 20.x+ | `node --version` |
| **pnpm** | 9.x+ | `pnpm --version` |
| **Git** | Latest | `git --version` |
| **Supabase CLI** | Latest (for DB) | `supabase --version` |

You also need a Supabase project ([supabase.com](https://supabase.com)) or a local instance (`supabase start`).

---

## One-Command Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
```

### 2. Choose Frontend & Run

**Nuxt (default):**

```bash
make nuxt
```

**Next.js:**

```bash
make next
```

**Both** (install deps once, then pick manually):

```bash
make setup
```

---

## What `make` Does

```bash
cp .config/.env.nuxt.example .env   # or .env.next.example
pnpm install
pnpm prepare:husky
pnpm nuxt                            # or pnpm next
```

Configure Supabase keys in `.env` before using API features (see [Environment](/en/docs/configuration/environment)).

---

## Database Setup

After Supabase is running and `.env` is filled:

```bash
bash .config/bash/apply-module-migrations.sh
bash .config/bash/apply-module-sql.sh seeders
```

This merges SQL from all enabled modules under `modules/*/supabase/` and applies it to your database.

---

## Access Your Application

| Service | URL |
|---------|-----|
| **Nuxt** | `http://localhost:3000` |
| **Next** | `http://localhost:3001` (if port 3000 is taken) |
| **API gateway** | `http://localhost:3000/api/test` |
| **Supabase Studio** | Local: `http://localhost:54323` (with `supabase start`) |

---

## Troubleshooting

### Missing Supabase config

Ensure `SUPABASE_URL`, `SUPABASE_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env`.

### Port conflicts

Stop other apps on 3000/3001 or set a custom port for Next/Nuxt.

### Migration errors

Re-run merge and apply:

```bash
bash .config/bash/merge-module-supabase-sql.sh migrations
bash .config/bash/apply-module-migrations.sh
```

---

## Next Steps

1. **[Supabase](/en/docs/configuration/supabase)** — How the backend and API gateway work
2. **[Quick Start](/en/docs/getting-started/quick-start)** — Create your first component
3. **[Modules](/en/docs/core-concepts/modules)** — Module structure
