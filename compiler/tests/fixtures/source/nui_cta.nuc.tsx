import { component } from '#nuc-compiler/runtime'

export default component({
  name: 'NuiCta',
  props: {
    label: { type: 'string', optional: true, default: 'Continue' },
    disabled: { type: 'boolean', optional: true, default: false },
    accent: { type: 'string', optional: true, default: '#0ea5e9' },
  },
  handlers: {
    onClick() {
      console.log('nui-cta')
    },
  },
  render: (props, handlers) => (
    <nui-button
      type="button"
      disabled={props.disabled}
      aria-label={props.label}
      style={{ color: props.accent, gap: '0.5rem' }}
      onClick={handlers.onClick}
    >
      <nui-icon icon="mdi:rocket-launch-outline" aria-hidden="true" />
      {props.label}
    </nui-button>
  ),
})
