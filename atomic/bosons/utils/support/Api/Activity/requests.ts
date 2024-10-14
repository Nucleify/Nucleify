import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  ActivityLogInterface,
  ActivityLogRequestsInterface,
  ActivityResultsType,
  CloseDialogFunctionType,
  DeleteEntityRequestFunctionType,
  GetAllActivitiesRequestResponseType,
  GetAllEntitiesRequestFunctionType,
  UseApiErrorsServiceInterface,
  UseLoadingInterface,
  UseToastInterface,
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

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsServiceInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllActivities(
    loading?: boolean
  ): GetAllEntitiesRequestFunctionType<ActivityLogInterface> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllActivitiesRequestResponseType =
        await axios.get('/api/activity-log')

      results.value = response.data
    } catch (error) {
      apiErrors(error)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function deleteActivity(
    id: number,
    getData: () => void
  ): DeleteEntityRequestFunctionType {
    try {
      const response: AxiosResponse = await axios.delete(
        `/api/activity-log/${id}`
      )

      await apiSuccess(response, getData, flashToast, close, 'delete')
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
