import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'
import { resetColorsToDefault } from 'nucleify'

describe('resetColorsToDefault', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks()
    vi.spyOn(nucleify, 'clearUserColorsCache').mockImplementation()
    vi.spyOn(nucleify, 'updateAllUserColorsInDatabase').mockResolvedValue(
      undefined
    )
  })

  it('should reset all colors to default values', async (): Promise<void> => {
    await resetColorsToDefault()

    const styleElement = document.getElementById(
      `nuc-color-vars-${nucleify.getColorFramework()}`
    )
    expect(styleElement).toBeTruthy()
    expect(styleElement?.tagName).toBe('STYLE')

    const styleContent = styleElement?.textContent || ''

    nucleify.colorKeys.forEach((item) => {
      nucleify.colorShades.forEach((state) => {
        const key = `${item}-${state}`
        const defaultValue = nucleify.defaultColors[key]

        if (defaultValue) {
          expect(styleContent).toContain(`--${key}: ${defaultValue}`)
        }
      })
    })
  })

  it('should persist reset colors to the database', async (): Promise<void> => {
    await resetColorsToDefault()

    expect(nucleify.clearUserColorsCache).toHaveBeenCalledTimes(1)
    expect(nucleify.updateAllUserColorsInDatabase).toHaveBeenCalledTimes(1)
  })

  it('should call storage functions correctly', async (): Promise<void> => {
    const localStorageSetItemSpy = vi
      .spyOn(nucleify, 'localStorageSetItem')
      .mockImplementation()
    const cookieSetItemSpy = vi
      .spyOn(nucleify, 'cookieSetItem')
      .mockImplementation()

    await resetColorsToDefault()

    const expectedCalls = nucleify.colorKeys.reduce((acc, item) => {
      return (
        acc +
        nucleify.colorShades.filter(
          (state) => nucleify.defaultColors[`${item}-${state}`]
        ).length
      )
    }, 0)

    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
    expect(cookieSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
  })
})
