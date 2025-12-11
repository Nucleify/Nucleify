import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucFileObjectInterface,
  NucFileRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function fileRequests(
  close?: CloseDialogType
): NucFileRequestsInterface {
  const results: EntityResultsType<NucFileObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFiles(loading?: boolean): Promise<void> {
    await apiHandle<NucFileObjectInterface[]>({
      url: apiUrl() + '/files',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucFileObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountFilesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/files/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeFile(
    data: NucFileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'POST',
      data,
      onSuccess: (response: NucFileObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editFile(
    data: NucFileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucFileObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteFile(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'DELETE',
      id,
      onSuccess: (response: NucFileObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllFiles,
    getCountFilesByCreatedLastWeek,
    storeFile,
    editFile,
    deleteFile,
  }
}
