import { ref } from 'vue'

import {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  QuestionInterface,
  QuestionRequestsInterface,
  SiteType,
  UseLoadingInterface,
  apiHandle,
  useApiSuccess,
  useLoading,
} from 'atomic'

export function questionRequests(
  close?: CloseDialogType
): QuestionRequestsInterface {
  const results: EntityResultsType<QuestionInterface> = ref([])
  const resultsByCategory: EntityResultsType<QuestionInterface> = ref([])
  const resultsBySite: EntityResultsType<QuestionInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllQuestions(loading?: boolean): Promise<void> {
    await apiHandle<QuestionInterface[]>({
      url: 'questions',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: QuestionInterface[]) => {
        results.value = response
        apiSuccess(response)
      },
    })
  }

  async function getCountQuestionsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: 'questions/count-by-created-last-week',
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
    await apiHandle<QuestionInterface[]>({
      url: `questions/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: QuestionInterface[]) => {
        resultsByCategory.value = response
        apiSuccess(response)
      },
    })
  }

  async function getSiteQuestions(
    site: SiteType,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<QuestionInterface[]>({
      url: `questions/get-site-questions/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (data: QuestionInterface[]) => {
        resultsBySite.value = data
        apiSuccess(data)
      },
    })
  }

  async function storeQuestion(
    data: QuestionInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionInterface>({
      url: 'questions',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editQuestion(
    data: QuestionInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionInterface>({
      url: `questions/${data.id}`,
      method: 'PUT',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteQuestion(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<QuestionInterface>({
      url: `questions/${id}`,
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
    getAllQuestions,
    getCountQuestionsByCreatedLastWeek,
    getQuestionsByCategory,
    getSiteQuestions,
    storeQuestion,
    editQuestion,
    deleteQuestion,
  }
}
