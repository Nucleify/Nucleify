import type { HttpMethodType } from 'atomic'

export interface ApiHandleOptionsInterface<T> {
  url: string
  method?: HttpMethodType
  data?: object | null
  id?: string | number | null
  loading?: boolean
  setLoading?: (value: boolean) => void
  onSuccess: (data: T) => void
}

export interface ApiRequestOptions {
  url: string
  method?: HttpMethodType
  data?: object | null
  id?: string | number | null
  params?: Record<string, unknown>
}
