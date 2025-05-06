import { ref } from 'vue'

import {
  StructuralCardInterface,
  CardRequestsInterface,
  CloseDialogType,
  UseLoadingInterface,
  useApiSuccess,
  useLoading,
  apiHandle,
  EntityCountResultsType,
  EntityResultsType,
} from 'atomic'

export function cardRequests(close?: CloseDialogType): CardRequestsInterface {
  const results: EntityResultsType<StructuralCardInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllCards(loading?: boolean): Promise<void> {
    await apiHandle<StructuralCardInterface[]>({
      url: runtime.apiUrl + 'cards',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: StructuralCardInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountCardsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: runtime.apiUrl + 'cards/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeCard(
    data: StructuralCardInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<StructuralCardInterface>({
      url: runtime.apiUrl + 'cards',
      method: 'POST',
      data,
      onSuccess: (response: StructuralCardInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editCard(
    data: StructuralCardInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<StructuralCardInterface>({
      url: runtime.apiUrl + 'cards/',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: StructuralCardInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteCard(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<StructuralCardInterface>({
      url: runtime.apiUrl + 'cards/',
      method: 'DELETE',
      id,
      onSuccess: (response: StructuralCardInterface) => {
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
