import type { Meta, StoryObj } from '@storybook/vue3'

import { InputTextInterface } from '@/types'
import { InputTextTemplate } from '@/templates'

const meta: Meta<InputTextInterface> = {
    title: 'PrimeVue/InputText',

    argTypes: {
        type: {
            options: ['text', 'number'],
            control: { type: 'radio' },
        },
        size: {
            options: ['small', 'large'],
            control: { type: 'radio' },
        },
        variant: {
            options: ['filled', 'outlined'],
            control: { type: 'radio' },
        },
    },
}

export default meta

type Story = StoryObj<InputTextInterface>

export const InputText: Story = InputTextTemplate.bind({})

InputText.args = {
    value: 'text',
    type: 'number',
    class: '',
    unstyled: false,
    size: 'small',
    variant: 'outlined',
    invalid: false,
    width: '300px',
    height: '300px',
    padding: '5px 12px',
}
