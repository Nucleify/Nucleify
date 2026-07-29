import type { ErrorResponseInterface, UseApiErrorsInterface } from 'nucleify'
import { flashToast, resolveErrorMessage } from 'nucleify'

export function apiErrors(
  error: ErrorResponseInterface | Error | unknown
): never {
  const message = resolveErrorMessage(error)

  if (typeof window !== 'undefined') {
    try {
      flashToast(message, 'error')
      if (
        error &&
        typeof error === 'object' &&
        'data' in error &&
        (error as { data?: { errors?: string } }).data?.errors
      ) {
        setTimeout(() => {
          document
            .querySelector('.p-toast-summary')
            ?.classList.add('validation-errors')
        })
      }
    } catch {
      console.error(message, error)
    }
  }

  throw error
}

export function useApiErrors(): UseApiErrorsInterface {
  return { apiErrors }
}
