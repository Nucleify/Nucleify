import { describe, expect, it } from 'vitest'

import { hasMinLength } from 'atomic'

describe('hasMinLength', (): void => {
  it('returns true when parameter length equals default min length', (): void => {
    const parameter = '12345678'

    expect(hasMinLength(parameter)).toBe(true)
  })

  it('returns true when parameter length exceeds default min length', (): void => {
    const parameter = '123456789'

    expect(hasMinLength(parameter)).toBe(true)
  })

  it('returns false when parameter length is less than default min length', (): void => {
    const parameter = '1234567'

    expect(hasMinLength(parameter)).toBe(false)
  })

  it('returns true when parameter length equals custom min length', (): void => {
    const parameter = '12345'
    const minLength = 5

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })

  it('returns true when parameter length exceeds custom min length', (): void => {
    const parameter = '123456'
    const minLength = 5

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })

  it('returns false when parameter length is less than custom min length', (): void => {
    const parameter = '1234'
    const minLength = 5

    expect(hasMinLength(parameter, minLength)).toBe(false)
  })

  it('returns false when parameter is empty string', (): void => {
    const parameter = ''

    expect(hasMinLength(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(hasMinLength(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(hasMinLength(parameter)).toBe(false)
  })

  it('returns true when parameter is single character with min length 1', (): void => {
    const parameter = 'a'
    const minLength = 1

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })

  it('returns false when parameter is single character with min length 2', (): void => {
    const parameter = 'a'
    const minLength = 2

    expect(hasMinLength(parameter, minLength)).toBe(false)
  })

  it('returns true when parameter contains spaces and meets min length', (): void => {
    const parameter = 'hello world'
    const minLength = 10

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })

  it('returns true when parameter contains special characters and meets min length', (): void => {
    const parameter = 'test@123!'
    const minLength = 8

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })

  it('returns true when min length is 0 and parameter has content', (): void => {
    const parameter = 'any content'
    const minLength = 0

    expect(hasMinLength(parameter, minLength)).toBe(true)
  })
})
