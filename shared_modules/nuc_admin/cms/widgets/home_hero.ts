import {
  panelLayoutFields,
  sectionLayoutFields,
  tabsFields,
} from './layout_fields'
import type { WidgetDefinition } from '../registry'

import { defaultPropsForWidget } from '../defaults/marketing_props'

export const homeHeroWidget: WidgetDefinition = {
  type: 'section.hero',
  label: 'Hero',
  webComponentKey: 'sections/hero',
  propsSchema: {
    railLabel: { type: 'string' },
    brand: { type: 'string' },
    headlineLead: { type: 'string' },
    modules: { type: 'array' },
  },
  defaultProps: () => defaultPropsForWidget('section.hero'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'brand', label: 'Brand' },
      { type: 'text', name: 'heroEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'headlineLead', label: 'Headline lead' },
      { type: 'text', name: 'headlineTrail', label: 'Headline trail' },
      { type: 'textarea', name: 'support', label: 'Support' },
      { type: 'text', name: 'ctaPrimary', label: 'Primary CTA' },
      { type: 'text', name: 'ctaSecondary', label: 'Secondary CTA' },
      { type: 'text', name: 'ctaTertiary', label: 'Tertiary CTA' },
      { type: 'text', name: 'githubHref', label: 'GitHub URL' },
      { type: 'text', name: 'coreInspect', label: 'Panel kicker' },
      { type: 'text', name: 'coreLive', label: 'Panel footer' },
    ],
    [
      {
        type: 'array',
        name: 'modules',
        label: 'Module board',
        fields: [
          { type: 'text', name: 'id', label: 'Id', required: true },
          { type: 'text', name: 'name', label: 'Name', required: true },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'note', label: 'Note' },
          {
            type: 'array',
            name: 'lanes',
            label: 'Lanes',
            fields: [
              { type: 'text', name: 'id', label: 'Lane id' },
              { type: 'text', name: 'title', label: 'Title' },
              { type: 'text', name: 'path', label: 'Path' },
              { type: 'textarea', name: 'detail', label: 'Detail' },
            ],
          },
        ],
      },
    ],
    [...sectionLayoutFields, ...panelLayoutFields]
  ),
}
