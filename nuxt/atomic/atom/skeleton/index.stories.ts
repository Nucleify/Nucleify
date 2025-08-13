import { AdSkeleton } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Skeleton',
  component: AdSkeleton,
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
