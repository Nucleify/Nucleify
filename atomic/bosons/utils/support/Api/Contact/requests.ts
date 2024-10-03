import { ref } from 'vue'
import axios, { AxiosResponse, formToJSON } from 'axios'

import {
    ApiErrorsFunctionType,
    ContactInterface,
    ContactRequestsInterface,
    ContactResultsType,
    DeleteEntityRequestFunctionType,
    EditContactRequestFunctionType,
    FlashToastFunctionType,
    GetAllContactsRequestFunctionType,
    GetAllContactsRequestResponseType,
    StoreContactRequestFunctionType,
    UserIdType,
} from 'atomic/bosons/types'
import { useApiErrors, useLoading, useToast } from 'atomic/bosons/utils'

export function contactRequests(): ContactRequestsInterface {
    const results: ContactResultsType = ref([])
    const { loading, setLoading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllContacts(
        timeout?: number
    ): GetAllContactsRequestFunctionType {
        setLoading(true)

        return await axios
            .get('/api/contacts')
            .then((response: GetAllContactsRequestResponseType) => {
                if (timeout) {
                    setTimeout((): void => {
                        results.value = response.data
                    }, timeout)
                } else {
                    results.value = response.data
                }
                return response.data
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

    async function storeContact(
        data: ContactInterface,
        getData: () => void,
        close: (method: string) => void
    ): StoreContactRequestFunctionType {
        const user_id: UserIdType = window.sessionStorage.getItem('user_id')

        return await axios
            .post('/api/contacts', {
                user_id: user_id,
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
            .then((response: AxiosResponse): void => {
                getData()
                close('create')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function editContact(
        data: ContactInterface,
        getData: () => void,
        close: (method: string) => void
    ): EditContactRequestFunctionType {
        return await axios
            .put('/api/contacts/' + data.id, {
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
            .then((response: AxiosResponse): void => {
                getData()
                close('edit')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function deleteContact(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): DeleteEntityRequestFunctionType {
        return await axios
            .delete(`/api/contacts/${id}`)
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
        getAllContacts,
        storeContact,
        editContact,
        deleteContact,
    }
}
