import { AdCheckbox } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Checkbox',
  component: AdCheckbox,
  args: {
    adType: undefined,
    value: undefined,
    modelValue: undefined,
    defaultValue: undefined,
    name: '',
    binary: true,
    disabled: false,
    variant: 'outlined',
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    value: { control: 'text' },
    variant: { control: 'select', options: ['outlined', 'text', 'link'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    inputStyle: { control: 'text' },
  },
} satisfies Meta<typeof AdCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {}
