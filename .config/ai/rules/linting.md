# Linting

## Biome 2.1 (JS/TS)

Config: `.config/biome.json`. Replaces ESLint + Prettier.

**Formatter:** 2-space indent, single quotes, semicolons as needed, trailing commas ES5, LF line endings, 80 char width.

**Import order:** framework → `nucleify` → local barrels (`components`, `constants`, `types`, `utils`) → relative (`.`) → `.vue` files.

**TS overrides:** `useConst`, `noVar`, `noArguments` as errors.

**Suppression:** `// biome-ignore lint/suspicious/noExplicitAny: reason`

```bash
pnpm run check    # lint
pnpm run write    # lint + fix
```

## Stylelint (SCSS)

Config: `.config/.stylelintrc.json`. Extends `stylelint-config-standard-scss`. Only lints `.scss` files — Vue `<style>` blocks excluded.

```bash
pnpm run slint      # lint
pnpm run slint:fix  # lint + fix
```
