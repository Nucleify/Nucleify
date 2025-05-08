import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockUser,
  userRequests,
  mockGlobalFetch,
  useDialog,
  UserRequestsInterface,
} from 'atomic'

describe('userRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: UserRequestsInterface = userRequests(closeDialog)
  const mockResponse = [mockUser]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllUsers', async (): Promise<void> => {
    await requests.getAllUsers()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('storeUser', async (): Promise<void> => {
    await requests.storeUser(mockUser, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editUser', async (): Promise<void> => {
    await requests.editUser(mockUser, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteUser', async (): Promise<void> => {
    await requests.deleteUser(mockUser.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
