import { Ref, ref } from 'vue'

import { InputInterface, LoginFieldsInterface } from 'atomic/bosons/types'

export const loginFields: Ref<LoginFieldsInterface> = ref<LoginFieldsInterface>(
    {
        email: '',
        password: '',
    }
)
export const loginInputs: readonly InputInterface[] = [
    {
        model: 'email',
        type: 'email',
        id: 'email',
        label: 'Email Address',
        autofocus: false,
    },
    {
        model: 'password',
        type: 'password',
        id: 'password',
        label: 'Password',
        autofocus: false,
    },
] as const
