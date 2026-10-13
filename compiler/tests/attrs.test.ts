import { describe, expect, it } from 'vitest'
import { emitReact } from '../src/emit/react'
import { emitSolid } from '../src/emit/solid'
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

  it('parses unary minus as a numeric literal', () => {
    const ir = parseTsxToIr(
      `import { component } from '#nuc-compiler/runtime'
export default component({
  name: 'Tab',
  props: { active: { type: 'boolean', default: false } },
  render: (props) => (
    <button tabindex={props.active ? 0 : -1} />
  ),
})
`,
      'tab.nuc.tsx',
    )
    expect(ir.template).toMatchObject({
      kind: 'element',
      tag: 'button',
      props: [
        {
          kind: 'bind',
          name: 'tabindex',
          value: {
            kind: 'conditional',
            consequent: { kind: 'literal', value: 0 },
            alternate: { kind: 'literal', value: -1 },
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

    const solid = emitSolid(doc)
    expect(solid).toContain('disabled={false}')
    expect(solid).toContain('aria-hidden="true"')
    expect(solid).toContain('style={{ gap: "0.5rem" }}')
  })

  it('folds static CSS style strings into React style objects', () => {
    const doc: IrDocument = {
      ...base,
      name: 'Stop',
      template: {
        kind: 'element',
        tag: 'stop',
        props: [
          { kind: 'static', name: 'offset', value: '0%' },
          {
            kind: 'static',
            name: 'style',
            value: 'stop-color: hsl(var(--hue) 88% 68%); stop-opacity: 0.55',
          },
        ],
        children: [],
      },
    }
    const react = emitReact(doc)
    expect(react).toContain(
      'style={{ stopColor: "hsl(var(--hue) 88% 68%)", stopOpacity: "0.55" }}',
    )
    expect(react).not.toContain('style="stop-color:')
  })
})
