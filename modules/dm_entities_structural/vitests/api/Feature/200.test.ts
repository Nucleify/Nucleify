import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockFeature,
  featureRequests,
  mockGlobalFetch,
  useDialog,
  FeatureRequestsInterface,
} from 'atomic'

describe('featureRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: FeatureRequestsInterface = featureRequests(closeDialog)
  const mockResponse = [mockFeature]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllFeatures', async (): Promise<void> => {
    await requests.getAllFeatures()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('getCountFeaturesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountFeaturesByCreatedLastWeek()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('features/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('storeFeature', async (): Promise<void> => {
    await requests.storeFeature(mockFeature, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editFeature', async (): Promise<void> => {
    await requests.editFeature(mockFeature, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteFeature', async (): Promise<void> => {
    await requests.deleteFeature(mockFeature.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('features'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
