import { Ref } from 'vue'

import {
  LoginFieldsInterface,
  LoginInputInterface,
  RegisterFieldsInterface,
  RegisterInputInterface,
} from 'atomic/bosons/types'

export interface UseAuthFormInterface {
  loginFields: Ref<LoginFieldsInterface>
  loginInputs: readonly LoginInputInterface[]
  registerFields: Ref<RegisterFieldsInterface>
  registerInputs: readonly RegisterInputInterface[]
  submitForm: (
    data: LoginFieldsInterface | RegisterFieldsInterface
  ) => Promise<void>
}
