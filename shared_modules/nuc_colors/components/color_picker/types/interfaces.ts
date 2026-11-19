import type { ColorPickerProps } from 'nucleify-ui/components/nui-color-picker/types'

export interface NucColorPickerInterface extends ColorPickerProps {
  nuiType: NuiTypeType
}

export interface UseColorPickerInterface {
  setColorValues: () => Promise<void>
}
