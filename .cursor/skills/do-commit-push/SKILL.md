---
name: do-commit-push
description: Nucleify pipeline DO → COMMIT → PUSH: implement; update `.ai/docs/`; commit; push. Invoke with @do-commit-push or /do-commit-push.
disable-model-invocation: true
---

# do-commit-push

Execute this pipeline in **this conversation** (do not spawn a subagent):

1. DO
2. COMMIT
3. PUSH


DO always updates `.ai/docs/` (create or extend markdown when the change needs a note).

Read and follow `.cursor/skills/nui-workflow/SKILL.md` for each listed step. Follow `.cursor/rules/`.
