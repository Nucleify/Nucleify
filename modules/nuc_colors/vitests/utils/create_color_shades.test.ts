import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { createColorShades } from 'atomic'

describe('createColorShades', (): void => {
  beforeEach((): void => {
    vi.restoreAllMocks()
  })

  it('should return an object with all expected keys', (): void => {
    vi.spyOn(atomic, 'darkenColor').mockImplementation(
      (color, percent) => `darkened(${color},${percent})`
    )
    vi.spyOn(atomic, 'setColorOpacity').mockImplementation(
      (color, opacity) => `opacity(${color},${opacity})`
    )

    const result = createColorShades('#ff0000')

    expect(result).toEqual({
      '': '#ff0000',
      dark: 'darkened(#ff0000,60)',
      hover: 'darkened(#ff0000,10)',
      focus: 'opacity(#ff0000,0.5)',
      highlight: 'opacity(#ff0000,0.08)',
      secondary: 'opacity(#ff0000,0.21)',
      selected: 'opacity(#ff0000,0.15)',
    })
  })

  it('should call darkenColor and setColorOpacity with correct arguments', (): void => {
    const darkenSpy = vi
      .spyOn(atomic, 'darkenColor')
      .mockReturnValue('darkened')
    const opacitySpy = vi
      .spyOn(atomic, 'setColorOpacity')
      .mockReturnValue('opacity')

    createColorShades('#00ff00')

    expect(darkenSpy).toHaveBeenCalledWith('#00ff00', 60)
    expect(darkenSpy).toHaveBeenCalledWith('#00ff00', 10)
    expect(opacitySpy).toHaveBeenCalledWith('#00ff00', 0.5)
    expect(opacitySpy).toHaveBeenCalledWith('#00ff00', 0.08)
    expect(opacitySpy).toHaveBeenCalledWith('#00ff00', 0.21)
    expect(opacitySpy).toHaveBeenCalledWith('#00ff00', 0.15)
  })
})
