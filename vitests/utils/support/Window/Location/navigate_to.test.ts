import { it, expect, beforeEach } from 'vitest'

import { navigateTo } from 'atomic'

import type { MockLocation } from 'vitests'

beforeEach((): void => {
  delete window.location
  window.location = {
    href: '',
  } as MockLocation
})

it('navigates to specified URL', (): void => {
  const testUrl: string = '/home'

  navigateTo(testUrl)

  expect(window.location.href).toBe(testUrl)
})
