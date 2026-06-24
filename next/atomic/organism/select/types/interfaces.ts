import type { DropdownProps } from 'primereact/dropdown'

export interface SelectInterface extends Omit<DropdownProps, 'appendTo'> {
  adType?: string
  appendTo?: DropdownProps['appendTo'] | 'body'
}
