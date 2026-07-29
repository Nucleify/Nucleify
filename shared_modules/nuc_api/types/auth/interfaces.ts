import type { Ref } from 'vue'

import type { AuthFormSetFields } from './variables'

export type AuthFormState<TLogin extends object, TRegister extends object> = {
  loginFields: Ref<TLogin>
  setLoginFields: AuthFormSetFields<TLogin>
  registerFields: Ref<TRegister>
  setRegisterFields: AuthFormSetFields<TRegister>
}
