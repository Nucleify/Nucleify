import { ref } from 'vue'

import { darkenColor, setOpacity, useColors } from '@/utils'

export default function useColorPicker(item: string) {
    const {
        mainItemColors,
        activityItemColors,
        contactItemColors,
        userItemColors,
    } = useColors()

    const itemColor = ref<string>()

    switch (item) {
        case 'main':
            itemColor.value = mainItemColors.primary!
            break
        case 'activity':
            itemColor.value = activityItemColors.primary!
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

    function setColorValues() {
        const colorValue = itemColor.value?.startsWith('#')
            ? itemColor.value
            : `#${itemColor.value}`
        if (colorValue) {
            const darkerColor = darkenColor(colorValue, 10)
            const opacityColor = setOpacity(colorValue, 0.08)

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
