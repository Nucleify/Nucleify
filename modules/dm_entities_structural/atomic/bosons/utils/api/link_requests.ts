import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
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
  SiteType,
  LinkResultsType,
  LinkRequestsInterface,
  LinkInterface,
} from 'atomic'

export function linkRequests(
  close?: CloseDialogFunctionType
): LinkRequestsInterface {
  const results: LinkResultsType = ref<LinkInterface[]>([])
  const resultsByCategory: LinkResultsType = ref<LinkInterface[]>([])
  const resultsBySite: Ref<LinkInterface[]> = ref<LinkInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllLinks(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<LinkInterface> =
        await axios.get('/api/links')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountLinksByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get('/api/links/count-by-created-last-week')

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getLinksByCategory(category: string): Promise<void> {
    try {
      const response = await axios.get(`/api/links/get-by-category/${category}`)

      resultsByCategory.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getSiteLinks(loading: boolean, site: SiteType): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response = await axios.get(`/api/links/get-site-links/${site}`)

      resultsBySite.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      setLoading(false)
    }
  }

  async function storeLink(
    data: LinkInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/links', {
        ...data,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editLink(
    data: LinkInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(`/api/links/${data.id}`, {
        ...data,
      })

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteLink(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/links/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    resultsByCategory,
    resultsBySite,
    createdLastWeek,
    loading,
    getAllLinks,
    getCountLinksByCreatedLastWeek,
    getLinksByCategory,
    getSiteLinks,
    storeLink,
    editLink,
    deleteLink,
  }
}
