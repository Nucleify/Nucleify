import { colorKeys } from './keys'

// TODO(nuc_settings): when nuc_settings module is migrated to Next,
// switch this file back to Nuxt-like modulesGroups() integration.
export interface SettingsGroupInterface {
  name: string
  items: string[]
}

function capitalize(value: string): string {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getColorGroups(): SettingsGroupInterface[] {
  return colorKeys.map((key) => ({
    name: capitalize(key),
    items: [capitalize(key)],
  }))
}

export function getColorList(): string[] {
  return getColorGroups().flatMap((group) => group.items)
}

export const colorGroups: SettingsGroupInterface[] = []
export const colorList: string[] = []

if (typeof window !== 'undefined') {
  colorGroups.push(...getColorGroups())
  colorList.push(...getColorList())
}
