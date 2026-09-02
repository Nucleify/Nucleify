import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'
import { resetColorsIfEmpty } from 'nucleify'

describe('resetColorsIfEmpty', (): void => {
  beforeEach((): void => {
    vi.restoreAllMocks()
    Object.defineProperty(import.meta, 'client', {
      value: true,
      configurable: true,
    })
  })

  it('should reset colors and set localStorage flag if not initialized', (): void => {
    const initializedKey = nucleify.colorStorageGetInitializedKey()
    const getItemSpy = vi
      .spyOn(nucleify, 'localStorageGetItem')
      .mockReturnValue(null)
    const setItemSpy = vi
      .spyOn(nucleify, 'localStorageSetItem')
      .mockImplementation()
    const resetSpy = vi
      .spyOn(nucleify, 'resetColorsToDefault')
      .mockImplementation()

    resetColorsIfEmpty()

    expect(getItemSpy).toHaveBeenCalledWith(initializedKey)
    expect(setItemSpy).toHaveBeenCalledWith(initializedKey, 'true')
    expect(resetSpy).toHaveBeenCalled()
  })

  it('should not reset colors if already initialized', (): void => {
    vi.spyOn(nucleify, 'localStorageGetItem').mockReturnValue('true')
    const setItemSpy = vi
      .spyOn(nucleify, 'localStorageSetItem')
      .mockImplementation()
    const resetSpy = vi
      .spyOn(nucleify, 'resetColorsToDefault')
      .mockImplementation()

    resetColorsIfEmpty()

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(resetSpy).not.toHaveBeenCalled()
  })
})
