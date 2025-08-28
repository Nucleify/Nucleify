import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

type NuxtAppStub = Parameters<typeof atomic.performanceClientPlugin>[0]
const nuxtAppStub = {} as unknown as NuxtAppStub

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

    atomic.performanceClientPlugin(nuxtAppStub)

    expect(link1.getAttribute('media')).not.toBe('print')
    expect(link2.getAttribute('media')).toBe('print')
    expect(link2.getAttribute('onload')).toBe("this.media='all'")
  })

  it('optimizes images', (): void => {
    const img = document.createElement('img')

    document.body.appendChild(img)

    atomic.performanceClientPlugin(nuxtAppStub)

    expect(['auto', 'lazy']).toContain(img.loading)
    expect(['auto', 'async']).toContain(img.decoding)
  })

  it('attaches ResizeObserver to document.body', (): void => {
    const observe = vi.fn()

    globalThis.ResizeObserver = vi.fn().mockImplementation(function (this: {
      observe: (target: Element) => void
    }): void {
      this.observe = observe
    }) as unknown as typeof ResizeObserver

    atomic.performanceClientPlugin(nuxtAppStub)

    expect(observe).toHaveBeenCalledWith(document.body)
  })
})
