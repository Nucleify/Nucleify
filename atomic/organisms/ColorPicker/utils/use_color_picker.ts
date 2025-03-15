import { Ref, ref } from 'vue'

import {
  UseColorsReturnInterface,
  UseColorPickerInterface,
  darkenColor,
  setColorOpacity,
  useColors,
} from 'atomic'

export function useColorPicker(item: string): UseColorPickerInterface {
  const {
    mainItemColors,
    activityItemColors,
    articleItemColors,
    contactItemColors,
    linkItemColors,
    moneyItemColors,
    questionItemColors,
    technologyItemColors,
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
    case 'link':
      itemColor.value = linkItemColors.primary!
      break
    case 'money':
      itemColor.value = moneyItemColors.primary!
      break
    case 'question':
      itemColor.value = questionItemColors.primary!
      break
    case 'technology':
      itemColor.value = technologyItemColors.primary!
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
        `${item}-item-dark-color`,
        darkenColor(colorValue, 60)
      )
      localStorage.setItem(
        `${item}-item-hover-color`,
        darkenColor(colorValue, 10)
      )
      localStorage.setItem(
        `${item}-item-focus-color`,
        setColorOpacity(colorValue, 0.35)
      )
      localStorage.setItem(
        `${item}-item-highlight-color`,
        setColorOpacity(colorValue, 0.15)
      )
      localStorage.setItem(
        `${item}-item-secondary-color`,
        setColorOpacity(colorValue, 0.4)
      )
      localStorage.setItem(
        `${item}-item-selected-color`,
        setColorOpacity(colorValue, 0.08)
      )
    }
  }
  return { itemColor, setColorValues }
}
