import { describe, expect, it, beforeEach, vi } from 'vitest'
import * as atomic from 'atomic'

describe('questionRequests', (): void => {
  const { closeDialog } = atomic.useDialog()
  const requests: atomic.QuestionRequestsInterface = atomic.questionRequests(closeDialog)
  const mockResponse = [atomic.mockQuestion]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(mockResponse)
  })

  it('getAllQuestions', async (): Promise<void> => {
    await requests.getAllQuestions()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('getCountQuestionsByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountQuestionsByCreatedLastWeek()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeQuestion', async (): Promise<void> => {
    await requests.storeQuestion(atomic.mockQuestion, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editQuestion', async (): Promise<void> => {
    await requests.editQuestion(atomic.mockQuestion, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteQuestion', async (): Promise<void> => {
    await requests.deleteQuestion(atomic.mockQuestion.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
