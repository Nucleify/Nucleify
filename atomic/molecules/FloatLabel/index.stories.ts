import type { Meta, StoryObj } from '@storybook/vue3'

import { FloatLabel as AdFloatLabel } from './'

const meta = {
  title: 'Molecules/FloatLabel',
  component: AdFloatLabel,
  tags: ['autodocs'],
  args: {
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    variant: 'in',
  },
  argTypes: {
    variant: { control: 'select', options: ['in', 'over', 'on'] },
  },
} satisfies Meta<typeof AdFloatLabel>

export default meta
type Story = StoryObj<typeof meta>

export const FloatLabel: Story = {}
