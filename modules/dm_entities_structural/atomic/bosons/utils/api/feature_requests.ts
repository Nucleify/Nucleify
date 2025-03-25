import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  FeatureInterface,
  FeatureRequestsInterface,
  FeatureResultsType,
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

export function featureRequests(
  close?: CloseDialogFunctionType
): FeatureRequestsInterface {
  const results: FeatureResultsType = ref<FeatureInterface[]>([])
  const resultsByCategory: FeatureResultsType = ref<FeatureInterface[]>([])
  const resultsBySite: Ref<FeatureInterface[]> = ref<FeatureInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllFeatures(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<FeatureInterface> =
        await axios.get('/api/features')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountFeaturesByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get(
        '/api/features/count-by-created-last-week'
      )

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getFeaturesByCategory(category: string): Promise<void> {
    try {
      const response = await axios.get(
        `/api/features/get-by-category/${category}`
      )

      resultsByCategory.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getSiteFeatures(
    loading: boolean,
    site: SiteType
  ): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response = await axios.get(
        `/api/features/get-site-features/${site}`
      )

      resultsBySite.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      setLoading(false)
    }
  }

  async function storeFeature(
    data: FeatureInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/features', {
        header: data.header,
        description: data.description,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editFeature(
    data: FeatureInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/features/${data.id}`,
        {
          header: data.header,
          description: data.description,
          category: data.category,
        }
      )

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteFeature(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/features/${id}`)

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
    getAllFeatures,
    getCountFeaturesByCreatedLastWeek,
    getFeaturesByCategory,
    getSiteFeatures,
    storeFeature,
    editFeature,
    deleteFeature,
  }
}
