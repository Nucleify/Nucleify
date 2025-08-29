import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { getColorValue } from 'atomic'

describe('getColorValue', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return value from cookie if available', () => {
    vi.spyOn(atomic, 'cookieGetItem').mockReturnValue('#ff0000')
    vi.spyOn(atomic, 'localStorageGetItem').mockReturnValue(null)
    vi.spyOn(atomic, 'defaultColors', 'get').mockReturnValue({
      test: '#000000',
    })

    const result = getColorValue('test')
    expect(result).toBe('#ff0000')
  })

  it('should return value from localStorage if cookie is empty', () => {
    vi.spyOn(atomic, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(atomic, 'localStorageGetItem').mockReturnValue('#00ff00')
    vi.spyOn(atomic, 'defaultColors', 'get').mockReturnValue({
      test: '#000000',
    })

    const result = getColorValue('test')
    expect(result).toBe('#00ff00')
  })

  it('should return value from defaultColors if both cookie and localStorage are empty', () => {
    vi.spyOn(atomic, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(atomic, 'localStorageGetItem').mockReturnValue('')
    vi.spyOn(atomic, 'defaultColors', 'get').mockReturnValue({
      test: '#0000ff',
    })

    const result = getColorValue('test')
    expect(result).toBe('#0000ff')
  })

  it('should return empty string if no value is found', () => {
    vi.spyOn(atomic, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(atomic, 'localStorageGetItem').mockReturnValue('')
    vi.spyOn(atomic, 'defaultColors', 'get').mockReturnValue({})

    const result = getColorValue('test')
    expect(result).toBe('')
  })
})
