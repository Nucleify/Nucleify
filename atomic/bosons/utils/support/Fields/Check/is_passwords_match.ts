import { FormDataInterface } from 'atomic/bosons/types'
import { checkPasswordsMatch } from 'atomic/bosons/utils'

export function isPasswordsMatch(formData: FormDataInterface): boolean {
  return checkPasswordsMatch(
    formData['password'],
    formData['password_confirmation']
  )
}
