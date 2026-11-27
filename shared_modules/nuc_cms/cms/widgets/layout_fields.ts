import type { BreakpointVisibility } from '../merge_props'

import {
  DEFAULT_SHOW_CUBE,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE,
} from '../../utils/breakpoint_panel'
import type { FieldConfig } from '../fields/types'

export {
  DEFAULT_SHOW_CUBE,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE,
} from '../../utils/breakpoint_panel'

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

/** Mobile / tablet / desktop checkboxes as a named group. */
export function breakpointVisibilityFields(
  name: string,
  label: string,
  defaults: BreakpointVisibility,
  description?: string
): FieldConfig {
  return {
    type: 'group',
    name,
    label,
    admin: description ? { description } : undefined,
    fields: [
      {
        type: 'row',
        fields: [
          {
            type: 'checkbox',
            name: 'mobile',
            label: 'Mobile',
            defaultValue: defaults.mobile,
          },
          {
            type: 'checkbox',
            name: 'tablet',
            label: 'Tablet',
            defaultValue: defaults.tablet,
          },
          {
            type: 'checkbox',
            name: 'desktop',
            label: 'Desktop',
            defaultValue: defaults.desktop,
          },
        ],
      },
    ],
  }
}

/**
 * Cube + glance breakpoint knobs — same Layout fields on every panel section.
 */
export function dealPanelLayoutFields(
  cubeDefaults: BreakpointVisibility = DEFAULT_SHOW_CUBE,
  glanceDefaults: BreakpointVisibility = DEFAULT_SHOW_GLANCE
): FieldConfig[] {
  return [
    breakpointVisibilityFields(
      'showCube',
      'Show cube',
      cubeDefaults,
      'Holo cube in the side panel'
    ),
    breakpointVisibilityFields(
      'showGlance',
      'Show glance plate',
      glanceDefaults,
      'Readout text and module picks beside / under the cube'
    ),
  ]
}

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
