import type { DropdownProps } from 'primereact/dropdown'

export interface SelectInterface extends Omit<DropdownProps, 'appendTo'> {
  nuiType?: string
  appendTo?: DropdownProps['appendTo'] | 'body'
}
