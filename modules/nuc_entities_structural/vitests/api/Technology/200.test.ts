import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('technologyRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucTechnologyRequestsInterface =
    atomic.technologyRequests(closeDialog)
  const mockResponse = [atomic.mockTechnology]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllTechnologies', async (): Promise<void> => {
    await requests.getAllTechnologies()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeTechnology', async (): Promise<void> => {
    await requests.storeTechnology(atomic.mockTechnology)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editTechnology', async (): Promise<void> => {
    await requests.editTechnology(atomic.mockTechnology)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteTechnology', async (): Promise<void> => {
    await requests.deleteTechnology(atomic.mockTechnology.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
