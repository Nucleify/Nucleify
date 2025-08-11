import { AdIcon } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Icon',
  component: AdIcon,
  args: {
    icon: 'prime:star',
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
