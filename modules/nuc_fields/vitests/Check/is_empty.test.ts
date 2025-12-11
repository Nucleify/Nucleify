import { describe, expect, it } from 'vitest'

import { isEmpty } from 'atomic'

describe('isEmpty', (): void => {
  it('returns true when parameter is empty string', (): void => {
    const parameter = ''

    expect(isEmpty(parameter)).toBe(true)
  })

  it('returns true when parameter is null', (): void => {
    const parameter = null

    expect(isEmpty(parameter)).toBe(true)
  })

  it('returns true when parameter is undefined', (): void => {
    const parameter = undefined

    expect(isEmpty(parameter)).toBe(true)
  })

  it('returns false when parameter has value', (): void => {
    const parameter = 'parameter'

    expect(isEmpty(parameter)).toBe(false)
  })

  it('returns false when parameter has value with whitespace', (): void => {
    const parameter = ' parameter '

    expect(isEmpty(parameter)).toBe(false)
  })

  it('returns true when parameter is empty array', (): void => {
    const parameter: unknown[] = []

    expect(isEmpty(parameter)).toBe(true)
  })

  it('returns false when parameter is array with values', (): void => {
    const parameter = [1, 2, 3]

    expect(isEmpty(parameter)).toBe(false)
  })

  it('returns true when parameter is empty object', (): void => {
    const parameter = {}

    expect(isEmpty(parameter)).toBe(true)
  })

  it('returns false when parameter is object with properties', (): void => {
    const parameter = { key: 'value' }

    expect(isEmpty(parameter)).toBe(false)
  })

  it('returns false when parameter is boolean true', (): void => {
    const parameter = true

    expect(isEmpty(parameter)).toBe(false)
  })

  it('returns false when parameter is symbol', (): void => {
    const parameter = Symbol('test')

    expect(isEmpty(parameter)).toBe(false)
  })
})
