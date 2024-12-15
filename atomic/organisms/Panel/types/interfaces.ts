export interface PanelInterface {
  header?: string
  content?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: object
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
