import { ref } from 'vue'

import {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  UserInterface,
  UseLoadingInterface,
  UserRequestsInterface,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function userRequests(close?: CloseDialogType): UserRequestsInterface {
  const results: EntityResultsType<UserInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllUsers(loading?: boolean): Promise<void> {
    await apiHandle<UserInterface[]>({
      url: 'users',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: UserInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountUsersByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: 'users/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getUser(loading?: boolean): Promise<void> {
    await apiHandle<UserInterface>({
      url: 'user',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: UserInterface) => {
        results.value = response
      },
    })
  }

  async function storeUser(
    data: UserInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<UserInterface>({
      url: 'users',
      method: 'POST',
      data,
      onSuccess: (response: UserInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editUser(
    data: UserInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<UserInterface>({
      url: 'users',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: UserInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteUser(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<UserInterface>({
      url: 'users',
      method: 'DELETE',
      id,
      onSuccess: (response: UserInterface) => {
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
