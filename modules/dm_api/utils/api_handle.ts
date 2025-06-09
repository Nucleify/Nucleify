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

    const response = await apiRequest(url, method, data, id)

    if (response?.data) {
      onSuccess(response.data as T)
    } else {
      onSuccess(response as T)
    }
  } catch (error) {
    apiErrors(error)
  } finally {
    setLoading?.(false)
  }
}
