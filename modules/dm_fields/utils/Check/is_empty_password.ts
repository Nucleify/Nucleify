import type { FormDataInterface } from 'atomic'
import { checkIsEmpty } from 'atomic'

export function isEmptyPassword(formData: FormDataInterface): boolean {
  return checkIsEmpty(formData['password'])
}
