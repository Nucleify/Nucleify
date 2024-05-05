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
    FlashToastFunctionType,
} from '@/types'
import { useApiErrors, useFlashToast } from '@/utils'

export default function userApiMethods(): UserApiMethodsInterface {
    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } =
        useFlashToast()
    const results: UserResultsType = ref([])

    async function getAllUsers(): GetAllUsersFunctionType {
        return await axios
            .get('/api/users')
            .then((response: GetAllUsersAxiosFunctionType) => {
                return (results.value = response.data)
            })
            .catch((error): void => {
                apiErrors(error)
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
                getAllUsers().catch((error): void => {
                    apiErrors(error)
                })

                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    return { results, getAllUsers, getUser, storeUser, editUser, deleteUser }
}
