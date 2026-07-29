import { getSupabaseAccessToken } from '../supabase/client'
import type { HttpMethodType } from '../types/http/functions'
import type { ApiResponseType } from '../types/response/variables'

const API_PATH_PREFIX = '/api'

// Next (dev) + React StrictMode can invoke client effects twice, which often
// results in duplicate GETs. We de-duplicate *in-flight* GET requests by URL.
const inflightGetRequests = new Map<string, Promise<ApiResponseType<unknown>>>()

export function resolveApiUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  let path = url.startsWith('/') ? url : `/${url}`

  if (path === API_PATH_PREFIX || path.startsWith(`${API_PATH_PREFIX}/`)) {
    return path
  }

  const envBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  if (envBase && /^https?:\/\//i.test(envBase)) {
    return `${envBase}${path}`
  }

  return `${API_PATH_PREFIX}${path}`
}

function getBrowserCookieValue(name: string): string | undefined {
  const parts = document.cookie.split(';').map((part) => part.trim())
  const entry = parts.find((part) => part.startsWith(`${name}=`))
  if (!entry) return undefined

  return decodeURIComponent(entry.slice(name.length + 1))
}

function buildRequestUrl(
  url: string,
  id: string | number | null,
  params: Record<string, unknown>
): string {
  const requestPath = id != null && id !== '' ? `${url}/${id}` : url
  const requestUrl = resolveApiUrl(requestPath)

  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue
    searchParams.append(key, String(value))
  }

  const queryString = searchParams.toString()
  if (!queryString) return requestUrl

  return `${requestUrl}${requestUrl.includes('?') ? '&' : '?'}${queryString}`
}

function parseApiError(response: Response, errorData: unknown): Error {
  const responseData =
    errorData && typeof errorData === 'object'
      ? (errorData as { error?: string; errors?: string })
      : null
  const message =
    responseData?.error ||
    responseData?.errors ||
    response.statusText ||
    `Request failed with status ${response.status}`

  const requestError = new Error(message)
  Object.assign(requestError, {
    response: { status: response.status, data: errorData },
    data: errorData,
  })
  return requestError
}

export async function apiRequest<T>(
  url: string,
  method: HttpMethodType = 'GET',
  data: object | FormData | null = null,
  id: string | number | null = null,
  params: Record<string, unknown> = {}
): Promise<ApiResponseType<T>> {
  if (typeof window === 'undefined') {
    throw new Error('apiRequest must run in the browser')
  }

  const fetchUrl = buildRequestUrl(url, id, params)
  const isFormData = data instanceof FormData
  const xsrfTokenValue = getBrowserCookieValue('XSRF-TOKEN')

  if (method === 'GET') {
    const cached = inflightGetRequests.get(fetchUrl)
    if (cached) return cached as Promise<ApiResponseType<T>>
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Referer-Slug': window.location.pathname,
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  if (xsrfTokenValue) {
    headers['X-XSRF-TOKEN'] = xsrfTokenValue
  }

  try {
    const accessToken = await getSupabaseAccessToken()
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
  } catch {
    // Public routes must work without Supabase in the browser.
  }

  const body = isFormData ? data : data ? JSON.stringify(data) : undefined

  const requestPromise = (async () => {
    const response = await fetch(fetchUrl, {
      method,
      body,
      headers,
      credentials: 'include',
    })

    if (!response.ok) {
      let errorData: unknown = null
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: response.statusText }
      }
      throw parseApiError(response, errorData)
    }

    return (await response.json()) as ApiResponseType<T>
  })()

  if (method === 'GET') {
    inflightGetRequests.set(
      fetchUrl,
      requestPromise as Promise<ApiResponseType<unknown>>
    )
    requestPromise.finally(() => {
      inflightGetRequests.delete(fetchUrl)
    })
  }

  return requestPromise
}
