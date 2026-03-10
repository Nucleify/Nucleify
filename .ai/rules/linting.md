# Linting

## Biome 2.1 (JS/TS)

Config: `biome.json`. Replaces ESLint + Prettier.

**Formatter:** 2-space indent, single quotes, semicolons as needed, trailing commas ES5, LF line endings, 80 char width.

**Import order:** framework → `nucleify` → local barrels (`components`, `constants`, `types`, `utils`) → relative (`.`) → `.vue` files.

**TS overrides:** `useConst`, `noVar`, `noArguments` as errors.

**Suppression:** `// biome-ignore lint/suspicious/noExplicitAny: reason`

```bash
npm run check    # lint
npm run write    # lint + fix
```

## Stylelint (SCSS)

Config: `.stylelintrc.json`. Extends `stylelint-config-standard-scss`. Only lints `.scss` files — Vue `<style>` blocks excluded.

```bash
npm run slint      # lint
npm run slint:fix  # lint + fix
```
