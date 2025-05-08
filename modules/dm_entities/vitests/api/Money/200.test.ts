import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockMoney,
  moneyRequests,
  mockGlobalFetch,
  useDialog,
  MoneyRequestsInterface,
} from 'atomic'

describe('moneyRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: MoneyRequestsInterface = moneyRequests(closeDialog)
  const mockResponse = [mockMoney]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllMoney', async (): Promise<void> => {
    await requests.getAllMoney()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeMoney', async (): Promise<void> => {
    await requests.storeMoney(mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editMoney', async (): Promise<void> => {
    await requests.editMoney(mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteMoney', async (): Promise<void> => {
    await requests.deleteMoney(mockMoney.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
