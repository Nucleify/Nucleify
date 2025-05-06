import { ref } from 'vue'

import {
  CloseDialogType,
  UseLoadingInterface,
  useApiSuccess,
  useLoading,
  SiteType,
  LinkRequestsInterface,
  LinkInterface,
  apiHandle,
  EntityResultsType,
  EntityCountResultsType,
} from 'atomic'

export function linkRequests(close?: CloseDialogType): LinkRequestsInterface {
  const results: EntityResultsType<LinkInterface> = ref([])
  const resultsByCategory: EntityResultsType<LinkInterface> = ref([])
  const resultsBySite: EntityResultsType<LinkInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllLinks(loading?: boolean): Promise<void> {
    await apiHandle<LinkInterface[]>({
      url: runtime.apiUrl + 'links',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: LinkInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountLinksByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: runtime.apiUrl + 'links/count-by-created-last-week',
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
    await apiHandle<LinkInterface[]>({
      url: runtime.apiUrl + `links/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: LinkInterface[]) => {
        resultsByCategory.value = response
      },
    })
  }

  async function getSiteLinks(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<LinkInterface[]>({
      url: runtime.apiUrl + `links/get-site-links/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: LinkInterface[]) => {
        resultsBySite.value = response
      },
    })
  }

  async function storeLink(
    data: LinkInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<LinkInterface>({
      url: runtime.apiUrl + 'links',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editLink(
    data: LinkInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<LinkInterface>({
      url: runtime.apiUrl + 'links/',
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
    await apiHandle<LinkInterface>({
      url: runtime.apiUrl + 'links/',
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
