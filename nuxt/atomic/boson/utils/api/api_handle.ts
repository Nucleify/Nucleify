import {
  ApiHandleOptionsInterface,
  HttpMethodType,
  UseApiErrorsInterface,
  apiRequest,
  useApiErrors,
} from 'atomic'

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

    console.log(response)
    onSuccess(response as T)
  } catch (error) {
    apiErrors(error)
  } finally {
    setLoading?.(false)
  }
}
