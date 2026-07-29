import { useRuntimeConfig } from 'nuxt/app'

type EdgeInvokeOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: Record<string, unknown> | null
  headers?: Record<string, string>
}

export const invokeEdgeFunction = async <T>(
  functionName: string,
  options: EdgeInvokeOptions = {}
): Promise<T> => {
  const runtimeConfig = useRuntimeConfig()
  const base = runtimeConfig.public.apiUrl

  if (!base) {
    throw new Error('Missing Supabase Edge base URL in runtime config.')
  }

  const url = `${String(base).replace(/\/$/, '')}/${functionName.replace(/^\//, '')}`
  return await $fetch<T>(url, {
    method: options.method || 'POST',
    body: options.body || undefined,
    headers: options.headers,
  })
}
