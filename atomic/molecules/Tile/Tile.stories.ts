import type { Meta, StoryObj } from '@storybook/vue3'

import { Tile as AdTile } from './'

const meta = {
  title: 'Example/Tile',
  component: AdTile,
  tags: ['autodocs'],
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
