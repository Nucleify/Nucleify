import axios from 'axios'
import { ref, Ref } from 'vue'

import { useApiErrors } from '../../utils'
import {
    ContactApiMethodsInterface,
    GetAllContactsFunctionType,
    GetAllContactsAxiosFunctionType,
    ContactInterface,
} from '../../interfaces'

export default function contactApiMethods(): ContactApiMethodsInterface {
    const { apiErrors } = useApiErrors()
    const results: Ref<ContactInterface[]> = ref([])

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

    return { results, getAllContacts }
}
