import type { Meta, StoryObj } from '@storybook/vue3'

import { Heading as AdHeading } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Heading',
  component: AdHeading,
  tags: ['autodocs'],
  args: {
    tag: 0,
    text: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdHeading>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Heading: Story = {}
