---
name: ask
description: >-
  Read-only Q&A about this repo. No edits, no commits, no subagents.
  Invoke with @ask or /ask. Prefer Ask mode / a smaller model for pure questions.
disable-model-invocation: true
---

# ask

Answer the question in **this conversation**. Stay read-only.

## Hard limits

- No file edits, scaffolding, commits, pushes, or PR creation.
- No subagents (explore / implement / review / Task). One agent only.
- Do not `@` whole directories or dump monorepo / CI / log walls.
- Prefer targeted search + a few focused file reads. Quote only the lines that matter.
- If the user needs edits: say so in one line and stop (they should start a new Agent chat or `/pipeline`).

## Answer shape

- Lead with the verdict.
- 1–2 sentences per point; expand only if asked.
- Point to paths / symbols; skip restating the question.
