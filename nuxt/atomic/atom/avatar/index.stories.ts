import { AdAvatar } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Avatar',
  component: AdAvatar,
  args: {
    label: 'A',
    icon: '',
    image: undefined,
    size: 'small',
    shape: 'circle',
    ariaLabel: '',
    ariaLabelledby: '',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['square', 'circle'] },
  },
} satisfies Meta<typeof AdAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Avatar: Story = {}
