import { HomeItemsInterface, UseDragItemsInterface } from '@/types'

import { UseColorsReturnInterface } from 'atomic/bosons/types'
import { useColors } from 'atomic/bosons/utils'

export default function useDragItems(): UseDragItemsInterface {
    const {
        mainItemColors,
        activityItemColors,
        articleItemColors,
        contactItemColors,
        userItemColors,
    }: UseColorsReturnInterface = useColors()

    function startDragging(item: HomeItemsInterface): void {
        let color: string

        switch (item.label) {
            case 'Activities':
                color = activityItemColors!.primary || ''
                break
            case 'Articles':
                color = articleItemColors!.primary || ''
                break
            case 'Contacts':
                color = contactItemColors!.primary || ''
                break
            case 'Users':
                color = userItemColors!.primary || ''
                break
            default:
                color = mainItemColors!.primary || ''
        }

        const gridItem: HTMLElement = document.getElementById(
            item.label + 'GridItem'
        )!
        if (gridItem) {
            gridItem.style.color = color
        }
    }

    return { startDragging }
}
