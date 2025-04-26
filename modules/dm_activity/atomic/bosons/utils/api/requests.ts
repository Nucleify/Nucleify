import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  ActivityLogInterface,
  ActivityLogRequestsInterface,
  ActivityResultsType,
  apiSuccess,
  catchErrors,
  CloseDialogFunctionType,
  GetAllEntitiesRequestResponseType,
  useApiErrors,
  UseApiErrorsInterface,
  useLoading,
  UseLoadingInterface,
  useToast,
  UseToastInterface,
} from '../../../../../../atomic'

export function activityRequests(
  close: CloseDialogFunctionType
): ActivityLogRequestsInterface {
  const results: ActivityResultsType = ref<ActivityLogInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

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

  async function getCountActivitiesByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get(
        '/api/activity-log/count-by-created-last-week'
      )

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
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
    createdLastWeek,
    loading,
    getAllActivities,
    getCountActivitiesByCreatedLastWeek,
    deleteActivity,
  }
}
