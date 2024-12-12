import type { Meta, StoryObj } from '@storybook/vue3'

import { Anchor as AdAnchor } from './'

const meta = {
  title: 'Example/Anchor',
  component: AdAnchor,
  tags: ['autodocs'],
  args: {
    href: '',
    src: '',
    icon: '',
    label: '',
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
