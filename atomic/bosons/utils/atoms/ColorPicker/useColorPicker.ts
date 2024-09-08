import { Ref, ref } from 'vue'

import {
    UseColorsReturnInterface,
    UseColorPickerInterface,
} from 'atomic/bosons/types'
import { darkenColor, setColorOpacity, useColors } from 'atomic/bosons/utils'

export function useColorPicker(item: string): UseColorPickerInterface {
    const {
        mainItemColors,
        activityItemColors,
        articleItemColors,
        contactItemColors,
        userItemColors,
    }: UseColorsReturnInterface = useColors()

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
            localStorage.setItem(`${item}-item-color`, colorValue)
            localStorage.setItem(
                `${item}-item-hover-color`,
                darkenColor(colorValue, 10)
            )
            localStorage.setItem(
                `${item}-item-selected-color`,
                setColorOpacity(colorValue, 0.08)
            )
            localStorage.setItem(
                `${item}-item-focus-color`,
                setColorOpacity(colorValue, 0.35)
            )
            localStorage.setItem(
                `${item}-item-highlight-color`,
                setColorOpacity(colorValue, 0.15)
            )
        }
    }
    return { itemColor, setColorValues }
}
