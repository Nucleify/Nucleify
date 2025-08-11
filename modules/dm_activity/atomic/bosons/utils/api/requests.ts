import { ref } from 'vue'

import type {
  ActivityLogObjectInterface,
  ActivityLogRequestsInterface,
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function activityRequests(
  close: CloseDialogType
): ActivityLogRequestsInterface {
  const results: EntityResultsType<ActivityLogObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllActivities(loading?: boolean): Promise<void> {
    await apiHandle<ActivityLogObjectInterface[]>({
      url: apiUrl() + '/activity-log',
      method: 'GET',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: ActivityLogObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountActivitiesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/activity-log/count-by-created-last-week',
      method: 'GET',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function deleteActivity(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ActivityLogObjectInterface>({
      url: apiUrl() + '/activity-log',
      id,
      method: 'DELETE',
      onSuccess: (response: ActivityLogObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
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
