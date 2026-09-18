import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'

import { useApiSuccess } from '../utils/use_api_success'

describe('useApiSuccess', () => {
  let apiSuccess: ReturnType<typeof useApiSuccess>['apiSuccess']
  let flashToast: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    flashToast = vi.spyOn(nucleify, 'flashToast').mockImplementation(() => {
      //
    })
    apiSuccess = useApiSuccess().apiSuccess
  })

  it('calls flashToast with response message', async () => {
    await apiSuccess({ message: 'ok' })
    expect(flashToast).toHaveBeenCalledWith('ok', 'success')
  })

  it('calls flashToast with default message', async () => {
    await apiSuccess()
    expect(flashToast).toHaveBeenCalledWith(
      'Operation completed successfully',
      'success'
    )
  })

  it('calls getData if provided', async () => {
    const getData = vi.fn()
    await apiSuccess({}, getData)
    expect(getData).toHaveBeenCalled()
  })

  it('calls close if provided', async () => {
    const close = vi.fn()
    await apiSuccess({}, undefined, close, 'edit')
    expect(close).toHaveBeenCalledWith('edit')
  })
})
