# Admin roles RBAC — security tests

## Split

| Layer | Tool | Proves |
|-------|------|--------|
| Unit / handler | Vitest | Gate logic, Owner lock, upsert mirror (mocked Supabase) |
| Live HTTP | `./pentest/run` | Anon authz, verbs, static, fingerprint, headers, CORS, traversal, cache, pressure |

## Vitest

```bash
pnpm exec vitest run --project shared roles_api_sec roles_pentest_matrix permissions
```

## Live probes

```bash
pnpm admin
./pentest/run probe          # or: pnpm pentest
./pentest/run probe rbac     # or: pnpm pentest:rbac
./pentest/run list
./pentest/run show
```

Env: `NUC_PROBE_BASE` (default `http://localhost:8888` — Nuxt binds `[::1]`, not `127.0.0.1`), optional `NUC_PROBE_TOKEN`.  
Prod hosts need `NUC_PROBE_CONFIRM_PROD=1`.  
JSON: `pentest/out/latest.json`. Transcripts: `pentest/logs/latest.{log,txt}`.

Specs: `.ai/specs/plan.17…`, `.ai/specs/plan.18…`.
