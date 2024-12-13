import type { Meta, StoryObj } from '@storybook/vue3'

import { Badge as AdBadge } from './'

const meta = {
  title: 'Atoms/Badge',
  component: AdBadge,
  tags: ['autodocs'],
  args: {
    value: '2',
    severity: '',
    size: 'small',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
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
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof AdBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Badge: Story = {}
