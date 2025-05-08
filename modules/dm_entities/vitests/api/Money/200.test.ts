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
  })

  it('storeMoney', async (): Promise<void> => {
    await requests.storeMoney(mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editMoney', async (): Promise<void> => {
    await requests.editMoney(mockMoney, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteMoney', async (): Promise<void> => {
    await requests.deleteMoney(mockMoney.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('money'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
