import { ref } from 'vue'

import {
  CloseDialogType,
  ContactInterface,
  ContactRequestsInterface,
  EntityCountResultsType,
  EntityResultsType,
  UseLoadingInterface,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function contactRequests(
  close?: CloseDialogType
): ContactRequestsInterface {
  const results: EntityResultsType<ContactInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllContacts(loading?: boolean): Promise<void> {
    await apiHandle<ContactInterface[]>({
      url: 'contacts',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: ContactInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountContactsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: 'contacts/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeContact(
    data: ContactInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ContactInterface>({
      url: 'contacts',
      method: 'POST',
      data: {
        user_id: window.sessionStorage.getItem('user_id'),
        ...data,
      },
      onSuccess: (response: ContactInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editContact(
    data: ContactInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ContactInterface>({
      url: 'contacts',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: ContactInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteContact(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ContactInterface>({
      url: 'contacts',
      method: 'DELETE',
      id,
      onSuccess: (response: ContactInterface) => {
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
