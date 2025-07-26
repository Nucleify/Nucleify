import { AdDivider } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Divider',
  component: AdDivider,
  args: {
    align: 'center',
    layout: 'horizontal',
    type: 'solid',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    align: { control: 'select', options: ['top', 'right', 'left', 'bottom'] },
    layout: { control: 'select', options: ['horizontal', 'vertical'] },
    type: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
  },
} satisfies Meta<typeof AdDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Divider: Story = {}
