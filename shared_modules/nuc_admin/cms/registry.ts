import { homeHeroWidget } from './widgets/home_hero'
import { homePillarsWidget } from './widgets/home_pillars'

export type WidgetPropSchema = Record<
  string,
  {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object'
    required?: boolean
  }
>

export type WidgetDefinition = {
  type: string
  label: string
  webComponentKey: string
  propsSchema: WidgetPropSchema
  adminTabs?: string[]
}

const widgets: WidgetDefinition[] = [homeHeroWidget, homePillarsWidget]

const byType = new Map(widgets.map((w) => [w.type, w]))

export function listWidgets(): WidgetDefinition[] {
  return [...widgets]
}

export function getWidget(type: string): WidgetDefinition | undefined {
  return byType.get(type)
}

export function isRegisteredWidgetType(type: string): boolean {
  return byType.has(type)
}
