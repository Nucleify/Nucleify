import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  FileObjectInterface,
  FileRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function fileRequests(close?: CloseDialogType): FileRequestsInterface {
  const results: EntityResultsType<FileObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFiles(loading?: boolean): Promise<void> {
    await apiHandle<FileObjectInterface[]>({
      url: apiUrl() + 'files',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: FileObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountFilesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + 'files/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeFile(
    data: FileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FileObjectInterface>({
      url: apiUrl() + 'files',
      method: 'POST',
      data,
      onSuccess: (response: FileObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editFile(
    data: FileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FileObjectInterface>({
      url: apiUrl() + 'files',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: FileObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteFile(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FileObjectInterface>({
      url: apiUrl() + 'files',
      method: 'DELETE',
      id,
      onSuccess: (response: FileObjectInterface) => {
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
