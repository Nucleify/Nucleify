import type { Meta, StoryObj } from '@storybook/vue3'

import { TextAreaInterface } from '@/types'
import { TextAreaTemplate } from '@/templates'

const meta: Meta<TextAreaInterface> = {
  title: 'PrimeVue/TextArea',
}

export default meta

type Story = StoryObj<TextAreaInterface>

export const TextArea: Story = TextAreaTemplate.bind({})

TextArea.args = {
  rows: 5,
  cols: 50,
  class: '',
  disabled: false,
  autoResize: true,
  invalid: false,
}
