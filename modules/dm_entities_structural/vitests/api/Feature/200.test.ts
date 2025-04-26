import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockFeature,
  mockUseToast,
  FeatureInterface,
  FeatureRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  featureRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('featureRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: FeatureRequestsInterface = featureRequests(closeDialog)
  const mockResponse: EntityResponseType<FeatureInterface[]> = {
    data: [mockFeature],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllFeatures', async (): Promise<void> => {
    await requests.getAllFeatures()

    expect(axios.get).toHaveBeenCalledWith('/api/features')
    expect(mockUseToast.success)
  })

  it('getCountFeaturesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountFeaturesByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/features/count-by-created-last-week'
    )

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeFeature', async (): Promise<void> => {
    await requests.storeFeature(mockFeature)

    expect(axios.post).toHaveBeenCalledWith('/api/features', {
      header: mockFeature.header,
      description: mockFeature.description,
      category: mockFeature.category,
    })

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editFeature', async (): Promise<void> => {
    await requests.editFeature(mockFeature, requests.getAllFeatures(), close)

    expect(axios.put).toHaveBeenCalledWith('/api/features/' + mockFeature.id, {
      header: mockFeature.header,
      description: mockFeature.description,
      category: mockFeature.category,
    })

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteFeature', async (): Promise<void> => {
    await requests.deleteFeature(
      mockFeature.id,
      requests.getAllFeatures(),
      close
    )

    expect(axios.delete).toHaveBeenCalledWith('/api/features/' + mockFeature.id)
    expect(axios.get).toHaveBeenCalledWith('/api/features')
    expect(mockUseToast.success)
  })
})
