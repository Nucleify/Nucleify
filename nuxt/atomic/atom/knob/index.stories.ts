import { AdKnob } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Knob',
  component: AdKnob,
  args: {
    adType: 'main',
    modelValue: 3,
    defaultValue: '3',
    name: '',
    size: 150,
    invalid: false,
    disabled: false,
    readonly: false,
    step: 0,
    min: 0,
    max: 10,
    valueColor: '#2f7d47',
    rangeColor: '#edf9f6',
    textColor: '#cfdddf',
    strokeWidth: 30,
    showValue: true,
    valueTemplate: '30',
    tabindex: 0,
    ariaLabelledby: '',
    ariaLabel: '',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    valueTemplate: { control: 'text' },
  },
} satisfies Meta<typeof AdKnob>

export default meta
type Story = StoryObj<typeof meta>

export const Knob: Story = {}
