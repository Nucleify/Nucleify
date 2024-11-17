import axios from 'axios'

import {
  ApiErrorsFunctionType,
  ErrorResponseInterface,
} from 'atomic/bosons/types'

export function catchErrors(
  error: unknown,
  apiErrors: ApiErrorsFunctionType
): void {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      apiErrors(error.response.data as ErrorResponseInterface)
    } else {
      console.error('No response from server:', error.message)
    }
  } else if (error instanceof Error) {
    console.error('Generic error:', error.message)
  } else {
    console.error('Unexpected error:', error)
  }
}
