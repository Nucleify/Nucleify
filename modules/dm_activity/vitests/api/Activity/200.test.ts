import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

import {
  mockActivity,
  mockUseToast,
  ActivityLogInterface,
  ActivityLogRequestsInterface,
  EntityResponseType,
  MockUseToastInterface,
  activityRequests,
  useDialog,
} from 'atomic'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
  useToast: () => mockUseToast(vi.fn()),
}))

describe('activityRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: ActivityLogRequestsInterface = activityRequests(closeDialog)
  const mockResponse: EntityResponseType<ActivityLogInterface[]> = {
    data: [mockActivity],
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue(mockResponse)
    axios.post.mockResolvedValue(mockResponse)
    axios.put.mockResolvedValue(mockResponse)
    axios.delete.mockResolvedValue(mockResponse)
  })

  it('getAllActivities', async (): Promise<void> => {
    await requests.getAllActivities()

    expect(axios.get).toHaveBeenCalledWith('/api/activity-log')
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('getCountActivitiesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountActivitiesByCreatedLastWeek()

    expect(axios.get).toHaveBeenCalledWith(
      '/api/activity-log/count-by-created-last-week'
    )
    expect(requests.results.value).toEqual(mockResponse.data)
    expect(mockUseToast.success)
  })

  it('deleteActivity', async (): Promise<void> => {
    await requests.deleteActivity(
      mockActivity.id,
      requests.getAllActivities(),
      close
    )

    expect(axios.delete).toHaveBeenCalledWith(
      '/api/activity-log/' + mockActivity.id
    )
    expect(axios.get).toHaveBeenCalledWith('/api/activity-log')
    expect(mockUseToast.success)
  })
})
