import {
    ColorItemColorsInterface,
    HomeItemsInterface,
    UseDragItemsInterface,
} from '@/types'
import { useColors } from '@/utils'

export default function useDragItems(): UseDragItemsInterface {
    const {
        activityItemColors,
        articleItemColors,
        contactItemColors,
    }: {
        activityItemColors: ColorItemColorsInterface
        articleItemColors: ColorItemColorsInterface
        contactItemColors: ColorItemColorsInterface
    } = useColors()

    function startDragging(item: HomeItemsInterface): void {
        let color: string = ''

        switch (item.label) {
            case 'Activities':
                color = activityItemColors.primary || ''
                break
            case 'Articles':
                color = articleItemColors.primary || ''
                break
            case 'Contacts':
                color = contactItemColors.primary || ''
                break
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
