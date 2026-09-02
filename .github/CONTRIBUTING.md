# Contributing

We can use help in a bunch of areas and any help is greatly appreciated!

## Table of Contents

- [AI assistance notice](#ai-assistance-notice)
- [Asking questions, making proposals](#asking-questions-making-proposals)
- [Reporting bugs](#reporting-bugs)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Checks](#checks)
- [Branches](#branches)
- [Commit messages](#commit-messages)
- [Creating pull requests](#creating-pull-requests)
- [Code review](#code-review)
- [Members](#members)

---

## AI assistance notice

> If you are using **any kind of AI assistance** to contribute to Nucleify, it must be disclosed in the pull request.

If you relied on AI assistance, state it in the PR description along with the extent of usage. Examples:

- > This PR was written primarily by Cursor.
- > I consulted ChatGPT to understand the codebase but the solution was fully authored manually by myself.

Providing this helps reviewers apply the right level of scrutiny.

---

## Asking questions, making proposals

Open a [GitHub discussion](https://github.com/Nucleify/Nucleify/discussions) for questions, proposals, or feedback.  
Our [Discord server](https://discord.gg/NuShhvUE) is open for ad-hoc discussion — all activity is moderated under the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Reporting bugs

Use [GitHub issues](https://github.com/Nucleify/Nucleify/issues/) to report bugs.  
Make sure the bug hasn't been reported already and isn't fixed on `main`.

---

## Getting started

Requirements: [Node.js](https://nodejs.org/en) (v22+), [pnpm](https://pnpm.io/), [Make](https://makefiletutorial.com/).

```bash
git clone https://github.com/Nucleify/nucleify
cd nucleify
make setup
```

Start the landing app:

```bash
make web       # http://localhost:3000
make admin      # admin panel
make docs       # documentation
```

---

## Testing

Vitest (frontend + shared modules):

```bash
pnpm tests
pnpm test:watch
```

Tests live in `web/vitests/` and `shared_modules/nuc_*/vitests/`.

---

## Checks

`pre-commit` and `pre-push` hooks run automatically:

1. `pnpm btest` — bash test suite
2. `pnpm check` — Biome lint
3. `pnpm typeslint` — TypeScript type check
4. `pnpm slint` — Stylelint (SCSS)
5. `pnpm tests` — Vitest

---

## Branches

Use `snake_case` for branch names:

```
nuc_colors
ui_corrections
nucleify_rebranding
```

---

## Commit messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) spec:

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code change without behavior change |
| `docs:` | Documentation |
| `test:` | Test changes |
| `ci:` | CI/CD changes |
| `chore:` | Housekeeping |
| `build:` | Build system changes |
| `perf:` | Performance improvements |
| `revert:` | Revert a previous commit |
| `release:` | New version release |

Include the module name in brackets when applicable:

```
feat(nuc_colors): implement custom color tokens
fix: prerender data fetching
docs: update installation guide
```

---

## Creating pull requests

- Target the `dev` branch
- Use a conventional commit-formatted PR title
- Update docs if the PR introduces or changes a feature (see [CODE_STANDARDS.md](./CODE_STANDARDS.md))

---

## Code review

All contributions require code review before merging. Please:

- Follow [CODE_STANDARDS.md](./CODE_STANDARDS.md)
- Write clear, concise commit messages
- Include tests for new functionality
- Make PR descriptions self-explanatory
- Respond constructively to review comments

---

## Members

### Lead team

- [Szymon Radomski @SzymCode](https://github.com/SzymCode)
- [Mścibor Srebrny @Mmesek](https://github.com/Mmesek)

### Other contributors

- [Katarzyna Śmierzchalska @KatarzynaS97](https://github.com/KatarzynaS97)
- [Damian Kamyszek @K4mD4m](https://github.com/K4mD4m)
- [Marcin Fuks @J0jeQ](https://github.com/J0jeQ)
- [Jakub Malik @JakubMalik](https://github.com/JakubMalik)
- [Kacper Bujak @kbujak09](https://github.com/kbujak09)
- [@karol199393](https://github.com/karol199393)
- [Dominika Zalewska @domizalewska](https://github.com/domizalewska)
- [Kamil Błoński @kbloski](https://github.com/kbloski)
- [@Kacper658](https://github.com/Kacper658)
- [@pysifu](https://github.com/pysifu)
