import axios from 'axios'
import { ref, Ref } from 'vue'

import { useApiErrors, useFlashToast } from '../../utils'
import {
    ContactApiMethodsInterface,
    GetAllContactsAxiosFunctionType,
    GetAllContactsFunctionType,
    ContactInterface,
} from '../../interfaces'

export default function contactApiMethods(): ContactApiMethodsInterface {
    const results: Ref<ContactInterface[] | undefined> = ref([])

    const { apiErrors } = useApiErrors()
    const { flashToast } = useFlashToast()

    function getAllContacts(): GetAllContactsFunctionType {
        return axios
            .get('/api/contacts')
            .then((response: GetAllContactsAxiosFunctionType) => {
                return (results.value = response.data)
            })
            .catch((error) => {
                apiErrors(error)
                throw error
            })
    }

    async function storeContact(
        data: ContactInterface,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        const user_id = window.sessionStorage.getItem('user_id')

        await axios
            .post('/api/contacts', {
                user_id: user_id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                personal_phone: data.personal_phone,
                work_phone: data.work_phone,
                address: data.address,
                birthday: data.birthday,
                contact_groups: data.contact_groups,
                role: data.role,
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

    async function editContact(
        data: ContactInterface,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        await axios
            .put('/api/contacts/' + data.id, {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                personal_phone: data.personal_phone,
                work_phone: data.work_phone,
                address: data.address,
                birthday: data.birthday,
                contact_groups: data.contact_groups,
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

    async function deleteContact(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        await axios
            .delete(`/api/contacts/${id}`)
            .then((response) => {
                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    return { results, getAllContacts, storeContact, editContact, deleteContact }
}
