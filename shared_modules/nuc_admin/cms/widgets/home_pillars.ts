import type { WidgetDefinition } from '../registry'

export const homePillarsWidget: WidgetDefinition = {
  type: 'home.pillars',
  label: 'Home pillars',
  webComponentKey: 'home/sections/pillars',
  propsSchema: {
    items: { type: 'array' },
  },
}
