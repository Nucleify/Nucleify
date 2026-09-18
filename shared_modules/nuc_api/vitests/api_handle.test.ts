import { beforeEach, describe, expect, it, vi } from 'vitest'

import { apiHandle } from '../utils/api_handle'
import * as apiRequestMod from '../utils/api_request'
import * as apiErrorsMod from '../utils/use_api_errors'

describe('apiHandle', () => {
  let onSuccess: ReturnType<typeof vi.fn>
  let setLoading: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSuccess = vi.fn()
    setLoading = vi.fn()
    vi.restoreAllMocks()
  })

  it('calls onSuccess with response data', async () => {
    vi.spyOn(apiRequestMod, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess })
    expect(onSuccess).toHaveBeenCalledWith('ok')
  })

  it('calls setLoading true/false', async () => {
    vi.spyOn(apiRequestMod, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('calls apiErrors on error', async () => {
    const error = new Error('fail')
    const apiErrorsSpy = vi
      .spyOn(apiErrorsMod, 'apiErrors')
      .mockImplementation((requestError) => {
        throw requestError
      })

    vi.spyOn(apiRequestMod, 'apiRequest').mockRejectedValueOnce(error)

    await expect(
      apiHandle({ url: '/api/test', onSuccess, setLoading })
    ).rejects.toThrow('fail')
    expect(apiErrorsSpy).toHaveBeenCalledWith(error)
  })
})
