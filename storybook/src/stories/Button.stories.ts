import type { Meta, StoryObj } from '@storybook/vue3'

import { ButtonInterface } from '@/types'
import { ButtonTemplate } from '@/utils/PrimeVue'

const meta: Meta<ButtonInterface> = {
  title: 'PrimeVue/Button',

  argTypes: {
    severity: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'help', 'danger'],
      control: { type: 'radio' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    raised: { control: 'boolean' },
    rounded: { control: 'boolean' },
    text: { control: 'boolean' },
    outlined: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<ButtonInterface>

export const Button: Story = ButtonTemplate.bind({})

Button.args = {
  severity: 'primary',
  label: 'Button',
  disabled: false,
  raised: true,
  rounded: true,
  text: false,
  outlined: false
}
