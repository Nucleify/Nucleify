# 🚀 Contributing

We can use help in a bunch of areas and any help is greatly appreciated!

## Table of Contents

- [🚀 Contributing](#-contributing)
  * [AI assistance notice](#ai-assistance-notice)
  * [Asking questions, making proposals](#asking-questions-making-proposals)
  * [Reporting bugs](#reporting-bugs)
  * [Getting Started](#getting-started)
    + [Local development](#local-development)
  * [Testing](#testing)
    + [Debugging](#debugging)
  * [Checks](#checks)
  * [Branches](#branches)
  * [Commit messages](#commit-messages)
  * [Creating pull requests](#creating-pull-requests)
    + [Documentation](#documentation)
  * [Code Review](#code-review)
  * [Members](#members)
    + [Lead team](#lead-team)
    + [Other Contributors](#other-contributors)

## AI assistance notice

> If you are using **any kind of AI assistance** to contribute to Nucleify,
> it must be disclosed in the pull request.

If you relied on AI assistance to make a pull request, you must disclose it in the
pull request, together with the extent of the usage. For example, if you used
AI to generate docs or tests, you must say it.
An example disclosure:

- > This PR was written primarily by Cursor.
- > I consulted ChatGPT to understand the codebase but the solution
  > was fully authored manually by myself.

Providing this information helps reviewers understand the context of the
pull request and apply the right level of scrutiny, ensuring a smoother
and more efficient review process.

AI assistance isn't always perfect, even when used with the utmost care.

Please be respectful to maintainers and disclose AI assistance.

## Asking questions, making proposals

If you have any questions, proposals, or feedback, open a [GitHub discussion](https://github.com/Nucleify/Nucleify/discussions).
Make sure your comment adds value: [don't post a comment just to get attention](https://jacobtomlinson.dev/posts/2022/dont-be-that-open-source-user-dont-be-me/).

Our [Discord server](https://discord.gg/NuShhvUE) is open for help and more ad-hoc discussion.
All activity on the Discord is still moderated and will be strictly enforced under the project's [Code of Conduct](./CODE_OF_CONDUCT.md).

Remember that we are doing this project on our own time.
We are humans: we like support, and we expect kindness :)

## Reporting bugs

Our [GitHub issues](https://github.com/Nucleify/Nucleify/issues/) serve as a place for submitting bugs.
Make sure that the bugs is not reported yet and is not fixed in the prod branch.

## Getting Started

You can work on the project locally by cloning the repository and follow the [local development](#local-development) installation process.

### Local development

First make sure u have installed latest version of [Docker](https://www.docker.com), [Composer](https://getcomposer.org/), [Node.js](https://nodejs.org/en) and have [Make](https://makefiletutorial.com/#getting-started) command ready.

- Clone the repository and navigate to the `root` directory:

```bash
git clone https://github.com/Nucleify/nucleify
cd nucleify
```

- Run ```make``` command

That's it! Now, you can enter http://localhost:3000

## Testing

<img src="/public/img/technologies/pest.svg" height="15" /> &nbsp;Pest tests:
```bash
# run all tests
sail pest

# or specify group
sail pest --group=api

# defined tests groups:
api, activity-api, article-api, artisan-api, contact-api, sitemap-api, user-api,
database, feature, global, unit, commands, controllers, services, factories, migrations, models

# run all tests and check code coverage
sail pest --coverage
```

![Tests](https://github.com/user-attachments/assets/560df303-07c7-42f0-a178-07ef5e05a8a8)![Coverage](https://github.com/user-attachments/assets/0b6cc696-8fdb-469f-a78c-e6faaadbe437)

<img src="/public/img/technologies/vitest.svg" height="15" /> &nbsp;Vitest tests:
```bash
npm run tests
```

<img src="/public/img/technologies/storybook.svg" height="15" /> &nbsp;Storybook - visit ```localhost:6006``` after ```sail start```

### Debugging

Sometimes you want to debug something when running tests. Like `console.log`, in JavaScript, in PHP you can use `dd()` or `dump()` to print something during debugging something.

## Checks

When you finish your work and are ready to commit, `pre-commit` and `pre-push` hooks will run all necessary checks, such as linting, formatting, stylelint, type checks, and tests.

## Branches

Branch names should use snake_case for consistency and readability (e.g. nuc_colors, ui_corrections, nucleify_rebranding).
This helps keep branches easy to scan, avoids ambiguity, and maintains a clear, predictable naming convention across the project.

## Commit messages

Internally, the Nucleify team adheres as closely as possible to the [conventional commit specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).
The following this convention encourages commit best-practices and facilitates commit-powered features like changelog generation.

The following commit prefixes are supported:

- `build:`, a change that affects the build system or external dependencies
- `chore:`, project housekeeping
- `ci:`, a change that affects CI
- `docs:`, a documentation update
- `feat:`, a new feature
- `fix:`, a bugfix
- `perf:`, project performance
- `refactor:`, refactor of the code without change in functionality
- `release:`, release of a new version
- `revert:`, revert a previous change
- `test:`, a test update

Below are examples of well-formatted commits:

```txt
feat(nuc_colors): implement new custom colors
fix: prerender data fetching
docs: fix link to website page
test(lint): add more cases to handle invalid input
```

If possible, please include the module name in brackets (e.g. feat(nuc_colors)) for clarity.

## Creating pull requests

When creating a new pull request, it's preferable to use a conventional commit-formatted title.
See the [dedicated section](#commit-messages) about conventional commit format.

When creating a PR, please set it to the maintenance branch `dev`

### Documentation

If your PR involves new features, or changes to existing features, documentation must be updated as well.

## Code Review

All contributions go through code review before merging. Please:

- Ensure your code adheres to the [CODING_STANDARDS.md](./CODING_STANDARDS.md)
- Write clear, concise commit messages
- Include tests for new functionality
- Make PR descriptions self-explanatory
- Respond constructively to review comments

## Members

Members are listed by number of contributions. Members are free to use the full name, GitHub handle, or any other nickname they wish to be addressed.

### Lead team

- [Szymon Radomski @SzymCode](https://github.com/SzymCode)
- [Mścibor Srebrny @Mmesek](https://github.com/Mmesek)

### Other Contributors

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
