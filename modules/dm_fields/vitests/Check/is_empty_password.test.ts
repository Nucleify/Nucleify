import { describe, expect, it } from 'vitest'

import type { FormDataInterface } from 'atomic'
import { isEmptyPassword } from 'atomic'

describe('isEmptyPassword', (): void => {
  it('returns true when password is empty string', (): void => {
    const formData: FormDataInterface = {
      password: '',
    }

    expect(isEmptyPassword(formData)).toBe(true)
  })

  it('returns true when password is null', (): void => {
    const formData: FormDataInterface = {
      password: null,
    }

    expect(isEmptyPassword(formData)).toBe(true)
  })

  it('returns true when password is undefined', (): void => {
    const formData: FormDataInterface = {
      password: undefined,
    }

    expect(isEmptyPassword(formData)).toBe(true)
  })

  it('returns false when password has value', (): void => {
    const formData: FormDataInterface = {
      password: 'mypassword123',
    }

    expect(isEmptyPassword(formData)).toBe(false)
  })

  it('returns false when password has value with whitespace', (): void => {
    const formData: FormDataInterface = {
      password: ' mypassword123 ',
    }

    expect(isEmptyPassword(formData)).toBe(false)
  })
})
