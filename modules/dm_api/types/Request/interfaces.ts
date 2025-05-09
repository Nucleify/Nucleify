import { FlashToastFunctionType, HttpMethodType } from 'atomic'

export interface ApiHandleOptionsInterface<T> {
  url: string
  method?: HttpMethodType
  data?: Record<string, any> | null
  id?: string | number | null
  loading?: boolean
  setLoading?: (value: boolean) => void
  onSuccess: (data: T) => void
}

export interface ApiRequestOptions {
  url: string
  method?: HttpMethodType
  data?: Record<string, any> | null
  id?: string | number | null
  params?: Record<string, any>
}
