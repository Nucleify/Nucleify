import { describe, expect, it } from 'vitest'

import { hasNumber } from 'atomic'

describe('hasNumber', (): void => {
  it('returns true when parameter contains numbers', (): void => {
    const parameter = 'Test123'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains only numbers', (): void => {
    const parameter = '123456'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns false when parameter contains only letters', (): void => {
    const parameter = 'Test'

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns false when parameter contains only special characters', (): void => {
    const parameter = '!@#$%^&*()'

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns false when parameter is empty string', (): void => {
    const parameter = ''

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns true when parameter contains single digit', (): void => {
    const parameter = '1'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns false when parameter contains single letter', (): void => {
    const parameter = 'a'

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns true when parameter contains numbers with letters and symbols', (): void => {
    const parameter = 'test123!@#'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains numbers at the beginning', (): void => {
    const parameter = '123test'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains numbers at the end', (): void => {
    const parameter = 'test123'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains numbers in the middle', (): void => {
    const parameter = 'te123st'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains multiple numbers', (): void => {
    const parameter = '1a2b3c4d5e'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains zero', (): void => {
    const parameter = 'test0'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns true when parameter contains decimal point with numbers', (): void => {
    const parameter = 'test3.14'

    expect(hasNumber(parameter)).toBe(true)
  })

  it('returns false when parameter contains only spaces', (): void => {
    const parameter = ' '

    expect(hasNumber(parameter)).toBe(false)
  })

  it('returns true when parameter contains numbers with spaces', (): void => {
    const parameter = 'test 123'

    expect(hasNumber(parameter)).toBe(true)
  })
})
