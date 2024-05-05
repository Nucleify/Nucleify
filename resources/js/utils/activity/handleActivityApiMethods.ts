import axios, { AxiosResponse } from 'axios'
import { ref } from 'vue'

import {
    GetAllActivitiesAxiosFunctionType,
    ActivityLogApiMethodsInterface,
    ActivityLogInterface,
    ActivityResultsType,
    ApiErrorsFunctionType,
    FlashToastFunctionType,
} from '@/types'
import { useApiErrors, useFlashToast } from '@/utils'

export default function activityApiMethods(): ActivityLogApiMethodsInterface {
    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } =
        useFlashToast()
    const results: ActivityResultsType = ref([])

    async function getAllActivities(): GetAllActivitiesAxiosFunctionType {
        return await axios
            .get('/api/activity-log')
            .then((response: AxiosResponse<ActivityLogInterface[]>) => {
                return (results.value = response.data)
            })
            .catch((error): void => {
                apiErrors(error)
                throw error
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

    return { results, getAllActivities, deleteActivity }
}
