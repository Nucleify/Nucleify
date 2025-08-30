import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { resetColorsIfEmpty } from 'atomic'

describe('resetColorsIfEmpty', (): void => {
  beforeEach((): void => {
    vi.restoreAllMocks()
    Object.defineProperty(import.meta, 'client', {
      value: true,
      configurable: true,
    })
  })

  it('should reset colors and set localStorage flag if not initialized', (): void => {
    const getItemSpy = vi
      .spyOn(atomic, 'localStorageGetItem')
      .mockReturnValue(null)
    const setItemSpy = vi
      .spyOn(atomic, 'localStorageSetItem')
      .mockImplementation()
    const resetSpy = vi
      .spyOn(atomic, 'resetColorsToDefault')
      .mockImplementation()

    resetColorsIfEmpty()

    expect(getItemSpy).toHaveBeenCalledWith('colors-initialized')
    expect(setItemSpy).toHaveBeenCalledWith('colors-initialized', 'true')
    expect(resetSpy).toHaveBeenCalled()
  })

  it('should not reset colors if already initialized', (): void => {
    vi.spyOn(atomic, 'localStorageGetItem').mockReturnValue('true')
    const setItemSpy = vi
      .spyOn(atomic, 'localStorageSetItem')
      .mockImplementation()
    const resetSpy = vi
      .spyOn(atomic, 'resetColorsToDefault')
      .mockImplementation()

    resetColorsIfEmpty()

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(resetSpy).not.toHaveBeenCalled()
  })
})
