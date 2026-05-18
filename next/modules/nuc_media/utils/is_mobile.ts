export function isMobile(): boolean {
  return typeof window !== 'undefined' ? window.screen.width <= 992 : false
}
