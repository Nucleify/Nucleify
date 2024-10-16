import {
  ErrorResponseInterface,
  FlashToastFunctionType,
  UseApiErrorsServiceInterface,
} from 'atomic/bosons/types'
import { useToast } from 'atomic/bosons/utils'

export function useApiErrors(): UseApiErrorsServiceInterface {
  const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

  function apiErrors(error: ErrorResponseInterface): void {
    if (error.response && error.response.status && error.response.data) {
      switch (error.response.status) {
        case 500:
          flashToast(
            error.response.data.error || 'HTTP 500: Internal Server Error',
            'error'
          )
          break
        case 404:
          flashToast(
            error.response.data.error || 'HTTP 404: Not Found',
            'error'
          )
          break
        case 403:
        case 401:
          flashToast('Unauthorized access', 'error')
          break
        default:
          flashToast(error.response.data.errors, 'warn')
      }
    } else {
      flashToast('An unknown error occurred', 'error')
      console.log(error)
    }
  }

  return { apiErrors }
}
