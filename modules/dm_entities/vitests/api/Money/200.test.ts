import { describe, expect, it, beforeEach, vi } from 'vitest'
import * as atomic from 'atomic'

describe('moneyRequests', (): void => {
  const { closeDialog } = atomic.useDialog()
  const requests: atomic.MoneyRequestsInterface = atomic.moneyRequests(closeDialog)
  const mockResponse = [atomic.mockMoney]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
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
    await requests.storeMoney(atomic.mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editMoney', async (): Promise<void> => {
    await requests.editMoney(atomic.mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteMoney', async (): Promise<void> => {
    await requests.deleteMoney(atomic.mockMoney.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
