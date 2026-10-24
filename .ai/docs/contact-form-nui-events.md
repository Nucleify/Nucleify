# Contact form - nui fields

Home close and investor ask use Lit `nui-input-text`, `nui-select`, and `nui-textarea` (registered in `portable/nui/register.ts`).

## Email value sticking

Do **not** bind `:value` on the email (or other) hosts while typing. Vue re-renders with a stale empty ref wipe the Lit host. Fields stay uncontrolled; `formKey` remounts them on reset. On submit, `syncFromHosts()` reads live `.value` from each host via `nuiHostValue`.

`nuiValueFromEvent` still updates refs for validation UX (clearing errors on input).

## Lit boolean `invalid`

Use `:invalid.prop="Boolean(...)"`, not `:invalid="..."`. Vue may set the `invalid="false"` attribute on custom elements; Lit Boolean properties treat any attribute presence as `true`, so every field with `:invalid` stayed red even with no errors.

## Select stacking

`nui-select` opens an absolute panel in the host. The type field gets `z-index` (higher while `is-select-open`). Form/commerce use `overflow: visible` when the desk is open so the panel is not clipped. Shared theme tokens set focus `box-shadow` via `--nui-primary-focus-color`.
