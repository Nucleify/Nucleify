import {
  apiRequest,
  applyColorsWithSystemAndUser,
  colorKeys,
  colorShades,
  colorStorageGet,
  colorStorageSet,
  getColorStorageKey,
  resolveApiHandleData,
  sessionStorageGetItem,
} from 'nucleify'

interface UserColorFromDatabase {
  id: number
  user_id: number
  name: string
  value: string
  new: boolean
  created_at: string
  updated_at: string
}

function resolveDbColor(
  dbColorMap: Map<string, UserColorFromDatabase>,
  logicalKey: string
): UserColorFromDatabase | undefined {
  return (
    dbColorMap.get(getColorStorageKey(logicalKey)) || dbColorMap.get(logicalKey)
  )
}

export async function syncColorsWithDatabase(): Promise<void> {
  if (typeof window === 'undefined') return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  try {
    const response = await apiRequest<UserColorFromDatabase[]>('/user-colors')
    const dbColors = resolveApiHandleData<UserColorFromDatabase[]>(response)
    const list = Array.isArray(dbColors) ? dbColors : []

    if (list.length === 0) return

    const dbColorMap = new Map<string, UserColorFromDatabase>()
    list.forEach((color) => {
      dbColorMap.set(color.name, color)
    })

    let updatedCount = 0

    colorKeys.forEach((item: string) =>
      colorShades.forEach((state: string) => {
        const userKey = `${item}-${state}-u`
        const dbColor = resolveDbColor(dbColorMap, userKey)
        if (!dbColor) return

        const storageValue = colorStorageGet(userKey)

        if (storageValue !== dbColor.value) {
          colorStorageSet(userKey, dbColor.value)
          updatedCount++
        }
      })
    )

    if (updatedCount > 0) {
      applyColorsWithSystemAndUser()
      document.dispatchEvent(new Event('colorUpdated'))
    }
  } catch (error) {
    console.error('Failed to sync colors with database:', error)
  }
}
