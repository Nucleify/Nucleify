import { AdLabel } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Label',
  component: AdLabel,
  args: {
    label: 'Label',
    forInput: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Label: Story = {}
