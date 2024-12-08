import type { Meta, StoryObj } from '@storybook/vue3'

import { Checkbox as AdCheckbox } from './'

const meta = {
  title: 'Example/Checkbox',
  component: AdCheckbox,
  tags: ['autodocs'],
  args: {
    adType: '',
    value: undefined,
    modelValue: {},
    defaultValue: {},
    name: '',
    binary: true,
    disabled: false,
    variant: '',
    readonly: false,
    required: false,
    tabindex: 0,
    trueValue: {},
    falseValue: {},
    inputId: '',
    inputClass: {},
    inputStyle: '',
    ariaLabel: '',
    ariaLabelledby: '',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    value: { control: 'text' },
    variant: { control: 'select', options: ['outlined', 'text', 'link'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    inputStyle: { control: 'text' },
  },
} satisfies Meta<typeof AdCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {}
