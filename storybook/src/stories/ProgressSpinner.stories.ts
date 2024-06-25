import type { Meta, StoryObj } from '@storybook/vue3'

import { ProgressSpinnerInterface } from '@/types'
import { ProgressSpinnerTemplate } from '@/templates'

const meta: Meta<ProgressSpinnerInterface> = {
    title: 'PrimeVue/ProgressSpinner',
}

export default meta

type Story = StoryObj<ProgressSpinnerInterface>

export const ProgressSpinner: Story = ProgressSpinnerTemplate.bind({})

ProgressSpinner.args = {
    class: '',
    width: '50px',
    height: '50px',
    strokeWidth: '5',
    fill: 'transparent',
    animationDuration: '1s',
}
