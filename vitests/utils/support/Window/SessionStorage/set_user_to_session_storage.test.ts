import { it, expect, beforeEach } from 'vitest'

import { mockUser, setUserToSessionStorage } from 'atomic'

beforeEach((): void => {
  window.sessionStorage.clear()
})

it('should store user data in sessionStorage', (): void => {
  setUserToSessionStorage(mockUser)

  Object.entries(mockUser).forEach(([key, value]): void => {
    expect(window.sessionStorage.getItem(`user_${key}`)).toBe(value)
  })
})
