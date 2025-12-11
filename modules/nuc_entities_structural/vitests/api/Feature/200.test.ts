import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('featureRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucFeatureRequestsInterface =
    atomic.featureRequests(closeDialog)
  const mockResponse = [atomic.mockFeature]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllFeatures', async (): Promise<void> => {
    await requests.getAllFeatures()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('getCountFeaturesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountFeaturesByCreatedLastWeek()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('features/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeFeature', async (): Promise<void> => {
    await requests.storeFeature(atomic.mockFeature)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editFeature', async (): Promise<void> => {
    await requests.editFeature(atomic.mockFeature)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteFeature', async (): Promise<void> => {
    await requests.deleteFeature(atomic.mockFeature.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
