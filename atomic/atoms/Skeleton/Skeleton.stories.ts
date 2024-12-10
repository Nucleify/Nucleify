import type { Meta, StoryObj } from '@storybook/vue3'

import { Skeleton as AdSkeleton } from './'

const meta = {
  title: 'Example/Skeleton',
  component: AdSkeleton,
  tags: ['autodocs'],
  args: {
    shape: 'rectangle',
    size: '',
    width: '15rem',
    height: '2rem',
    borderRadius: '16px',
    animation: 'none',
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    loading: true,
  },
  argTypes: {
    shape: { control: 'select', options: ['circle', 'rectangle'] },
    animation: { control: 'select', options: ['none', 'wave'] },
  },
} satisfies Meta<typeof AdSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Skeleton: Story = {}
