import type { Meta, StoryObj } from '@storybook/vue3'

import { ProgressSpinner as AdProgressSpinner } from './'

const meta = {
  title: 'Example/PogressSpinner',
  component: AdProgressSpinner,
  tags: ['autodocs'],
  args: {
    adType: '',
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
  argTypes: {},
} satisfies Meta<typeof AdProgressSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const ProgressSpinner: Story = {}
