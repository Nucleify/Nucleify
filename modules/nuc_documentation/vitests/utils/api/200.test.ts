import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('documentationRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucDocumentationRequestsInterface =
    atomic.documentationRequests(closeDialog)
  const mockResponse = [atomic.mockDocumentation]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllDocumentation', async (): Promise<void> => {
    await requests.getAllDocumentation()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('documentation'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeDocumentation', async (): Promise<void> => {
    await requests.storeDocumentation(atomic.mockDocumentation)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('documentation'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editDocumentation', async (): Promise<void> => {
    await requests.editDocumentation(atomic.mockDocumentation)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('documentation'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteDocumentation', async (): Promise<void> => {
    await requests.deleteDocumentation(atomic.mockDocumentation.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('documentation'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
