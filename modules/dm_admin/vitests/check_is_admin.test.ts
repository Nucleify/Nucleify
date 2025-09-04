import { describe, expect, it } from 'vitest'

import { checkIsAdmin } from 'atomic'

describe('checkIsAdmin', (): void => {
  it('should return true for admin role', (): void => {
    expect(checkIsAdmin('admin')).toBe(true)
  })

  it('should return true for test_admin role', (): void => {
    expect(checkIsAdmin('test_admin')).toBe(true)
  })

  it('should return true for super_admin role', (): void => {
    expect(checkIsAdmin('super_admin')).toBe(true)
  })

  it('should return false for user role', (): void => {
    expect(checkIsAdmin('user')).toBe(false)
  })

  it('should return false for tech role', (): void => {
    expect(checkIsAdmin('tech')).toBe(false)
  })

  it('should return false for test_user role', (): void => {
    expect(checkIsAdmin('test_user')).toBe(false)
  })

  it('should return false for test_tech role', (): void => {
    expect(checkIsAdmin('test_tech')).toBe(false)
  })

  it('should return false for empty string', (): void => {
    expect(checkIsAdmin('')).toBe(false)
  })

  it('should return false for invalid role', (): void => {
    expect(checkIsAdmin('invalid_role')).toBe(false)
  })
})
