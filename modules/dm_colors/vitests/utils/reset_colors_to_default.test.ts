import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { resetColorsToDefault } from 'atomic'

describe('resetColorsToDefault', (): void => {
  let setPropertySpy: ReturnType<typeof vi.spyOn>

  beforeEach((): void => {
    vi.restoreAllMocks()
    setPropertySpy = vi
      .spyOn(document.documentElement.style, 'setProperty')
      .mockImplementation()
  })

  it('should reset all colors to default values', (): void => {
    resetColorsToDefault()

    atomic.colorKeys.forEach((item) => {
      atomic.colorShades.forEach((state) => {
        const key = `${item}-item-${state}`
        const newKey = `${key}-new`
        const defaultValue = atomic.defaultColors[key]

        if (defaultValue) {
          expect(setPropertySpy).toHaveBeenCalledWith(
            `--${newKey}`,
            defaultValue
          )
        }
      })
    })
  })

  it('should call setProperty the correct number of times', (): void => {
    resetColorsToDefault()
    const expectedCalls = atomic.colorKeys.reduce((acc, item) => {
      return (
        acc +
        atomic.colorShades.filter(
          (state) => atomic.defaultColors[`${item}-item-${state}`]
        ).length
      )
    }, 0)

    expect(setPropertySpy).toHaveBeenCalledTimes(expectedCalls)
  })
})
