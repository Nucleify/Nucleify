import { component } from '#nuc-compiler/runtime'

export default component({
  name: 'Hello',
  props: {
    title: { type: 'string' },
  },
  render: (props) => (
    <h1 className="hello">{props.title}</h1>
  ),
})
