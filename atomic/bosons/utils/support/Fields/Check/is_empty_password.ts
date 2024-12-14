import { FormDataInterface, checkIsEmpty } from 'atomic'

export function isEmptyPassword(formData: FormDataInterface): boolean {
  return checkIsEmpty(formData['password'])
}
