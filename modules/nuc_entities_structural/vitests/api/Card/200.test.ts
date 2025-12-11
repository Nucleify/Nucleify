import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('cardRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucCardRequestsInterface =
    atomic.cardRequests(closeDialog)
  const mockResponse = [atomic.mockCard]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllCards', async (): Promise<void> => {
    await requests.getAllCards()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeCard', async (): Promise<void> => {
    await requests.storeCard(atomic.mockCard)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editCard', async (): Promise<void> => {
    await requests.editCard(atomic.mockCard)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteCard', async (): Promise<void> => {
    await requests.deleteCard(atomic.mockCard.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
