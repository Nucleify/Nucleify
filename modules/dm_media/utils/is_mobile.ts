export function isMobile(): boolean {
  return process.client ? window.screen.width <= 992 : false
}
