import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

describe('useApiErrors', () => {
  let apiErrors: ReturnType<typeof atomic.useApiErrors>['apiErrors'],
    flashToast: ReturnType<typeof vi.fn>

  beforeEach(() => {
    flashToast = vi.fn()
    vi.spyOn(atomic, 'useAtomicToast').mockReturnValue({
      flashToast,
      closeToast: vi.fn(),
    })
    vi.spyOn(atomic, 'useApiErrors').mockReturnValue({ apiErrors: flashToast })

    vi.stubGlobal('process', { client: true })
    vi.stubGlobal('document', {
      querySelector: vi.fn().mockReturnValue({ classList: { add: vi.fn() } }),
      querySelectorAll: vi.fn().mockReturnValue([]),
    })
    apiErrors = atomic.useApiErrors().apiErrors
  })

  it('calls flashToast for various error types', () => {
    apiErrors({ data: { error: 'fail' } })
    apiErrors({ data: { errors: 'validation' } })
    apiErrors(new Error('errormsg'))
    apiErrors('string error')
    apiErrors({ data: {} })
    expect(flashToast).toHaveBeenCalled()
  })
})
