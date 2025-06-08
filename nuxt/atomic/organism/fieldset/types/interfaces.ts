import type { AnchorHTMLAttributes } from 'vue'

export interface FieldsetInterface {
  legend?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: AnchorHTMLAttributes
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
