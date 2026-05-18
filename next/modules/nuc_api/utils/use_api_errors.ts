import type {
  ErrorResponseInterface,
  UseApiErrorsInterface,
  UseToastInterface,
} from 'nucleify'
import { useAtomicToast } from 'nucleify'

function apiFailureToError(error: unknown): Error {
  if (error instanceof Error) return error
  if (typeof error === 'string') return new Error(error)
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data: unknown }).data
    if (data && typeof data === 'object' && data !== null) {
      const d = data as Record<string, unknown>
      if (typeof d.error === 'string') return new Error(d.error)
      if (typeof d.message === 'string') return new Error(d.message)
      if (d.error != null) return new Error(String(d.error))
    }
    const status = (error as { response?: { status?: number } }).response
      ?.status
    if (status != null) return new Error(`Request failed (${status})`)
  }
  return new Error('Request failed')
}

export function useApiErrors(): UseApiErrorsInterface {
  const { flashToast }: UseToastInterface = useAtomicToast()

  function apiErrors(error: ErrorResponseInterface | Error | unknown): void {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = error.data as {
        error?: string
        errors?: string | Record<string, string[]>
      }

      if (data?.error) {
        flashToast(data.error, 'error')
      } else if (data?.errors) {
        flashToast(data.errors, 'error')
        if (typeof data.errors !== 'string') {
          setTimeout(() => {
            document
              .querySelector('.p-toast-summary')
              ?.classList.add('validation-errors')
          })
        }
      } else if (error) {
        if (error instanceof Error) {
          flashToast(error.message, 'error')
        } else if (typeof error === 'string') {
          flashToast(error, 'error')
        } else {
          flashToast('An unknown error occurred', 'error')
        }
      } else {
        flashToast('An unknown error occurred', 'error')
      }

      throw apiFailureToError(error)
    }

    if (error instanceof Error) {
      flashToast(error.message, 'error')
      return
    }

    if (typeof error === 'string') {
      flashToast(error, 'error')
      return
    }

    flashToast('An unknown error occurred', 'error')
  }

  return {
    apiErrors,
  }
}
