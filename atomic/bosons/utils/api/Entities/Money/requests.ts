import { Ref, ref } from 'vue'
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
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic'

export function moneyRequests(
  close?: CloseDialogFunctionType
): MoneyRequestsInterface {
  const results: MoneyResultsType = ref<MoneyInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

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

  async function getCountMoneyByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get('/api/money/count-by-created-last-week')

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
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
    createdLastWeek,
    loading,
    getAllMoney,
    getCountMoneyByCreatedLastWeek,
    storeMoney,
    editMoney,
    deleteMoney,
  }
}
