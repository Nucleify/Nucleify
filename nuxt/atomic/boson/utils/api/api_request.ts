import { HttpMethodType } from 'atomic'

export async function apiRequest(
  url: string,
  method: HttpMethodType = 'GET',
  data: Record<string, any> | null = null,
  id: string | number | null = null,
  params: Record<string, any> = {}
) {
  const baseUrl = runtime.apiUrl as string
  const finalUrl = id ? `${baseUrl}/${url}/${id}` : `${baseUrl}/${url}`

  try {
    const response = await $fetch(finalUrl, {
      method,
      params,
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (error: any) {
    throw error
  }
}
