import { Ref, ref } from 'vue'
import axios from 'axios'

import {
    GetAllUsersAxiosFunctionType,
    GetAllUsersFunctionType,
    GetUserFunctionType,
    GetUserAxiosFunctionType,
    UserApiMethodsInterface,
    UserInterface,
    UserResultsType,
} from '@/types'
import { useApiErrors, useFlashToast } from '@/utils'

export default function userApiMethods(): UserApiMethodsInterface {
    const { apiErrors } = useApiErrors()
    const { flashToast } = useFlashToast()
    const results: UserResultsType = ref([])

    async function getAllUsers(): GetAllUsersFunctionType {
        return await axios
            .get('/api/users')
            .then((response: GetAllUsersAxiosFunctionType) => {
                return (results.value = response.data)
            })
            .catch((error) => {
                apiErrors(error)
            })
    }

    async function getUser(): GetUserFunctionType {
        return await axios
            .get('/api/user')
            .then((response: GetUserAxiosFunctionType) => {
                return response.data
            })
            .catch((error) => {
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
            .then((response) => {
                getData()
                close('create')

                flashToast(response.data.message, 'success')
            })
            .catch((error) => {
                apiErrors(error)
            })
    }

    async function editUser(
        data: UserInterface,
        getData: () => void,
        close: (method: string) => void
    ) {
        return await axios
            .put('/api/users/' + data.id, {
                name: data.name,
                email: data.email,
                role: data.role,
            })
            .then((response) => {
                getData()
                close('edit')

                flashToast(response.data.message, 'success')
            })
            .catch((error) => {
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
            .then((response) => {
                getAllUsers().catch((error) => {
                    apiErrors(error)
                })

                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error) => {
                apiErrors(error)
            })
    }

    return { results, getAllUsers, getUser, storeUser, editUser, deleteUser }
}
