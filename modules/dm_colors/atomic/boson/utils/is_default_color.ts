import { defaultColors } from 'atomic'

export function isDefaultColor(key: string, value: string): boolean {
  return defaultColors[key] === value
}
