import { AdTag } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Tag',
  component: AdTag,
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
