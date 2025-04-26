import axios from 'axios'

import {
  loginFields,
  loginInputs,
  registerFields,
  registerInputs,
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseApiErrorsInterface,
  UseAuthFormInterface,
  useApiErrors,
  navigateTo,
} from 'atomic'

export function useAuthForm(): UseAuthFormInterface {
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
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
