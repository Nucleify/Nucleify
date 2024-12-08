import type { Meta, StoryObj } from '@storybook/vue3'

import { InputMask as AdInputMask } from './'

const meta = {
  title: 'Example/InputMask',
  component: AdInputMask,
  tags: ['autodocs'],
  args: {
    adType: '',
    value: '',
    defaultValue: '',
    slotChar: '',
    mask: '(999) 999-9999',
    id: 'input-mask',
    placeholder: '',
    autoClear: false,
    unmask: false,
    readonly: false,
    invalid: false,
    name: '',
    size: 'small',
    variant: 'filled',
    fluid: false,
    disabled: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    value: { control: 'text' },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
    mask: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof AdInputMask>

export default meta
type Story = StoryObj<typeof meta>

export const InputMask: Story = {}
