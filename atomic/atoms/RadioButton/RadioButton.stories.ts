import type { Meta, StoryObj } from '@storybook/vue3'

import { RadioButton as AdRadioButton } from './'

const meta = {
  title: 'Example/RadioButton',
  component: AdRadioButton,
  tags: ['autodocs'],
  args: {
    adType: undefined,
    value: 0,
    defaultValue: {},
    name: '',
    binary: false,
    size: 'small',
    invalid: false,
    disabled: false,
    variant: 'outlined',
    readonly: false,
    tabindex: 0,
    inputId: '',
    inputStyle: {},
    inputClass: '',
    ariaLabelledby: '',
    ariaLabel: '',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof AdRadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const RadioButton: Story = {}
