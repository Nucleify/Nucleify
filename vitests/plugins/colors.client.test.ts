import type { NuxtApp } from 'nuxt/app'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { applyColorsWithNewSuffix, cookieSetItem } from 'atomic'

import colorsClientPlugin from '../../nuxt/plugins/colors.client'

vi.mock('nuxt/app', () => ({
  defineNuxtPlugin: (fn: (nuxt: Record<string, unknown>) => void) => fn,
}))

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
    vi.stubGlobal('import', { meta: { client: true } })
    vi.clearAllMocks()
  })

  afterEach((): void => {
    delete globalThis.__TEST_CLIENT__
    vi.unstubAllGlobals()
  })

  it('calls applyColorsWithNewSuffix and syncs localStorage/cookies', (): void => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    colorsClientPlugin({} as NuxtApp)

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      applyColorsWithNewSuffix
    )
    expect(applyColorsWithNewSuffix).toHaveBeenCalled()
    expect(cookieSetItem).toHaveBeenCalledWith('foo-item-bar', 'localValue')
  })
})
