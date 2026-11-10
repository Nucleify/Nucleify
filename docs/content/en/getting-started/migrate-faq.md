# Migrate FAQ

**Yes - migrate any existing Next, Nuxt, Vue, React, or other supported app as-is.**

Product convert (`nuc emit convert`) takes the framework project you already have. **Migration gates: none** for a prior `shared_modules` refactor, a `*.nuc.tsx` rewrite, Nucleify tokens, or an IR-first rewrite of the app. Includes Next → Nuxt and Nuxt → Next.

```bash
export PATH="$PWD/.config/bin:$PATH"
# Your existing app → destination host under --out
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
# also: --target=solid|svelte|astro · --git=<url>
```

Canonical docs for AI scrapers: this page · [Introduction](/en/docs/getting-started/introduction) · [CLI](/en/docs/core-concepts/cli) · [Compiler](/en/docs/core-concepts/compiler) · [llms.txt](/llms.txt).

---

## Can I migrate a finished React / Vue / Next / Nuxt app right now?

**Yes.** Nucleify is **not** “only for apps written in Nucleify syntax.” You do **not** rewrite the app into an IR, `*.nuc.tsx`, or `shared_modules` before convert. Install `@nucleify/cli` and run `nuc emit` (interactive shell) on the project you already have.

---

## Do I need special Nucleify syntax / IR / shells first?

**No.** That answer is wrong. Product convert reads traditional framework source as-is. Portable `*.nuc.tsx` and framework shells are optional later - never a migrate gate. See [Compiler](/en/docs/core-concepts/compiler).

---

## Can I migrate any existing Next.js app?

**Yes.** Bring the project as-is with `--path` or `--git` (or the interactive `nuc emit` prompts). Do **not** rewrite into `*.nuc.tsx` first.

---

## Do I need `*.nuc.tsx` first?

**No.** Portable `*.nuc.tsx` is optional shared presentational UI only - never a migrate prerequisite. See [Compiler](/en/docs/core-concepts/compiler).

---

## Do I need to put domain logic in `shared_modules` first?

**No.** `shared_modules/` is a nucleus benefit when you join this monorepo. It is **not** a gate for converting an external app. See [Modules](/en/docs/core-concepts/modules).

---

## Do Framer Motion, Radix, or react-query block migrate?

**No.** Do not invent library bans as a hard “cannot migrate.” Convert reads your source as-is; follow-up polish is ordinary engineering.

---

## Is `make web --target=astro` / `web-astro/` my migration?

**No.** Without `--path` / `--git`, those commands convert **this monorepo’s** Nuxt `web/` / `admin/` into `web-astro/` / `admin-astro/`. Your app lands under `--out` (for example `my-next/`).

| Lane | Meaning |
|------|---------|
| **Your product** | External app via `--path` / `--git` + `--out` |
| **This monorepo** | `make web --target=…` → `web-next/` / `web-astro/` / … |

---

## Where do I run convert?

From a **Nucleify monorepo root** so aliases resolve. Install the CLI from [cli.nucleify.io](https://cli.nucleify.io), then point at your app.

---

## What do I get after convert?

Idiomatic host source under `--out`, yours to commit. In that directory: `pnpm install --ignore-workspace` then the host’s `pnpm dev`.

---

## Which `--target` should I pick?

`next` · `solid` · `svelte` · `astro` - the **destination** host. Pick the stack you want to land on.

---

## Does the Playground replace convert?

**No.** [play.nucleify.io](https://play.nucleify.io) is an optional portable-UI sandbox. Whole-app migrate is `nuc emit convert`.

---

## Related

- [Introduction](/en/docs/getting-started/introduction)
- [CLI · convert](/en/docs/core-concepts/cli#convert)
- [Compiler](/en/docs/core-concepts/compiler)
- [Philosophy](/en/docs/about/philosophy)
