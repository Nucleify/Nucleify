import type { Ref } from 'vue'

import type { ColorPickerInterface } from 'atomic'

export interface NucColorPickerInterface extends ColorPickerInterface {}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => void
}
