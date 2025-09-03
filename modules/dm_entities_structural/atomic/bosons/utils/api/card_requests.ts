import { ref } from 'vue'

import type {
  CardObjectInterface,
  CardRequestsInterface,
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function cardRequests(close?: CloseDialogType): CardRequestsInterface {
  const results: EntityResultsType<CardObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllCards(loading?: boolean): Promise<void> {
    await apiHandle<CardObjectInterface[]>({
      url: apiUrl() + '/cards',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: CardObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountCardsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/cards/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeCard(
    data: CardObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<CardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'POST',
      data,
      onSuccess: (response: CardObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editCard(
    data: CardObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<CardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: CardObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteCard(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<CardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'DELETE',
      id,
      onSuccess: (response: CardObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
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
