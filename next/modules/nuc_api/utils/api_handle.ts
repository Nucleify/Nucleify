import type { UseApiErrorsInterface } from '../types/Errors/interfaces'
import type { HttpMethodType } from '../types/Http/functions'
import type { ApiHandleOptionsInterface } from '../types/Request/interfaces'
import { apiRequest } from './api_request'
import { useApiErrors } from './use_api_errors'

export async function apiHandle<T>({
  url,
  method = 'GET' as HttpMethodType,
  data = null,
  id = null,
  setLoading,
  onSuccess,
}: ApiHandleOptionsInterface<T>): Promise<void> {
  const { apiErrors }: UseApiErrorsInterface = useApiErrors()

  try {
    setLoading?.(true)

    const response = await apiRequest<T>(url, method, data, id)

    function hasDataProp(response: unknown): response is { data: T } {
      return (
        typeof response === 'object' && response !== null && 'data' in response
      )
    }

    if (hasDataProp(response)) {
      onSuccess(response.data)
    } else {
      onSuccess(response)
    }
  } catch (error) {
    apiErrors(error)
  } finally {
    setLoading?.(false)
  }
}
