import { component } from '#nuc-compiler/runtime'

export default component({
  name: 'Button',
  props: {
    label: { type: 'string', optional: true, default: 'Click' },
  },
  handlers: {
    onClick() {
      console.log('clicked')
    },
  },
  styles: {
    css: '.btn { cursor: pointer; }',
  },
  render: (props, handlers) => (
    <button type="button" className="btn" onClick={handlers.onClick}>
      {props.label}
    </button>
  ),
})
