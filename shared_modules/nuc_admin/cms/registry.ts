import type { FieldConfig } from './fields/types'
import { homeHeroWidget } from './widgets/home_hero'
import { homePillarsWidget } from './widgets/home_pillars'
import {
  homeCloneWidget,
  homeCloseWidget,
  homeCompilerDemoWidget,
  homePulseWidget,
  homeStackWidget,
  investorAskWidget,
  investorIntroWidget,
  investorSavingsWidget,
  investorSurfaceWidget,
  investorThesisWidget,
  investorWedgeWidget,
  thankYouWidget,
} from './widgets/marketing'

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
  /** Typed admin form (tabs / arrays / groups). Preferred over propsSchema mapping. */
  adminFields?: FieldConfig[]
  /** Fresh props when adding a section in the layout editor. */
  defaultProps?: () => Record<string, unknown>
}

const widgets: WidgetDefinition[] = [
  homeHeroWidget,
  homePillarsWidget,
  homeCloneWidget,
  homeStackWidget,
  homeCompilerDemoWidget,
  homePulseWidget,
  homeCloseWidget,
  investorIntroWidget,
  investorThesisWidget,
  investorSavingsWidget,
  investorWedgeWidget,
  investorSurfaceWidget,
  investorAskWidget,
  thankYouWidget,
]

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

export function defaultPropsForType(type: string): Record<string, unknown> {
  const widget = byType.get(type)
  if (widget?.defaultProps) return widget.defaultProps()
  return {}
}
