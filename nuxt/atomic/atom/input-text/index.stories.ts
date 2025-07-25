import { AdInputText } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/InputText',
  component: AdInputText,
  args: {
    adType: undefined,
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof AdInputText>

export default meta
type Story = StoryObj<typeof meta>

export const InputText: Story = {}
