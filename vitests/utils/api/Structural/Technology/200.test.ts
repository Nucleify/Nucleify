import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockTechnology,
  mockUseToast,
  TechnologyInterface,
  TechnologyRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  technologyRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('technologyRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: TechnologyRequestsInterface = technologyRequests(closeDialog)
  const mockResponse: EntityResponseType<TechnologyInterface[]> = {
    data: [mockTechnology],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllTechnologies', async (): Promise<void> => {
    await requests.getAllTechnologies()

    expect(axios.get).toHaveBeenCalledWith('/api/technologies')
    expect(mockUseToast.success)
  })

  it('getCountTechnologiesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountTechnologiesByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/technologies/count-by-created-last-week'
    )

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeTechnology', async (): Promise<void> => {
    await requests.storeTechnology(mockTechnology)

    expect(axios.post).toHaveBeenCalledWith('/api/technologies', {
      user_id: window.sessionStorage.getItem('user_id'),
      href: mockTechnology.href,
      src: mockTechnology.src,
      label: mockTechnology.label,
      description: mockTechnology.description,
      category: mockTechnology.category,
      display: mockTechnology.display,
    })

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editTechnology', async (): Promise<void> => {
    await requests.editTechnology(
      mockTechnology,
      requests.getAllTechnologies(),
      close
    )

    expect(axios.put).toHaveBeenCalledWith(
      '/api/technologies/' + mockTechnology.id,
      {
        href: mockTechnology.href,
        src: mockTechnology.src,
        label: mockTechnology.label,
        description: mockTechnology.description,
        category: mockTechnology.category,
        display: mockTechnology.display,
      }
    )

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteTechnology', async (): Promise<void> => {
    await requests.deleteTechnology(
      mockTechnology.id,
      requests.getAllTechnologies(),
      close
    )

    expect(axios.delete).toHaveBeenCalledWith(
      '/api/technologies/' + mockTechnology.id
    )
    expect(axios.get).toHaveBeenCalledWith('/api/technologies')
    expect(mockUseToast.success)
  })
})
