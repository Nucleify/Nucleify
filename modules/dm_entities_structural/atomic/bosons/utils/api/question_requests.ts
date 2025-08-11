import { ref } from 'vue'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  QuestionObjectInterface,
  QuestionRequestsInterface,
  SiteType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function questionRequests(
  close?: CloseDialogType
): QuestionRequestsInterface {
  const results: EntityResultsType<QuestionObjectInterface> = ref([])
  const resultsByCategory: EntityResultsType<QuestionObjectInterface> = ref([])
  const resultsBySite: EntityResultsType<QuestionObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllQuestions(loading?: boolean): Promise<void> {
    await apiHandle<QuestionObjectInterface[]>({
      url: apiUrl() + '/questions',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: QuestionObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountQuestionsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/questions/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function getQuestionsByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<QuestionObjectInterface[]>({
      url: apiUrl() + `/questions/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: QuestionObjectInterface[]) => {
        resultsByCategory.value = response
        apiSuccess(response)
      },
    })
  }

  async function getSiteQuestions(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<QuestionObjectInterface[]>({
      url: apiUrl() + `/questions/get-site-questions/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: QuestionObjectInterface[]) => {
        resultsBySite.value = data
      },
    })
  }

  async function storeQuestion(
    data: QuestionObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionObjectInterface>({
      url: apiUrl() + '/questions',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editQuestion(
    data: QuestionObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionObjectInterface>({
      url: apiUrl() + '/questions',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteQuestion(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionObjectInterface>({
      url: apiUrl() + '/questions',
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
    getAllQuestions,
    getCountQuestionsByCreatedLastWeek,
    getQuestionsByCategory,
    getSiteQuestions,
    storeQuestion,
    editQuestion,
    deleteQuestion,
  }
}
