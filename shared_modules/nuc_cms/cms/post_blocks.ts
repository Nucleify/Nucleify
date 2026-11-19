import type { WidgetDefinition } from './registry'

import type { FieldConfig } from './fields/types'

/** Simple rich-body blocks for Posts (separate from marketing section widgets). */
export const postBlockWidgets: WidgetDefinition[] = [
  {
    type: 'block.paragraph',
    label: 'Paragraph',
    webComponentKey: 'blocks/paragraph',
    propsSchema: { text: { type: 'string' } },
    defaultProps: () => ({ text: '' }),
    adminFields: [
      { type: 'textarea', name: 'text', label: 'Text' },
    ] satisfies FieldConfig[],
  },
  {
    type: 'block.heading',
    label: 'Heading',
    webComponentKey: 'blocks/heading',
    propsSchema: { text: { type: 'string' }, level: { type: 'number' } },
    defaultProps: () => ({ text: '', level: 2 }),
    adminFields: [
      { type: 'text', name: 'text', label: 'Text' },
      {
        type: 'select',
        name: 'level',
        label: 'Level',
        options: [
          { label: 'H2', value: '2' },
          { label: 'H3', value: '3' },
          { label: 'H4', value: '4' },
        ],
      },
    ] satisfies FieldConfig[],
  },
  {
    type: 'block.image',
    label: 'Image',
    webComponentKey: 'blocks/image',
    propsSchema: { mediaId: { type: 'string' }, alt: { type: 'string' } },
    defaultProps: () => ({ mediaId: '', alt: '' }),
    adminFields: [
      { type: 'upload', name: 'mediaId', label: 'Image', relationTo: 'media' },
      { type: 'text', name: 'alt', label: 'Alt' },
    ] satisfies FieldConfig[],
  },
  {
    type: 'block.code',
    label: 'Code',
    webComponentKey: 'blocks/code',
    propsSchema: { code: { type: 'string' }, language: { type: 'string' } },
    defaultProps: () => ({ code: '', language: 'ts' }),
    adminFields: [
      { type: 'text', name: 'language', label: 'Language' },
      { type: 'textarea', name: 'code', label: 'Code' },
    ] satisfies FieldConfig[],
  },
  {
    type: 'block.cta',
    label: 'CTA',
    webComponentKey: 'blocks/cta',
    propsSchema: {
      label: { type: 'string' },
      href: { type: 'string' },
    },
    defaultProps: () => ({ label: 'Learn more', href: '/' }),
    adminFields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'href', label: 'Href' },
    ] satisfies FieldConfig[],
  },
]

export function listPostBlockTypes(): string[] {
  return postBlockWidgets.map((w) => w.type)
}

export function getPostBlock(type: string): WidgetDefinition | undefined {
  return postBlockWidgets.find((w) => w.type === type)
}
