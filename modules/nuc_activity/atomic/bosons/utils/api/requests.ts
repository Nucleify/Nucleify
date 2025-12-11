import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucActivityObjectInterface,
  NucActivityRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function activityRequests(
  close: CloseDialogType
): NucActivityRequestsInterface {
  const results: EntityResultsType<NucActivityObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllActivities(loading?: boolean): Promise<void> {
    await apiHandle<NucActivityObjectInterface[]>({
      url: apiUrl() + '/activity-log',
      method: 'GET',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucActivityObjectInterface[]) => {
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
    await apiHandle<NucActivityObjectInterface>({
      url: apiUrl() + '/activity-log',
      id,
      method: 'DELETE',
      onSuccess: (response: NucActivityObjectInterface) => {
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
