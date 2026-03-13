# Feature Workflow

When the user asks to implement a feature, follow this multi-agent pipeline. Each phase must complete before the next begins.

---

## Phase 1 — PLAN

Act as the **Planner** agent. Read `.ai/agents/planner.md` for your role instructions.

1. Read project context: `.ai/rules/laravel.md`, `.ai/rules/modules.md`, `.ai/rules/frontend.md`, `.ai/rules/typescript.md`, `.ai/rules/pest.md`, `.ai/rules/vitest.md`
2. If the feature involves an existing module, read that module's code for reference
3. Produce a structured implementation plan
4. Save the plan to `.ai/specs/plan.md`
5. Present the plan and **wait for approval**

---

## Phase 2 — IMPLEMENT

Launch **two subagents in parallel** (same message):

- **Backend** (`subagent_type: "Backend"`) — pass `.ai/agents/backend.md` content + plan. Read `modules/nuc_entities/` as reference. Create all backend files. Return file list.
- **Frontend** (`subagent_type: "Frontend"`) — pass `.ai/agents/frontend.md` content + plan. Read `modules/nuc_entities/` as reference. Create all frontend files. Return file list.

---

## Phase 3 — TEST

Launch **tester subagent** (`subagent_type: "Tester"`) — pass `.ai/agents/tester.md` content + plan + file lists. Read `modules/nuc_entities/tests/` and `vitests/` as reference. Create all tests. Return file list.

---

## Phase 4 — REVIEW

Act as **Reviewer** yourself (no subagent). Read `.ai/agents/reviewer.md`.

1. Read all created files
2. Check convention compliance, fix issues
3. Run linter checks
4. Present summary: files created, issues fixed, overall assessment
