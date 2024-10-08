import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
    ActivityLogRequestsInterface,
    ActivityResultsType,
    ApiErrorsFunctionType,
    CloseDialogFunctionType,
    DeleteEntityRequestFunctionType,
    FlashToastFunctionType,
    GetAllActivitiesRequestFunctionType,
    GetAllActivitiesRequestResponseType,
} from 'atomic/bosons/types'
import {
    apiSuccess,
    useApiErrors,
    useLoading,
    useToast,
} from 'atomic/bosons/utils'

export function activityRequests(
    close: CloseDialogFunctionType
): ActivityLogRequestsInterface {
    const results: ActivityResultsType = ref([])

    const { loading } = useLoading()
    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllActivities(
        timeout?: number
    ): GetAllActivitiesRequestFunctionType {
        try {
            const response: GetAllActivitiesRequestResponseType =
                await axios.get('/api/activity-log')

            timeout
                ? setTimeout((results.value = response.data), timeout)
                : (results.value = response.data)
        } catch (error) {
            apiErrors(error)
        }
    }

    async function deleteActivity(id: number): DeleteEntityRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.delete(
                `/api/activity-log/${id}`
            )

            await apiSuccess(
                response,
                getAllActivities,
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
        getAllActivities,
        deleteActivity,
    }
}
