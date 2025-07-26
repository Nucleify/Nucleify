import type { NuxtApp } from 'nuxt/app'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import performanceClientPlugin from '../../nuxt/plugins/performance.client'

vi.mock('nuxt/app', () => ({
  defineNuxtPlugin: (fn: (nuxt: Record<string, unknown>) => void) => fn,
}))

describe('performance.client plugin', (): void => {
  beforeEach((): void => {
    document.body.innerHTML = ''
    globalThis.__TEST_CLIENT__ = true
    vi.stubGlobal('import', { meta: { client: true } })
  })

  afterEach((): void => {
    delete globalThis.__TEST_CLIENT__
    vi.unstubAllGlobals()
  })

  it('defers CSS for all but the first stylesheet', (): void => {
    const link1 = document.createElement('link')
    const link2 = document.createElement('link')

    link1.rel = 'stylesheet'
    link2.rel = 'stylesheet'

    document.body.appendChild(link1)
    document.body.appendChild(link2)

    performanceClientPlugin({} as NuxtApp)

    expect(link1.getAttribute('media')).not.toBe('print')
    expect(link2.getAttribute('media')).toBe('print')
    expect(link2.getAttribute('onload')).toBe("this.media='all'")
  })

  it('optimizes images', (): void => {
    const img = document.createElement('img')

    document.body.appendChild(img)

    performanceClientPlugin({} as NuxtApp)

    expect(['auto', 'lazy']).toContain(img.loading)
    expect(['auto', 'async']).toContain(img.decoding)
  })

  it('attaches ResizeObserver to document.body', (): void => {
    const observe = vi.fn()

    global.ResizeObserver = vi.fn().mockImplementation(function (this: {
      observe: typeof observe
    }) {
      this.observe = observe
    })

    performanceClientPlugin({} as NuxtApp)

    expect(observe).toHaveBeenCalledWith(document.body)
  })
})
