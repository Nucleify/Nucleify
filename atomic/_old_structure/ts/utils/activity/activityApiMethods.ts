import axios, { AxiosResponse } from 'axios'
import { ref } from 'vue'

import {
    GetAllActivitiesAxiosFunctionType,
    ActivityLogApiMethodsInterface,
    ActivityLogInterface,
    ActivityResultsType,
    ApiErrorsFunctionType,
} from '@/types'
import { useApiErrors, useLoading } from '@/utils'

import { FlashToastFunctionType } from 'atomic/bosons/types'
import { useToast } from 'atomic/bosons/utils'

export default function activityApiMethods(): ActivityLogApiMethodsInterface {
    const results: ActivityResultsType = ref([])
    const { loading, setLoading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } =
        useToast()

    async function getAllActivities(
        timeout?: number
    ): GetAllActivitiesAxiosFunctionType {
        setLoading(true)

        return await axios
            .get('/api/activity-log')
            .then((response: AxiosResponse<ActivityLogInterface[]>) => {
                if (timeout) {
                    setTimeout((): void => {
                        results.value = response.data
                    }, timeout)
                } else {
                    results.value = response.data
                }
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

    async function deleteActivity(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        return await axios
            .delete(`/api/activity-log/${id}`)
            .then((response: AxiosResponse): void => {
                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    return { results, loading, getAllActivities, deleteActivity }
}
