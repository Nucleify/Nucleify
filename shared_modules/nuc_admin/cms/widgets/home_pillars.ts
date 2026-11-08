import { sectionLayoutFields, tabsFields } from './layout_fields'
import type { WidgetDefinition } from '../registry'

import { defaultPropsForWidget } from '../defaults/marketing_props'

export const homePillarsWidget: WidgetDefinition = {
  type: 'section.pillars',
  label: 'Pillars',
  webComponentKey: 'sections/pillars',
  propsSchema: {
    railLabel: { type: 'string' },
    items: { type: 'array' },
  },
  defaultProps: () => defaultPropsForWidget('section.pillars'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'pillarsEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'pillarsTitle', label: 'Title' },
      { type: 'textarea', name: 'pillarsSupport', label: 'Support' },
      { type: 'text', name: 'pillarsCta', label: 'CTA' },
      { type: 'text', name: 'pillarsShareUnit', label: 'Donut unit label' },
      {
        type: 'text',
        name: 'pillarsShareSource',
        label: 'Nucleus label',
      },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Pillars',
        fields: [
          { type: 'text', name: 'index', label: 'Index' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'textarea', name: 'description', label: 'Description' },
          { type: 'text', name: 'outcome', label: 'Outcome' },
          { type: 'text', name: 'proof', label: 'Proof' },
        ],
      },
      {
        type: 'array',
        name: 'shells',
        label: 'Shells (donut)',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'detail', label: 'Detail' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'color', label: 'Color' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showShareChart',
        label: 'Show shells chart',
        defaultValue: true,
      },
    ]
  ),
}
