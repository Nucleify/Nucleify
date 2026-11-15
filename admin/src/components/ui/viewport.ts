export type Viewport = 'mobile' | 'tablet' | 'desktop'
export type AdminViewport = Viewport

export const VIEWPORT_OPTIONS: {
  value: Viewport
  short: string
  title: string
  width: number | null
  height: number | null
}[] = [
  {
    value: 'mobile',
    short: 'Mobile',
    title: '390×844',
    width: 390,
    height: 844,
  },
  {
    value: 'tablet',
    short: 'Tablet',
    title: '834×1024',
    width: 834,
    height: 1024,
  },
  {
    value: 'desktop',
    short: 'Desktop',
    title: 'Full size',
    width: null,
    height: null,
  },
]
export const ADMIN_VIEWPORT_OPTIONS = VIEWPORT_OPTIONS

export function viewportWidth(id: Viewport): number | null {
  return VIEWPORT_OPTIONS.find((row) => row.value === id)?.width ?? null
}
export const adminViewportWidth = viewportWidth
