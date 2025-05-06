import { ref } from 'vue'

import {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  FeatureInterface,
  FeatureRequestsInterface,
  SiteType,
  UseLoadingInterface,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function featureRequests(
  close?: CloseDialogType
): FeatureRequestsInterface {
  const results: EntityResultsType<FeatureInterface> = ref([])
  const resultsByCategory: EntityResultsType<FeatureInterface> = ref([])
  const resultsBySite: EntityResultsType<FeatureInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFeatures(loading?: boolean): Promise<void> {
    await apiHandle<FeatureInterface[]>({
      url: runtime.apiUrl + 'features',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: FeatureInterface[]) => {
        results.value = data
      },
    })
  }

  async function getCountFeaturesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: runtime.apiUrl + 'features/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: number) => {
        createdLastWeek.value = data
      },
    })
  }

  async function getFeaturesByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<FeatureInterface[]>({
      url: runtime.apiUrl + `features/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: FeatureInterface[]) => {
        resultsByCategory.value = data
      },
    })
  }

  async function getSiteFeatures(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<FeatureInterface[]>({
      url: runtime.apiUrl + `features/get-site-features/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: FeatureInterface[]) => {
        resultsBySite.value = data
      },
    })
  }

  async function storeFeature(
    data: FeatureInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureInterface>({
      url: runtime.apiUrl + 'features',
      method: 'POST',
      data,
      onSuccess: (response: FeatureInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editFeature(
    data: FeatureInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureInterface>({
      url: runtime.apiUrl + 'features/',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: FeatureInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteFeature(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<FeatureInterface>({
      url: runtime.apiUrl + 'features/',
      method: 'DELETE',
      id,
      onSuccess: (response: FeatureInterface) => {
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
