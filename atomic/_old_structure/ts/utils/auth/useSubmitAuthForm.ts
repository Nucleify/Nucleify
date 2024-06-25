import axios from 'axios'

import {
    LoginFormInterface,
    RegisterFormInterface,
    UseSubmitAuthFormInterface,
} from '@/types'
import { useApiErrors } from '@/utils'

export default function useSubmitAuthForm(): UseSubmitAuthFormInterface {
    let url

    const { apiErrors } = useApiErrors()

    async function submitAuthForm(
        data: LoginFormInterface | RegisterFormInterface
    ): Promise<void> {
        switch (true) {
            case !('password_confirmation' in data):
                url = '/login'
                break
            case 'password_confirmation' in data:
                url = '/register'
                break
            default:
                throw Error
        }

        await axios
            .post(url, data)
            .then((): void => {
                window.location.href = '/home'
            })
            .catch((error): void => {
                apiErrors(error)
                throw error
            })
    }
    return {
        submitAuthForm,
    }
}
