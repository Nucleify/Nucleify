import { Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
  QuestionInterface,
  QuestionRequestsInterface,
  QuestionResultsType,
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
  SiteType,
} from 'atomic'

export function questionRequests(
  close?: CloseDialogFunctionType
): QuestionRequestsInterface {
  const results: QuestionResultsType = ref<QuestionInterface[]>([])
  const resultsByCategory: QuestionResultsType = ref<QuestionInterface[]>([])
  const resultsBySite: Ref<QuestionInterface[]> = ref<QuestionInterface[]>([])
  const createdLastWeek: Ref<number> = ref<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()
  const { flashToast }: UseToastInterface = useToast()

  async function getAllQuestions(loading?: boolean): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response: GetAllEntitiesRequestResponseType<QuestionInterface> =
        await axios.get('/api/questions')

      results.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      if (loading) {
        setLoading(false)
      }
    }
  }

  async function getCountQuestionsByCreatedLastWeek(): Promise<void> {
    try {
      const response = await axios.get(
        '/api/questions/count-by-created-last-week'
      )

      createdLastWeek.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getQuestionsByCategory(category: string): Promise<void> {
    try {
      const response = await axios.get(
        `/api/questions/get-by-category/${category}`
      )

      resultsByCategory.value = response.data.count
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function getSiteQuestions(
    loading: boolean,
    site: SiteType
  ): Promise<void> {
    try {
      if (loading) {
        setLoading(true)
      }

      const response = await axios.get(
        `/api/questions/get-site-questions/${site}`
      )

      resultsBySite.value = response.data
    } catch (error) {
      catchErrors(error, apiErrors)
    } finally {
      setLoading(false)
    }
  }

  async function storeQuestion(
    data: QuestionInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post('/api/questions', {
        user_id: window.sessionStorage.getItem('user_id'),
        index: data.index,
        content: data.content,
        answer: data.answer,
        category: data.category,
      })

      await apiSuccess(response, getData, flashToast, close!, 'create')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function editQuestion(
    data: QuestionInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/questions/${data.id}`,
        {
          index: data.index,
          content: data.content,
          answer: data.answer,
          category: data.category,
        }
      )

      await apiSuccess(response, getData, flashToast, close!, 'edit')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  async function deleteQuestion(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(`/api/questions/${id}`)

      await apiSuccess(response, getData, flashToast, close!, 'delete')
    } catch (error) {
      catchErrors(error, apiErrors)
    }
  }

  return {
    results,
    resultsByCategory,
    resultsBySite,
    createdLastWeek,
    loading,
    getAllQuestions,
    getCountQuestionsByCreatedLastWeek,
    getQuestionsByCategory,
    getSiteQuestions,
    storeQuestion,
    editQuestion,
    deleteQuestion,
  }
}
