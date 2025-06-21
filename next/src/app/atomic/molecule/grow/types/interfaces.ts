import type { ReactElement } from 'react'

export interface AdGrowInterface {
  children: ReactElement
  addEndListener?: () => void
  appear?: boolean
  easing?: { enter?: string; exit?: string } | string
  in?: boolean
  timeout?: 'auto' | number | { appear?: number; enter?: number; exit?: number }
}
