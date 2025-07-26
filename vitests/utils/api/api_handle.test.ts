import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

describe('apiHandle', () => {
  let onSuccess: ReturnType<typeof vi.fn>,
    setLoading: ReturnType<typeof vi.fn>,
    apiHandle: typeof atomic.apiHandle,
    apiErrors: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    onSuccess = vi.fn()
    setLoading = vi.fn()
    apiErrors = vi.fn()
    vi.spyOn(atomic, 'useApiErrors').mockReturnValue({ apiErrors })
    apiHandle = atomic.apiHandle
  })

  it('calls onSuccess with response data', async () => {
    vi.spyOn(atomic, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess })
    expect(onSuccess).toHaveBeenCalledWith('ok')
  })

  it('calls setLoading true/false', async () => {
    vi.spyOn(atomic, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('calls apiErrors on error', async () => {
    vi.spyOn(atomic, 'apiRequest').mockRejectedValueOnce(new Error('fail'))
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(apiErrors).toHaveBeenCalled()
  })
})
