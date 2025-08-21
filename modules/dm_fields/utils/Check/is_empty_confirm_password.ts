import type { FormDataInterface } from 'atomic'
import { checkIsEmpty } from 'atomic'

export function isEmptyConfirmPassword(formData: FormDataInterface): boolean {
  return checkIsEmpty(formData['password_confirmation'])
}
