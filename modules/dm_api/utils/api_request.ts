import { useCookie, useRequestHeaders } from 'nuxt/app'

import type { ApiResponseType, HttpMethodType } from 'atomic'

export async function apiRequest<T>(
  url: string,
  method: HttpMethodType = 'GET',
  data: object | null = null,
  id: string | number | null = null,
  params: Record<string, unknown> = {}
): Promise<ApiResponseType<T>> {
  const finalUrl = id ? `${url}/${id}` : url
  let xsrfTokenValue: string | undefined

  if (import.meta.server) {
    const cookies = useRequestHeaders(['cookie']).cookie
    if (cookies) {
      const match = cookies.match(/XSRF-TOKEN=([^;]+)/)
      if (match) xsrfTokenValue = decodeURIComponent(match[1])
    }
  } else {
    const xsrfToken = useCookie('XSRF-TOKEN')
    xsrfTokenValue = xsrfToken.value ?? undefined
  }
  let headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (xsrfTokenValue) {
    headers['X-XSRF-TOKEN'] = xsrfTokenValue
  }

  if (import.meta.client) {
    headers['Referer-Slug'] = window.location.pathname
  }

  if (import.meta.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
    }
  }

  return await $fetch(finalUrl, {
    method,
    params,
    body: data,
    headers,
    credentials: 'include',
  })
}
