import { FormDataType } from 'atomic/bosons/types'
import { checkIsEmpty } from 'atomic/bosons/utils'

export function isEmptyPassword(formData: FormDataType): void {
  return checkIsEmpty(formData['password'])
}
