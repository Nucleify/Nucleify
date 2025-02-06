import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockQuestion,
  mockUseToast,
  QuestionInterface,
  QuestionRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  questionRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('questionRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: QuestionRequestsInterface = questionRequests(closeDialog)
  const mockResponse: EntityResponseType<QuestionInterface[]> = {
    data: [mockQuestion],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllQuestions', async (): Promise<void> => {
    await requests.getAllQuestions()

    expect(axios.get).toHaveBeenCalledWith('/api/questions')
    expect(mockUseToast.success)
  })

  it('getCountQuestionsByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountQuestionsByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/questions/count-by-created-last-week'
    )

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeQuestion', async (): Promise<void> => {
    await requests.storeQuestion(mockQuestion)

    expect(axios.post).toHaveBeenCalledWith('/api/questions', {
      user_id: window.sessionStorage.getItem('user_id'),
      index: mockQuestion.index,
      content: mockQuestion.content,
      answer: mockQuestion.answer,
      category: mockQuestion.category,
    })

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editQuestion', async (): Promise<void> => {
    await requests.editQuestion(mockQuestion, requests.getAllQuestions(), close)

    expect(axios.put).toHaveBeenCalledWith(
      '/api/questions/' + mockQuestion.id,
      {
        content: mockQuestion.content,
        answer: mockQuestion.answer,
        category: mockQuestion.category,
      }
    )

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteQuestion', async (): Promise<void> => {
    await requests.deleteQuestion(
      mockQuestion.id,
      requests.getAllQuestions(),
      close
    )

    expect(axios.delete).toHaveBeenCalledWith(
      '/api/questions/' + mockQuestion.id
    )
    expect(axios.get).toHaveBeenCalledWith('/api/questions')
    expect(mockUseToast.success)
  })
})
