import type { WidgetDefinition } from '../registry'

export const homeHeroWidget: WidgetDefinition = {
  type: 'home.hero',
  label: 'Home hero',
  webComponentKey: 'home/sections/hero',
  propsSchema: {
    headline: { type: 'string', required: true },
    subcopy: { type: 'string' },
    ctas: { type: 'array' },
  },
}
