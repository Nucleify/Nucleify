import type { ColorPickerInterface } from 'nucleify'

export interface NucColorPickerInterface extends ColorPickerInterface {}

export interface UseColorPickerInterface {
  itemColor: string | undefined
  onItemColorChange: (value: string) => void
  setColorValues: () => Promise<void>
}
