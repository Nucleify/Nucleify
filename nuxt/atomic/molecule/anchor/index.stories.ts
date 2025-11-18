import { AdAnchor } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Molecules/Anchor',
  component: AdAnchor,
  args: {
    href: '',
    src: '',
    icon: 'prime:star',
    storybook: true,
    size: '1.5em',
    label: 'Anchor Label',
    rel: undefined,
    target: undefined,
    anchorClass: '',
    itemClass: '',
    style: '',
  },
  argTypes: {},
} satisfies Meta<typeof AdAnchor>

export default meta
type Story = StoryObj<typeof meta>

export const Anchor: Story = {}
