import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as atomic from 'atomic'

describe('apiRequest', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls $fetch with all HTTP methods and returns response', async () => {
    for (const method of atomic.httpMethods) {
      atomic.mockGlobalFetch(vi, { ok: method })
      const res = await atomic.apiRequest('/api/test', method, { a: 1 })
      expect(
        (globalThis as unknown as { $fetch: Mock }).$fetch
      ).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({ method, body: { a: 1 } })
      )
      expect(res).toEqual({ ok: method })
    }
  })

  it('calls $fetch with id in url', async () => {
    atomic.mockGlobalFetch(vi, { id: 2 })
    await atomic.apiRequest('/api/test', 'GET', null, 2)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith('/api/test/2', expect.anything())
  })
})
