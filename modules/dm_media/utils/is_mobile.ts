export function isMobile(): boolean {
  return import.meta.client ? window.screen.width <= 992 : false
}
