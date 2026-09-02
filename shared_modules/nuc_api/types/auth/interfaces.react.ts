import type { AuthFormSetFields } from './variables'

export type AuthFormState<TLogin extends object, TRegister extends object> = {
  loginFields: TLogin
  setLoginFields: AuthFormSetFields<TLogin>
  registerFields: TRegister
  setRegisterFields: AuthFormSetFields<TRegister>
}
