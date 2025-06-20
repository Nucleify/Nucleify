export interface AdFadeInterface {
  children: React.ReactElement
  addEndListener?: () => void
  appear?: boolean
  easing?: { enter?: string; exit?: string } | string
  in?: boolean
  timeout?: number | { appear?: number; enter?: number; exit?: number }
}
