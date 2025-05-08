import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockQuestion,
  questionRequests,
  mockGlobalFetch,
  useDialog,
  QuestionRequestsInterface,
} from 'atomic'

describe('questionRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: QuestionRequestsInterface = questionRequests(closeDialog)
  const mockResponse = [mockQuestion]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllQuestions', async (): Promise<void> => {
    await requests.getAllQuestions()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('getCountQuestionsByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountQuestionsByCreatedLastWeek()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('storeQuestion', async (): Promise<void> => {
    await requests.storeQuestion(mockQuestion, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editQuestion', async (): Promise<void> => {
    await requests.editQuestion(mockQuestion, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteQuestion', async (): Promise<void> => {
    await requests.deleteQuestion(mockQuestion.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
