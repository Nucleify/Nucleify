import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  ArticleInterface,
  ArticleResultsType,
  ArticleRequestsInterface,
  DeleteEntityRequestFunctionType,
  CloseDialogFunctionType,
  UseLoadingInterface,
  UseApiErrorsServiceInterface,
  UseToastInterface,
  GetAllEntitiesRequestFunctionType,
  StoreEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestResponseType,
} from 'atomic/bosons/types'
import {
  apiSuccess,
  useApiErrors,
  useLoading,
  useToast,
} from 'atomic/bosons/utils'

export function articleRequests(
  close?: CloseDialogFunctionType
): ArticleRequestsInterface {
  const results: ArticleResultsType = ref([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsServiceInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllArticles(
    loading?: boolean
  ): GetAllEntitiesRequestFunctionType<ArticleInterface> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<ArticleInterface> =
        await axios.get('/api/articles')

      results.value = response.data
    } catch (error) {
      apiErrors(error)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function storeArticle(
    data: ArticleInterface,
    getData: () => void
  ): StoreEntityRequestFunctionType<ArticleInterface> {
    try {
      const response: AxiosResponse = await axios.post('/api/articles', {
        user_id: window.sessionStorage.getItem('user_id'),
        title: data.title,
        description: data.description,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close, 'create')
    } catch (error) {
      apiErrors(error)
    }
  }

  async function editArticle(
    article: ArticleInterface,
    getData: () => void
  ): EditEntityRequestFunctionType<ArticleInterface> {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/articles/${article.id}`,
        {
          title: article.title,
          description: article.description,
          category: article.category,
        }
      )

      await apiSuccess(response, getData, flashToast, close, 'edit')
    } catch (error) {
      apiErrors(error)
    }
  }

  async function deleteArticle(
    id: number,
    getData: () => void
  ): DeleteEntityRequestFunctionType {
    try {
      const response: AxiosResponse = await axios.delete(`/api/articles/${id}`)

      await apiSuccess(response, getData, flashToast, close, 'delete')
    } catch (error) {
      apiErrors(error)
    }
  }

  return {
    results,
    loading,
    getAllArticles,
    storeArticle,
    editArticle,
    deleteArticle,
  }
}
