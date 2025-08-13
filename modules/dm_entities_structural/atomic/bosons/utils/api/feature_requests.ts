import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  FeatureObjectInterface,
  FeatureRequestsInterface,
  SiteType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function featureRequests(
  close?: CloseDialogType
): FeatureRequestsInterface {
  const results: EntityResultsType<FeatureObjectInterface> = ref([])
  const resultsByCategory: EntityResultsType<FeatureObjectInterface> = ref([])
  const resultsBySite: EntityResultsType<FeatureObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFeatures(loading?: boolean): Promise<void> {
    await apiHandle<FeatureObjectInterface[]>({
      url: apiUrl() + '/features',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: FeatureObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountFeaturesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/features/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getFeaturesByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<FeatureObjectInterface[]>({
      url: apiUrl() + `/features/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: FeatureObjectInterface[]) => {
        resultsByCategory.value = response
      },
    })
  }

  async function getSiteFeatures(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<FeatureObjectInterface[]>({
      url: apiUrl() + `/features/get-site-features/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: FeatureObjectInterface[]) => {
        resultsBySite.value = response
      },
    })
  }

  async function storeFeature(
    data: FeatureObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'POST',
      data,
      onSuccess: (response: FeatureObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editFeature(
    data: FeatureObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: FeatureObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteFeature(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'DELETE',
      id,
      onSuccess: (response: FeatureObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
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
