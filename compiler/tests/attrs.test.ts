import { describe, expect, it } from 'vitest'
import { emitReact } from '../src/emit/react'
import { emitVue } from '../src/emit/vue'
import type { IrDocument } from '../src/ir/types'
import { parseTsxToIr } from '../src/parse/tsx'

const base = {
  irVersion: '0.1.0' as const,
  portable: true as const,
  props: [],
  state: [],
  derived: [],
  handlers: [],
}

describe('phase 6 attributes', () => {
  it('parses style object, boolean, and aria-*', () => {
    const ir = parseTsxToIr(
      `import { component } from '#nuc-compiler/runtime'
export default component({
  name: 'Attrs',
  props: { open: { type: 'boolean', default: false }, label: { type: 'string' } },
  render: (props) => (
    <button
      disabled={props.open}
      aria-label={props.label}
      style={{ color: 'red', gap: '4px' }}
    />
  ),
})
`,
      'attrs.nuc.tsx',
    )
    expect(ir.template).toMatchObject({
      kind: 'element',
      tag: 'button',
      props: [
        { kind: 'bind', name: 'disabled' },
        { kind: 'bind', name: 'aria-label' },
        {
          kind: 'bind',
          name: 'style',
          value: {
            kind: 'object',
            properties: [
              { key: 'color', value: { kind: 'literal', value: 'red' } },
              { key: 'gap', value: { kind: 'literal', value: '4px' } },
            ],
          },
        },
      ],
    })
  })

  it('emits boolean false explicitly and style object quotes safely in Vue', () => {
    const doc: IrDocument = {
      ...base,
      name: 'Attrs',
      template: {
        kind: 'element',
        tag: 'button',
        props: [
          { kind: 'static', name: 'disabled', value: false },
          { kind: 'static', name: 'aria-hidden', value: 'true' },
          {
            kind: 'bind',
            name: 'style',
            value: {
              kind: 'object',
              properties: [{ key: 'gap', value: { kind: 'literal', value: '0.5rem' } }],
            },
          },
        ],
        children: [],
      },
    }
    const vue = emitVue(doc)
    expect(vue).toContain(':disabled="false"')
    expect(vue).toContain('aria-hidden="true"')
    expect(vue).toContain(`:style="{ gap: '0.5rem' }"`)

    const react = emitReact(doc)
    expect(react).toContain('disabled={false}')
    expect(react).toContain('aria-hidden="true"')
    expect(react).toContain('style={{ gap: "0.5rem" }}')
  })
})
