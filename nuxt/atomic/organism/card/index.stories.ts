import { AdCard } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Organisms/Card',
  component: AdCard,
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
