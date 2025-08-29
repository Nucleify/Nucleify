import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { applyColorsWithNewSuffix } from 'atomic'

describe('applyColorsWithNewSuffix', (): void => {
  let setPropertySpy: ReturnType<typeof vi.spyOn>

  beforeEach((): void => {
    vi.restoreAllMocks()

    setPropertySpy = vi
      .spyOn(document.documentElement.style, 'setProperty')
      .mockImplementation()
  })

  it('should call getColorValue with correct keys and set CSS variables', (): void => {
    vi.spyOn(atomic, 'getColorValue').mockImplementation(
      (key) => `value-of-${key}`
    )

    applyColorsWithNewSuffix()

    atomic.colorKeys.forEach((item) => {
      atomic.colorShades.forEach((state) => {
        const key = `${item}-item-${state}-new`

        expect(setPropertySpy).toHaveBeenCalledWith(
          `--${key}`,
          `value-of-${key}`
        )
      })
    })
  })

  it('should call setProperty correct number of times', (): void => {
    applyColorsWithNewSuffix()

    const expectedCalls = atomic.colorKeys.length * atomic.colorShades.length

    expect(setPropertySpy).toHaveBeenCalledTimes(expectedCalls)
  })
})
