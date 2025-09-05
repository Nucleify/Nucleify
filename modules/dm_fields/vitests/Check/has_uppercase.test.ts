import { describe, expect, it } from 'vitest'

import { hasUppercase } from 'atomic'

describe('hasUppercase', (): void => {
  it('returns true when parameter contains uppercase letters', (): void => {
    const parameter = 'Test'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains only uppercase letters', (): void => {
    const parameter = 'TEST'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains only lowercase letters', (): void => {
    const parameter = 'test'

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns false when parameter contains only numbers', (): void => {
    const parameter = '123456'

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns false when parameter contains only special characters', (): void => {
    const parameter = '!@#$%^&*()'

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns false when parameter is empty string', (): void => {
    const parameter = ''

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains single uppercase letter', (): void => {
    const parameter = 'T'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains single lowercase letter', (): void => {
    const parameter = 't'

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains uppercase with numbers and symbols', (): void => {
    const parameter = 'TEST123!@#'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains only lowercase with numbers and symbols', (): void => {
    const parameter = 'test123!@#'

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains uppercase at the beginning', (): void => {
    const parameter = 'Test123'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains uppercase at the end', (): void => {
    const parameter = 'test123T'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains uppercase in the middle', (): void => {
    const parameter = 'teSt123'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains multiple uppercase letters', (): void => {
    const parameter = 'TeStInG'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns true when parameter contains mixed case with spaces', (): void => {
    const parameter = 'Hello World'

    expect(hasUppercase(parameter)).toBe(true)
  })

  it('returns false when parameter contains only spaces', (): void => {
    const parameter = ' '

    expect(hasUppercase(parameter)).toBe(false)
  })

  it('returns true when parameter contains uppercase with spaces', (): void => {
    const parameter = 'TEST 123'

    expect(hasUppercase(parameter)).toBe(true)
  })
})
