import { apiRequest } from '../../../shared_modules/nuc_api/utils/api_request'

type ApiEnvelope<T> = { data?: T; error?: string }

export async function adminApiGet<T>(path: string): Promise<T> {
  const res = await apiRequest<ApiEnvelope<T>>(path, 'GET')
  const body = res as unknown as ApiEnvelope<T>
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T
  }
  return res as unknown as T
}

export async function adminApiSend<T>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  data?: object | null
): Promise<T> {
  const res = await apiRequest<ApiEnvelope<T>>(path, method, data ?? null)
  const body = res as unknown as ApiEnvelope<T>
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T
  }
  return res as unknown as T
}
