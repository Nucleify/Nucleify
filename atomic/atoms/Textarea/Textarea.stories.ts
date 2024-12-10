import type { Meta, StoryObj } from '@storybook/vue3'

import { Textarea as AdTextarea } from './'

const meta = {
  title: 'Example/Textarea',
  component: AdTextarea,
  tags: ['autodocs'],
  args: {
    adType: '',
    value: [],
    modelValue: '',
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus, ultrices in porttitor\n' +
      'in, accumsan non quam.',
    name: '',
    autoResize: false,
    size: 'large',
    invalid: false,
    variant: 'outlined',
    fluid: false,
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    value: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['outlined', 'text', 'link'] },
  },
} satisfies Meta<typeof AdTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Textarea: Story = {}
