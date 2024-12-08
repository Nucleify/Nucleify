import type { Meta, StoryObj } from '@storybook/vue3'

import { Button as AdButton } from './'

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

export const Button: Story = {}
