import { useRouter } from 'nuxt/app'

import type {
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseAuthFormInterface,
} from 'atomic'
import {
  apiHandle,
  getAndSetUser,
  loginFields,
  loginInputs,
  registerFields,
  registerInputs,
} from 'atomic'

export function useAuthForm(): UseAuthFormInterface {
  let url: string
  const router = useRouter()

  async function submitForm(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    switch (true) {
      case !('password_confirmation' in data):
        url = appUrl() + '/login'
        break
      case 'password_confirmation' in data:
        url = appUrl() + '/register'
        break
      default:
        throw Error
    }

    await apiHandle({
      url,
      method: 'POST',
      data,
      onSuccess: async (): Promise<void> => {
        await getAndSetUser()
      },
    })
  }

  async function submitAndGo(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    await submitForm(data)
    router.push('/settings#modules')
  }

  return {
    submitForm,
    submitAndGo,
    loginFields,
    loginInputs,
    registerFields,
    registerInputs,
  }
}
