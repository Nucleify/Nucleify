# PrimeVue & PrimeReact

**PrimeVue 4.3** (Lara theme) — Nuxt atomic `Ad*` wrappers in `nuxt/atomic/`.

**PrimeReact 10.9** — Next atomic `Ad*` wrappers in `next/atomic/`.

Full docs: [primevue.org](https://primevue.org) · [primereact.org](https://primereact.org)

## Wrapper Pattern

- Extend PrimeVue/PrimeReact props in `types/interfaces.ts`
- Add `nuiType?: NuiTypeType` for entity color theming (`data-nui-type` / `nui-type` attribute)
- Vue: `v-bind="transformProps(props, excludedProps)"`
- React: `pt` prop for pass-through styling

## `nuiType` Values

`NuiTypeType` = entity names (`activity`, `contact`, `user`, …) + `'main'` + `'secondary'`.

Use `severity` for PrimeVue semantic styles (`primary`, `secondary`, …) — distinct from `nuiType`.
