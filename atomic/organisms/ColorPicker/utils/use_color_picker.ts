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
    featureItemColors,
    linkItemColors,
    moneyItemColors,
    questionItemColors,
    technologyItemColors,
    userItemColors,
  }: UseColorsReturnInterface = useColors()

  const itemColor: Ref<string | undefined> = ref<string>()

  const colorMap: Record<string, string> = {
    main: mainItemColors.primary!,
    activity: activityItemColors.primary!,
    article: articleItemColors.primary!,
    contact: contactItemColors.primary!,
    feature: featureItemColors.primary!,
    link: linkItemColors.primary!,
    money: moneyItemColors.primary!,
    question: questionItemColors.primary!,
    technology: technologyItemColors.primary!,
    user: userItemColors.primary!,
  }

  itemColor.value = colorMap[item] || '#000000'

  function setColorValues(): void {
    const colorValue = itemColor.value?.startsWith('#')
      ? itemColor.value
      : `#${itemColor.value}`

    if (!colorValue) return

    const colorSettings = {
      '': colorValue,
      dark: darkenColor(colorValue, 60),
      hover: darkenColor(colorValue, 10),
      focus: setColorOpacity(colorValue, 0.5),
      highlight: setColorOpacity(colorValue, 0.08),
      secondary: setColorOpacity(colorValue, 0.21),
      selected: setColorOpacity(colorValue, 0.15),
    }

    Object.entries(colorSettings).forEach(([key, value]) =>
      localStorage.setItem(`${item}-item${key ? `-${key}` : ''}-color`, value)
    )
  }

  return { itemColor, setColorValues }
}
