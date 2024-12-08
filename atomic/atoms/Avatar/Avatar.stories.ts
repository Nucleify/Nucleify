import type { Meta, StoryObj } from '@storybook/vue3'

import { Avatar as AdAvatar } from './'

const meta = {
  title: 'Example/Avatar',
  component: AdAvatar,
  tags: ['autodocs'],
  args: {
    label: 'A',
    icon: '',
    image: undefined,
    size: '',
    shape: '',
    ariaLabel: '',
    ariaLabelledby: '',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: '',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['square', 'circle'] },
  },
} satisfies Meta<typeof AdAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Avatar: Story = {}
