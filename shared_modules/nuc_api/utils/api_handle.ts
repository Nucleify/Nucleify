import type { ApiHandleOptionsInterface, HttpMethodType } from 'nucleify'
import { apiErrors, apiRequest, resolveApiHandleData } from 'nucleify'

export async function apiHandle<T>({
  url,
  method = 'GET' as HttpMethodType,
  data = null,
  id = null,
  setLoading,
  onSuccess,
}: ApiHandleOptionsInterface<T>): Promise<void> {
  try {
    setLoading?.(true)

    const response = await apiRequest<T>(url, method, data, id)
    await onSuccess(resolveApiHandleData<T>(response))
  } catch (error) {
    apiErrors(error)
  } finally {
    setLoading?.(false)
  }
}
