import type { Meta, StoryObj } from '@storybook/vue3'

import { Label as AdLabel } from './'

const meta = {
  title: 'Example/Label',
  component: AdLabel,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    forInput: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Label: Story = {}
