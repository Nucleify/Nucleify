import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  MoneyObjectInterface,
  MoneyRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function moneyRequests(close?: CloseDialogType): MoneyRequestsInterface {
  const results: EntityResultsType<MoneyObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllMoney(loading?: boolean): Promise<void> {
    await apiHandle<MoneyObjectInterface[]>({
      url: apiUrl() + '/money',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: MoneyObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountMoneyByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/money/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeMoney(
    data: MoneyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<MoneyObjectInterface>({
      url: apiUrl() + '/money',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: MoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editMoney(
    data: MoneyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<MoneyObjectInterface>({
      url: apiUrl() + '/money',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: MoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteMoney(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<MoneyObjectInterface>({
      url: apiUrl() + '/money',
      method: 'DELETE',
      id,
      onSuccess: (response: MoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
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
