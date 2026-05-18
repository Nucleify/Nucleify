import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('questionRequests', (): void => {
  const { closeDialog } = nucleify.useNucDialog()
  const requests: nucleify.NucQuestionRequestsInterface =
    nucleify.questionRequests(closeDialog)
  const mockResponse = [nucleify.mockQuestion]

  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, mockResponse)
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
    await requests.storeQuestion(nucleify.mockQuestion)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editQuestion', async (): Promise<void> => {
    await requests.editQuestion(nucleify.mockQuestion)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteQuestion', async (): Promise<void> => {
    await requests.deleteQuestion(nucleify.mockQuestion.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('questions'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
