import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  CloseDialogFunctionType,
  GetAllEntitiesRequestResponseType,
  UseApiErrorsInterface,
  UseLoadingInterface,
  UserInterface,
  UserRequestsInterface,
  UserResultsType,
  UseToastInterface,
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic'

export function userRequests(
  close?: CloseDialogFunctionType
): UserRequestsInterface {
  const results: UserResultsType = ref([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllUsers(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<UserInterface> =
        await axios.get('/api/users')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountUsersByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get('/api/users/count-by-created-last-week')

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getUser(): Promise<void> {
    try {
      const response: GetAllEntitiesRequestResponseType<UserInterface> =
        await axios.get('/api/user')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function storeUser(
    data: UserInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/users', {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        confirm_password: data.confirm_password,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editUser(
    data: UserInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put('/api/users/' + data.id, {
        name: data.name,
        email: data.email,
        role: data.role,
      })

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteUser(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/users/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
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
