export interface PanelInterface {
  header?: string
  content?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: object
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
