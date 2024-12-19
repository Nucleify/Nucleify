import type { Meta, StoryObj } from '@storybook/vue3'

import { Tag as AdTag } from './'

const meta = {
  title: 'Atoms/Tag',
  component: AdTag,
  tags: ['autodocs'],
  args: {
    value: 'Text',
    severity: 'success',
    rounded: false,
    icon: '',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    value: { control: 'text' },
    severity: {
      control: 'select',
      options: [
        'success',
        'secondary',
        'info',
        'warning',
        'danger',
        'contrast',
      ],
    },
  },
} satisfies Meta<typeof AdTag>

export default meta
type Story = StoryObj<typeof meta>

export const Tag: Story = {}
