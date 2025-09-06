import { describe, expect, it } from 'vitest'

import { isPhoneField } from 'atomic'

describe('isPhoneField', (): void => {
  it('returns true when parameter is work_phone', (): void => {
    const parameter = 'work_phone'

    expect(isPhoneField(parameter)).toBe(true)
  })

  it('returns true when parameter is personal_phone', (): void => {
    const parameter = 'personal_phone'

    expect(isPhoneField(parameter)).toBe(true)
  })

  it('returns false when parameter is not a phone field', (): void => {
    const parameter = 'email'

    expect(isPhoneField(parameter)).toBe(false)
  })

  it('returns false when parameter is null', (): void => {
    const parameter = null

    expect(isPhoneField(parameter)).toBe(false)
  })

  it('returns false when parameter is undefined', (): void => {
    const parameter = undefined

    expect(isPhoneField(parameter)).toBe(false)
  })
})
