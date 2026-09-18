import {
  apiRequest,
  colorKeys,
  colorShades,
  colorStorageGet,
  getColorStorageKey,
  resolveApiHandleData,
  sessionStorageGetItem,
} from 'nucleify'

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
    const response = await apiRequest<BulkUpdateResponse>(
      '/user-colors',
      'PUT',
      { colors }
    )
    const data = resolveApiHandleData<BulkUpdateResponse>(response)

    if (data.updated_count > 0 || data.created_count > 0) {
      console.log(
        `Updated ${data.updated_count}, created ${data.created_count} colors in database`
      )
    }
  } catch (error) {
    console.error('Failed to update colors in database:', error)
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

  pendingUpdates.set(getColorStorageKey(colorName), colorValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    void flushPendingUpdates()
    debounceTimer = null
  }, 500)
}

export async function updateAllUserColorsInDatabase(): Promise<void> {
  if (typeof window === 'undefined') return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  try {
    const colors: ColorUpdatePayload[] = []

    colorKeys.forEach((item: string) =>
      colorShades.forEach((state: string) => {
        const userKey = `${item}-${state}-u`
        const value = colorStorageGet(userKey)

        if (value) {
          colors.push({
            name: getColorStorageKey(userKey),
            value,
            new: false,
          })
        }
      })
    )

    if (colors.length === 0) return

    const response = await apiRequest<BulkUpdateResponse>(
      '/user-colors',
      'PUT',
      { colors }
    )
    const data = resolveApiHandleData<BulkUpdateResponse>(response)

    if (data.updated_count > 0 || data.created_count > 0) {
      console.log(
        `Updated ${data.updated_count}, created ${data.created_count} colors in database`
      )
    }
  } catch (error) {
    console.error('Failed to update colors in database:', error)
  }
}
