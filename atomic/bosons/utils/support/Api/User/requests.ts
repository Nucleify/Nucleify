import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  CloseDialogFunctionType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetAllEntitiesRequestResponseType,
  GetEntityRequestFunctionType,
  GetUserRequestResponseType,
  StoreEntityRequestFunctionType,
  UseApiErrorsServiceInterface,
  UseLoadingInterface,
  UserInterface,
  UserRequestsInterface,
  UserResultsType,
  UseToastInterface,
} from 'atomic/bosons/types'
import {
  apiSuccess,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic/bosons/utils'

export function userRequests(
  close?: CloseDialogFunctionType
): UserRequestsInterface {
  const results: UserResultsType = ref([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsServiceInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllUsers(
    loading?: boolean
  ): GetAllEntitiesRequestFunctionType<UserInterface> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<UserInterface> =
        await axios.get('/api/users')

      results.value = response.data
    } catch (error) {
      apiErrors(error)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getUser(): GetEntityRequestFunctionType<UserInterface> {
    try {
      const response: GetUserRequestResponseType = await axios.get('/api/user')

      results.value = response.data
    } catch (error) {
      apiErrors(error)
    }
  }

  async function storeUser(
    data: UserInterface,
    getData: () => void
  ): StoreEntityRequestFunctionType<UserInterface> {
    try {
      const response: AxiosResponse = await axios.post('/api/users', {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        confirm_password: data.confirm_password,
      })

      await apiSuccess(response, getData, flashToast, close, 'create')
    } catch (error) {
      apiErrors(error)
    }
  }

  async function editUser(
    data: UserInterface,
    getData: () => void
  ): EditEntityRequestFunctionType<UserInterface> {
    try {
      const response: AxiosResponse = await axios.put('/api/users/' + data.id, {
        name: data.name,
        email: data.email,
        role: data.role,
      })

      await apiSuccess(response, getData, flashToast, close, 'edit')
    } catch (error) {
      apiErrors(error)
    }
  }

  async function deleteUser(
    id: number,
    getData: () => void
  ): DeleteEntityRequestFunctionType {
    try {
      const response: AxiosResponse = await axios.delete(`/api/users/${id}`)

      await apiSuccess(response, getData, flashToast, close, 'delete')
    } catch (error) {
      apiErrors(error)
    }
  }

  return {
    results,
    loading,
    getAllUsers,
    getUser,
    storeUser,
    editUser,
    deleteUser,
  }
}
