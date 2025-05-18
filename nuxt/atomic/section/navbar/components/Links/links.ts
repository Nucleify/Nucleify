import type { NavLinkObjectInterface } from '.'

export const navLinks: NavLinkObjectInterface[] = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Login',
    href: '/login',
    isButton: true,
    class: 'login-button',
  },
]
