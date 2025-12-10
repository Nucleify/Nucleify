import { beforeEach, expect, it } from 'vitest'

import * as atomic from 'atomic'

beforeEach((): void => {
  window.sessionStorage.clear()
})

it('should remove user data from sessionStorage', (): void => {
  Object.keys(atomic.mockUser).forEach((key: string): void => {
    window.sessionStorage.setItem(
      `user_${key}`,
      atomic.mockUser[key as keyof atomic.NucUserObjectInterface] as string
    )
  })

  atomic.removeUserFromSessionStorage()

  Object.keys(atomic.mockUser).forEach((key: string): void => {
    expect(window.sessionStorage.getItem(`user_${key}`)).toBe('')
  })
})
