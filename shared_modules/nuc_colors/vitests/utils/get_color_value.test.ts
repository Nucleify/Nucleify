import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'
import { getColorValue } from 'nucleify'

describe('getColorValue', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return value from cookie if available', () => {
    vi.spyOn(nucleify, 'cookieGetItem').mockReturnValue('#ff0000')
    vi.spyOn(nucleify, 'localStorageGetItem').mockReturnValue(null)
    vi.spyOn(nucleify, 'defaultColors', 'get').mockReturnValue({
      test: '#000000',
    })

    const result = getColorValue('test')
    expect(result).toBe('#ff0000')
  })

  it('should return value from localStorage if cookie is empty', () => {
    vi.spyOn(nucleify, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(nucleify, 'localStorageGetItem').mockReturnValue('#00ff00')
    vi.spyOn(nucleify, 'defaultColors', 'get').mockReturnValue({
      test: '#000000',
    })

    const result = getColorValue('test')
    expect(result).toBe('#00ff00')
  })

  it('should return value from defaultColors if both cookie and localStorage are empty', () => {
    vi.spyOn(nucleify, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(nucleify, 'localStorageGetItem').mockReturnValue('')
    vi.spyOn(nucleify, 'defaultColors', 'get').mockReturnValue({
      test: '#0000ff',
    })

    const result = getColorValue('test')
    expect(result).toBe('#0000ff')
  })

  it('should return empty string if no value is found', () => {
    vi.spyOn(nucleify, 'cookieGetItem').mockReturnValue('')
    vi.spyOn(nucleify, 'localStorageGetItem').mockReturnValue('')
    vi.spyOn(nucleify, 'defaultColors', 'get').mockReturnValue({})

    const result = getColorValue('test')
    expect(result).toBe('')
  })
})
