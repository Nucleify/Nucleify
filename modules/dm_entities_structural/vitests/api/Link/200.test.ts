import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockLink,
  linkRequests,
  mockGlobalFetch,
  useDialog,
  LinkRequestsInterface,
} from 'atomic'

describe('linkRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: LinkRequestsInterface = linkRequests(closeDialog)
  const mockResponse = [mockLink]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
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
    await requests.storeLink(mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editLink', async (): Promise<void> => {
    await requests.editLink(mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteLink', async (): Promise<void> => {
    await requests.deleteLink(mockLink.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
