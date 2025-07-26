import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { isMobile } from 'atomic'

beforeEach((): void => {
  vi.stubGlobal('screen', {
    width: 1024,
  })
})

afterEach((): void => {
  vi.unstubAllGlobals()
})

it('returns true for screen width less than or equal to 992', (): void => {
  vi.stubGlobal('screen', { width: 992 })
  expect(isMobile()).toBe(true)

  vi.stubGlobal('screen', { width: 800 })
  expect(isMobile()).toBe(true)
})

it('returns false for screen width greater than 992', (): void => {
  vi.stubGlobal('screen', { width: 1200 })
  expect(isMobile()).toBe(false)
})
