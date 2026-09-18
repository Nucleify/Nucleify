---
name: nui-workflow
description: Shared Nucleify pipeline steps (plan, do, commit, push). Read when a workflow skill lists these steps.
disable-model-invocation: true
---

# nui-workflow

Execute **only** the steps named by the invoking skill, **in that order**. Then stop.

Work in **this conversation**. Do not spawn another workflow skill.

Follow `.cursor/rules/` and package rules under `web|admin|docs|compiler|shared_modules/.config/rules/`.

## Paths

| Artefact | Path |
|----------|------|
| Feature plan | `.ai/specs/plan.md` |
| Session / change docs | `.ai/docs/` (markdown) |
| Product docs site | `docs/` (`@nucleify/docs` — Astro; do not use for agent notes) |

Never write agent notes into `docs/markdown/`, `docs/pdf/`, or the Astro content tree unless the user asked to change the product docs site.

## PLAN

1. Write a short plan: goal, packages (`web` / `admin` / `docs` / `compiler` / `shared_modules`), files, risks, out of scope.
2. Persist the plan to `.ai/specs/plan.md` when the change is non-trivial (multi-file, API, or architecture). Skip the file for tiny UI polish if the pipeline is DO-only.
3. If **DO** is also in this pipeline: write the plan, then implement immediately. Do not wait for approval unless a project rule says otherwise (e.g. always-applied workflow awaiting approval for full features).
4. If **PLAN** is the last step: stop after the plan. Do not edit product code.
5. Small UI-only (colour, spacing, one class, copy): a 3-line plan is enough.

## DO

1. Implement the user request (against the plan when PLAN ran).
2. Prefer existing patterns: `shared_modules/nuc_*`, `nui-*`, compiler emit/convert. No parallel app trees.
3. **Always** update agent documentation before this step ends:
   - Write or extend files under `.ai/docs/` (what changed, why, how to verify).
   - Create new files when a domain or area is new; edit existing ones when they would be stale.
   - Prefer dated or topic slugs, e.g. `.ai/docs/home-holo-cube-glow.md`, `.ai/docs/2026-09-19-rainbow.md`.
4. After code edits run from repo root:

```sh
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

Fix failures and re-run until green. Skip the suite only for pure docs/rules/markdown — say so.
5. Do **not** commit unless **COMMIT** is in this pipeline.
6. Do **not** push unless **PUSH** is in this pipeline.

## COMMIT

The user invoked commit — create the commit (include `.ai/docs/` updates from DO when present).

1. Run in parallel: `git status`, `git diff`, `git diff --cached`, `git log -8 --oneline`.
2. Stage only this batch. Never stage `.env`, credentials, or secrets.
3. Message via HEREDOC, 1–2 sentences on **why**. Repo style: `feat:` / `fix:` / `chore:` / `docs:` (optionally scoped, e.g. `fix(web): …`).
4. No `--no-verify`, no force, no amend unless the user asked and amend rules pass.
5. Failed hook: fix and make a **new** commit. Do not amend.
6. If there is nothing to commit, say so and skip.
7. End with `git status`.

## PUSH

The user invoked push — publish the current branch.

1. Never `push --force` to `main`, `master`, or `prod`. Never `--no-verify`.
2. If no upstream: `git push -u origin HEAD`. Else `git push`.
3. Do not push if the working tree still has an incomplete COMMIT step.
4. Report branch, remote, and whether the push succeeded.
