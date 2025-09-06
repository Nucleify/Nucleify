import { describe, expect, it } from 'vitest'

import { passwordsMatch } from 'atomic'

describe('passwordsMatch', (): void => {
  it('returns true when passwords are identical', (): void => {
    expect(passwordsMatch('password123', 'password123')).toBe(true)
  })

  it('returns false when passwords are different', (): void => {
    expect(passwordsMatch('password123', 'password456')).toBe(false)
  })

  it('returns false when passwords differ only in case', (): void => {
    expect(passwordsMatch('Password123', 'password123')).toBe(false)
  })

  it('returns false when passwords are empty', (): void => {
    expect(passwordsMatch('', '')).toBe(false)
  })

  it('returns false when one password is empty', (): void => {
    expect(passwordsMatch('', 'password123')).toBe(false)
  })

  it('returns false when password is null', (): void => {
    expect(passwordsMatch(null, 'password123')).toBe(false)
  })

  it('returns false when password_confirmation is null', (): void => {
    expect(passwordsMatch('password123', null)).toBe(false)
  })
})
