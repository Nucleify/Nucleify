import type { Meta, StoryObj } from '@storybook/vue3'

import { InputOtp as AdInputOtp } from './'

const meta = {
  title: 'Example/InputOtp',
  component: AdInputOtp,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    defaultValue: 4,
    name: '',
    size: 'small',
    invalid: false,
    disabled: false,
    readonly: false,
    variant: 'outlined',
    tabindex: 0,
    length: 6,
    mask: false,
    integerOnly: true,
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
    length: { control: 'number' },
    mask: { control: 'boolean' },
    integerOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof AdInputOtp>

export default meta
type Story = StoryObj<typeof meta>

export const InputOtp: Story = {}
