import { AdButton } from '.'

import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Button',
  component: AdButton,
  args: {
    adType: undefined,
    label: 'Button',
    icon: '',
    iconPos: undefined,
    iconClass: '',
    badge: '',
    badgeClass: '',
    badgeSeverity: '',
    loading: false,
    loadingIcon: '',
    as: 'button',
    asChild: false,
    link: undefined,
    severity: undefined,
    raised: false,
    rounded: false,
    text: false,
    outlined: false,
    size: 'small',
    variant: undefined,
    fluid: false,
    dt: {},
    pt: {},
    ptOptions: {},
    unstyled: false,
    disabled: false,
    type: undefined,
    width: '',
    height: '',
    gap: '',
    padding: '',
    src: '',
  },
  argTypes: {
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
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
