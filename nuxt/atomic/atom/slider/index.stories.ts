import { AdSlider } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Slider',
  component: AdSlider,
  args: {
    adType: undefined,
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof AdSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {}
