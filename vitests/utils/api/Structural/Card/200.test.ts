import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockCard,
  mockUseToast,
  StructuralCardInterface,
  CardRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  cardRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('cardRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: CardRequestsInterface = cardRequests(closeDialog)
  const mockResponse: EntityResponseType<StructuralCardInterface[]> = {
    data: [mockCard],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllCards', async (): Promise<void> => {
    await requests.getAllCards()

    expect(axios.get).toHaveBeenCalledWith('/api/cards')
    expect(mockUseToast.success)
  })

  it('getCountCardsByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountCardsByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/cards/count-by-created-last-week'
    )

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeCard', async (): Promise<void> => {
    await requests.storeCard(mockCard)

    expect(axios.post).toHaveBeenCalledWith('/api/cards', {
      src: mockCard.src,
      title: mockCard.title,
      description: mockCard.description,
      component: mockCard.component,
      display: mockCard.display,
    })

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editCard', async (): Promise<void> => {
    await requests.editCard(mockCard, requests.getAllCards(), close)

    expect(axios.put).toHaveBeenCalledWith('/api/cards/' + mockCard.id, {
      src: mockCard.src,
      title: mockCard.title,
      description: mockCard.description,
      component: mockCard.component,
      display: mockCard.display,
    })

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteCard', async (): Promise<void> => {
    await requests.deleteCard(mockCard.id, requests.getAllCards(), close)

    expect(axios.delete).toHaveBeenCalledWith('/api/cards/' + mockCard.id)
    expect(axios.get).toHaveBeenCalledWith('/api/cards')
    expect(mockUseToast.success)
  })
})
