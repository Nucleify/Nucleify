import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucArticleObjectInterface,
  NucArticleRequestsInterface,
  UseLoadingInterface,
} from 'atomic'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function articleRequests(
  close?: CloseDialogType
): NucArticleRequestsInterface {
  const results: EntityResultsType<NucArticleObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllArticles(loading?: boolean): Promise<void> {
    await apiHandle<NucArticleObjectInterface[]>({
      url: apiUrl() + '/articles',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucArticleObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountArticlesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/articles/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeArticle(
    data: NucArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editArticle(
    data: NucArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'PUT',
      data: data,
      id: data.id,
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteArticle(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'DELETE',
      id,
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllArticles,
    getCountArticlesByCreatedLastWeek,
    storeArticle,
    editArticle,
    deleteArticle,
  }
}
