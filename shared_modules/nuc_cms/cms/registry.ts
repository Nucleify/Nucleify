import type { Component } from 'vue'

import type { FieldConfig } from './fields/types'

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

export type SectionDefinition = WidgetDefinition & {
  component: Component
}

const widgets: WidgetDefinition[] = []
const byType = new Map<string, WidgetDefinition>()
const componentsByType = new Map<string, Component>()

export function registerWidget(widget: WidgetDefinition): void {
  const existing = byType.get(widget.type)
  if (existing) {
    const idx = widgets.indexOf(existing)
    if (idx >= 0) widgets[idx] = widget
  } else {
    widgets.push(widget)
  }
  byType.set(widget.type, widget)
}

export function registerSection(def: SectionDefinition): void {
  const { component, ...widget } = def
  registerWidget(widget)
  componentsByType.set(widget.type, component)
}

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

export function resolveCmsSection(type: string): Component | undefined {
  return componentsByType.get(type)
}

export function isKnownCmsSection(type: string): boolean {
  return componentsByType.has(type)
}
