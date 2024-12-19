import { AnchorHTMLAttributes } from 'vue'

export interface FieldsetInterface {
  legend?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: AnchorHTMLAttributes
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
