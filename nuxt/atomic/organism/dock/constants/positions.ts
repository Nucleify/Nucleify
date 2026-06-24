import type { Ref } from 'vue'
import { ref } from 'vue'

import type { PositionType } from '../types'

export const positions: Ref<{ value: PositionType }[]> = ref([
  {
    value: 'top',
  },
  {
    value: 'right',
  },
  {
    value: 'left',
  },
  {
    value: 'bottom',
  },
])
