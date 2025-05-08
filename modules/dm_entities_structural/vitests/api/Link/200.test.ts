import { describe, expect, it, beforeEach, vi } from 'vitest'
import * as atomic from 'atomic'

describe('linkRequests', (): void => {
  const { closeDialog } = atomic.useDialog()
  const requests: atomic.LinkRequestsInterface = atomic.linkRequests(closeDialog)
  const mockResponse = [atomic.mockLink]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(mockResponse)
  })

  it('getAllLinks', async (): Promise<void> => {
    await requests.getAllLinks()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeLink', async (): Promise<void> => {
    await requests.storeLink(atomic.mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editLink', async (): Promise<void> => {
    await requests.editLink(atomic.mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteLink', async (): Promise<void> => {
    await requests.deleteLink(atomic.mockLink.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
