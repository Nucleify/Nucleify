import {Ref, ref} from "vue"
import axios from 'axios'

import { useApiErrors } from '../../utils'
import {
    GetAllUsersFunctionType,
    GetAllUsersAxiosFunctionType,
    GetUserFunctionType,
    GetUserAxiosFunctionType,
    UserApiMethodsInterface,
    UserInterface
} from "../../interfaces"

export default function userApiMethods(): UserApiMethodsInterface {
    const { apiErrors } = useApiErrors()
    const results: Ref<UserInterface[]> = ref([])

    function getAllUsers(): GetAllUsersFunctionType {
        return axios
            .get('/api/users')
            .then((response: GetAllUsersAxiosFunctionType) => {
                return results.value = response.data
            })
            .catch((error) => {
                apiErrors(error)
                throw error
            })
    }

    function getUser(): GetUserFunctionType {
        return axios.get('/api/user')
            .then((response: GetUserAxiosFunctionType) => {
                return response.data
            })
            .catch((error) => {
                apiErrors(error)
                throw error
            })
    }

    return { results, getAllUsers, getUser }
}
