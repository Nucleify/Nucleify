import axios, { AxiosResponse } from 'axios'
import { ref } from 'vue'

import {
    GetAllUsersAxiosFunctionType,
    GetAllUsersFunctionType,
    GetUserFunctionType,
    GetUserAxiosFunctionType,
    UserApiMethodsInterface,
    UserInterface,
    UserResultsType,
    ApiErrorsFunctionType,
} from '@/types'
import { useApiErrors, useLoading } from '@/utils'

import { FlashToastFunctionType } from 'atomic/bosons/types'
import { useToast } from 'atomic/bosons/utils'

export default function userApiMethods(): UserApiMethodsInterface {
    const results: UserResultsType = ref([])
    const { loading, setLoading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } =
        useToast()

    async function getAllUsers(timeout?: number): GetAllUsersFunctionType {
        setLoading(true)

        return await axios
            .get('/api/users')
            .then((response: GetAllUsersAxiosFunctionType) => {
                if (timeout) {
                    setTimeout((): void => {
                        results.value = response.data
                    }, timeout)
                } else {
                    results.value = response.data
                }
            })
            .catch((error): void => {
                if (timeout) {
                    setTimeout((): void => {
                        apiErrors(error)
                    }, timeout)
                } else {
                    apiErrors(error)
                }
            })
            .finally((): void => {
                if (timeout) {
                    setLoading(false, timeout)
                } else {
                    setLoading(false)
                }
            })
    }

    async function getUser(): GetUserFunctionType {
        return await axios
            .get('/api/user')
            .then((response: GetUserAxiosFunctionType) => {
                return response.data
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function storeUser(
        data: UserInterface,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        return await axios
            .post('/api/users', {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                confirm_password: data.confirm_password,
            })
            .then((response: AxiosResponse): void => {
                getData()
                close('create')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function editUser(
        data: UserInterface,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        return await axios
            .put('/api/users/' + data.id, {
                name: data.name,
                email: data.email,
                role: data.role,
            })
            .then((response: AxiosResponse): void => {
                getData()
                close('edit')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function deleteUser(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        return await axios
            .delete(`/api/users/${id}`)
            .then((response: AxiosResponse): void => {
                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    return {
        results,
        loading,
        getAllUsers,
        getUser,
        storeUser,
        editUser,
        deleteUser,
    }
}
