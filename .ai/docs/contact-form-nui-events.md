# Contact form - nui input events and select stacking

Home close and investor ask share the same contact desk UI.

## Email / name not sticking

`nui-input-text` dispatches a composed `CustomEvent('input', { detail: { value } })`, and the native shadow `input` also bubbles to Vue. Handlers that read `event.detail.value` without filtering see the native event second and set the ref to `undefined`, so client validation marks email invalid after submit.

Fix: `nuiValueFromEvent` in `web/src/pages/home/utils/submit_contact_form.ts` - accept only `CustomEvent` with a string `detail.value`.

## Select options under the note field

`nui-select` opens an absolute panel inside the host. The following textarea field painted on top of the open list. `.nuc-home-close-field:has(nui-select)` is raised above the textarea field; form-open allows vertical overflow so the panel is not clipped.

Options are bound with `:options.prop` so Lit receives a real array on custom elements.
