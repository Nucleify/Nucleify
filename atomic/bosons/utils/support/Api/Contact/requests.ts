import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  CloseDialogFunctionType,
  ContactInterface,
  ContactRequestsInterface,
  ContactResultsType,
  GetAllEntitiesRequestResponseType,
  UseApiErrorsInterface,
  UseLoadingInterface,
  UseToastInterface,
} from 'atomic/bosons/types'
import {
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic/bosons/utils'

export function contactRequests(
  close?: CloseDialogFunctionType
): ContactRequestsInterface {
  const results: ContactResultsType = ref([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllContacts(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<ContactInterface> =
        await axios.get('/api/contacts')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function storeContact(
    data: ContactInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/contacts', {
        user_id: window.sessionStorage.getItem('user_id'),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        personal_phone: data.personal_phone,
        work_phone: data.work_phone,
        address: data.address,
        birthday: data.birthday,
        contact_groups: data.contact_groups,
        role: data.role,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editContact(
    data: ContactInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        '/api/contacts/' + data.id,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          personal_phone: data.personal_phone,
          work_phone: data.work_phone,
          address: data.address,
          birthday: data.birthday,
          contact_groups: data.contact_groups,
          role: data.role,
        }
      )

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteContact(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/contacts/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    loading,
    getAllContacts,
    storeContact,
    editContact,
    deleteContact,
  }
}
