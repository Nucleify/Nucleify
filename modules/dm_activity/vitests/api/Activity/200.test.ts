import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  mockActivity,
  activityRequests,
  mockGlobalFetch,
  useDialog,
  ActivityLogRequestsInterface,
} from 'atomic'

describe('activityRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: ActivityLogRequestsInterface = activityRequests(closeDialog)
  const mockResponse = [mockActivity]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllActivities', async (): Promise<void> => {
    await requests.getAllActivities()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('activity-log'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('getCountActivitiesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountActivitiesByCreatedLastWeek()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('activity-log/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('deleteActivity', async (): Promise<void> => {
    await requests.deleteActivity(mockActivity.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('activity-log'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
