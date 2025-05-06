import {
  loginFields,
  loginInputs,
  registerFields,
  registerInputs,
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseAuthFormInterface,
  useToast,
  UseToastInterface,
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
        url = runtime.appUrl + 'login'
        break
      case 'password_confirmation' in data:
        url = runtime.appUrl + 'register'
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
