import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { act, renderHook } from '@testing-library/react'
import type { ShareRequestsInterface } from '../../../atomic/types'
import { useShareRequests } from '../../../atomic/utils/requests'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function createFetchMock(): ReturnType<typeof vi.fn> {
  return vi.fn(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = String(input)
      const method = (init?.method ?? 'GET').toUpperCase()

      if (method === 'POST' && url.includes('/share/1/accept')) {
        return jsonResponse({ data: { message: 'Accepted' } })
      }
      if (method === 'POST' && url.includes('/share/1/reject')) {
        return jsonResponse({ data: { message: 'Rejected' } })
      }
      if (method === 'POST' && url.includes('/share/1/cancel')) {
        return jsonResponse({ data: { message: 'Cancelled' } })
      }
      if (url.includes('/share/received')) {
        return jsonResponse({ data: [] })
      }
      if (url.includes('/share/sent')) {
        return jsonResponse({ data: [] })
      }
      if (url.includes('/share/count')) {
        return jsonResponse({ data: { count: 0 } })
      }

      return jsonResponse({ data: null })
    }
  )
}

describe('useShareRequests', (): void => {
  const originalFetch = globalThis.fetch
  const originalApiUrl = process.env.NEXT_PUBLIC_API_URL

  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach((): void => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_API_URL = 'http://test-api.test'
    fetchMock = createFetchMock()
    globalThis.fetch = fetchMock as typeof fetch
  })

  afterEach((): void => {
    globalThis.fetch = originalFetch
    process.env.NEXT_PUBLIC_API_URL = originalApiUrl
  })

  it('loadAll fetches received, sent, and count', async (): Promise<void> => {
    const { result } = renderHook(
      (): ShareRequestsInterface => useShareRequests()
    )

    await act(async () => {
      await result.current.loadAll()
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/received'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/sent'),
      expect.objectContaining({ method: 'GET' })
    )
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/count'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('acceptRequest sends POST to accept endpoint', async (): Promise<void> => {
    const { result } = renderHook(
      (): ShareRequestsInterface => useShareRequests()
    )

    await act(async () => {
      await result.current.acceptRequest(1)
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/1/accept'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('rejectRequest sends POST to reject endpoint', async (): Promise<void> => {
    const { result } = renderHook(
      (): ShareRequestsInterface => useShareRequests()
    )

    await act(async () => {
      await result.current.rejectRequest(1)
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/1/reject'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('cancelRequest sends POST to cancel endpoint', async (): Promise<void> => {
    const { result } = renderHook(
      (): ShareRequestsInterface => useShareRequests()
    )

    await act(async () => {
      await result.current.cancelRequest(1)
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('share/1/cancel'),
      expect.objectContaining({ method: 'POST' })
    )
  })
})
