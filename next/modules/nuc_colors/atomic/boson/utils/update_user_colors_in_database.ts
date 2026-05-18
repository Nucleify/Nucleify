import { colorKeys } from '../constants/keys'
import { colorShades } from '../constants/shades'

// TODO(nuc_stores+nuc_api): replace local helpers and local request wrapper
// with atomic exports after nuc_stores and final nuc_api integration are ready in Next.
type ApiResponseType<T> = T | { data: T }

function localStorageGetItem(key: string): string {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) || ''
}

function cookieGetItem(key: string): string {
  if (typeof document === 'undefined') return ''
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1] || '') : ''
}

function sessionStorageGetItem(key: string): string {
  if (typeof window === 'undefined') return ''
  return window.sessionStorage.getItem(key) || ''
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || ''
}

async function apiRequest<T>(
  path: string,
  method: 'PUT',
  data: object
): Promise<ApiResponseType<T>> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to update colors (${response.status})`)
  }

  return (await response.json()) as ApiResponseType<T>
}

interface ColorUpdatePayload {
  name: string
  value: string
  new: boolean
}

interface BulkUpdateResponse {
  success: boolean
  updated_count: number
  created_count: number
  message: string
}

function extractResponse<T>(response: ApiResponseType<T>): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data
  }
  return response as T
}

const pendingUpdates: Map<string, string> = new Map()
let debounceTimer: ReturnType<typeof setTimeout> | null = null

async function flushPendingUpdates(): Promise<void> {
  if (pendingUpdates.size === 0) return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  const colors: ColorUpdatePayload[] = Array.from(pendingUpdates.entries()).map(
    ([name, value]) => ({ name, value, new: true })
  )

  pendingUpdates.clear()

  try {
    const rawResponse = await apiRequest<BulkUpdateResponse>(
      '/user-colors/all',
      'PUT',
      { colors }
    )
    const response = extractResponse(rawResponse)

    if (response.updated_count > 0 || response.created_count > 0) {
      console.log(
        `💾 Updated ${response.updated_count}, created ${response.created_count} colors in database`
      )
    }
  } catch (error) {
    console.error('❌ Failed to update colors in database:', error)
  }
}

export function clearUserColorsCache(): void {
  pendingUpdates.clear()
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
}

export async function updateUserColorInDatabase(
  colorName: string,
  colorValue: string
): Promise<void> {
  if (typeof window === 'undefined') return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  pendingUpdates.set(colorName, colorValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    flushPendingUpdates()
    debounceTimer = null
  }, 500)
}

export async function updateAllUserColorsInDatabase(): Promise<void> {
  if (typeof window === 'undefined') return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  try {
    console.log('💾 Updating all user colors in database...')

    const colors: ColorUpdatePayload[] = []

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const userKey = `${item}-${state}-u`
        const value = cookieGetItem(userKey) || localStorageGetItem(userKey)

        if (value) {
          colors.push({ name: userKey, value, new: false })
        }
      })
    )

    if (colors.length === 0) {
      console.log('📭 No colors to update')
      return
    }

    const rawResponse = await apiRequest<BulkUpdateResponse>(
      '/user-colors/all',
      'PUT',
      { colors }
    )
    const response = extractResponse(rawResponse)

    if (response.updated_count > 0 || response.created_count > 0) {
      console.log(
        `✅ Updated ${response.updated_count}, created ${response.created_count} colors in database`
      )
    } else {
      console.log('✅ All colors already up to date in database')
    }
  } catch (error) {
    console.error('❌ Failed to update colors in database:', error)
  }
}
