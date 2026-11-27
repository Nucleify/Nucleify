import { defaultSectionWidgets } from './default_section_widgets'
import { registerPageTemplate } from './page_templates'
import { registerWidget } from './registry'

let widgetsRegistered = false

/** Sync widget + page-template metadata (no Vue SFCs). Safe for Node scripts. */
export function registerDefaultWidgets(): void {
  if (widgetsRegistered) return
  widgetsRegistered = true

  for (const widget of defaultSectionWidgets) {
    registerWidget(widget)
  }

  registerPageTemplate({
    id: 'rail',
    label: 'Rail',
    frameEffects: true,
  })
  registerPageTemplate({
    id: 'bare',
    label: 'Bare',
    frameEffects: false,
  })
}

registerDefaultWidgets()
