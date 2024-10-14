import { FormDataType } from 'atomic/bosons/types'
import { checkPasswordsMatch } from 'atomic/bosons/utils'

export function isPasswordsMatch(formData: FormDataType): void {
    return checkPasswordsMatch(
        formData['password'],
        formData['password_confirmation']
    )
}
