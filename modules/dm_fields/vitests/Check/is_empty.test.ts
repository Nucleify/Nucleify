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
})
