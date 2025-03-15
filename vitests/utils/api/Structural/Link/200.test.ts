import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import {
  mockLink,
  mockUseToast,
  LinkInterface,
  LinkRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  linkRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('linkRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: LinkRequestsInterface = linkRequests(closeDialog)
  const mockResponse: EntityResponseType<LinkInterface[]> = {
    data: [mockLink],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllLinks', async (): Promise<void> => {
    await requests.getAllLinks()

    expect(axios.get).toHaveBeenCalledWith('/api/links')
    expect(mockUseToast.success)
  })

  it('getCountLinksByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountLinksByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/links/count-by-created-last-week'
    )

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('storeLink', async (): Promise<void> => {
    await requests.storeLink(mockLink)

    expect(axios.post).toHaveBeenCalledWith('/api/links', {
      ...mockLink,
    })

    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('editLink', async (): Promise<void> => {
    await requests.editLink(mockLink, requests.getAllLinks(), close)

    expect(axios.put).toHaveBeenCalledWith('/api/links/' + mockLink.id, {
      ...mockLink,
    })

    expect(axios.get).toHaveBeenCalled()
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteLink', async (): Promise<void> => {
    await requests.deleteLink(mockLink.id, requests.getAllLinks(), close)

    expect(axios.delete).toHaveBeenCalledWith('/api/links/' + mockLink.id)
    expect(axios.get).toHaveBeenCalledWith('/api/links')
    expect(mockUseToast.success)
  })
})
