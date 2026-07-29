import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('useApiErrors', () => {
  let apiErrors: ReturnType<typeof nucleify.useApiErrors>['apiErrors'],
    flashToast: ReturnType<typeof vi.fn>

  beforeEach(() => {
    flashToast = vi.fn()
    vi.spyOn(nucleify, 'useApiErrors').mockReturnValue({
      apiErrors: flashToast,
    })

    vi.stubGlobal('process', { client: true })
    vi.stubGlobal('document', {
      querySelector: vi.fn().mockReturnValue({ classList: { add: vi.fn() } }),
      querySelectorAll: vi.fn().mockReturnValue([]),
    })
    apiErrors = nucleify.useApiErrors().apiErrors
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
