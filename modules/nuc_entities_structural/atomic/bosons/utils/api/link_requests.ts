import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucLinkObjectInterface,
  NucLinkRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function linkRequests(
  close?: CloseDialogType
): NucLinkRequestsInterface {
  const results: EntityResultsType<NucLinkObjectInterface> = ref([])
  const resultsByCategory: EntityResultsType<NucLinkObjectInterface> = ref([])
  const resultsBySite: EntityResultsType<NucLinkObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllLinks(loading?: boolean): Promise<void> {
    await apiHandle<NucLinkObjectInterface[]>({
      url: apiUrl() + '/links',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucLinkObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountLinksByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/links/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getLinksByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<NucLinkObjectInterface[]>({
      url: apiUrl() + `/links/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucLinkObjectInterface[]) => {
        resultsByCategory.value = response
      },
    })
  }

  async function getSiteLinks(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<NucLinkObjectInterface[]>({
      url: apiUrl() + `/links/get-site-links/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucLinkObjectInterface[]) => {
        resultsBySite.value = response
      },
    })
  }

  async function storeLink(
    data: NucLinkObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucLinkObjectInterface>({
      url: apiUrl() + '/links',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editLink(
    data: NucLinkObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucLinkObjectInterface>({
      url: apiUrl() + '/links',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteLink(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucLinkObjectInterface>({
      url: apiUrl() + '/links',
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
    getAllLinks,
    getCountLinksByCreatedLastWeek,
    getLinksByCategory,
    getSiteLinks,
    storeLink,
    editLink,
    deleteLink,
  }
}
