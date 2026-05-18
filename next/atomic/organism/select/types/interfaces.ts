import type { DropdownProps } from 'primereact/dropdown'

export type OpenDialogFunctionType = (action: string, data: unknown) => void

export interface SelectInterface extends DropdownProps {
  adType?: string
}
