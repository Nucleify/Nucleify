import {
  sectionLayoutFields,
  stringRowFields,
  tabsFields,
} from './layout_fields'
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
      { type: 'text', name: 'pillarsShareUnit', label: 'Share unit label' },
      {
        type: 'text',
        name: 'pillarsShareSource',
        label: 'Share source note',
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
        name: 'shareGroups',
        label: 'Share chart groups',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'color', label: 'Color' },
          {
            type: 'array',
            name: 'sliceIds',
            label: 'Slice ids',
            fields: stringRowFields,
          },
        ],
      },
      {
        type: 'array',
        name: 'shareSlices',
        label: 'Share slices',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'number', name: 'pct', label: 'Weight' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showShareChart',
        label: 'Show share chart',
        defaultValue: true,
      },
    ]
  ),
}
