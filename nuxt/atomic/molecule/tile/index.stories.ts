import { AdTile } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Molecules/Tile',
  component: AdTile,
  args: {
    adType: 'main',
    header: 'Tile',
    href: '',
    count: 0,
    icon: 'prime:stop',
    storybook: true,
    countSecondary: 10,
    textSecondary: 'this week',
  },
  argTypes: {},
} satisfies Meta<typeof AdTile>

export default meta
type Story = StoryObj<typeof meta>

export const Tile: Story = {}
