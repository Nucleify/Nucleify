import { AdProgressBar } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/ProgressBar',
  component: AdProgressBar,
  args: {
    adType: 'main',
    value: 50,
    mode: 'determinate',
    showValue: true,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    width: '50em',
    height: '2em',
  },
  argTypes: {
    mode: { control: 'select', options: ['indeterminate', 'determinate'] },
  },
} satisfies Meta<typeof AdProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const ProgressBar: Story = {}
