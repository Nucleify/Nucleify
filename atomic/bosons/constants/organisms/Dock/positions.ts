import { ref } from 'vue'

import { PositionType, PositionsRefType } from 'atomic/bosons/types'

export const positions = (): PositionsRefType => {
    const positionValues: readonly PositionType[] = [
        'top',
        'right',
        'left',
        'bottom',
    ] as const

    return ref(
        positionValues.map((value): PositionsRefType => ({ value }))
    ) as const
}
