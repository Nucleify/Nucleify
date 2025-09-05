import { describe, expect, it } from 'vitest'

import type { FormDataInterface } from 'atomic'
import { isEmptyConfirmPassword } from 'atomic'

describe('isEmptyConfirmPassword', (): void => {
  it('returns true when password_confirmation is empty string', (): void => {
    const formData: FormDataInterface = {
      password_confirmation: '',
    }

    expect(isEmptyConfirmPassword(formData)).toBe(true)
  })

  it('returns true when password_confirmation is null', (): void => {
    const formData: FormDataInterface = {
      password_confirmation: null,
    }

    expect(isEmptyConfirmPassword(formData)).toBe(true)
  })

  it('returns true when password_confirmation is undefined', (): void => {
    const formData: FormDataInterface = {
      password_confirmation: undefined,
    }

    expect(isEmptyConfirmPassword(formData)).toBe(true)
  })

  it('returns false when password_confirmation has value', (): void => {
    const formData: FormDataInterface = {
      password_confirmation: 'password123',
    }

    expect(isEmptyConfirmPassword(formData)).toBe(false)
  })

  it('returns false when password_confirmation has value with whitespace', (): void => {
    const formData: FormDataInterface = {
      password_confirmation: ' password123 ',
    }

    expect(isEmptyConfirmPassword(formData)).toBe(false)
  })
})
