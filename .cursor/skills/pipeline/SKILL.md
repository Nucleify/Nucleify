---
name: pipeline
description: >-
  Nucleify PLAN/DO/COMMIT/PUSH in one skill. Invoke `/pipeline plan-do-commit-push`
  (or space-separated steps). Replaces former /plan /do /commit /push combos.
disable-model-invocation: true
---

# pipeline

Parse steps from the user message (slash args, `@pipeline …`, or free text).

Allowed steps (order preserved, duplicates dropped): `plan`, `do`, `commit`, `push`.

Examples: `/pipeline plan-do-commit-push` · `/pipeline do commit` · `pipeline: plan do`.

If no valid step is named, ask which chain to run and stop.

## Execute

1. Work in **this conversation** - one agent; do **not** spawn subagents or other workflow skills.
2. Run the parsed steps **in order**, then stop.
3. Read and follow `.cursor/skills/nui-workflow/SKILL.md` for each step.
4. Trust glob-applied `.cursor/rules`; do not bulk-read rule trees.

DO always updates `.ai/docs/` when the change needs a note.
