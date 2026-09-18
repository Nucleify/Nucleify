---
name: plan-do-commit-push
description: Nucleify pipeline PLAN → DO → COMMIT → PUSH: plan; implement; update `.ai/docs/`; commit; push. Invoke with @plan-do-commit-push or /plan-do-commit-push.
disable-model-invocation: true
---

# plan-do-commit-push

Execute this pipeline in **this conversation** (do not spawn a subagent):

1. PLAN
2. DO
3. COMMIT
4. PUSH


DO always updates `.ai/docs/` (create or extend markdown when the change needs a note).

Read and follow `.cursor/skills/nui-workflow/SKILL.md` for each listed step. Follow `.cursor/rules/`.
