import { describe, expect, it } from 'vitest'
import { COMPILER_NAME, COMPILER_PHASE, parseIrDocument } from '../src/index'

describe('@nucleify/compiler smoke', () => {
  it('exports package identity', () => {
    expect(COMPILER_NAME).toBe('@nucleify/compiler')
    expect(COMPILER_PHASE).toBe(8)
  })

  it('parseIrDocument accepts minimal hello-shaped IR', () => {
    const doc = parseIrDocument({
      irVersion: '0.1.0',
      name: 'Smoke',
      portable: true,
      props: [],
      state: [],
      derived: [],
      handlers: [],
      template: { kind: 'text', value: 'ok' },
    })
    expect(doc.portable).toBe(true)
  })
})
