import type { Meta, StoryObj } from '@storybook/vue3'

import { Badge as AdBadge } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Badge',
  component: AdBadge,
  tags: ['autodocs'],
  args: {
    value: '2',
    severity: '',
    size: '',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: '',
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
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof AdBadge>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Badge: Story = {}
