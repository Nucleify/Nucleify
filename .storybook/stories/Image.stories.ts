import type { Meta, StoryObj } from '@storybook/vue3'

import { Image as AdImage } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Image',
  component: AdImage,
  tags: ['autodocs'],
  args: {
    preview: false,
    imageStyle: {},
    imageClass: {},
    previewIcon: '',
    zoomInDisabled: false,
    zoomOutDisabled: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    src: '',
    alt: 'image',
    width: '',
    height: '',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof AdImage>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Image: Story = {}
