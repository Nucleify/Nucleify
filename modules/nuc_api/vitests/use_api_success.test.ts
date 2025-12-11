import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

describe('useApiSuccess', () => {
  let apiSuccess: ReturnType<typeof atomic.useApiSuccess>['apiSuccess'],
    flashToast: ReturnType<typeof vi.fn>

  beforeEach(() => {
    flashToast = vi.fn()
    vi.spyOn(atomic, 'useAtomicToast').mockReturnValue({
      flashToast,
      closeToast: vi.fn(),
    })
    apiSuccess = atomic.useApiSuccess().apiSuccess
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
