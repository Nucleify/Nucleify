import type { Meta, StoryObj } from '@storybook/vue3'

import { BlockUI as AdBlockUI } from './'

const meta = {
  title: 'Organisms/BlockUI',
  component: AdBlockUI,
  tags: ['autodocs'],
  args: {
    panels: [{ header: 'Header I', content: 'Content header I' }],
    blocked: false,
    fullScreen: true,
    baseZIndex: undefined,
    autoZIndex: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    blocked: { control: 'boolean' },
  },
} satisfies Meta<typeof AdBlockUI>

export default meta
type Story = StoryObj<typeof meta>

export const BlockUI: Story = {}
