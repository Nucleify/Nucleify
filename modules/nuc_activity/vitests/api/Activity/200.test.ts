import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('activityRequests', (): void => {
  const { closeDialog } = atomic.useNucDialog()
  const requests: atomic.NucActivityRequestsInterface =
    atomic.activityRequests(closeDialog)
  const mockResponse = [atomic.mockActivity]

  beforeEach((): void => {
    vi.clearAllMocks()
    atomic.mockGlobalFetch(vi, mockResponse)
  })

  it('getAllActivities', async (): Promise<void> => {
    await requests.getAllActivities()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('activity-log'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('getCountActivitiesByCreatedLastWeek', async (): Promise<void> => {
    await requests.getCountActivitiesByCreatedLastWeek()
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('activity-log/count-by-created-last-week'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })

  it('deleteActivity', async (): Promise<void> => {
    await requests.deleteActivity(atomic.mockActivity.id ?? 0)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith(
      expect.stringContaining('activity-log'),
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(requests.results.value).toEqual(mockResponse)
  })
})
