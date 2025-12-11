import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucFeatureObjectInterface,
  NucFeatureRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function featureRequests(
  close?: CloseDialogType
): NucFeatureRequestsInterface {
  const results: EntityResultsType<NucFeatureObjectInterface> = ref([])
  const resultsByCategory: EntityResultsType<NucFeatureObjectInterface> = ref(
    []
  )
  const resultsBySite: EntityResultsType<NucFeatureObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFeatures(loading?: boolean): Promise<void> {
    await apiHandle<NucFeatureObjectInterface[]>({
      url: apiUrl() + '/features',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucFeatureObjectInterface[]) => {
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
    await apiHandle<NucFeatureObjectInterface[]>({
      url: apiUrl() + `/features/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucFeatureObjectInterface[]) => {
        resultsByCategory.value = response
      },
    })
  }

  async function getSiteFeatures(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<NucFeatureObjectInterface[]>({
      url: apiUrl() + `/features/get-site-features/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucFeatureObjectInterface[]) => {
        resultsBySite.value = response
      },
    })
  }

  async function storeFeature(
    data: NucFeatureObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'POST',
      data,
      onSuccess: (response: NucFeatureObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editFeature(
    data: NucFeatureObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucFeatureObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteFeature(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFeatureObjectInterface>({
      url: apiUrl() + '/features',
      method: 'DELETE',
      id,
      onSuccess: (response: NucFeatureObjectInterface) => {
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
