import { ComponentType } from 'atomic/bosons/types'

export function getComponent(type: ComponentType): string {
  const componentMap: ComponentType[] = [
    'date-picker',
    'select',
    'input-mask',
    'input-text',
    'password',
    'textarea',
  ]

  if (componentMap.includes(type)) {
    return `ad-${type}`
  } else {
    return 'ad-input-text'
  }
}
