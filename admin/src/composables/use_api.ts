import { apiRequest } from '@shared_modules'

type ApiEnvelope<T> = { data?: T; error?: string }

const unwrap = <T>(res: unknown): T =>
  res && typeof res === 'object' && 'data' in res
    ? ((res as ApiEnvelope<T>).data as T)
    : (res as T)

export const apiSend = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  data?: object | null
): Promise<T> =>
  unwrap(await apiRequest<ApiEnvelope<T>>(path, method, data ?? null))

export const apiGet = <T>(path: string): Promise<T> => apiSend<T>(path, 'GET')
export const adminApiGet = apiGet
export const adminApiSend = apiSend
