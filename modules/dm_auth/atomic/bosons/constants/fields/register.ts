import type { Ref } from 'vue'
import { ref } from 'vue'

import type {
  InputInterface,
  RegisterFieldKey,
  RegisterFieldsInterface,
} from 'atomic'

export const registerFields: Ref<RegisterFieldsInterface> =
  ref<RegisterFieldsInterface>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

const registerInputData: readonly [
  RegisterFieldKey,
  string,
  string,
  string,
  boolean,
][] = [
  ['name', 'text', 'name', 'Full Name', true],
  ['email', 'email', 'email', 'Email Address', false],
  ['password', 'password', 'password', 'Password', false],
  [
    'password_confirmation',
    'password',
    'password_confirmation',
    'Confirm Password',
    false,
  ],
] as const

export const registerInputs: readonly InputInterface<RegisterFieldKey>[] =
  registerInputData.map(
    ([
      model,
      type,
      id,
      label,
      autofocus,
    ]): InputInterface<RegisterFieldKey> => ({
      model,
      type,
      id,
      label,
      autofocus,
    })
  )
