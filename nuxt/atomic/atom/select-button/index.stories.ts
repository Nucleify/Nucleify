import { AdSelectButton } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/SelectButton',
  component: AdSelectButton,
  args: {
    adType: 'main',
    modelValue: 1,
    defaultValue: {},
    name: '',
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3, disabled: true },
    ],
    optionLabel: 'label',
    optionValue: 'value',
    optionDisabled: 'disabled',
    multiple: false,
    invalid: false,
    disabled: false,
    dataKey: '',
    allowEmpty: false,
    ariaLabelledby: '',
    size: 'small',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    modelValue: { control: 'number' },
    optionLabel: { control: 'text' },
    optionValue: { control: 'text' },
    optionDisabled: { control: 'text' },
    multiple: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'large'] },
  },
} satisfies Meta<typeof AdSelectButton>

export default meta
type Story = StoryObj<typeof meta>

export const SelectButton: Story = {}
