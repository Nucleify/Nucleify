import axios from 'axios'

import {
  loginFields,
  loginInputs,
  registerFields,
  registerInputs,
} from 'atomic/bosons/constants'
import {
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseAuthFormInterface,
} from 'atomic/bosons/types'
import { useApiErrors, navigateTo } from 'atomic/bosons/utils'

export function useAuthForm(): UseAuthFormInterface {
  const { apiErrors } = useApiErrors()
  let url

  async function submitForm(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    switch (true) {
      case !('password_confirmation' in data):
        url = '/login'
        break
      case 'password_confirmation' in data:
        url = '/register'
        break
      default:
        throw Error
    }

    await axios
      .post(url, data)
      .then((): void => {
        navigateTo('/dashboard')
      })
      .catch((error): void => {
        apiErrors(error)
        throw error
      })
  }
  return {
    submitForm,
    loginFields,
    loginInputs,
    registerFields,
    registerInputs,
  }
}
