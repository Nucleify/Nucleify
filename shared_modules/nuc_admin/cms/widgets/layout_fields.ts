import type { FieldConfig } from '../fields/types'

/** Shared layout knobs for marketing sections. */
export const sectionLayoutFields: FieldConfig[] = [
  {
    type: 'text',
    name: 'railLabel',
    label: 'Rail label',
    admin: { description: 'Label on the side scroll rail' },
  },
  {
    type: 'text',
    name: 'anchorId',
    label: 'Anchor id',
    admin: { description: 'DOM id used for rail scroll targets' },
  },
  {
    type: 'checkbox',
    name: 'showSection',
    label: 'Show section',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'enableIris',
    label: 'Enable iris animation',
    defaultValue: true,
    admin: {
      description:
        'Iris wipe always plays on the first section of the page. Page-level iris can still disable it.',
    },
  },
]

export const panelLayoutFields: FieldConfig[] = [
  {
    type: 'checkbox',
    name: 'showPanel',
    label: 'Show side panel',
    defaultValue: true,
  },
  {
    type: 'select',
    name: 'panelSide',
    label: 'Panel side',
    options: [
      { label: 'Right', value: 'right' },
      { label: 'Left', value: 'left' },
      { label: 'Hidden', value: 'hidden' },
    ],
  },
]

export const stringRowFields: FieldConfig[] = [
  { type: 'text', name: 'value', label: 'Value', required: true },
]

export function tabsFields(
  content: FieldConfig[],
  data: FieldConfig[],
  layout: FieldConfig[] = sectionLayoutFields
): FieldConfig[] {
  return [
    {
      type: 'tabs',
      tabs: [
        { label: 'Content', fields: content },
        { label: 'Data', fields: data },
        { label: 'Layout', fields: layout },
      ],
    },
  ]
}
