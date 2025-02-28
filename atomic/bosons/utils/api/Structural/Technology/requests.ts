import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  TechnologyInterface,
  TechnologyRequestsInterface,
  TechnologyResultsType,
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
} from 'atomic'

export function technologyRequests(
  close?: CloseDialogFunctionType
): TechnologyRequestsInterface {
  const results: TechnologyResultsType = ref<TechnologyInterface[]>([])
  const resultsByCategory: TechnologyResultsType = ref<TechnologyInterface[]>(
    []
  )
  const resultsBySite: Ref<TechnologyInterface[]> = ref<TechnologyInterface[]>(
    []
  )
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllTechnologies(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<TechnologyInterface> =
        await axios.get('/api/technologies')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountTechnologiesByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get(
        '/api/technologies/count-by-created-last-week'
      )

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getTechnologiesByCategory(category: string): Promise<void> {
    try {
      const response = await axios.get(
        `/api/technologies/get-by-category/${category}`
      )

      resultsByCategory.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getSiteTechnologies(
    loading: boolean,
    site: SiteType
  ): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response = await axios.get(
        `/api/technologies/get-site-technologies/${site}`
      )

      resultsBySite.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      setLoading(false)
    }
  }

  async function storeTechnology(
    data: TechnologyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/technologies', {
        user_id: window.sessionStorage.getItem('user_id'),
        href: data.href,
        src: data.src,
        label: data.label,
        description: data.description,
        category: data.category,
        display: data.display,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editTechnology(
    data: TechnologyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/technologies/${data.id}`,
        {
          href: data.href,
          src: data.src,
          label: data.label,
          description: data.description,
          category: data.category,
          display: data.display,
        }
      )

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteTechnology(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `/api/technologies/${id}`
      )

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
    getAllTechnologies,
    getCountTechnologiesByCreatedLastWeek,
    getTechnologiesByCategory,
    getSiteTechnologies,
    storeTechnology,
    editTechnology,
    deleteTechnology,
  }
}
