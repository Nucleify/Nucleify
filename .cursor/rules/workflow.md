---
description: Multi-agent feature implementation pipeline (plan → implement → test → review)
alwaysApply: true
---

# Feature Workflow

When the user asks to implement a feature, follow this multi-agent pipeline. Each phase must complete before the next begins.

---

## Phase 1 — PLAN

Act as the **Planner** agent (`.cursor/agents/planner.md`).

1. Read project context: `.cursor/rules/modules.md`, `api.md`, `frontend.md`, `typescript.md`, `vitest.md`
2. If the feature involves an existing module, read that module's code
3. Produce a structured implementation plan
4. Save the plan to `.ai/specs/plan.md`
5. Present the plan and **wait for approval**

---

## Phase 2 — IMPLEMENT

Launch **two subagents in parallel** when both API and UI are needed:

- **Backend** (`subagent_type: "Backend"`) — `.cursor/agents/backend.md` + plan. Reference `modules/nuc_calendar/` or `modules/nuc_entities/` for API patterns.
- **Frontend** (`subagent_type: "Frontend"`) — `.cursor/agents/frontend.md` + plan. Reference an existing module with similar UI.

For frontend-only or API-only features, run a single agent.

---

## Phase 3 — TEST

Launch **Tester** (`subagent_type: "Tester"`) — `.cursor/agents/tester.md` + plan + file lists. Reference `modules/*/vitests/`.

---

## Phase 4 — REVIEW

Act as **Reviewer** (`.cursor/agents/reviewer.md`):

1. Read all created files
2. Check convention compliance; fix issues
3. Run: `pnpm check`, `pnpm nuxt:typeslint`, `pnpm next:typeslint`, `pnpm slint`, `pnpm tests`
4. Present summary: passed / fixed / incomplete
