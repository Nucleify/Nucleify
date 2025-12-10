import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucContactObjectInterface,
  NucContactRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function contactRequests(
  close?: CloseDialogType
): NucContactRequestsInterface {
  const results: EntityResultsType<NucContactObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllContacts(loading?: boolean): Promise<void> {
    await apiHandle<NucContactObjectInterface[]>({
      url: apiUrl() + '/contacts',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucContactObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountContactsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/contacts/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeContact(
    data: NucContactObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: apiUrl() + '/contacts',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editContact(
    data: NucContactObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: apiUrl() + '/contacts',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteContact(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: apiUrl() + '/contacts',
      method: 'DELETE',
      id,
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllContacts,
    getCountContactsByCreatedLastWeek,
    storeContact,
    editContact,
    deleteContact,
  }
}
