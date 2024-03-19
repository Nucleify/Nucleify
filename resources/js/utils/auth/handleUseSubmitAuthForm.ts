import axios from 'axios'
import { LoginFormInterface, RegisterFormInterface } from '../../interfaces'
import { useApiErrors } from '../index'

export default function useSubmitAuthForm(): {
    submitAuthForm: (
        data: LoginFormInterface | RegisterFormInterface
    ) => Promise<void>
} {
    let url

    const { apiErrors } = useApiErrors()

    function submitAuthForm(
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

        return axios
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
