import { component } from '#nuc-compiler/runtime'

export default component({
  name: 'List',
  props: {
    items: { type: 'unknown' },
    showEmpty: { type: 'boolean', optional: true, default: true },
  },
  render: (props) => (
    <div className="list">
      {props.showEmpty ? (
        <p>Empty hint visible</p>
      ) : (
        <p>No empty hint</p>
      )}
      <ul>
        {props.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  ),
})
