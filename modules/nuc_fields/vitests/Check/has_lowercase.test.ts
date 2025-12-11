import { describe, expect, it } from 'vitest'

import { hasLowercase } from 'atomic'

describe('hasLowercase', (): void => {
  it('returns true when parameter contains lowercase letters', (): void => {
    const parameter = 'Test'

    expect(hasLowercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains only lowercase letters', (): void => {
    const parameter = 'test'

    expect(hasLowercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains only uppercase letters', (): void => {
    const parameter = 'TEST'

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns false when parameter contains only numbers', (): void => {
    const parameter = '123456'

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns false when parameter contains only special characters', (): void => {
    const parameter = '!@#$%^&*()'

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns false when parameter is empty string', (): void => {
    const parameter = ''

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains single lowercase letter', (): void => {
    const parameter = 't'

    expect(hasLowercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains single uppercase letter', (): void => {
    const parameter = 'T'

    expect(hasLowercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains lowercase with numbers and symbols', (): void => {
    const parameter = 'test123!@#'

    expect(hasLowercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains only uppercase with numbers and symbols', (): void => {
    const parameter = 'TEST123!@#'

    expect(hasLowercase(parameter)).toBe(false)
  })
})
