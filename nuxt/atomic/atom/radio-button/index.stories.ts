import { AdRadioButton } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/RadioButton',
  component: AdRadioButton,
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof AdRadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const RadioButton: Story = {}
