import { component } from '#nuc-compiler/runtime'

export default component({
  name: 'Hello',
  props: {
    title: { type: 'string', optional: true, default: 'compiler smoke' },
  },
  render: (props) => (
    <p className="compiler-smoke-hello">{props.title}</p>
  ),
})
