import type { Meta, StoryObj } from '@storybook/vue3'

import { Button as AdButton } from '../../atomic/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: AdButton,
  tags: ['autodocs'],
  args: {
    adType: '',
    label: 'Button',
    icon: '',
    iconPos: '',
    iconClass: '',
    badge: '',
    badgeClass: '',
    badgeSeverity: '',
    loading: false,
    loadingIcon: '',
    as: 'button',
    asChild: false,
    link: undefined,
    severity: '',
    raised: false,
    rounded: false,
    text: false,
    outlined: false,
    size: '',
    variant: '',
    fluid: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: '',
    disabled: false,
    type: '',
    width: '',
    height: '',
    gap: '',
    padding: '',
    src: '',
  },
  argTypes: {
    iconPos: { control: 'select', options: ['left', 'bottom', 'right', 'top'] },
    badgeSeverity: {
      control: 'select',
      options: [
        'success',
        'secondary',
        'info',
        'warning',
        'danger',
        'contrast',
      ],
    },
    severity: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'help',
        'danger',
      ],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['outlined', 'text', 'link'] },
    onclick: { action: 'clicked' },
    type: { control: 'select', options: ['button', 'reset', 'submit'] },
  },
} satisfies Meta<typeof AdButton>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Button: Story = {}
