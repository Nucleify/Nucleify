import type { Meta, StoryObj } from '@storybook/vue3'

import { Icon as AdIcon } from './'

const meta = {
  title: 'Example/Icon',
  component: AdIcon,
  tags: ['autodocs'],
  args: {
    icon: '',
    url: '',
    adType: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {}
