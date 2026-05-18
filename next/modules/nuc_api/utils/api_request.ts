import type { ApiResponseType, HttpMethodType } from 'nucleify'

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined

  const parts = document.cookie.split(';').map((part) => part.trim())
  const entry = parts.find((part) => part.startsWith(`${name}=`))
  if (!entry) return undefined

  return decodeURIComponent(entry.slice(name.length + 1))
}

function resolveApiUrl(url: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  if (!baseUrl || /^https?:\/\//.test(url)) return url
  return `${baseUrl}${url}`
}

function stripApiPrefix(url: string): string {
  return url.startsWith('/api/') ? url.slice(4) : url
}

export async function apiRequest<T>(
  url: string,
  method: HttpMethodType = 'GET',
  data: object | null = null,
  id: string | number | null = null,
  params: Record<string, unknown> = {}
): Promise<ApiResponseType<T>> {
  const finalUrl = id ? `${url}/${id}` : url
  const finalApiUrl = resolveApiUrl(finalUrl)
  let xsrfTokenValue: string | undefined

  if (typeof window !== 'undefined') {
    xsrfTokenValue = getCookieValue('XSRF-TOKEN')
  }

  let headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (xsrfTokenValue) {
    headers['X-XSRF-TOKEN'] = xsrfTokenValue
  }

  if (typeof window !== 'undefined') {
    headers['Referer-Slug'] = window.location.pathname
  }

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue
    searchParams.append(key, String(value))
  }

  const queryString = searchParams.toString()
  const requestUrl = queryString ? `${finalApiUrl}?${queryString}` : finalApiUrl

  let response = await fetch(requestUrl, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers,
    credentials: 'include',
  })

  // Fallback for environments where backend routes are exposed without `/api`.
  if (
    !response.ok &&
    response.status === 404 &&
    !/^https?:\/\//.test(finalUrl)
  ) {
    const fallbackUrl = stripApiPrefix(finalUrl)
    if (fallbackUrl !== finalUrl) {
      const resolvedFallbackUrl = resolveApiUrl(fallbackUrl)
      const fallbackRequestUrl = queryString
        ? `${resolvedFallbackUrl}?${queryString}`
        : resolvedFallbackUrl

      response = await fetch(fallbackRequestUrl, {
        method,
        body: data ? JSON.stringify(data) : undefined,
        headers,
        credentials: 'include',
      })
    }
  }

  if (!response.ok) {
    let errorData: unknown = null
    try {
      errorData = await response.json()
    } catch {
      errorData = { error: response.statusText }
    }
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
      response: {
        status: response.status,
        data: errorData,
      },
      data: errorData,
    })

    throw requestError
  }

  return (await response.json()) as ApiResponseType<T>
}
