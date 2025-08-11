import { AdHeading } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Heading',
  component: AdHeading,
  args: {
    tag: 1,
    text: 'Heading',
  },
  argTypes: {
    tag: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof AdHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Heading: Story = {}
