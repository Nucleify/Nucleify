import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { applyColorsWithNewSuffix } from 'atomic'

describe('applyColorsWithNewSuffix', (): void => {
  let appendChildSpy: ReturnType<typeof vi.spyOn<[Node], Node>>
  let createdStyle: HTMLStyleElement | null = null

  beforeEach((): void => {
    vi.restoreAllMocks()

    createdStyle = null
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'style') {
        createdStyle = {
          id: '',
          textContent: '',
        } as unknown as HTMLStyleElement
        return createdStyle
      }
      return document.createElement(tagName)
    })
    vi.spyOn(document, 'getElementById').mockReturnValue(null)
    appendChildSpy = vi
      .spyOn(document.head, 'appendChild')
      .mockImplementation(() => createdStyle as Node)
  })

  it('should call getColorValue with correct keys and set CSS variables', (): void => {
    vi.spyOn(atomic, 'getColorValue').mockImplementation(
      (key) => `value-of-${key}`
    )

    applyColorsWithNewSuffix()

    expect(createdStyle).not.toBeNull()
    expect(createdStyle!.id).toBe('nuc-color-vars')

    atomic.colorKeys.forEach((item) => {
      atomic.colorShades.forEach((state) => {
        const key = `${item}-item-${state}-new`

        expect(createdStyle!.textContent).toContain(`--${key}: value-of-${key}`)
      })
    })
  })

  it('should append style element to document head', (): void => {
    vi.spyOn(atomic, 'getColorValue').mockReturnValue('test-value')

    applyColorsWithNewSuffix()

    expect(appendChildSpy).toHaveBeenCalledTimes(1)
    expect(appendChildSpy).toHaveBeenCalledWith(createdStyle)
  })
})
