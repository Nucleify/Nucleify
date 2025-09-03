import type { Ref } from 'vue'

import type { ColorPickerInterface } from 'atomic'

export interface DMColorPickerInterface extends ColorPickerInterface {}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => void
}
