import { ComponentType } from 'atomic/bosons/types'

export function getComponent(type: string): string {
  const componentMap: ComponentType[] = [
    'calendar',
    'dropdown',
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
