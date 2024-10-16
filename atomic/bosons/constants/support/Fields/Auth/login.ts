import { Ref, ref } from 'vue'

import {
  InputInterface,
  LoginFieldKey,
  LoginFieldsInterface,
} from 'atomic/bosons/types'

export const loginFields: Ref<LoginFieldsInterface> = ref<LoginFieldsInterface>(
  {
    email: '',
    password: '',
  }
)

const inputData: readonly InputInterface<LoginFieldKey>[] = [
  ['email', 'email', 'email', 'Email Address', false],
  ['password', 'password', 'password', 'Password', false],
] as const

export const loginInputs: readonly InputInterface<LoginFieldKey>[] =
  inputData.map(
    ([
      model,
      type,
      id,
      label,
      autofocus,
    ]): readonly InputInterface<LoginFieldKey>[] => ({
      model,
      type,
      id,
      label,
      autofocus,
    })
  ) as const
