import { describe, expect, it } from 'vitest'

import { checkIsStaff } from 'atomic'

describe('checkIsStaff', (): void => {
  it('should return true for tech role', (): void => {
    expect(checkIsStaff('tech')).toBe(true)
  })

  it('should return true for test_admin role', (): void => {
    expect(checkIsStaff('test_admin')).toBe(true)
  })

  it('should return true for admin role', (): void => {
    expect(checkIsStaff('admin')).toBe(true)
  })

  it('should return true for super_admin role', (): void => {
    expect(checkIsStaff('super_admin')).toBe(true)
  })

  it('should return false for user role', (): void => {
    expect(checkIsStaff('user')).toBe(false)
  })

  it('should return false for test_user role', (): void => {
    expect(checkIsStaff('test_user')).toBe(false)
  })

  it('should return false for test_tech role', (): void => {
    expect(checkIsStaff('test_tech')).toBe(false)
  })

  it('should return false for empty string', (): void => {
    expect(checkIsStaff('')).toBe(false)
  })

  it('should return false for invalid role', (): void => {
    expect(checkIsStaff('invalid_role')).toBe(false)
  })
})
