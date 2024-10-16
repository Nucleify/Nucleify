import { Ref, ref } from 'vue'

import { PositionType } from 'atomic/bosons/types'

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
