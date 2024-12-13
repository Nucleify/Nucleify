import type { Meta, StoryObj } from '@storybook/vue3'

import { Icon as AdIcon } from './'

const meta = {
  title: 'Atoms/Icon',
  component: AdIcon,
  tags: ['autodocs'],
  args: {
    icon: '',
    url: '',
    adType: '',
  },
  argTypes: {
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
  },
} satisfies Meta<typeof AdIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {}
