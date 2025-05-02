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
      url: 'links',
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
      url: 'links/count-by-created-last-week',
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
      url: `links/get-by-category/${category}`,
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
      url: `links/get-site-links/${site}`,
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
      url: 'links',
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
      url: `links/${data.id}`,
      method: 'PUT',
      data,
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
      url: `links/${id}`,
      method: 'DELETE',
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
