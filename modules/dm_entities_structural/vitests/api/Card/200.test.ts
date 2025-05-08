import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockCard,
  cardRequests,
  mockGlobalFetch,
  useDialog,
  CardRequestsInterface,
} from 'atomic'

describe('cardRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: CardRequestsInterface = cardRequests(closeDialog)
  const mockResponse = [mockCard]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllCards', async (): Promise<void> => {
    await requests.getAllCards()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeCard', async (): Promise<void> => {
    await requests.storeCard(mockCard, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editCard', async (): Promise<void> => {
    await requests.editCard(mockCard, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteCard', async (): Promise<void> => {
    await requests.deleteCard(mockCard.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('cards'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
