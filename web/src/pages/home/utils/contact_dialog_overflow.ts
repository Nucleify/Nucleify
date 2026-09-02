/** Allow nui-select panels to escape the dialog clip. */
export function setHomeContactDialogOverflow(
  host: HTMLElement | null,
  allowOverflow: boolean
): void {
  const root = host?.shadowRoot
  if (!root) return

  const panel = root.querySelector('.nui-dialog-panel')
  const content = root.querySelector('.nui-dialog-content')
  const footer = root.querySelector('.nui-dialog-footer')
  const value = allowOverflow ? 'visible' : ''

  if (panel instanceof HTMLElement) panel.style.overflow = value
  if (content instanceof HTMLElement) content.style.overflow = value
  if (footer instanceof HTMLElement) footer.style.overflow = value
}
