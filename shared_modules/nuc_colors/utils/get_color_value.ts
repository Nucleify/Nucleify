import { colorStorageGet, defaultColors } from 'nucleify'

export function getColorValue(key: string): string {
  return colorStorageGet(key) || defaultColors[key] || ''
}
