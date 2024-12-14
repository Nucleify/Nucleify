import type { Meta, StoryObj } from '@storybook/vue3'
import { ColorPicker as AdColorPicker } from './'

const meta: Meta<typeof AdColorPicker> = {
  title: 'Organisms/ColorPicker',
  component: AdColorPicker,
  tags: ['autodocs'],
  args: {
    adType: 'main',
    modelValue: 'color',
    defaultColor: '#ffffff',
    defaultValue: '',
    name: '',
    inline: false,
    format: 'hex',
    invalid: false,
    disabled: false,
    tabindex: '',
    autoZIndex: false,
    baseZIndex: 1000,
    inputId: '',
    overlayClass: '',
    appendTo: 'body',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    format: { control: 'select', options: ['rgb', 'hex', 'hsb'] },
  },
} satisfies Meta<typeof AdColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const ColorPicker: Story = {}
