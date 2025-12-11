import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucCardObjectInterface,
  NucCardRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function cardRequests(
  close?: CloseDialogType
): NucCardRequestsInterface {
  const results: EntityResultsType<NucCardObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllCards(loading?: boolean): Promise<void> {
    await apiHandle<NucCardObjectInterface[]>({
      url: apiUrl() + '/cards',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucCardObjectInterface[]) => {
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
    data: NucCardObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucCardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'POST',
      data,
      onSuccess: (response: NucCardObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editCard(
    data: NucCardObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucCardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucCardObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteCard(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucCardObjectInterface>({
      url: apiUrl() + '/cards',
      method: 'DELETE',
      id,
      onSuccess: (response: NucCardObjectInterface) => {
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
