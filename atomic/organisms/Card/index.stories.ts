import type { Meta, StoryObj } from '@storybook/vue3'

import { Card as AdCard } from './'

const meta = {
  title: 'Organisms/Card',
  component: AdCard,
  tags: ['autodocs'],
  args: {
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {},
} satisfies Meta<typeof AdCard>

export default meta
type Story = StoryObj<typeof meta>

export const Card: Story = {}
