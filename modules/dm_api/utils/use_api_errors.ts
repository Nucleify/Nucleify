import type {
  ErrorResponseInterface,
  UseApiErrorsInterface,
  UseToastInterface,
} from 'atomic'
import { useAtomicToast } from 'atomic'

export function useApiErrors(): UseApiErrorsInterface {
  const { flashToast }: UseToastInterface = useAtomicToast()

  function apiErrors(error: ErrorResponseInterface | Error | unknown): void {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = error.data as { error?: string; errors?: string }

      if (data?.error) {
        flashToast(data.error, 'error')
      } else if (data?.errors) {
        flashToast(data.errors, 'error')
        setTimeout(() => {
          document
            .querySelector('.p-toast-summary')
            ?.classList.add('validation-errors')
        })
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

      throw error
    }
  }

  return {
    apiErrors,
  }
}
