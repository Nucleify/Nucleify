import { AdTile } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Molecules/Tile',
  component: AdTile,
  args: {
    adType: 'main',
    header: '',
    href: '',
    count: 0,
    icon: '',
    countSecondary: '',
    textSecondary: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdTile>

export default meta
type Story = StoryObj<typeof meta>

export const Tile: Story = {}
