import { it, expect, beforeEach } from 'vitest'

import { mockUser } from 'atomic/bosons/constants'
import { setUserToSessionStorage } from 'atomic/bosons/utils'

beforeEach((): void => {
  window.sessionStorage.clear()
})

it('should store user data in sessionStorage', (): void => {
  setUserToSessionStorage(mockUser)

  Object.entries(mockUser).forEach(([key, value]): void => {
    expect(window.sessionStorage.getItem(`user_${key}`)).toBe(value)
  })
})
