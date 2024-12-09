import type { Meta, StoryObj } from '@storybook/vue3'

import { Paragraph as AdParagraph } from './'

const meta = {
  title: 'Example/Paragraph',
  component: AdParagraph,
  tags: ['autodocs'],
  args: {
    text: 'Paragraph',
  },
  argTypes: {
    text: { control: 'text' },
  },
} satisfies Meta<typeof AdParagraph>

export default meta
type Story = StoryObj<typeof meta>

export const Paragraph: Story = {}
