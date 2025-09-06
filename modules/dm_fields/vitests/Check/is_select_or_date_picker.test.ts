import { describe, expect, it } from 'vitest'

import { isSelectOrDatePicker } from 'atomic'

describe('isSelectOrDatePicker', (): void => {
  it('returns true when parameter is select', (): void => {
    const parameter = 'select'

    expect(isSelectOrDatePicker(parameter)).toBe(true)
  })

  it('returns true when parameter is date-picker', (): void => {
    const parameter = 'date-picker'

    expect(isSelectOrDatePicker(parameter)).toBe(true)
  })

  it('returns false when parameter is not select or date-picker', (): void => {
    const parameter = 'text'

    expect(isSelectOrDatePicker(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(isSelectOrDatePicker(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(isSelectOrDatePicker(parameter)).toBe(false)
  })
})
