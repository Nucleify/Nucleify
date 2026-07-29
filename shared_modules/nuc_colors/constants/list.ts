import { colorKeys } from './keys'

export interface SettingsGroupInterface {
  name?: string
  items?: string[]
}

function capitalize(value: string): string {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const colorKeySet = new Set(colorKeys)

export function getColorGroups(): SettingsGroupInterface[] {
  const groups: SettingsGroupInterface[] = [
    {
      name: 'main',
      items: ['Main'],
    },
  ]

  if (colorKeySet.has('user')) {
    groups.push({
      name: 'nuc_users',
      items: ['User'],
    })
  }

  for (const key of colorKeys) {
    if (key === 'main' || key === 'user') continue
    groups.push({
      name: key,
      items: [capitalize(key)],
    })
  }

  return groups
}

export function getColorList(): string[] {
  return getColorGroups().flatMap((group) => group.items ?? [])
}

export const colorGroups: SettingsGroupInterface[] = getColorGroups()
export const colorList: string[] = getColorList()
