import type { Meta, StoryObj } from '@storybook/vue3'

import { ProgressBar as AdProgressBar } from './'

const meta = {
  title: 'Example/PogressBar',
  component: AdProgressBar,
  tags: ['autodocs'],
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
