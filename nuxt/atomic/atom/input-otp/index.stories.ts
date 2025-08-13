import { AdInputOtp } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/InputOtp',
  component: AdInputOtp,
  args: {
    adType: undefined,
    modelValue: undefined,
    defaultValue: undefined,
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
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
