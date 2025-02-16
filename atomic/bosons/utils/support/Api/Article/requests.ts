import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  ArticleInterface,
  ArticleResultsType,
  ArticleRequestsInterface,
  CloseDialogFunctionType,
  UseLoadingInterface,
  UseApiErrorsInterface,
  UseToastInterface,
  GetAllEntitiesRequestResponseType,
  apiSuccess,
  catchErrors,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic'

export function articleRequests(
  close?: CloseDialogFunctionType
): ArticleRequestsInterface {
  const results: ArticleResultsType = ref<ArticleInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllArticles(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<ArticleInterface> =
        await axios.get('/api/articles')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountArticlesByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get(
        '/api/articles/count-by-created-last-week'
      )

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function storeArticle(
    data: ArticleInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/articles', {
        user_id: window.sessionStorage.getItem('user_id'),
        title: data.title,
        description: data.description,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editArticle(
    article: ArticleInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/articles/${article.id}`,
        {
          title: article.title,
          description: article.description,
          category: article.category,
        }
      )

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteArticle(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/articles/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
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
