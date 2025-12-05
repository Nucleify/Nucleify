import type { NavLinkObjectInterface } from '.'

export const navLinks: NavLinkObjectInterface[] = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Why Us',
    href: '#why-us',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
  {
    label: 'Login',
    href: '/login',
    isButton: true,
    class: 'login-button',
  },
]
