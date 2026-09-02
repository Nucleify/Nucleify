import { type Ref, ref } from 'vue'

import type { AppFramework } from './app_framework'
import { assertAppFramework } from './app_framework'

import type { AuthFormState } from '../types/auth/interfaces'

export function createAuthFormState<
  TLogin extends object,
  TRegister extends object,
>(
  framework: AppFramework,
  initialLogin: TLogin,
  initialRegister: TRegister
): AuthFormState<TLogin, TRegister> {
  assertAppFramework(framework, 'nuxt')

  const loginFields = ref({ ...initialLogin }) as Ref<TLogin>
  const registerFields = ref({ ...initialRegister }) as Ref<TRegister>

  return {
    loginFields,
    setLoginFields: (value) => {
      loginFields.value =
        typeof value === 'function' ? value(loginFields.value) : value
    },
    registerFields,
    setRegisterFields: (value) => {
      registerFields.value =
        typeof value === 'function' ? value(registerFields.value) : value
    },
  }
}
