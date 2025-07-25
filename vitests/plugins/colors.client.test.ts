import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { applyColorsWithNewSuffix, cookieSetItem } from 'atomic'

import colorsClientPlugin from '../../nuxt/plugins/colors.client'

vi.mock('atomic', () => ({
  colorKeys: ['foo'],
  colorTypes: ['bar'],
  cookieGetItem: vi.fn().mockReturnValue(undefined),
  localStorageGetItem: vi.fn().mockReturnValue('localValue'),
  cookieSetItem: vi.fn(),
  applyColorsWithNewSuffix: vi.fn(),
}))

describe('colors.client plugin', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
    })
    vi.clearAllMocks()
  })

  afterEach((): void => {
    delete globalThis.__TEST_CLIENT__
  })

  it('calls applyColorsWithNewSuffix and syncs localStorage/cookies', (): void => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    colorsClientPlugin()

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      applyColorsWithNewSuffix
    )
    expect(applyColorsWithNewSuffix).toHaveBeenCalled()
    expect(cookieSetItem).toHaveBeenCalledWith('foo-item-bar', 'localValue')
  })
})
