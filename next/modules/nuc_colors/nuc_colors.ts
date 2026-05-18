import { colorsClientPlugin } from './plugins/colors.client'
import { colorsServerPlugin } from './plugins/colors.server'

export function registerNucColors(): void {
  colorsServerPlugin()
  colorsClientPlugin()
}
