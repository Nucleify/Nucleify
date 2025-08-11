import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  TaskObjectInterface,
  TaskRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function taskRequests(close?: CloseDialogType): TaskRequestsInterface {
  const results: EntityResultsType<TaskObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllTasks(loading?: boolean): Promise<void> {
    await apiHandle<TaskObjectInterface[]>({
      url: apiUrl() + '/tasks',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TaskObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountTasksByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/tasks/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeTask(
    data: TaskObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TaskObjectInterface>({
      url: apiUrl() + '/tasks',
      method: 'POST',
      data,
      onSuccess: (response: TaskObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editTask(
    data: TaskObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TaskObjectInterface>({
      url: apiUrl() + '/tasks',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: TaskObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteTask(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TaskObjectInterface>({
      url: apiUrl() + '/tasks',
      method: 'DELETE',
      id,
      onSuccess: (response: TaskObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllTasks,
    getCountTasksByCreatedLastWeek,
    storeTask,
    editTask,
    deleteTask,
  }
}
