import { Ref, ref } from 'vue'

import { darkenColor, setColorOpacity, useColors } from '@/utils'
import { ColorItemColorsInterface } from '@/types'

export default function useColorPicker(item: string) {
    const {
        mainItemColors,
        activityItemColors,
        articleItemColors,
        contactItemColors,
        userItemColors,
    }: {
        mainItemColors: ColorItemColorsInterface
        activityItemColors: ColorItemColorsInterface
        articleItemColors: ColorItemColorsInterface
        contactItemColors: ColorItemColorsInterface
        userItemColors: ColorItemColorsInterface
    } = useColors()

    const itemColor: Ref<string | undefined> = ref<string>()

    switch (item) {
        case 'main':
            itemColor.value = mainItemColors.primary!
            break
        case 'activity':
            itemColor.value = activityItemColors.primary!
            break
        case 'article':
            itemColor.value = articleItemColors.primary!
            break
        case 'contact':
            itemColor.value = contactItemColors.primary!
            break
        case 'user':
            itemColor.value = userItemColors.primary!
            break
        default:
            itemColor.value = '#000000'
    }

    function setColorValues(): void {
        const colorValue: string = itemColor.value?.startsWith('#')
            ? itemColor.value
            : `#${itemColor.value}`
        if (colorValue) {
            const darkerColor: string = darkenColor(colorValue, 10)
            const opacityColor: string = setColorOpacity(colorValue, 0.08)

            localStorage.setItem(`${item}-item-color`, colorValue)
            localStorage.setItem(`${item}-item-hover-color`, darkerColor)
            localStorage.setItem(
                `${item}-sidebar-item-selected-color`,
                opacityColor
            )
        }
    }
    return { itemColor, setColorValues }
}
