import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
    GetAllActivitiesAxiosFunctionType,
    ActivityLogApiMethodsInterface,
    ActivityLogInterface,
} from '@/types'
import { useApiErrors, useFlashToast } from '@/utils'

export default function activityApiMethods(): ActivityLogApiMethodsInterface {
    const { apiErrors } = useApiErrors()
    const { flashToast } = useFlashToast()
    const results: Ref<ActivityLogInterface[] | undefined> = ref([])

    function getAllActivities(): GetAllActivitiesAxiosFunctionType {
        axios
            .get('/api/activity-log')
            .then((response: AxiosResponse<ActivityLogInterface[]>) => {
                return (results.value = response.data)
            })
            .catch((error) => {
                apiErrors(error)
                throw error
            })
    }

    async function deleteActivity(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
        await axios
            .delete(`/api/activity-log/${id}`)
            .then((response) => {
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
