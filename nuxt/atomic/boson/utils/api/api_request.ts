import { HttpMethodType } from 'atomic'

export async function apiRequest(
  url: string,
  method: HttpMethodType = 'GET',
  data: Record<string, any> | null = null,
  id: string | number | null = null,
  params: Record<string, any> = {}
) {
  const finalUrl = id ? `${url}/${id}` : url

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
