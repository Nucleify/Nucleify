import { ref } from 'vue'
import axios, { AxiosResponse, formToJSON } from 'axios'

import {
    ApiErrorsFunctionType,
    CloseDialogFunctionType,
    ContactInterface,
    ContactRequestsInterface,
    ContactResultsType,
    DeleteEntityRequestFunctionType,
    EditContactRequestFunctionType,
    FlashToastFunctionType,
    GetAllContactsRequestFunctionType,
    GetAllContactsRequestResponseType,
    StoreContactRequestFunctionType,
} from 'atomic/bosons/types'
import {
    apiSuccess,
    useApiErrors,
    useLoading,
    useToast,
} from 'atomic/bosons/utils'

export function contactRequests(
    close: CloseDialogFunctionType
): ContactRequestsInterface {
    const results: ContactResultsType = ref([])

    const { loading } = useLoading()
    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllContacts(
        timeout?: number
    ): GetAllContactsRequestFunctionType {
        try {
            const response: GetAllContactsRequestResponseType =
                await axios.get('/api/contacts')

            timeout
                ? setTimeout((results.value = response.data), timeout)
                : (results.value = response.data)
        } catch (error) {
            apiErrors(error)
        }
    }

    async function storeContact(
        data: ContactInterface
    ): StoreContactRequestFunctionType {
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

            await apiSuccess(
                response,
                getAllContacts,
                flashToast,
                close,
                'create'
            )
        } catch (error) {
            apiErrors(error)
        }
    }

    async function editContact(
        data: ContactInterface
    ): EditContactRequestFunctionType {
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

            await apiSuccess(
                response,
                getAllContacts,
                flashToast,
                close,
                'edit'
            )
        } catch (error) {
            apiErrors(error)
        }
    }

    async function deleteContact(id: number): DeleteEntityRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.delete(
                `/api/contacts/${id}`
            )

            await apiSuccess(
                response,
                getAllContacts,
                flashToast,
                close,
                'delete'
            )
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
