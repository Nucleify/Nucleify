import type { Meta, StoryObj } from '@storybook/vue3'

import { InputNumber as AdInputNumber } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/InputNumber',
  component: AdInputNumber,
  tags: ['autodocs'],
  args: {
    modelValue: 1,
    defaultValue: 0,
    name: '',
    format: false,
    showButtons: false,
    buttonLayout: '',
    incrementButtonClass: 'pi pi-plus',
    decrementButtonClass: 'pi pi-minus',
    incrementIcon: '',
    decrementIcon: '',
    locale: 'en-US',
    localMatcher: '',
    mode: 'decimal',
    prefix: '',
    suffix: '',
    currency: 'USD',
    currencyDisplay: 'symbol',
    useGrouping: true,
    minFractionDigits: 0,
    maxFractionDigits: 0,
    roundingMode: '',
    min: 0,
    max: 100,
    step: 1,
    allowEmpty: false,
    highlightOnFocus: false,
    size: 'small',
    invalid: false,
    disabled: false,
    variant: '',
    readonly: false,
    placeholder: '',
    fluid: false,
    inputId: '',
    inputClass: '',
    inputStyle: '',
    ariaLabelledby: '',
    ariaLabel: '',
    formControl: {},
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
  },
  argTypes: {
    buttonLayout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'stacked'],
    },
    localMatcher: { control: 'select', options: ['lookup', 'best fit'] },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    roundingMode: {
      control: 'select',
      options: [
        'ceil',
        'floor',
        'expand',
        'trunc',
        'halfCeil',
        'halfFloor',
        'halfExpand',
        'halfTrunc',
        'halfEven',
      ],
    },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
    format: { control: 'boolean' },
    usingGroup: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
} satisfies Meta<typeof AdInputNumber>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const InputNumber: Story = {}
