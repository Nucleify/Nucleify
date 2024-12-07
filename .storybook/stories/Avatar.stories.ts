import type { Meta, StoryObj } from '@storybook/vue3'

import { Avatar as AdAvatar } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Avatar: Story = {}
