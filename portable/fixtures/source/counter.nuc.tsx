import { component, derived, handler, state } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: {
    label: { type: 'string', optional: true, default: 'Count' },
  },
  setup(props) {
    const count = state(0)
    const double = derived(() => count.value * 2)
    const onInc = handler(() => {
      count.set(count.value + 1)
    })
    return () => (
      <button type="button" onClick={onInc}>
        {props.label + ': ' + double.value}
      </button>
    )
  },
})
