import { Ref, ref } from 'vue'

import {
  InputInterface,
  RegisterFieldKey,
  RegisterFieldsInterface,
} from 'atomic/bosons/types'

export const registerFields: Ref<RegisterFieldsInterface> =
  ref<RegisterFieldsInterface>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

const registerInputData: readonly InputInterface<RegisterFieldKey>[] = [
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
    ]): readonly InputInterface<RegisterFieldKey>[] => ({
      model,
      type,
      id,
      label,
      autofocus,
    })
  ) as const
