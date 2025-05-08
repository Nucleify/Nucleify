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
  })

  it('storeLink', async (): Promise<void> => {
    await requests.storeLink(mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editLink', async (): Promise<void> => {
    await requests.editLink(mockLink, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteLink', async (): Promise<void> => {
    await requests.deleteLink(mockLink.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('links'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
