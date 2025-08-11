import { AdProgressSpinner } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/ProgressSpinner',
  component: AdProgressSpinner,
  args: {
    adType: undefined,
    strokeWidth: '3',
    fill: '',
    animationDuration: '',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    width: '100px',
    height: '',
  },
  argTypes: {
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
  },
} satisfies Meta<typeof AdProgressSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const ProgressSpinner: Story = {}
