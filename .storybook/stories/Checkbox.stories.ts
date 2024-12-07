import type { Meta, StoryObj } from '@storybook/vue3'

import { Checkbox as AdCheckbox } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
    binary: false,
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
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Checkbox: Story = {}
