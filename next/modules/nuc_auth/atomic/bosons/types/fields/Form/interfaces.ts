import type { Dispatch, SetStateAction } from 'react'

import type {
  InputInterface,
  LoginFieldsInterface,
  LoginInputInterface,
  RegisterFieldsInterface,
  RegisterInputInterface,
} from 'nucleify'

export interface UseAuthFormInterface {
  loginFields: LoginFieldsInterface
  setLoginFields: Dispatch<SetStateAction<LoginFieldsInterface>>
  loginInputs: readonly LoginInputInterface[]
  registerFields: RegisterFieldsInterface
  setRegisterFields: Dispatch<SetStateAction<RegisterFieldsInterface>>
  registerInputs: readonly RegisterInputInterface[]
  submitForm: (
    data: LoginFieldsInterface | RegisterFieldsInterface
  ) => Promise<void>
  submitAndGo: (
    data: LoginFieldsInterface | RegisterFieldsInterface
  ) => Promise<void>
}
