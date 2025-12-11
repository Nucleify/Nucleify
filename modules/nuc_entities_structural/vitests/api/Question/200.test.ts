import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('questionRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucQuestionRequestsInterface =
    atomic.questionRequests(closeDialog)
  const mockResponse = [atomic.mockQuestion]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllQuestions', async (): Promise<void> => {
    await requests.getAllQuestions()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('getCountQuestionsByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountQuestionsByCreatedLastWeek()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeQuestion', async (): Promise<void> => {
    await requests.storeQuestion(atomic.mockQuestion)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editQuestion', async (): Promise<void> => {
    await requests.editQuestion(atomic.mockQuestion)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteQuestion', async (): Promise<void> => {
    await requests.deleteQuestion(atomic.mockQuestion.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
