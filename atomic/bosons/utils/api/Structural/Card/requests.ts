import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  StructuralCardInterface,
  CardRequestsInterface,
  CardResultsType,
  CloseDialogFunctionType,
  UseLoadingInterface,
  UseApiErrorsInterface,
  UseToastInterface,
  GetAllEntitiesRequestResponseType,
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic'

export function cardRequests(
  close?: CloseDialogFunctionType
): CardRequestsInterface {
  const results: CardResultsType = ref<StructuralCardInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllCards(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<StructuralCardInterface> =
        await axios.get('/api/cards')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountCardsByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get('/api/cards/count-by-created-last-week')

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function storeCard(
    data: StructuralCardInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/cards', {
        src: data.src,
        title: data.title,
        description: data.description,
        component: data.component,
        display: data.display,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editCard(
    data: StructuralCardInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(`/api/cards/${data.id}`, {
        src: data.src,
        title: data.title,
        description: data.description,
        component: data.component,
        display: data.display,
      })

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteCard(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/cards/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllCards,
    getCountCardsByCreatedLastWeek,
    storeCard,
    editCard,
    deleteCard,
  }
}
