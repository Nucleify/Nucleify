import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  CloseDialogFunctionType,
  UseLoadingInterface,
  UseApiErrorsInterface,
  UseToastInterface,
  GetAllEntitiesRequestResponseType,
  MoneyResultsType,
  MoneyRequestsInterface,
  MoneyInterface,
} from 'atomic/bosons/types'
import {
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic/bosons/utils'

export function moneyRequests(
  close?: CloseDialogFunctionType
): MoneyRequestsInterface {
  const results: MoneyResultsType = ref<MoneyInterface[]>([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllMoney(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<MoneyInterface> =
        await axios.get('/api/money')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      setTimeout(() => {
        if (loading) {
          setLoading(false)
        }
      })
    }
  }

  async function storeMoney(
    data: MoneyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/money', {
        user_id: window.sessionStorage.getItem('user_id'),
        count: data.count,
        sender: data.sender,
        receiver: data.receiver,
        title: data.title,
        description: data.description,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editMoney(
    data: MoneyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(`/api/money/${data.id}`, {
        count: data.count,
        sender: data.sender,
        receiver: data.receiver,
        title: data.title,
        description: data.description,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteMoney(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/money/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    loading,
    getAllMoney,
    storeMoney,
    editMoney,
    deleteMoney,
  }
}
