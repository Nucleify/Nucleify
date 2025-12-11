import type { Ref } from 'vue'
import { ref } from 'vue'

import type {
  InputInterface,
  LoginFieldKey,
  LoginFieldsInterface,
} from 'atomic'

export const loginFields: Ref<LoginFieldsInterface> = ref<LoginFieldsInterface>(
  {
    email: '',
    password: '',
  }
)

const inputData: readonly [LoginFieldKey, string, string, string, boolean][] = [
  ['email', 'email', 'email', 'Email Address', false],
  ['password', 'password', 'password', 'Password', false],
] as const

export const loginInputs: readonly InputInterface<LoginFieldKey>[] =
  inputData.map(
    ([model, type, id, label, autofocus]): InputInterface<LoginFieldKey> => ({
      model,
      type,
      id,
      label,
      autofocus,
    })
  )
