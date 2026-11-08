# Installation

Get the Nucleify monorepo running on your machine.

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | ≥ 20 | Required by root `package.json` |
| **pnpm** | 10.x | Workspace manager (`packageManager: pnpm@10.33.0`) |
| **Git** | any recent | Clone the repository |
| **Make** | any | Workspace shortcuts from the root `Makefile` (`make help`) |
| **Supabase CLI** | optional | Only if you run a local Supabase stack |
| **`@nucleify/cli`** | optional | Published `nuc emit` binary ([cli.nucleify.io](https://cli.nucleify.io)) |

---

## Clone the repository

```bash
git clone --recurse-submodules https://github.com/Nucleify/Nucleify.git
cd Nucleify
# Private `compiler/` submodule: needs access to Nucleify/nucleify-compiler
```

---

## First-time setup

From the repo root, run:

```bash
export PATH="$PWD/.config/bin:$PATH"   # make web --target= / -t=
make run
```

This command:

1. **Creates `.env`** - copies `web/.config/.env.example` to the repo root if `.env` is missing
2. **Installs dependencies** - `pnpm install` across all workspace packages
3. **Prepares Husky** - git hooks for lint and test checks
4. **Prepares web** - `pnpm --filter @nucleify/web prepare`
5. **Syncs Cursor rules** - `pnpm sync-rules`
6. **Builds the compiler** - `pnpm compiler:check` + `pnpm compiler:build` (emits Vue / React / Solid / Svelte siblings; skip with `SKIP_COMPILER=1 make run`)

If you already have a `.env` file, use `make setup` instead - same steps without overwriting environment config.

---

## Environment variables

After `make run`, edit the root `.env` and fill in at minimum:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The API gateway in `web/src/server/api/[...slug].ts` requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for module routes. Without them, smoke endpoints (`/api`, `/api/test`) still work, but domain handlers return 503.

See [Environment](/en/docs/configuration/environment) for the full variable reference.

---

## Verify the installation

Start the landing app:

```bash
make web
```

Open [http://localhost:7777](http://localhost:7777). The default locale redirect sends you to `/en/home`. Admin runs on [http://localhost:8888](http://localhost:8888) via `make admin`.

Other packages and convert:

```bash
make help                 # commands, -t / --target, variables
make admin                # admin panel (Nuxt)
make docs                 # documentation site (Astro)
make compiler             # compiler check + build only
make web --target=next    # product convert → web-next/ (needs PATH shim)
nuc emit convert web --target=next   # same convert via published CLI
```

---

## Workspace packages

The monorepo uses pnpm workspaces. Filter commands when you need a specific package:

```bash
pnpm --filter @nucleify/web dev
pnpm --filter @nucleify/admin dev
pnpm --filter @nucleify/docs dev
```

Root shortcuts mirror the Makefile:

| Script | Package |
|--------|---------|
| `pnpm dev` | `@nucleify/web` |
| `pnpm admin` | `@nucleify/admin` |
| `pnpm docs` | `@nucleify/docs` |
| `pnpm compiler` | `@nucleify/compiler` CLI |

---

## Optional: local Supabase

If you develop against a local Supabase instance:

```bash
# Apply merged module migrations, factories, and seeders
pnpm supabase:setup:local
```

SQL from all modules is merged by `.config/bash/merge-module-supabase-sql.sh`. Details: [Supabase](/en/docs/configuration/supabase).

---

## Troubleshooting

### Compiler fails on setup

Skip compiler codegen during bootstrap:

```bash
SKIP_COMPILER=1 make run
make compiler   # run manually once deps are stable
```

### Port already in use

`web/` defaults to port `7777` (`WEB_PORT`); `admin/` to `8888` (`ADMIN_PORT`). Override in `.env` or stop the conflicting process.

### Missing Supabase errors in API routes

Ensure `.env` is at the **repo root** (not inside `web/`). Nuxt loads it via `web/.config/nuxt/load-env.ts`, which reads the monorepo root `.env`.

### pnpm version mismatch

Install the version pinned in `package.json`:

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
```

---

## Next steps

- [Quick Start](/en/docs/getting-started/quick-start) - tour the repo and common workflows
- [Web & Admin Configuration](/en/docs/configuration/web) - Nuxt config split and aliases
- [Monorepo Layout](/en/docs/core-concepts/monorepo) - directory reference
