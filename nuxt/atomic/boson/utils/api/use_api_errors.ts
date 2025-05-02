import {
  ErrorResponseInterface,
  UseApiErrorsInterface,
  useToast,
  UseToastInterface,
} from 'atomic'

export function useApiErrors(): UseApiErrorsInterface {
  const { flashToast }: UseToastInterface = useToast()

  function apiErrors(error: ErrorResponseInterface | Error | unknown): void {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = error.data as { error?: string; errors?: string }

      if (data.error) {
        flashToast(data.error, 'error')
        return
      }
    }

    flashToast(
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An unknown error occurred',
      'error'
    )
  }

  return {
    apiErrors,
  }
}
