import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockTechnology,
  technologyRequests,
  mockGlobalFetch,
  useDialog,
  TechnologyRequestsInterface,
} from 'atomic'

describe('technologyRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: TechnologyRequestsInterface = technologyRequests(closeDialog)
  const mockResponse = [mockTechnology]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllTechnologies', async (): Promise<void> => {
    await requests.getAllTechnologies()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('storeTechnology', async (): Promise<void> => {
    await requests.storeTechnology(mockTechnology, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('editTechnology', async (): Promise<void> => {
    await requests.editTechnology(mockTechnology, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'PUT' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteTechnology', async (): Promise<void> => {
    await requests.deleteTechnology(mockTechnology.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('technologies'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})