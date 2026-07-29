import {
  applyColorsWithSystemAndUser,
  createColorShades,
  setColorWithUserSuffix,
  updateUserColorInDatabase,
} from 'nucleify'

const shadeMap: Record<string, string> = {
  '': 'c',
  dark: 'd',
  hover: 'hv',
  focus: 'f',
  highlight: 'h',
  secondary: 'sc',
  selected: 'sl',
}

export async function persistItemColorShades(
  item: string,
  colorValue: string
): Promise<void> {
  const shades = createColorShades(colorValue)

  await Promise.all(
    Object.entries(shades).map(async ([shade, value]) => {
      const suffix = shadeMap[shade] ?? shade
      const key = `${item}-${suffix}`
      setColorWithUserSuffix(key, value)
      await updateUserColorInDatabase(`${key}-u`, value)
    })
  )

  applyColorsWithSystemAndUser()
}
