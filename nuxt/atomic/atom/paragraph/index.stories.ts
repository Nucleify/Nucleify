import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { AdParagraph } from '.'

const meta = {
  title: 'Atoms/Paragraph',
  component: AdParagraph,
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
