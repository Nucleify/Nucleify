import { AdTextarea } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Textarea',
  component: AdTextarea,
  args: {
    adType: undefined,
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
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    value: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['outlined', 'text', 'link'] },
  },
} satisfies Meta<typeof AdTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Textarea: Story = {}
