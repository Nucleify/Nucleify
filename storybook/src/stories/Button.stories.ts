import type { Meta, StoryObj } from '@storybook/vue3'

import { ButtonInterface } from '@/types'
import { ButtonTemplate } from '@/utils/PrimeVue'

const meta: Meta<ButtonInterface> = {
  title: 'PrimeVue/Button',

  argTypes: {
    class: { control: 'text' },
    severity: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'help', 'danger'],
      control: { type: 'radio' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    raised: { control: 'boolean' },
    rounded: { control: 'boolean' },
    text: { control: 'boolean' },
    outlined: { control: 'boolean' },
    gap: { control: 'text' },
    padding: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<ButtonInterface>

export const Button: Story = ButtonTemplate.bind({})

Button.args = {
  class: 'pi pi-star',
  severity: 'primary',
  label: 'Button',
  disabled: false,
  raised: true,
  rounded: true,
  text: false,
  outlined: false,
  gap: '8px',
  padding: '5px 12px'
}
