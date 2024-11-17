import { FormDataInterface } from 'atomic/bosons/types'
import { checkIsEmpty } from 'atomic/bosons/utils'

export function isEmptyPassword(formData: FormDataInterface): boolean {
  return checkIsEmpty(formData['password'])
}
