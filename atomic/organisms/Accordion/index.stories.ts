import type { Meta, StoryObj } from '@storybook/vue3'

import { Accordion as AdAccordion } from './'

const meta = {
  title: 'Organisms/Accordion',
  component: AdAccordion,
  tags: ['autodocs'],
  args: {
    panels: [
      { value: 1, header: 'Header 1', content: 'Content header 1' },
      { value: 2, header: 'Header 2', content: 'Content header 2' },
      { value: 3, header: 'Header 3', content: 'Content header 3' },
    ],
    value: 1,
    multiple: false,
    lazy: false,
    expandIcon: undefined,
    collapseIcon: undefined,
    tabindex: 0,
    selectOnFocus: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    panels: {
      control: 'object',
    },
    value: {
      control: 'number',
    },
    multiple: {
      control: 'boolean',
    },
    lazy: {
      control: 'boolean',
    },
    expandIcon: {
      control: 'text',
    },
    collapseIcon: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AdAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Accordion: Story = {}
