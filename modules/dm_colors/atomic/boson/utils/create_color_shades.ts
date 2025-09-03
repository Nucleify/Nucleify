import { darkenColor, setColorOpacity } from 'atomic'

export function createColorShades(colorValue: string): Record<string, string> {
  return {
    '': colorValue,
    dark: darkenColor(colorValue, 60),
    hover: darkenColor(colorValue, 10),
    focus: setColorOpacity(colorValue, 0.5),
    highlight: setColorOpacity(colorValue, 0.08),
    secondary: setColorOpacity(colorValue, 0.21),
    selected: setColorOpacity(colorValue, 0.15),
  }
}
