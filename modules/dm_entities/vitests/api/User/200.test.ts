import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('userRequests', (): void => {
  const { closeDialog } = atomic.useDialog()
  const requests: atomic.UserRequestsInterface =
    atomic.userRequests(closeDialog)
  const mockResponse = [atomic.mockUser]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllUsers', async (): Promise<void> => {
    await requests.getAllUsers()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeUser', async (): Promise<void> => {
    await requests.storeUser(atomic.mockUser)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editUser', async (): Promise<void> => {
    await requests.editUser(atomic.mockUser)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteUser', async (): Promise<void> => {
    await requests.deleteUser(atomic.mockUser.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('users'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
