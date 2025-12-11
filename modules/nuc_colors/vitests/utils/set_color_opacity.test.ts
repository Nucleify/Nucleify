import { describe, expect, it } from 'vitest'

import { setColorOpacity } from 'atomic'

describe('setColorOpacity', (): void => {
  it('should convert hex to rgba with given opacity', (): void => {
    const result = setColorOpacity('#ff0000', 0.5)
    expect(result).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('should handle green hex color', (): void => {
    const result = setColorOpacity('#00ff00', 1)
    expect(result).toBe('rgba(0, 255, 0, 1)')
  })

  it('should handle blue hex color', (): void => {
    const result = setColorOpacity('#0000ff', 0.25)
    expect(result).toBe('rgba(0, 0, 255, 0.25)')
  })

  it('should handle black', (): void => {
    const result = setColorOpacity('#000000', 0.75)
    expect(result).toBe('rgba(0, 0, 0, 0.75)')
  })

  it('should handle white', (): void => {
    const result = setColorOpacity('#ffffff', 0.3)
    expect(result).toBe('rgba(255, 255, 255, 0.3)')
  })

  it('should work without the # prefix', (): void => {
    const result = setColorOpacity('abcdef', 0.9)
    expect(result).toBe('rgba(171, 205, 239, 0.9)')
  })
})
