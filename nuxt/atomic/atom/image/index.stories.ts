import { AdImage } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Image',
  component: AdImage,
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
    src: '/img/logo.svg',
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

export const Image: Story = {}
