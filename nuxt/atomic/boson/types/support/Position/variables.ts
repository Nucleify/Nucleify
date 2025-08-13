import type { Ref } from 'vue'

export type PositionType = 'top' | 'right' | 'left' | 'bottom'
export type PositionsRefType = Ref<{ value: PositionType }[]>
