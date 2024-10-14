import { it, expect, beforeEach } from 'vitest'

import { isCurrentUrl } from 'atomic/bosons/utils'

beforeEach((): void => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/home',
    },
    writable: true,
  })
})

it('returns true when url is included in the pathname', (): void => {
  expect(isCurrentUrl('home')).toBe(true)
})

it('returns false when url is not included in the pathname', (): void => {
  expect(isCurrentUrl('example')).toBe(false)
})
