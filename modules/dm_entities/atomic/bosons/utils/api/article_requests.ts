import { ref } from 'vue'

import {
  ArticleInterface,
  ArticleRequestsInterface,
  CloseDialogType,
  UseLoadingInterface,
  EntityCountResultsType,
  EntityResultsType,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function articleRequests(
  close?: CloseDialogType
): ArticleRequestsInterface {
  const results: EntityResultsType<ArticleInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllArticles(loading?: boolean): Promise<void> {
    await apiHandle<ArticleInterface[]>({
      url: runtime.apiUrl + 'articles',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: ArticleInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountArticlesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: runtime.apiUrl + 'articles/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeArticle(
    data: ArticleInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleInterface>({
      url: runtime.apiUrl + 'articles',
      method: 'POST',
      data,
      onSuccess: (response: ArticleInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editArticle(
    article: ArticleInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleInterface>({
      url: runtime.apiUrl + 'articles',
      method: 'PUT',
      data: article,
      id: article.id,
      onSuccess: (response: ArticleInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteArticle(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<ArticleInterface>({
      url: runtime.apiUrl + 'articles',
      method: 'DELETE',
      id,
      onSuccess: (response: ArticleInterface) => {
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
