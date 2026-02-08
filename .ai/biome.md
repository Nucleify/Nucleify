# Biome

## Overview

Biome is the JavaScript/TypeScript linter and formatter for the project. It replaces ESLint + Prettier with a single, fast tool. Version: **2.1.2**.

---

## Configuration (`biome.json`)

### Files

```json
{
  "includes": ["**"],
  "ignoreUnknown": false
}
```

Excluded from linting:
- `modules/**/index.ts` — barrel files
- `cypress/**`
- `node_modules/**`, `vendor/**`
- `.nuxt/**`, `.output/**`, `**/build/**`

---

## Formatter

| Setting | Value |
|---------|-------|
| Indent style | `space` |
| Indent width | `2` |
| Line width | `80` |
| Line ending | `lf` |
| Bracket spacing | `true` |
| Bracket same line | `false` |

### JavaScript/TypeScript Formatter

| Setting | Value |
|---------|-------|
| Quote style | `single` |
| JSX quote style | `double` |
| Semicolons | `asNeeded` |
| Trailing commas | `es5` |
| Arrow parentheses | `always` |
| Quote properties | `asNeeded` |

### HTML Formatter

- Self-close void elements: `always`

---

## Linter Rules

Biome uses **non-recommended** base with explicitly enabled rules per category:

### Complexity
- `noAdjacentSpacesInRegex`, `noExtraBooleanCast`, `noUselessCatch`, `noUselessEscapeInRegex`, `noUselessTypeConstraint`

### Correctness
- `noConstAssign`, `noConstantCondition`, `noEmptyCharacterClassInRegex`, `noEmptyPattern`, `noGlobalObjectCalls`, `noInvalidBuiltinInstantiation`, `noInvalidConstructorSuper`, `noNonoctalDecimalEscape`, `noPrecisionLoss`, `noSelfAssign`, `noSetterReturn`, `noSwitchDeclarations`, `noUnreachable`, `noUnreachableSuper`, `noUnsafeFinally`, `noUnsafeOptionalChaining`, `noUnusedLabels`, `noUnusedPrivateClassMembers`, `useIsNan`, `useValidForDirection`, `useValidTypeof`, `useYield`

### Style
- `noCommonJs`, `noNamespace`, `useArrayLiterals`, `useAsConstAssertion`

### Suspicious
- `noAsyncPromiseExecutor`, `noCatchAssign`, `noClassAssign`, `noCompareNegZero`, `noControlCharactersInRegex`, `noDebugger`, `noDuplicateCase`, `noDuplicateClassMembers`, `noDuplicateElseIf`, `noDuplicateObjectKeys`, `noDuplicateParameters`, `noEmptyBlockStatements`, `noExplicitAny`, `noExtraNonNullAssertion`, `noFallthroughSwitchClause`, `noFunctionAssign`, `noGlobalAssign`, `noImportAssign`, `noIrregularWhitespace`, `noMisleadingCharacterClass`, `noMisleadingInstantiator`, `noPrototypeBuiltins`, `noRedeclare`, `noShadowRestrictedNames`, `noSparseArray`, `noUnsafeDeclarationMerging`, `noUnsafeNegation`, `noWith`, `useGetterReturn`, `useNamespaceKeyword`

### TypeScript Overrides (`.ts`, `.tsx`, `.mts`, `.cts`)

Additional rules for TS files:
- `complexity.noArguments`: error
- `style.useConst`: error
- `suspicious.noVar`: error

Some correctness/suspicious rules **disabled** for TS (handled by TypeScript compiler):
- `noConstAssign`, `noGlobalObjectCalls`, `noInvalidBuiltinInstantiation`, `noInvalidConstructorSuper`, `noSetterReturn`, `noUndeclaredVariables`, `noUnreachable`, `noUnreachableSuper`, `noClassAssign`, `noDuplicateClassMembers`, `noDuplicateObjectKeys`, `noDuplicateParameters`, `noFunctionAssign`, `noImportAssign`, `noRedeclare`, `noUnsafeNegation`, `noWith`, `useGetterReturn`

---

## Import Organization (Assist)

Biome organizes imports automatically with this group order:

1. **Framework/library imports** — `nuxt/*`, `#app`, `vue`, `marked`, `primevue`, `vue-router`, `pinia`, `react`, `@mui/material/*`, `gsap`, `vitest`, `vue-i18n`
2. *(blank line)*
3. **`atomic`** — cross-module imports
4. *(blank line)*
5. **Local barrel imports** — `components`, `constants`, `types`, `utils`, `variables`
6. *(blank line)*
7. **Relative imports** — `.`
8. *(blank line)*
9. **Vue file imports** — `index.vue`

---

## Inline Suppression

```typescript
// biome-ignore lint/suspicious/noExplicitAny: reason
```

---

## Commands

```bash
# Check all files
npm run check

# Check and auto-fix
npm run write
```

