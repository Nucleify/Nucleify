import type { Meta, StoryObj } from '@storybook/vue3'

import { InputText as AdInputText } from './'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/InputText',
  component: AdInputText,
  tags: ['autodocs'],
  args: {
    adType: 'main',
    value: '3',
    defaultValue: '',
    name: '',
    size: 'small',
    invalid: false,
    variant: 'outlined',
    fluid: false,
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    disabled: false,
    id: '',
    placeholder: '',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof AdInputText>

export default meta
type Story = StoryObj<typeof meta>

export const InputText: Story = {}
