# Stylelint

## Overview

Stylelint is used for linting **SCSS** files across the project. Vue `<style>` blocks are excluded — only standalone `.scss` files are linted.

---

## Configuration (`.stylelintrc.json`)

```json
{
  "extends": ["stylelint-config-standard-scss"],
  "rules": {
    "import-notation": null,
    "media-query-no-invalid": null,
    "media-feature-range-notation": null,
    "at-rule-no-unknown": null,
    "selector-pseudo-class-no-unknown": null,
    "scss/comment-no-empty": null
  },
  "ignoreFiles": ["**/*.vue"]
}
```

### Base Config

Extends `stylelint-config-standard-scss` — the standard SCSS config.

### Disabled Rules

| Rule | Reason |
|------|--------|
| `import-notation` | Allows `@import` syntax (not just `@use`) |
| `media-query-no-invalid` | Custom/complex media queries allowed |
| `media-feature-range-notation` | Allows older range syntax |
| `at-rule-no-unknown` | Custom SCSS at-rules (e.g. `@include`, `@mixin`) |
| `selector-pseudo-class-no-unknown` | PrimeVue and CSS Module pseudo-classes (e.g. `:global`) |
| `scss/comment-no-empty` | Allows empty SCSS comments |

### Ignored Files

- `**/*.vue` — Vue SFC style blocks are not linted by Stylelint

---

## SCSS File Patterns

### Module-level styles

Each module can have:
- `_index.scss` — Module SCSS entry point (imported in `modules/_index.scss`)
- Component-scoped `_index.scss` inside component folders

### Global styles

- `nuxt/assets/` — Global SCSS (imported via Vite `additionalData`)
- `modules/_index.scss` — Aggregates all module styles

### CSS Modules in Vue

Vue components use `<style lang="scss" module>` with `$style` references — these are **not** linted by Stylelint.

---

## Commands

```bash
# Lint all SCSS files
npm run slint

# Lint and auto-fix
npm run slint:fix
```

