import type { Meta, StoryObj } from '@storybook/vue3'

import { Slider as AdSlider } from './'

const meta = {
  title: 'Example/Slider',
  component: AdSlider,
  tags: ['autodocs'],
  args: {
    adType: 'main',
    modelValue: 1,
    defaultValue: 20,
    min: 10,
    max: 50,
    orientation: 'horizontal',
    step: 0,
    range: true,
    invalid: false,
    disabled: false,
    tabindex: 1,
    ariaLabelledby: '',
    ariaLabel: '',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof AdSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {}
