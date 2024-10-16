import { FormDataType } from 'atomic/bosons/types'
import { checkIsEmpty } from 'atomic/bosons/utils'

export function isEmptyConfirmPassword(formData: FormDataType): void {
  return checkIsEmpty(formData['password_confirmation'])
}
