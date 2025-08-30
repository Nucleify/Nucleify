import { describe, expect, it } from 'vitest'

import { darkenColor } from 'atomic'

describe('darkenColor', () => {
  it('should darken a pure red color by 50%', (): void => {
    const result = darkenColor('#ff0000', 50)
    expect(result).toBe('rgba(127, 0, 0, 1)')
  })

  it('should darken a pure green color by 25%', (): void => {
    const result = darkenColor('#00ff00', 25)
    expect(result).toBe('rgba(0, 191, 0, 1)')
  })

  it('should darken a pure blue color by 75%', (): void => {
    const result = darkenColor('#0000ff', 75)
    expect(result).toBe('rgba(0, 0, 63, 1)')
  })

  it('should return the same color when percent is 0', (): void => {
    const result = darkenColor('#123456', 0)
    expect(result).toBe('rgba(18, 52, 86, 1)')
  })

  it('should return black when percent is 100', (): void => {
    const result = darkenColor('#abcdef', 100)
    expect(result).toBe('rgba(0, 0, 0, 1)')
  })

  it('should apply custom alpha value', (): void => {
    const result = darkenColor('#ff8800', 30, 0.5)
    expect(result).toBe('rgba(178, 95, 0, 0.5)')
  })

  it('should handle white (#ffffff) correctly', (): void => {
    const result = darkenColor('#ffffff', 20)
    expect(result).toBe('rgba(204, 204, 204, 1)')
  })
})
