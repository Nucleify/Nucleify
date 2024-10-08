import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
    ApiErrorsFunctionType,
    CloseDialogFunctionType,
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
import {
    apiSuccess,
    useApiErrors,
    useLoading,
    useToast,
} from 'atomic/bosons/utils'

export function userRequests(
    close: CloseDialogFunctionType
): UserRequestsInterface {
    const results: UserResultsType = ref([])
    const { loading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllUsers(
        timeout?: number
    ): GetAllUsersRequestFunctionType {
        try {
            const response: GetAllUsersRequestResponseType =
                await axios.get('/api/users')

            timeout
                ? setTimeout((results.value = response.data), timeout)
                : (results.value = response.data)
        } catch (error) {
            apiErrors(error)
        }
    }

    async function getUser(): GetUserRequestFunctionType {
        try {
            const response: GetUserRequestResponseType =
                await axios.get('/api/user')

            results.value = response.data
        } catch (error) {
            apiErrors(error)
        }
    }

    async function storeUser(
        data: UserInterface
    ): StoreUserRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.post('/api/users', {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                confirm_password: data.confirm_password,
            })

            await apiSuccess(response, getAllUsers, flashToast, close, 'create')
        } catch (error) {
            apiErrors(error)
        }
    }

    async function editUser(data: UserInterface): EditUserRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.put(
                '/api/users/' + data.id,
                {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                }
            )

            await apiSuccess(response, getAllUsers, flashToast, close, 'edit')
        } catch (error) {
            apiErrors(error)
        }
    }

    async function deleteUser(id: number): DeleteEntityRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.delete(
                `/api/users/${id}`
            )

            await apiSuccess(response, getAllUsers, flashToast, close, 'delete')
        } catch (error) {
            apiErrors(error)
        }
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
