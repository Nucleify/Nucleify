import type {
  ApiHandleOptionsInterface,
  HttpMethodType,
  UseApiErrorsInterface,
} from 'atomic'
import { apiRequest, useApiErrors } from 'atomic'

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
