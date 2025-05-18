export function isDesktop(): boolean {
  return process.client ? window.screen.width > 992 : false
}
