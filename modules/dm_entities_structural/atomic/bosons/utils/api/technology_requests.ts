import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  SiteType,
  TechnologyObjectInterface,
  TechnologyRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function technologyRequests(
  close?: CloseDialogType
): TechnologyRequestsInterface {
  const results: EntityResultsType<TechnologyObjectInterface> = ref([])
  const resultsByCategory: EntityResultsType<TechnologyObjectInterface> = ref(
    []
  )
  const resultsBySite: EntityResultsType<TechnologyObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllTechnologies(loading?: boolean): Promise<void> {
    await apiHandle<TechnologyObjectInterface[]>({
      url: apiUrl() + '/technologies',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountTechnologiesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/technologies/count-by-created-last-week',
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
    await apiHandle<TechnologyObjectInterface[]>({
      url: apiUrl() + `/technologies/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyObjectInterface[]) => {
        resultsByCategory.value = response
      },
    })
  }

  async function getSiteTechnologies(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<TechnologyObjectInterface[]>({
      url: apiUrl() + `/technologies/get-site-technologies/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: TechnologyObjectInterface[]) => {
        resultsBySite.value = response
      },
    })
  }

  async function storeTechnology(
    data: TechnologyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editTechnology(
    data: TechnologyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<TechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
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
    await apiHandle<TechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
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
