export function isDesktop(): boolean {
  return import.meta.client ? window.screen.width > 992 : false
}
