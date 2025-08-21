import type { FormDataInterface } from 'atomic'
import { checkPasswordsMatch } from 'atomic'

export function isPasswordsMatch(formData: FormDataInterface): boolean {
  return checkPasswordsMatch(
    formData['password'],
    formData['password_confirmation']
  )
}
