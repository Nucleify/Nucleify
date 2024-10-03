import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
    ApiErrorsFunctionType,
    DeleteEntityRequestFunctionType,
    EditUserRequestFunctionType,
    FlashToastFunctionType,
    GetAllUsersRequestFunctionType,
    GetAllUsersRequestResponseType,
    GetUserRequestFunctionType,
    GetUserRequestResponseType,
    StoreUserRequestFunctionType,
    UserInterface,
    UserRequestsInterface,
    UserResultsType,
} from 'atomic/bosons/types'
import { useApiErrors, useLoading, useToast } from 'atomic/bosons/utils'

export function userRequests(): UserRequestsInterface {
    const results: UserResultsType = ref([])
    const { loading, setLoading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllUsers(
        timeout?: number
    ): GetAllUsersRequestFunctionType {
        setLoading(true)

        return await axios
            .get('/api/users')
            .then((response: GetAllUsersRequestResponseType) => {
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

    async function getUser(): GetUserRequestFunctionType {
        return await axios
            .get('/api/user')
            .then((response: GetUserRequestResponseType) => {
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
    ): StoreUserRequestFunctionType {
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
    ): EditUserRequestFunctionType {
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
    ): DeleteEntityRequestFunctionType {
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
