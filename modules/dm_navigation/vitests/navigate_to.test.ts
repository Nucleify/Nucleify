import { beforeEach, expect, it } from 'vitest'

import * as atomic from 'atomic'

beforeEach((): void => {
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
    configurable: true,
  })
})

it('navigates to specified URL', (): void => {
  const testUrl: string = '/home'

  atomic.navigateTo(testUrl)

  expect(window.location.href).toBe(testUrl)
})
