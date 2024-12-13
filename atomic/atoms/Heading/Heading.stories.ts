import type { Meta, StoryObj } from '@storybook/vue3'

import { Heading as AdHeading } from './'

const meta = {
  title: 'Atoms/Heading',
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

export const Heading: Story = {}
