import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('technologyRequests', (): void => {
  const { closeDialog } = nucleify.useNucDialog()
  const requests: nucleify.NucTechnologyRequestsInterface =
    nucleify.technologyRequests(closeDialog)
  const mockResponse = [nucleify.mockTechnology]

  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, mockResponse)
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
    await requests.storeTechnology(nucleify.mockTechnology)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editTechnology', async (): Promise<void> => {
    await requests.editTechnology(nucleify.mockTechnology)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteTechnology', async (): Promise<void> => {
    await requests.deleteTechnology(nucleify.mockTechnology.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
