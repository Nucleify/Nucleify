import { Ref, ref } from 'vue'

import {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  SiteType,
  TechnologyInterface,
  TechnologyRequestsInterface,
  UseLoadingInterface,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function technologyRequests(
  close?: CloseDialogType
): TechnologyRequestsInterface {
  const results: EntityResultsType<TechnologyInterface> = ref([])
  const resultsByCategory: EntityResultsType<TechnologyInterface> = ref([])
  const resultsBySite: EntityResultsType<TechnologyInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllTechnologies(loading?: boolean): Promise<void> {
    await apiHandle<TechnologyInterface[]>({
      url: 'technologies',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyInterface[]) => {
        results.value = response
        apiSuccess(response)
      },
    })
  }

  async function getCountTechnologiesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: 'technologies/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getTechnologiesByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<TechnologyInterface[]>({
      url: `technologies/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyInterface[]) => {
        resultsByCategory.value = response
        apiSuccess(response)
      },
    })
  }

  async function getSiteTechnologies(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<TechnologyInterface[]>({
      url: `technologies/get-site-technologies/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyInterface[]) => {
        resultsBySite.value = response
        apiSuccess(response)
      },
    })
  }

  async function storeTechnology(
    data: TechnologyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TechnologyInterface>({
      url: 'technologies',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editTechnology(
    data: TechnologyInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TechnologyInterface>({
      url: 'technologies',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteTechnology(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TechnologyInterface>({
      url: 'technologies',
      method: 'DELETE',
      id,
      onSuccess: (response) => {
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
    getAllTechnologies,
    getCountTechnologiesByCreatedLastWeek,
    getTechnologiesByCategory,
    getSiteTechnologies,
    storeTechnology,
    editTechnology,
    deleteTechnology,
  }
}
