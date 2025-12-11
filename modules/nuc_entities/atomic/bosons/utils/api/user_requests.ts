import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucUserObjectInterface,
  NucUserRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function userRequests(
  close?: CloseDialogType
): NucUserRequestsInterface {
  const results: EntityResultsType<NucUserObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllUsers(loading?: boolean): Promise<void> {
    await apiHandle<NucUserObjectInterface[]>({
      url: apiUrl() + '/users',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucUserObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountUsersByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/users/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getUser(loading?: boolean): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: apiUrl() + '/user',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucUserObjectInterface) => {
        // @ts-expect-error TODO: fix this later
        results.value = response
      },
    })
  }

  async function storeUser(
    data: NucUserObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: apiUrl() + '/users',
      method: 'POST',
      data,
      onSuccess: (response: NucUserObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editUser(
    data: NucUserObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: apiUrl() + '/users',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucUserObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteUser(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: apiUrl() + '/users',
      method: 'DELETE',
      id,
      onSuccess: (response: NucUserObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllUsers,
    getCountUsersByCreatedLastWeek,
    getUser,
    storeUser,
    editUser,
    deleteUser,
  }
}
