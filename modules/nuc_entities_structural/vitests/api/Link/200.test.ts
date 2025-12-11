import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('linkRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucLinkRequestsInterface =
    atomic.linkRequests(closeDialog)
  const mockResponse = [atomic.mockLink]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllLinks', async (): Promise<void> => {
    await requests.getAllLinks()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeLink', async (): Promise<void> => {
    await requests.storeLink(atomic.mockLink)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editLink', async (): Promise<void> => {
    await requests.editLink(atomic.mockLink)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteLink', async (): Promise<void> => {
    await requests.deleteLink(atomic.mockLink.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
