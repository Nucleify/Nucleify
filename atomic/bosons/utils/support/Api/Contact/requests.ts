import { ref } from 'vue'
import axios, { AxiosResponse, formToJSON } from 'axios'

import {
    CloseDialogFunctionType,
    ContactInterface,
    ContactRequestsInterface,
    ContactResultsType,
    DeleteEntityRequestFunctionType,
    EditEntityRequestFunctionType,
    GetAllEntitiesRequestFunctionType,
    GetAllEntitiesRequestResponseType,
    StoreEntityRequestFunctionType,
    UseApiErrorsServiceInterface,
    UseLoadingInterface,
    UseToastInterface,
} from 'atomic/bosons/types'
import {
    apiSuccess,
    useApiErrors,
    useLoading,
    useToast,
} from 'atomic/bosons/utils'

export function contactRequests(
    close?: CloseDialogFunctionType
): ContactRequestsInterface {
    const results: ContactResultsType = ref([])

    const { loading, setLoading }: UseLoadingInterface = useLoading()
    const { apiErrors }: UseApiErrorsServiceInterface = useApiErrors()
    const { flashToast }: UseToastInterface = useToast()

    async function getAllContacts(
        loading?: boolean
    ): GetAllEntitiesRequestFunctionType<ContactInterface> {
        try {
            if (loading) {
                setLoading(true)
            }

            const response: GetAllEntitiesRequestResponseType<ContactInterface> =
                await axios.get('/api/contacts')

            results.value = response.data
        } catch (error) {
            apiErrors(error)
        } finally {
            if (loading) {
                setLoading(false)
            }
        }
    }

    async function storeContact(
        data: ContactInterface,
        getData: () => void
    ): StoreEntityRequestFunctionType<ContactInterface> {
        try {
            const response: AxiosResponse = await axios.post('/api/contacts', {
                user_id: window.sessionStorage.getItem('user_id'),
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                personal_phone: data.personal_phone,
                work_phone: data.work_phone,
                address: data.address,
                birthday: data.birthday,
                contact_groups: formToJSON(data.contact_groups),
                role: data.role,
            })

            await apiSuccess(response, getData, flashToast, close, 'create')
        } catch (error) {
            apiErrors(error)
        }
    }

    async function editContact(
        data: ContactInterface,
        getData: () => void
    ): EditEntityRequestFunctionType<ContactInterface> {
        try {
            const response: AxiosResponse = await axios.put(
                '/api/contacts/' + data.id,
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    personal_phone: data.personal_phone,
                    work_phone: data.work_phone,
                    address: data.address,
                    birthday: data.birthday,
                    contact_groups: formToJSON(data.contact_groups),
                    role: data.role,
                }
            )

            await apiSuccess(response, getData, flashToast, close, 'edit')
        } catch (error) {
            apiErrors(error)
        }
    }

    async function deleteContact(
        id: number,
        getData: () => void
    ): DeleteEntityRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.delete(
                `/api/contacts/${id}`
            )

            await apiSuccess(response, getData, flashToast, close, 'delete')
        } catch (error) {
            apiErrors(error)
        }
    }

    return {
        results,
        loading,
        getAllContacts,
        storeContact,
        editContact,
        deleteContact,
    }
}
