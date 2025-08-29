import { beforeEach, expect, it } from 'vitest'

import * as atomic from 'atomic'

beforeEach((): void => {
  window.sessionStorage.clear()
})

it('should store user data in sessionStorage', (): void => {
  atomic.setUserToSessionStorage(atomic.mockUser)

  Object.entries(atomic.mockUser).forEach(([key, value]): void => {
    const sessionStorageValue = window.sessionStorage.getItem(`user_${key}`)
    if (typeof value === 'number') {
      expect(Number(sessionStorageValue)).toBe(value)
    } else {
      expect(sessionStorageValue).toBe(String(value))
    }
  })
})
