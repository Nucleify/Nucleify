import { ref } from 'vue'

import type {
  ArticleObjectInterface,
  ArticleRequestsInterface,
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function articleRequests(
  close?: CloseDialogType
): ArticleRequestsInterface {
  const results: EntityResultsType<ArticleObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllArticles(loading?: boolean): Promise<void> {
    await apiHandle<ArticleObjectInterface[]>({
      url: apiUrl() + '/articles',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: ArticleObjectInterface[]) => {
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
    data: ArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'POST',
      data,
      onSuccess: (response: ArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editArticle(
    article: ArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'PUT',
      data: article,
      id: article.id,
      onSuccess: (response: ArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteArticle(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleObjectInterface>({
      url: apiUrl() + '/articles',
      method: 'DELETE',
      id,
      onSuccess: (response: ArticleObjectInterface) => {
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
