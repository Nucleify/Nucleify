import axios, { AxiosResponse } from 'axios'

import { FetchUserFunctionType } from '../../interfaces'
import { useApiErrorsService } from '../../utils'


export default function fetchUser(): FetchUserFunctionType {
    const { apiErrors } = useApiErrorsService()

    return axios.get('/api/user')
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch((error) => {
            apiErrors(error)
        })
}
