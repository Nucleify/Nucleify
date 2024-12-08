import type { Meta, StoryObj } from '@storybook/vue3'

import { InputOtp as AdInputOtp } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const InputOtp: Story = {}
