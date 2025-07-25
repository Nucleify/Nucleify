import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import performanceClientPlugin from '../../nuxt/plugins/performance.client'

describe('performance.client plugin', (): void => {
  beforeEach((): void => {
    document.body.innerHTML = ''
    globalThis.__TEST_CLIENT__ = true
  })

  afterEach((): void => {
    delete globalThis.__TEST_CLIENT__
  })

  it('defers CSS for all but the first stylesheet', (): void => {
    const link1 = document.createElement('link')
    const link2 = document.createElement('link')

    link1.rel = 'stylesheet'
    link2.rel = 'stylesheet'

    document.body.appendChild(link1)
    document.body.appendChild(link2)

    performanceClientPlugin()

    expect(link1.getAttribute('media')).not.toBe('print')
    expect(link2.getAttribute('media')).toBe('print')
    expect(link2.getAttribute('onload')).toBe("this.media='all'")
  })

  it('optimizes images', (): void => {
    const img = document.createElement('img')

    document.body.appendChild(img)

    performanceClientPlugin()

    expect(['auto', 'lazy']).toContain(img.loading)
    expect(['auto', 'async']).toContain(img.decoding)
  })

  it('attaches ResizeObserver to document.body', (): void => {
    const observe = vi.fn()

    global.ResizeObserver = vi.fn().mockImplementation(function (this) {
      this.observe = observe
    })

    performanceClientPlugin()

    expect(observe).toHaveBeenCalledWith(document.body)
  })
})
