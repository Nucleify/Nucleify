import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  ActivityLogInterface,
  ActivityLogRequestsInterface,
  ActivityResultsType,
  CloseDialogFunctionType,
  GetAllEntitiesRequestResponseType,
  UseApiErrorsInterface,
  UseLoadingInterface,
  UseToastInterface,
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic'

export function activityRequests(
  close: CloseDialogFunctionType
): ActivityLogRequestsInterface {
  const results: ActivityResultsType = ref<ActivityLogInterface[]>([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllActivities(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<ActivityLogInterface> =
        await axios.get('/api/activity-log')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function deleteActivity(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `/api/activity-log/${id}`
      )

      await apiSuccess(response, getData, flashToast, close, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    loading,
    getAllActivities,
    deleteActivity,
  }
}
