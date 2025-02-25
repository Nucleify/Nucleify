import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockMoney,
  mockUseToast,
  MoneyInterface,
  MoneyRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  moneyRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('moneyRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: MoneyRequestsInterface = moneyRequests(closeDialog)
  const mockResponse: EntityResponseType<MoneyInterface[]> = {
    data: [mockMoney],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllMoney', async (): Promise<void> => {
    await requests.getAllMoney()

    expect(axios.get).toHaveBeenCalledWith('/api/money')
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('getCountMoneyByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountMoneyByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/money/count-by-created-last-week'
    )
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeMoney', async (): Promise<void> => {
    await requests.storeMoney(mockMoney, requests.getAllMoney(), close)

    expect(axios.post).toHaveBeenCalledWith('/api/money', {
      user_id: window.sessionStorage.getItem('user_id'),
      sender: mockMoney.sender,
      receiver: mockMoney.receiver,
      count: mockMoney.count,
      title: mockMoney.title,
      description: mockMoney.description,
      category: mockMoney.category,
    })

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editMoney', async (): Promise<void> => {
    await requests.editMoney(mockMoney, requests.getAllMoney(), close)

    expect(axios.put).toHaveBeenCalledWith(`/api/money/${mockMoney.id}`, {
      sender: mockMoney.sender,
      receiver: mockMoney.receiver,
      count: mockMoney.count,
      title: mockMoney.title,
      description: mockMoney.description,
      category: mockMoney.category,
    })

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteMoney', async (): Promise<void> => {
    await requests.deleteMoney(mockMoney.id, requests.getAllMoney(), close)
    expect(axios.delete).toHaveBeenCalledWith(`/api/money/${mockMoney.id}`)
    expect(axios.get).toHaveBeenCalledWith('/api/money')
    expect(mockUseToast.success)
  })
})
