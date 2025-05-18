import {
  loginFields,
  loginInputs,
  registerFields,
  registerInputs,
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseAuthFormInterface,
  navigateTo,
  apiHandle,
} from 'atomic'

export function useAuthForm(): UseAuthFormInterface {
  let url: string
  async function submitForm(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    switch (true) {
      case !('password_confirmation' in data):
        url = appUrl() + 'login'
        break
      case 'password_confirmation' in data:
        url = appUrl() + 'register'
        break
      default:
        throw Error
    }

    await apiHandle({
      url,
      method: 'POST',
      data,
      onSuccess: (): void => {
        navigateTo('/dashboard')
      },
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
