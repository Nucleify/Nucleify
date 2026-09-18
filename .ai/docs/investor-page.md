# Investor page (`/{lang}/investor`)

## What
Full-viewport investor pitch at `web/src/pages/investor/`, routed via `web/src/pages/[lang]/investor.vue`. Same marketing shell as home (shear / iris / rail snap / wipe reveals / rainbow accents).

## Sections
1. **Intro** — brand pitch + modeled savings dial  
2. **Thesis** — rewrite / stack-churn tax  
3. **Savings** — illustrative eng-week & $ model (labeled, not audited)  
4. **Moat** — shared_modules, portable UI, Tryb B, Supabase-shaped backend  
5. **Surface** — seven emit shells  
6. **Ask** — intro dialog → `/api/contact-form` (same API values as home, investor labels)

## Motion
`play_investor_animations.ts` — slim home engine: cipher brand, iris wipe, magnetic shear, section wipe reveals. Reuses home scroll loop / section observer / contact helpers.

## Routing
- Route rules: `/investor` → `/en/investor`
- Smash middleware leaves `/{lang}/investor` alone; extras collapse to that root

## Verify
- Open `/en/investor` (bare `/investor` 301 → `/en/investor`)
- Rail jumps + scroll-past-end loop replay boot
- Ask dialog submits with a valid email + type
- `pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests`
