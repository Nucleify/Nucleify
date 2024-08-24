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

export const registerInputs: readonly InputInterface<RegisterFieldKey>[] = [
    {
        model: 'name',
        type: 'text',
        id: 'name',
        label: 'Full Name',
        autofocus: true,
    },
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
    {
        model: 'password_confirmation',
        type: 'password',
        id: 'password_confirmation',
        label: 'Confirm Password',
        autofocus: false,
    },
] as const
