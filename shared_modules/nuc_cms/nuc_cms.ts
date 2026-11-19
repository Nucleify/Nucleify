import { type App, type Component, defineAsyncComponent } from 'vue'

import { defaultSectionWidgets } from './cms/default_section_widgets'
import { registerPageTemplate } from './cms/page_templates'
import { registerDefaultWidgets } from './cms/register_default_widgets'
import { registerSection } from './cms/registry'

let componentsRegistered = false

function lazySection(loader: () => Promise<{ default: Component }>): Component {
  return defineAsyncComponent(loader)
}

const sectionModules = import.meta.glob<{ default: Component }>(
  './sections/*/index.vue'
)

export function registerDefaultCmsPack(): void {
  registerDefaultWidgets()
  if (componentsRegistered) return
  componentsRegistered = true

  for (const widget of defaultSectionWidgets) {
    const path = `./${widget.webComponentKey}/index.vue`
    const loader = sectionModules[path]
    if (!loader) {
      throw new Error(
        `[nuc_cms] missing section SFC for ${widget.type} at ${path}`
      )
    }
    registerSection({
      ...widget,
      component: lazySection(loader),
    })
  }

  registerPageTemplate({
    id: 'rail',
    label: 'Rail',
    frameEffects: true,
    Rail: lazySection(() => import('./templates/rail/index.vue')),
    Shear: lazySection(() => import('./templates/shear/index.vue')),
  })
  registerPageTemplate({
    id: 'bare',
    label: 'Bare',
    frameEffects: false,
  })
}

/** Vue plugin — ensures the default CMS pack is registered. */
export function registerNucCms(app: App): void {
  void app
  registerDefaultCmsPack()
}
