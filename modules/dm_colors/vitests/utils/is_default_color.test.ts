import { describe, expect, it } from 'vitest'

import { defaultColors, isDefaultColor } from 'atomic'

describe('isDefaultColor', (): void => {
  it('should return true when the value matches the default color', (): void => {
    const [key, value] = Object.entries(defaultColors)[0] as [string, string]

    expect(isDefaultColor(key, value)).toBe(true)
  })

  it('should return false when the value does not match the default color', (): void => {
    const [key] = Object.entries(defaultColors)[0] as [string, string]

    expect(isDefaultColor(key, '#123456')).toBe(false)
  })

  it('should return false when the key does not exist in defaultColors', (): void => {
    expect(isDefaultColor('nonExistingKey', '#abcdef')).toBe(false)
  })
})
