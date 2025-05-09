import { useCookie, useRequestHeaders, useRuntimeConfig } from 'nuxt/app'

export async function apiRequest(
  url: string,
  method: string = 'GET',
  data: Record<string, any> | null = null,
  id: string | number | null = null,
  params: Record<string, any> = {}
) {
  const finalUrl = id ? `${url}/${id}` : url
  const config = useRuntimeConfig()
  let xsrfTokenValue: string | undefined

  if (process.server) {
    // On server, parse the cookie from request headers
    const cookies = useRequestHeaders(['cookie']).cookie
    if (cookies) {
      const match = cookies.match(/XSRF-TOKEN=([^;]+)/)
      if (match) xsrfTokenValue = decodeURIComponent(match[1])
    }
  } else {
    // On client, use useCookie
    const xsrfToken = useCookie('XSRF-TOKEN')
    xsrfTokenValue = xsrfToken.value ?? undefined
  }

  let headers: Record<string, any> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (xsrfTokenValue) {
    headers['X-XSRF-TOKEN'] = xsrfTokenValue
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
      referer: config.public.baseURL,
    }
  }

  try {
    const response = await $fetch(finalUrl, {
      method,
      params,
      body: data,
      headers,
      credentials: 'include',
    })
    return response
  } catch (error: any) {
    throw error
  }
}