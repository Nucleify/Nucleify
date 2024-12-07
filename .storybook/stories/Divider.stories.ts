import type { Meta, StoryObj } from '@storybook/vue3'

import { Divider as AdDivider } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Divider',
  component: AdDivider,
  tags: ['autodocs'],
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
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Divider: Story = {}
