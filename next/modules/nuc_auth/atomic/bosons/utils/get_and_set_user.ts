import type { ApiResponseType, NucAuthUserInterface } from 'nucleify'
import { apiRequest, setUserToSessionStorage } from 'nucleify'

function extractResponse<T>(response: ApiResponseType<T>): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data
  }

  return response as T
}

export async function getAndSetUser(): Promise<void> {
  const response = await apiRequest<NucAuthUserInterface>('/user')
  const user = extractResponse(response)

  setUserToSessionStorage(user)
}
